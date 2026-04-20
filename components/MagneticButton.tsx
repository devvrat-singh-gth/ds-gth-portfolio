"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  children,
  href,
  className = "",
  wipe = false,        // 🔥 enable wipe
  reverse = false,     // 🔥 direction
}: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * 0.3);
    y.set(offsetY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href || "#"}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY }}
      className={`
        relative group overflow-hidden
        px-6 py-3 rounded-full
        bg-black text-white
        dark:bg-white dark:text-black
        shadow-md inline-flex items-center justify-center
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
    >
      {/* 🔥 WIPE EFFECT */}
  {/* 🔥 WIPE EFFECT */}
{wipe && (
  <span
    className={`
      absolute inset-0
      bg-white dark:bg-black
      scale-x-0 group-hover:scale-x-100
      ${reverse ? "origin-right" : "origin-left"}
      transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      z-0
    `}
  />
)}

      {/* TEXT */}
      <span
        className={`
          relative z-10
          ${wipe
            ? "group-hover:text-black dark:group-hover:text-white transition-colors duration-500"
            : ""}
        `}
      >
        {children}
      </span>
    </motion.a>
  );
}