"use client";

import { Users, Pencil, Sparkles, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import FeatureCard from "@/components/homePage/FeatureCard";

export default function Features() {
  const features = [
    {
      title: "Real-time Collaboration",
      description: "Write together with friends and fellow authors in real-time. See changes as they happen.",
      icon: <Users className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Creative Freedom",
      description: "Build worlds, develop characters, and explore new ideas in a supportive environment.",
      icon: <Pencil className="h-10 w-10 text-purple-500" />
    },
    {
      title: "AI Assistance",
      description: "Get suggestions, overcome writer's block, and enhance your storytelling with AI tools.",
      icon: <Sparkles className="h-10 w-10 text-pink-500" />
    },
    {
      title: "Publishing Tools",
      description: "Format, export, and share your stories with the world in multiple formats.",
      icon: <BookOpen className="h-10 w-10 text-green-500" />
    },
    {
      title: "Community Feedback",
      description: "Get constructive feedback from a community of passionate storytellers.",
      icon: <MessageSquare className="h-10 w-10 text-yellow-500" />
    },
    {
      title: "Interactive Stories",
      description: "Create branching narratives and interactive adventures that readers can explore.",
      icon: <ArrowRight className="h-10 w-10 text-red-500" />
    }
  ];

  return (
    <section className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StoryWeave?</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-80">
          Our platform brings together creative minds to craft unforgettable stories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}