import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-neonOrange/50 py-12 relative overflow-hidden">
      {/* Animated Glowing Line */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-1/3 h-[2px] bg-white shadow-[0_0_10px_#fff,0_0_20px_#ff5500]"
      />
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center glass-card px-6 py-3 rounded-xl text-3xl font-cyber font-bold tracking-wider text-white mb-6 whitespace-nowrap">
          MAHESH<span className="text-neonOrange text-glow ml-2">MARTIAL ARTS</span>
        </div>
        
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {['SYS.ADMIN', 'PROTOCOL', 'ENCRYPTION'].map((link, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="px-4 py-2 rounded-full border border-neonOrange bg-neonOrange text-black hover:bg-white hover:border-white transition-all duration-300 text-xs font-cyber font-bold tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              {link}
            </a>
          ))}
        </div>
        
        <div className="inline-block px-5 py-2.5 rounded-full border border-neonOrange bg-neonOrange text-black text-[10px] font-cyber font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)] mt-4">
          &copy; {new Date().getFullYear()} MAHESH MARTIAL ARTS. ALL SYSTEMS SECURED.
        </div>
      </div>
    </footer>
  );
}
