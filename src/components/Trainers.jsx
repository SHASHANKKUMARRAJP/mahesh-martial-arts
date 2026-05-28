import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchDojoData } from '../supabase';

export default function Trainers() {
  const [senseiPhoto, setSenseiPhoto] = useState(() => {
    return localStorage.getItem('dojo_sensei_photo') || '/mahesh_sensei.jpg';
  });

  useEffect(() => {
    const fetchSenseiPhoto = async () => {
      const data = await fetchDojoData('sensei_photo');
      if (data && typeof data === 'string') {
        setSenseiPhoto(data);
        localStorage.setItem('dojo_sensei_photo', data);
      }
    };
    fetchSenseiPhoto();
  }, []);

  const trainers = [
    { name: 'MAHESH SENSEI', role: '', stats: '4th Dan Black Belt', image: senseiPhoto }
  ];

  return (
    <section id="trainers" className="py-24 relative overflow-hidden z-10">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 inline-block rounded-full border border-neonOrange bg-neonOrange text-black text-xs md:text-sm font-cyber font-bold tracking-widest mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            INSTRUCTOR
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black font-cyber"
          >
            THE <span className="text-gradient">ARCHITECT</span>
          </motion.h3>
        </div>

        <div className="flex justify-center max-w-4xl mx-auto">
          {trainers.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative group cursor-pointer w-full overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-r from-white/5 to-transparent hover:border-neonOrange/30 transition-colors duration-500 glass-card"
            >
              {/* Premium Glow Base */}
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-neonOrange/5 rounded-full blur-3xl group-hover:bg-neonOrange/15 transition-all duration-700 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row min-h-[380px] md:h-[400px]">
                {/* Image Section */}
                <div className="w-full md:w-5/12 relative overflow-hidden h-[300px] md:h-full shrink-0 bg-[#0a0a0a]">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="absolute inset-0 w-full h-full object-cover object-[center_15%] opacity-80 group-hover:opacity-100 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#030303]/10 via-transparent to-[#030303] opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-gradient-to-br from-neonOrange/15 via-[#080808]/95 to-cyberOrange/20 border-t md:border-t-0 md:border-l border-neonOrange/20">
                  <h4 className="text-3xl md:text-4xl font-cyber font-black tracking-widest text-white group-hover:text-neonOrange transition-colors">
                    {t.name}
                  </h4>
                  {t.role && (
                    <p className="text-gray-400 text-sm font-cyber uppercase mt-2 tracking-widest">
                      {t.role}
                    </p>
                  )}
                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-6">
                    <p className="text-neonOrange/90 text-lg md:text-xl tracking-widest font-semibold font-cyber">
                      {t.stats}
                    </p>
                    {t.name === 'MAHESH SENSEI' && (
                      <div>
                        <a 
                          href="#mahesh-sensei" 
                          className="inline-flex items-center gap-3 text-sm font-cyber font-bold tracking-[0.2em] text-neonOrange hover:text-white transition-colors duration-300 group/link mt-2"
                        >
                          <span>PRESS TO KNOW MORE</span>
                          <span className="text-xl group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300">↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
