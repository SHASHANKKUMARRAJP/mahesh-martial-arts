import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, BookOpen, Pencil, ChevronRight, Sparkles, Shield, User, Award, Plus, Trash2, Save, RotateCcw, Lock, Loader2, AlertCircle, X } from 'lucide-react';
import { fetchDojoData, saveDojoData, isSupabaseConfigured } from '../supabase';

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


function DojoPlannerShowcase() {
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

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]); // Subtle tilt for large cards
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(212,175,55,0.08) 0%, transparent 50%)`;

  const miniTimetable = [
    { day: 'Mon', time: '05:30 PM', name: 'KARATE', bg: 'bg-red-500/10 border-red-500/30 text-red-400 hover:border-red-500/60 hover:bg-red-500/20' },
    { day: 'Tue', time: '06:00 AM', name: 'YOGA', bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60 hover:bg-cyan-500/20' },
    { day: 'Wed', time: '04:00 PM', name: 'CHESS', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-500/20' },
    { day: 'Thu', time: '05:00 PM', name: 'CUBE', bg: 'bg-pink-500/10 border-pink-500/30 text-pink-400 hover:border-pink-500/60 hover:bg-pink-500/20' },
    { day: 'Fri', time: '05:30 PM', name: 'KARATE', bg: 'bg-red-500/10 border-red-500/30 text-red-400 hover:border-red-500/60 hover:bg-red-500/20' },
    { day: 'Sat', time: '04:00 PM', name: 'STICK', bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:border-purple-500/60 hover:bg-purple-500/20' },
  ];

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto mt-0 rounded-[2.5rem] overflow-hidden border border-neonOrange/20 bg-gradient-to-br from-[#0c0c0c] to-[#030303] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.05)] hover:border-neonOrange/50 hover:shadow-[0_25px_60px_rgba(212,175,55,0.15)] transition-all duration-500 group"
    >
      {/* Sweeping Glare Overlay */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
        style={{ background: glareBackground }}
      />

      {/* Sweeping Light Reflection effect */}
      <div className="absolute inset-0 w-[60%] bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

      {/* Ambient Backlight Glow */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent blur-[100px] pointer-events-none z-0" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyberOrange/5 to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row gap-10 items-center justify-between">
        
        {/* Left Info Column */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neonOrange/30 bg-neonOrange/5 text-neonOrange text-xs font-cyber tracking-widest uppercase mb-6 backdrop-blur-md select-none">
            <Sparkles size={12} className="animate-pulse" />
            <span>Interactive Hub</span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl md:text-4xl font-black font-cyber leading-tight mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-neonOrange via-yellow-100 to-white">
            CLASS WEEKLY TIMETABLE
          </h3>

          <p className="text-gray-400 text-sm md:text-base font-light mb-8 leading-relaxed">
            Our training schedule is fully dynamic. Explore lesson syllabus details, filter eligibility age limits, and edit calendar slots directly in the dashboard.
          </p>

          {/* Features Checklist */}
          <div className="space-y-3.5 w-full mb-8">
            <motion.div 
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-3 rounded-2xl border border-neonOrange/20 bg-neonOrange/10 backdrop-blur-md hover:border-neonOrange/50 hover:bg-neonOrange/15 shadow-[0_4px_20px_rgba(212,175,55,0.08)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.15)] transition-all duration-300 cursor-pointer group/item"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-neonOrange/15 border border-neonOrange/30 text-neonOrange shrink-0 transition-all duration-300 group-hover/item:bg-neonOrange group-hover/item:text-black group-hover/item:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <Calendar size={16} />
              </span>
              <div>
                <h4 className="text-sm font-cyber font-bold text-white tracking-wide group-hover/item:text-neonOrange transition-colors duration-300">Timetable Grid</h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">Filter and view daily sessions, timings, and core modules.</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-md hover:border-cyan-500/50 hover:bg-cyan-500/15 shadow-[0_4px_20px_rgba(6,182,212,0.08)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer group/item"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shrink-0 transition-all duration-300 group-hover/item:bg-cyan-500 group-hover/item:text-black group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <BookOpen size={16} />
              </span>
              <div>
                <h4 className="text-sm font-cyber font-bold text-white tracking-wide group-hover/item:text-cyan-400 transition-colors duration-300">Detailed Specifications</h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">Deep-dive into age ranges, syllabus topics, and lesson levels.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-3 rounded-2xl border border-cyberOrange/20 bg-cyberOrange/10 backdrop-blur-md hover:border-cyberOrange/50 hover:bg-cyberOrange/15 shadow-[0_4px_20px_rgba(255,69,0,0.08)] hover:shadow-[0_4px_25px_rgba(255,69,0,0.15)] transition-all duration-300 cursor-pointer group/item"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyberOrange/15 border border-cyberOrange/30 text-cyberOrange shrink-0 transition-all duration-300 group-hover/item:bg-cyberOrange group-hover/item:text-black group-hover/item:shadow-[0_0_15px_rgba(255,69,0,0.4)]">
                <Pencil size={16} />
              </span>
              <div>
                <h4 className="text-sm font-cyber font-bold text-white tracking-wide group-hover/item:text-cyberOrange transition-colors duration-300">Dojo Customizer Mode</h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">Admin controls to update the weekly schedule layout live.</p>
              </div>
            </motion.div>
          </div>

          {/* Call To Action */}
          <div className="relative w-full sm:w-auto">
            {/* Pulsing glow aura waves behind the button */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neonOrange to-orange-500 opacity-40 blur-[4px] animate-ping-slow pointer-events-none -z-10" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neonOrange to-orange-500 opacity-20 blur-[8px] animate-ping-slow pointer-events-none -z-10 [animation-delay:1.25s]" />

            <motion.a
              href="#schedule"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neonOrange to-orange-500 text-black font-cyber font-black tracking-widest text-xs rounded-full flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(255,69,0,0.65)] transition-all duration-300"
            >
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-[30deg] animate-shimmer pointer-events-none" />

              {/* Slide background effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 pointer-events-none" />
              
              <span className="relative z-10">PRESS THIS TO KNOW MORE</span>
              <ChevronRight size={14} className="relative z-10 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
            </motion.a>
          </div>

        </div>

        {/* Right Preview Grid Column */}
        <div className="w-full lg:w-5/12 bg-black/40 border border-white/5 p-6 md:p-8 rounded-[2rem] relative overflow-hidden backdrop-blur-sm self-stretch flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-cyber font-bold tracking-[0.25em] text-neonOrange uppercase">Interactive Preview</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonOrange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neonOrange"></span>
            </span>
          </div>

          {/* Mini Calendar Timetable Mockup */}
          <div className="grid grid-cols-2 gap-3.5 my-auto">
            {miniTimetable.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`flex flex-col justify-between p-3.5 border rounded-2xl transition-all duration-300 select-none cursor-pointer ${slot.bg}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-cyber tracking-widest text-white/50">{slot.day.toUpperCase()}</span>
                  <Clock size={10} className="text-white/30" />
                </div>
                <div>
                  <div className="text-[11px] font-cyber font-black tracking-wider leading-tight text-white mb-0.5">{slot.name}</div>
                  <div className="text-[9px] font-mono tracking-wide text-white/40">{slot.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6 text-[10px] font-cyber tracking-wider text-gray-500 select-none">
            &larr; Click slots to view complete syllabus list &rarr;
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 inline-block rounded-full border border-neonOrange/30 bg-neonOrange/5 text-neonOrange text-xs md:text-sm font-cyber tracking-widest mb-6 backdrop-blur-md"
          >
            CURRICULUM
          </motion.div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-black font-cyber leading-tight"
            >
              WHAT AND ALL WE <span className="text-gradient">TEACH IN CLASS</span>
            </motion.h3>

            <div className="relative shrink-0 select-none group/btn w-fit">
              {/* Pulsing glow aura waves behind the button */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neonOrange to-orange-500 opacity-25 blur-[4px] animate-ping-slow pointer-events-none -z-10" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neonOrange to-orange-500 opacity-10 blur-[8px] animate-ping-slow pointer-events-none -z-10 [animation-delay:1.25s]" />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.hash = '#specs';
                }}
                className="relative overflow-hidden px-5 py-3 rounded-xl border border-transparent text-[10px] md:text-xs font-cyber font-black tracking-widest transition-all duration-300 text-center leading-tight shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(255,69,0,0.65)] bg-gradient-to-r from-neonOrange to-orange-500 text-black"
              >
                {/* Slide background brightness effect on hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[30deg] animate-shimmer pointer-events-none" />
                
                <span className="relative z-10 block transition-colors duration-300 text-black">
                  PRESS THIS TO KNOW MORE
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-6 perspective-1000"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

export function WeeklySchedule() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [addingCell, setAddingCell] = useState(null);
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRowTime, setNewRowTime] = useState('');
  const [saveFlash, setSaveFlash] = useState(false);

  const [weekSchedule, setWeekSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return JSON.parse(JSON.stringify(defaultWeekSchedule));
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dojo_admin_auth') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSavingCloud, setIsSavingCloud] = useState(false);

  const getAdminCredentials = () => {
    const savedId = localStorage.getItem('dojo_admin_id');
    const savedPassword = localStorage.getItem('dojo_admin_password');
    let savedEmail = localStorage.getItem('dojo_admin_email');
    if (savedEmail === 'initiate@mahesh.dojo' || !savedEmail) {
      savedEmail = 'maheshmartialarts66@gmail.com';
      localStorage.setItem('dojo_admin_email', 'maheshmartialarts66@gmail.com');
    }
    const savedPhone = localStorage.getItem('dojo_admin_phone');
    return {
      adminId: savedId || 'admin',
      adminPassword: savedPassword || 'maheshsensei',
      adminEmail: savedEmail || 'maheshmartialarts66@gmail.com',
      adminPhone: savedPhone || '917411421911'
    };
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const trimmedId = adminIdInput.trim().toLowerCase();
    const password = adminPasswordInput;

    const { adminId, adminPassword } = getAdminCredentials();

    if (trimmedId === adminId.toLowerCase() && password === adminPassword) {
      sessionStorage.setItem('dojo_admin_auth', 'true');
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setAdminIdInput('');
      setAdminPasswordInput('');
      setLoginError('');
      setIsEditMode(true);
    } else {
      setLoginError('ACCESS DENIED: Invalid Credentials.');
    }
  };

  React.useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem('dojo_admin_auth') === 'true');
  }, []);

  React.useEffect(() => {
    const loadSchedule = async () => {
      try {
        const cloudData = await fetchDojoData('weekly_schedule');
        if (cloudData) {
          setWeekSchedule(cloudData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        }
      } catch (err) {
        console.warn('Failed to load schedule from Supabase:', err);
      }
    };
    loadSchedule();
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weekSchedule));
    } catch (e) {}
  }, [weekSchedule]);

  const saveScheduleToCloud = async (scheduleToSave) => {
    if (isSupabaseConfigured) {
      setIsSavingCloud(true);
      try {
        const success = await saveDojoData('weekly_schedule', scheduleToSave);
        if (success) {
          setSaveFlash(true);
          setTimeout(() => setSaveFlash(false), 1200);
        } else {
          console.error("Failed to save schedule to Supabase.");
        }
      } catch (err) {
        console.error("Supabase save failed:", err);
      } finally {
        setIsSavingCloud(false);
      }
    } else {
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 1200);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && addingCell) {
        setAddingCell(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addingCell]);

  const handleAddClass = React.useCallback((rowIdx, day, classOption) => {
    setWeekSchedule(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[rowIdx].classes[day] = { name: classOption.name, id: classOption.id, tag: classOption.tag };
      return updated;
    });
    setAddingCell(null);
  }, []);

  const handleRemoveClass = React.useCallback((rowIdx, day) => {
    setWeekSchedule(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      delete updated[rowIdx].classes[day];
      return updated;
    });
  }, []);

  const handleAddTimeRow = React.useCallback(() => {
    if (!newRowTime.trim()) return;
    setWeekSchedule(prev => [...prev, { time: newRowTime.trim(), classes: {} }]);
    setNewRowTime('');
    setShowAddRow(false);
  }, [newRowTime]);

  const handleRemoveRow = React.useCallback((rowIdx) => {
    setWeekSchedule(prev => prev.filter((_, i) => i !== rowIdx));
  }, []);

  const handleTimeChange = React.useCallback((rowIdx, newTime) => {
    setWeekSchedule(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[rowIdx].time = newTime;
      return updated;
    });
  }, []);

  const handleResetSchedule = () => {
    const defaultCopy = JSON.parse(JSON.stringify(defaultWeekSchedule));
    setWeekSchedule(defaultCopy);
    saveScheduleToCloud(defaultCopy);
  };

  const handleSaveAndExit = () => {
    setIsEditMode(false);
    saveScheduleToCloud(weekSchedule);
  };

  return (
    <section id="weekly-schedule" className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        {/* Page Title Header */}
        <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="inline-block px-4 py-1 rounded-full bg-neonOrange text-black text-xs md:text-sm font-cyber font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            DOJO CALENDAR
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-cyber text-white uppercase tracking-tight leading-tight mb-2">
            CLASS WEEKLY <span className="text-gradient">TIMETABLE</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mt-2">
            Explore the comprehensive training calendar and details of our curriculum designed and taught directly by Master Mahesh Sensei.
          </p>
        </div>

        {/* Weekly Calendar Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Edit Mode Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#070707] border border-white/10 rounded-3xl p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-400 font-light flex items-center gap-2 select-none">
                <span>Swipe horizontally &rarr; to view the complete weekly timetable on mobile devices.</span>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* Save/Sync flash indicator */}
              <AnimatePresence>
                {isSavingCloud ? (
                  <div className="text-xs font-cyber text-neonOrange tracking-widest uppercase flex items-center gap-1.5 select-none">
                    <Loader2 className="w-3 h-3 animate-spin text-neonOrange" />
                    Syncing...
                  </div>
                ) : saveFlash ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-xs font-cyber text-emerald-400 tracking-widest uppercase flex items-center gap-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Saved & Synced
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {isEditMode && (
                <>
                  <button
                    onClick={handleResetSchedule}
                    className="px-3 py-1.5 rounded-full border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-red-400 text-[10px] font-cyber tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5"
                    title="Reset to default schedule"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                  <button
                    onClick={handleSaveAndExit}
                    className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-cyber tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  >
                    <Save size={12} />
                    Done
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginModal(true);
                  } else {
                    if (isEditMode) {
                      handleSaveAndExit();
                    } else {
                      setIsEditMode(true);
                      setAddingCell(null);
                      setShowAddRow(false);
                    }
                  }
                }}
                className={`px-4 py-1.5 rounded-full border text-[10px] font-cyber tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  isEditMode 
                    ? 'bg-neonOrange/15 border-neonOrange/40 text-neonOrange shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                    : 'border-white/10 hover:border-neonOrange/30 text-gray-400 hover:text-neonOrange'
                }`}
              >
                <Pencil size={12} />
                {isEditMode ? 'Editing' : 'Edit Schedule'}
              </button>
            </div>
          </div>
          
          <div className={`overflow-x-auto rounded-[2rem] border bg-[#070707] shadow-2xl transition-all duration-500 ${isEditMode ? 'border-neonOrange/30 shadow-[0_0_40px_rgba(212,175,55,0.08)]' : 'border-white/10'}`}>
            <table className="w-full min-w-[900px] border-collapse text-left table-fixed">
              <thead>
                <tr className="border-b border-white/10 bg-black/40">
                  <th className="p-6 text-sm font-cyber font-bold tracking-widest text-white border-r border-white/10 w-[180px]">TIME</th>
                  {weekDays.map(day => (
                    <th key={day} className="p-6 text-xs md:text-sm font-cyber font-bold tracking-widest text-center text-neonOrange">{day.toUpperCase()}</th>
                  ))}
                  {isEditMode && <th className="p-4 w-[50px]"></th>}
                </tr>
              </thead>
              <tbody>
                {weekSchedule.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors duration-300">
                    <td className="p-6 text-xs md:text-sm font-cyber font-medium text-gray-300 border-r border-white/10 bg-white/[0.01]">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-neonOrange shrink-0" />
                        {isEditMode ? (
                          <input 
                            type="text" 
                            value={row.time} 
                            onChange={(e) => handleTimeChange(rowIdx, e.target.value)}
                            className="bg-transparent border-b border-neonOrange/30 focus:border-neonOrange outline-none text-white w-full py-0.5 tracking-wider font-cyber"
                          />
                        ) : (
                          <span>{row.time}</span>
                        )}
                      </div>
                    </td>
                    {weekDays.map(day => {
                      const classInfo = row.classes[day];
                      const isCellAdding = addingCell && addingCell.rowIdx === rowIdx && addingCell.day === day;
                      return (
                        <td key={day} className="p-4 text-center align-middle h-24 relative">
                          {classInfo ? (
                            <div className="absolute inset-2 glass rounded-2xl p-3 flex flex-col justify-center items-center border border-neonOrange/20 bg-gradient-to-br from-neonOrange/10 to-transparent hover:border-neonOrange hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 select-none">
                              <span className="text-[10px] font-cyber text-neonOrange tracking-[0.2em] mb-1">
                                MODULE {classInfo.id}
                              </span>
                              <span className="text-xs font-black font-cyber text-white tracking-wide leading-tight">
                                {classInfo.tag}
                              </span>
                              {isEditMode && (
                                <button
                                  onClick={() => handleRemoveClass(rowIdx, day)}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/40 hover:text-white transition-all duration-200 z-10"
                                  title="Remove this class"
                                >
                                  <X size={10} />
                                </button>
                              )}
                            </div>
                          ) : isEditMode ? (
                            <div className="absolute inset-2 flex items-center justify-center">
                              {isCellAdding ? (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-52 bg-[#111111] border border-neonOrange/40 rounded-2xl p-3 flex flex-col gap-1 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-xl"
                                >
                                  <div className="text-[10px] font-cyber text-neonOrange/60 tracking-[0.3em] uppercase text-center mb-1 pb-2 border-b border-white/10">Select Class</div>
                                  {availableClasses.map(cls => (
                                    <button
                                      key={cls.id}
                                      onClick={() => handleAddClass(rowIdx, day, cls)}
                                      className="px-4 py-2.5 text-sm font-cyber text-gray-200 hover:text-neonOrange hover:bg-neonOrange/10 rounded-xl transition-all duration-200 text-left tracking-wider uppercase flex items-center gap-3"
                                    >
                                      <span className="w-6 h-6 rounded-lg bg-neonOrange/10 border border-neonOrange/20 text-neonOrange text-[9px] font-bold flex items-center justify-center shrink-0">{cls.id}</span>
                                      {cls.tag}
                                    </button>
                                  ))}
                                  <button
                                    onClick={() => setAddingCell(null)}
                                    className="px-4 py-2 text-xs font-cyber text-gray-500 hover:text-red-400 rounded-xl transition-all duration-200 text-center tracking-wider uppercase mt-1 border-t border-white/5 pt-2.5"
                                  >
                                    Cancel
                                  </button>
                                </motion.div>
                              ) : (
                                <button
                                  onClick={() => setAddingCell({ rowIdx, day })}
                                  className="w-8 h-8 rounded-full border border-dashed border-white/10 hover:border-neonOrange/40 flex items-center justify-center text-white/10 hover:text-neonOrange/60 transition-all duration-300 hover:bg-neonOrange/5"
                                  title="Add a class here"
                                >
                                  <Plus size={14} />
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-[10px] font-cyber text-white/5 font-black uppercase tracking-[0.3em] select-none">CLOSED</span>
                          )}
                        </td>
                      );
                    })}
                    {isEditMode && (
                      <td className="p-2 text-center align-middle">
                        <button
                          onClick={() => handleRemoveRow(rowIdx)}
                          className="w-7 h-7 rounded-full border border-white/5 hover:border-red-500/40 flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                          title="Delete this time row"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditMode && (
            <div className="flex items-center justify-center gap-3 pt-2">
              {showAddRow ? (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-[#0c0c0c] border border-neonOrange/20 rounded-full px-4 py-2 shadow-lg"
                >
                  <Clock size={14} className="text-neonOrange shrink-0" />
                  <input
                    type="text"
                    value={newRowTime}
                    onChange={e => setNewRowTime(e.target.value)}
                    placeholder="e.g. 08:00 AM - 09:00 AM"
                    className="bg-transparent text-sm font-cyber text-white placeholder-gray-500 outline-none w-56 tracking-wider"
                    onKeyDown={e => e.key === 'Enter' && handleAddTimeRow()}
                    autoFocus
                  />
                  <button
                    onClick={handleAddTimeRow}
                    disabled={!newRowTime.trim()}
                    className="px-3 py-1 rounded-full bg-neonOrange/10 border border-neonOrange/30 text-neonOrange text-[10px] font-cyber tracking-widest uppercase hover:bg-neonOrange/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => { setShowAddRow(false); setNewRowTime(''); }}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowAddRow(true)}
                  className="px-5 py-2 rounded-full border border-dashed border-white/10 hover:border-neonOrange/30 text-gray-400 hover:text-neonOrange text-[10px] font-cyber tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-neonOrange/5"
                >
                  <Plus size={12} />
                  Add New Time Slot
                </button>
              )}
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-xs text-gray-400 font-light italic">All modules are conducted under the personalized supervision of Master Mahesh Sensei.</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#090909] border border-neonOrange/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(255,110,0,0.15)] relative overflow-hidden text-left"
            >
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                  setAdminIdInput('');
                  setAdminPasswordInput('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-neonOrange transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 pt-2">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-cyber font-bold text-white tracking-widest uppercase">ADMIN ACCESS REQUIRED</h3>
                    <p className="text-[10px] text-neonOrange/85 font-cyber tracking-wider uppercase mt-0.5">Secure Schedule Customization</p>
                  </div>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-400">Admin ID</label>
                    <input
                      type="text"
                      required
                      value={adminIdInput}
                      onChange={(e) => setAdminIdInput(e.target.value)}
                      placeholder="Enter admin ID"
                      className="w-full bg-[#020202] border border-neonOrange/15 rounded-xl px-4 py-3 text-sm text-[#ffe28a] placeholder-gray-600 focus:outline-none focus:border-neonOrange/50 focus:text-white transition-all duration-300 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-400">Password</label>
                    <input
                      type="password"
                      required
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#020202] border border-neonOrange/15 rounded-xl px-4 py-3 text-sm text-[#ffe28a] placeholder-gray-600 focus:outline-none focus:border-neonOrange/50 focus:text-white transition-all duration-300 font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-neonOrange to-orange-600 hover:brightness-110 text-black font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs shadow-[0_0_20px_rgba(255,110,0,0.2)] uppercase"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
