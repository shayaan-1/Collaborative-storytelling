"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function FeatureCard({ feature, index }) {
  const { theme } = useTheme();
  
  return (
    <motion.div
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
  );
}