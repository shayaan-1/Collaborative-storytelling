// lib/supabaseAdminClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function getUserFromToken(token) {
  if (!token) return { user: null, error: 'No token provided' }
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  return { user, error }
}