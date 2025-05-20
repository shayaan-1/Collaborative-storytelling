'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreateStoryButton() {
  const router = useRouter();
  
  return (
    <Button 
      onClick={() => router.push('/dashboard/stories/new')}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all hover:shadow-lg"
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Create New Story
    </Button>
  );
}