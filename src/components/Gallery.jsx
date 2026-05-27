import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  RotateCcw, 
  Settings, 
  Play, 
  Check, 
  AlertCircle,
  Lock,
  Unlock,
  ShieldAlert,
  LogOut,
  Save,
  Loader2
} from 'lucide-react';
import { fetchDojoData, saveDojoData, uploadDojoFile, isSupabaseConfigured } from '../supabase';

const defaultItems = [
  {
    id: 'default-1',
    src: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1200",
    title: "COMBAT MASTERY",
    type: "photo",
    category: "Training"
  },
  {
    id: 'default-2',
    src: "https://assets.mixkit.co/videos/preview/mixkit-man-performing-karate-moves-in-front-of-a-sunset-34062-large.mp4",
    title: "SUNSET KATAS",
    type: "video",
    category: "Sensei"
  },
  {
    id: 'default-3',
    src: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800",
    title: "KINETICS & SPEED",
    type: "photo",
    category: "Training"
  },
  {
    id: 'default-4',
    src: "https://img.youtube.com/vi/FqS71K4uT1g/maxresdefault.jpg",
    title: "STICK ROTATION",
    type: "photo",
    category: "Focus"
  },
  {
    id: 'default-5',
    src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-martial-arts-training-41484-large.mp4",
    title: "AGILITY SPEEDS",
    type: "video",
    category: "Sensei"
  },
  {
    id: 'default-6',
    src: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=1200",
    title: "DOJO DISCIPLINE",
    type: "photo",
    category: "Focus"
  }
];


// Simple IndexedDB wrapper for storing large gallery data
const dbName = 'DojoGalleryDB';
const storeName = 'media';
const keyName = 'mediaList';

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

const getGalleryMedia = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(keyName);
      request.onsuccess = (e) => resolve(e.target.result || null);
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.error('Failed to get from IndexedDB:', err);
    return null;
  }
};

const saveGalleryMedia = async (data) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data, keyName);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.error('Failed to save to IndexedDB:', err);
    throw err;
  }
};

export default function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [adminOpen, setAdminOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewTab, setViewTab] = useState('gallery'); // 'gallery' or 'archive'
  const [submitTarget, setSubmitTarget] = useState('gallery'); // 'gallery' or 'archive'
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  
  // Security / Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dojo_admin_auth') === 'true';
  });
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Credentials Customization & OTP Reset flow state
  const [resetStep, setResetStep] = useState('none'); // 'none' | 'request_otp' | 'verify_otp' | 'new_credentials'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [newAdminIdInput, setNewAdminIdInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newPasswordConfirmInput, setNewPasswordConfirmInput] = useState('');
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');
  const [newAdminPhoneInput, setNewAdminPhoneInput] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState('');

  // Retrieve credentials helper
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

  // Generate and send OTP via chosen delivery method
  const handleSendOtp = async (method) => {
    setOtpError('');
    setOtpSentMessage('');
    setIsSendingOtp(true);

    // Generate a random 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    
    // Developer fallback console log
    console.log(`[Dojo Security] Generated Reset OTP: ${otp}`);

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
            _subject: 'Dojo Portal Code',
            code: otp,
            message: `Your secure portal validation code is: ${otp}`
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          setOtpSentMessage(`OTP dispatched to Gmail (${adminEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3')}). IMPORTANT: If this is your first time, check your Inbox/Spam for a "FormSubmit Activation" email and click the button to activate email delivery!`);
          setResetStep('verify_otp');
        } else {
          setOtpError(`FormSubmit API Error: ${data.message || response.statusText || 'Verification email pending or service rate-limited.'}`);
        }
      } catch (err) {
        setOtpError(`Network error sending OTP email: ${err.message || 'Please check your connection and try again.'}`);
      } finally {
        setIsSendingOtp(false);
      }
    } else if (method === 'whatsapp') {
      // Original pre-filled WhatsApp redirect
      const message = `Dojo Admin Portal Request: Use OTP ${otp} to verify your identity and unlock credential configuration.`;
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      setOtpSentMessage(`Pre-filled WhatsApp opened for Phone (${adminPhone.replace(/(.{3})(.*)(.{3})/, '$1***$3')}). Send the message and enter the OTP below.`);
      setResetStep('verify_otp');
      setIsSendingOtp(false);
    }
  };

  // Verify entered OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');
    
    if (enteredOtp.trim() === generatedOtp && generatedOtp !== '') {
      const credentials = getAdminCredentials();
      setNewAdminIdInput(credentials.adminId);
      setNewAdminEmailInput(credentials.adminEmail);
      setNewAdminPhoneInput(credentials.adminPhone);
      setResetStep('new_credentials');
      setEnteredOtp('');
    } else {
      setOtpError('INVALID CODE: The OTP entered does not match the generated code.');
    }
  };

  // Submit new credentials
  const handleSaveNewCredentials = (e) => {
    e.preventDefault();
    setOtpError('');

    const newId = newAdminIdInput.trim();
    const newPass = newPasswordInput;
    const confirmPass = newPasswordConfirmInput;
    const newEmail = newAdminEmailInput.trim();
    const newPhone = newAdminPhoneInput.trim();

    if (!newId) {
      setOtpError('Admin ID cannot be blank.');
      return;
    }
    if (newPass.length < 6) {
      setOtpError('Password must be at least 6 characters long.');
      return;
    }
    if (newPass !== confirmPass) {
      setOtpError('Passwords do not match.');
      return;
    }
    if (!newEmail || !newEmail.includes('@')) {
      setOtpError('Please enter a valid Recovery Gmail.');
      return;
    }
    if (!newPhone) {
      setOtpError('Please enter a valid Recovery Phone Number.');
      return;
    }

    // Save to localStorage
    localStorage.setItem('dojo_admin_id', newId);
    localStorage.setItem('dojo_admin_password', newPass);
    localStorage.setItem('dojo_admin_email', newEmail);
    localStorage.setItem('dojo_admin_phone', newPhone);

    // Reset flow and show success message
    setResetSuccessMessage('SUCCESS: Admin credentials updated successfully! Log in now.');
    setNewAdminIdInput('');
    setNewPasswordInput('');
    setNewPasswordConfirmInput('');
    setNewAdminEmailInput('');
    setNewAdminPhoneInput('');
    setGeneratedOtp('');
    setResetStep('none');
  };
  
  // Form State for Adding Media
  const [title, setTitle] = useState('');
  const [type, setType] = useState('photo');
  const [sourceType, setSourceType] = useState('url'); // 'url' or 'file'
  const [urlInput, setUrlInput] = useState('');
  const [fileInput, setFileInput] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [category, setCategory] = useState('Photo');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef(null);
  const dragRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  // Initialize gallery list from IndexedDB and Supabase
  useEffect(() => {
    const loadMedia = async () => {
      let cloudCustomItems = [];
      let cloudLoaded = false;
      
      try {
        const cloudData = await fetchDojoData('gallery');
        if (cloudData) {
          const parsed = Array.isArray(cloudData) ? cloudData : Object.values(cloudData);
          cloudCustomItems = parsed.filter(item => item && item.id && !item.id.startsWith('default-'));
          cloudLoaded = true;
        }
      } catch (err) {
        console.warn('Supabase fetch failed during initialization:', err);
      }

      let localCustomItems = [];
      try {
        const savedData = await getGalleryMedia();
        if (savedData) {
          localCustomItems = savedData.filter(item => item && item.id && !item.id.startsWith('default-'));
        } else {
          // Fallback to legacy LocalStorage
          const legacySaved = localStorage.getItem('dojo_gallery_media');
          if (legacySaved) {
            try {
              const parsed = JSON.parse(legacySaved);
              localCustomItems = parsed.filter(item => item && item.id && !item.id.startsWith('default-'));
              localStorage.removeItem('dojo_gallery_media');
            } catch (_) {}
          }
        }
      } catch (err) {
        console.error('Error loading media from IndexedDB:', err);
      }

      // Merge local and cloud custom items to prevent data loss
      const mergedCustomItemsMap = new Map();
      localCustomItems.forEach(item => mergedCustomItemsMap.set(item.id, item));
      cloudCustomItems.forEach(item => mergedCustomItemsMap.set(item.id, item));
      
      const mergedCustomItems = Array.from(mergedCustomItemsMap.values()).map(item => ({
        ...item,
        type: (item.type === 'video' || item.type === 'photo') ? item.type : 'photo'
      }));

      setMediaList([...defaultItems, ...mergedCustomItems]);
      
      // Save the merged list back to IndexedDB so they are cached locally
      try {
        await saveGalleryMedia(mergedCustomItems);
      } catch (err) {
        console.error('Failed to update local cache during merge:', err);
      }

      // If we found local items that weren't in the cloud, try to upload them to sync
      if (cloudLoaded && localCustomItems.length > cloudCustomItems.length && isSupabaseConfigured) {
        try {
          await saveDojoData('gallery', mergedCustomItems);
        } catch (err) {
          console.warn('Failed to auto-sync local items to Supabase:', err);
        }
      }
    };
    loadMedia();
  }, []);

  // Save to IndexedDB and Supabase
  const saveMediaList = async (newList) => {
    const previousList = mediaList;
    setMediaList(newList);
    setIsSaved(false);
    setIsSaving(true);
    try {
      const customItems = newList.filter(item => !item.id.startsWith('default-'));
      
      let supabaseError = false;
      if (isSupabaseConfigured) {
        // Save to Supabase first
        const success = await saveDojoData('gallery', customItems);
        if (!success) {
          supabaseError = true;
          console.warn('Failed to save gallery changes to Supabase cloud database.');
        }
      }

      // Always save to local device storage so changes are preserved locally
      await saveGalleryMedia(customItems);
      
      if (supabaseError) {
        setIsSaved(false);
        throw new Error('Saved locally to your device, but failed to sync with the Supabase database. Please check your network or database policies.');
      } else {
        setIsSaved(true);
      }
    } catch (e) {
      console.error('Failed to save to database:', e);
      // Only roll back if we didn't save locally
      if (!e.message.includes('Saved locally')) {
        setMediaList(previousList);
      }
      throw e;
    } finally {
      setIsSaving(false);
    }
  };

  // Manual save trigger
  const handleSaveChanges = async () => {
    setIsSaving(true);
    setError('');
    try {
      const customItems = mediaList.filter(item => !item.id.startsWith('default-'));
      await saveGalleryMedia(customItems);
      setIsSaved(true);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('Manual save failed:', err);
      setError('Failed to save changes to device database.');
    } finally {
      setIsSaving(false);
    }
  };

  // Admin Authentication Handler
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
      setResetStep('none');
    } else {
      setLoginError('ACCESS DENIED: Invalid Administrator Credentials.');
    }
  };

  // Admin Log Out Handler
  const handleAdminLogout = () => {
    sessionStorage.removeItem('dojo_admin_auth');
    setIsAuthenticated(false);
    setError('');
    setSuccess(false);
  };

  // Video hover autoplay controls
  const handleMouseEnterVideo = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeaveVideo = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // File parsing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;
    
    setError('');
    
    // Only allow images and videos
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setError('Only image or video files (JPEG, PNG, MP4, etc.) are allowed.');
      return;
    }
    
    setFileInput(file);
    
    // Auto-detect type from file mime
    if (file.type.startsWith('video/')) {
      setType('video');
    } else if (file.type.startsWith('image/')) {
      setType('photo');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  // Add Item to gallery (Guarded)
  const handleAddItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isAuthenticated) {
      setError('CRITICAL ERROR: Unauthorized action. Admin session required.');
      return;
    }

    if (!title.trim()) {
      setError('Please provide an inspiring title for this item.');
      return;
    }

    setIsSaving(true);
    try {
      let finalSrc = '';
      if (sourceType === 'url') {
        if (!urlInput.trim()) {
          setError('Please paste a working URL link.');
          setIsSaving(false);
          return;
        }
        finalSrc = urlInput.trim();
      } else {
        if (!fileInput) {
          setError('Please drop or select a photo/video file.');
          setIsSaving(false);
          return;
        }
        
        // Upload the file to Supabase if configured
        if (isSupabaseConfigured) {
          finalSrc = await uploadDojoFile('gallery', fileInput);
        } else {
          // Fallback to base64 preview for local mode
          finalSrc = filePreview;
        }
      }

      const newItem = {
        id: 'custom-' + Date.now(),
        title: title.trim().toUpperCase(),
        src: finalSrc,
        type: type,
        category: type === 'video' ? 'Video' : 'Photo',
        target: submitTarget // 'gallery' or 'archive'
      };

      const updatedList = [newItem, ...mediaList];
      await saveMediaList(updatedList);
      
      setSuccess(true);
      // Reset form
      setTitle('');
      setUrlInput('');
      setFileInput(null);
      setFilePreview('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Storage limit exceeded! Try a smaller image or enter an external URL link instead.');
      if (err.message && err.message.includes('Saved locally')) {
        // Reset form on local save success
        setTitle('');
        setUrlInput('');
        setFileInput(null);
        setFilePreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Item (Guarded)
  const handleDeleteItem = async (id) => {
    if (!isAuthenticated) {
      alert("Unauthorized: Admin privileges required to delete items.");
      return;
    }
    const updated = mediaList.filter(item => item.id !== id);
    try {
      await saveMediaList(updated);
    } catch (err) {
      alert("Failed to delete item: " + err.message);
    }
  };

  // Reset to Defaults (Guarded)
  const handleResetDefaults = async () => {
    if (!isAuthenticated) return;
    if (window.confirm("Restore standard premium Dojo assets? Custom uploads will be cleared.")) {
      try {
        await saveMediaList(defaultItems);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } catch (err) {
        setError("Reset failed: " + err.message);
      }
    }
  };

  // Filtered gallery selection
  const filteredItems = mediaList.filter(item => {
    // Check if item target matches the current view tab
    const itemTarget = item.target || 'gallery';
    if (itemTarget !== viewTab) return false;

    if (filter === 'all') return true;
    return item.type === filter;
  });

  // Lightbox Navigation
  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-32 bg-[#030303] relative z-10 border-t border-white/5">
      
      {/* Premium Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-neonOrange/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-cyberOrange/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1 inline-block rounded-full bg-neonOrange text-black text-xs font-cyber font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              VISUAL ARCHIVE
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-cyber text-white tracking-tight leading-none uppercase"
            >
              Dojo Gallery
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed hidden md:block">
              A portal into discipline. Watch training footage and moments captured inside the elite Mahesh Institute.
            </p>
            
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className={`px-5 py-3 rounded-full font-cyber text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 border transition-all duration-300 ${
                adminOpen 
                  ? 'bg-neonOrange text-black border-neonOrange shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-white/5 text-white border-white/10 hover:border-neonOrange/50 hover:bg-neonOrange/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              {adminOpen ? 'Close Archive Manager' : 'Manage Gallery'}
            </button>
          </motion.div>
        </div>

        {/* Admin Dashboard / Login Panel */}
        <AnimatePresence>
          {adminOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden mb-12"
            >
              {!isAuthenticated ? (
                /* 1. Sleek Admin Authentication Lock Panel */
                <div className="glass-neon p-8 rounded-2xl relative overflow-hidden bg-[#070707] border border-red-500/20 max-w-xl mx-auto shadow-[0_0_40px_rgba(239,68,68,0.05)]">
                  <div className="absolute top-0 right-0 p-4">
                    <button 
                      onClick={() => setAdminOpen(false)}
                      className="text-gray-400 hover:text-neonOrange transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                      <Lock className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-cyber font-bold text-white tracking-widest uppercase">
                        RESTRICTED PORTAL
                      </h3>
                      <p className="text-xs text-red-400/80 font-cyber tracking-wider uppercase mt-1">
                        Dojo Administrators Only
                      </p>
                    </div>

                    {resetSuccessMessage && (
                      <div className="p-3 rounded-lg bg-green-950/40 border border-green-500/20 text-green-400 text-xs text-center font-cyber tracking-wide uppercase font-bold max-w-sm mx-auto shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                        {resetSuccessMessage}
                      </div>
                    )}

                    {resetStep === 'none' && (
                      <>
                        <p className="text-gray-400 text-xs font-light max-w-sm mx-auto leading-relaxed pt-2">
                          Access to uploading photos, clips, and deleting archives is strictly restricted to prevent unauthorized modifications.
                        </p>

                        <form onSubmit={handleAdminLogin} className="space-y-4 pt-4 text-left max-w-sm mx-auto">
                          {loginError && (
                            <motion.div 
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
                            >
                              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                              <span>{loginError}</span>
                            </motion.div>
                          )}

                          <div className="space-y-1">
                            <label className="inline-block text-[10px] font-cyber tracking-widest uppercase font-bold bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">Admin ID</label>
                            <input
                              type="text"
                              required
                              value={adminIdInput}
                              onChange={(e) => setAdminIdInput(e.target.value)}
                              placeholder="Enter admin ID"
                              className="w-full bg-[#020202] border border-neonOrange/15 rounded-xl px-4 py-3 text-sm text-[#b8972e] placeholder-[#4a3a10] focus:outline-none focus:border-neonOrange/50 focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all duration-300 font-sans"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="inline-block text-[10px] font-cyber tracking-widest uppercase font-bold bg-gradient-to-r from-[#8a681c] via-[#ffd700] to-[#7a5814] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">Password</label>
                            <input
                              type="password"
                              required
                              value={adminPasswordInput}
                              onChange={(e) => setAdminPasswordInput(e.target.value)}
                              placeholder="••••••••••••"
                              className="w-full bg-[#020202] border border-neonOrange/15 rounded-xl px-4 py-3 text-sm text-[#b8972e] placeholder-[#4a3a10] focus:outline-none focus:border-neonOrange/50 focus:text-[#ffe28a] focus:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all duration-300 font-sans"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs shadow-[0_0_20px_rgba(239,68,68,0.15)] uppercase"
                          >
                            AUTHENTICATE
                          </button>

                          <div className="pt-6 border-t border-white/5 mt-6">
                            <div 
                              onClick={() => {
                                setResetStep('request_otp');
                                setResetSuccessMessage('');
                                setLoginError('');
                              }}
                              className="group/card cursor-pointer p-4 rounded-xl border border-neonOrange/25 bg-neonOrange/[0.02] hover:bg-neonOrange/[0.06] hover:border-neonOrange/50 shadow-[0_4px_20px_rgba(212,175,55,0.08)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 flex items-center justify-between gap-4"
                            >
                              <div className="text-left">
                                <h4 className="text-[9px] font-cyber tracking-wider text-gray-400 uppercase font-black group-hover/card:text-neonOrange transition-colors">
                                  CREDENTIAL CONFIGURATION
                                </h4>
                                <p className="text-xs md:text-sm text-gray-200 font-medium mt-1 group-hover/card:text-white transition-colors">
                                  Forgot credentials or want to change them?
                                </p>
                              </div>
                              <div className="w-6 h-6 rounded-full border border-neonOrange/20 flex items-center justify-center text-[10px] text-neonOrange group-hover/card:border-neonOrange/50 group-hover/card:bg-neonOrange/15 transition-all duration-300 shrink-0">
                                &rarr;
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                    {resetStep === 'request_otp' && (
                      <div className="space-y-4 pt-4 max-w-sm mx-auto text-left">
                        <p className="text-gray-400 text-xs font-light leading-relaxed">
                          Choose a verification channel below to receive a secure One-Time Password (OTP).
                        </p>
                        
                        {isSendingOtp ? (
                          <div className="flex flex-col items-center justify-center py-6 gap-3">
                            <Loader2 className="w-8 h-8 text-neonOrange animate-spin" />
                            <p className="text-xs text-gray-400 font-cyber uppercase tracking-wider">Sending OTP securely...</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {/* Option 1: Phone Number (WhatsApp) */}
                            <button
                              type="button"
                              onClick={() => handleSendOtp('whatsapp')}
                              className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-800 hover:brightness-110 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                            >
                              SEND OTP TO PHONE NUMBER (WHATSAPP)
                            </button>



                            <button
                              type="button"
                              onClick={() => setResetStep('none')}
                              className="w-full py-3 border border-white/10 hover:bg-white/5 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase text-center"
                            >
                              CANCEL
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {resetStep === 'verify_otp' && (
                      <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4 max-w-sm mx-auto text-left">
                        {otpSentMessage ? (
                          <p className="text-green-400/90 text-xs font-cyber tracking-wide leading-relaxed">
                            {otpSentMessage}
                          </p>
                        ) : (
                          <p className="text-gray-400 text-xs font-light leading-relaxed">
                            An OTP has been dispatched. Enter the code below to verify your session.
                          </p>
                        )}

                        {otpError && (
                          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs">
                            {otpError}
                          </div>
                        )}

                        <div className="space-y-1">
                          <label className="block text-[10px] font-cyber tracking-widest text-gray-500 uppercase">Verification Code (OTP)</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 6-digit OTP"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-[0.4em] text-white focus:outline-none focus:border-neonOrange transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#aa8c2c] text-black font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                        >
                          VERIFY OTP
                        </button>

                        <button
                          type="button"
                          onClick={() => setResetStep('request_otp')}
                          className="w-full py-3 border border-white/10 hover:bg-white/5 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase text-center"
                        >
                          BACK
                        </button>

                        <p className="text-[10px] text-gray-500 font-sans mt-4 leading-relaxed text-center italic">
                          * If email delivery is delayed or you are testing locally, you can view the generated OTP in your browser's Developer Console (Press F12, go to Console).
                        </p>
                      </form>
                    )}

                    {resetStep === 'new_credentials' && (
                      <form onSubmit={handleSaveNewCredentials} className="space-y-4 pt-4 max-w-sm mx-auto text-left">
                        <p className="text-gray-400 text-xs font-light leading-relaxed">
                          Identity verified successfully. Enter your new custom Dojo Administrator credentials and recovery email below.
                        </p>

                        {otpError && (
                          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 text-xs">
                            {otpError}
                          </div>
                        )}

                        <div className="space-y-1">
                          <label className="block text-[10px] font-cyber tracking-widest text-gray-500 uppercase">New Admin ID</label>
                          <input
                            type="text"
                            required
                            value={newAdminIdInput}
                            onChange={(e) => setNewAdminIdInput(e.target.value)}
                            placeholder="Enter new admin ID"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonOrange transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-cyber tracking-widest text-gray-500 uppercase">New Password</label>
                          <input
                            type="password"
                            required
                            value={newPasswordInput}
                            onChange={(e) => setNewPasswordInput(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonOrange transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-cyber tracking-widest text-gray-500 uppercase">Confirm Password</label>
                          <input
                            type="password"
                            required
                            value={newPasswordConfirmInput}
                            onChange={(e) => setNewPasswordConfirmInput(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonOrange transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-cyber tracking-widest text-gray-500 uppercase">Recovery Gmail</label>
                          <input
                            type="email"
                            required
                            value={newAdminEmailInput}
                            onChange={(e) => setNewAdminEmailInput(e.target.value)}
                            placeholder="maheshmartialarts66@gmail.com"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonOrange transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-cyber tracking-widest text-gray-500 uppercase">Recovery Phone Number (with Country Code)</label>
                          <input
                            type="text"
                            required
                            value={newAdminPhoneInput}
                            onChange={(e) => setNewAdminPhoneInput(e.target.value.replace(/\D/g, ''))}
                            placeholder="e.g., 918310311290"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonOrange transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-neonOrange text-black font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase"
                        >
                          SAVE NEW CREDENTIALS
                        </button>

                        <button
                          type="button"
                          onClick={() => setResetStep('none')}
                          className="w-full py-3 border border-white/10 hover:bg-white/5 text-white font-cyber font-bold tracking-widest rounded-xl transition-all duration-300 text-xs uppercase text-center"
                        >
                          CANCEL
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ) : (
                /* 2. Unlocked Full Dojo Manager Dashboard */
                <div className="glass-neon p-6 md:p-8 rounded-2xl relative overflow-hidden bg-[#070707] border border-neonOrange/20 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
                  
                  {/* Top Security Header with Log Out */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        <Unlock className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-cyber font-bold text-white tracking-wide uppercase">
                          ADMIN PORTAL UNLOCKED
                        </h3>
                        <p className="text-[10px] text-green-400 font-cyber uppercase tracking-widest font-bold">
                          Dojo Visual Archive Editor Mode
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleAdminLogout}
                        className="px-4 py-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 text-xs font-cyber tracking-widest uppercase flex items-center gap-1.5 font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Lock Portal
                      </button>
                      
                      <button 
                        onClick={() => setAdminOpen(false)}
                        className="text-gray-400 hover:text-neonOrange transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Center: Add Archive Form */}
                    <form onSubmit={handleAddItem} className="lg:col-span-2 space-y-5">
                      {error && (
                        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      )}
                      
                      {success && (
                        <div className="p-4 rounded-xl bg-green-950/40 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                          <Check className="w-5 h-5 flex-shrink-0" />
                          <span>Visual archive updated successfully!</span>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-cyber tracking-widest text-gray-400 uppercase mb-2">Item Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="E.G., SENSEI SPEEDS KICKS"
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-neonOrange transition-colors font-cyber"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Media Type Toggle */}
                        <div>
                          <label className="block text-xs font-cyber tracking-widest text-gray-400 uppercase mb-2">Media Type</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setType('photo')}
                              className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-cyber uppercase tracking-wider font-bold transition-all ${
                                type === 'photo' 
                                  ? 'bg-neonOrange/10 border-neonOrange text-neonOrange' 
                                  : 'bg-[#0d0d0d] border-white/5 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              <ImageIcon className="w-4 h-4" />
                              Photo
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setType('video')}
                              className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-cyber uppercase tracking-wider font-bold transition-all ${
                                type === 'video' 
                                  ? 'bg-neonOrange/10 border-neonOrange text-neonOrange' 
                                  : 'bg-[#0d0d0d] border-white/5 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              <VideoIcon className="w-4 h-4" />
                              Video
                            </button>
                          </div>
                        </div>

                        {/* Source Selection */}
                        <div>
                          <label className="block text-xs font-cyber tracking-widest text-gray-400 uppercase mb-2">Source Selection</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setSourceType('url')}
                              className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-cyber uppercase tracking-wider font-bold transition-all ${
                                sourceType === 'url' 
                                  ? 'bg-neonOrange/10 border-neonOrange text-neonOrange' 
                                  : 'bg-[#0d0d0d] border-white/5 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              Web Link URL
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setSourceType('file')}
                              className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-cyber uppercase tracking-wider font-bold transition-all ${
                                sourceType === 'file' 
                                  ? 'bg-neonOrange/10 border-neonOrange text-neonOrange' 
                                  : 'bg-[#0d0d0d] border-white/5 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              Upload File
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Source Inputs */}
                      <div className="pt-2">
                        {sourceType === 'url' ? (
                          <div>
                            <label className="block text-xs font-cyber tracking-widest text-gray-400 uppercase mb-2">Web Link Address</label>
                            <input
                              type="text"
                              value={urlInput}
                              onChange={(e) => setUrlInput(e.target.value)}
                              placeholder="https://images.unsplash.com/... or direct MP4 video link"
                              className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-neonOrange transition-colors text-sm font-sans"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block text-xs font-cyber tracking-widest text-gray-400 uppercase mb-2">File Upload Zone</label>
                            <div
                              ref={dragRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current && fileInputRef.current.click()}
                              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                                dragOver 
                                  ? 'bg-neonOrange/10 border-neonOrange' 
                                  : 'bg-[#0d0d0d] border-white/10 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*,video/*"
                                className="hidden"
                              />
                              
                              {filePreview ? (
                                <div className="text-center space-y-3">
                                  {type === 'video' ? (
                                    <video src={filePreview} className="max-h-24 mx-auto rounded-lg" muted />
                                  ) : (
                                    <img src={filePreview} alt="Preview" className="max-h-24 mx-auto rounded-lg object-contain" />
                                  )}
                                  <p className="text-xs text-gray-400 max-w-xs truncate font-mono">
                                    {fileInput ? fileInput.name : 'Custom File Loaded'}
                                  </p>
                                  <button 
                                    type="button" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFileInput(null);
                                      setFilePreview('');
                                    }}
                                    className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center justify-center gap-1 mx-auto"
                                  >
                                    Remove file
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center space-y-2">
                                  <Upload className="w-8 h-8 text-gray-500 mx-auto" />
                                  <p className="text-sm font-medium text-gray-300">Drag and drop file here, or click to browse</p>
                                  <p className="text-xs text-gray-500">Supports PNG, JPG, WEBP, or MP4</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 flex flex-wrap gap-4 items-center justify-between">
                        <p className="text-xs text-gray-500 max-w-sm">
                          * Uploaded media is saved in your browser cache. For long training clips, enter a direct URL link.
                        </p>
                        
                        <div className="flex gap-4 w-full">
                          <button
                            type="submit"
                            onClick={() => setSubmitTarget('gallery')}
                            className="flex-1 px-5 py-3.5 bg-gradient-to-r from-neonOrange to-yellow-600 hover:from-yellow-600 hover:to-neonOrange text-black font-cyber font-bold tracking-wider rounded-xl transition-all duration-300 text-xs shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          >
                            UPLOAD TO GALLERY
                          </button>
                          <button
                            type="submit"
                            onClick={() => setSubmitTarget('archive')}
                            className="flex-1 px-5 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-cyber font-bold tracking-wider rounded-xl border border-white/10 transition-all duration-300 text-xs"
                          >
                            ADD TO ARCHIVE
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Right Column: Custom items manager */}
                    <div className="border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6 space-y-6">
                      <div>
                        <h4 className="text-xs font-cyber font-bold text-gray-400 tracking-wider uppercase mb-4 flex items-center justify-between">
                          <span>YOUR ADDITIONS ({mediaList.filter(i => i.id.startsWith('custom')).length})</span>
                          {mediaList.length !== defaultItems.length && (
                            <button
                              onClick={handleResetDefaults}
                              className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors capitalize font-sans text-xs font-normal"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Reset defaults
                            </button>
                          )}
                        </h4>
                        
                        <div className="max-h-[350px] overflow-y-auto space-y-3 pr-2 scrollbar">
                          {mediaList.filter(i => i.id.startsWith('custom')).length === 0 ? (
                            <div className="h-40 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-black/20 text-center px-4">
                              <ImageIcon className="w-6 h-6 text-gray-600 mb-2" />
                              <p className="text-xs font-cyber text-gray-500 uppercase tracking-wider">No custom media uploaded yet</p>
                            </div>
                          ) : (
                            mediaList.filter(i => i.id.startsWith('custom')).map((item) => (
                              <div 
                                key={item.id}
                                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40 hover:border-white/10 transition-colors"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  {item.type === 'video' ? (
                                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                      <video src={item.src} className="w-full h-full object-cover opacity-60" muted />
                                    </div>
                                  ) : (
                                    <img 
                                      src={item.src} 
                                      alt="" 
                                      className="w-12 h-12 rounded-lg object-cover border border-white/10 flex-shrink-0"
                                      onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=200';
                                      }}
                                    />
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-xs font-cyber font-bold text-white truncate max-w-[120px]">{item.title}</p>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neonOrange/10 border border-neonOrange/20 text-neonOrange font-cyber uppercase font-bold">
                                      {item.type === 'video' ? 'Video' : 'Photo'}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-cyber uppercase ml-1.5">
                                      {item.target || 'gallery'}
                                    </span>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="p-2 rounded-lg border border-red-500/10 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex-shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Explicit Save Action Area */}
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                          {isSaving ? (
                            <div className="w-full py-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl text-center text-xs font-cyber tracking-wider flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              SAVING TO DOJO DATABASE...
                            </div>
                          ) : isSaved ? (
                            <div className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center text-xs font-cyber tracking-wider flex items-center justify-center gap-2">
                              <Check className="w-4 h-4" />
                              ALL MEDIA SECURED & SAVED
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSaveChanges}
                              className="w-full py-3 bg-gradient-to-r from-neonOrange to-yellow-600 hover:from-yellow-600 hover:to-neonOrange text-black font-cyber font-bold tracking-wider rounded-xl transition-all duration-300 text-xs shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              SAVE & PERSIST CHANGES
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Categories */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {/* Main Destination Switcher Tabs */}
          <div className="inline-flex p-1 rounded-xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <button
              onClick={() => setViewTab('gallery')}
              className={`px-6 py-2.5 rounded-lg font-cyber text-xs tracking-widest uppercase font-bold transition-all relative ${
                viewTab === 'gallery' 
                  ? 'bg-neonOrange text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Dojo Gallery
            </button>
            <button
              onClick={() => setViewTab('archive')}
              className={`px-6 py-2.5 rounded-lg font-cyber text-xs tracking-widest uppercase font-bold transition-all relative ${
                viewTab === 'archive' 
                  ? 'bg-neonOrange text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Visual Archive
            </button>
          </div>

          {/* Sub-Filters: All / Photo / Video */}
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none max-w-full p-1.5 rounded-full border border-white/5 bg-[#050505]/60 backdrop-blur-xl gap-2">
            {[
              { id: 'all', label: 'All Media', icon: null },
              { id: 'photo', label: 'Photos', icon: ImageIcon },
              { id: 'video', label: 'Videos', icon: VideoIcon }
            ].map(tab => {
              const Icon = tab.icon;
              const count = mediaList.filter(i => {
                const itemTarget = i.target || 'gallery';
                if (itemTarget !== viewTab) return false;
                if (tab.id === 'all') return true;
                return i.type === tab.id;
              }).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-full font-cyber text-xs tracking-wider uppercase font-bold flex items-center gap-2 transition-all duration-300 shrink-0 ${
                    filter === tab.id 
                      ? 'bg-white/10 text-white border border-white/20' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{tab.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    filter === tab.id ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onMouseEnter={item.type === 'video' ? handleMouseEnterVideo : undefined}
                onMouseLeave={item.type === 'video' ? handleMouseLeaveVideo : undefined}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/3] rounded-2xl bg-[#090909] border border-white/5 hover:border-neonOrange/30 overflow-hidden cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500"
              >
                {/* Media Content */}
                {item.type === 'video' ? (
                  <div className="w-full h-full relative">
                    <video 
                      src={item.src} 
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500" 
                      muted 
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors duration-500">
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-black/60 flex items-center justify-center group-hover:scale-110 group-hover:border-neonOrange transition-all duration-500">
                        <Play className="w-5 h-5 text-white fill-white translate-x-0.5 group-hover:text-neonOrange group-hover:fill-neonOrange transition-colors" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-750 ease-out"
                    onError={(e) => {
                      if (e.target.src.includes('maxresdefault.jpg')) {
                        e.target.src = 'https://img.youtube.com/vi/FqS71K4uT1g/hqdefault.jpg';
                      } else {
                        e.target.src = 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800';
                      }
                    }}
                  />
                )}

                {/* Ambient Top Shadow Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/10 to-transparent opacity-90" />

                {/* Content Overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1 z-10">
                  <span className="self-start text-[10px] px-2 py-0.5 rounded-full border border-neonOrange/30 bg-neonOrange/10 text-neonOrange font-cyber tracking-widest uppercase mb-1">
                    {item.type === 'video' ? 'Video' : 'Photo'}
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-cyber font-black tracking-widest text-white/90 group-hover:text-neonOrange transition-colors duration-300 truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Border Highlight Effect */}
                <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-neonOrange/20 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center border border-white/5 rounded-3xl bg-black/10">
            <ImageIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-cyber font-bold uppercase tracking-wider text-gray-500">No media matches this filter</h3>
            <p className="text-sm text-gray-600 mt-2">Try uploading new archives or reset back to original files.</p>
          </div>
        )}

      </div>

      {/* Cinematic Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header controls inside Lightbox */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
              <div className="text-left">
                <span className="text-[10px] px-2 py-0.5 rounded border border-neonOrange/30 bg-neonOrange/10 text-neonOrange font-cyber uppercase tracking-wider">
                  {filteredItems[lightboxIndex]?.category}
                </span>
                <h4 className="text-white font-cyber font-bold tracking-widest text-lg md:text-xl uppercase mt-1 leading-tight">
                  {filteredItems[lightboxIndex]?.title}
                </h4>
              </div>
              
              <div className="flex items-center gap-4 pointer-events-auto">
                <span className="text-xs text-gray-500 font-mono">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="p-3 bg-white/5 hover:bg-neonOrange hover:text-black rounded-full text-white transition-all duration-300 border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div 
              className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Carousel Left button */}
              <button 
                onClick={handlePrev}
                className="absolute -left-4 md:-left-16 p-4 bg-black/60 border border-white/10 hover:border-neonOrange rounded-full text-white hover:text-neonOrange transition-all duration-300 z-50 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Media Element */}
              <motion.div 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(212,175,55,0.1)] bg-[#030303]"
              >
                {filteredItems[lightboxIndex]?.type === 'video' ? (
                  <video 
                    src={filteredItems[lightboxIndex]?.src} 
                    className="max-w-full max-h-full w-auto h-auto rounded-xl"
                    controls 
                    autoPlay 
                    loop 
                    playsInline
                  />
                ) : (
                  <img 
                    src={filteredItems[lightboxIndex]?.src} 
                    alt={filteredItems[lightboxIndex]?.title} 
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
                    onError={(e) => {
                      if (e.target.src && e.target.src.includes('maxresdefault.jpg')) {
                        e.target.src = 'https://img.youtube.com/vi/FqS71K4uT1g/hqdefault.jpg';
                      } else {
                        e.target.src = 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1200';
                      }
                    }}
                  />
                )}
              </motion.div>

              {/* Carousel Right button */}
              <button 
                onClick={handleNext}
                className="absolute -right-4 md:-right-16 p-4 bg-black/60 border border-white/10 hover:border-neonOrange rounded-full text-white hover:text-neonOrange transition-all duration-300 z-50 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom help indicator */}
            <div className="absolute bottom-6 text-center text-xs text-gray-500 font-cyber tracking-widest hidden md:block uppercase">
              USE LEFT / RIGHT ARROWS OR CLICK OUTSIDE TO CLOSE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
