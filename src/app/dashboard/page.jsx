'use client';

import { useRouter } from 'next/navigation';
import { Home, Bookmark, User, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserWelcome } from './components/UserWelcome';
import { UserStories } from './components/UserStories';
import { ExploreStories } from './components/ExploreStories';

export default function page() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">StoryForge</h1>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 flex-1">
        <div className="space-y-8">
          <UserWelcome />
          <UserStories />
          <ExploreStories />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} StoryForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}