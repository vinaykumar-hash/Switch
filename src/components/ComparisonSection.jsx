import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <section className="relative z-10 py-24 px-4 max-w-6xl mx-auto overflow-hidden w-full">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-16">
                <span className="text-white/40 font-mono text-xs tracking-[0.2em] mb-4 uppercase">Difference</span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                >
                    Why <span className="text-[var(--color-primary-tint)]">Switch?</span>
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">

                {/* Standard Side */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group relative bg-black p-12 flex flex-col h-full"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <X className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-sm font-mono text-white/40 mb-8 uppercase tracking-widest">Nano banana</h3>

                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center text-xs text-white/40 mb-2 uppercase tracking-wider">
                                <span>Prompt Complexity</span>
                                <span className="text-red-500">High</span>
                            </div>
                            <div className="w-full h-px bg-white/10">
                                <div className="h-full w-[90%] bg-red-900/50" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center text-xs text-white/40 mb-2 uppercase tracking-wider">
                                <span>Style Consistency</span>
                                <span className="text-red-500">Low</span>
                            </div>
                            <div className="w-full h-px bg-white/10">
                                <div className="h-full w-[30%] bg-red-900/50" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Switch Side */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group relative bg-black p-12 flex flex-col h-full"
                >
                    <div className="absolute top-0 right-0 p-8">
                        <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <h3 className="text-sm font-mono text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                        Switch
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center text-xs text-white/60 mb-2 uppercase tracking-wider">
                                <span>Prompt Complexity</span>
                                <span className="text-white">Zero</span>
                            </div>
                            <div className="w-full h-px bg-white/10">
                                <div className="h-full w-[10%] bg-white" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center text-xs text-white/60 mb-2 uppercase tracking-wider">
                                <span>Style Consistency</span>
                                <span className="text-white">Perfect</span>
                            </div>
                            <div className="w-full h-px bg-white/10">
                                <div className="h-full w-full bg-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ComparisonSection;

