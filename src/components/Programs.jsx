import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Award, Target, X, BookOpen, Shield, Pencil, Plus, Trash2, Save, RotateCcw } from 'lucide-react';

const programs = [
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

const scheduleDetails = [
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

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/* Available class options for the dropdown when adding a class to the grid */
const availableClasses = [
  { id: '01', name: 'ADVANCED KARATE', tag: 'KARATE' },
  { id: '02', name: 'YOGA & MOBILITY', tag: 'YOGA' },
  { id: '03', name: 'STICK ROTATION', tag: 'STICK' },
  { id: '04', name: 'CHESS TACTICS', tag: 'CHESS' },
  { id: '05', name: "RUBIK'S CUBE", tag: 'CUBE' },
];

const defaultWeekSchedule = [
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
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'grid'
  const [isEditMode, setIsEditMode] = useState(false);
  const [addingCell, setAddingCell] = useState(null); // { rowIdx, day } for the currently-open dropdown
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRowTime, setNewRowTime] = useState('');
  const [saveFlash, setSaveFlash] = useState(false);

  // Magnetic Spotlight Button States
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [btnMousePos, setBtnMousePos] = useState({ x: 0, y: 0 });

  const handleBtnMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    setBtnCoords({ x: clientX - rect.left, y: clientY - rect.top });
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setBtnMousePos({
      x: (clientX - centerX) * 0.35,
      y: (clientY - centerY) * 0.35
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnMousePos({ x: 0, y: 0 });
  };

  // Load schedule from localStorage or use default
  const [weekSchedule, setWeekSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignore parse errors */ }
    return JSON.parse(JSON.stringify(defaultWeekSchedule));
  });

  // Persist schedule to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weekSchedule));
    } catch (e) { /* ignore storage errors */ }
  }, [weekSchedule]);

  // Keydown event listener to close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (addingCell) {
          setAddingCell(null);
        } else {
          setIsScheduleOpen(false);
          setIsEditMode(false);
        }
      }
    };
    if (isScheduleOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isScheduleOpen, addingCell]);

  // Add a class to a specific cell
  const handleAddClass = useCallback((rowIdx, day, classOption) => {
    setWeekSchedule(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[rowIdx].classes[day] = { name: classOption.name, id: classOption.id, tag: classOption.tag };
      return updated;
    });
    setAddingCell(null);
  }, []);

  // Remove a class from a specific cell
  const handleRemoveClass = useCallback((rowIdx, day) => {
    setWeekSchedule(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      delete updated[rowIdx].classes[day];
      return updated;
    });
  }, []);

  // Add a new time row
  const handleAddTimeRow = useCallback(() => {
    if (!newRowTime.trim()) return;
    setWeekSchedule(prev => [...prev, { time: newRowTime.trim(), classes: {} }]);
    setNewRowTime('');
    setShowAddRow(false);
  }, [newRowTime]);

  // Remove an entire time row
  const handleRemoveRow = useCallback((rowIdx) => {
    setWeekSchedule(prev => prev.filter((_, i) => i !== rowIdx));
  }, []);

  // Update a time row's display time
  const handleTimeChange = useCallback((rowIdx, newTime) => {
    setWeekSchedule(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[rowIdx].time = newTime;
      return updated;
    });
  }, []);

  // Reset to default schedule
  const handleResetSchedule = useCallback(() => {
    setWeekSchedule(JSON.parse(JSON.stringify(defaultWeekSchedule)));
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
  }, []);

  // Save confirmation flash
  const handleSaveAndExit = useCallback(() => {
    setIsEditMode(false);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
  }, []);

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
          <motion.button 
             onClick={() => setIsScheduleOpen(true)}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             whileHover={{ scale: 1.02, y: -2 }}
             whileTap={{ scale: 0.98 }}
             className="group relative w-full max-w-4xl px-12 py-5 md:py-6 border-2 border-neonOrange text-neonOrange hover:text-black rounded-full overflow-hidden transition-all duration-500 font-cyber tracking-[0.18em] text-xs md:text-sm font-black bg-transparent hover:shadow-[0_0_40px_rgba(255,110,0,0.4)] flex items-center justify-center gap-3 select-none"
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
          </motion.button>
        </div>
      </div>

      {/* FULL DOJO SCHEDULE & MODULE DETAILS PORTAL OVERLAY */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto px-4 py-8 flex justify-center items-start"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative w-full max-w-7xl bg-[#080808] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 shadow-[0_0_100px_rgba(212,175,55,0.15)] z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsScheduleOpen(false)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full border border-white/10 hover:border-neonOrange/50 hover:bg-white/5 flex items-center justify-center text-white hover:text-neonOrange transition-all duration-300 z-50 shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="mb-10 text-center md:text-left pr-12 flex flex-col items-center md:items-start">
                <button 
                  onClick={() => setIsScheduleOpen(false)}
                  className="flex items-center gap-2 text-xs md:text-sm font-cyber uppercase tracking-[0.2em] text-gray-400 hover:text-neonOrange mb-6 transition-all duration-300 group self-center md:self-start"
                >
                  <span className="transform group-hover:-translate-x-2 transition-transform duration-300 text-neonOrange">&larr;</span>
                  Return to Dojo
                </button>
                <div className="inline-block px-4 py-1 rounded-full bg-neonOrange text-black text-xs md:text-sm font-cyber font-bold tracking-[0.3em] uppercase mb-3 shadow-[0_0_15px_rgba(212,175,55,0.4)]">DOJO CALENDAR</div>
                <h2 className="text-3xl md:text-5xl font-black font-cyber text-white uppercase tracking-tight leading-tight">
                  DOJO SCHEDULE <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonOrange via-white to-neonOrange">& MODULE DETAILS</span>
                </h2>
              </div>

              {/* Interactive Tabs */}
              <div className="flex border-b border-white/10 mb-8 max-w-md gap-6 mx-auto md:mx-0">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-4 text-sm font-cyber uppercase tracking-widest transition-all duration-300 relative ${
                    activeTab === 'specs' ? 'text-neonOrange' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Module Specifications
                  {activeTab === 'specs' && (
                    <motion.div layoutId="scheduleTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-neonOrange" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('grid')}
                  className={`pb-4 text-sm font-cyber uppercase tracking-widest transition-all duration-300 relative ${
                    activeTab === 'grid' ? 'text-neonOrange' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Weekly Calendar Grid
                  {activeTab === 'grid' && (
                    <motion.div layoutId="scheduleTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-neonOrange" />
                  )}
                </button>
              </div>

              {/* Tab Content 1: Weekly Calendar Grid */}
              {activeTab === 'grid' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Edit Mode Toolbar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-gray-400 font-light flex items-center gap-2 select-none md:hidden">
                        <span>Swipe horizontally &rarr; to view the complete weekly timetable</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Save flash indicator */}
                      <AnimatePresence>
                        {saveFlash && (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-xs font-cyber text-emerald-400 tracking-widest uppercase flex items-center gap-1.5"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Saved
                          </motion.div>
                        )}
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
                        onClick={() => { setIsEditMode(!isEditMode); setAddingCell(null); setShowAddRow(false); }}
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
                  
                  <div className={`overflow-x-auto rounded-3xl border bg-black/60 shadow-2xl transition-all duration-500 ${isEditMode ? 'border-neonOrange/30 shadow-[0_0_40px_rgba(212,175,55,0.08)]' : 'border-white/10'}`}>
                    <table className="w-full min-w-[900px] border-collapse text-left table-fixed">
                      <thead>
                        <tr className="border-b border-white/15 bg-white/[0.02]">
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
                                      {/* Remove button in edit mode */}
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
                                        /* Class picker dropdown - large popover */
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
                                        /* Add button */
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
                            {/* Delete row button in edit mode */}
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

                  {/* Add New Time Row (edit mode only) */}
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
              )}

              {/* Tab Content 2: Module Specifications Detail Cards */}
              {activeTab === 'specs' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  {scheduleDetails.map((module) => (
                    <div 
                      key={module.id} 
                      className="glass-card p-6 md:p-10 rounded-[2.5rem] border border-white/10 bg-[#0f0f0f]/40 relative overflow-hidden group shadow-2xl"
                    >
                      {/* Ambient background decoration */}
                      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-neonOrange/5 rounded-full blur-[100px] pointer-events-none" />
                      
                      <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10">
                        {/* Left Column: Metadata & Core Parameters */}
                        <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-2xl font-cyber font-black px-4 py-1 rounded-2xl bg-neonOrange/10 border border-neonOrange/30 text-neonOrange">
                                {module.id}
                              </span>
                              <h3 className="text-2xl md:text-3xl font-cyber font-bold text-white tracking-wide">
                                {module.name}
                              </h3>
                            </div>
                            <p className="text-xs text-gray-400 font-cyber uppercase tracking-[0.22em] border-l-2 border-neonOrange pl-3 leading-relaxed mb-6">
                              Core Focus: <span className="text-white">{module.focus}</span>
                            </p>
                          </div>

                          {/* Stat Grid with custom Lucide Icons */}
                          <div className="grid grid-cols-2 gap-4 mt-auto">
                            <div className="glass p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex items-center gap-2 mb-1 text-neonOrange">
                                <Shield size={14} />
                                <span className="text-[10px] font-cyber tracking-wider uppercase font-bold">LEVEL</span>
                              </div>
                              <span className="text-[11px] md:text-xs text-gray-200 font-semibold leading-tight block">{module.level}</span>
                            </div>
                            <div className="glass p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex items-center gap-2 mb-1 text-neonOrange">
                                <User size={14} />
                                <span className="text-[10px] font-cyber tracking-wider uppercase font-bold">TRAINER</span>
                              </div>
                              <span className="text-xs md:text-sm text-gray-200 font-semibold">{module.trainer}</span>
                            </div>
                            <div className="col-span-2 glass p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex items-center gap-2 mb-1 text-neonOrange">
                                <Award size={14} />
                                <span className="text-[10px] font-cyber tracking-wider uppercase font-bold">AGE GROUP ELIGIBILITY</span>
                              </div>
                              <span className="text-xs md:text-sm text-gray-200 font-semibold">{module.age}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Complete Syllabus Curriculum */}
                        <div className="w-full lg:w-7/12 lg:pl-8 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-6">
                            <BookOpen size={16} className="text-neonOrange" />
                            <h4 className="text-xs font-cyber tracking-[0.2em] text-white uppercase font-black">
                              CURRICULUM SYLLABUS & TOPICS
                            </h4>
                          </div>
                          
                          <ul className="space-y-4">
                            {module.syllabus.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-4">
                                <span className="w-6 h-6 rounded-lg bg-neonOrange/15 border border-neonOrange/30 text-neonOrange text-[10px] font-cyber flex items-center justify-center shrink-0 mt-0.5">
                                  0{idx + 1}
                                </span>
                                <span className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Footer Return Button */}
              <div className="flex justify-center mt-12 border-t border-white/5 pt-8">
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-8 py-3.5 border border-white/10 rounded-full hover:bg-white/5 hover:border-neonOrange text-white flex items-center gap-3 font-cyber tracking-widest text-xs md:text-sm transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] group"
                >
                  <span className="transform group-hover:-translate-x-1.5 transition-transform duration-300 text-neonOrange">&larr;</span>
                  CLOSE SCHEDULE & RETURN TO DOJO
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
