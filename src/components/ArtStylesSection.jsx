import React from 'react';
import { motion } from 'framer-motion';

import cyberpunk from '../assets/styles/cyberpunk.png';
import anime from '../assets/styles/anime.png';
import ghibli from '../assets/styles/ghibli.png';
import sixteenBit from '../assets/styles/16bit.png';
import gameboy from '../assets/styles/gameboy.png';
import glitch from '../assets/styles/glitch.png';
import hologram from '../assets/styles/hologram.png';
import impressionism from '../assets/styles/impressionism.png';
import inksketch from '../assets/styles/inksketch.png';

const styles = [
    { name: 'Cyberpunk', img: cyberpunk },
    { name: 'Anime', img: anime },
    { name: 'Studio Ghibli', img: ghibli },
    { name: '16-Bit', img: sixteenBit },
    { name: 'Gameboy', img: gameboy },
    // { name: 'Glitch', img: glitch },
    // { name: 'Hologram', img: hologram },
    { name: 'Impressionism', img: impressionism },
    { name: 'Inksketch', img: inksketch },
];

// Duplicate the styles list to create a seamless loop
const marqueeItems = [...styles, ...styles, ...styles, ...styles];

const ArtStylesSection = () => {
    return (
        <section className="relative z-10 py-20 overflow-hidden border-t border-white/10 bg-black">
            <div className="flex flex-col items-start text-left md:items-center md:text-center mb-12 px-4">
                <span className="text-red-500 font-mono text-[10px] tracking-[0.2em] mb-2">/// GENRES</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
                    Precision across <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">every style</span>
                </h2>
            </div>

            <div className="relative w-full flex">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 50,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    style={{ width: "max-content" }}
                >
                    {marqueeItems.map((style, index) => (
                        <div
                            key={index}
                            className="relative w-64 h-80 md:w-80 md:h-96 flex-shrink-0 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 group border border-white/10 hover:border-red-500/50"
                        >
                            <img
                                src={style.img}
                                alt={style.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute bottom-6 left-6">
                                <span className="text-red-500 font-mono text-xs tracking-widest uppercase block mb-1">Style Preset</span>
                                <h3 className="text-xl font-bold text-white tracking-wide">{style.name}</h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ArtStylesSection;
