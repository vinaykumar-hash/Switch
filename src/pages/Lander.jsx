import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Users, Palette, Github, Globe } from 'lucide-react';

function Lander() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-primary-dark overflow-x-hidden font-fustat text-white selection:bg-primary-tint selection:text-white group/container"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-tint/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center backdrop-blur-md bg-primary-dark/70 border-b border-white/5 transition-all duration-300">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight" onClick={() => navigate('/')}>Switch</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors">Features</a>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-full bg-white text-primary-dark font-bold text-sm hover:scale-105 transition-transform"
          >
            Log in
          </button>
        </div>
      </nav>

      <section className="relative z-10 pt-40 pb-20 px-4 text-center max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-primary-tint">
              <Sparkles className="w-3 h-3" />
              <span>AI Powered Fashion Engine</span>
            </span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Without</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-tint to-orange-400">Limits.</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="max-w-2xl text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light">
            Generate 1000+ clothes with different art styles in seconds.
            Professional grade AI generation for the modern creative.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => navigate('/login')}
              className="group px-8 py-4 bg-white text-primary-dark rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2"
            >
              Start Generating
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-white/40 mt-2 sm:mt-0 px-4">No credit card required</p>
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to create</h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Standard compliant, artistically boundless, and community driven.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-primary-tint" />}
            title="State of the Art"
            desc="Powered by Nano Banana's latest diffusion models for hyper-realistic fabric textures and lighting."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-blue-400" />}
            title="Community First"
            desc="Remix designs from thousands of creators. Share your presets and grow your influence."
          />
          <FeatureCard
            icon={<Palette className="w-6 h-6 text-purple-400" />}
            title="20+ Art Styles"
            desc="From Cyberpunk to Renaissance, switch aesthetics instantly with our curated preset library."
          />
        </div>
      </section>

      <footer className="relative z-10 pt-32 pb-12 px-6 border-t border-white/10 bg-black/20 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-jolly text-3xl mb-4">Switch</h4>
            <p className="text-white/50 text-sm max-w-xs">Empowering the next generation of digital fashion designers with AI-driven tools.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-white">Product</h5>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="hover:text-white cursor-pointer transition-colors">Features</li>
              <li className="hover:text-white cursor-pointer transition-colors">Showcase</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-white">Author</h5>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a
                  href="https://www.vinaychoudhary.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vinaykumar-hash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© 2025 Switch AI Inc. All rights reserved.</p>
          <p>Made with 🧡 by <a href="https://www.vinaychoudhary.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Vinay</a></p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  let maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative p-8 rounded-3xl bg-white/5 border border-white/10 group overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-tint/50 to-purple-500/50 opacity-20" />
      </motion.div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/60 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default Lander;