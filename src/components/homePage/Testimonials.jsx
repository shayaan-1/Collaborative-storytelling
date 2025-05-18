"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function Testimonials() {
  const { theme } = useTheme();

  const testimonials = [
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
  ];

  return (
    <section className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Storytellers Say</h2>
        <p className="text-lg max-w-2xl mx-auto opacity-80">
          Join thousands of writers who've found their creative home
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
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
  );
}