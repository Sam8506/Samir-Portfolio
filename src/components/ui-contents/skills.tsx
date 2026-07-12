"use client";
import { useState } from "react";
import { FaNodeJs, FaReact, FaAws, FaGithub } from "react-icons/fa";
import {
  SiNestjs,
  SiNextdotjs,
  SiRedux,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiFlutter,
  SiSwift,
  SiXcode,
  SiJira,
  SiTailwindcss,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { RiCursorAiFill, RiClaudeFill } from "react-icons/ri";

type Skill = {
  name: string;
  icon: React.ReactNode;
  description: string;
  id: string;
};
type Category = { title: string; path: string; skills: Skill[] };

const categories: Category[] = [
  {
    title: "web-development",
    path: "~/skills/web-development",
    skills: [
      {
        name: "NestJS",
        icon: <SiNestjs />,
        description: "Robust, enterprise-ready backend framework.",
        id: "0x01",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
        description: "Full-stack framework with SSR, SSG, and App Router.",
        id: "0x02",
      },
      {
        name: "Node.js",
        icon: <FaNodeJs />,
        description: "Scalable APIs and services built on the event loop.",
        id: "0x03",
      },
      {
        name: "React",
        icon: <FaReact />,
        description: "Component-driven UI with hooks and composition.",
        id: "0x04",
      },
      {
        name: "Redux",
        icon: <SiRedux />,
        description: "Predictable, centralized state management.",
        id: "0x05",
      },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss />,
        description: "Utility-first styling, no context switching.",
        id: "0x06",
      },
    ],
  },
  {
    title: "app-development",
    path: "~/skills/app-development",
    skills: [
      {
        name: "Swift",
        icon: <SiSwift />,
        description: "Native iOS development with Swift & UIKit.",
        id: "0x07",
      },
      {
        name: "Flutter",
        icon: <SiFlutter />,
        description: "Cross-platform apps powered by Dart.",
        id: "0x08",
      },
      {
        name: "Xcode",
        icon: <SiXcode />,
        description: "Apple's IDE for iOS and macOS builds.",
        id: "0x09",
      },
    ],
  },
  {
    title: "database",
    path: "~/skills/database",
    skills: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        description: "Relational store, strong ACID guarantees.",
        id: "0x0A",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb />,
        description: "Document store for flexible schemas.",
        id: "0x0B",
      },
      {
        name: "Redis",
        icon: <SiRedis />,
        description: "In-memory cache and queue backing.",
        id: "0x0C",
      },
    ],
  },
  {
    title: "cloud",
    path: "~/skills/cloud",
    skills: [
      {
        name: "AWS",
        icon: <FaAws />,
        description: "Lambda, S3, CloudFront, EC2 — deployed and monitored.",
        id: "0x0D",
      },
    ],
  },
  {
    title: "tools",
    path: "~/skills/tools",
    skills: [
      {
        name: "VS Code",
        icon: <DiVisualstudio />,
        description: "Primary editor, daily driver.",
        id: "0x0E",
      },
      {
        name: "Cursor",
        icon: <RiCursorAiFill />,
        description: "AI-assisted editing for fast iteration.",
        id: "0x0F",
      },
      {
        name: "Claude Code",
        icon: <RiClaudeFill />,
        description: "Agentic terminal workflows for larger changes.",
        id: "0x10",
      },
      {
        name: "GitHub",
        icon: <FaGithub />,
        description: "Version control, review, and CI/CD.",
        id: "0x11",
      },
      {
        name: "Jira",
        icon: <SiJira />,
        description: "Sprint planning and issue tracking.",
        id: "0x12",
      },
    ],
  },
];

export default function SkillsShowcase() {
  const [active, setActive] = useState(categories[0].title);
  const [open, setOpen] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.title === active)!;

  return (
    <section className="min-h-screen font-mono text-console-text">
      <div className="max-w-5xl mx-auto">
        {/* Prompt header */}
        <div className="mb-8 text-[13px] text-console-muted">
          <span>$ ls ~/skills</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Directory tree */}
          <div className="w-full md:w-56 shrink-0 md:border-r border-console-border md:pr-5">
            {categories.map((c, i) => {
              const isActive = active === c.title;
              return (
                <button
                  key={c.title}
                  onClick={() => {
                    setActive(c.title);
                    setOpen(null);
                  }}
                  className={`flex items-center gap-2 w-full text-left px-2 py-1.5 mb-0.5 rounded text-[13px] border-l-2 transition-colors duration-150 ${
                    isActive
                      ? "text-console-amber bg-console-panel border-console-amber"
                      : "text-console-muted hover:text-console-text border-transparent"
                  }`}
                >
                  <span className="opacity-60">
                    {i === categories.length - 1 ? "└─" : "├─"}
                  </span>
                  {c.title}
                </button>
              );
            })}
          </div>

          {/* Registry list */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-[56px_40px_1fr] text-[11px] uppercase tracking-wide text-console-faint px-3 pb-2 border-b border-console-border mb-1">
              <span>id</span>
              <span />
              <span>name</span>
            </div>

            {activeCategory.skills.map((skill) => {
              const isOpen = open === skill.id;
              return (
                <div key={skill.id}>
                  <div
                    onClick={() => setOpen(isOpen ? null : skill.id)}
                    className={`grid grid-cols-[56px_40px_1fr] items-center px-3 py-2.5 rounded cursor-pointer transition-colors duration-150 ${
                      isOpen ? "bg-console-panel" : "hover:bg-console-panel-2"
                    }`}
                  >
                    <span className="text-xs text-console-faint">
                      {skill.id}
                    </span>
                    <span
                      className={`text-lg ${isOpen ? "text-console-amber" : "text-console-muted"}`}
                    >
                      {skill.icon}
                    </span>
                    <span
                      className={`text-sm ${isOpen ? "text-console-amber" : "text-console-text"}`}
                    >
                      {skill.name}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="mx-3 mb-2 ml-[108px] px-3.5 py-2.5 bg-console-panel-2 border border-console-border border-l-2 border-l-console-amber rounded text-[12.5px] text-console-muted leading-relaxed">
                      <span className="text-console-faint">{"> cat "}</span>
                      <span className="text-console-amber">
                        {skill.name.toLowerCase().replace(/\s|\./g, "-")}.md
                      </span>
                      <br />
                      {skill.description}
                      <span className="console-cursor" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
