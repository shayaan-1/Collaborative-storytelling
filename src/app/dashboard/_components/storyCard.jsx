import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Eye, Edit, Clock, Users } from 'lucide-react';

export function StoryCard({ story, isOwner = false }) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
    live: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-purple-100 text-purple-800 border-purple-200',
    public: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  const status = story.status || 'public';
  const formattedDate = new Date(story.lastEdited).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group bg-white relative">
      {/* Color accent on top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-indigo-500" />
      
      <CardHeader className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <CardDescription className="text-purple-500 font-medium">{story.genre}</CardDescription>
            </div>
            <CardTitle className="text-lg font-bold group-hover:text-purple-700 transition-colors">{story.title}</CardTitle>
          </div>
          <Badge className={`${statusColors[status]} px-2 py-0.5 text-xs font-medium`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            Last edited: {formattedDate}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Edit className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              {story.wordCount?.toLocaleString() || 0} words
            </div>
            
            {story.collaborators?.length > 0 && (
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                {story.collaborators.length} collaborator{story.collaborators.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t bg-gray-50 py-3">
        <Button variant="ghost" className="text-gray-700 hover:text-purple-700 hover:bg-purple-50">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        {isOwner && (
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
            <Edit className="h-4 w-4 mr-2" />
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}