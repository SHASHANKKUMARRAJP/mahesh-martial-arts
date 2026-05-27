import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import About from './components/About';
import Programs from './components/Programs';
import CurriculumTimeline from './components/CurriculumTimeline';
import Trainers from './components/Trainers';
import SocialMedia from './components/SocialMedia';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SenseiPage from './components/SenseiPage';
import GalleryPage from './components/GalleryPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    
    // Wait for window load to ensure images are loaded
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      const timer = setTimeout(() => setLoading(false), 3000); // Fallback timeout
      return () => {
        window.removeEventListener('load', handleLoad);
        window.removeEventListener('hashchange', handleHashChange);
        clearTimeout(timer);
      };
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#mahesh-sensei') {
    return <SenseiPage />;
  }

  if (currentHash === '#gallery') {
    return <GalleryPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white overflow-hidden selection:bg-neonOrange selection:text-black">
      
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center font-cyber"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 border-t-2 border-b-2 border-neonOrange rounded-full animate-spin"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Luxury Gradient Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full bg-gradient-to-b from-neonOrange/5 to-transparent blur-[100px]" />
      </motion.div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <About />
        <Programs />
        <CurriculumTimeline />
        <Trainers />
        <SocialMedia />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
