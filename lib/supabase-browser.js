// Creates a single browser Supabase client using @supabase/ssr as required.
import { createBrowserClient } from "@supabase/ssr"

let supabaseClient

export default function getSupabaseBrowserClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )
  }
  return supabaseClient
}
