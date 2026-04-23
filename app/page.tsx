"use client";

import { motion } from "framer-motion";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="pt-[64px]">

      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* HERO */}
        <section id="hero" className="min-h-screen flex items-center">
          <Hero />
        </section>

        {/* ABOUT */}
        <section id="about">
          <Reveal>
            <About />
          </Reveal>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <Reveal>
            <Projects />
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Reveal>
            <Contact />
          </Reveal>
        </section>

        <ScrollToTop />
        <Footer />

      </motion.div>
    </main>
  );
}