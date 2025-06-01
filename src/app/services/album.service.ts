import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface AlbumRow {
  id: string;
  title: string;
  description?: string;
  cover_photo?: string | null;
  created_at: string;
}

export interface AlbumCard {
  id: string;
  title: string;
  coverUrl: string | null;   // URL assinado ou null
}

@Injectable({ providedIn: 'root' })
export class AlbumService {
  constructor(private sb: SupabaseService) {}

  /** Lista os álbuns do utilizador com URL da capa (se existir) */
  async list(): Promise<AlbumCard[]> {
  const { data: u } = await this.sb.client.auth.getUser();

  const { data: rows, error } = await this.sb.client
    .from('albums')
    .select(`
        id,
        title,
        album_photos(
          photo:photo_id(id, storage_path)
      )
    `)

    .eq('owner', u.user!.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // usar a 1ª foto (se houver)
  return await Promise.all(
    rows.map(async r => {
      const primeira = r.album_photos?.[0]?.photo?.[0]?.storage_path;
      let coverUrl = null;

      if (primeira) {
        const { data: urlData } = await this.sb.client
          .storage.from('fotos')
          .createSignedUrl(primeira, 3600);
        coverUrl = urlData?.signedUrl ?? null;
      }

      return {
        id: r.id,
        title: r.title,
        coverUrl
      };
    })
  );
}


  /** Cria um álbum vazio */
  async create(title: string, description = '') {
    const { data: u } = await this.sb.client.auth.getUser();
    const { error } = await this.sb.client.from('albums').insert({
      owner: u.user!.id,
      title,
      description
    });
    if (error) throw error;
  }
  
  async apagar(albumId: string) {
  const { error } = await this.sb.client
    .from('albums')
    .delete()
    .eq('id', albumId);

  if (error) throw error;
}

}
