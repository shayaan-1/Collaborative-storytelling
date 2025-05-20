import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export function StoryCard({ story, isOwner = false }) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    live: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{story.title}</CardTitle>
            <CardDescription className="mt-1">{story.genre}</CardDescription>
          </div>
          <Badge className={statusColors[story.status]}>
            {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{story.wordCount?.toLocaleString()} words</span>
          <span>Last edited: {new Date(story.lastEdited).toLocaleDateString()}</span>
        </div>
        {story.collaborators?.length > 0 && (
          <div className="mt-2 text-sm">
            Collaborators: {story.collaborators.length}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View</Button>
        {isOwner && (
          <Button>Continue</Button>
        )}
      </CardFooter>
    </Card>
  );
}