"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean; // ✅ RESTORED
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  once = true, // ✅ default behavior
}: RevealProps) {
  const ref = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false); // 🔥 LOCK STATE

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // ✅ ORIGINAL TRIGGER
  const isInView = useInView(ref, {
    margin: "-20% 0px",
  });

  // 🔥 ONCE LOGIC (CRITICAL FIX)
  useEffect(() => {
    if (isInView) {
      setHasRevealed(true);
    }
  }, [isInView]);

  const shouldAnimate = !isMobile;

  return (
    <motion.div
      ref={ref}
      initial={
        shouldAnimate
          ? {
              opacity: 0.5,
              y: 30,
              scale: 0.98,
              filter: "blur(6px)",
            }
          : false
      }
      animate={
        shouldAnimate
          ? (once ? hasRevealed : isInView)
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0.3,
                y: 32,
                scale: 0.98,
                filter: "blur(6px)",
              }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration: shouldAnimate ? 0.45 : 0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}