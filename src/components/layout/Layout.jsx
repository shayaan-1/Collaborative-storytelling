"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/footer";

export default function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-950"}`}>
      <Navigation />
      <main className="container mx-auto px-4 py-16 md:py-24">
        {children}
      </main>
      <Footer theme={theme} />
    </div>
  );
}