"use client"
import { useState, useEffect } from 'react'
import { Plus, Users, Copy, Check, Search, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { getCollaborativeStories, joinStoryRoom } from '@/lib/api'
import CreateStoryModal from './components/CreateStoryModal'
import JoinStoryModal from './components/JoinStoryModal'

export default function CollaboratePage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const data = await getCollaborativeStories()
      setStories(data)
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinStory = async (storyId) => {
    try {
      await joinStoryRoom(storyId)
      router.push(`/collaborate/${storyId}`)
    } catch (error) {
      console.error('Error joining story:', error)
    }
  }

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Collaborative Storytelling
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create amazing stories together in real-time. Join existing stories or start your own adventure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={() => setShowCreateModal(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Story
          </Button>
          <Button
            onClick={() => setShowJoinModal(true)}
            variant="outline"
            size="lg"
            className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Users className="mr-2 h-5 w-5" />
            Join with Code
          </Button>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-400 bg-white/70 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onJoin={() => handleJoinStory(story.id)}
            />
          ))}
          
          {filteredStories.length === 0 && !loading && (
            <div className="col-span-full text-center py-12">
              <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
              <p className="text-gray-500">Be the first to create a collaborative story!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateStoryModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={(storyId) => {
          setShowCreateModal(false)
          router.push(`/collaborate/${storyId}`)
        }}
      />
      
      <JoinStoryModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSuccess={(storyId) => {
          setShowJoinModal(false)
          router.push(`/collaborate/${storyId}`)
        }}
      />
    </div>
  )
}

// Story Card Component
function StoryCard({ story, onJoin }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(story.room_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-2 border-purple-100 hover:border-purple-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
            {story.title}
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {story.participants?.length || 0} writers
          </Badge>
        </div>
        <CardDescription className="text-gray-600 line-clamp-2">
          {story.description || "Join this exciting collaborative story adventure!"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-1 h-4 w-4" />
            {new Date(story.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
              {story.room_code}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="p-1 h-8 w-8"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <Button
          onClick={onJoin}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full transition-all duration-300"
        >
          <Users className="mr-2 h-4 w-4" />
          Join Story
        </Button>
      </CardContent>
    </Card>
  )
}
