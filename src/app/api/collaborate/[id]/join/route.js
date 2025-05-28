import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin, getUserFromToken } from '@/lib/supabaseAdmin'

export async function POST(request, { params }) {
  try {
    const token = cookies().get('access_token')?.value
    const { user, error: authError } = await getUserFromToken(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storyId = params.id

    const { data: story, error: storyError } = await supabaseAdmin
      .from('collaborative_stories')
      .select('*')
      .eq('id', storyId)
      .single()

    if (storyError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    const { data: existingParticipant } = await supabaseAdmin
      .from('story_participants')
      .select('id')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (existingParticipant) {
      return NextResponse.json({ message: 'Already joined this story' })
    }

    if (story.max_participants) {
      const { count } = await supabaseAdmin
        .from('story_participants')
        .select('*', { count: 'exact', head: true })
        .eq('story_id', storyId)

      if (count >= story.max_participants) {
        return NextResponse.json({ error: 'Story room is full' }, { status: 400 })
      }
    }

    const { error: participantError } = await supabaseAdmin
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
