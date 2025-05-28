// File: lib/api.js (Updated)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get auth token from cookies (you mentioned auth is set up via cookies)
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1]
  }
  return null
}

// Set auth header for requests
const getAuthHeaders = () => {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// API Functions for Collaborative Stories

export async function getCollaborativeStories() {
  try {
    const response = await fetch('/api/collaborate/stories', {
      headers: getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch stories')
    return await response.json()
  } catch (error) {
    console.error('Error fetching collaborative stories:', error)
    throw error
  }
}

export async function createCollaborativeStory(storyData) {
  try {
    const response = await fetch('/api/collaborate/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(storyData)
    })
    if (!response.ok) throw new Error('Failed to create story')
    return await response.json()
  } catch (error) {
    console.error('Error creating collaborative story:', error)
    throw error
  }
}

export async function joinStoryByCode(roomCode) {
  try {
    const response = await fetch('/api/collaborate/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ room_code: roomCode })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to join story')
    }
    return await response.json()
  } catch (error) {
    console.error('Error joining story by code:', error)
    throw error
  }
}

export async function joinStoryRoom(storyId) {
  try {
    const response = await fetch(`/api/collaborate/${storyId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })
    if (!response.ok) throw new Error('Failed to join story room')
    return await response.json()
  } catch (error) {
    console.error('Error joining story room:', error)
    throw error
  }
}


export async function getStoryDetails(storyId) {
  try {
    const response = await fetch(`/api/collaborate/${storyId}`, {
      headers: getAuthHeaders()
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to fetch story details')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching story details:', error)
    throw error
  }
}

export async function addStoryContribution(storyId, content) {
  try {
    const response = await fetch(`/api/collaborate/${storyId}/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to add contribution')
    }
    return await response.json()
  } catch (error) {
    console.error('Error adding story contribution:', error)
    throw error
  }
}

export function subscribeToStoryUpdates(storyId, callbacks) {
  const channel = supabase
    .channel(`story-${storyId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'story_contributions',
      filter: `story_id=eq.${storyId}`
    }, async (payload) => {
      if (callbacks.onContribution) {
        // Fetch the user profile for the new contribution
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, display_name')
          .eq('id', payload.new.user_id)
          .single()
        
        const contributionWithAuthor = {
          ...payload.new,
          author_name: profile?.display_name || profile?.username || 'Anonymous Writer'
        }
        
        callbacks.onContribution(contributionWithAuthor)
      }
    })
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public', 
      table: 'story_participants',
      filter: `story_id=eq.${storyId}`
    }, async (payload) => {
      if (callbacks.onParticipantJoin) {
        // Fetch the user profile for the new participant
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, display_name')
          .eq('id', payload.new.user_id)
          .single()
        
        const participantWithName = {
          ...payload.new,
          name: profile?.display_name || profile?.username || 'Anonymous Writer'
        }
        
        callbacks.onParticipantJoin(participantWithName)
      }
    })
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'story_participants', 
      filter: `story_id=eq.${storyId}`
    }, (payload) => {
      if (callbacks.onParticipantLeave) {
        callbacks.onParticipantLeave(payload.old.user_id)
      }
    })
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}