import { NextResponse } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const token = cookies().get('access_token')?.value
    const { user, error: authError } = await getUserFromToken(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { room_code } = await request.json()

    if (!room_code?.trim()) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 })
    }

    const { data: story, error: storyError } = await supabaseAdmin
      .from('collaborative_stories')
      .select('*')
      .eq('room_code', room_code.trim().toUpperCase())
      .single()

    if (storyError || !story) {
      return NextResponse.json({ error: 'Invalid room code' }, { status: 404 })
    }

    const { data: existingParticipant } = await supabaseAdmin
      .from('story_participants')
      .select('id')
      .eq('story_id', story.id)
      .eq('user_id', user.id)
      .single()

    if (existingParticipant) {
      return NextResponse.json({
        story_id: story.id,
        message: 'Already joined this story'
      })
    }

    if (story.max_participants) {
      const { count } = await supabaseAdmin
        .from('story_participants')
        .select('*', { count: 'exact', head: true })
        .eq('story_id', story.id)

      if (count >= story.max_participants) {
        return NextResponse.json({ error: 'Story room is full' }, { status: 400 })
      }
    }

    const { error: participantError } = await supabaseAdmin
      .from('story_participants')
      .insert({
        story_id: story.id,
        user_id: user.id,
        is_creator: false
      })

    if (participantError) {
      console.error('Participant join error:', participantError)
      return NextResponse.json({ error: 'Failed to join story' }, { status: 500 })
    }

    return NextResponse.json({
      story_id: story.id,
      message: 'Successfully joined story'
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
