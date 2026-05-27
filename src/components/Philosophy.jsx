import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="py-32 bg-[#000000] relative border-t border-white/5 z-10">
      {/* Dynamic Background Noise/Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vh] rounded-full bg-neonOrange/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-neonOrange/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 inline-block rounded-full border border-neonOrange bg-neonOrange text-black text-xs font-cyber font-bold tracking-[0.3em] uppercase mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Core Philosophy
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black font-cyber text-white tracking-tighter leading-[1.1] uppercase"
          >
            ELEVATE YOUR <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">MIND & BODY</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          
          {/* Physical Pillar */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative p-8 md:p-10 rounded-[2rem] border border-white/10 hover:border-neonOrange/30 bg-gradient-to-br from-[#0c0c0d] to-[#040404] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] transition-all duration-500 overflow-hidden"
          >
            {/* Soft Ambient Glow Reflection Inside Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Massive Faded Background Icon */}
            <div className="absolute -right-24 -bottom-24 text-neonOrange opacity-[0.015] group-hover:opacity-[0.05] group-hover:scale-105 transition-all duration-700 pointer-events-none">
              <Activity strokeWidth={1} size={300} />
            </div>
            
            <div className="relative z-10 flex gap-5 md:gap-6">
              {/* Left Side: Icon */}
              <div className="w-12 h-12 rounded-xl bg-neonOrange/5 border border-neonOrange/20 flex items-center justify-center text-neonOrange group-hover:scale-110 group-hover:bg-neonOrange/15 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.08)] shrink-0">
                <Activity size={20} className="group-hover:rotate-12 transition-transform duration-500" />
              </div>
              
              {/* Right Side: Title & Description */}
              <div className="flex-1 space-y-4">
                <h3 className="text-xl md:text-2xl font-black font-cyber text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-neonOrange group-hover:to-white tracking-wide leading-tight uppercase transition-all duration-500">
                  PHYSICAL CONDITIONING
                </h3>
                <p className="text-gray-300 leading-relaxed font-light text-xs md:text-sm">
                  True strength is not just muscular; it is <span className="text-neonOrange font-medium">kinetic intelligence</span>. Our advanced karate and stick rotation modules are designed to build an unbreakable physical foundation, hyper-responsive reflexes, and perfect spatial awareness.
                </p>
                
                {/* Decorative line that expands on hover */}
                <div className="h-[2px] w-12 bg-white/10 mt-4 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-neonOrange group-hover:to-transparent transition-all duration-700 ease-out" />
              </div>
            </div>
          </motion.div>

          {/* Cognitive Pillar */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="group relative p-8 md:p-10 rounded-[2rem] border border-white/10 hover:border-neonOrange/30 bg-gradient-to-br from-[#0c0c0d] to-[#040404] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] transition-all duration-500 overflow-hidden"
          >
            {/* Soft Ambient Glow Reflection Inside Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Massive Faded Background Icon */}
            <div className="absolute -right-24 -bottom-24 text-neonOrange opacity-[0.015] group-hover:opacity-[0.05] group-hover:scale-105 transition-all duration-700 pointer-events-none">
              <Brain strokeWidth={1} size={300} />
            </div>
            
            <div className="relative z-10 flex gap-5 md:gap-6">
              {/* Left Side: Icon */}
              <div className="w-12 h-12 rounded-xl bg-neonOrange/5 border border-neonOrange/20 flex items-center justify-center text-neonOrange group-hover:scale-110 group-hover:bg-neonOrange/15 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.08)] shrink-0">
                <Brain size={20} className="group-hover:-rotate-12 transition-transform duration-500" />
              </div>
              
              {/* Right Side: Title & Description */}
              <div className="flex-1 space-y-4">
                <h3 className="text-xl md:text-2xl font-black font-cyber text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-neonOrange group-hover:to-white tracking-wide leading-tight uppercase transition-all duration-500">
                  CHESS & MIND GAMES
                </h3>
                <p className="text-gray-300 leading-relaxed font-light text-xs md:text-sm">
                  A fighter without strategy is just a brawler. By integrating high-level <span className="text-neonOrange font-medium">chess strategy and tactics</span> into our training, we forge minds capable of seeing multiple steps ahead under intense pressure.
                </p>
                
                {/* Decorative line that expands on hover */}
                <div className="h-[2px] w-12 bg-white/10 mt-4 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-neonOrange group-hover:to-transparent transition-all duration-700 ease-out" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
