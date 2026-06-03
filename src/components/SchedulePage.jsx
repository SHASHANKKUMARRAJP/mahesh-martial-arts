import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Award, Target, X, BookOpen, Shield, Pencil, Plus, Trash2, Save, RotateCcw, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchDojoData, saveDojoData, isSupabaseConfigured } from '../supabase';
import { programs, scheduleDetails, weekDays, availableClasses, defaultWeekSchedule } from './Programs';
import Footer from './Footer';

const STORAGE_KEY = 'mma-dojo-weekly-schedule';

export default function SchedulePage() {
  // Always scroll to top when mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Module specifications have been moved to the home page beside the Programs section
  const [isEditMode, setIsEditMode] = useState(false);
  const [addingCell, setAddingCell] = useState(null); // { rowIdx, day } for the currently-open dropdown
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRowTime, setNewRowTime] = useState('');
  const [saveFlash, setSaveFlash] = useState(false);

  // Load schedule from localStorage or use default
  const [weekSchedule, setWeekSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignore parse errors */ }
    return JSON.parse(JSON.stringify(defaultWeekSchedule));
  });

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dojo_admin_auth') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSavingCloud, setIsSavingCloud] = useState(false);

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
      adminPhone: savedPhone || '917411421911'
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
      setShowLoginModal(false);
      setAdminIdInput('');
      setAdminPasswordInput('');
      setLoginError('');
      setIsEditMode(true);
    } else {
      setLoginError('ACCESS DENIED: Invalid Credentials.');
    }
  };

  // Sync auth status on mount
  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem('dojo_admin_auth') === 'true');
  }, []);

  // Fetch from Supabase on mount
  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const cloudData = await fetchDojoData('weekly_schedule');
        if (cloudData) {
          setWeekSchedule(cloudData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        }
      } catch (err) {
        console.warn('Failed to load schedule from Supabase:', err);
      }
    };
    loadSchedule();
  }, []);

  // Persist schedule to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weekSchedule));
    } catch (e) { /* ignore storage errors */ }
  }, [weekSchedule]);

  const saveScheduleToCloud = async (scheduleToSave) => {
    if (isSupabaseConfigured) {
      setIsSavingCloud(true);
      try {
        const success = await saveDojoData('weekly_schedule', scheduleToSave);
        if (success) {
          setSaveFlash(true);
          setTimeout(() => setSaveFlash(false), 1200);
        } else {
          console.error("Failed to save schedule to Supabase.");
        }
      } catch (err) {
        console.error("Supabase save failed:", err);
      } finally {
        setIsSavingCloud(false);
      }
    } else {
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 1200);
    }
  };

  const handleReturnToDojo = () => {
    if (isEditMode) {
      saveScheduleToCloud(weekSchedule);
      setIsEditMode(false);
    }
    window.location.hash = '#programs';
  };

  // Keydown event listener to close picker on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && addingCell) {
        setAddingCell(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addingCell]);

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
  const handleResetSchedule = () => {
    const defaultCopy = JSON.parse(JSON.stringify(defaultWeekSchedule));
    setWeekSchedule(defaultCopy);
    saveScheduleToCloud(defaultCopy);
  };

  // Save confirmation flash
  const handleSaveAndExit = () => {
    setIsEditMode(false);
    saveScheduleToCloud(weekSchedule);
  };

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
          href="/#programs" 
          onClick={handleReturnToDojo}
          className="glass-card px-6 py-3 rounded-full flex items-center gap-3 text-white hover:text-neonOrange hover:border-neonOrange/50 transition-all duration-300 group z-50 backdrop-blur-xl bg-black/40 border-white/10"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="font-cyber tracking-[0.2em] text-xs uppercase">Return To Dojo</span>
        </motion.a>
      </nav>

      {/* Main Page Layout Container */}
      <main className="relative z-10 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Page Title Header */}
        <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="inline-block px-4 py-1 rounded-full bg-neonOrange text-black text-xs md:text-sm font-cyber font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            DOJO CALENDAR
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-cyber text-white uppercase tracking-tight leading-tight mb-2">
            DOJO SCHEDULE <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonOrange via-white to-neonOrange">& MODULE DETAILS</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mt-2">
            Explore the comprehensive training calendar and details of our curriculum designed and taught directly by Master Mahesh Sensei.
          </p>
        </div>

        {/* Weekly Calendar Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
            {/* Edit Mode Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#070707] border border-white/10 rounded-3xl p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <p className="text-xs text-gray-400 font-light flex items-center gap-2 select-none">
                  <span>Swipe horizontally &rarr; to view the complete weekly timetable on mobile devices.</span>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {/* Save/Sync flash indicator */}
                <AnimatePresence>
                  {isSavingCloud ? (
                    <div className="text-xs font-cyber text-neonOrange tracking-widest uppercase flex items-center gap-1.5 select-none">
                      <Loader2 className="w-3 h-3 animate-spin text-neonOrange" />
                      Syncing...
                    </div>
                  ) : saveFlash ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-xs font-cyber text-emerald-400 tracking-widest uppercase flex items-center gap-1.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Saved & Synced
                    </motion.div>
                  ) : null}
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
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginModal(true);
                    } else {
                      if (isEditMode) {
                        handleSaveAndExit();
                      } else {
                        setIsEditMode(true);
                        setAddingCell(null);
                        setShowAddRow(false);
                      }
                    }
                  }}
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
            
            <div className={`overflow-x-auto rounded-[2rem] border bg-[#070707] shadow-2xl transition-all duration-500 ${isEditMode ? 'border-neonOrange/30 shadow-[0_0_40px_rgba(212,175,55,0.08)]' : 'border-white/10'}`}>
              <table className="w-full min-w-[900px] border-collapse text-left table-fixed">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40">
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

        {/* Footer Return Button */}
        <div className="flex justify-center mt-16 border-t border-white/5 pt-12">
          <button
            onClick={handleReturnToDojo}
            className="px-8 py-3.5 border border-white/10 rounded-full hover:bg-white/5 hover:border-neonOrange text-white flex items-center gap-3 font-cyber tracking-widest text-xs md:text-sm transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] group"
          >
            <span className="transform group-hover:-translate-x-1.5 transition-transform duration-300 text-neonOrange">&larr;</span>
            RETURN TO DOJO
          </button>
        </div>
      </main>

      {/* Admin Authentication Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#090909] border border-neonOrange/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(255,110,0,0.15)] relative overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                  setAdminIdInput('');
                  setAdminPasswordInput('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-neonOrange transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 pt-2">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-cyber font-bold text-white tracking-widest uppercase">ADMIN ACCESS REQUIRED</h3>
                    <p className="text-[10px] text-neonOrange/85 font-cyber tracking-wider uppercase mt-0.5">Secure Schedule Customization</p>
                  </div>
                </div>

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
                      placeholder="Enter admin ID"
                      className="w-full bg-[#020202] border border-neonOrange/15 rounded-xl px-4 py-3 text-sm text-[#ffe28a] placeholder-gray-600 focus:outline-none focus:border-neonOrange/50 focus:text-white transition-all duration-300 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-cyber tracking-widest uppercase text-gray-400">Password</label>
                    <input
                      type="password"
                      required
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#020202] border border-neonOrange/15 rounded-xl px-4 py-3 text-sm text-[#ffe28a] placeholder-gray-600 focus:outline-none focus:border-neonOrange/50 focus:text-white transition-all duration-300 font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-neonOrange to-orange-600 hover:brightness-110 text-black font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs shadow-[0_0_20px_rgba(255,110,0,0.2)] uppercase"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
