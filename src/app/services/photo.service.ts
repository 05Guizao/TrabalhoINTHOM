import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

/** Estrutura usada em toda a app */
export interface StoredPhoto {
  id: string;      // id da linha em photos
  path: string;    // storage_path
  url: string;     // URL assinado (válido ~1 h)
}

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private sb: SupabaseService) {}

  /* -----------------------------------------------------------
     HELPERS
  ----------------------------------------------------------- */

  /** Gera /userId/AAAA/MM/DD/uuid_nome.ext */
  private buildPath(userId: string, filename: string) {
    const d   = new Date();
    const yy  = d.getUTCFullYear();
    const mm  = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd  = String(d.getUTCDate()).padStart(2, '0');
    const uid = crypto.randomUUID();
    return `${userId}/${yy}/${mm}/${dd}/${uid}_${filename}`;
  }

  /** Devolve URL assinado (privado) */
  private async toSignedUrl(storagePath: string, ttl = 3600): Promise<string> {
    const { data, error } = await this.sb.client
      .storage.from('fotos')
      .createSignedUrl(storagePath, ttl);
    if (error || !data) throw error ?? new Error('Falha URL assinado');
    return data.signedUrl;
  }

  /* -----------------------------------------------------------
     UPLOAD
  ----------------------------------------------------------- */

  /** Sobe um ficheiro e grava metadados; devolve storage_path */
  async upload(file: File): Promise<string> {
    const { data: u } = await this.sb.client.auth.getUser();
    const userId = u.user!.id;
    const path   = this.buildPath(userId, file.name);

    const { error } = await this.sb.client.storage
      .from('fotos')
      .upload(path, file, { cacheControl: '3600', contentType: file.type });

    if (error) throw error;

    await this.sb.client.from('photos').insert({
      owner: userId,
      storage_path: path,
      mime_type: file.type
    });

    return path;
  }

  /* -----------------------------------------------------------
     LISTAGENS
  ----------------------------------------------------------- */

  /** Todas as fotos do utilizador (para selector, etc.) */
  async listOwned(): Promise<StoredPhoto[]> {
    const { data: u } = await this.sb.client.auth.getUser();

    const { data: rows, error } = await this.sb.client
      .from('photos')
      .select('id, storage_path')
      .eq('owner', u.user!.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Promise.all(
      rows.map(async (r) => ({
        id:   r.id,
        path: r.storage_path,
        url:  await this.toSignedUrl(r.storage_path)
      }))
    );
  }

  /** Fotos já dentro de um álbum */
  async listInAlbum(albumId: string): Promise<StoredPhoto[]> {
  const { data, error } = await this.sb.client
    .from('album_photos')
    .select('photo:photo_id(id, storage_path)')
    .eq('album_id', albumId);

  if (error) throw error;

  return Promise.all(
    data
      .map((r: any) => r.photo)             // agora photo é um objeto
      .filter(Boolean)                      // remove nulls
      .map(async (p: any) => ({
        id:   p.id,
        path: p.storage_path,
        url:  await this.toSignedUrl(p.storage_path)
      }))
  );
}


  /* -----------------------------------------------------------
     ÁLBUM ↔ FOTO
  ----------------------------------------------------------- */

  /** Liga várias fotos existentes a um álbum */
  async addPhotosToAlbum(albumId: string, photoIds: string[]) {
    if (!photoIds.length) return;
    const rows = photoIds.map(pid => ({ album_id: albumId, photo_id: pid }));
    const { error } = await this.sb.client.from('album_photos').insert(rows);
    if (error) throw error;
  }
  
  /** Fotos do utilizador (versão simplificada com path + url) */
  async list(): Promise<{ path: string; url: string }[]> {
    const { data: u } = await this.sb.client.auth.getUser();

    const { data: rows, error } = await this.sb.client
      .from('photos')
      .select('storage_path')
      .eq('owner', u.user!.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Promise.all(
      rows.map(async (row) => ({
        path: row.storage_path,
        url: await this.toSignedUrl(row.storage_path)
      }))
    );
  }

  /** Externo — devolve URL assinado diretamente */
  async signedUrl(path: string, expires = 3600): Promise<string> {
    return this.toSignedUrl(path, expires);
  }

  /** Remove uma foto de um álbum */
  async deletePhotoFromAlbum(albumId: string, photoId: string): Promise<void> {
    const { error } = await this.sb.client
      .from('album_photos')
      .delete()
      .eq('album_id', albumId)
      .eq('photo_id', photoId);

    if (error) throw error;
  }

}
