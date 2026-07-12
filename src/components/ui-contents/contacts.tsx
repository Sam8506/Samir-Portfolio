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

  const status = isWorkingHours();

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-2xl min-h-screen flex items-center -mt-20 font-mono"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative w-full rounded-lg bg-console-panel border border-console-border overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-console-border text-xs">
          <span className="text-console-muted">~/contact/status.json</span>
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${status ? "bg-console-amber" : "bg-console-muted"}`}
            />
            <span className="text-console-muted">
              {status ? "available" : "away"}
            </span>
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg text-console-text-strong">Samir Patel</h3>
              <p className="text-sm text-console-muted mt-0.5">
                Full Stack Developer
              </p>
            </div>
            <div className="text-right">
              <div className="text-console-amber text-sm">
                {currentTime.toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
              <div className="text-xs text-console-faint mt-0.5">
                {currentTime.toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5">
            {["Next.js", "NestJS", "Swift", "Flutter", "AI/ML"].map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded bg-console-bg border border-console-border text-xs text-console-muted"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleButtonClick}
            className="w-full py-3 rounded-md bg-console-amber hover:bg-console-amber/90 text-console-bg font-medium text-sm transition-colors duration-150 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </button>

          {/* Footer */}
          <div className="pt-4 border-t border-console-border flex justify-between items-center text-xs text-console-muted">
            <span>Surat, India</span>
            <span>UTC+5:30</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
