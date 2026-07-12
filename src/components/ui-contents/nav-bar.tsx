"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

const navigationMenu = [
  { id: 1, name: "home", href: "/" },
  { id: 2, name: "projects", href: "/projects" },
  { id: 3, name: "skills", href: "/skills" },
  { id: 4, name: "experience", href: "/experience" },
  { id: 5, name: "contact", href: "/contact" },
];

function fireEvent(name: string) {
  switch (name.toLowerCase()) {
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
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentPage =
    navigationMenu.find((m) => m.href === pathname)?.name ?? "home";

  const results = useMemo(
    () =>
      navigationMenu.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  // Global cmd+k / ctrl+k listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [paletteOpen]);

  const goTo = (href: string, name: string) => {
    fireEvent(name);
    router.push(href);
    setPaletteOpen(false);
    setMobileMenuOpen(false);
  };

  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      goTo(results[activeIndex].href, results[activeIndex].name);
    }
  };

  return (
    <header className="fixed top-0 w-full z-99 font-mono">
      <div className="absolute inset-0 bg-console-panel/90 backdrop-blur-xl border-b border-console-border" />

      <div className="relative mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        {/* Logo — window controls + path */}
        <Link href="/" className="group flex items-center gap-3 z-50 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-console-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-console-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-console-amber/80 group-hover:bg-console-amber transition-colors" />
          </div>
          <div className="hidden sm:flex items-baseline gap-1.5 text-sm">
            <span className="text-console-muted">~/</span>
            <span className="text-console-text-strong group-hover:text-console-amber transition-colors">
              samir-patel
            </span>
          </div>
        </Link>

        {/* Breadcrumb-style path nav — desktop only */}
        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          {navigationMenu.map((menu, i) => {
            const isActive = pathname === menu.href;
            return (
              <span key={menu.id} className="flex items-center gap-1">
                <Link
                  href={menu.href}
                  onClick={() => fireEvent(menu.name)}
                  className={`relative px-1 py-1 transition-colors duration-150 ${
                    isActive
                      ? "text-console-amber"
                      : "text-console-muted hover:text-console-text"
                  }`}
                >
                  {menu.name}
                </Link>
                {i < navigationMenu.length - 1 && (
                  <span className="text-console-faint">/</span>
                )}
              </span>
            );
          })}
        </nav>

        {/* Right side — command palette trigger + mobile hamburger */}
        <div className="flex items-center gap-3 z-50">
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-console-border bg-console-bg/60 hover:border-console-amber/40 transition-colors duration-150 text-xs text-console-muted"
          >
            <span className="text-console-faint">$</span> nav --{currentPage}
            <kbd className="ml-1 px-1.5 py-0.5 rounded bg-console-panel-2 border border-console-border text-[10px] text-console-faint">
              ⌘K
            </kbd>
          </button>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-6 bg-console-text transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-console-text transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-px w-6 bg-console-text transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
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
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-console-panel border-b border-console-border shadow-xl"
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col">
                {navigationMenu.map((menu) => {
                  const isActive = pathname === menu.href;
                  return (
                    <Link
                      key={menu.id}
                      href={menu.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors duration-150 ${
                        isActive
                          ? "text-console-amber bg-console-bg"
                          : "text-console-muted hover:text-console-text"
                      }`}
                      onClick={() => {
                        fireEvent(menu.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="text-console-faint">
                        {isActive ? ">" : "·"}
                      </span>
                      {menu.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette (⌘K quick-nav) */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="fixed inset-0 z-999 flex items-start justify-center pt-[15vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setPaletteOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-md rounded-lg border border-console-border bg-console-panel shadow-2xl overflow-hidden"
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-console-border text-xs">
                <span className="text-console-muted">quick-nav.sh</span>
                <span className="text-console-faint">esc to close</span>
              </div>

              {/* Input line */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-console-border">
                <span className="text-console-amber">{">"}</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handlePaletteKeyDown}
                  placeholder="jump to a page..."
                  className="flex-1 bg-transparent outline-none text-sm text-console-text placeholder-console-faint"
                />
                <span className="console-cursor" />
              </div>

              {/* Results */}
              <div className="py-1.5 max-h-64 overflow-y-auto">
                {results.length === 0 && (
                  <div className="px-4 py-6 text-center text-xs text-console-faint">
                    no matches for &ldquo;{query}&rdquo;
                  </div>
                )}
                {results.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => goTo(m.href, m.name)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-100 ${
                      i === activeIndex
                        ? "bg-console-bg text-console-amber"
                        : "text-console-muted"
                    }`}
                  >
                    <span className="text-console-faint text-xs">
                      {String(m.id).padStart(2, "0")}
                    </span>
                    {m.name}
                    {pathname === m.href && (
                      <span className="ml-auto text-[10px] text-console-faint">
                        current
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
