import { NextResponse } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'

export async function GET(request, { params }) {
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

    // Check if user is a participant or story is public
    const { data: participant } = await supabaseAdmin
      .from('story_participants')
      .select('*')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (!participant && !story.is_public) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Fetch participants with user info
    const { data: participants, error: participantsError } = await supabaseAdmin
      .from('story_participants')
      .select(`
        *,
        user:users(id, email, name)
      `)
      .eq('story_id', storyId)

    if (participantsError) {
      console.error('Participants fetch error:', participantsError)
    }

    // Fetch contributions with author info
    const { data: contributions, error: contributionsError } = await supabaseAdmin
      .from('story_contributions')
      .select(`
        *,
        author:users(id, email, name)
      `)
      .eq('story_id', storyId)
      .order('created_at', { ascending: true })

    if (contributionsError) {
      console.error('Contributions fetch error:', contributionsError)
    }

    // Format response
    const storyDetails = {
      ...story,
      participants: (participants || []).map(p => ({
        id: p.user_id,
        name: p.user?.name || p.user?.email || 'Anonymous',
        is_creator: p.is_creator,
        joined_at: p.created_at
      })),
      contributions: (contributions || []).map(c => ({
        id: c.id,
        content: c.content,
        author_name: c.author?.name || c.author?.email || 'Anonymous',
        created_at: c.created_at
      }))
    }

    return NextResponse.json(storyDetails)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
