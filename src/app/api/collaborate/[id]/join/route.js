// File: api/collaborate/[id]/join/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request, { params }) {
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

    const storyId = params.id

    // Get story details
    const { data: story, error: storyError } = await supabase
      .from('collaborative_stories')
      .select('*')
      .eq('id', storyId)
      .single()

    if (storyError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    // Check if user is already a participant
    const { data: existingParticipant } = await supabase
      .from('story_participants')
      .select('id')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (existingParticipant) {
      return NextResponse.json({ message: 'Already joined this story' })
    }

    // Check participant limit
    if (story.max_participants) {
      const { count } = await supabase
        .from('story_participants')
        .select('*', { count: 'exact', head: true })
        .eq('story_id', storyId)

      if (count >= story.max_participants) {
        return NextResponse.json({ error: 'Story room is full' }, { status: 400 })
      }
    }

    // Add user as participant
    const { error: participantError } = await supabase
      .from('story_participants')
      .insert({
        story_id: storyId,
        user_id: user.id,
        is_creator: false
      })

    if (participantError) {
      console.error('Participant join error:', participantError)
      return NextResponse.json({ error: 'Failed to join story' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Successfully joined story' })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
