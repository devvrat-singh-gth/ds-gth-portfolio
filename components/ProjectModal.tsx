"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";

export default function ProjectModal({ project, onClose }: any) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
        initial={false}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 🔥 BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 🔥 MODAL */}
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden 
            bg-white/80 dark:bg-black/70 backdrop-blur-xl 
            border border-gray-200 dark:border-gray-800 shadow-2xl"
          >

            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={onClose}
             className="absolute top-4 right-4 z-20 p-2 rounded-full 
bg-black/70 backdrop-blur-md text-white hover:scale-110 transition"  >
              <FiX />
            </button>

            {/* 🔥 IMAGE HERO */}
      <div className="relative h-[260px] md:h-[320px] overflow-hidden">
  <img
    src={project.image}
    className="w-full h-full object-top object-cover"
  />  
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* 🔥 CONTENT */}
            <div className="p-6 md:p-8">

              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {project.description}
              </p>

              {/* 🔥 TECH */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech?.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full 
                    bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    border border-gray-200 dark:border-gray-700 backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 🔥 ACTION BUTTONS */}
              <div className="flex gap-4">

                <a
                  href={project.github}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full 
                  bg-black text-white dark:bg-white dark:text-black 
                  hover:scale-105 transition"
                >
                  <FaGithub /> GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full 
                  border border-gray-300 dark:border-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  <FiExternalLink /> Live Demo
                </a>

              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}