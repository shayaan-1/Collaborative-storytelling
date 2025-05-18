"use client";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/homePage/Hero";
import Features from "@/components/homePage/Features";
import HowItWorks from "@/components/homePage/HowItWorks";
import Testimonials from "@/components/homePage/Testimonials";
import CTA from "@/components/homePage/CTA";

export default function Home() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </Layout>
    </ThemeProvider>
  );
}