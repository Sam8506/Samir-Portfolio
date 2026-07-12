"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SocialIcon({ social, delay }: { social: any; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={social.href}
      onClick={() => {
        sendGTMEvent({ event: ANALYTICS_EVENTS.SOCIAL_LINK_CLICKED });
      }}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center justify-center w-11 h-11 rounded-md
                 bg-console-panel border border-console-border
                 hover:border-console-amber/50
                 transition-colors duration-200"
    >
      <span
        className={`text-lg transition-colors duration-200 ${hovered ? "text-console-amber" : "text-console-muted"}`}
      >
        {social.icon}
      </span>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.2 }}
        className="absolute left-14 whitespace-nowrap px-2.5 py-1 rounded
                   bg-console-panel border border-console-border
                   text-console-amber text-xs font-mono pointer-events-none"
      >
        {social.label}
      </motion.span>
    </motion.a>
  );
}

export default function SocialSidebar() {
  const socials = [
    {
      id: "1",
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/samir-patel90/",
      label: "linkedin",
    },
    {
      id: "2",
      icon: <XIcon size={17} />,
      href: "https://x.com/SamzZ8506",
      label: "twitter",
    },
    {
      id: "3",
      icon: <FaEnvelope />,
      href: "mailto:samirpatel8506@gmail.com",
      label: "email",
    },
    {
      id: "4",
      icon: <FaGithub />,
      href: "https://github.com/Patel-Samir",
      label: "github",
    },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-50">
      {socials.map((social, idx) => (
        <SocialIcon key={social.id} social={social} delay={idx * 0.2} />
      ))}
    </div>
  );
}
