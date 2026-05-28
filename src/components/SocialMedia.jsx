import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight, ArrowUp } from 'lucide-react';


const socials = [
  {
    name: 'Instagram',
    handle: '@_mahesh_martial_arts_',
    description: 'Follow our daily training updates, reels, and stories highlighting student progression, techniques, and Dojo highlights.',
    icon: <Instagram className="w-8 h-8 text-[#E1306C]" />,
    link: 'https://www.instagram.com/_mahesh_martial_arts_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    color: 'hover:border-[#E1306C]/40 hover:shadow-[0_0_30px_rgba(225,48,108,0.15)]',
    badgeColor: 'bg-[#E1306C]/10 border-[#E1306C]/20 text-[#E1306C]'
  }
];

export default function SocialMedia() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="social-media" className="py-24 relative overflow-hidden bg-[#000000] z-10 border-t border-white/5">
      {/* Premium subtle grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-16 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 inline-block rounded-full border border-neonOrange bg-neonOrange text-black text-xs md:text-sm font-cyber font-bold tracking-widest mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            DIGITAL DOJO
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-cyber font-black tracking-tight uppercase"
          >
            OUR SOCIAL <span className="text-gradient">CHANNELS</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light mt-4 max-w-lg mx-auto text-sm md:text-base"
          >
            Follow our digital space to watch tutorial clips, live training runs, and community event milestones.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-md mx-auto"
        >
          {socials.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#050505] backdrop-blur-[24px] border border-white/10 p-7 rounded-[2rem] flex flex-col justify-between min-h-[290px] transition-all duration-500 relative group overflow-hidden hover:border-[#E1306C]/40 hover:shadow-[0_0_40px_rgba(225,48,108,0.18)] hover:bg-gradient-to-br hover:from-[#E1306C]/10 hover:via-black/90 hover:to-[#833AB4]/5"
            >
              {/* Brand-Colored Ambient Glow */}
              <div 
                className="absolute -top-16 -left-16 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-70 transition-all duration-700 pointer-events-none bg-[#E1306C]/10" 
              />

              {/* Massive Faded Background Watermark Icon */}
              <div className="absolute -right-16 -bottom-16 opacity-[0.015] group-hover:opacity-[0.07] group-hover:scale-105 transition-all duration-700 pointer-events-none text-[#E1306C]">
                <Instagram strokeWidth={0.5} size={240} />
              </div>

              {/* Diagonal Glass Reflection Gloss Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Subtle top sheen line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 rounded-xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm bg-[#E1306C]/5 border-[#E1306C]/20 group-hover:bg-[#E1306C]/25 group-hover:border-[#E1306C]/50 shadow-[0_0_15px_rgba(225,48,108,0.15)]">
                  {social.icon}
                </div>
                
                <div className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 border-white/5 bg-white/[0.01] text-gray-500 group-hover:text-white group-hover:bg-[#E1306C] group-hover:border-[#E1306C] group-hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]">
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>

              <div className="space-y-4 mt-auto text-left relative z-10">
                <div>
                  <h4 className="text-2xl font-cyber font-black tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-[#E1306C]">
                    {social.name}
                  </h4>
                  <p className="text-sm font-mono mt-1.5 font-bold text-neonOrange/95 group-hover:text-white transition-colors duration-300">{social.handle}</p>
                </div>
                
                <p className="text-xs text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {social.description}
                </p>

                {/* Brand expanding accent line */}
                <div className="h-[2px] w-12 bg-white/10 mt-5 group-hover:w-full transition-all duration-700 ease-out group-hover:bg-gradient-to-r group-hover:from-[#E1306C] group-hover:via-[#C13584] group-hover:to-[#F77737]" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Tip Indicator Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-md mx-auto py-3.5 px-6 rounded-xl border border-neonOrange/40 bg-gradient-to-r from-neonOrange/15 to-yellow-600/5 flex items-center justify-center gap-3 text-center shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:border-neonOrange/60 transition-colors duration-300"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonOrange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neonOrange"></span>
          </span>
          <p className="text-xs md:text-sm font-cyber tracking-[0.12em] text-neonOrange uppercase font-black flex items-center gap-2">
            Press the card to visit the official account <ArrowUp className="w-4 h-4 shrink-0 animate-bounce" />
          </p>

        </motion.div>
      </div>
    </section>
  );
}
