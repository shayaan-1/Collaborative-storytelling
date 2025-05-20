import { getUserStories } from '@/lib/stories';
import { StoryCard } from './StoryCard';
import { CreateStoryButton } from './CreateStoryButton';
import { BookMarked, PenLine } from 'lucide-react';

export function UserStories() {
  const stories = getUserStories('1'); // Replace with actual user ID
  
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookMarked className="h-5 w-5 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-800">Your Stories</h2>
        </div>
        <CreateStoryButton />
      </div>
      
      {stories.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-purple-200 bg-purple-50 p-10 text-center">
          <div className="flex flex-col items-center">
            <PenLine className="h-12 w-12 text-purple-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Start Your Creative Journey</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">You don't have any stories yet. Create your first story and bring your imagination to life!</p>
            <CreateStoryButton />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} isOwner />
          ))}
        </div>
      )}
    </section>
  );
}