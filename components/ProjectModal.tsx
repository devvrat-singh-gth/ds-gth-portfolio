"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectModal({ project, onClose }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
if (window.innerWidth >= 1024) {
  document.body.style.overflow = "hidden"; // desktop only
}
   return () => {
  window.removeEventListener("keydown", handleKey);

  if (window.innerWidth >= 1024) {
    document.body.style.overflow = "auto";
  }
}}, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
      className="
  fixed inset-0 z-[9999]
  flex items-start justify-center
  overflow-y-auto
"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="
              relative w-full max-w-3xl lg:max-w-5xl mx-4
              h-auto lg:h-[80vh]
              flex flex-col
              rounded-3xl overflow-hidden
              bg-white/95 dark:bg-[#0a0f14]/95
              backdrop-blur-2xl
              border border-gray-200 dark:border-gray-800
              shadow-[0_40px_120px_rgba(0,0,0,0.7)]
            "
          >

            {/* IMAGE */}
            <div className="relative h-[200px] lg:h-[260px] xl:h-[300px] overflow-hidden">
              <img
                src={project.image}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* CONTENT AREA */}
            <div className="flex flex-col flex-1 min-h-0">

              {/* SCROLLABLE CONTENT */}
<div className="
  flex-1 overflow-y-auto
  p-4 sm:p-6 md:p-8
space-y-4 sm:space-y-5 md:space-y-8
  lg:pt-16 xl:pt-14
">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="
                        text-xs px-3 py-1 rounded-full
                        bg-gray-100 dark:bg-white/10
                        border border-gray-200 dark:border-gray-700
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ✅ TRUE BOTTOM FOOTER */}
           {/* FOOTER */}
<div className="
  p-4 sm:p-5 md:p-6
  border-t border-gray-200 dark:border-gray-800
  bg-white/80 dark:bg-[#0a0f14]/80 backdrop-blur-xl
">
  <div className="flex flex-row gap-2 sm:gap-3">

  <a
    href={project.github}
    target="_blank"
    className="
      flex-1 min-w-0 flex items-center justify-center gap-2
      py-2.5 sm:py-3 text-sm sm:text-base
      rounded-full
      bg-black text-white dark:bg-white dark:text-black
      transition-all duration-300
      hover:scale-[1.02] hover:shadow-lg
    "
  >
    <FaGithub /> GitHub
  </a>

  <a
    href={project.live}
    target="_blank"
    className="
      flex-1 min-w-0 flex items-center justify-center gap-2
      py-2.5 sm:py-3 text-sm sm:text-base
      rounded-full
      border border-gray-300 dark:border-gray-700
      transition-all duration-300
      hover:bg-gray-100 dark:hover:bg-white/10
      hover:scale-[1.02] hover:shadow-md
    "
  >
    <FiExternalLink /> Live
  </a>

</div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}