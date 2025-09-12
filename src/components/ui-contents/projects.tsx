"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

const projects = [
  {
    title: "HareKrsna TV",
    desc: "Develop iOS application version for Iskon Desired Tree named HareKrsna TV. Which display 24 hours live video of Iskon Temples, Bhagvat Kathas and other shows...",
    chip: "iOS • UIKit • Swift",
    url: "/project1.png",
    projectLink: "https://apps.apple.com/in/app/hare-krsna-tv/id1378540889",
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
    isHighlighted: true,
  },
  {
    title: "Quote World",
    desc: "Built Quote World with dynamic quote API, SSO auth, and subscription payments for premium users.",
    chip: "Flutter • REST API",
    url: "/project4.png",
    projectLink:
      "https://www.linkedin.com/posts/samir-patel90_motivation-love-wisdom-activity-7069985131247075330-q9nx/",
    isHighlighted: false,
  },
  {
    title: "DG Courier",
    desc: "Courier app enabling users to place orders, track via Google Maps API, and pay using Razorpay.",
    chip: "Flutter • Firebase",
    url: null,
    projectLink: null,
    isHighlighted: false,
  },
  {
    title: "AttendaGram",
    desc: "A cross-platform attendance POC for faculty and students built with Flutter + Firebase.",
    chip: "Flutter • Firebase",
    url: null,
    projectLink: null,
    isHighlighted: false,
  },
  {
    title: "Portfolio AI Agent",
    desc: "Designing a personal on-site chat AI agent for my portfolio that answers visitor questions while keeping all conversations private (no external logging).",
    chip: "OpenAI API • Supabase",
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
    <section id="projects" className="mx-auto max-w-6xl px-4  !bg-gradient-to-b from-[#0b0b12] via-[#0f0f1a] to-[#0b0b12]">
      <h2 className="text-3xl font-bold mb-8 text-white tracking-wide">
        {isHomePage ? "Highlighted Projects" : "All Projects"}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {filteredProjects.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0.8, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="group rounded-3xl border border-white/10 
                       bg-gradient-to-br from-gray-900/70 to-gray-800/50 
                       p-6 hover:bg-white/5 shadow-xl backdrop-blur-md 
                       transition-all duration-300 flex flex-col"
          >
            {/* Thumbnail */}
            <div className="aspect-video rounded-2xl bg-black/20 grid place-items-center mb-4 overflow-hidden">
              {p.url ? (
                <Image
                  src={p.url}
                  width={500}
                  height={250}
                  alt={p.title}
                  priority
                  className="object-cover w-full h-auto md:h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-white/40 ">🔒</span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 text-white/90">
              {p.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/70 flex-1">{p.desc}</p>

            {/* Chip + Button */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                {p.chip}
              </div>

              {p.projectLink ? (
                <Link
                  href={p.projectLink}
                  target="_blank"
                  onClick={() => {
                    switch (p.title) {
                      case "HareKrsna TV":
                        sendGTMEvent({
                          event: ANALYTICS_EVENTS.HARE_KRSNA_PROJECT_VIEWED,
                        });
                        break;
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
                      case "Quote World":
                        sendGTMEvent({
                          event: ANALYTICS_EVENTS.QUOTE_PROJECT_VIEWED,
                        });
                        break;
                      default:
                        break;
                    }
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium
              bg-gradient-to-r from-indigo-600/60 to-purple-600/60
              text-white/90 border border-white/10
              hover:from-indigo-500 hover:to-purple-500
              transition-all duration-300"
                >
                  View Project →
                </Link>
              ) : (
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-medium
               bg-gradient-to-r from-gray-700/60 to-gray-800/60
               text-white/60 border border-white/10
               cursor-not-allowed select-none"
                >
                  Private Project 🔒
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
