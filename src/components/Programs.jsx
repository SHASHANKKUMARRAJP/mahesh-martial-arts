import React from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

export const programs = [
  { 
    id: '01', 
    name: 'ADVANCED KARATE', 
    desc: 'Lethal strikes and impenetrable defense.', 
    img: '/advanced_karate.png',
    color: 'from-red-600 to-orange-500',
    hoverClass: 'hover:border-red-500/40 hover:shadow-[0_0_50px_rgba(239,68,68,0.25)]',
    textGlow: 'group-hover:from-red-500 group-hover:to-red-500/20',
    textColor: 'text-red-400',
    borderColor: 'border-red-500',
    arrowGlow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)] border-red-500/30'
  },
  { 
    id: '02', 
    name: 'YOGA & MOBILITY', 
    desc: 'Absolute physical control and breath mastery.', 
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    color: 'from-cyan-600 to-blue-500',
    hoverClass: 'hover:border-cyan-500/40 hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]',
    textGlow: 'group-hover:from-cyan-500 group-hover:to-cyan-500/20',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    arrowGlow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)] border-cyan-500/30'
  },
  { 
    id: '03', 
    name: 'STICK ROTATION', 
    desc: 'Momentum, balance, and fluid combat.', 
    img: '/stick_rotation.png',
    color: 'from-purple-600 to-indigo-500',
    hoverClass: 'hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]',
    textGlow: 'group-hover:from-purple-500 group-hover:to-purple-500/20',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500',
    arrowGlow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)] border-purple-500/30'
  },
  { 
    id: '04', 
    name: 'CHESS TACTICS', 
    desc: 'Anticipate moves. Control the board.', 
    img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800',
    color: 'from-emerald-600 to-teal-500',
    hoverClass: 'hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.25)]',
    textGlow: 'group-hover:from-emerald-500 group-hover:to-emerald-500/20',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500',
    arrowGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/30'
  },
  { 
    id: '05', 
    name: "RUBIK'S CUBE", 
    desc: 'Spatial intelligence and rapid problem solving.', 
    img: '/rubiks_cube.png',
    color: 'from-pink-600 to-rose-500',
    hoverClass: 'hover:border-pink-500/40 hover:shadow-[0_0_50px_rgba(244,63,94,0.25)]',
    textGlow: 'group-hover:from-pink-500 group-hover:to-pink-500/20',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-500',
    arrowGlow: 'shadow-[0_0_20px_rgba(244,63,94,0.3)] border-pink-500/30'
  },
];

export const scheduleDetails = [
  {
    id: '01',
    name: 'ADVANCED KARATE',
    days: 'Mon, Wed, Fri',
    time: '05:30 PM - 07:00 PM',
    age: '6+ Years (Kids & Adults)',
    level: 'Beginner to Black Belt',
    trainer: 'Mahesh Sensei',
    focus: 'Traditional Kata, Sparring, Kinetic Force, Defensive Reflexes',
    syllabus: [
      'Foundational stances (Dachi) & high block combinations',
      'High-impact linear striking and defensive kicking blocks',
      'Advanced Kata alignment and physical power distribution',
      'Full-contact self-defense tactics under high energy sparring'
    ]
  },
  {
    id: '02',
    name: 'YOGA & MOBILITY',
    days: 'Tue, Thu',
    time: '06:00 AM - 07:15 AM',
    age: 'All Ages (No limit)',
    level: 'Beginner to Intermediate',
    trainer: 'Mahesh Sensei',
    focus: 'Breath Control (Pranayama), Dynamic Mobility, Joint Alignment, Core Strength',
    syllabus: [
      'Dynamic flow sequences for overall muscle flexibility',
      'Spinal decompression and shoulder-hip stabilizer poses',
      'Pranayama breath control to hyper-focus the mental state',
      'Restorative deep stretching and tension releasing techniques'
    ]
  },
  {
    id: '03',
    name: 'STICK ROTATION',
    days: 'Sat, Sun',
    time: '04:00 PM - 05:30 PM',
    age: '10+ Years (Teens & Adults)',
    level: 'Beginner to Intermediate',
    trainer: 'Mahesh Sensei',
    focus: 'Weapon momentum flow, Hand-Eye Coordination, Spatial Reflexes',
    syllabus: [
      'Single & double stick balance hold & wrist rotation angles',
      'Continuous circular rotations (figure-eights) & plane control',
      'Dynamic weapon transitions and speed swinging patterns',
      'Reflex combative combos utilizing strikes and guards'
    ]
  },
  {
    id: '04',
    name: 'CHESS TACTICS',
    days: 'Wed, Sat',
    time: '04:00 PM - 05:00 PM',
    age: '6+ Years (Kids & Teens)',
    level: 'Beginner to Intermediate',
    trainer: 'Mahesh Sensei',
    focus: 'Strategic Foresight, Mid-Game Tactics, Cognitive Patterns, Focus',
    syllabus: [
      'Essential opening layouts, pawn structures, & king protection',
      'Tactical combinations (forks, pins, double attacks, skewers)',
      'Calculated endgame theories & rapid checkmating algorithms',
      'Spatial visualization exercises & game speed-clock management'
    ]
  },
  {
    id: '05',
    name: "RUBIK'S CUBE",
    days: 'Tue, Thu',
    time: '05:00 PM - 06:00 PM',
    age: '5+ Years (Kids & Teens)',
    level: 'Beginner to Speed-solving',
    trainer: 'Mahesh Sensei',
    focus: 'Pattern recognition, Algorithmic Memorization, Fine-motor Control',
    syllabus: [
      'Layer-by-Layer solving architecture (Beginner CFOP method)',
      'F2L (First Two Layers) speed solving finger movements',
      'OLL and PLL pattern memorization formulas',
      'Blindfold solve theories & internal cube mechanical timing'
    ]
  }
];

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/* Available class options for the dropdown when adding a class to the grid */
export const availableClasses = [
  { id: '01', name: 'ADVANCED KARATE', tag: 'KARATE' },
  { id: '02', name: 'YOGA & MOBILITY', tag: 'YOGA' },
  { id: '03', name: 'STICK ROTATION', tag: 'STICK' },
  { id: '04', name: 'CHESS TACTICS', tag: 'CHESS' },
  { id: '05', name: "RUBIK'S CUBE", tag: 'CUBE' },
];

export const defaultWeekSchedule = [
  {
    time: '06:00 AM - 07:15 AM',
    classes: {
      Tuesday: { name: 'YOGA & MOBILITY', id: '02', tag: 'YOGA' },
      Thursday: { name: 'YOGA & MOBILITY', id: '02', tag: 'YOGA' }
    }
  },
  {
    time: '04:00 PM - 05:00 PM',
    classes: {
      Wednesday: { name: 'CHESS TACTICS', id: '04', tag: 'CHESS' },
      Saturday: { name: 'CHESS TACTICS', id: '04', tag: 'CHESS' }
    }
  },
  {
    time: '04:00 PM - 05:30 PM',
    classes: {
      Saturday: { name: 'STICK ROTATION', id: '03', tag: 'STICK' },
      Sunday: { name: 'STICK ROTATION', id: '03', tag: 'STICK' }
    }
  },
  {
    time: '05:00 PM - 06:00 PM',
    classes: {
      Tuesday: { name: "RUBIK'S CUBE", id: '05', tag: 'CUBE' },
      Thursday: { name: "RUBIK'S CUBE", id: '05', tag: 'CUBE' }
    }
  },
  {
    time: '05:30 PM - 07:00 PM',
    classes: {
      Monday: { name: 'ADVANCED KARATE', id: '01', tag: 'KARATE' },
      Wednesday: { name: 'ADVANCED KARATE', id: '01', tag: 'KARATE' },
      Friday: { name: 'ADVANCED KARATE', id: '01', tag: 'KARATE' }
    }
  }
];

const STORAGE_KEY = 'mma-dojo-weekly-schedule';

function ProgramCard({ prog }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    mouseX.set(mx);
    mouseY.set(my);
    x.set(mx / rect.width - 0.5);
    y.set(my / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[285px] rounded-3xl overflow-hidden cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 ${prog.hoverClass}`}
    >
      {/* Glare Effect Overlay */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
        style={{ background: glareBackground }}
      />
 
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={prog.img} 
          alt={prog.name} 
          className={`w-full h-full transform transition-all duration-1000 ease-out ${
            prog.img.includes('advanced_karate') 
              ? 'object-contain bg-[#fcfaf2] p-4 scale-100 group-hover:scale-[1.05]' 
              : 'object-cover scale-110 group-hover:scale-[1.15]'
          }`}
          onError={(e) => {
            if (e.target.src.includes('maxresdefault.jpg')) {
              e.target.src = 'https://img.youtube.com/vi/FqS71K4uT1g/hqdefault.jpg';
            } else {
              e.target.src = 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800';
            }
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent transition-opacity duration-500 ${
          prog.img.includes('advanced_karate') ? 'opacity-45 group-hover:opacity-35' : 'opacity-90 group-hover:opacity-70'
        }`} />
      </div>

      {/* Dynamic Ambient Color Glow Backdrop */}
      <div className={`absolute -right-20 -bottom-20 w-44 h-44 rounded-full bg-gradient-to-tr ${prog.color} opacity-40 blur-[80px] pointer-events-none group-hover:opacity-75 group-hover:scale-125 transition-all duration-700`} />
      
      {/* Content Layer with 3D Pop (translateZ creates true parallax) */}
      <motion.div 
        style={{ translateZ: 80 }}
        className="relative z-10 p-5 h-full flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <span className={`text-4xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 ${prog.textGlow} transition-all duration-500`}>
            {prog.id}
          </span>
          <div className={`w-9 h-9 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 border ${prog.arrowGlow}`}>
            <span className={`${prog.textColor} text-base`}>&rarr;</span>
          </div>
        </div>
 
        <div className="bg-white/[0.02] backdrop-blur-[24px] border border-white/10 p-3.5 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl rounded-2xl">
          <h4 className={`text-lg md:text-xl font-cyber font-bold mb-0 tracking-wider text-white uppercase group-hover:${prog.textColor} transition-colors duration-300`}>
            {prog.name}
          </h4>
          <p className={`text-gray-300 mt-2.5 opacity-0 group-hover:opacity-100 transition-all duration-500 border-l-2 ${prog.borderColor} pl-2.5 leading-relaxed text-[11px]`}>
            {prog.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="py-24 relative z-10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1 inline-block rounded-full border border-neonOrange/30 bg-neonOrange/5 text-neonOrange text-xs md:text-sm font-cyber tracking-widest mb-6 backdrop-blur-md"
            >
              CURRICULUM
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-black font-cyber"
            >
              TRAINING <span className="text-gradient">MODULES</span> & <span className="text-gradient">WEEKLY SCHEDULE</span>
            </motion.h3>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 perspective-1000">
          {programs.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <ProgramCard prog={prog} />
            </motion.div>
          ))}
        </div>

        {/* Centered wide capsule button below the grid */}
        <div className="flex justify-center mt-16 px-4">
          <motion.a 
             href="#schedule"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             whileHover={{ scale: 1.02, y: -2 }}
             whileTap={{ scale: 0.98 }}
             className="group relative w-full max-w-4xl px-12 py-5 md:py-6 border-2 border-neonOrange text-neonOrange hover:text-black rounded-full overflow-hidden transition-all duration-500 font-cyber tracking-[0.18em] text-xs md:text-sm font-black bg-transparent hover:shadow-[0_0_40px_rgba(255,110,0,0.4)] flex items-center justify-center gap-3 select-none text-center"
          >
            {/* Ambient Background Glow Backplate */}
            <div className="absolute inset-0 rounded-full bg-neonOrange/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none -z-10" />

            {/* Sweeping Light Reflection / Glare Effect */}
            <div className="absolute inset-0 w-[60%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-20" />

            {/* Smooth Slide-up Background Fill */}
            <div className="absolute inset-0 bg-neonOrange origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

            {/* Pulsing indicator light */}
            <span className="relative flex h-2 w-2 shrink-0 group-hover:hidden transition-all duration-300">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonOrange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neonOrange"></span>
            </span>

            {/* Roll-up Text Reveal */}
            <span className="relative z-10 inline-flex overflow-hidden">
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                PRESS HERE TO KNOW MORE AND THE WEEKLY SCHEDULE
              </span>
              <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-black">
                PRESS HERE TO KNOW MORE AND THE WEEKLY SCHEDULE
              </span>
            </span>

            {/* Roll-up Arrow Reveal with slide translation */}
            <span className="relative z-10 inline-flex overflow-hidden w-4 h-4 items-center justify-center transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-sm">
                &rarr;
              </span>
              <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-black text-sm">
                &rarr;
              </span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
