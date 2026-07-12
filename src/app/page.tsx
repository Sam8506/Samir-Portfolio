"use client";
import { motion } from "framer-motion";
import Hero from "@/components/ui-contents/hero";
import Projects from "@/components/ui-contents/projects";
import Experience from "@/components/ui-contents/experiences";
import HighlightedSkills from "@/components/ui-contents/highlighted-skills";
import SocialSidebar from "@/components/ui-contents/social-sidebar";

export default function HomePage() {
  return (
    <div className="min-h-screen console-grid  bg-console-bg text-console-text relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Projects isHomePage />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <HighlightedSkills />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Experience isHomePage />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <SocialSidebar />
      </motion.div>
    </div>
  );
}
