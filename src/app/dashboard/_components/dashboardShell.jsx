import { MainNav } from './MainNav';

export function DashboardShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">StoryForge</h1>
          <MainNav />
        </div>
      </header>
      <main className="container py-8 flex-1">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} StoryForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}