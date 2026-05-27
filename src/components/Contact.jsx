import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', module: '', message: '' });
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setPhoneError('Invalid phone number. Please enter exactly 10 digits.');
      return;
    }
    setPhoneError('');
    const emailPart = formData.email ? `%0A*Email:* ${formData.email}` : '';
    const text = `*New Inquiry from Mahesh Martial Arts Website*%0A%0A*Name:* ${formData.name}${emailPart}%0A*Phone:* ${formData.phone}%0A*Module:* ${formData.module}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/918310311290?text=${text}`, '_blank');
  };

  return (
    <section id="join" className="py-32 relative bg-[#000000] z-10">
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-6 md:p-8 rounded-[1.5rem] border border-neonOrange/20 bg-gradient-to-r from-neonOrange/10 via-[#0c0c0d] to-cyberOrange/5 hover:border-neonOrange/40 transition-all duration-500 overflow-hidden mb-12 shadow-[0_0_25px_rgba(212,175,55,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          {/* Card borders/glow effects */}
          <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-neonOrange/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-cyberOrange/50 to-transparent" />

          <div>
            <div className="px-3 py-1 inline-block rounded-full border border-neonOrange/30 bg-neonOrange/5 text-neonOrange text-[10px] font-cyber tracking-widest uppercase mb-3">
              Reach Out
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-cyber text-white tracking-tight uppercase">
              TO CONTACT US
            </h2>
          </div>
          <p className="text-neonOrange/90 text-sm md:text-base font-medium max-w-md md:text-left leading-relaxed">
            Have questions about our schedule, training modules, or registration? Choose your preferred method to connect with us below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Info Side */}
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-br from-neonOrange/15 via-[#080808]/95 to-cyberOrange/15 backdrop-blur-[24px] p-8 md:p-10 rounded-2xl border border-neonOrange/30 hover:border-neonOrange/70 shadow-[0_0_35px_rgba(212,175,55,0.12)] hover:shadow-[0_0_50px_rgba(212,175,55,0.3),0_0_30px_rgba(255,69,0,0.2)] relative overflow-hidden flex flex-col justify-between h-full space-y-8 text-left transition-all duration-500"
            >
              {/* Dynamic Animated Ambient Glows inside the Card */}
              <motion.div 
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.2, 0.35, 0.2],
                  x: [0, 15, 0],
                  y: [0, 10, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-gradient-to-br from-neonOrange/50 to-transparent blur-[40px] pointer-events-none z-0"
              />
              <motion.div 
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.28, 0.15],
                  x: [0, -15, 0],
                  y: [0, -15, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-tl from-cyberOrange/35 to-transparent blur-[45px] pointer-events-none z-0"
              />

              {/* Card borders/glow effects */}
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-neonOrange/80 to-transparent" />
              <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-cyberOrange/80 to-transparent" />

              {/* Top part: Section Header */}
              <div className="relative z-10 space-y-4">
                <div className="px-4 py-1 inline-block rounded-full border border-neonOrange bg-neonOrange text-black text-xs font-cyber font-bold tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Enrollment
                </div>
                <h2 className="text-2xl md:text-4xl font-black font-cyber text-white leading-tight tracking-tight">
                  BEGIN YOUR <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">JOURNEY.</span>
                </h2>
                <p className="text-gray-400 font-light leading-relaxed text-base max-w-md">
                  Ready to elevate your mind and body? Reach out to us directly or fill out the form, and our masters will contact you to schedule an initial assessment.
                </p>
              </div>

              {/* Bottom part: Contact Info List */}
              <div className="relative z-10 pt-8 border-t border-white/10 space-y-6">
                
                {/* Location */}
                <div className="flex items-start gap-5 group/item">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonOrange shrink-0 group-hover/item:bg-neonOrange/20 group-hover/item:border-neonOrange/50 group-hover/item:text-white transition-all duration-300">
                    <MapPin size={18} className="group-hover/item:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] font-cyber tracking-[0.2em] mb-1.5 uppercase group-hover/item:text-neonOrange transition-colors duration-300">Location</div>
                    <div className="text-white text-sm md:text-base font-bold leading-relaxed mb-3">
                      Kalyna Jeweller Opp Maruthi Colony,<br/>Near Key Jeans Garment 3rd Floor, Ballari
                    </div>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Kalyna+Jeweller+Opp+Maruthi+Colony,+Near+Key+Jeans+Garment+3rd+Floor,+Ballari" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/map-btn inline-flex items-center justify-between p-2.5 rounded-lg border border-neonOrange/40 bg-neonOrange/10 hover:bg-neonOrange/20 hover:border-neonOrange/60 transition-all duration-300 gap-3 shadow-[0_4px_25px_rgba(212,175,55,0.12)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] w-full max-w-[260px]"
                    >
                      <div className="text-left">
                        <h4 className="text-[9px] font-cyber tracking-wider text-neonOrange uppercase font-black">
                          OFFICIAL MAPS
                        </h4>
                        <p className="text-xs text-white font-semibold mt-0.5">
                          Press this to Open Google Maps
                        </p>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-neonOrange/40 bg-neonOrange text-black font-black flex items-center justify-center text-xs group-hover/map-btn:scale-110 group-hover/map-btn:bg-white group-hover/map-btn:border-white transition-all duration-300 shrink-0">
                        ↗
                      </div>
                    </a>
                  </div>
                </div>

                {/* Direct Line */}
                <div className="flex items-center gap-5 group/item">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonOrange shrink-0 group-hover/item:bg-neonOrange/20 group-hover/item:border-neonOrange/50 group-hover/item:text-white transition-all duration-300">
                    <Phone size={18} className="group-hover/item:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] font-cyber tracking-[0.2em] mb-1.5 uppercase group-hover/item:text-neonOrange transition-colors duration-300">Direct Line</div>
                    <div className="text-white text-lg md:text-xl font-black tracking-wide">+91 8310311290</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-5 group/item">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonOrange shrink-0 group-hover/item:bg-neonOrange/20 group-hover/item:border-neonOrange/50 group-hover/item:text-white transition-all duration-300">
                    <Mail size={18} className="group-hover/item:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] font-cyber tracking-[0.2em] mb-1.5 uppercase group-hover/item:text-neonOrange transition-colors duration-300">Email</div>
                    <div className="text-white text-base md:text-lg font-bold tracking-wide break-all">maheshmartialarts66@gmail.com</div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] backdrop-blur-[24px] p-8 md:p-10 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Subtle glow behind the form */}
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="inline-block text-base font-cyber tracking-wider uppercase mb-2.5 bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="John Doe" 
                    className="w-full bg-[#020202] border border-white/10 p-4 rounded-xl text-[#b8972e] font-sans text-lg focus:outline-none focus:bg-[#050505] focus:border-neonOrange focus:ring-1 focus:ring-neonOrange hover:border-neonOrange/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all placeholder:text-[#8a6f27]/40"
                  />
                </div>
                 <div>
                  <label className="inline-block text-base font-cyber tracking-wider uppercase mb-2.5 bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">
                    Email Address <span className="text-sm text-[#8a681c] lowercase font-sans font-light drop-shadow-none">(optional)</span>
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full bg-[#020202] border border-white/10 p-4 rounded-xl text-[#b8972e] font-sans text-lg focus:outline-none focus:bg-[#050505] focus:border-neonOrange focus:ring-1 focus:ring-neonOrange hover:border-neonOrange/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all placeholder:text-[#8a6f27]/40"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="inline-block text-base font-cyber tracking-wider uppercase mb-2.5 bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if (phoneError) setPhoneError('');
                    }}
                    required
                    placeholder="+91 00000 00000" 
                    className="w-full bg-[#020202] border border-white/10 p-4 rounded-xl text-[#b8972e] font-sans text-lg focus:outline-none focus:bg-[#050505] focus:border-neonOrange focus:ring-1 focus:ring-neonOrange hover:border-neonOrange/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all placeholder:text-[#8a6f27]/40"
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-2 font-sans font-semibold flex items-center gap-1.5 animate-pulse">
                      ⚠️ {phoneError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="inline-block text-base font-cyber tracking-wider uppercase mb-2.5 bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">Select Program</label>
                  <div className="relative">
                    <select 
                      value={formData.module}
                      onChange={(e) => setFormData({...formData, module: e.target.value})}
                      required
                      className={`w-full bg-[#020202] border border-white/10 p-4 rounded-xl font-sans text-lg focus:outline-none focus:bg-[#050505] focus:border-neonOrange focus:ring-1 focus:ring-neonOrange hover:border-neonOrange/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] appearance-none transition-all cursor-pointer focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] ${formData.module === "" ? "text-[#8a6f27]" : "text-[#b8972e]"}`}>
                      <option value="" disabled className="bg-black text-[#8a6f27] text-lg">Choose a path...</option>
                      <option value="Advanced Karate" className="bg-black text-[#b8972e] text-lg">Advanced Karate</option>
                      <option value="Yoga & Mobility" className="bg-black text-[#b8972e] text-lg">Yoga & Mobility</option>
                      <option value="Stick Rotation" className="bg-black text-[#b8972e] text-lg">Stick Rotation</option>
                      <option value="Chess Tactics" className="bg-black text-[#b8972e] text-lg">Chess Tactics</option>
                      <option value="Rubik's Cube" className="bg-black text-[#b8972e] text-lg">Rubik's Cube</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#ffd700] text-sm drop-shadow-[0_0_8px_rgba(212,175,55,0.65)]">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="inline-block text-base font-cyber tracking-wider uppercase mb-2.5 bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">Message</label>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your goals..." 
                  className="w-full bg-[#020202] border border-white/10 p-4 rounded-xl text-[#b8972e] font-sans text-lg focus:outline-none focus:bg-[#050505] focus:border-neonOrange focus:ring-1 focus:ring-neonOrange hover:border-neonOrange/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all resize-none placeholder:text-[#8a6f27]/40"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="group w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#D4AF37] to-[#aa8c2c] text-black font-cyber font-bold tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all duration-300 mt-4"
              >
                SUBMIT INQUIRY
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
