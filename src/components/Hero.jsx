import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const backgroundX = useTransform(smoothX, [0, window.innerWidth], ['-10%', '10%']);
  const backgroundY = useTransform(smoothY, [0, window.innerHeight], ['-10%', '10%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000000] z-10 pt-20">
      
      {/* Static Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Hero Background" 
        />
        <div className="absolute inset-0 bg-[#000000]/60" />
      </div>

      {/* Floating Interactive Light Orb */}
      <motion.div 
        style={{ 
          x: useTransform(smoothX, [0, window.innerWidth], [-200, 200]),
          y: useTransform(smoothY, [0, window.innerHeight], [-200, 200]),
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonOrange/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-10"
      >

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black font-cyber tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          MASTERY OVER <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 text-glow">MIND & BODY</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl font-light leading-relaxed"
        >
          A sanctuary for elite physical conditioning and cognitive excellence. Discover a new standard of training.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="#join" 
            className="px-10 py-4 bg-gradient-to-r from-neonOrange to-yellow-600 text-black font-cyber font-bold tracking-widest rounded-full transition-all duration-300 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            BEGIN JOURNEY
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#gallery" 
            className="px-10 py-4 border border-neonOrange/50 bg-neonOrange/10 text-neonOrange font-cyber font-bold tracking-widest rounded-full hover:bg-neonOrange hover:text-black transition-all duration-300 text-center shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
          >
            VIEW GALLERY
          </motion.a>
        </motion.div>
      </motion.div>

    </section>
  );
}
