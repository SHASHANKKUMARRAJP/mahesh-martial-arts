import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, Shield, Calendar, Zap, Flame, BookOpen, Target, Check, Camera, Upload, X, Lock, Unlock, Loader2, AlertCircle } from 'lucide-react';
import { fetchDojoData, saveDojoData, uploadDojoFile, isSupabaseConfigured } from '../supabase';

export default function SenseiPage() {
  const [senseiPhoto, setSenseiPhoto] = useState(() => {
    return localStorage.getItem('dojo_sensei_photo') || "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1000";
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dojo_admin_auth') === 'true';
  });

  // Auth flow states
  const [authStep, setAuthStep] = useState('none'); // 'none' | 'login' | 'request_otp' | 'verify_otp'
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // OTP flow states
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState('');

  // Photo customization states
  const [photoSourceType, setPhotoSourceType] = useState('url'); // 'url' | 'file'
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [filePreview, setFilePreview] = useState('');
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSenseiPhoto = async () => {
      const data = await fetchDojoData('sensei_photo');
      if (data && typeof data === 'string') {
        setSenseiPhoto(data);
        localStorage.setItem('dojo_sensei_photo', data);
      }
    };
    fetchSenseiPhoto();
  }, []);

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
      adminPhone: savedPhone || '918310311290'
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
      setAdminIdInput('');
      setAdminPasswordInput('');
      setLoginError('');
    } else {
      setLoginError('ACCESS DENIED: Invalid Credentials.');
    }
  };

  const handleSendOtp = async (method) => {
    setOtpError('');
    setOtpSentMessage('');
    setIsSendingOtp(true);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log(`[Dojo Security] Sensei Photo Edit OTP: ${otp}`);

    const { adminEmail, adminPhone } = getAdminCredentials();

    if (method === 'email') {
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: 'Sensei Photo Edit Code',
            code: otp,
            message: `Your secure validation code to change the Sensei photo is: ${otp}`
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          setOtpSentMessage(`OTP sent to Gmail (${adminEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3')}). Check Inbox/Spam.`);
          setAuthStep('verify_otp');
        } else {
          setOtpError(`FormSubmit API Error: ${data.message || response.statusText}`);
        }
      } catch (err) {
        setOtpError(`Network error sending OTP: ${err.message}`);
      } finally {
        setIsSendingOtp(false);
      }
    } else if (method === 'whatsapp') {
      const message = `Dojo Sensei Photo Request: Use OTP ${otp} to verify identity.`;
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setOtpSentMessage(`Pre-filled WhatsApp opened for (${adminPhone.replace(/(.{3})(.*)(.{3})/, '$1***$3')}). Send the message and enter OTP below.`);
      setAuthStep('verify_otp');
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');

    if (enteredOtp.trim() === generatedOtp && generatedOtp !== '') {
      sessionStorage.setItem('dojo_admin_auth', 'true');
      setIsAuthenticated(true);
      setEnteredOtp('');
      setGeneratedOtp('');
      setOtpSentMessage('');
    } else {
      setOtpError('INVALID CODE: The OTP entered does not match.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;
    setFileError('');

    if (!file.type.startsWith('image/')) {
      setFileError('Only image files (JPEG, PNG, WEBP, etc.) are allowed.');
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setFileError('Image file is too large. Limit is 2.5MB to prevent storage overflow.');
      return;
    }

    setFileInput(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = async (e) => {
    e.preventDefault();
    setFileError('');
    setIsSaving(true);

    let finalSrc = '';
    if (photoSourceType === 'url') {
      if (!newPhotoUrl.trim()) {
        setFileError('Please enter a valid URL.');
        setIsSaving(false);
        return;
      }
      finalSrc = newPhotoUrl.trim();
    } else {
      if (!filePreview) {
        setFileError('Please select or drag an image first.');
        setIsSaving(false);
        return;
      }
      
      try {
        if (fileInput && isSupabaseConfigured) {
          finalSrc = await uploadDojoFile('gallery', fileInput);
        } else {
          finalSrc = filePreview;
        }
      } catch (err) {
        setFileError(err.message || 'File upload failed.');
        setIsSaving(false);
        return;
      }
    }

    try {
      if (isSupabaseConfigured) {
        const success = await saveDojoData('sensei_photo', finalSrc);
        if (!success) {
          throw new Error('Failed to save photo changes to Supabase cloud database.');
        }
      }

      localStorage.setItem('dojo_sensei_photo', finalSrc);
      setSenseiPhoto(finalSrc);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditModalOpen(false);
        // Clear temp inputs
        setNewPhotoUrl('');
        setFilePreview('');
        setFileInput(null);
      }, 1500);
    } catch (err) {
      setFileError(err.message || 'Failed to save to database: image may be too large.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefault = async () => {
    if (window.confirm("Restore default Sensei photo?")) {
      const defaultPhoto = "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1000";
      
      try {
        localStorage.removeItem('dojo_sensei_photo');

        await saveDojoData('sensei_photo', defaultPhoto);

        setSenseiPhoto(defaultPhoto);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setEditModalOpen(false);
        }, 1000);
      } catch (err) {
        setFileError(err.message || 'Failed to reset photo on server.');
      }
    }
  };

  const handleOpenEdit = () => {
    setEditModalOpen(true);
    const auth = sessionStorage.getItem('dojo_admin_auth') === 'true';
    setIsAuthenticated(auth);
    if (!auth) {
      setAuthStep('login');
    }
  };

  const milestones = [
    { icon: <Award className="w-5 h-5 text-neonOrange" />, label: "Black Belt Achieved", value: "2012", desc: "Over a decade of certified mastery in karate techniques." },
    { icon: <Shield className="w-5 h-5 text-neonOrange" />, label: "Rank", value: "4th Dan Black Belt", desc: "Advanced degree representing senior training and expertise." },
    { icon: <Calendar className="w-5 h-5 text-neonOrange" />, label: "Experience", value: "10+ Years", desc: "Dedicated to martial arts training and professional coaching." },
    { icon: <Zap className="w-5 h-5 text-neonOrange" />, label: "Specialty Areas", value: "Expert Instructor", desc: "Karate, Yoga, Gymnastics & Stick Rotation techniques." },
    { icon: <Shield className="w-5 h-5 text-neonOrange" />, label: "Combat Skill", value: "Self Defense", desc: "Tactical and practical training for real-world personal safety." },
    { icon: <Flame className="w-5 h-5 text-neonOrange" />, label: "Coaching Focus", value: "Fitness & Discipline", desc: "Physical training coupled with strong mental discipline." }
  ];

  const domains = [
    { title: "Advanced Karate Training", code: "CRT-01", area: "Combat & Forms" },
    { title: "Stick Rotation Techniques", code: "CRT-02", area: "Weapons Handling" },
    { title: "Gymnastics & Body Flexibility", code: "CRT-03", area: "Biomechanics" },
    { title: "Yoga & Breathing Control", code: "CRT-04", area: "Cognitive Alignment" },
    { title: "Nunchaku Weapon Training", code: "CRT-05", area: "Weapons Mastery" },
    { title: "Self Defense Techniques", code: "CRT-06", area: "Tactical Defense" },
    { title: "Strength & Discipline Development", code: "CRT-07", area: "Conditioning" }
  ];

  const philosophies = [
    { title: "Physical Strength", desc: "Building stamina, core power, and resilient body conditioning." },
    { title: "Mental Focus", desc: "Sharpening alertness, reflex action, and target concentration." },
    { title: "Self-Confidence", desc: "Overcoming fear, trusting one's skills, and taking action." },
    { title: "Discipline", desc: "Structured training habits, patience, and consistency." },
    { title: "Respect & Leadership", desc: "Fostering respect, humility, and positive mentoring qualities." }
  ];

  const phases = [
    {
      title: "Traditional Foundation",
      desc: "Honor, deep stances, traditional karate discipline, and self-restraint to build a resilient base.",
      color: "from-blue-600 to-indigo-500",
      hoverBorder: "hover:border-blue-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.15)]",
      indicatorGlow: "from-blue-500 to-indigo-400",
      badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:border-blue-500/40",
      titleHover: "group-hover:text-blue-400"
    },
    {
      title: "Elite Conditioning",
      desc: "Physical threshold progression, cardiovascular stamina, flexibility, and core structural health.",
      color: "from-red-600 to-orange-500",
      hoverBorder: "hover:border-red-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(239,68,68,0.15)]",
      indicatorGlow: "from-red-500 to-orange-400",
      badgeColor: "bg-red-500/10 border-red-500/20 text-red-400 group-hover:bg-red-500/20 group-hover:border-red-500/40",
      titleHover: "group-hover:text-red-400"
    },
    {
      title: "Tactical Defense",
      desc: "Instinctive direct threat neutralization, leverage control, and practical real-world personal safety.",
      color: "from-emerald-600 to-teal-500",
      hoverBorder: "hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.15)]",
      indicatorGlow: "from-emerald-500 to-teal-400",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
      titleHover: "group-hover:text-emerald-400"
    },
    {
      title: "Cognitive Focus",
      desc: "Mind-body mindfulness, meditation breathwork (Pranayama), focus training, and tactical calm.",
      color: "from-purple-600 to-cyan-500",
      hoverBorder: "hover:border-purple-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.15)]",
      indicatorGlow: "from-purple-500 to-cyan-400",
      badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/40",
      titleHover: "group-hover:text-purple-400"
    },
    {
      title: "Leadership & Character",
      desc: "Confidence building, community contribution, respect, and deep personal accountability.",
      color: "from-neonOrange to-amber-500",
      hoverBorder: "hover:border-neonOrange/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)]",
      indicatorGlow: "from-neonOrange to-amber-400",
      badgeColor: "bg-neonOrange/10 border-neonOrange/20 text-neonOrange group-hover:bg-neonOrange/20 group-hover:border-neonOrange/40",
      titleHover: "group-hover:text-neonOrange"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-neonOrange selection:text-black overflow-x-hidden relative flex flex-col justify-between">
      {/* Premium Minimal Gold Particle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Faint Dojo Background Image */}
        <div 
          style={{ backgroundImage: `url(${senseiPhoto})` }}
          className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-overlay filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <motion.div 
          animate={{ 
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vh] rounded-full bg-gradient-to-br from-neonOrange/15 to-transparent blur-[160px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.04, 0.1, 0.04],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vh] rounded-full bg-gradient-to-tl from-neonOrange/10 to-transparent blur-[160px]" 
        />

        {/* Minimal Slow Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "105%", 
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{ 
              y: "-5%",
              opacity: [null, 0.4, 0]
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-neonOrange/60 rounded-full"
          />
        ))}
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 pt-10 px-8 max-w-6xl mx-auto w-full flex justify-between items-center shrink-0 border-b border-white/5 pb-6">
        <motion.a 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            window.location.reload();
          }}
          className="inline-flex items-center gap-2.5 text-xs font-cyber tracking-[0.2em] uppercase text-black bg-neonOrange hover:bg-neonOrange/90 border border-neonOrange/40 px-4.5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 group font-black"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Dojo</span>
        </motion.a>
        
        <div className="text-[9px] font-cyber text-neonOrange tracking-[0.4em] uppercase border border-neonOrange/20 px-3 py-1 rounded bg-neonOrange/5 animate-pulse-slow">
          Official Dossier
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 max-w-6xl pt-12 pb-24 flex-grow">
        <div className="flex flex-col gap-24 w-full">
          
          {/* Section 1: Editorial Portrait & Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Portrait Museum Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 w-full max-w-xl mx-auto relative group"
            >
              {/* Outer structural frame */}
              <div className="absolute inset-[-12px] border border-neonOrange/25 pointer-events-none group-hover:border-neonOrange/40 transition-colors duration-500 rounded-3xl" />
              <div className="absolute top-[-12px] left-8 right-8 h-[1px] bg-[#030303] z-20" />
              <div className="absolute bottom-[-12px] left-8 right-8 h-[1px] bg-[#030303] z-20" />
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0c0c0c] z-10 group/photo">
                {/* Active instructor badge */}
                <div className="absolute top-4 left-4 z-20 bg-[#030303]/80 backdrop-blur border border-neonOrange/30 px-3 py-1 rounded text-[8px] font-cyber tracking-widest text-neonOrange uppercase">
                  Active Sensei
                </div>

                {/* Edit Photo Overlay Button */}
                <button
                  onClick={handleOpenEdit}
                  className="absolute top-4 right-4 z-20 bg-[#030303]/85 hover:bg-neonOrange hover:text-black text-neonOrange backdrop-blur border border-neonOrange/30 p-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-105"
                  title="Customize Sensei Photo"
                >
                  <Camera size={15} />
                </button>
                
                <img 
                  src={senseiPhoto} 
                  alt="Mahesh Sensei" 
                  className="w-full h-[65vh] object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                />
                
                {/* Vignette bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <div className="text-[10px] font-cyber text-neonOrange tracking-[0.5em] mb-1 uppercase font-bold">HEAD COACH</div>
                  <h1 className="text-3xl font-black font-cyber text-white uppercase tracking-wider text-glow">MAHESH SENSEI</h1>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Bio & Core Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-8 text-left"
            >
              <div className="space-y-4 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
                  <span className="text-[10px] md:text-[11px] font-cyber text-black bg-neonOrange tracking-[0.35em] uppercase font-black px-4 py-1 rounded-full">
                    Biography Profile
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black font-cyber text-black bg-neonOrange px-6 py-2 rounded-full uppercase tracking-wider inline-block shadow-[0_6px_20px_rgba(212,175,55,0.15)] mt-2">
                  THE INSTRUCTIONAL METRIC
                </h2>
              </div>

              <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Mahesh Martial Arts operates under the guidance and curriculum design of Sensei Mahesh, a lifetime practitioner dedicated to instilling discipline, physical capacity, and cognitive self-possession in his students.
                </p>
                <p className="border-l-2 border-neonOrange/40 pl-6 py-2 italic text-gray-400 bg-white/[0.01]">
                  Sensei Mahesh earned his Karate Black Belt in 2012. Over the course of more than a decade of active coaching, he has advanced to the rank of 4th Dan Black Belt, specializing in advanced kata structures, real-world defensive tactics, body conditioning, and core respiration control.
                </p>
              </div>

              {/* Plaque Style Motto */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-neonOrange/10 to-transparent border border-neonOrange/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neonOrange/5 to-transparent pointer-events-none" />
                <div className="text-[9px] font-cyber text-neonOrange tracking-[0.4em] uppercase mb-2 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonOrange animate-pulse" /> Master Principle
                </div>
                <blockquote className="text-lg md:text-xl font-bold font-cyber tracking-widest text-white uppercase italic text-glow">
                  “Train Hard. Stay Disciplined. Become Unstoppable.”
                </blockquote>
              </div>
            </motion.div>

          </div>

          {/* Divider Line */}
          <div className="relative flex items-center justify-center py-4">
            {/* Left line - expands from center */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[1px] bg-gradient-to-l from-neonOrange/30 to-transparent origin-right absolute left-0 right-1/2"
            />
            {/* Right line - expands from center */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[1px] bg-gradient-to-r from-neonOrange/30 to-transparent origin-left absolute left-1/2 right-0"
            />
            {/* Pulsing golden glow behind text */}
            <motion.div
              animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-48 h-8 bg-neonOrange/10 rounded-full blur-xl pointer-events-none"
            />
            {/* Text with fade-in and float */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bg-[#030303] px-6 text-neonOrange text-xs tracking-widest uppercase font-cyber font-semibold"
            >
              <motion.span
                animate={{ textShadow: ["0 0 8px rgba(212,175,55,0.3)", "0 0 20px rgba(212,175,55,0.6)", "0 0 8px rgba(212,175,55,0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦ Credentials Dossier ✦
              </motion.span>
            </motion.div>
          </div>

          {/* Section 2: Premium Metrics & Milestones */}
          <div className="space-y-12">
            <div className="text-center space-y-3 select-none">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
                <span className="text-[10px] md:text-[11px] font-cyber text-black bg-neonOrange tracking-[0.35em] uppercase font-black px-4 py-1 rounded-full">
                  Qualification Scopes
                </span>
                <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black font-cyber text-black bg-neonOrange px-6 py-2 rounded-full uppercase tracking-wider inline-block shadow-[0_6px_20px_rgba(212,175,55,0.15)]">
                  OFFICIAL RECOGNITION
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 rounded-xl hover:border-neonOrange/30 hover:shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.05)] transition-all duration-500 relative group overflow-hidden"
                >
                  {/* Left edge gold vertical indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-neonOrange to-cyberOrange opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l-xl" />
                  
                  {/* Metallic golden sheen sweep */}
                  <div className="absolute inset-0 w-[200%] h-full bg-[linear-gradient(115deg,transparent_30%,rgba(212,175,55,0.01)_40%,rgba(212,175,55,0.06)_50%,rgba(212,175,55,0.01)_60%,transparent_70%)] -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[1.2s] ease-in-out pointer-events-none" />

                  {/* Top hairline link decoration */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-neonOrange/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm font-cyber text-gray-500 tracking-widest uppercase group-hover:text-neonOrange transition-colors duration-300">{milestone.label}</div>
                    <div className="w-9 h-9 rounded-full bg-neonOrange/5 border border-neonOrange/20 flex items-center justify-center group-hover:border-neonOrange/50 group-hover:bg-neonOrange/15 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500 shrink-0">
                      {milestone.icon}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-2xl font-black font-cyber text-white uppercase tracking-wider text-glow group-hover:text-neonOrange transition-colors duration-300">
                      {milestone.value}
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: Specialized Domains & Instructional Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Qualifications & Technical Specialties (Col span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
                  <span className="text-[10px] md:text-[11px] font-cyber text-black bg-neonOrange tracking-[0.35em] uppercase font-black px-4 py-1 rounded-full">
                    Curriculum Matrix
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-cyber text-black bg-neonOrange px-6 py-2 rounded-full uppercase tracking-wider inline-block shadow-[0_6px_20px_rgba(212,175,55,0.15)]">
                  REGISTRY OF MASTERED DOMAINS
                </h3>
              </div>

              <div className="space-y-4">
                {domains.map((domain, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 6 }}
                    className="flex justify-between items-center p-4 bg-[#080808] border border-white/5 hover:border-neonOrange/20 rounded-xl transition-all duration-300 group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-[9px] font-cyber text-neonOrange border border-neonOrange/20 bg-neonOrange/5 px-2 py-1 rounded shrink-0">
                        {domain.code}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-cyber font-bold text-white uppercase tracking-wider group-hover:text-neonOrange transition-colors">
                          {domain.title}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{domain.area}</div>
                      </div>
                    </div>
                    
                    <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neonOrange/40 group-hover:bg-neonOrange/5 transition-all">
                      <Check className="w-3 h-3 text-gray-500 group-hover:text-neonOrange transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Training Philosophy (Col span 5) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
                  <span className="text-[10px] md:text-[11px] font-cyber text-black bg-neonOrange tracking-[0.35em] uppercase font-black px-4 py-1 rounded-full">
                    Focus Standards
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-cyber text-black bg-neonOrange px-6 py-2 rounded-full uppercase tracking-wider inline-block shadow-[0_6px_20px_rgba(212,175,55,0.15)]">
                  INSTRUCTIONAL PHILOSOPHY
                </h3>
              </div>

              <div className="space-y-4">
                {philosophies.map((phil, idx) => (
                  <div 
                    key={idx}
                    className="p-5 bg-[#080808] border border-white/5 rounded-xl hover:border-neonOrange/20 transition-all duration-300 flex gap-4 items-start shadow-[0_4px_15px_rgba(0,0,0,0.3)] relative group"
                  >
                    <div className="w-7 h-7 rounded bg-neonOrange/10 border border-neonOrange/20 text-neonOrange text-xs font-cyber font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <div className="text-left space-y-1">
                      <h4 className="text-sm font-cyber font-bold text-white uppercase tracking-wider group-hover:text-neonOrange transition-colors">{phil.title}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{phil.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 4: Dossier Manifesto Statement */}
          <div className="bg-[#080808] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-neonOrange/20" />
            <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-neonOrange/20" />
            <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(212,175,55,0.02)_0%,transparent_70%) pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center relative z-10">
              <div className="md:col-span-1 text-center md:text-left flex flex-col justify-center items-center md:items-start shrink-0 space-y-2">
                <div className="w-12 h-12 rounded bg-neonOrange/5 border border-neonOrange/30 flex items-center justify-center text-neonOrange">
                  <BookOpen size={24} />
                </div>
                <div className="text-sm font-cyber text-neonOrange tracking-[0.3em] uppercase font-bold pt-2">Manifesto Code</div>
                <div className="text-[9px] font-mono text-gray-600">MMA-ADM-092</div>
              </div>
              
              <div className="md:col-span-3 text-left space-y-6">
                <h4 className="text-lg md:text-xl font-black font-cyber text-black bg-neonOrange px-6 py-2 rounded-full uppercase tracking-wider inline-block select-none shadow-[0_6px_20px_rgba(212,175,55,0.15)]">
                  TEACHING DEDICATION & RANGE OF INSTRUCTION
                </h4>
                <div className="space-y-4 text-sm text-gray-300 font-light leading-relaxed">
                  <p>
                    Instruction within this dojo uses practical martial applications and physiological structural training to cultivate physical resilience, focused awareness, and deep composure.
                  </p>
                  <p>
                    The curriculum spans comprehensive levels, training students from absolute beginners to advanced competitor stages in structured, structured environments that emphasize personal developmental thresholds.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-sm font-cyber text-neonOrange tracking-widest uppercase font-semibold text-glow">
                    “Training is not just about combat capability — it is about the structural alignment of Mind, Body, and Character.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: The Metamorphosis Phases */}
          <div className="space-y-12">
            <div className="text-center space-y-3 select-none">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
                <span className="text-[10px] md:text-[11px] font-cyber text-black bg-neonOrange tracking-[0.35em] uppercase font-black px-4 py-1 rounded-full">
                  Systematic Progress
                </span>
                <div className="w-8 h-[2px] bg-neonOrange shrink-0" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black font-cyber text-black bg-neonOrange px-6 py-2 rounded-full uppercase tracking-wider inline-block shadow-[0_6px_20px_rgba(212,175,55,0.15)]">
                  THE 5 PROGRESSIVE PHASES
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {phases.map((phase, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 rounded-xl flex flex-col justify-between min-h-[220px] transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group ${phase.hoverBorder}`}
                >
                  {/* Left edge colored vertical indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${phase.indicatorGlow} opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l-xl`} />
                  
                  {/* Custom colored backdrop glow on hover */}
                  <div className={`absolute -right-12 -bottom-12 w-28 h-28 rounded-full bg-gradient-to-tr ${phase.color} opacity-0 group-hover:opacity-10 blur-[30px] transition-all duration-700 pointer-events-none`} />

                  <div className="flex justify-between items-start mb-6 z-10">
                    <div className={`w-8 h-8 rounded border flex items-center justify-center text-xs font-cyber font-bold transition-all duration-500 ${phase.badgeColor}`}>
                      0{idx + 1}
                    </div>
                    <div className="text-[8px] font-cyber text-gray-500 uppercase tracking-widest">Phase</div>
                  </div>
                  
                  <div className="space-y-3 text-left z-10">
                    <h5 className={`text-sm font-cyber font-bold text-white uppercase tracking-wider leading-snug transition-colors duration-300 ${phase.titleHover}`}>
                      {phase.title}
                    </h5>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                      {phase.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Elegant footer ribbon */}
      <footer className="relative z-10 py-6 border-t border-white/5 bg-[#080808]">
        <div className="text-center text-[10px] font-cyber text-gray-500 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} MAHESH MARTIAL ARTS. ACADEMY REGISTRY ARCHIVES.
        </div>
      </footer>

      {/* Edit Photo Modal */}
      <AnimatePresence>
        {editModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#090909] border border-neonOrange/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setEditModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-neonOrange transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!isAuthenticated ? (
                /* Admin Login / OTP Selection Panel */
                <div className="space-y-6 pt-2">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-cyber font-bold text-white tracking-widest uppercase">ADMIN ACCESS REQUIRED</h3>
                      <p className="text-[10px] text-red-400/80 font-cyber tracking-wider uppercase mt-0.5">Secure Customization</p>
                    </div>
                  </div>

                  {authStep === 'login' && (
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
                          placeholder="Admin ID"
                          className="w-full bg-[#020202] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonOrange transition-colors font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-400">Password</label>
                        <input
                          type="password"
                          required
                          value={adminPasswordInput}
                          onChange={(e) => setAdminPasswordInput(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#020202] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonOrange transition-colors font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-800 hover:brightness-110 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                      >
                        LOG IN
                      </button>

                      <div className="pt-4 border-t border-white/5 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setAuthStep('request_otp');
                            setLoginError('');
                          }}
                          className="text-xs text-neonOrange hover:underline font-cyber tracking-wider uppercase"
                        >
                          Authenticate via Secure OTP
                        </button>
                      </div>
                    </form>
                  )}

                  {authStep === 'request_otp' && (
                    <div className="space-y-4">
                      <p className="text-gray-400 text-xs font-light leading-relaxed">
                        Select a channel to receive a 6-digit verification code.
                      </p>

                      {isSendingOtp ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-2">
                          <Loader2 className="w-6 h-6 text-neonOrange animate-spin" />
                          <p className="text-[10px] text-gray-500 font-cyber uppercase tracking-wider">Dispatched secure code...</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => handleSendOtp('whatsapp')}
                            className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-800 hover:brightness-110 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                          >
                            Send OTP to Whatsapp
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendOtp('email')}
                            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-800 hover:brightness-110 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                          >
                            Send OTP to Gmail
                          </button>
                          <button
                            type="button"
                            onClick={() => setAuthStep('login')}
                            className="w-full py-2 border border-white/10 hover:bg-white/5 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                          >
                            Back to Credentials Login
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {authStep === 'verify_otp' && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      {otpSentMessage && (
                        <p className="text-green-400 text-xs font-cyber tracking-wide leading-relaxed">
                          {otpSentMessage}
                        </p>
                      )}

                      {otpError && (
                        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs">
                          {otpError}
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] font-cyber tracking-widest text-gray-500 uppercase">Verification Code (OTP)</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 6-digit code"
                          className="w-full bg-[#020202] border border-white/10 rounded-xl px-4 py-2.5 text-center text-lg font-bold tracking-[0.3em] text-white focus:outline-none focus:border-neonOrange transition-colors font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-neonOrange text-black font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                      >
                        VERIFY & UNLOCK
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuthStep('request_otp')}
                        className="w-full py-2 border border-white/10 hover:bg-white/5 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                      >
                        Change Delivery Method
                      </button>
                      <p className="text-[9px] text-gray-500 italic text-center font-sans">
                        * Note: OTP is also logged to developer console for testing.
                      </p>
                    </form>
                  )}
                </div>
              ) : (
                /* Authenticated Edit Photo Panel */
                <form onSubmit={handleSavePhoto} className="space-y-6 pt-2">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-neonOrange/10 border border-neonOrange/30 flex items-center justify-center mx-auto text-neonOrange">
                      <Unlock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-cyber font-bold text-white tracking-widest uppercase">CUSTOMIZE SENSEI PHOTO</h3>
                      <p className="text-[10px] text-neonOrange/80 font-cyber tracking-wider uppercase mt-0.5">Admin Session Active</p>
                    </div>
                  </div>

                  {saveSuccess && (
                    <div className="p-3 rounded-lg bg-green-950/40 border border-green-500/20 text-green-400 text-xs text-center font-cyber tracking-wide uppercase font-bold animate-pulse">
                      SUCCESS: Photo updated!
                    </div>
                  )}

                  {fileError && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs">
                      {fileError}
                    </div>
                  )}

                  {/* Mode Toggles */}
                  <div className="flex border-b border-white/10 pb-1">
                    <button
                      type="button"
                      onClick={() => setPhotoSourceType('url')}
                      className={`flex-1 pb-2 text-xs font-cyber tracking-widest uppercase text-center border-b-2 transition-all ${
                        photoSourceType === 'url' ? 'border-neonOrange text-neonOrange font-bold' : 'border-transparent text-gray-500 hover:text-white'
                      }`}
                    >
                      Paste Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoSourceType('file')}
                      className={`flex-1 pb-2 text-xs font-cyber tracking-widest uppercase text-center border-b-2 transition-all ${
                        photoSourceType === 'file' ? 'border-neonOrange text-neonOrange font-bold' : 'border-transparent text-gray-500 hover:text-white'
                      }`}
                    >
                      Upload File
                    </button>
                  </div>

                  {photoSourceType === 'url' ? (
                    <div className="space-y-2">
                      <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-400">External Image Link</label>
                      <input
                        type="url"
                        value={newPhotoUrl}
                        onChange={(e) => {
                          setNewPhotoUrl(e.target.value);
                          setFilePreview(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/... or other link"
                        className="w-full bg-[#020202] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-neonOrange transition-colors font-sans"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-400">Local Image File</label>
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const file = e.dataTransfer.files[0];
                          processFile(file);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                          dragOver ? 'border-neonOrange bg-neonOrange/5' : 'border-white/10 hover:border-neonOrange/30'
                        }`}
                      >
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-400 font-cyber uppercase tracking-wider">Drag & Drop or Click to Select</p>
                        <p className="text-[9px] text-gray-600 mt-1 font-sans">Max Size: 2.5MB</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}

                  {/* Photo Preview */}
                  {filePreview && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-500">Live Preview</label>
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d]">
                        <img src={filePreview} alt="Preview" className="w-full h-full object-cover" onError={() => setFileError('Failed to load image preview. Please check URL.')} />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full py-2.5 bg-neonOrange disabled:bg-neonOrange/20 disabled:text-black/40 text-black font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          SAVING PHOTO...
                        </>
                      ) : (
                        'SAVE PHOTO'
                      )}
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleResetDefault}
                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-cyber font-bold tracking-widest rounded-xl transition-all text-xs uppercase"
                      >
                        RESET DEFAULT
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sessionStorage.removeItem('dojo_admin_auth');
                          setIsAuthenticated(false);
                        }}
                        className="flex-1 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 font-cyber font-bold tracking-widest rounded-xl transition-all text-xs uppercase"
                      >
                        LOG OUT
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
