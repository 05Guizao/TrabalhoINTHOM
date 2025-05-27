import { Injectable } from '@angular/core';
import { supabase } from 'src/supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  async register(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    return { data, error };
  }

  async login(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  async logout(): Promise<any> {
    const { error } = await supabase.auth.signOut();
    return error;
  }

  async getUser(): Promise<any> {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  }
}
