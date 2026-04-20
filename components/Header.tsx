"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  const linkClass = (id: string) => {
    return `transition-colors duration-200 ${
      active === id
        ? "text-black dark:text-white font-semibold"
        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
    }`;
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className="fixed top-0 w-full h-[64px] flex items-center justify-between px-4 sm:px-6 z-50 
      backdrop-blur-xl 
      bg-white/30 dark:bg-black/60 
      border-b border-gray-200/50 dark:border-gray-800/50"
    >
      {/* LOGO */}
      <h1 className="font-orbitron font-bold text-lg tracking-wide">
        DS
      </h1>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex font-orbitron items-center gap-8 text-lg">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={linkClass(link.id)}>
            {link.label}
          </a>
        ))}
      </nav>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md 
          hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[64px] left-0 w-full 
            bg-white/90 dark:bg-black/90 
            backdrop-blur-xl 
            border-b border-gray-200 dark:border-gray-800 
            flex flex-col items-center gap-6 py-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={linkClass(link.id)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
