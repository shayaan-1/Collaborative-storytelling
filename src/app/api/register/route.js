import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password, username, admin } = await req.json();

  // Register user via Supabase Auth
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Skip email confirmation
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Insert additional profile info in profiles table
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert([
      {
        id: data.user.id,
        username,
        admin: admin === true, // Use admin from request body
      },
    ]);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'User registered successfully' });
}
