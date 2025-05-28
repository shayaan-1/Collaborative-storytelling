// File: app/api/collaborate/[id]/contribute/route.js
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

    const storyId = await params.id
    const { content } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    if (content.length > 1000) {
      return NextResponse.json({ error: 'Content too long (max 1000 characters)' }, { status: 400 })
    }

    // Check if user is a participant
    const { data: participant } = await supabaseAdmin
      .from('story_participants')
      .select('id')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (!participant) {
      return NextResponse.json({ error: 'Must be a participant to contribute' }, { status: 403 })
    }

    // Add the contribution
    const { data: contribution, error: contributionError } = await supabaseAdmin
      .from('story_contributions')
      .insert({
        story_id: storyId,
        user_id: user.id,
        content: content.trim()
       })
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles!fk_user (
          username
        )
      `)
      .single()

    if (contributionError) {
      console.error('Contribution error:', contributionError)
      return NextResponse.json({ error: 'Failed to add contribution' }, { status: 500 })
    }

    // Return contribution with author name
    const contributionWithAuthor = {
      ...contribution,
      author_name: contribution.profiles?.display_name || contribution.profiles?.username || 'Anonymous Writer'
    }
    return NextResponse.json(contributionWithAuthor)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}