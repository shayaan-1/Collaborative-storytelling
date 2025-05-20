import { getExploreStories } from '@/lib/api/stories';
import { StoryCard } from './StoryCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ExploreStories() {
  const stories = getExploreStories();
  
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Explore Stories</h2>
      
      <Tabs defaultValue="latest" className="w-full">
        <TabsList>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
          <TabsTrigger value="scifi">Sci-Fi</TabsTrigger>
          <TabsTrigger value="mystery">Mystery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="latest">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {stories
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {stories
              .sort((a, b) => b.likes - a.likes)
              .map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
          </div>
        </TabsContent>
        
        {/* Other genre tabs would filter similarly */}
      </Tabs>
    </section>
  );
}