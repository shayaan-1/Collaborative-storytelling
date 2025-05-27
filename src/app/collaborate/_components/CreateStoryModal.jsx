// File: app/collaborate/components/CreateStoryModal.jsx
"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Loader2, Sparkles } from 'lucide-react'
import { createCollaborativeStory } from '@/lib/api'

export default function CreateStoryModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: true,
    maxParticipants: 5
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await createCollaborativeStory(formData)
      onSuccess(response.id)
    } catch (error) {
      console.error('Error creating story:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-2 border-purple-200">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-gray-800">
            <Sparkles className="mr-2 h-6 w-6 text-purple-600" />
            Create New Story
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Start a new collaborative storytelling adventure. Others can join using the room code.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Story Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter an exciting title..."
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your story concept..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">Public Story</Label>
                <p className="text-xs text-gray-500">Allow others to discover this story</p>
              </div>
              <Switch
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleChange('isPublic', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="text-sm font-medium text-gray-700">
                Max Participants
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                min="2"
                max="10"
                value={formData.maxParticipants}
                onChange={(e) => handleChange('maxParticipants', parseInt(e.target.value))}
                className="border-2 border-purple-200 focus:border-purple-400 rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Story'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
