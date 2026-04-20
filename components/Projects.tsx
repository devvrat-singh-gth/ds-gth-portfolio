"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionTitle from "./SectionTitle";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const projects = [
    {
      title: "AI Assistant [Groq-API]",
      description: "AI-powered assistant with voice, chat, and automation features.",
      tech: ["Next.js", "API-LLM", "TTS", "Python-FastAPI"],
      image: "/projects/project1.png",
      github: "https://github.com/devvrat-singh-gth/Chatbot_CstmPrmpt",
      live: "#",
      gradient: "from-purple-500/20 via-blue-500/20 to-pink-500/20",
    },
    {
      title: "VeNexus Extension",
      description: "Aesthetic browser extension with wallpapers, animations, and productivity tools.",
      tech: ["React-Vite", "Three.js","TTS"],
      image: "/projects/project3.png",
      github: "https://github.com/devvrat-singh-gth/VeNexus_Brswer_Extnsion",
      live: "#",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    },
    {
      title: "InternAdda",
      description: "Internship platform with student + admin workflows.",
      tech: ["MongoDB", "ExpressJS", "React", "Node.js", "JWT-AUTH"],
      image: "/projects/project1.png",
      github: "https://github.com/devvrat-singh-gth/internshipHub-frontend",
      live: "https://internship-hub-frontend-two.vercel.app/",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Portfolio Website",
      description: "Modern responsive portfolio with animations and interactive UI.",
      tech: ["Next.js", "TypeScript", "Resend API"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      github: "#",
      live: "#",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    },
  ];

  return (
   <section className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-32 py-16 md:py-24 overflow-hidden isolate">
<div className="absolute top-0 left-0 w-full h-40
  bg-gradient-to-b from-black/70 to-transparent
  dark:from-black"
/>
  {/* ✅ BASE */}
  <div className="absolute inset-0 -z-30 
    bg-white dark:bg-[#0a0f14]" />

  {/* ✅ GRADIENT */}
  <div className="absolute inset-0 -z-20
  bg-gradient-to-b
  from-blue-100 via-blue-50 to-purple-100
  dark:from-[#0a0f14] dark:via-[#111827] dark:to-[#0a0f14]" />
  
  
    {/* ✅ TEXTURE */}
  <div className="absolute inset-0 -z-10
    bg-[url('/textures/cutcube.png')]
    opacity-[0.12]
    dark:opacity-[0.06]" />

  {/* ✅ AMBIENT LIGHT */}
  <div className="absolute inset-0 -z-10
    bg-gradient-to-r
   from-blue-400/15 via-purple-400/15 to-pink-400/15 blur-2xl" />

        {/* ================= CONTENT ================= */}
<div className="pt-20 font-orbitron">
        <SectionTitle title="MY PROJECTS" reverse />
</div>
        <div className="grid grid-cols-1 gap-16">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              onClick={setSelected}
              index={i}
            />
          ))}
        </div>

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
<div className="absolute bottom-0 left-0 w-full h-20
  bg-gradient-to-b from-transparent to-black/70
  dark:to-black"
/>
      </section>
  );
}