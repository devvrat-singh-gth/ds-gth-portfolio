"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
}: RevealProps) {
  const ref = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // ✅ ORIGINAL WORKING TRIGGER (DO NOT TOUCH)
  const isInView = useInView(ref, {
    margin: "-20% 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={
        isMobile
          ? false // 🚫 disable reveal on mobile
          : {
              opacity: 0.5,
              y: 30,
              scale: 0.98,
              filter: "blur(6px)",
            }
      }
      animate={
        isMobile
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : isInView
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
      }
      transition={{
        duration: isMobile ? 0 : 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}