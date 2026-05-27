import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timeline = [
  { phase: "01", title: "FOUNDATION", desc: "Basic stances, foundational yoga postures, and introductory chess mechanics. Establishing the unbreakable core." },
  { phase: "02", title: "ADAPTATION", desc: "Intermediate katas, stick rotation basics, and mid-game tactical planning. Learning to flow under pressure." },
  { phase: "03", title: "INTEGRATION", desc: "Advanced sparring, rapid Rubik's Cube solving, and fluid weapon transitions. Forging weaponized intelligence." },
  { phase: "04", title: "MASTERY", desc: "Complete weapon flow fluidity, grandmaster-level foresight, and absolute physical control. The apex of the system." }
];

export default function CurriculumTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-[#050505] relative z-10 overflow-hidden border-t border-white/5">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neonOrange/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 inline-block rounded-full border border-neonOrange bg-neonOrange text-black text-xs font-cyber font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            The Path
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-black font-cyber text-white tracking-tighter"
          >
            CURRICULUM
          </motion.h2>
        </div>

        <div className="relative pt-4 pb-4">
          {/* Subtle Base Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.05] md:-translate-x-1/2" />
          
          {/* Animated Glowing Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-neonOrange via-yellow-500 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.6)] md:-translate-x-1/2 z-0"
          />
          
          <div className="space-y-0">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} ${idx > 0 ? 'mt-6 md:-mt-20' : ''}`}>
                
                {/* Glowing Node */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute left-6 md:left-1/2 w-4 h-4 bg-neonOrange rounded-full -translate-x-[7px] md:-translate-x-1/2 ring-[8px] ring-[#000000] z-20 shadow-[0_0_15px_rgba(212,175,55,1)]"
                />
                
                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 60 }}
                  className={`pl-14 md:pl-0 w-full md:w-1/2 relative z-10 ${idx % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 text-left md:text-right'}`}
                >
                  {/* Background number */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${idx % 2 === 0 ? 'left-12' : 'right-12'} text-[120px] md:text-[160px] font-black font-cyber text-white/[0.02] pointer-events-none select-none z-0 tracking-tighter transition-all duration-500 hover:text-neonOrange/[0.05]`}>
                    {item.phase}
                  </div>
                  
                  <div className="group relative z-10 p-6 rounded-2xl bg-[#09090a]/95 backdrop-blur-[24px] border border-white/10 hover:border-neonOrange/40 hover:shadow-[0_0_35px_rgba(212,175,55,0.12)] transition-all duration-500 overflow-hidden">
                    {/* Subtle top gold accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neonOrange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Phase badge */}
                    <div className={`inline-block px-3 py-1 rounded-full bg-neonOrange/10 border border-neonOrange/25 mb-3 ${idx % 2 !== 0 ? 'md:float-right md:ml-3' : ''}`}>
                      <span className="text-neonOrange text-[10px] font-cyber font-bold tracking-[0.3em]">PHASE {item.phase}</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white font-cyber tracking-tight mb-3 leading-tight group-hover:text-neonOrange transition-colors duration-300 clear-both">{item.title}</h3>
                    <p className={`text-gray-400 font-light leading-relaxed text-sm md:text-base max-w-md group-hover:text-gray-300 transition-colors duration-300 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      {item.desc}
                    </p>

                    {/* Bottom corner glow */}
                    <div className={`absolute bottom-0 ${idx % 2 === 0 ? 'right-0' : 'left-0'} w-24 h-24 bg-neonOrange/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  </div>
                </motion.div>
                
                {/* Empty half for spacing */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
