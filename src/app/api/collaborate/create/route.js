// File: api/collaborate/create/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Generate unique room code
function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { title, description, isPublic, maxParticipants } = await request.json()

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Generate unique room code
    let roomCode
    let isUnique = false
    let attempts = 0
    
    while (!isUnique && attempts < 10) {
      roomCode = generateRoomCode()
      const { data: existing } = await supabase
        .from('collaborative_stories')
        .select('id')
        .eq('room_code', roomCode)
        .single()
      
      if (!existing) isUnique = true
      attempts++
    }

    if (!isUnique) {
      return NextResponse.json({ error: 'Failed to generate unique room code' }, { status: 500 })
    }

    // Create the story
    const { data: story, error: storyError } = await supabase
      .from('collaborative_stories')
      .insert({
        title: title.trim(),
        description: description?.trim() || null,
        room_code: roomCode,
        creator_id: user.id,
        is_public: isPublic || false,
        max_participants: maxParticipants || 5
      })
      .select()
      .single()

    if (storyError) {
      console.error('Story creation error:', storyError)
      return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
    }

    // Add creator as first participant
    const { error: participantError } = await supabase
      .from('story_participants')
      .insert({
        story_id: story.id,
        user_id: user.id,
        is_creator: true
      })

    if (participantError) {
      console.error('Participant creation error:', participantError)
      // Don't fail the whole request, just log the error
    }

    return NextResponse.json(story)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}