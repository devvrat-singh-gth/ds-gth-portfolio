"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {

  // 🔥 Mouse Follow Gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🔥 Typing Effect
  const roles = [
    "Full Stack Developer",
    "AI Integration Enthusiast",
    "Building AI-powered apps ⚡",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (subIndex < roles[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + roles[index][subIndex]);
        setSubIndex(subIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setText("");
        setSubIndex(0);
        setIndex((prev) => (prev + 1) % roles.length);
      }, 1500);
    }
  }, [subIndex, index]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4">

      {/* 🎥 VIDEO BACKGROUND */}
<video
  autoPlay
  loop
  muted
  playsInline
  ref={(video) => {
    if (video) video.playbackRate = 1.0;
  }}
  className="absolute inset-0 w-full h-full object-cover -z-30"
>
  <source src="/videos/hero-bg.webm" type="video/webm" />
  <source src="/videos/hero-bg-mobile.webm" type="video/webm" media="(max-width: 768px)" />
</video>

      {/* 🌑 DARK OVERLAY (IMPORTANT FOR TEXT VISIBILITY) */}
      <div className="absolute inset-0 bg-black/50 -z-20" />

      {/* 🔥 MOUSE FOLLOW LIGHT */}
      <motion.div
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, #6366f1, transparent 70%)",
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 🔥 BACKGROUND BLOBS (SUBTLE NOW) */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute w-[900px] h-[900px] bg-purple-500/10 rounded-full blur-[150px] top-[-200px] left-[-200px]"
      />

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] bottom-[-200px] right-[-200px]"
      />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 text-center max-w-4xl px-2 sm:px-0 mx-auto">

        {/* 🧊 GLASS CONTAINER */}
        <div className="
          backdrop-blur-xl 
          bg-white/10 dark:bg-white/5
          border border-white/20
          rounded-3xl px-6 sm:px-10 py-10
          shadow-xl
        ">

          {/* 👤 NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
           className="
  text-3xl sm:text-5xl md:text-6xl 
  font-orbitron font-bold leading-tight
  text-white
  break-words
"
          >
Hi, I&apos;m <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Devvrat Singh
            </span>
          </motion.h1>

          {/* ⌨️ TYPING TEXT */}
          <p className="
            mt-6 font-mono
            text-gray-200 dark:text-gray-300
            text-lg sm:text-xl 
            h-[30px]
          ">
            {text}
            <span className="animate-pulse">|</span>
          </p>

          {/* 🎯 CTA */}
          <div className="mt-10 flex gap-6 justify-center font-orbitron flex-wrap">

            <MagneticButton href="#projects" wipe>
              View Projects
            </MagneticButton>

            <MagneticButton href="#contact" wipe reverse>
              Contact Me
            </MagneticButton>

          </div>
        </div>
      </div>

      {/* 🔻 BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-40
        bg-gradient-to-b from-transparent to-black/80
      " />

    </section>
  );
}