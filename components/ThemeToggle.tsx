"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full 
      border border-gray-300 dark:border-gray-600 
      hover:scale-110 transition"
    >
      <FiSun
        className={`absolute text-lg transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100"
        }`}
      />

      <FiMoon
        className={`absolute text-lg transition-all duration-300 ${
          isDark ? "opacity-100" : "opacity-0 -rotate-90 scale-0"
        }`}
      />
    </button>
  );
}