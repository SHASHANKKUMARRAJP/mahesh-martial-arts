import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap } from 'lucide-react';

const cards = [
  {
    id: '01',
    icon: <Shield className="w-8 h-8 text-neonOrange" />,
    title: 'PHYSICAL MASTERY',
    desc: 'Advanced biomechanics and traditional karate conditioning to build an unbreakable physical foundation.',
    color: 'from-orange-600 to-amber-500',
    hoverBorder: 'hover:border-neonOrange/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]',
    textGlow: 'group-hover:from-neonOrange group-hover:to-amber-400',
    borderColor: 'border-neonOrange',
    iconBorder: 'border-neonOrange/20 bg-neonOrange/5 group-hover:border-neonOrange/50 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]'
  },
  {
    id: '02',
    icon: <Brain className="w-8 h-8 text-emerald-400" />,
    title: 'CHESS & MIND GAMES',
    desc: 'Chess integrations to enhance tactical thinking, foresight, and problem-solving under pressure.',
    color: 'from-emerald-600 to-teal-500',
    hoverBorder: 'hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]',
    textGlow: 'group-hover:from-emerald-400 group-hover:to-teal-300',
    borderColor: 'border-emerald-500',
    iconBorder: 'border-emerald-500/20 bg-emerald-500/5 group-hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]'
  },
  {
    id: '03',
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    title: 'STICK ROTATION FLOW',
    desc: 'Stick rotation and weapon handling to develop spatial awareness, rhythm, and fluid adaptability.',
    color: 'from-purple-600 to-cyan-500',
    hoverBorder: 'hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]',
    textGlow: 'group-hover:from-purple-400 group-hover:to-cyan-300',
    borderColor: 'border-purple-500',
    iconBorder: 'border-purple-500/20 bg-purple-500/5 group-hover:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]'
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-6 py-2 inline-block rounded-full border border-neonOrange bg-neonOrange text-black text-xs font-cyber font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            THE ACADEMY
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold font-cyber"
          >
            EVOLVE BEYOND LIMITS
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden p-8 rounded-3xl cursor-pointer group shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 bg-white/[0.02] backdrop-blur-[24px] ${card.hoverBorder}`}
            >
              {/* Dynamic Accent Color Glow Backdrop */}
              <div className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-gradient-to-tr ${card.color} opacity-20 blur-[60px] pointer-events-none group-hover:opacity-45 group-hover:scale-125 transition-all duration-700`} />

              {/* Glowing Top Corner ID Bar */}
              <div className="absolute top-0 right-0 w-24 h-[2px] bg-gradient-to-l from-white/10 to-transparent group-hover:from-white/30 transition-all duration-500" />
              
              {/* Colored Circular Icon Container */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${card.iconBorder}`}>
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
              </div>

              {/* Vibrant Heading transitioning to Color Gradient on Hover */}
              <h4 className="text-xl font-cyber font-bold mb-3 tracking-wider text-white transition-colors duration-300">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r from-white to-white ${card.textGlow} transition-all duration-300`}>
                  {card.title}
                </span>
              </h4>

              {/* Interactive Paragraph with Left Highlight Accent Bar */}
              <p className={`text-gray-400 leading-relaxed font-light text-sm transition-all duration-300 group-hover:text-gray-300 border-l border-white/5 group-hover:border-l-2 ${card.borderColor} pl-4 mt-4`}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
