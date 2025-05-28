'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createStory } from '@/lib/story';
import { Upload, Sparkles, BookOpen, Wand2, Image, FileText, Tag } from 'lucide-react';

export default function CreateStoryPage() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleThumbnailChange = (file) => {
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStory({ title, genre, content, thumbnail });
      toast.success('Story created successfully! ✨');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Error creating story');
    } finally {
      setLoading(false);
    }
  };

  const genreOptions = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller', 
    'Horror', 'Adventure', 'Drama', 'Comedy', 'Historical Fiction'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Craft Your Story
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bring your imagination to life. Create compelling narratives that captivate readers and transport them to new worlds.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="space-y-8">
              
              {/* Title Input */}
              <div className="group">
                <Label htmlFor="title" className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Story Title
                </Label>
                <div className="relative">
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter your captivating title..."
                    className="h-14 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Genre Selection */}
              <div className="group">
                <Label htmlFor="genre" className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  <Tag className="w-5 h-5 text-indigo-500" />
                  Genre
                </Label>
                <div className="relative">
                  <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    className="w-full h-14 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 px-4 appearance-none cursor-pointer"
                  >
                    <option value="">Choose your genre...</option>
                    {genreOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <Wand2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Content Editor */}
              <div className="group">
                <Label htmlFor="content" className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  Story Content
                </Label>
                <div className="relative">
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Once upon a time... Let your creativity flow and tell your story."
                    rows={12}
                    className="text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600 resize-none leading-relaxed"
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {content.length} characters
                  </div>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="group">
                <Label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  <Image className="w-5 h-5 text-pink-500" />
                  Story Thumbnail
                  <span className="text-sm font-normal text-gray-500">(optional)</span>
                </Label>
                
                <div
                  className={`relative border-2 border-dashed rounded-2xl transition-all duration-300
                      border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                  } hover:border-pink-400 dark:hover:border-pink-500`}
                >
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => handleThumbnailChange(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  <div className="p-8 text-center">
                    {thumbnailPreview ? (
                      <div className="space-y-4">
                        <img 
                          src={thumbnailPreview} 
                          alt="Preview" 
                          className="w-48 h-32 object-cover rounded-lg mx-auto shadow-lg"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click or drag to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Drop your image here or click to browse
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 border-0 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:transform-none relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Your Masterpiece...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      Publish Story
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400">
            Every great story starts with a single word. Make yours count. ✨
          </p>
        </div>
      </div>
    </div>
  );
}