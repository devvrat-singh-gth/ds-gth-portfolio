"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

export default function About() {

  const items = [
    {
      title: "🚀 Building Intelligence",
      desc: "Creating AI-powered applications that automate workflows and generate real-world impact.",
    },
    {
      title: "🧠 Learning Systems",
      desc: "Exploring agent-based architectures, LLM pipelines, and scalable AI integrations.",
    },
    {
      title: "⚙️ Engineering Core",
      desc: "Designing performant full-stack systems with clean architecture and optimized flows.",
    },
    {
      title: "🤝 Collaborative Vision",
      desc: "Working on meaningful products that combine AI with real user needs.",
    },
  ];

  // ✅ FIX: Stable particle positions
  const [particles, setParticles] = useState<
    { top: string; left: string }[]
  >([]);

  useEffect(() => {
    const generated = [...Array(8)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setParticles(generated);
  }, []);

  // 🔥 Mouse Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
 <section className="relative w-full overflow-hidden isolate">
<div className="absolute top-0 left-0 w-full h-40
  bg-gradient-to-b from-black/80 to-transparent
  dark:from-black"
/>
  {/* ✅ BASE */}
  <div className="absolute inset-0 -z-30 
    bg-white dark:bg-[#0a0f14]" />

  {/* ✅ SOFT GRADIENT (FIXED) */}
<div className="absolute inset-0 -z-20
  bg-gradient-to-br
  from-blue-100 via-blue-50 to-purple-100
  dark:from-[#0a0f14] dark:via-[#0f172a] dark:to-[#0a0f14]" />

  <div className="absolute inset-0 -z-10
  bg-gradient-to-r
  from-blue-400/10 via-purple-400/10 to-pink-400/10
  blur-2xl"
/>

  {/* ✅ TEXTURE (VISIBLE NOW) */}
  <div className="absolute inset-0 -z-10
    bg-[url('/textures/axiom-pattern.png')]
    opacity-[0.15]
    dark:opacity-[0.08]" />

  {/* ✅ HERO → ABOUT SEPARATOR (VERY IMPORTANT) */}
  <div className="absolute top-0 left-0 w-full h-32 -z-10
    bg-gradient-to-b from-black/40 to-transparent
    dark:from-black/60" />
        {/* particles (FIXED) */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 rounded-full bg-blue-500/30"
            style={{
              top: p.top,
              left: p.left,
            }}
          />
        ))}


      {/* 🖱️ MOUSE GLOW */}
      <motion.div
        className="pointer-events-none fixed w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #6366f1, transparent 70%)",
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 🧠 TITLE */}
      <div className="pt-32 font-orbitron">
        <SectionTitle title="ABOUT ME" />
      </div>

      {/* 🔥 STORY BLOCKS */}
      <div className="flex flex-col">

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            
            // ✅ IMPORTANT CHANGE
            viewport={{ once: false, margin: "-100px" }}

            transition={{ duration: 0.7, delay: i * 0.2 }}
            className="min-h-[80vh] flex items-center justify-center px-6"
          >
            <div className="relative max-w-3xl text-center">

              {/* glow */}
              <div className="absolute inset-0 blur-2xl opacity-20 
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />

              <div className="relative z-10">

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
                  {item.title}
                </h2>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

                {/* dots */}
                <div className="mt-8 flex justify-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200" />
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-400" />
                </div>

              </div>

            </div>
          </motion.div>
        ))}

      </div>
      <div className="absolute bottom-0 left-0 w-full h-40
  bg-gradient-to-b from-transparent to-black/70
  dark:to-black"
/>
    </section>
  );
}