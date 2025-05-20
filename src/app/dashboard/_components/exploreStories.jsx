import { getExploreStories } from '@/lib/stories';
import { StoryCard } from './StoryCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, TrendingUp, WandSparkles, Rocket, Search } from 'lucide-react';

export function ExploreStories() {
  const stories = getExploreStories();
  
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="h-5 w-5 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Explore Stories</h2>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-0.5 rounded-xl">
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="grid grid-cols-5 bg-white rounded-lg p-1">
            <TabsTrigger value="latest" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" />
              <span>Latest</span>
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4" />
              <span>Popular</span>
            </TabsTrigger>
            <TabsTrigger value="fantasy" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
              <WandSparkles className="h-4 w-4" />
              <span>Fantasy</span>
            </TabsTrigger>
            <TabsTrigger value="scifi" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
              <Rocket className="h-4 w-4" />
              <span>Sci-Fi</span>
            </TabsTrigger>
            <TabsTrigger value="mystery" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
              <Search className="h-4 w-4" />
              <span>Mystery</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories
                .sort((a, b) => b.likes - a.likes)
                .map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
            </div>
          </TabsContent>
          
          {/* Other genre tabs would filter similarly */}
          <TabsContent value="fantasy" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories
                .filter(story => story.genre?.toLowerCase().includes('fantasy'))
                .map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="scifi" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories
                .filter(story => story.genre?.toLowerCase().includes('sci') || story.genre?.toLowerCase().includes('science'))
                .map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mystery" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories
                .filter(story => story.genre?.toLowerCase().includes('mystery') || story.genre?.toLowerCase().includes('thriller'))
                .map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}