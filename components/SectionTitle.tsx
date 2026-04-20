"use client";

import MagneticButton from "./MagneticButton";

export default function SectionTitle({
  title,
  reverse = false,
  href,
}: {
  title: string;
  reverse?: boolean;
  href?: string;
}) {
  const content = (
    <div
      className="
        relative group w-full max-w-[1600px]
        overflow-hidden rounded-2xl
        px-6 sm:px-10 md:px-16 py-4 sm:py-5 md:py-6
        bg-white dark:bg-black
        border border-gray-300 dark:border-gray-700
      "
    >
      {/* 🔥 WIPE */}
      <span
        className={`
          absolute inset-0 w-0 group-hover:w-full
          ${reverse ? "right-0 origin-right" : "left-0 origin-left"}
          bg-black dark:bg-white
          transition-all duration-500 ease-in-out
        `}
      />

      {/* ✨ TEXT */}
      <h2
        className="
          relative z-10 text-center
          text-lg sm:text-xl md:text-2xl lg:text-3xl
          tracking-[0.2em] font-semibold
          text-black dark:text-white
          group-hover:text-white dark:group-hover:text-black
          transition-colors duration-500
        "
      >
        {title}
      </h2>
    </div>
  );

  return (
    <div className="w-full flex justify-center mb-20 px-4 sm:px-6 lg:px-12 xl:px-20">

      {/* ✅ HYBRID MODE (magnetic + wipe) */}
      {href ? (
        <MagneticButton
          href={href}
          className="w-full max-w-[1600px] !bg-transparent !shadow-none !p-0"
        >
          {content}
        </MagneticButton>
      ) : (
        content
      )}

    </div>
  );
}