import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  // Get user from token
  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get('title');
  const genre = formData.get('genre');
  const content = formData.get('content');
  const thumbnailFile = formData.get('thumbnail');

  if (!title || !genre || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  let thumbnailUrl = null;

  if (thumbnailFile && thumbnailFile.size > 0) {
    const fileName = `${user.id}_${Date.now()}_${thumbnailFile.name}`;

    try {
      // Convert file to buffer instead of using stream
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('story-thumbnails')
        .upload(fileName, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: thumbnailFile.type,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from('story-thumbnails')
        .getPublicUrl(fileName);
      
      thumbnailUrl = urlData.publicUrl;
    } catch (uploadError) {
      console.error('File processing error:', uploadError);
      return NextResponse.json({ error: 'Failed to process thumbnail' }, { status: 500 });
    }
  }

  // Insert new story
  const { data, error } = await supabaseAdmin
    .from('stories')
    .insert([
      {
        title,
        genre,
        content,
        thumbnail: thumbnailUrl,
        author_id: user.id,
        status: 'Draft',
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Story created', story: data }, { status: 201 });
}