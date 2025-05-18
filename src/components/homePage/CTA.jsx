"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function CTA() {
  const { theme } = useTheme();

  return (
    <section className="mb-12">
      <div className={`rounded-xl p-8 md:p-12 ${theme === "dark" ? "bg-gradient-to-r from-purple-900 to-slate-800" : "bg-gradient-to-r from-purple-100 to-pink-100"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Collaborative Story Today</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of storytellers and bring your narrative visions to life. 
            Your next great story is just waiting to be written.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Start For Free
            </Button>
            <Button size="lg" variant="outline">
              View Sample Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}