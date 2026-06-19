import { createClient } from '@supabase/supabase-js'

// Vite automatically reads keys from your .env.local file using import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This initializes the secure connection client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)