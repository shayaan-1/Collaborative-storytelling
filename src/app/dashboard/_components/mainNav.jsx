'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Bookmark, User, Bell, BookOpen } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path;
  
  return (
    <nav className="flex items-center space-x-1">
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
      
      <Button 
        asChild 
        variant={isActive('/dashboard/profile') ? 'default' : 'ghost'} 
        size="sm"
        className={isActive('/dashboard/profile') ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'hover:bg-purple-50'}
      >
        <Link href="/dashboard/profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </Button>
    </nav>
  );
}