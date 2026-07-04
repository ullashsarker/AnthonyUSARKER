import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  AlertCircle, 
  KeyRound, 
  Terminal, 
  Mail, 
  Trash2, 
  ShieldCheck,
  RefreshCw,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { 
  IMAGE_MAPPING, 
  ImageKey, 
  uploadAndSyncImage, 
  deleteImageFromDB, 
  loadImageFromDB,
  syncImagesToFilesystem
} from '../lib/imageStorage';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function AdminDashboardModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(['[SYSTEM] Control panel initialized.']);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const [activeTab, setActiveTab] = useState<'transmissions' | 'assets'>('transmissions');
  const [uploadingKeys, setUploadingKeys] = useState<Record<string, boolean>>({});
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  const [isUploadingCV, setIsUploadingCV] = useState(false);

  // Append logs helper
  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [`[${time}] ${text}`, ...prev.slice(0, 19)]);
  };

  // Check sessionStorage for cached passcode on open
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      const cached = sessionStorage.getItem('admin_passcode');
      if (cached) {
        setPasscode(cached);
        verifyPasscode(cached);
      }
    };

    window.addEventListener('open-admin-dashboard', handleOpen);
    return () => window.removeEventListener('open-admin-dashboard', handleOpen);
  }, []);

  // Load messages once authenticated
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadMessages();
      loadPreviews();
    }
  }, [isOpen, isAuthenticated]);

  const verifyPasscode = async (codeToVerify = passcode) => {
    if (!codeToVerify) {
      setPasscodeError('Please enter a system access passcode.');
      return;
    }

    setIsVerifying(true);
    setPasscodeError(null);

    try {
      const response = await fetch('/api/verify-passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: codeToVerify })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_passcode', codeToVerify);
        addLog('[AUTH] Authentication successful. Access granted.');
      } else {
        setPasscodeError('Access Denied. Invalid passcode.');
        sessionStorage.removeItem('admin_passcode');
      }
    } catch (err) {
      console.error(err);
      setPasscodeError('Connection failed. Please check backend server.');
    } finally {
      setIsVerifying(false);
    }
  };

  const loadMessages = async () => {
    const cachedPasscode = sessionStorage.getItem('admin_passcode') || passcode;
    if (!cachedPasscode) return;

    setIsLoadingMessages(true);
    try {
      const response = await fetch('/api/messages', {
        headers: { 'X-Admin-Passcode': cachedPasscode }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        addLog(`[SERVER] Fetched ${data.length} message logs.`);
      } else {
        addLog('[SERVER] [ERROR] Failed to fetch message logs.');
      }
    } catch (err) {
      console.error(err);
      addLog('[SYSTEM] [ERROR] Message fetch connection timed out.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const cachedPasscode = sessionStorage.getItem('admin_passcode') || passcode;
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Passcode': cachedPasscode }
      });

      if (response.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        addLog(`[PURGE] Deleted message: ID ${id}`);
      } else {
        addLog(`[ERROR] Server failed to delete message: ID ${id}`);
      }
    } catch (err) {
      console.error(err);
      addLog('[ERROR] Connection exception during purge.');
    }
  };

  const handlePurgeAllMessages = async () => {
    if (!confirm('Are you sure you want to delete all messages from the server? This is irreversible.')) return;
    
    const cachedPasscode = sessionStorage.getItem('admin_passcode') || passcode;
    try {
      const response = await fetch('/api/messages', {
        method: 'DELETE',
        headers: { 'X-Admin-Passcode': cachedPasscode }
      });

      if (response.ok) {
        setMessages([]);
        addLog('[PURGE] Cleared all messages.');
      } else {
        addLog('[ERROR] Server failed to clear messages.');
      }
    } catch (err) {
      console.error(err);
      addLog('[ERROR] Connection exception during clear.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    sessionStorage.removeItem('admin_passcode');
    setConsoleLogs(['[SYSTEM] Session logged out.']);
  };

  const handleClose = () => {
    handleLogout();
    setPasscodeError(null);
    setIsOpen(false);
  };

  const loadPreviews = async () => {
    const previews: Record<string, string> = {};
    for (const key of Object.keys(IMAGE_MAPPING) as ImageKey[]) {
      try {
        const dbData = await loadImageFromDB(key);
        if (dbData) {
          previews[key] = dbData;
        } else {
          previews[key] = `/${IMAGE_MAPPING[key].originalFile}`;
        }
      } catch (err) {
        console.error(`Failed to load preview for ${key}:`, err);
        previews[key] = `/${IMAGE_MAPPING[key].originalFile}`;
      }
    }
    setPreviewImages(previews);
  };

  const handleFileChange = async (key: ImageKey, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addLog(`[ASSETS] [ERROR] File must be an image type.`);
      return;
    }

    setUploadingKeys(prev => ({ ...prev, [key]: true }));
    addLog(`[ASSETS] Uploading and encoding ${IMAGE_MAPPING[key].label}...`);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const currentPasscode = sessionStorage.getItem('admin_passcode') || passcode;
      
      try {
        const success = await uploadAndSyncImage(key, base64, currentPasscode);
        if (success) {
          addLog(`[ASSETS] Successfully uploaded and synced ${IMAGE_MAPPING[key].label}.`);
          setPreviewImages(prev => ({ ...prev, [key]: base64 }));
        } else {
          addLog(`[ASSETS] [ERROR] Failed to sync ${IMAGE_MAPPING[key].label} to server.`);
        }
      } catch (err) {
        console.error(err);
        addLog(`[ASSETS] [ERROR] Exception during sync of ${IMAGE_MAPPING[key].label}.`);
      } finally {
        setUploadingKeys(prev => ({ ...prev, [key]: false }));
      }
    };
    reader.onerror = () => {
      addLog(`[ASSETS] [ERROR] Failed to read file for ${IMAGE_MAPPING[key].label}.`);
      setUploadingKeys(prev => ({ ...prev, [key]: false }));
    };
    reader.readAsDataURL(file);
  };

  const handleCVChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ['.pdf', '.docx', '.doc'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      addLog(`[ASSETS] [ERROR] Invalid CV format. Please upload a PDF or Word document (.docx, .doc).`);
      alert('Invalid CV format. Please upload a PDF or Word document (.docx, .doc).');
      return;
    }

    setIsUploadingCV(true);
    addLog(`[ASSETS] Preparing CV upload: ${file.name}...`);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const currentPasscode = sessionStorage.getItem('admin_passcode') || passcode;
      
      try {
        addLog(`[ASSETS] Syncing CV file "anthony_cv${ext}" to server...`);
        const response = await fetch('/api/save-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': currentPasscode,
          },
          body: JSON.stringify({
            filename: `anthony_cv${ext}`,
            base64: base64,
          }),
        });

        if (response.ok) {
          addLog(`[ASSETS] Successfully uploaded CV file: anthony_cv${ext}`);
          alert(`CV uploaded successfully as anthony_cv${ext}!`);
        } else {
          addLog(`[ASSETS] [ERROR] Server rejected CV file upload.`);
          alert('Failed to sync CV to server.');
        }
      } catch (err) {
        console.error(err);
        addLog(`[ASSETS] [ERROR] Exception during CV sync.`);
      } finally {
        setIsUploadingCV(false);
      }
    };
    reader.onerror = () => {
      addLog(`[ASSETS] [ERROR] Failed to read CV file.`);
      setIsUploadingCV(false);
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = async (key: ImageKey) => {
    if (!confirm(`Are you sure you want to reset ${IMAGE_MAPPING[key].label} to its default image?`)) return;
    try {
      await deleteImageFromDB(key);
      addLog(`[ASSETS] Reset custom image for ${IMAGE_MAPPING[key].label}.`);
      setPreviewImages(prev => ({ 
        ...prev, 
        [key]: `/${IMAGE_MAPPING[key].originalFile}` 
      }));
    } catch (err) {
      console.error(err);
      addLog(`[ASSETS] [ERROR] Failed to reset image.`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col z-10 font-sans"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-mono font-bold tracking-wider text-white uppercase flex items-center gap-2">
                    Admin Control Panel
                    {isAuthenticated && (
                      <span className="text-[10px] text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
                        ACTIVE_SESSION
                      </span>
                    )}
                  </h2>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-wide uppercase">
                    {isAuthenticated ? 'Manage Inquiries & Assets' : 'Admin authentication required'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-[350px] flex flex-col min-h-0">
              {isAuthenticated && (
                <div className="flex border-b border-zinc-800 px-6 bg-zinc-900/10 shrink-0">
                  <button
                    onClick={() => setActiveTab('transmissions')}
                    className={`py-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'transmissions'
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Inquiries Log ({messages.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('assets')}
                    className={`py-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'assets'
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Assets Manager
                  </button>
                </div>
              )}

              <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
                {!isAuthenticated ? (
                  /* AUTHENTICATION FORM SCREEN */
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-sm mx-auto">
                    <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-full relative group">
                      <KeyRound className="w-10 h-10 text-indigo-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                        ENTER ACCESS PASSCODE
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-sans leading-normal">
                        Authentication required to access control panel resources.
                      </p>
                    </div>

                    <form 
                      onSubmit={(e) => { e.preventDefault(); verifyPasscode(); }}
                      className="w-full space-y-4"
                    >
                      <div className="relative">
                        <input
                          type="password"
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800 focus:border-indigo-500/40 focus:outline-none text-sm text-indigo-400 tracking-widest text-center font-mono placeholder-zinc-700"
                          autoFocus
                        />
                      </div>

                      {passcodeError && (
                        <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 text-[11px] font-mono rounded-lg flex items-center gap-2 justify-center">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {passcodeError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isVerifying ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            VERIFYING...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            LOG IN
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : activeTab === 'transmissions' ? (
                  /* AUTHENTICATED SYSTEM DASHBOARD SCREEN - TRANSMISSIONS */
                  <div className="flex-1 p-6 flex flex-col min-h-0">
                    <div className="flex-1 flex flex-col space-y-4 min-h-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                            Inquiries Database
                            <span className="text-[9px] text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono">
                              {messages.length} messages stored
                            </span>
                          </h3>
                          <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">Read messages received from your portfolio contact form</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={loadMessages}
                            disabled={isLoadingMessages}
                            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono rounded border border-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                            REFRESH
                          </button>
                          
                          {messages.length > 0 && (
                            <button
                              onClick={handlePurgeAllMessages}
                              className="px-2.5 py-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 text-[10px] font-mono rounded border border-red-500/20 transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              DELETE ALL
                            </button>
                          )}

                          <button
                            onClick={handleLogout}
                            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 text-[10px] font-mono rounded border border-zinc-800 transition-colors cursor-pointer"
                          >
                            LOG OUT
                          </button>
                        </div>
                      </div>

                      {/* Messages List */}
                      <div className="flex-1 overflow-y-auto space-y-4 max-h-[500px] pr-2">
                        {isLoadingMessages ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500 space-y-2">
                            <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                            <span className="font-mono text-xs uppercase tracking-widest">loading messages...</span>
                          </div>
                        ) : messages.length === 0 ? (
                          <div className="py-16 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col items-center justify-center space-y-2">
                            <Mail className="w-8 h-8 text-zinc-700 animate-pulse" />
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">[NO INCOMING MESSAGES]</span>
                          </div>
                        ) : (
                          messages.map((msg) => (
                            <div 
                              key={msg.id}
                              className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/35 transition-colors relative group/msg space-y-3"
                            >
                              <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-zinc-800">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wide">{msg.name}</span>
                                    <span className="text-[9px] font-mono text-zinc-500">({msg.email})</span>
                                  </div>
                                  <div className="text-[9px] text-indigo-400/80 font-mono uppercase tracking-wider">
                                    ID: {msg.id} // TS: {new Date(msg.timestamp).toLocaleString()}
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                                  title="Delete message"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-[12px] text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap pl-1 border-l-2 border-indigo-500/30">
                                {msg.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* AUTHENTICATED SYSTEM DASHBOARD SCREEN - ASSETS REGISTRY */
                  <div className="flex-1 p-6 flex flex-col min-h-0 space-y-5">
                    
                    {/* CV Document Upload Banner Card */}
                    <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/10 hover:bg-indigo-950/20 transition-colors flex flex-col sm:flex-row gap-4 items-center shrink-0">
                      <div className="relative w-12 h-12 rounded-lg border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-indigo-400" />
                        {isUploadingCV && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                            <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Curriculum Vitae (CV) Document</h4>
                        <p className="text-[10px] text-zinc-400 font-mono">Upload a PDF or Word document (.docx, .doc) for visitors to download</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5 uppercase font-bold select-none shadow-[0_0_10px_rgba(79,70,229,0.2)]">
                          <Upload className="w-3.5 h-3.5" />
                          Upload CV
                          <input 
                            type="file" 
                            accept=".pdf,.docx,.doc" 
                            className="hidden" 
                            onChange={handleCVChange}
                            disabled={isUploadingCV}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col space-y-4 min-h-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-white">Media Assets Registry</h3>
                          <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">Upload custom images to update your portfolio sections</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={async () => {
                              const currentPasscode = sessionStorage.getItem('admin_passcode') || passcode;
                              addLog(`[ASSETS] Starting bulk filesystem synchronization...`);
                              await syncImagesToFilesystem(currentPasscode);
                              addLog(`[ASSETS] Sync operation complete.`);
                            }}
                            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono rounded border border-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            SYNC ALL
                          </button>

                          <button
                            onClick={handleLogout}
                            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 text-[10px] font-mono rounded border border-zinc-800 transition-colors cursor-pointer"
                          >
                            LOG OUT
                          </button>
                        </div>
                      </div>

                      {/* Assets Grid */}
                      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] pr-2">
                        {(Object.keys(IMAGE_MAPPING) as ImageKey[]).map((key) => {
                          const mapping = IMAGE_MAPPING[key];
                          const preview = previewImages[key];
                          const isUploading = uploadingKeys[key];

                          return (
                            <div 
                              key={key}
                              className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/35 transition-colors flex gap-4 items-center"
                            >
                              {/* Preview Thumbnail */}
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0 flex items-center justify-center">
                                {preview ? (
                                  <img 
                                    src={preview} 
                                    alt={mapping.label}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <ImageIcon className="w-5 h-5 text-zinc-600 animate-pulse" />
                                )}
                                
                                {isUploading && (
                                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                                  </div>
                                )}
                              </div>

                              {/* Details and Actions */}
                              <div className="flex-1 min-w-0 space-y-1.5">
                                <div>
                                  <h4 className="text-[11px] font-mono font-bold text-white truncate uppercase tracking-wider">{mapping.label}</h4>
                                  <p className="text-[9px] text-zinc-500 font-mono truncate lowercase">{mapping.originalFile}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <label className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[9px] font-mono rounded border border-zinc-800 hover:border-indigo-500/20 transition-all cursor-pointer flex items-center gap-1 uppercase select-none">
                                    <Upload className="w-3 h-3" />
                                    UPLOAD
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={(e) => handleFileChange(key, e)}
                                      disabled={isUploading}
                                    />
                                  </label>

                                  <button
                                    onClick={() => handleResetImage(key)}
                                    className="px-2 py-1 bg-zinc-900 hover:bg-red-950/10 text-zinc-400 hover:text-red-400 text-[9px] font-mono rounded border border-zinc-800 hover:border-red-500/10 transition-all cursor-pointer flex items-center gap-1 uppercase"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    RESET
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Console Log Output Footer */}
            <div className="border-t border-zinc-800 p-3 bg-[#0a0a0d] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shrink-0 font-mono">
              {/* Console log list (stacked logs) */}
              <div className="flex-1 text-[9px] text-zinc-400 h-10 overflow-y-auto select-none bg-zinc-950 p-1.5 rounded border border-zinc-800 leading-normal uppercase">
                {consoleLogs.map((log, i) => (
                  <div key={i} className="truncate">{log}</div>
                ))}
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-6 text-[9px] uppercase tracking-widest text-zinc-500 shrink-0">
                <span className="text-indigo-400 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  ADMIN_SESSION
                </span>
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="md:hidden py-1 px-3 bg-red-950/30 hover:bg-red-950/50 text-red-400 rounded border border-red-500/20 transition-all cursor-pointer font-bold"
                  >
                    LOG OUT
                  </button>
                )}
                <span>ADMIN: SARKER.AU</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
