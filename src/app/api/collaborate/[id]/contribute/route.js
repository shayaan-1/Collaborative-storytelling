// File: api/collaborate/[id]/contribute/route.js
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
    const { content } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    if (content.length > 1000) {
      return NextResponse.json({ error: 'Content too long (max 1000 characters)' }, { status: 400 })
    }

    // Check if user is a participant
    const { data: participant } = await supabase
      .from('story_participants')
      .select('*')
      .eq('story_id', storyId)
      .eq('user_id', user.id)
      .single()

    if (!participant) {
      return NextResponse.json({ error: 'Must be a participant to contribute' }, { status: 403 })
    }

    // Add contribution
    const { data: contribution, error: contributionError } = await supabase
      .from('story_contributions')
      .insert({
        story_id: storyId,
        user_id: user.id,
        content: content.trim()
      })
      .select()
      .single()

    if (contributionError) {
      console.error('Contribution error:', contributionError)
      return NextResponse.json({ error: 'Failed to add contribution' }, { status: 500 })
    }

    return NextResponse.json(contribution)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}