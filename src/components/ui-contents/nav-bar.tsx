"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationMenu = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Projects", href: "/projects" },
    { id: 3, name: "Skills", href: "/skills" },
    { id: 4, name: "Experience", href: "/experience" },
    { id: 5, name: "Contact", href: "/contact" },
  ];

  const fireEvent = (menu: { id: number; name: string; href: string }) => {
    // Send GTM event on click
    switch (menu.name.toLowerCase()) {
      case "home":
        sendGTMEvent({ event: ANALYTICS_EVENTS.HOME_TAB_CLICKED });
        break;
      case "projects":
        sendGTMEvent({ event: ANALYTICS_EVENTS.PROJECTS_TAB_CLICKED });
        break;
      case "skills":
        sendGTMEvent({ event: ANALYTICS_EVENTS.SKILLS_TAB_CLICKED });
        break;
      case "experience":
        sendGTMEvent({ event: ANALYTICS_EVENTS.EXPERIENCE_TAB_CLICKED });
        break;
      case "contact":
        sendGTMEvent({ event: ANALYTICS_EVENTS.CONTACT_TAB_CLICKED });
        break;
    }
  };
  return (
    <header className="fixed top-0 w-full z-99">
      {/* Background */}
      <div className="absolute inset-0 !bg-gradient-to-r from-slate-900/80 via-gray-900/70 to-slate-900/80 backdrop-blur-2xl border-b border-white/5" />

      <div className="relative mx-auto max-w-7xl px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 z-50">
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 p-0.5">
              <div className="h-full w-full rounded-2xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 opacity-30 blur-sm group-hover:opacity-60 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg">Samir Patel</span>
            <span className="text-xs text-gray-400">Software Engineer</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1.5 border border-white/10">
            {navigationMenu.map((menu) => {
              const isActive = pathname === menu.href;
              return (
                <Link
                  key={menu.id}
                  href={menu.href}
                  onClick={() => fireEvent(menu)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{menu.name}</span>
                  {!isActive && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative flex flex-col justify-center items-center w-8 h-8 gap-1"
          >
            <span
              className={`block h-0.5 w-6 bg-white rounded transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute top-20 left-0 right-0 bg-black backdrop-blur-2xl border-b border-white/5 shadow-xl"
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-3">
                {navigationMenu.map((menu) => {
                  const isActive = pathname === menu.href;
                  return (
                    <Link
                      key={menu.id}
                      href={menu.href}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => {
                        fireEvent(menu);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-medium">{menu.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
