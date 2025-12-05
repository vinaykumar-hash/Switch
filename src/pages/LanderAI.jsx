/* eslint-disable */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ImageIcon, Wand2 } from "lucide-react";

const exampleImages = [
  "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function LanderAI() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % exampleImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col overflow-hidden font-fustat relative cursor-none">
      <motion.div
        className="w-8 h-8 border-2 border-white rounded-full fixed top-0 left-0 pointer-events-none z-50 backdrop-blur-sm"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <PencilScribbles />

      {/* Background Grid */}
      <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/10 z-10">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-bg-primary-tint">S</span>witch
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl text-white font-semibold hover:text-bg-primary-tint transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-white hover:bg-primary-tint text-black font-semibold  transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-8 mt-20 lg:mt-28 gap-10 z-10">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center max-w-3xl"
        >
          <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Generate Clothes.
            <span className="block text-bg-primary-tint ">Try Them Instantly.</span>
          </h2>

          <p className="text-white/70 mt-6 text-lg max-w-2xl">
            Switch uses state-of-the-art <span className="text-bg-primary-tint font-semibold">Nano Banana AI</span>
            to generate outfits, dress any person in custom clothes, and apply
            powerful art-style modifiers — ultra-realistic and instant.
          </p>

          <div className="mt-8 flex justify-center gap-4">
          </div>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center mt-8 lg:mt-0"
        > 
          <div className="relative w-[320px] h-[420px] flex items-center justify-center">
            {exampleImages.map((src, index) => {
              const offset = (index - currentImage + exampleImages.length) % exampleImages.length;
              let zIndex = 0;
              let scale = 0.6;
              let opacity = 0.4;
              let x = "0%";

              if (offset === 0) { // Center image
                zIndex = 3;
                scale = 1;
                opacity = 1;
                x = "0%";
              } else if (offset === 1) { // Right image
                zIndex = 2;
                scale = 0.8;
                x = "60%";
              } else if (offset === exampleImages.length - 1) { // Left image
                zIndex = 1;
                scale = 0.8;
                x = "-60%";
              }

              return (
              <motion.img
                key={src}
                src={src}
                alt="AI Generated Fashion"
                className="absolute w-[280px] h-[380px] object-cover rounded-2xl shadow-2xl border border-white/10"
                animate={{ x, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            )})}
          </div>

          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-bg-primary-tint/20 blur-3xl rounded-full"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -top-10 -right-10 w-52 h-52 bg-bg-primary-tint/10 blur-3xl rounded-full"
          ></motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mt-32 px-8 lg:px-20 pb-20 z-10">
        <h3 className="text-3xl font-bold mb-10 text-center">
          Why <span className="text-bg-primary-tint">Switch</span>?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap size={24} />}
            title="AI Clothes Generator"
            description="Generate unique, hyper-realistic clothing styles with cutting-edge Nano Banana models."
            delay={0}
          />
          <FeatureCard
            icon={<ImageIcon size={24} />}
            title="Try-On Engine"
            description="Upload any image and instantly apply the generated outfit with perfect lighting & fit."
            delay={0.2}
          />
          <FeatureCard
            icon={<Wand2 size={24} />}
            title="Art-Style Modifier"
            description="Add cinematic, retro, anime, 8-bit, or any custom art-style overlay in seconds."
            delay={0.4}
          />
        </div>
      </section>

      {/* CREATOR SECTION */}
      <motion.section
        className="py-20 text-center z-10 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold mb-8">Meet the Creator</h3>
        <div className="flex flex-col items-center gap-4">
          <img 
            src="https://avatars.githubusercontent.com/u/101893095?v=4" 
            alt="Vinay" 
            className="w-24 h-24 rounded-full border-2 border-primary-tint"
          />
          <h4 className="text-2xl font-bold text-white">Vinay</h4>
          <div className="flex gap-6 mt-2">
            <a href="https://github.com/vinaykumar-hash" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-tint hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/vinaychoudhary7525" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-tint hover:underline">LinkedIn</a>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 py-8 text-center text-white/50 text-sm z-10">
        <p>© {new Date().getFullYear()} Switch — AI Fashion Generator</p>
      </footer>
    </div>
  );
}

const PencilScribbles = () => (
  <>
    {/* Wiggle line near hero title */}
    <motion.svg
      width="140"
      height="25"
      viewBox="0 0 140 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-48 left-1/4 opacity-20"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 0.2 }}
      transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
    >
      <motion.path
        d="M2 12.4082C13.5333 7.4082,29.9 -0.5918,43.5 6.4082C57.1 13.4082,64.5333 19.9082,78.5 16.4082C92.4667 12.9082,105.533 4.9082,118 10.4082"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
      />
    </motion.svg>

    {/* Scribble near features section */}
    <motion.div
      className="absolute bottom-1/4 right-40 opacity-15"
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 0.15 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 2 }}
    >
      <img src="https://www.svgrepo.com/show/530389/star.svg" alt="scribble" className="w-24 h-24 invert" />
    </motion.div>
  </>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, amount: 0.5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-bg-primary-tint/80 hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center"
  >
    <div className="w-12 h-12 mb-4 rounded-lg bg-bg-primary-tint/10 border border-bg-primary-tint/20 text-bg-primary-tint flex items-center justify-center">
      {icon}
    </div>
    <h4 className="text-xl font-semibold text-white">{title}</h4>
    <p className="text-white/60 mt-2">{description}</p>
  </motion.div>
);

export default LanderAI;