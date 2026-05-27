import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const stats = [
  { value: 15, suffix: '+', label: 'YEARS DISCIPLINE' },
  { value: 500, suffix: '+', label: 'STUDENTS FORGED' },
  { value: 2000, suffix: ' ELO', label: 'CHESS RATING' },
  { value: 8, suffix: 'TH DAN', label: 'KARATE MASTERY' },
];

export default function Metrics() {
  return (
    <section className="py-32 bg-[#030303] relative z-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="flex flex-col items-center lg:items-start border-l border-neonOrange/30 pl-8 group"
            >
              <div className="text-6xl md:text-8xl font-black font-cyber text-white mb-2 tracking-tighter group-hover:scale-110 origin-left transition-transform duration-500">
                <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                <span className="text-neonOrange text-4xl md:text-6xl align-top">{stat.suffix}</span>
              </div>
              <div className="text-gray-500 font-cyber tracking-[0.3em] text-sm uppercase group-hover:text-white transition-colors duration-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
