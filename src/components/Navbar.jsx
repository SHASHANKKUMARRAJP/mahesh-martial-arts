import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Weekly Schedule', href: '#weekly-schedule' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Social Media', href: '#social-media' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed w-full z-50 flex justify-center top-6 px-4 pointer-events-none"
    >
      <nav 
        className={`pointer-events-auto w-full max-w-7xl transition-all duration-500 rounded-full border border-transparent ${scrolled ? 'glass-card py-3 px-6 shadow-2xl border-white/10' : 'bg-transparent py-4 px-4'}`}
      >
        <div className="flex justify-between items-center gap-4 lg:gap-8">
          <div className="glass-card px-4 py-2 rounded-xl text-lg lg:text-xl font-cyber font-black tracking-wider text-white flex items-center whitespace-nowrap">
            MAHESH<span className="text-transparent bg-clip-text bg-gradient-to-r from-neonOrange to-yellow-500 ml-2">MARTIAL ARTS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="group relative text-gray-400 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-[0.2em] font-medium"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-neonOrange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#join" className="ml-2 px-6 py-2 border border-neonOrange/50 bg-neonOrange/10 text-neonOrange rounded-full hover:bg-neonOrange hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] font-cyber text-sm font-bold tracking-widest whitespace-nowrap">
              JOIN NOW
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-neonOrange"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="md:hidden glass-neon absolute top-[120%] left-0 w-full flex flex-col items-center py-8 gap-8 rounded-3xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-neonOrange transition-colors text-lg uppercase tracking-widest font-cyber"
                >
                  {link.name}
                </a>
              ))}
              <a href="#join" onClick={() => setMobileMenuOpen(false)} className="mt-4 px-8 py-3 bg-neonOrange text-black rounded-full font-cyber tracking-widest font-bold">
                JOIN NOW
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
