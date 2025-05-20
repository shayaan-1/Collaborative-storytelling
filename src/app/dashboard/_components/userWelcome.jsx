import { Sparkles } from 'lucide-react';

export function UserWelcome() {
  // Get time of day for greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Get random inspirational quote
  const quotes = [
    "The first draft is just you telling yourself the story.",
    "Write with passion, edit with precision.",
    "Every great story begins with a single word.",
    "Your imagination knows no bounds.",
    "Stories have the power to change the world."
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 shadow-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-purple-200" />
          <p className="text-purple-200 font-medium">{getTimeBasedGreeting()}, Storyteller</p>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back to StoryForge</h1>
        
        <p className="text-purple-100 max-w-xl">
          Ready to continue your creative journey? Your imagination is the only limit.
        </p>
        
        <div className="mt-6 pl-4 border-l-2 border-purple-300 italic text-purple-100">
          "{randomQuote}"
        </div>
      </div>
    </div>
  );
}