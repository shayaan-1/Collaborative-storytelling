import { getUserStories } from '@/lib/api/stories';
import { StoryCard } from './StoryCard';
import { CreateStoryButton } from './CreateStoryButton';

export function UserStories() {
  const stories = getUserStories('user1'); // Replace with actual user ID
  
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Stories</h2>
        <CreateStoryButton />
      </div>
      
      {stories.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">You don't have any stories yet</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} isOwner />
          ))}
        </div>
      )}
    </section>
  );
}