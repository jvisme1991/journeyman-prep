import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Browser-only Supabase client — no server helpers, middleware, or API
 * routes involved, so this stays compatible with a fully static build.
 * `null` when the env vars aren't configured, so guest/localStorage mode
 * (the default for everyone) never depends on Supabase being set up.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
