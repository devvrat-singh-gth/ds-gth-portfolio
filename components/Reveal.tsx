"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  once?: boolean;     // true = section (animate once), false = content (repeat)
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  once = false,
  delay = 0,
  y = 40,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1], // 🔥 smooth premium easing
      }}
      viewport={{
        once,                 // ✅ control behavior here
        margin: "-100px",     // trigger slightly earlier
      }}
    >
      {children}
    </motion.div>
  );
}