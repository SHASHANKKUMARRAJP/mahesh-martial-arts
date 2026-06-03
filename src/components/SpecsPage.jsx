import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, User, Award, BookOpen } from 'lucide-react';
import { scheduleDetails } from './Programs';
import Footer from './Footer';

export default function SpecsPage() {
  // Always scroll to top when mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-neonOrange selection:text-black overflow-hidden relative">
      
      {/* Premium Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Floating Ambient Spotlights */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.2, 0.1],
            x: [0, 30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-br from-neonOrange/20 to-transparent blur-[120px]" 
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.05, 0.15, 0.05],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[10%] w-[70vw] h-[70vh] rounded-full bg-gradient-to-tl from-cyberOrange/10 to-transparent blur-[130px]" 
        />
      </div>

      {/* Floating Header Back-Navigation Bar */}
      <nav className="fixed w-full z-50 top-6 px-4 flex justify-between max-w-7xl mx-auto left-0 right-0">
        <motion.a 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          className="glass-card px-6 py-3 rounded-full flex items-center gap-3 text-white hover:text-neonOrange hover:border-neonOrange/50 transition-all duration-300 group z-50 backdrop-blur-xl bg-black/40 border-white/10"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="font-cyber tracking-[0.2em] text-xs uppercase">Return To Dojo</span>
        </motion.a>
      </nav>

      {/* Main Page Layout Container */}
      <main className="relative z-10 pt-32 pb-24 px-4 container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1 inline-block rounded-full border border-neonOrange/30 bg-neonOrange/5 text-neonOrange text-xs md:text-sm font-cyber tracking-widest mb-6 backdrop-blur-md"
          >
            CURRICULUM SPECIFICATIONS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black font-cyber text-glow text-transparent bg-clip-text bg-gradient-to-r from-neonOrange via-yellow-100 to-white uppercase leading-tight"
          >
            MODULE SPECIFICATIONS
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-12 w-full max-w-5xl mx-auto"
        >
          {scheduleDetails.map((module) => (
            <div 
              key={module.id} 
              className="p-6 md:p-10 rounded-[2.5rem] border border-white/5 bg-[#070707] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            >
              {/* Ambient background decoration */}
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-neonOrange/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10 text-left">
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
                    <div className="bg-black/60 p-3.5 rounded-2xl border border-white/5 hover:border-neonOrange/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1 text-neonOrange">
                        <Shield size={14} />
                        <span className="text-[10px] font-cyber tracking-wider uppercase font-bold">LEVEL</span>
                      </div>
                      <span className="text-[11px] md:text-xs text-gray-200 font-semibold leading-tight block">{module.level}</span>
                    </div>
                    <div className="bg-black/60 p-3.5 rounded-2xl border border-white/5 hover:border-neonOrange/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1 text-neonOrange">
                        <User size={14} />
                        <span className="text-[10px] font-cyber tracking-wider uppercase font-bold">TRAINER</span>
                      </div>
                      <span className="text-xs md:text-sm text-gray-200 font-semibold">{module.trainer}</span>
                    </div>
                    <div className="col-span-2 bg-black/60 p-3.5 rounded-2xl border border-white/5 hover:border-neonOrange/20 transition-all duration-300">
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
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
