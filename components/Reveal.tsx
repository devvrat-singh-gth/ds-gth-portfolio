"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  once?: boolean;
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  once = false,
  delay = 0,
  y = 40,
}: RevealProps) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // 🔥 PRE-TRIGGER (tight, no gap)
  const isInView = useInView(ref, {
    margin: isMobile ? "-35% 0px" : "-20% 0px",
    once,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0.5,
        y: isMobile ? 12 : 30,
        scale: 0.98,
        filter: isMobile ? "blur(4px)" : "blur(6px)", // 👈 subtle gap mask
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)", // 👈 becomes sharp immediately
            }
          : {
              opacity: 0.3,
              y: isMobile ? 14 : 32,
              scale: 0.98,
              filter: isMobile ? "blur(4px)" : "blur(6px)",
            }
      }
      transition={{
        duration: isMobile ? 0.3 : 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}