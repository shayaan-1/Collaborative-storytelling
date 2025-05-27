// File: app/collaborate/components/JoinStoryModal.jsx
"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Key } from 'lucide-react'
import { joinStoryByCode } from '@/lib/api'

export default function JoinStoryModal({ isOpen, onClose, onSuccess }) {
  const [roomCode, setRoomCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await joinStoryByCode(roomCode)
      onSuccess(response.story_id)
    } catch (error) {
      setError(error.message || 'Failed to join story')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (value.length <= 8) {
      setRoomCode(value)
      setError('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-2 border-purple-200">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-gray-800">
            <Key className="mr-2 h-6 w-6 text-purple-600" />
            Join Story
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter the room code to join an existing collaborative story.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomCode" className="text-sm font-medium text-gray-700">
              Room Code *
            </Label>
            <Input
              id="roomCode"
              placeholder="Enter 8-character code..."
              value={roomCode}
              onChange={handleCodeChange}
              required
              className="border-2 border-purple-200 focus:border-purple-400 rounded-lg text-center text-lg font-mono tracking-wider"
              maxLength={8}
            />
            <p className="text-xs text-gray-500 text-center">
              Room codes are 8 characters long (letters and numbers)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

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
              disabled={loading || roomCode.length !== 8}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Story'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}