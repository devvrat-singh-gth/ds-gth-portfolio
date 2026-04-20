"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollSystem({
  children,
}: {
  children: React.ReactNode;
}) {
  // ================= SMOOTH SCROLL =================
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // 🔥 smoothness
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // ================= SCROLL PROGRESS =================
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <>
      {/* 🔥 PROGRESS BAR */}
      <motion.div
        className="fixed left-0 top-[64px] h-[3px] w-full z-[50]"
        style={{
          scaleX,
          transformOrigin: "0%",
          background:
            "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
        }}
      />

      {/* APP */}
      {children}
    </>
  );
}