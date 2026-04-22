"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectModal({ project, onClose }: any) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 🔥 BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 🔥 BOTTOM SHEET */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 120) onClose();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="
              relative w-full max-w-xl rounded-t-3xl
              bg-white/90 dark:bg-[#0a0f14]/95
              backdrop-blur-xl
              border-t border-gray-200 dark:border-gray-800
              shadow-2xl
            "
          >

            {/* 🔥 DRAG HANDLE */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 rounded-full bg-gray-400/50" />
            </div>

            {/* 🔥 IMAGE */}
            <div className="relative h-[200px] overflow-hidden">
              <img
                src={project.image}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* 🔥 CONTENT */}
            <div className="p-5">

              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>

              {/* TECH */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech?.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full
                    bg-white/40 dark:bg-white/10
                    border border-gray-200 dark:border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">

                <a
                  href={project.github}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full 
                  bg-black text-white dark:bg-white dark:text-black"
                >
                  <FaGithub /> GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full 
                  border border-gray-300 dark:border-gray-700"
                >
                  <FiExternalLink /> Live
                </a>

              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}