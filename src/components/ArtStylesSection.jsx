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
        <section className="relative z-10 py-32 overflow-hidden border-t border-white/10 bg-black">
            <div className="flex flex-col items-center text-center mb-20 px-4">
                <span className="text-white/40 font-mono text-xs tracking-[0.2em] mb-4 uppercase">Capabilities</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Precision Across <br />
                    <span className="text-[var(--color-primary-tint)]">Every Style.</span>
                </h2>
            </div>

            <div className="relative w-full flex">
                <motion.div
                    className="flex gap-4 px-4"
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
                            className="relative w-64 h-80 md:w-80 md:h-[30rem] flex-shrink-0 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-[#050505]"
                        >
                            <img
                                src={style.img}
                                alt={style.name}
                                className="w-full h-full object-cover opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-sm font-bold text-white tracking-widest uppercase">{style.name}</h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ArtStylesSection;
