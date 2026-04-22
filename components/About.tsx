"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import SectionTitle from "./SectionTitle";

export default function About() {

 const items = [
  {
    title: "👋 Who I Am",
    desc: "I'm Devvrat Singh, a developer focused on building intelligent systems that go beyond traditional apps — blending AI with real-world usability.",
  },
  {
    title: "🚀 What I Build",
    desc: "From full-stack applications to AI-powered workflows, I design systems that automate, assist, and enhance user experience at scale.",
  },
  {
    title: "🧠 How I Think",
    desc: "I approach problems like systems — focusing on architecture, performance, and long-term scalability instead of quick fixes.",
  },
  {
    title: "⚡ What Drives Me",
    desc: "I’m driven by the idea of building smart products that feel intuitive, reduce friction, and create real impact for users.",
  },
];
const ref = useRef(null);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 640);
}, []);

// 🔥 SCROLL PROGRESS (0 → 1)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});

// 🔥 LINE FILL HEIGHT
const start = 0.05;
const end = 0.75; // 🔥 KEY FIX
const lineProgress = useTransform(
  scrollYProgress,
  [start, end],
  [0, 1]
);

const lineHeight = useTransform(
  lineProgress,
  [0, 1],
  ["0%", "100%"]
);
  // ✅ FIX: Stable particle positions
  const [particles, setParticles] = useState<
    { top: string; left: string }[]
  >([]);

  useEffect(() => {
    const generated = [...Array(4)].map(() => ({
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
 <section className="relative pb-10 w-full overflow-hidden isolate">

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
            className="absolute w-2 h-2 rounded-full bg-blue-500/20"
            style={{
              top: p.top,
              left: p.left,
            }}
          />
        ))}


      {/* 🖱️ MOUSE GLOW */}
      <motion.div
        className="pointer-events-none hidden sm:block opacity-10 rounded-full blur-3xl"
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

{/* 🌳 TIMELINE STORY */}
{/* 🌳 MOBILE = STACKED CARDS / DESKTOP = TIMELINE */}
<div ref={ref} className="relative max-w-5xl mx-auto mt-16 sm:mt-20">
  {/* 🌳 BACK LINE */}
  <div className="absolute left-[50.5%] top-0 w-[3px] sm:w-[5px]
bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500
-translate-x-1/2 hidden sm:block
shadow-[0_0_30px_rgba(99,102,241,0.9)]"
  />

  {/* 🔥 GLOW FILL LINE */}
 {/* 🔥 GLOW FILL LINE (BLURRED ENDS) */}
<motion.div
  style={{
    height: lineHeight,
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
    maskImage:
      "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
  }}
  transition={{ type: "spring", stiffness: 60, damping: 20 }}
  className="absolute left-[50.5%] -translate-x-1/2 top-0 w-[4px]
    bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500
    hidden sm:block
    shadow-[0_0_25px_rgba(99,102,241,0.6)]"
/>

  {items.map((item, i) => {
// 🔥 PERFECT DISTRIBUTION
const segment = 1 / (items.length - 1);
const triggerPoint =
  i === items.length - 1
    ? 0.92 // 🔥 pull last node earlier
    : segment * i;
// =========================
// 💥 PERFECT HIT (SYNCED TO LINE)
// =========================
const impact = useTransform(
  lineProgress,
  [
    triggerPoint - 0.008,  // tighter
    triggerPoint,
    triggerPoint + 0.008
  ],
  [0, 1, 0]
);

const impactSharp = useSpring(impact, {
  stiffness: 1600,
  damping: 12,
});
// 🔥 POP EXACTLY ON HIT
const scale = useSpring(
  useTransform(
    impactSharp,
    [0, 1],
    [1, i === items.length - 1 ? 2 : (isMobile ? 1.2 : 1.7)]
  ),
  { stiffness: 700, damping: 20 }
);

// =========================
// 💡 TRUE ON/OFF (NO EARLY GLOW)
// =========================
const active = useTransform(
  lineProgress,
  [triggerPoint - 0.002, triggerPoint + 0.002],
  [0, 1]
);

const activeSmooth = useSpring(active, {
  stiffness: 300,
  damping: 30,
});

// 🔵 NODE COLOR (REAL LIGHT)
const nodeColor = useTransform(
  activeSmooth,
  [0, 1],
  ["#3b82f6", "#93c5fd"]
);

// ✨ CLEAN GLOW (NO HALO SPAM)
const nodeShadow = useTransform(
  activeSmooth,
  (g) => `0 0 ${6 + g * 14}px rgba(147,197,253,${g})`
);

// 🌿 CARD GLOW
const cardShadow = useTransform(
  activeSmooth,
  (g) => `0px 0px ${12 + g * 20}px rgba(99,102,241,${g * 0.5})`
);
    return (
      <motion.div
        key={i}
        className={`
          relative flex items-center w-full my-20
          ${i % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}
          justify-center
        `}
      >

        {/* 🔵 NODE */}
<motion.div
  style={{
    scale: scale,
    backgroundColor: nodeColor,
    boxShadow: nodeShadow,
  }}
  className="absolute left-[50.5%] -translate-x-1/2
    w-4 h-4 sm:w-5 sm:h-5 rounded-full
    hidden sm:block"
/>
        {/* 🌿 CARD */}
        <motion.div
     style={{
  boxShadow: isMobile
    ? "0 0 20px rgba(99,102,241,0.25)"
    : cardShadow
}}
initial={{ opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : (i % 2 === 0 ? -50 : 50) }}          whileInView={{ scale: isMobile ? 1.03 : 1, opacity: 1, x: 0 }}
          viewport={{ once: false }}
transition={{
  duration: 0.4,
  ease: "easeOut"
}}       className={`
  relative w-[90%] sm:w-[48%] lg:w-[52%] xl:w-[55%]
  p-4 sm:p-8 lg:p-10
  rounded-2xl backdrop-blur-xl
  bg-white/70 dark:bg-white/5
  border border-white/20
  shadow-lg
  transition-all duration-300
  hover:scale-[1.02]

${i % 2 === 0 ? "sm:-ml-12 lg:-ml-20 xl:-ml-20" : "sm:-mr-12 lg:-mr-20 xl:-mr-20"}`}
        >

          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl 
            bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 
            blur-xl opacity-40 pointer-events-none" 
          />

          <div className="relative z-10">
<h2 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-4">
                {item.title}
            </h2>

<p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">              {item.desc}
            </p>
          </div>

        </motion.div>
      </motion.div>
    );
  })}
</div>
      <div className="absolute bottom-0 left-0 w-full h-40
  bg-gradient-to-b from-transparent to-black/70
  dark:to-black"
/>
    </section>
  );
}