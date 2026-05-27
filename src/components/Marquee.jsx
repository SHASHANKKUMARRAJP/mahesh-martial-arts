import React from 'react';
import { motion } from 'framer-motion';

export default function Marquee() {
  return (
    <div className="w-full bg-neonOrange py-6 overflow-hidden flex items-center transform -rotate-3 scale-110 relative z-30 shadow-[0_0_50px_rgba(212,175,55,0.4)] my-20">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-black font-cyber font-black text-5xl md:text-7xl mx-8 uppercase tracking-tighter mix-blend-exclusion text-white">
            MASTER MIND <span className="text-transparent" style={{WebkitTextStroke: '2px black'}}>•</span> MASTER BODY <span className="text-transparent" style={{WebkitTextStroke: '2px black'}}>•</span> DEFY GRAVITY <span className="text-transparent" style={{WebkitTextStroke: '2px black'}}>•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
