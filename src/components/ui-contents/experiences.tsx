"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Experience = {
  id: string;
  companyUrl: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
  nodeName: string;
  projects?: { name: string; url: string }[];
};

const experiences: Experience[] = [
  {
    id: "exp1",
    nodeName: "Software Engineer (L2)",
    role: "Software Engineer (L2)",
    companyUrl: "https://www.talentsystems.com/",
    company: "Talent Systems, LLC (Casting Networks)",
    period: "Nov 2025 – Present",
    description: [
      "Part of a major cost-reduction initiative by building an internal media service that replaced Cloudinary and AWS Elemental across all company products — covering S3 media uploads, FFmpeg video transcoding, Sharp-based image transformation (multi-resolution and format variants), signed URL generation, and CloudFront CDN invalidation.",
      "Designed an event-based architecture publishing webhook events to drive asynchronous, decoupled processing workflows.",
      "Lead frontend development and architecture for R&D and production delivery initiatives across Casting Networks and StaffMeUp products.",
      "Architected a reusable UI abstraction layer — a wrapper over MUI and RizzUI component libraries with custom components to handle complex, evolving UI/UX requirements.",
      "Drive the full frontend release lifecycle: build optimization, deployment pipeline management, and early issue detection.",
      "Partner with the Tech Lead on cost and timeline estimations and new feature integration assessments.",
      "Drive experimentation with emerging technologies, particularly AI-powered systems, and guide team adoption of new approaches.",
      "Built a Next.js POC for an internal feature-flag management system on AWS AppConfig, evaluated as a replacement for LaunchDarkly to cut per-seat licensing costs.",
    ],
    tech: ["NestJS", "NextJS", "PostgreSQL", "AWS", "MUI"],
    projects: [
      { name: "Casting Networks", url: "https://www.castingnetworks.com/" },
      { name: "StaffMeUp", url: "https://staffmeup.com/" },
      { name: "FastCast", url: "https://fastcast.com/" },
    ],
  },
  {
    id: "exp2",
    nodeName: "Jr. Software Engineer",
    role: "Jr. Software Engineer – Full Stack",
    companyUrl: "https://www.talentsystems.com/",
    company: "Talent Systems, LLC (Casting Networks)",
    period: "Jan 2024 – Oct 2025",
    description: [
      "Migrated media management architecture from Cloudinary to AWS, resulting in 30% faster first-load rendering for large media files and a 42% reduction in storage and transformation costs.",
      "Integrated RecurlyJS for recurring and one-time payment subscriptions, supporting Apple Pay, PayPal, and card payments in GBP and USD.",
      "Implemented a DDoS mitigation solution to enhance platform security.",
      "Contributed to the daily release process using feature flags for rapid, controlled feature delivery.",
      "Transitioned frontend architecture to a MonoRepo structure using Nx for improved maintainability.",
      "Wrote and executed XCTest cases for the iOS mobile app, increasing test coverage from 20% to 76%.",
      "Participated in database design and requirement gathering; designed application workflows to streamline development and UX.",
    ],
    tech: ["NestJS", "NextJS", "PostgreSQL", "AWS", "Swift", "Nx", "RecurlyJS"],
    projects: [
      { name: "Casting Networks", url: "https://www.castingnetworks.com/" },
      { name: "StaffMeUp", url: "https://staffmeup.com/" },
    ],
  },
  {
    id: "exp3",
    nodeName: "SDE Intern",
    role: "SDE Intern",
    companyUrl: "https://www.talentsystems.com/",
    company: "Talent Systems, LLC",
    period: "Jul 2023 – Dec 2023",
    description: [
      "Contributed to building and deploying a full-stack project for the entertainment industry in India as part of an 8-member, highly skilled and intelligent team.",
      "Worked across frontend, backend, mobile and cloud deployment technologies.",
    ],
    tech: ["NestJS", "Next.js", "AWS"],
    projects: [{ name: "Spotlight One", url: "https://spotlightone.com/" }],
  },
  {
    id: "exp4",
    nodeName: "Project Manager Intern",
    role: "Flutter Project Manager Intern",
    company: "Agevole Innovation Pvt. Ltd.",
    companyUrl: "https://agevole.in/",
    period: "May 2023 – Jun 2023",
    description: [
      "Led and mentored a team of interns, managing two internal impactful Flutter projects.",
      "Delivered milestones on time while developing management and leadership skills.",
      "Coordinated project requirements and ensured quality deliverables.",
      "Documented project progress and facilitated effective communication within the team.",
    ],
    tech: ["Flutter", "Project Management", "Team Leadership", "Agile"],
  },
  {
    id: "exp5",
    nodeName: "Full stack Developer",
    role: "Full-Stack Developer",
    companyUrl: "https://www.linkedin.com/company/cldccharusat",
    company: "Charusat Learning and Development Club",
    period: "Apr 2023 – Sep 2023",
    description: [
      "Collaborated with frontend and backend developers to create scalable web applications.",
      "Deployed solutions focusing on user experience and system reliability.",
      "Participated in code reviews and maintained development best practices.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
  },
  {
    id: "exp6",
    nodeName: "Mobile Dev Intern",
    role: "Mobile Development Intern",
    companyUrl: "https://kintudesigns.com/index.html",
    company: "Kintu Designs Pvt. Ltd.",
    period: "May 2022 – Jun 2022",
    description: [
      "Contributed to the Grover – Customer Application project.",
      "Participated in development of two UI-focused mobile applications.",
      "Developed technical skills and collaborated effectively in team environment.",
    ],
    tech: ["Flutter", "UI/UX", "Mobile Development"],
  },
];

interface ExperienceNodesProps {
  isHomePage: boolean;
}

export default function ExperienceNodes({ isHomePage }: ExperienceNodesProps) {
  const [active, setActive] = useState<Experience | null>(experiences?.[0]);

  return (
    <section
      className={`relative mx-auto px-4 font-mono ${isHomePage ? "max-w-6xl" : "max-w-6xl min-h-screen"}`}
    >
      {isHomePage && (
        <motion.div
          className="mb-10 flex items-baseline gap-2 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-console-faint">$</span>
          <span className="text-console-muted">cat ~/experience/recent.md</span>
        </motion.div>
      )}
      {!isHomePage && (
        <div className="my-8 text-[13px] text-console-muted">
          <span>$ ls ~/experiences</span>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        {!isHomePage && (
          <motion.div
            className="lg:w-80 shrink-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="relative space-y-1.5">
                <div className="absolute left-[9px] top-0 bottom-0 w-px bg-console-border" />

                {experiences.map((exp, index) => {
                  const isActive = active?.id === exp.id;
                  return (
                    <motion.button
                      key={exp.id + index}
                      className={`relative cursor-pointer w-full text-left p-3 pl-8 rounded-md transition-colors duration-200 group ${
                        isActive
                          ? "bg-console-panel border border-console-amber/30"
                          : "border border-transparent hover:bg-console-panel-2"
                      }`}
                      onClick={() => setActive(exp)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`absolute left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 ${
                          isActive
                            ? "bg-console-amber border-console-amber"
                            : "bg-console-bg border-console-border group-hover:border-console-muted"
                        }`}
                      />

                      <div className="space-y-0.5">
                        <div
                          className={`font-medium text-sm ${isActive ? "text-console-amber" : "text-console-text"}`}
                        >
                          {exp.nodeName}
                        </div>
                        <div className="text-xs text-console-muted truncate">
                          {exp.company}
                        </div>
                        <div className="text-xs text-console-faint">
                          {exp.period}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-lg px-5 py-6 md:px-10 md:py-8 bg-console-panel border border-console-border"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-8 pb-6 border-b border-console-border gap-4">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-medium text-console-text-strong tracking-tight">
                      {active.role}
                    </h2>
                    <Link
                      href={active.companyUrl}
                      target="_blank"
                      className="text-sm text-console-amber mt-1 inline-block hover:underline"
                    >
                      {active.company}
                    </Link>
                    <p className="text-xs text-console-muted mt-2">
                      {active.period}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="md:text-right">
                    <h3 className="font-medium text-console-muted text-xs uppercase tracking-wide mb-2.5">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap md:justify-end gap-1.5">
                      {active.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs rounded bg-console-bg border border-console-border text-console-text"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Projects */}
                {active.projects && active.projects.length > 0 && (
                  <div className="mb-6 flex flex-col md:flex-row md:items-center gap-2">
                    <h3 className="font-medium text-console-text text-sm shrink-0">
                      Product Experience
                    </h3>
                    <div className="flex items-center flex-wrap gap-2">
                      {active.projects.map((p, idx) => (
                        <a
                          key={idx}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-xs rounded bg-console-bg border border-console-border text-console-amber hover:border-console-amber/50 transition-colors duration-150"
                        >
                          {p.name} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                <div>
                  <h3 className="font-medium text-console-text text-sm mb-3">
                    Key Contributions
                  </h3>
                  <div className="space-y-2.5">
                    {active.description.map((desc, idx) => (
                      <motion.div
                        key={idx}
                        className="relative pl-4 py-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="absolute left-0 top-2 text-console-amber text-xs">
                          {">"}
                        </span>
                        <p className="text-console-muted text-sm leading-relaxed">
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
