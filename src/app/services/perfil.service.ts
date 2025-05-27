import { Injectable } from '@angular/core';
import { supabase } from 'src/supabase';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor() {}

  async inserirPerfil(id: string, nome: string, apelido: string) {
    const { error } = await supabase
      .from('perfil')
      .insert([{ id, nome, apelido }]);

    return error;
  }

  async obterPerfil() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) return null;

    const userId = userData.user.id;

    const { data, error } = await supabase
      .from('perfil')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;

    return data;
  }
}
