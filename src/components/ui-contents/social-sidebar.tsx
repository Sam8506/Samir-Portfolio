"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MagneticIcon({ social, delay }: { social: any; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={social.href}
      onClick={() => {
        sendGTMEvent({ event: ANALYTICS_EVENTS.SOCIAL_LINK_CLICKED });
      }}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center justify-center w-14 h-14 rounded-xl
                 bg-gradient-to-br from-gray-800 via-gray-900 to-black
                 border border-gray-700 shadow-sm
                 hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/10
                 transition-all duration-500"
    >
      {/* Icon */}
      <motion.span
        animate={{
          scale: hovered ? 1.2 : 1,
          rotate: hovered ? 8 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="text-2xl text-indigo-300"
      >
        {social.icon}
      </motion.span>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className="absolute left-16 px-3 py-1 rounded-lg 
                   bg-gray-800/90 border border-gray-700 shadow-sm backdrop-blur
                   text-indigo-200 text-sm font-medium"
      >
        {social.label}
      </motion.span>
    </motion.a>
  );
}

export default function SocialSidebar() {
  const socials = [
    {
      id: "linkedin",
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/samir-patel90/",
      label: "LinkedIn",
    },
    {
      id: "twitter",
      icon: <XIcon />,
      href: "https://x.com/SamzZ8506",
      label: "Twitter",
    },
    {
      id: "email",
      icon: <FaEnvelope />,
      href: "mailto:samirpatel8506@gmail.com",
      label: "Email",
    },
  ];

  return (
    <motion.div
      initial={{ y: -8 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 z-50"
    >
      {socials.map((social, idx) => (
        <MagneticIcon key={social.id} social={social} delay={idx * 0.15} />
      ))}
    </motion.div>
  );
}
