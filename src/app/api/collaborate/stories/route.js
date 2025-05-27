// File: api/collaborate/stories/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
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

    // Get public collaborative stories with participant counts
    const { data: stories, error } = await supabase
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

    // Format the response
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