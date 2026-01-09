import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export default function GradualSpacing({
    text,
    className = "",
    delayMultiple = 0.04,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="flex justify-center w-full">
            <AnimatePresence>
                {text.split("").map((char, i) => (
                    <motion.h1
                        key={i}
                        initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                                : { opacity: 0, x: -20, filter: "blur(10px)" }
                        }
                        transition={{ duration: 0.5, delay: i * delayMultiple }}
                        ref={ref}
                        className={`tracking-tighter ${className}`}
                    >
                        {char}
                    </motion.h1>
                ))}
            </AnimatePresence>
        </div>
    );
}
