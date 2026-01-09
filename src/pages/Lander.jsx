import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Command, Zap, Globe, Hexagon } from 'lucide-react';
import ComparisonSection from '../components/ComparisonSection';
import GradualSpacing from '../components/GradualSpacing';
import Beams from '../components/Beams';
import ArtStylesSection from '../components/ArtStylesSection';
import dashboard from '../assets/dashboard.png';
import '../components/noise.css';

function Lander() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black font-fustat text-white overflow-x-hidden selection:bg-red-500/30 selection:text-red-200">

      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white/80 cursor-pointer" onClick={() => navigate('/')}>Switch</h1>
        <div className="hidden md:flex gap-6 text-xs font-mono text-white/60 uppercase tracking-wider">
          <button className="hover:text-white transition-colors flex items-center gap-2 group" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </nav>

      <section className="relative z-10 h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">

          <Beams />
        </div>




        <motion.h1
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[14vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 select-none z-20 mix-blend-screen text-center"
        >

          SWITCH
        </motion.h1>


        <div className="absolute bottom-10 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-xs md:text-sm text-red-500/80"
          >

          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => navigate('/login')}
            className="group relative px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all"
          >
            Get Started <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      <ComparisonSection />

      <ArtStylesSection />
      <section id="features" className="relative z-10 py-12 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          <div className="lg:col-span-1">
            <span className="text-red-500 font-mono text-xs tracking-[0.2em] block mb-4">/// CAPABILITIES</span>
            <h2 className="text-4xl font-bold mb-6">We build systems that lead.</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Powered by advanced diffusion models, Switch transforms simple inputs into production-ready assets.
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <FeatureCard
              icon={<Zap className="w-5 h-5 text-red-500" />}
              title="Energy"
              desc="High-speed generation pipeline optimized for real-time iteration."
            />
            <FeatureCard
              icon={<Hexagon className="w-5 h-5 text-red-500" />}
              title="Unlimited generations"
              desc="Create without limits. Iterate as many times as needed to perfect your vision."
            />
            <FeatureCard
              icon={<Command className="w-5 h-5 text-red-500" />}
              title="Consistancy"
              desc="Maintain perfect style coherence across entire collections and campaigns."
            />
            <FeatureCard
              icon={<Layers className="w-5 h-5 text-red-500" />}
              title="Auto Save"
              desc="Never lose progress. Every change is preserved instantly in the cloud."
            />
          </div>
        </div>
      </section>


      <footer className="relative z-10 bg-black pt-20 pb-10 border-t border-white/10 bg-noise">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 mb-32">
            <div>
              <span className="text-red-500 font-mono text-xs tracking-[0.2em] block mb-4">/// CONNECT</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Ready to start?</h2>
              <button onClick={() => navigate('/login')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded transition-colors">
                Get Started
              </button>
            </div>

            <div className="text-sm text-white/60">
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Socials</h4>
              <ul className="space-y-4">
                <li><a href="https://github.com/vinaykumar-hash" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors cursor-pointer">GitHub</a></li>
                <li><a href="https://www.instagram.com/vinay_kumar.0.0/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors cursor-pointer">Instagram</a></li>
                <li><a href="https://x.com/escapevinay" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors cursor-pointer">Twitter</a></li>
                <li><a href="https://www.linkedin.com/in/vinaychoudhary7525" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors cursor-pointer">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 text-[10px] uppercase tracking-widest text-white/30">
            <p>© 2025 Switch AI. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Designed by Vinay</span>
              <div className="w-2 h-2 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group bg-[#0A0A0A] p-10 hover:bg-[#0F0F0F] transition-colors relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">

      </div>
      <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </div>
  )
}



export default Lander;