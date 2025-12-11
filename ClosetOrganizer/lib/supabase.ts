// lib/supabase.ts
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // simple for now, no auth
  },
});

// Optional helper: if you later want to set Supabase auth using a token (for server-side RLS or to pass a JWT),
// you can call this from the client after verifying the user (or from server) to set the auth header.
// For example, if you map Clerk JWT -> Supabase JWT, call:
//   setSupabaseAuth(token);
export function setSupabaseAuth(token: string | null) {
  if (!token) return;
  // `setAuth` is a small helper to set the Authorization header for the client.
  // Depending on supabase-js version you may need to use `supabase.auth.setAuth(token)`
  // or re-create the client with new key. This helper is a hint for future integration.
  try {
    // @ts-ignore
    supabase.auth.setAuth?.(token);
  } catch (e) {
    console.warn('setSupabaseAuth: setAuth not supported by current supabase client', e);
  }
}
