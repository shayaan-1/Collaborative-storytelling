import { NextResponse } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

export async function POST(request) {
  try {
    const token = cookies().get('access_token')?.value
    const { user, error: authError } = await getUserFromToken(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, isPublic, maxParticipants } = await request.json()

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    let roomCode, isUnique = false, attempts = 0

    while (!isUnique && attempts < 10) {
      roomCode = generateRoomCode()
      const { data: existing } = await supabaseAdmin
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

    const { data: story, error: storyError } = await supabaseAdmin
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

    const { error: participantError } = await supabaseAdmin
      .from('story_participants')
      .insert({
        story_id: story.id,
        user_id: user.id,
        is_creator: true
      })

    if (participantError) {
      console.error('Participant creation error:', participantError)
    }

    return NextResponse.json(story)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
