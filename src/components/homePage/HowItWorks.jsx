"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Users, BookOpen } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useState } from "react";

export default function HowItWorks() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("create");

  const tabContent = [
    {
      id: "create",
      title: "Start Your Story",
      description: "Begin with a blank canvas or choose from our templates. Set up your story's world, characters, and initial plot. Our intuitive editor makes it easy to organize your thoughts and build your narrative.",
      items: ["Easy-to-use editor", "Character templates", "World-building tools", "Plot structure guides"],
      icon: <Pencil className="h-12 w-12 mx-auto mb-4 text-purple-500" />,
      color: "purple"
    },
    {
      id: "collaborate",
      title: "Write Together",
      description: "Invite friends or find collaborators within our community. Work simultaneously on different sections or take turns building on each other's ideas. Our real-time collaboration tools make team storytelling seamless.",
      items: ["Real-time editing", "Comments and suggestions", "Version history", "Role assignment"],
      icon: <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />,
      color: "blue"
    },
    {
      id: "publish",
      title: "Share Your Creation",
      description: "When your masterpiece is ready, format it beautifully and share it with the world. Export to various formats, publish directly on our platform, or connect with traditional publishing channels through our network.",
      items: ["Multiple export formats", "Beautiful templates", "Community sharing", "Publishing guidance"],
      icon: <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-500" />,
      color: "green"
    }
  ];

  // Helper function to get dot color based on tab color
  const getDotColor = (tabColor) => {
    if (tabColor === "purple") return "bg-purple-500";
    if (tabColor === "blue") return "bg-blue-500";
    if (tabColor === "green") return "bg-green-500";
    return "";
  };

  return (
    <section className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How StoryWeave Works</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-80">
          Start your storytelling journey in just a few simple steps
        </p>
      </div>

      <Tabs 
        defaultValue="create" 
        className="max-w-4xl mx-auto"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {tabContent.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Create tab content */}
        <TabsContent 
          value="create" 
          className="p-6 rounded-lg bg-purple-500 bg-opacity-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">{tabContent[0].title}</h3>
              <p className="mb-4 opacity-90">
                {tabContent[0].description}
              </p>
              <ul className="space-y-2 mb-6">
                {tabContent[0].items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`md:w-1/2 rounded-lg overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"} aspect-video`}>
              <div className="p-6 h-full flex items-center justify-center">
                <div className="text-center opacity-80">
                  {tabContent[0].icon}
                  <p>Create interface visualization</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Collaborate tab content */}
        <TabsContent 
          value="collaborate" 
          className="p-6 rounded-lg bg-blue-500 bg-opacity-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">{tabContent[1].title}</h3>
              <p className="mb-4 opacity-90">
                {tabContent[1].description}
              </p>
              <ul className="space-y-2 mb-6">
                {tabContent[1].items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`md:w-1/2 rounded-lg overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"} aspect-video`}>
              <div className="p-6 h-full flex items-center justify-center">
                <div className="text-center opacity-80">
                  {tabContent[1].icon}
                  <p>Collaborate interface visualization</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Publish tab content */}
        <TabsContent 
          value="publish" 
          className="p-6 rounded-lg bg-green-500 bg-opacity-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">{tabContent[2].title}</h3>
              <p className="mb-4 opacity-90">
                {tabContent[2].description}
              </p>
              <ul className="space-y-2 mb-6">
                {tabContent[2].items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`md:w-1/2 rounded-lg overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"} aspect-video`}>
              <div className="p-6 h-full flex items-center justify-center">
                <div className="text-center opacity-80">
                  {tabContent[2].icon}
                  <p>Publish interface visualization</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
} 