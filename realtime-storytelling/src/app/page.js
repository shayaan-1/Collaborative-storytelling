// filepath: d:\Full Stack Projects\next-js-fullstack\realtime-storytelling\src\app\api\createStory\route.js
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  const { data, error } = await supabaseAdmin
    .from('stories')
    .insert([
      {
        title,
        content,
        user_id: session.user.id, // Assuming user ID is stored in session
      },
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, story: data[0] }, { status: 201 });
}