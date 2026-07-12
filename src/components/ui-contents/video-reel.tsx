"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

export default function IntroDemo() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        whileHover={{ borderColor: "rgba(232,169,78,0.5)" }}
        onClick={() => {
          sendGTMEvent({ event: ANALYTICS_EVENTS.INTRO_VIDEO_PLAYED });
          setIsOpen(true);
        }}
        className="cursor-pointer rounded-lg border border-console-border bg-console-panel p-5 shadow-xl w-full max-w-4xl mx-auto transition-colors duration-300 font-mono"
      >
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-console-amber">▶ live-preview.mp4</span>
          <span className="text-console-faint">click to play</span>
        </div>

        <div className="relative rounded-md overflow-hidden aspect-video bg-black/40 flex items-center justify-center border border-console-border">
          <Image
            fill
            sizes="full"
            priority
            alt="Intro Demo Video"
            className="w-full h-full object-cover"
            src="/intro.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-console-bg/70 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 !z-99 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <div className="relative w-fit h-[80vh]">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-2 -top-2 !z-99 text-console-text text-3xl font-bold hover:text-console-amber transition-colors"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Video Container */}
              <div className="w-full h-full rounded-lg overflow-hidden border border-console-border shadow-2xl">
                <video
                  autoPlay
                  controls
                  className="w-fit h-full mx-auto object-contain rounded-lg"
                  src="/intro.mp4"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
