// File: app/collaborate/[id]/page.jsx
"use client"
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Send, Users, Copy, Check, ArrowLeft, Settings, Crown, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getStoryDetails, addStoryContribution, subscribeToStoryUpdates } from '@/lib/liveStory'

export default function StoryRoomPage() {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState(null)
  const [content, setContent] = useState('')
  const [participants, setParticipants] = useState([])
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const textareaRef = useRef(null)
  const contributionsEndRef = useRef(null)

  useEffect(() => {
    if (params.id) {
      initializeStoryRoom()
    }
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [contributions])

  // Get current user info from token
  const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]
      console.log('Token:', token)
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          return { id: payload.sub, email: payload.email }
        } catch (error) {
          console.error('Error parsing token:', error)
        }
      }
    }
    return null
  }

  const initializeStoryRoom = async () => {
    try {
      // Get current user
      const user = getCurrentUser()
      console.log(user)
      setCurrentUser(user)

      const storyData = await getStoryDetails(params.id)
      setStory(storyData)
      console.log(storyData)
      setParticipants(storyData.participants || [])
      setContributions(storyData.contributions || [])
      
      // Subscribe to real-time updates
      const unsubscribe = subscribeToStoryUpdates(params.id, {
        onContribution: (contribution) => {
          setContributions(prev => [...prev, contribution])
        },
        onParticipantJoin: (participant) => {
          setParticipants(prev => {
            // Check if participant already exists
            const exists = prev.some(p => p.user_id === participant.user_id)
            if (!exists) {
              return [...prev, participant]
            }
            return prev
          })
        },
        onParticipantLeave: (participantUserId) => {
          setParticipants(prev => prev.filter(p => p.user_id !== participantUserId))
        }
      })

      return () => unsubscribe()
    } catch (error) {
      console.error('Error loading story:', error)
      router.push('/collaborate')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() || sending) return

    setSending(true)
    try {
      const newContribution = await addStoryContribution(params.id, content.trim())
      // Don't add to local state here - let real-time updates handle it
      setContent('')
      textareaRef.current?.focus()
    } catch (error) {
      console.error('Error adding contribution:', error)
      // Show error to user
      alert('Failed to add contribution. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(story.room_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy room code:', error)
    }
  }

  const scrollToBottom = () => {
    contributionsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Get current user's name from participants
  const getCurrentUserName = () => {
    if (!currentUser || !participants.length) return 'You'
    const currentParticipant = participants.find(p => p.user_id === currentUser.id)
    return currentParticipant?.name || 'You'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Story not found</h2>
          <Button onClick={() => router.push('/collaborate')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Story Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/collaborate')}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">{story.title}</h1>
                {story.description && (
                  <p className="text-gray-600 mt-1">{story.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <code className="px-3 py-1 bg-white/70 rounded-lg text-sm font-mono border">
                  {story.room_code}
                </code>
                <Button variant="ghost" size="sm" onClick={copyRoomCode}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {participants.length} {participants.length === 1 ? 'writer' : 'writers'} active
              </Badge>
            </div>
          </div>

          {/* Participants */}
          <Card className="w-full lg:w-80 bg-white/80 backdrop-blur-sm border-2 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-purple-600" />
                Writers ({participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {participants.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-2">
                    Loading participants...
                  </div>
                ) : (
                  participants.map((participant, index) => (
                    <div key={participant.user_id || index} className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                          {participant.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-700">
                        {currentUser && participant.user_id === currentUser.id 
                          ? `${participant.name || 'You'} (You)` 
                          : (participant.name || 'Anonymous Writer')
                        }
                      </span>
                      {participant.is_creator && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contributions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <Edit3 className="mr-2 h-5 w-5 text-purple-600" />
                  Story Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-0">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {contributions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Edit3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Start the Story</p>
                      <p>Be the first to contribute to this collaborative tale!</p>
                    </div>
                  ) : (
                    contributions.map((contribution, index) => (
                      <div key={contribution.id || index} className="group">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                              {contribution.author_name?.charAt(0)?.toUpperCase() || 'A'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                {currentUser && contribution.user_id === currentUser.id 
                                  ? 'You' 
                                  : (contribution.author_name || 'Anonymous')
                                }
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(contribution.created_at).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 group-hover:bg-gray-100 transition-colors">
                              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {contribution.content}
                              </p>
                            </div>
                          </div>
                        </div>
                        {index < contributions.length - 1 && (
                          <Separator className="my-4 opacity-30" />
                        )}
                      </div>
                    ))
                  )}
                  <div ref={contributionsEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="border-t pt-4">
                  <div className="space-y-3">
                    <Textarea
                      ref={textareaRef}
                      placeholder="Continue the story... (Ctrl/Cmd + Enter to send)"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={handleKeyPress}
                      rows={3}
                      className="resize-none border-2 border-purple-200 focus:border-purple-400 rounded-lg"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {content.length}/1000 characters
                      </p>
                      <Button
                        type="submit"
                        disabled={!content.trim() || sending || content.length > 1000}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        {sending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Add to Story
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Story Stats & Settings */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Story Stats</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Contributions</span>
                    <Badge variant="outline">{contributions.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Word Count</span>
                    <Badge variant="outline">
                      {contributions.reduce((acc, c) => acc + c.content.split(' ').length, 0)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Writers</span>
                    <Badge variant="outline">{participants.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm text-gray-500">
                      {new Date(story.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Settings className="mr-2 h-5 w-5 text-purple-600" />
                  Room Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Visibility</span>
                    <Badge variant={story.is_public ? "default" : "secondary"}>
                      {story.is_public ? "Public" : "Private"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max Writers</span>
                    <span className="text-sm text-gray-500">{story.max_participants || 'Unlimited'}</span>
                  </div>
                  <Separator />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyRoomCode}
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Share Room Code
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}