"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

export default function ProjectCard({ project, onClick, index, isActive }: any) {
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
        delay: i * 0.1,
      },
    }),
  };
const [inView, setInView] = useState(false);
const cardRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  if (isMobile) return; // 🚫 desktop only

  const observer = new IntersectionObserver(
    ([entry]) => {
      setInView(entry.isIntersecting);
    },
    { threshold: 0.6 }
  );

  if (cardRef.current) observer.observe(cardRef.current);

  return () => observer.disconnect();
}, [isMobile]);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
const isVisibleActive = isActive || (!isMobile && inView);
  return (
    <motion.div
    ref={cardRef}
      custom={index}
      variants={variants}
      initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileTap={{ scale: 0.98 }}
      whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
      onClick={() => onClick(project)}
     className={`group relative w-full h-[420px] sm:h-[520px] md:h-[600px] rounded-3xl cursor-pointer active:scale-[0.98]
  ${isActive ? "scale-[1.02] -translate-y-2" : ""}

  transition-all duration-500

  ${
    isVisibleActive
      ? "shadow-[0_0_30px_rgba(59,130,246,0.7),0_0_60px_rgba(168,85,247,0.6)]"
      : "shadow-[0_8px_30px_rgba(0,0,0,0.25)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
  }
`}   >

    
      {/* 🧊 GLASS CARD */}
      <div className={`
        relative z-10 h-full m-[2px] rounded-3xl overflow-hidden
        bg-black/20 dark:bg-black/40 backdrop-blur-xl
        border border-gray-200/40 dark:border-white/10
       shadow-none
        transition-all duration-500 ease-out
        ${isActive 
          ? "shadow-[0_25px_70px_rgba(0,0,0,0.6)]" 
          : "group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.6]"
        }
      `}>

        {/* ✨ BACKGROUND GLOW */}
        <div className={`
          absolute inset-0 transition duration-500
          bg-gradient-to-br ${project.gradient} blur-2xl
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `} />

        {/* 🔥 TITLE OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4 hidden md:flex">
         <h3
  className={`
    text-4xl md:text-6xl xl:text-7xl
    font-mono font-light
    tracking-[0.15em] md:tracking-[0.2em]
    uppercase text-center
    text-transparent bg-clip-text
    bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400
    transition duration-500

    break-words whitespace-normal leading-tight max-w-[90%]

    ${isActive ? "opacity-0" : "group-hover:opacity-0"}
  `}
>
  {project.title}
</h3>
        </div>

        {/* 📦 CONTENT */}
        <div className={`
          relative z-10 flex flex-col md:flex-row h-full
          transition duration-500
          ${isActive 
            ? "opacity-100" 
            : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
          }
          ${isReverse ? "md:flex-row-reverse" : ""}
        `}>

          {/* IMAGE */}
          <div className="md:w-1/2 w-full h-[200px] sm:h-[240px] md:h-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className={`
                w-full h-full object-cover object-top transition duration-500
                ${isActive ? "scale-110" : "group-hover:scale-110"}
              `}
            />
          </div>

          {/* TEXT */}
          <div className="md:w-1/2 w-full flex-1 p-4 sm:p-6 md:p-10 flex flex-col justify-center gap-2">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="hidden sm:block text-gray-600 dark:text-gray-400 mb-6">
              {project.description}
            </p>

            {/* TECH */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech?.map((t: string, i: number) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 rounded-full
                  bg-white/40 dark:bg-white/10
                  backdrop-blur-md border border-gray-200 dark:border-gray-700
                  shadow-sm hover:scale-105 transition"
                >
                  {t}
                </span>
              ))}
            </div>

            {!isMobile && (
              <div className="flex gap-4 pt-2">
                <MagneticButton href={project.github || "#"}>
                  <FaGithub size={22} />
                </MagneticButton>

                <MagneticButton href={project.live || "#"}>
                  <FiExternalLink size={22} />
                </MagneticButton>
              </div>
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
}