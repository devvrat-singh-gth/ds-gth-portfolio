"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed pointer-events-none -z-10"
      style={{
        left: pos.x - 100,
        top: pos.y - 100,
      }}
    >
      <div className="w-[180px] h-[180px] rounded-full blur-3xl opacity-30 animate-gradient bg-[linear-gradient(45deg,#6366f1,#a855f7,#ec4899,#3b82f6)] bg-[length:300%_300%]" />
    </div>
  );
}