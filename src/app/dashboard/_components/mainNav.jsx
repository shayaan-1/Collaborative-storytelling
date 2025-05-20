'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Bookmark, User, Bell } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();
  
  return (
    <nav className="flex items-center space-x-2">
      <Button asChild variant={pathname === '/dashboard' ? 'default' : 'ghost'} size="sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </Button>
      <Button asChild variant={pathname === '/dashboard/bookmarks' ? 'default' : 'ghost'} size="sm">
        <Link href="/dashboard/bookmarks" className="flex items-center gap-2">
          <Bookmark className="h-4 w-4" />
          <span>Bookmarks</span>
        </Link>
      </Button>
      <Button asChild variant={pathname === '/dashboard/notifications' ? 'default' : 'ghost'} size="sm">
        <Link href="/dashboard/notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </Link>
      </Button>
      <Button asChild variant={pathname === '/dashboard/profile' ? 'default' : 'ghost'} size="sm">
        <Link href="/dashboard/profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </Button>
    </nav>
  );
}