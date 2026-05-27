import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { text: "The integration of physical combat and cognitive puzzles completely rewired my reaction time.", name: "SARAH CONNOR", rank: "Black Belt" },
  { text: "Mahesh Sensei doesn't just teach you how to fight; he teaches you how to think five moves ahead.", name: "JOHN WICK", rank: "Tactical Specialist" },
  { text: "Stick rotation improved my ambidexterity, which directly translated to my chess endgame speed.", name: "BETH HARMON", rank: "Grandmaster" }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full bg-neonOrange/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-24">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-black font-cyber text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 tracking-tighter uppercase"
          >
            DATA LOGS
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="group relative p-8 md:p-10 rounded-[2rem] border border-white/5 hover:border-neonOrange/30 bg-gradient-to-br from-[#0c0c0d] to-[#040404] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] flex flex-col justify-between transition-all duration-500 overflow-hidden"
            >
              {/* Soft Ambient Glow Reflection Inside Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Glowing Ambient Corner Accent (Adds Color) */}
              <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-neonOrange/5 group-hover:bg-neonOrange/10 blur-xl transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Large Stylized Glowing Quote Mark */}
                <div className="text-6xl text-neonOrange/20 group-hover:text-neonOrange/40 font-serif leading-none transition-colors duration-500 select-none">
                  “
                </div>
                
                <p className="text-gray-300 italic text-sm md:text-base leading-relaxed relative z-10 font-light">
                  {t.text}
                </p>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-cyber font-black tracking-wider text-white text-sm group-hover:text-neonOrange transition-colors duration-500">
                    {t.name}
                  </div>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-cyber tracking-widest bg-neonOrange/10 border border-neonOrange/20 text-neonOrange uppercase font-bold shadow-[0_0_10px_rgba(212,175,55,0.05)]">
                    {t.rank}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
