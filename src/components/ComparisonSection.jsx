
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <section className="relative z-10 py-12 px-4 max-w-5xl mx-auto overflow-hidden w-full">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-10">
                <span className="text-red-500 font-mono text-[10px] tracking-[0.2em] mb-2">/// COMPARISON</span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter"
                >
                    The Switch <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Difference</span>
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative">

                {/* Standard Side */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative bg-[#0A0A0A] border border-white/5 p-6 flex flex-col h-full transition-colors duration-300"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <X className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-sm font-mono text-white/60 mb-6 uppercase tracking-widest">Nano banana</h3>

                    <div className="space-y-4 border-t border-white/5 pt-4">
                        <div className="flex justify-between items-center text-xs text-white/40">
                            <span>Prompt Complexity</span>
                            <span className="text-red-500">High</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[90%] bg-red-900/50" />
                        </div>

                        <div className="flex justify-between items-center text-xs text-white/40 mt-2">
                            <span>Style Consistency</span>
                            <span className="text-red-500">Low</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[30%] bg-red-900/50" />
                        </div>
                    </div>
                </motion.div>

                {/* Switch Side */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group relative bg-[#0A0A0A] border border-red-500/30 p-6 flex flex-col h-full shadow-[0_0_20px_-10px_rgba(239,68,68,0.1)] transition-colors duration-300"
                >
                    {/* Glowing Corner */}
                    <div className="absolute -top-[1px] -right-[1px] w-12 h-12 overflow-hidden">
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 shadow-[0_0_8px_orange]" />
                        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-red-500 to-transparent" />
                        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-red-500 to-transparent" />
                    </div>

                    <div className="absolute top-0 right-0 p-4 opacity-100">
                        <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>

                    <h3 className="text-sm font-mono text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                        WITH SWITCH
                        <span className="px-1.5 py-0.5 text-[0.5rem] bg-red-500/20 text-red-500 border border-red-500/30 rounded">PRO</span>
                    </h3>

                    <div className="space-y-4 border-t border-white/5 pt-4">
                        <div className="flex justify-between items-center text-xs text-white/80">
                            <span>Prompt Complexity</span>
                            <span className="text-green-400">Zero</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[10%] bg-gradient-to-r from-green-500 to-green-400" />
                        </div>

                        <div className="flex justify-between items-center text-xs text-white/80 mt-2">
                            <span>Style Consistency</span>
                            <span className="text-white">Perfect</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-red-600 to-orange-500" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ComparisonSection;

