"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function Hero() {
  const { theme } = useTheme();

  return (
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
  );
}