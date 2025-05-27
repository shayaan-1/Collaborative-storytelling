// filepath: src/app/api/createStory/route.js
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Adjust the import based on your auth setup

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
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
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, story: data[0] }, { status: 201 });
}