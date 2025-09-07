"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import IntroDemo from "./video-reel";

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pt-20 pb-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl tracking-wide font-bold leading-tight"
          >
            Engineering intelligent software that{" "}
            <span className="text-fuchsia-400">scales globally</span> and{" "}
            <span className="text-indigo-400">delivers seamlessly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-white/80"
          >
            Software engineer crafting secure, scalable, and delightful
            products.
          </motion.p>

          <div className="mt-8 flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="projects"
                className="rounded-2xl px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10"
              >
                View Projects
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#contact"
                className="rounded-2xl px-5 py-3 bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:opacity-90"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
        <IntroDemo />
      </div>
    </section>
  );
}
