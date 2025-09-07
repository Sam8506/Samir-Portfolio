"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
  nodeName: string;
  color: string;
};

const experiences: Experience[] = [
  {
    id: "exp1",
    nodeName: "SDE 1",
    role: "SDE 1",
    company: "Talent Systems, LLC",
    period: "Jan 2024 – Present",
    description: [
      "Migrated media management from Cloudinary to AWS, optimizing performance and scalability.",
      "Transitioned frontend architecture to a MonoRepo for better maintainability.",
      "Reduced Docker image sizes, improving build efficiency and speeding up deployments.",
      "Participated in database design, requirement gathering, and workflow planning.",
      "Designed and implemented PayPal and Apple Pay flows with VISA compliance, DPAN, and MPAN handling.",
      "Implemented fraud detection measures to strengthen transaction security.",
      "Developed media processing pipelines with AWS Elemental for efficient video processing.",
    ],
    tech: ["NestJS", "NextJS", "PostgreSQL", "AWS", "Swift", "Ktor"],
    color: "blue",
  },
  {
    id: "exp2",
    nodeName: "SDE Intern",
    role: "SDE Intern",
    company: "Talent Systems, LLC",
    period: "Jul 2023 – Dec 2023",
    description: [
      "Contributed to building and deploying a full-stack project for the entertainment industry in India as part of an 8-member, highly skilled and intelligent team.",
      "Worked across frontend, backend, mobile and cloud deployment technologies.",
    ],
    tech: ["NestJS", "Next.js", "AWS"],
    color: "purple",
  },
  {
    id: "exp3",
    nodeName: "Project Manager Intern",
    role: "Flutter Project Manager Intern",
    company: "Agevole Innovation Pvt. Ltd.",
    period: "May 2023 – Jun 2023",
    description: [
      "Led and mentored a team of interns, managing two internal impactful Flutter projects.",
      "Delivered milestones on time while developing management and leadership skills.",
      "Coordinated project requirements and ensured quality deliverables.",
      "Documented project progress and facilitated effective communication within the team.",
    ],
    tech: ["Flutter", "Project Management", "Team Leadership", "Agile"],
    color: "green",
  },
  {
    id: "exp4",
    nodeName: "Full stack Developer",
    role: "Full-Stack Developer",
    company: "Charusat Learning and Development Club",
    period: "Apr 2023 – Sep 2023",
    description: [
      "Collaborated with frontend and backend developers to create scalable web applications.",
      "Deployed solutions focusing on user experience and system reliability.",
      "Participated in code reviews and maintained development best practices.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
    color: "orange",
  },
  {
    id: "exp5",
    nodeName: "Mobile Dev Intern",
    role: "Mobile Development Intern",
    company: "Kintu Designs Pvt. Ltd.",
    period: "May 2022 – Jun 2022",
    description: [
      "Contributed to the Grover – Customer Application project.",
      "Participated in development of two UI-focused mobile applications.",
      "Developed technical skills and collaborated effectively in team environment.",
    ],
    tech: ["Flutter", "UI/UX", "Mobile Development"],
    color: "indigo",
  },
];

interface ExperienceNodesProps {
  isHomePage: boolean;
}

export default function ExperienceNodes({ isHomePage }: ExperienceNodesProps) {
  const [active, setActive] = useState<Experience | null>(experiences?.[0]);

  const getColorClasses = (
    color: string,
    variant: "bg" | "border" | "text" = "bg",
  ) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/10 border-blue-500/30",
        border: "border-blue-500/30",
        text: "text-blue-400",
      },
      purple: {
        bg: "bg-purple-500/10 border-purple-500/30",
        border: "border-purple-500/30",
        text: "text-purple-400",
      },
      green: {
        bg: "bg-green-500/10 border-green-500/30",
        border: "border-green-500/30",
        text: "text-green-400",
      },
      orange: {
        bg: "bg-orange-500/10 border-orange-500/30",
        border: "border-orange-500/30",
        text: "text-orange-400",
      },
      indigo: {
        bg: "bg-indigo-500/10 border-indigo-500/30",
        border: "border-indigo-500/30",
        text: "text-indigo-400",
      },
    };
    return (
      colors[color as keyof typeof colors]?.[variant] || colors.blue[variant]
    );
  };

  return (
    <section
      className={`relative mx-auto px-4 ${isHomePage ? "max-w-6xl" : "max-w-7xl pt-16 h-screen"} `}
    >
      {isHomePage && (
        <motion.h2
          className="text-4xl tracking-wide font-bold text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Engineering at
        </motion.h2>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        {!isHomePage && (
          <motion.div
            className="lg:w-80 flex-shrink-0"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="relative space-y-6">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 to-gray-800" />

                {experiences.map((exp, index) => (
                  <motion.button
                    key={exp.id + index}
                    className={`relative w-full text-left p-4 rounded-xl transition-all duration-300 group
                      ${
                        active?.id === exp.id
                          ? `${getColorClasses(exp.color, "bg")} border ${getColorClasses(exp.color, "border")}`
                          : "bg-gray-900/40 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-900/60"
                      }`}
                    onClick={() => setActive(exp)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-300
                      ${
                        active?.id === exp.id
                          ? `${getColorClasses(exp.color, "text")} bg-current border-current`
                          : "bg-gray-800 border-gray-600 group-hover:border-gray-500"
                      }`}
                    />

                    <div className="ml-4 flex items-center gap-3">
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="font-semibold text-white text-sm">
                          {exp.nodeName}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {exp.company}
                        </div>
                        <div className="text-xs text-gray-500">
                          {exp.period}
                        </div>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {active?.id === exp.id && (
                      <motion.div
                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${getColorClasses(exp.color, "text")} bg-current`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Experience Details */}
        <div className="mx-auto flex-1 max-w-5xl mb-20 md:mb-0">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-3xl px-4 py-4 md:px-14 md:py-10 bg-gradient-to-br from-gray-900/70 via-black/70 to-gray-950/70 backdrop-blur-xl border border-white/10 shadow-xl "
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-purple-500/5 to-transparent blur-3xl -z-10" />

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-10">
                  <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      {active.role}
                    </h2>
                    <p
                      className={`text-lg font-medium ${getColorClasses(
                        active.color,
                        "text",
                      )} mt-1`}
                    >
                      {active.company}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {active.period}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mt-10 md:mt-0 md:text-right">
                    <h3 className="font-semibold text-gray-300 text-sm tracking-wide mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap md:justify-end gap-2">
                      {active.tech.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 text-gray-300 hover:from-fuchsia-600/20 hover:to-purple-600/20 hover:border-fuchsia-500/40 transition"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                  <h3 className="font-semibold text-white text-lg mb-5 flex items-center gap-2">
                    Key Contributions
                  </h3>
                  <div className="space-y-4">
                    {active.description.map((desc, idx) => (
                      <motion.div
                        key={idx}
                        className="relative group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-fuchsia-500/40 hover:shadow-[0_0_15px_rgba(217,70,239,0.2)] transition"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-fuchsia-500 to-purple-600" />
                        <p className="pl-4 text-gray-300 text-sm leading-relaxed">
                          {desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
