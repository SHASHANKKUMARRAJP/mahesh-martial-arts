import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { label: 'STUDENTS TRAINED', value: 5420 },
  { label: 'TOURNAMENTS WON', value: 128 },
  { label: 'CHESS GRANDMASTERS', value: 12 },
  { label: 'YEARS ACTIVE', value: 15 }
];

export default function Achievements() {
  return (
    <section className="py-20 bg-black border-y border-white/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.15)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl md:text-6xl font-cyber font-bold text-neonOrange text-glow mb-2">
                <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                <span className="text-white">+</span>
              </div>
              <div className="text-gray-400 font-cyber tracking-widest text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
