"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectCard({ project, onClick, index }: any) {
  const isReverse = index % 2 !== 0;

  const variants = {
    hiddenLeft: { opacity: 0, x: -120 },
    hiddenRight: { opacity: 0, x: 120 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.1, // ✅ NOW WORKS
      },
    }),
  };

  return (
    <motion.div
      custom={index} // ✅ PASS INDEX HERE
      variants={variants}
      initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => onClick(project)}
      className="group relative w-full h-[520px] md:h-[600px] rounded-3xl cursor-pointer"
    >

      {/* 🔥 NEON BORDER */}
      <div className="absolute inset-0 rounded-3xl p-[5px] z-0 overflow-hidden">

        <div className="absolute inset-0 rounded-3xl 
          bg-gradient-to-r from-cyan-400 via-indigo-500 via-purple-500 to-pink-500
          opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="absolute top-0 left-[-50%] h-full w-[50%]
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          blur-md opacity-0 group-hover:opacity-100
          group-hover:animate-[glowTrail_2.5s_linear_infinite]" />
      </div>

      {/* 🧊 GLASS CARD */}
      <div className="
        relative z-10 h-full m-[2px] rounded-3xl overflow-hidden
        bg-black/20 dark:bg-black/40 backdrop-blur-xl
        border border-gray-200/40 dark:border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)]
        transition-all duration-500 ease-out
        group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.6)]
      ">

        {/* ✨ BACKGROUND GLOW */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
          bg-gradient-to-br ${project.gradient} blur-2xl
        `} />

        {/* 🔥 TITLE OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4 hidden md:flex">
          <h3 className="
            text-5xl md:text-6xl xl:text-7xl
            font-mono font-light tracking-[0.25em] md:tracking-[0.3em]
            uppercase text-center text-transparent bg-clip-text
            bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400
            transition duration-500 group-hover:opacity-0
            max-w-[90%] break-words leading-tight
          ">
            {project.title}
          </h3>
        </div>

        {/* 📦 CONTENT */}
        <div className={`
          relative z-10 flex flex-col md:flex-row h-full
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition duration-500
          ${isReverse ? "md:flex-row-reverse" : ""}
        `}>

          {/* IMAGE */}
          <div className="md:w-1/2 w-full h-[260px] md:h-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-110"            />
          </div>

          {/* TEXT */}
          <div className="md:w-1/2 w-full flex-1 p-6 md:p-10 flex flex-col justify-center gap-2 text-gray-900 dark:text-white">

            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {project.description}
            </p>

            {/* TECH */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech?.map((t: string, i: number) => (
                <span
                  key={i}
                  className="
                    text-xs font-medium px-3 py-1 rounded-full
                    bg-white/40 dark:bg-white/10
                    backdrop-blur-md border border-gray-200 dark:border-gray-700
                    shadow-sm hover:scale-105 transition
                  "
                >
                  {t}
                </span>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-2">
              <MagneticButton href={project.github || "#"}>
                <FaGithub size={22} />
              </MagneticButton>

              <MagneticButton href={project.live || "#"}>
                <FiExternalLink size={22} />
              </MagneticButton>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}