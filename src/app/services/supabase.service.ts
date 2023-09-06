import {Injectable} from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import {environment} from 'src/environments/environment'

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supaBase: SupabaseClient

  constructor() {
    this.supaBase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  getSupaBase(){
    return this.supaBase
  }
}
