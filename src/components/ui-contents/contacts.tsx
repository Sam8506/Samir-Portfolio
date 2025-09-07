"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

export default function Contact() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isWorkingHours = () => {
    const hour = currentTime.getHours();
    return hour >= 9 && hour <= 23;
  };

  const handleButtonClick = () => {
    sendGTMEvent({ event: ANALYTICS_EVENTS.GET_IN_TOUCH_CLICKED });
    window.open("mailto:samirpatel8506@gmail.com?subject=Let's collaborate!");
  };

  return (
    <section id="contact" className="relative mx-auto max-w-2xl h-screen px-6 py-32 overflow-hidden  !bg-gradient-to-b from-[#0b0b12] via-[#0f0f1a] to-[#0b0b12]">
      {/* Floating background elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0.8, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        <div className="space-y-6">
          {/* Status badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-3 -right-3"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-xs font-medium text-white shadow-lg">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {isWorkingHours() ? "Available now" : "Will respond soon"}
            </div>
          </motion.div>

          {/* Profile section */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 p-[2px] cursor-pointer"
            >
              <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
                <span className="text-2xl relative z-10">👨‍💻</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20"
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                Samir Patel
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👋
                </motion.div>
              </h3>
              <p className="text-gray-400">Full Stack Developer</p>
              <p className="text-xs text-gray-500 mt-1">
                {"Let's make magic happen! 🎯"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${isWorkingHours() ? "bg-green-400" : "bg-yellow-400"} animate-pulse`}
              />
              <span className="text-xs text-gray-400">
                {isWorkingHours() ? "Online" : "Away"}
              </span>
            </div>
          </div>

          {/* Skills tags with hover effects */}
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "NestJS",
              "Swift",
              "Flutter",
              "AI/ML Enthusiastic",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300 border border-white/10 cursor-pointer transition-all"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* CTA button with dynamic text */}
          <motion.button
            onClick={handleButtonClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="flex items-center justify-center gap-2 relative z-10">
              Get in Touch <Mail className="w-4 h-4" />
            </span>
          </motion.button>

          {/* Location & time with more details */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>🌍 India</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                  UTC+5:30
                </span>
              </div>
              <div className="text-right">
                <div className="text-white font-mono">
                  {currentTime.toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
                <div className="text-xs">
                  {currentTime.toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle animated border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"
          animate={{
            borderColor: [
              "rgba(255,255,255,0.2)",
              "rgba(139,92,246,0.3)",
              "rgba(255,255,255,0.2)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
