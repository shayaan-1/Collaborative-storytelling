"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/ui/footer";
import { 
  Button, 
  buttonVariants 
} from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Pencil, 
  Users, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Moon, 
  Sun, 
  MessageSquare 
} from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-950"}`}>
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

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Where Stories Come Alive Together
              </h1>
              <p className="text-xl mb-8 opacity-80">
                Create, collaborate, and weave incredible stories with writers from around the world. Transform your ideas into captivating narratives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore Stories
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className={`rounded-lg p-6 ${theme === "dark" ? "bg-slate-800" : "bg-white shadow-lg"}`}
            >
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <div className={`p-4 h-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-100"}`}>
                  <div className="flex gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-3">
                    <div className={`h-6 rounded ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"} w-3/4`}></div>
                    <div className={`h-4 rounded ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"} w-full`}></div>
                    <div className={`h-4 rounded ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"} w-5/6`}></div>
                    <div className={`h-4 rounded ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"} w-full`}></div>
                    <div className="flex gap-2 items-center">
                      <div className={`h-8 w-8 rounded-full ${theme === "dark" ? "bg-purple-700" : "bg-purple-200"}`}></div>
                      <div className={`h-4 rounded ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"} w-24`}></div>
                      <div className={`h-4 ml-auto rounded ${theme === "dark" ? "bg-purple-600" : "bg-purple-400"} w-16`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StoryWeave?</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Our platform brings together creative minds to craft unforgettable stories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}>
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="opacity-80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How StoryWeave Works</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Start your storytelling journey in just a few simple steps
            </p>
          </div>

          <Tabs defaultValue="create" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
              <TabsTrigger value="publish">Publish</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="p-6 rounded-lg bg-opacity-10 bg-purple-500">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-white text-bold">Start Your Story</h3>
                  <p className="mb-4 opacity-80 text-white">
                    Begin with a blank canvas or choose from our templates. Set up your story's 
                    world, characters, and initial plot. Our intuitive editor makes it easy to 
                    organize your thoughts and build your narrative.
                  </p>
                  <ul className="space-y-2 mb-6 text-white">
                    {["Easy-to-use editor", "Character templates", "World-building tools", "Plot structure guides"].map((item, i) => (
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
                      <Pencil className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                      <p>Story creation interface visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="collaborate" className="p-6 rounded-lg bg-opacity-10 bg-blue-500">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-white text-bold">Write Together</h3>
                  <p className="mb-4 opacity-80 text-white">
                    Invite friends or find collaborators within our community. Work simultaneously 
                    on different sections or take turns building on each other's ideas. Our real-time 
                    collaboration tools make team storytelling seamless.
                  </p>
                  <ul className="space-y-2 mb-6 text-white">
                    {["Real-time editing", "Comments and suggestions", "Version history", "Role assignment"].map((item, i) => (
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
                      <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                      <p>Collaboration interface visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="publish" className="p-6 rounded-lg bg-opacity-10 bg-green-500">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 text-bold text-white">Share Your Creation</h3>
                  <p className="mb-4 opacity-80 text-white">
                    When your masterpiece is ready, format it beautifully and share it with the world. 
                    Export to various formats, publish directly on our platform, or connect with 
                    traditional publishing channels through our network.
                  </p>
                  <ul className="space-y-2 mb-6 text-white">
                    {["Multiple export formats", "Beautiful templates", "Community sharing", "Publishing guidance"].map((item, i) => (
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
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p>Publishing options visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Testimonials Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Storytellers Say</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Join thousands of writers who've found their creative home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "StoryWeave has transformed how I write. The collaborative features helped me finish my first novel with a co-author across the country.",
                author: "Maya J.",
                role: "Fantasy Author"
              },
              {
                quote: "The platform's intuitive design makes storytelling accessible for everyone. I've connected with amazing writers who've helped me grow.",
                author: "Thomas L.",
                role: "Screenwriter"
              },
              {
                quote: "As a writing teacher. The real-time feedback and collaboration tools are game-changers for education.",
                author: "Dr. Sarah P.",
                role: "Writing Instructor"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                    <p className="mb-6 italic opacity-90">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-purple-700" : "bg-purple-100"}`}>
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
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
      </main>
      <Footer theme={theme} />
    </div>
  );
}