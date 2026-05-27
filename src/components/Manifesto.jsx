import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);

  return (
    <section ref={containerRef} className="h-[250vh] bg-[#030303] relative z-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image that slowly scales */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="Manifesto Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
          <motion.div 
            style={{ opacity: textOpacity }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-cyber text-white leading-[0.9] uppercase text-center"
          >
            WE DO NOT <br/>
            JUST TEACH <span className="text-neonOrange">COMBAT.</span><br/>
            WE FORGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">MINDS</span><br/>
            THAT CANNOT BE <br/>
            <span className="italic text-gray-600">BROKEN.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
