"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

export default function Footer() {
  const active = useActiveSection();

  const linkClass = (id: string) => {
    const isActive = active === id;

    return `transition-colors duration-200 ${
      isActive
        ? "text-black dark:text-white font-semibold"
        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
    }`;
  };

  return (
<footer className="
relative py-10 px-6 md:px-12
backdrop-blur-xl
bg-white/60 dark:bg-black/80
border-t border-gray-200/50 dark:border-gray-800/50
">
<div className="absolute inset-0 -z-10
  bg-[url('/textures/diagmonds-light.png')]
  bg-repeat
  opacity-[0.15]
  dark:opacity-[0.08]" />
   {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-8 text-sm">

        {/* LEFT: LOGO + TAGLINE */}
        <div className="text-center md:text-left">
       <h2 className="text-2xl md:text-3xl lg:text-4xl font-mono tracking-widest font-semibold text-black dark:text-white">
  Devvrat Singh
</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto md:mx-0">
            Building AI-powered web experiences & scalable apps.
          </p>
        </div>

        {/* MIDDLE: NAVIGATION */}
        <div className="flex flex-row md:flex-col flex-wrap justify-center md:justify-start gap-4 md:gap-2">
          <a href="#hero" className={linkClass("hero")}>Home</a>
          <a href="#about" className={linkClass("about")}>About</a>
          <a href="#projects" className={linkClass("projects")}>Projects</a>
          <a href="#contact" className={linkClass("contact")}>Contact</a>
        </div>

        {/* RIGHT: SOCIAL + CTA */}
        <div className="flex flex-col items-center md:items-end gap-3">

          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-gray-500 dark:text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="mailto:example@email.com"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="mt-2 text-xs px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full
            hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
            transition-all duration-200"
          >
            Let’s Work Together
          </a>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">

        {/* COPYRIGHT */}
        <p className="text-gray-500 dark:text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} Devvrat Singh. All rights reserved.
        </p>

        {/* TECH STACK */}
        <p className="text-gray-400 dark:text-gray-500 text-center md:text-right">
          Built with Next.js
        </p>

      </div>

    </footer>
  );
}