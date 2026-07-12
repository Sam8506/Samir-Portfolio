"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import IntroDemo from "./video-reel";

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pb-24 font-mono">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-console-amber text-sm mb-4 flex items-center gap-2"
          >
            <span className="text-console-faint">$</span> whoami
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-[2.75rem] font-medium leading-tight tracking-tight text-console-text-strong"
          >
            Engineering intelligent software that{" "}
            <span className="text-console-amber">scales globally</span> and
            delivers seamlessly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 text-console-muted text-sm leading-relaxed border-l-2 border-console-border pl-4"
          >
            Software engineer crafting secure, scalable, and delightful
            products.
            <span className="console-cursor" />
          </motion.p>

          <div className="mt-9 flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm bg-console-panel border border-console-border hover:border-console-amber/50 text-console-text hover:text-console-amber transition-colors duration-150"
              >
                <span className="text-console-faint">./</span>view-projects
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm bg-console-amber text-console-bg font-medium hover:bg-console-amber/90 transition-colors duration-150"
              >
                get-in-touch →
              </Link>
            </motion.div>
          </div>
        </div>
        <IntroDemo />
      </div>
    </section>
  );
}
