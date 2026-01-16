import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SwitchLogo from '../assets/logo/Switch.png';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative z-10 h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden bg-black text-white selection:bg-white/20">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
            >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#E5E5E5] flex items-center justify-center overflow-hidden">
                    <img src={SwitchLogo} alt="Switch Logo" className="w-full h-full object-cover" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center z-20"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                    <span className="text-white/60">Re-imagine </span>
                    <span className="text-white">Yourself</span>
                    <br />
                    <span className="text-white">In Everyway </span>
                    <span className="text-white/60">Possible.</span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-12"
            >
                <button
                    onClick={() => navigate('/login')}
                    className="group flex items-center gap-2 text-sm text-primary-tint hover:text-white transition-colors cursor-pointer"
                >
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>

        </section>
    );
};

export default Hero;
