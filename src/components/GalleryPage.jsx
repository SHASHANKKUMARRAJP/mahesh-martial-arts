import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Gallery from './Gallery';
import Footer from './Footer';

export default function GalleryPage() {
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

        {/* Floating Gold Energy Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.4 + 0.1 
            }}
            animate={{ 
              y: [null, Math.random() * -120 - 60 + "px"],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 12 + 8, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 6
            }}
            className="absolute w-1 h-1 bg-neonOrange rounded-full"
          />
        ))}
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
            window.location.reload();
          }}
          className="glass-card px-6 py-3 rounded-full flex items-center gap-3 text-white hover:text-neonOrange hover:border-neonOrange/50 transition-all duration-300 group z-50 backdrop-blur-xl bg-black/40 border-white/10"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="font-cyber tracking-[0.2em] text-xs uppercase">Return To Dojo</span>
        </motion.a>
      </nav>

      {/* Main Page Layout Container */}
      <main className="relative z-10 pt-16">
        <Gallery />
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
