'use client';

import { useRouter } from 'next/navigation';
import { Home, Bookmark, User, Bell, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserWelcome } from './_components/userWelcome';
import { UserStories } from './_components/userStories';
import { ExploreStories } from './_components/exploreStories';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">StoryForge</span>
            </Link>
            
            <div className="hidden md:block max-w-md w-full">
              <Input 
                type="search" 
                placeholder="Search stories..." 
                className="w-full bg-gray-50 border-gray-200 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center space-x-1">
              <Button 
                asChild 
                variant={isActive('/dashboard') ? 'default' : 'ghost'} 
                size="sm"
                className={isActive('/dashboard') ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'hover:bg-purple-50'}
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant={isActive('/dashboard/bookmarks') ? 'default' : 'ghost'} 
                size="sm"
                className={isActive('/dashboard/bookmarks') ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'hover:bg-purple-50'}
              >
                <Link href="/dashboard/bookmarks" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Bookmarks</span>
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant={isActive('/dashboard/notifications') ? 'default' : 'ghost'} 
                size="sm"
                className={isActive('/dashboard/notifications') ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'hover:bg-purple-50'}
              >
                <Link href="/dashboard/notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Link>
              </Button>
            </nav>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-purple-100 transition-all hover:ring-purple-200">
                  <AvatarImage src="https://api.dicebear.com/7.x/miniavs/svg?seed=storyteller" />
                  <AvatarFallback className="bg-purple-100 text-purple-800">ST</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Stories</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="space-y-10">
          <UserWelcome />
          <UserStories />
          <ExploreStories />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-purple-600 font-medium">StoryForge</p>
              <p className="text-sm text-gray-500">Unleash your imagination, one story at a time.</p>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">About</Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">Help</Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">Privacy</Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">Terms</Link>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} StoryForge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}