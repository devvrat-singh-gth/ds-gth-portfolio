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
  once = true,
  delay = 0,
  y = 40,
}: RevealProps) {
  const ref = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);
  }, []);

  // ✅ RESTORED SMART TRIGGER (from old code)
  const isInView = useInView(ref, {
margin: "0px 0px -20% 0px",
    once,
  });

  if (!mounted) {
    return <div ref={ref}>{children}</div>;
  }

  const shouldAnimate = !isMobile;

  return (
    <motion.div
      ref={ref}
      initial={
        shouldAnimate
          ? {
              opacity: 0.3, // 🔥 NOT 0 → prevents invisible bug
              y,
              scale: 0.98,
              filter: "blur(6px)",
            }
          : false
      }
      animate={
        shouldAnimate
          ? {
              opacity: isInView ? 1 : 0.3, // 🔥 SAFE fallback
              y: isInView ? 0 : y,
              scale: isInView ? 1 : 0.98,
              filter: isInView ? "blur(0px)" : "blur(6px)",
            }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}