import { NextResponse } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/supabaseAdmin'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const token = cookies().get('access_token')?.value
    const { user, error: authError } = await getUserFromToken(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: stories, error } = await supabaseAdmin
      .from('collaborative_stories')
      .select(`
        *,
        participants:story_participants(count),
        contributions:story_contributions(count)
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
    }

    const formattedStories = stories.map(story => ({
      ...story,
      participants: story.participants || [],
      participant_count: story.participants?.[0]?.count || 0,
      contribution_count: story.contributions?.[0]?.count || 0
    }))

    return NextResponse.json(formattedStories)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
