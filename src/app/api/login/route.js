import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  // Login using Supabase Auth
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Get user profile info (role, username, etc)
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('username, admin')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: 'Login successful',
    user: {
      id: data.user.id,
      email: data.user.email,
      username: profile.username,
      admin: profile.admin,
    },
    session: data.session,
  });
}
