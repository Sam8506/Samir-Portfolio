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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 40px rgba(34, 211, 238, 0.5)",
        }}
        onClick={() => {
          sendGTMEvent({ event: ANALYTICS_EVENTS.INTRO_VIDEO_PLAYED });
          setIsOpen(true);
        }}
        className="cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl w-full max-w-4xl mx-auto transition-all duration-300 "
      >
        <div className="text-sm mb-3 opacity-80 text-cyan-300 font-semibold">
          Live Preview
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/30 flex items-center justify-center">
          <Image
            fill
            sizes="full"
            priority
            alt="Intro Demo Video"
            className="w-full h-full object-cover"
            src="/intro.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none animate-[pulse_4s_infinite]" />
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <div className="relative w-fit h-[80vh]">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-2 z-50 text-white text-3xl font-bold hover:text-cyan-400 transition-colors"
              >
                &times;
              </button>

              {/* Video Container */}
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  controls
                  className="w-fit h-full mx-auto object-contain rounded-xl"
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
