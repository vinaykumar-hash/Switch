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
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

function Lander() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black font-fustat text-white overflow-x-hidden selection:bg-red-500/30 selection:text-red-200">

      <Navbar />
      <Hero />

      <ComparisonSection />

      <ArtStylesSection />
      <section id="features" className="relative z-10 py-32 px-4 max-w-7xl mx-auto border-t border-white/10 bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          <div className="lg:col-span-1">
            <span className="text-white/40 font-mono text-xs tracking-[0.2em] block mb-4 uppercase">Technology</span>
            <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">Systems that <br /><span className="text-[var(--color-primary-tint)]">Lead.</span></h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Powered by advanced diffusion models, Switch transforms simple inputs into production-ready assets.
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            <FeatureCard
              icon={<Zap className="w-5 h-5 text-white" />}
              title="Energy"
              desc="High-speed generation pipeline optimized for real-time iteration."
            />
            <FeatureCard
              icon={<Hexagon className="w-5 h-5 text-white" />}
              title="Unlimited generations"
              desc="Create without limits. Iterate as many times as needed to perfect your vision."
            />
            <FeatureCard
              icon={<Command className="w-5 h-5 text-white" />}
              title="Consistency"
              desc="Maintain perfect style coherence across entire collections and campaigns."
            />
            <FeatureCard
              icon={<Layers className="w-5 h-5 text-white" />}
              title="Auto Save"
              desc="Never lose progress. Every change is preserved instantly in the cloud."
            />
          </div>
        </div>
      </section>


      <footer className="relative z-10 bg-black pt-32 pb-10 border-t border-white/10 bg-noise">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 mb-32">
            <div>
              <span className="text-white/40 font-mono text-xs tracking-[0.2em] block mb-4 uppercase">Start Now</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[var(--color-primary-tint)]">Ready?</h2>
              <button
                onClick={() => navigate('/login')}
                className="group flex items-center gap-2 text-sm text-white border-b border-white pb-1 hover:text-white/80 hover:border-white/80 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10 md:gap-20 text-sm text-white/40">
              <div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Socials</h4>
                <ul className="space-y-4">
                  <li><a href="https://github.com/vinaykumar-hash" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">GitHub</a></li>
                  <li><a href="https://www.instagram.com/vinay_kumar.0.0/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Instagram</a></li>
                  <li><a href="https://x.com/escapevinay" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Twitter</a></li>
                  <li><a href="https://www.linkedin.com/in/vinaychoudhary7525" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">LinkedIn</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Legal</h4>
                <ul className="space-y-4">
                  <li><a href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                  <li><a href="/terms-of-usage" className="hover:text-white transition-colors cursor-pointer">Terms of Usage</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 text-[10px] uppercase tracking-widest text-white/20">
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
    <div className="group bg-black p-12 hover:bg-[#050505] transition-colors relative overflow-hidden">
      <div className="mb-8 opacity-100 group-hover:scale-110 transition-transform duration-500 origin-left">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-4 text-white tracking-tight">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed max-w-xs">{desc}</p>
    </div>
  )
}



export default Lander;