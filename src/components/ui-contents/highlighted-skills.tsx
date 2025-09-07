"use client";
import { FaReact, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
} from "react-icons/si";

const skills = [
  {
    name: "React",
    icon: <FaReact className="text-cyan-400" />,
    description:
      "Experienced in building interactive UIs, hooks, context, state management, and performance optimization.",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-white" />,
    description:
      "Expert in SSR, SSG, API routes, middleware, and integrating with modern stacks.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-400" />,
    description:
      "Strongly typed React apps, interfaces, generics, and scalable project structures.",
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-teal-400" />,
    description:
      "Responsive design, custom themes, animations, and building design systems.",
  },
  {
    name: "NestJS",
    icon: <SiNestjs className="text-red-600" />,
    description:
      "Backend automation, scripting, data processing, and machine learning basics.",
  },
  {
    name: "AWS",
    icon: <FaAws className="text-orange-400" />,
    description:
      "Deployments with S3, EC2, Lambda, API Gateway, and CI/CD pipelines.",
  },
];

export default function HighlightedSkills() {
  const loopSkills = [...skills, ...skills];

  return (
    <section className="py-20 mx-auto max-w-6xl text-white overflow-hidden">
      <h2 className=" text-4xl px-2 md:px-0 font-bold tracking-wide  mb-12">
        Highlighted Skills
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee">
          {loopSkills.map((skill, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center gap-2 group cursor-pointer min-w-[180px] mx-6"
            >
              {/* Icon */}
              <div className="text-6xl ">{skill.icon}</div>
              <p className="text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
