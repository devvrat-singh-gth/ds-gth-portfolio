"use client";

import { useEffect, useState, useRef } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const contactEl = document.querySelector("#contact");
    const footerEl = document.querySelector("footer");

    if (!contactEl || !footerEl) return;

    let ticking = false;

    const checkPosition = () => {
      const scrollY = window.scrollY;

      const contactTop = (contactEl as HTMLElement).offsetTop;
      const footerTop = (footerEl as HTMLElement).offsetTop;

      // 🔥 RANGE LOGIC
      const inRange = scrollY >= contactTop && scrollY <= footerTop;

      if (inRange) {
        setShow(true);

        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

        hideTimerRef.current = setTimeout(() => {
          setShow(false);
        }, 1000);
      } else {
        setShow(false);

        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[1000] p-3 rounded-full 
          bg-black text-white dark:bg-white dark:text-black 
          shadow-lg hover:scale-110 transition"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}