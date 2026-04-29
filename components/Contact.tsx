"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import SectionTitle from "./SectionTitle";

const USE_EMAILJS = true; // 🔥 true = EmailJS, false = Resend API

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // 🔐 Honeypot check
const submit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // 🔐 Honeypot
  if (formData.get("company")) return;

  try {
    setStatus("loading");
    toast.loading("Sending message...");

    // =========================
    // 🔥 OPTION 1: EMAILJS
    // =========================
    if (USE_EMAILJS) {
      await emailjs.send(
        "service_l9iq879",
        "template_zrcfjyh",
      {
  name: `${form.firstName} ${form.lastName}`, // 🔥 important
  email: form.email,
  message: form.message,
},
        "twycHeSs83qBDYqdE"
      );
    }

    // =========================
    // 🔥 OPTION 2: RESEND API
    // =========================
    else {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error();
    }

    // ✅ SUCCESS FLOW
    toast.dismiss();
    toast.success("Message sent successfully 🚀");

    setStatus("sent");

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });

  } catch (err) {
    console.error(err);

    toast.dismiss();
    toast.error("Something went wrong ❌");

    setStatus("error");
  }

  setTimeout(() => setStatus("idle"), 2500);
};
  return (
    <section className="w-full py-20 md:py-28 relative">
<div className="pt-4 font-orbitron">
<SectionTitle title="CONTACT" />
</div>
  {/* ✅ HERO → ABOUT SEPARATOR (VERY IMPORTANT) */}
<div className="absolute top-0 left-0 w-full h-40
  bg-gradient-to-b from-black/70 to-transparent
  dark:from-black"
/>
     {/* 🌈 BASE GRADIENT */}
<div className="absolute inset-0 -z-10 
  bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

{/* 🧊 PATTERN TEXTURE */}
<div className="absolute inset-0 -z-10 
bg-[url('/textures/3px-tile.png')] 
opacity-70 
mix-blend-overlay" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">

<div className="grid md:grid-cols-[1fr_1.4fr] gap-24 lg:gap-32 items-center">
          {/* LEFT */}
{/* LEFT */}
<div className="hidden md:flex flex-col gap-6 pr-4 lg:pr-12">

            <h2 className="text-5xl lg:text-6xl font-semibold leading-tight">
              Bring your biggest goals,
              <br />
              <span className="italic text-gray-500 dark:text-gray-500">
                I’ll find the best way there.
              </span>
            </h2>

            <div className="mt-6">
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">
                Contact Me
              </p>
              <p className="text-sm italic font-medium">
                devvratsinghbanga2005@gmail.com
              </p>
            </div>

          </div>

          {/* RIGHT FORM */}
 <div className="relative w-full p-8 lg:p-12 rounded-2xl 
bg-white/70 dark:bg-gray-500/50 
backdrop-blur-2xl
border border-white/40 dark:border-white/10
shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)]
ml-0 lg:ml-6 xl:ml-10 overflow-hidden">

  {/* 🔥 INNER GLOW (IMPORTANT) */}
  <div className="absolute inset-0 rounded-2xl 
    bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 
    opacity-60 blur-2xl pointer-events-none" />
<div className="relative mb-8">

  {/* 🔥 LEFT BOUNCE POINTER */}
  <span
    className="
      absolute left-[-16px] top-1/2 -translate-y-1/2
      text-lg md:text-xl
      animate-bounce
    "
  >
    👇
  </span>

  {/* TEXT */}
  <h2
    className="
      text-2xl md:text-3xl
      whitespace-nowrap sm:whitespace-normal
      pl-3
    "
  >
    Drop your thoughts
  </h2>

</div>
{/* <h2 className="group text-2xl md:text-3xl mb-8 flex items-center gap-2 cursor-default">
  <span className="inline-block transition-all duration-300 group-hover:rotate-90 group-hover:animate-bounce">
    👉
  </span> 
  Drop your thoughts
</h2> */}
            <form onSubmit={submit} className="space-y-6">

  {/* 🔐 HONEYPOT (DO NOT TOUCH) */}
  <input
    type="text"
    name="company"
    className="hidden"
    autoComplete="off"
  />

              {/* NAME ROW */}
              <div className="grid md:grid-cols-2 gap-6">
                <FloatingInput
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* EMAIL */}
              <FloatingInput
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              {/* MESSAGE */}
              <FloatingTextarea
                label="Your Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-4"
              />

              {/* BUTTON */}
              
              <motion.button
  type="submit"
  whileTap={{ scale: 0.95 }}
  className={`
  relative group overflow-hidden
  w-full py-3 rounded-full
  bg-black text-white 
  dark:bg-white dark:text-black
  flex items-center justify-center gap-2
  ${status === "loading" ? "pointer-events-none opacity-80" : ""}
`}
>
  {/* 🔥 WIPE BACKGROUND */}
  <span
    className="
      absolute inset-0
      bg-white dark:bg-black
      scale-x-0 group-hover:scale-x-100
      origin-left transition-transform duration-500 ease-in-out
      z-0
    "
  />

  {/* 🔥 CONTENT */}
  <span className="relative z-10 flex items-center gap-2
    group-hover:text-black dark:group-hover:text-white transition-colors duration-500"
  >
    {status === "idle" && "Send Message →"}

    {status === "loading" && (
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Sending...
      </motion.span>
    )}

    {status === "sent" && (
      <motion.span
        className="flex items-center gap-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        Sent
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      </motion.span>
    )}
    {status === "error" && "Failed ❌"}
    
    </span>
</motion.button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= FLOATING INPUT ================= */
function FloatingInput({ label, name, value, onChange }: any) {
  const isFilled = value && value.length > 0;

  return (
    <div className="relative group">

<input
  name={name}
  value={value}
  onChange={onChange}
  required
  className="
    peer w-full pt-6 pb-2 
    border-b border-gray-300 dark:border-gray-700 
    bg-transparent outline-none 
    text-black dark:text-white
    placeholder-transparent
    transition-all duration-300
  "
/>
      {/* Underline */}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 
        bg-black dark:bg-white transition-all duration-300 
        peer-focus:w-full"
      />

      {/* ✅ FIXED LABEL */}
      <label
        className={`
          absolute left-0 transition-all pointer-events-none
          ${isFilled ? "top-0 text-sm" : "top-5 text-base"}
          peer-focus:top-0 peer-focus:text-sm
          text-gray-400
        `}
      >
        {label}
      </label>
    </div>
  );
}

/* ================= FLOATING TEXTAREA ================= */
function FloatingTextarea({ label, name, value, onChange }: any) {
  const isFilled = value && value.length > 0;

  return (
    <div
      className="
        relative group
        mt-8
        transition-all duration-300
      "
    >
   <label
  className={`
    absolute left-0 transition-all duration-300 pointer-events-none
    text-gray-400
    
    ${isFilled 
      ? "-top-4 text-sm" 
      : "top-2 text-base"
    }

    group-focus-within:-top-2
    group-focus-within:text-sm
  `}
>
  {label}
</label>

  <textarea
  name={name}
  value={value}
  onChange={onChange}
  required
  rows={5}
  className="
    peer w-full pt-8 pb-4
    border-b border-gray-300 dark:border-gray-700
    bg-transparent outline-none resize-none
    text-black dark:text-white
    placeholder-transparent
    overflow-y-auto scrollbar-hide
    transition-all duration-300
  "
/>

      <span
        className="
          absolute bottom-0 left-0 h-[2px] w-0
          bg-black dark:bg-white
          transition-all duration-300
          group-focus-within:w-full
        "
      />
    </div>
  );
}