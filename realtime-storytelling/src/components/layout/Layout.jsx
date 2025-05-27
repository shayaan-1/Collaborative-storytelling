import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function POST(req) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  // Validate input
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('stories')
    .insert([
      {
        title,
        content,
        user_id: session.user.id, // Assuming user_id is the foreign key in the stories table
      },
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, story: data[0] }, { status: 201 });
}