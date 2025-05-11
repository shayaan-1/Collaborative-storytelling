"use client";

import { BookOpen, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="container mx-auto py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-purple-500" />
        <span className="text-xl font-bold tracking-tight">StoryWeave</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="outline">Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </nav>
  );
}