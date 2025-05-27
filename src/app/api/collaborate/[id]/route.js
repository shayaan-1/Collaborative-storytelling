// File: api/collaborate/[id]/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request, { params }) {
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

    // Check if user is a participant
    const { data: participant } = await supabase
      .from('story_participants')
      .select('*')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (!participant && !story.is_public) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get participants with user details
    const { data: participants, error: participantsError } = await supabase
      .from('story_participants')
      .select(`
        *,
        user:users(id, email, name)
      `)
      .eq('story_id', storyId)

    if (participantsError) {
      console.error('Participants fetch error:', participantsError)
    }

    // Get contributions with author details
    const { data: contributions, error: contributionsError } = await supabase
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

    // Format the response
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