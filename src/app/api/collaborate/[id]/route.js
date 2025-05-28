// File: app/api/collaborate/[id]/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin, getUserFromToken } from '@/lib/supabaseAdmin'

export async function GET(request, { params }) {
  try {
    const token = cookies().get('access_token')?.value
    const { user, error: authError } = await getUserFromToken(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storyId = await params.id

    // Check if user is a participant in this story
    const { data: participant } = await supabaseAdmin
      .from('story_participants')
      .select('id')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (!participant) {
      return NextResponse.json({ error: 'Access denied. You are not a participant in this story.' }, { status: 403 })
    }

    // Get story details
    const { data: story, error: storyError } = await supabaseAdmin
      .from('collaborative_stories')
      .select('*')
      .eq('id', storyId)
      .single()

    if (storyError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    // Get all participants with their profile information
    const { data: participants, error: participantsError } = await supabaseAdmin
      .from('story_participants')
      .select(`
        id,
        user_id,
        is_creator,
        created_at,
        profiles!fk_user (
          username
        )
      `)
      .eq('story_id', storyId)
      .order('created_at', { ascending: true })

    if (participantsError) {
      console.error('Error fetching participants:', participantsError)
    }

    // Transform participants data to include name
    const transformedParticipants = participants?.map(p => ({
      id: p.id,
      user_id: p.user_id,
      is_creator: p.is_creator,
      created_at: p.created_at,
      name: p.profiles?.display_name || p.profiles?.username || 'Anonymous Writer'
    })) || []

    // Get all story contributions with author information
    const { data: contributions, error: contributionsError } = await supabaseAdmin
      .from('story_contributions')
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles!fk_user (
          username
        )
      `)
      .eq('story_id', storyId)
      .order('created_at', { ascending: true })

    if (contributionsError) {
      console.error('Error fetching contributions:', contributionsError)
    }

    // Transform contributions data to include author name
    const transformedContributions = contributions?.map(c => ({
      id: c.id,
      content: c.content,
      created_at: c.created_at,
      user_id: c.user_id,
      author_name: c.profiles?.display_name || c.profiles?.username || 'Anonymous Writer'
    })) || []

    // Return complete story data
    return NextResponse.json({
      ...story,
      participants: transformedParticipants,
      contributions: transformedContributions
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}