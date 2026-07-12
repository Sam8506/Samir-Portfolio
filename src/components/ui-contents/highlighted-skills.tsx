"use client";
import { FaReact, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
} from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "TailwindCSS", icon: <SiTailwindcss /> },
  { name: "NestJS", icon: <SiNestjs /> },
  { name: "AWS", icon: <FaAws /> },
];

export default function HighlightedSkills() {
  const loopSkills = [...skills, ...skills];

  return (
    <section className="px-4  py-8 mx-auto max-w-6xl text-console-text overflow-hidden font-mono">
      <div className="px-4 md:px-0 mb-10 flex items-baseline gap-2 text-sm">
        <span className="text-console-faint">$</span>
        <span className="text-console-muted">ls ~/skills --highlighted</span>
      </div>

      <div className="relative w-full overflow-hidden  border-console-border py-8">
        <div className="flex animate-marquee">
          {loopSkills.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 group cursor-pointer min-w-40 mx-6"
            >
              <div className="text-5xl text-console-muted group-hover:text-console-amber transition-colors duration-200">
                {skill.icon}
              </div>
              <p className="text-xs text-console-muted group-hover:text-console-amber transition-colors duration-200">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
