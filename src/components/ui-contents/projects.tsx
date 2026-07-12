"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

const projects = [
  {
    title: "Feature Flag Manager",
    desc: "Built an internal feature-flag management system on top of the AWS AppConfig API, replacing LaunchDarkly. Handles flag creation, environment-scoped rollouts, and config deployment without the per-seat licensing cost.",
    chip: "NextJS • AWS AppConfig",
    url: "/project_ff.png",
    projectLink: null,
    isHighlighted: true,
  },
  {
    title: "Personal AI Assistant",
    desc: "The on-site chat AI agent running on this portfolio. Answers visitor questions about my work while keeping every conversation private — no external logging.",
    chip: "OpenAI API • Supabase",
    url: "/project_ai.png",
    projectLink: "https://lnkd.in/p/gxGKh8tK",
    isHighlighted: true,
  },
  {
    title: "SamzZ Go",
    desc: "Crafted an application leveraging OpenAI API to generate images from prompts and enable user interaction for quick AI solutions...",
    chip: "Flutter • OpenAI API",
    url: "/project2.png",
    projectLink:
      "https://www.linkedin.com/posts/samir-patel90_connection-openai-googlecloudapi-activity-7078567481799262208-01v6",
    isHighlighted: true,
  },
  {
    title: "My Map",
    desc: "Developed MyMap, harnessing the full potential of Google Maps API with nearby search, traffic updates, polyline path generation, reviews, ratings, and more...",
    chip: "Flutter • Google API",
    url: "/project3.png",
    projectLink:
      "https://www.linkedin.com/posts/samir-patel90_students-github-repository-activity-7065529068393312257-zH-w/",
    isHighlighted: false,
  },
  {
    title: "Event-Driven Media Management (POC)",
    desc: "Designed an event-driven asset management service using DDD and CQRS, with SQS FIFO queues and dead-letter handling for reliable, ordered media processing pipelines.",
    chip: "DDD • CQRS • SQS FIFO",
    url: null,
    projectLink: null,
    isHighlighted: false,
  },
];

export default function Projects(props: { isHomePage?: boolean }) {
  const { isHomePage } = props;
  const filteredProjects = isHomePage
    ? projects.filter((p) => p.isHighlighted)
    : projects;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 pb-20 font-mono">
      <div className="mb-8 flex items-baseline gap-2 text-sm">
        <span className="text-console-faint">$</span>
        <span className="text-console-muted">
          ls ~/projects{isHomePage ? " --highlighted" : ""}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {filteredProjects.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0.8, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="group rounded-lg border border-console-border bg-console-panel hover:border-console-amber/40 transition-colors duration-300 flex flex-col overflow-hidden"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-console-border text-xs">
              <span className="text-console-amber truncate">{p.title}</span>
              <span className="text-console-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Thumbnail */}
            <div className="aspect-video bg-console-bg grid place-items-center overflow-hidden border-b border-console-border">
              {p.url ? (
                <Image
                  src={p.url}
                  width={500}
                  height={250}
                  alt={p.title}
                  priority
                  unoptimized
                  fetchPriority="high"
                  className="object-cover w-full h-auto md:h-full grayscale-30 group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <span className="text-console-faint text-2xl">🔒</span>
              )}
            </div>

            <div className="p-4 flex flex-col flex-1">
              {/* Description */}
              <p className="text-[13px] text-console-muted flex-1 leading-relaxed">
                {p.desc}
              </p>

              {/* Chip + Button */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="text-[11px] px-2.5 py-1 rounded bg-console-bg border border-console-border text-console-muted">
                  {p.chip}
                </div>

                {p.projectLink ? (
                  <Link
                    href={p.projectLink}
                    target="_blank"
                    onClick={() => {
                      switch (p.title) {
                        case "SamzZ Go":
                          sendGTMEvent({
                            event: ANALYTICS_EVENTS.SAMZZ_GO_PROJECT_VIEWED,
                          });
                          break;
                        case "My Map":
                          sendGTMEvent({
                            event: ANALYTICS_EVENTS.MY_MAPS_PROJECT_VIEWED,
                          });
                          break;
                        default:
                          break;
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 rounded text-xs text-console-amber border border-console-amber/30 hover:bg-console-amber hover:text-console-bg transition-colors duration-150"
                  >
                    open →
                  </Link>
                ) : (
                  <div className="shrink-0 px-2.5 py-1 rounded text-xs text-console-faint border border-console-border cursor-not-allowed select-none">
                    private
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
