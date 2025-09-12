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
  SiPostman,
  SiTailwindcss,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";

type Skill = { name: string; icon: React.ReactNode; description: string };
type Category = { title: string; skills: Skill[] };

const categories: Category[] = [
  {
    title: "Web Development",
    skills: [
      {
        name: "NestJS",
        icon: <SiNestjs className="text-red-600" />,
        description: "Robust, enterprise-ready backend framework.",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-white dark:text-white" />,
        description: "Full-stack framework with SSR, SSG, and App Router.",
      },
      {
        name: "Node.js",
        icon: <FaNodeJs className="text-green-500" />,
        description: "Scalable APIs and services built with Node.js.",
      },
      {
        name: "React",
        icon: <FaReact className="text-sky-400" />,
        description: "Modern UI development with hooks and animations.",
      },
      {
        name: "Redux",
        icon: <SiRedux className="text-purple-600" />,
        description: "Predictable and centralized state management.",
      },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss className="text-teal-400" />,
        description: "Utility-first CSS for sleek, responsive designs.",
      },
    ],
  },
  {
    title: "App Development",
    skills: [
      {
        name: "Swift",
        icon: <SiSwift className="text-orange-500" />,
        description: "Native iOS development with Swift & UIKit.",
      },
      {
        name: "Flutter",
        icon: <SiFlutter className="text-blue-400" />,
        description: "Cross-platform apps powered by Dart.",
      },
      {
        name: "Xcode",
        icon: <SiXcode className="text-sky-600" />,
        description: "Apple’s IDE for iOS and macOS apps.",
      },
    ],
  },
  {
    title: "Database",
    skills: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="text-blue-700" />,
        description:
          "Advanced relational database with strong ACID compliance.",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-green-600" />,
        description: "NoSQL database for flexible, scalable data models.",
      },
      {
        name: "Redis",
        icon: <SiRedis className="text-red-500" />,
        description:
          "In-memory store for caching and high-performance workloads.",
      },
    ],
  },
  {
    title: "Cloud",
    skills: [
      {
        name: "AWS",
        icon: <FaAws className="text-orange-400" />,
        description: "Cloud solutions with Lambda, S3, CloudFront, and EC2.",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      {
        name: "VS Code",
        icon: <DiVisualstudio className="text-blue-500" />,
        description: "Lightweight and versatile code editor.",
      },
      {
        name: "GitHub",
        icon: <FaGithub className="text-black dark:text-white" />,
        description: "Collaboration, version control, and CI/CD pipelines.",
      },
      {
        name: "Postman",
        icon: <SiPostman className="text-orange-500" />,
        description: "Streamlined API development and testing.",
      },
      {
        name: "Jira",
        icon: <SiJira className="text-blue-500" />,
        description: "Agile planning and project tracking.",
      },
    ],
  },
];

export default function SkillsShowcase() {
  const [active, setActive] = useState("Web Development");
  const [hovered, setHovered] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.title === active)!;

  return (
    <section className="mx-auto max-w-6xl min-h-screen  !bg-gradient-to-b from-[#0b0b12] via-[#0f0f1a] to-[#0b0b12] px-6 py-16 flex flex-col gap-12">
      <div className="flex gap-x-4 mt-10">
        {/* Sidebar */}
        <div className="flex flex-col gap-4 w-48 border-r border-gray-700 pr-6">
          {categories.map((c) => (
            <button
              key={c.title}
              className={`text-left px-3 py-2 rounded-md transition-colors duration-300 
              ${active === c.title ? "bg-cyan-600/20 text-cyan-400 border-l-4 border-cyan-400" : "text-gray-400 hover:text-cyan-300"}`}
              onClick={() => setActive(c.title)}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 flex-1 relative h-fit ">
          {activeCategory.skills.map((skill, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl 
    bg-gray-800/40 border border-gray-700 hover:border-cyan-400/50 
    hover:bg-gray-800/70 cursor-pointer transition-all duration-300 
    hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              onClick={() =>
                setHovered(hovered === skill.name ? null : skill.name)
              }
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <div className="text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_cyan]">
                {skill.icon}
              </div>

              {/* Name */}
              <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-cyan-300">
                {skill.name}
              </span>

              {/* Description */}
              {hovered === skill.name && (
                <div className="mt-3 w-full rounded-lg bg-gray-900/90 text-gray-200 text-xs sm:text-sm p-3 shadow-md border border-cyan-400/30 transition-all duration-300">
                  {skill.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
