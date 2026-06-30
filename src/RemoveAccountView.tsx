/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, AlertTriangle, ArrowLeft, Lock, User, 
  CheckCircle, Loader2, Info, ShieldAlert, Check, Copy
} from 'lucide-react';

interface RemoveAccountViewProps {
  onBack: () => void;
}

export default function RemoveAccountView({ onBack }: RemoveAccountViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Custom styled feedback messages (iframe-friendly alternative to window.alert)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Smooth scroll behavior on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleDeleteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setNotification({
        type: 'error',
        message: "Please fill in both username and password."
      });
      return;
    }

    if (!confirmDelete) {
      setNotification({
        type: 'error',
        message: "Please check the box to confirm you understand the data deletion process."
      });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const res = await fetch("https://bareeyapiendpoint.azurewebsites.net/removeaccount/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim() 
        })
      });

      const data = await res.json();
      if (data.success) {
        setNotification({
          type: 'success',
          message: "Your account has been scheduled for deletion. We are processing your request."
        });
        setUsername('');
        setPassword('');
        setConfirmDelete(false);
      } else {
        setNotification({
          type: 'error',
          message: data.message || "Invalid username or password. Please try again."
        });
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: "An error occurred. Please verify your network connection and try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-gray-900 font-sans selection:bg-red-100 selection:text-red-900 flex flex-col relative overflow-hidden">
      
      {/* Red/Amber Accent Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-linear-to-b from-red-500/5 to-transparent pointer-events-none z-0" />

      {/* Top sticky header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black rounded-xl transition-all cursor-pointer flex items-center justify-center"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center font-extrabold text-sm shadow-xs">
                B
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-gray-950">bareey</span>
                <span className="text-[10px] text-red-600 font-bold block leading-none uppercase tracking-wide">Account Control</span>
              </div>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-full border border-red-100 uppercase tracking-wider">
              Secure Endpoint
            </span>
          </div>
        </div>
      </header>

      {/* Main card box container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-150 shadow-xs p-6 sm:p-10 space-y-8"
        >
          {/* Header Text Block */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs border border-red-100/50">
              <Trash2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">Account Deletion Request</h1>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Submit an official, automated request to permanently remove your user credentials and linked files from the Bareey system.
            </p>
          </div>

          {/* Testing Phase Notice Message Box */}
          <div className="bg-[#FFFDF5] border border-amber-200/70 p-6 rounded-2xl space-y-3 text-left">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-black text-amber-900 tracking-wide uppercase">Limited Testing Phase Disclosure</h3>
                <p className="text-xs text-amber-800 leading-relaxed mt-1">
                  We are currently in a limited testing phase with family and close friends to ensure all features in Bareey work smoothly and securely before launching to the public. We are ensuring that user data removal works flawlessly before public release.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-amber-200/50">
              <span className="text-[11px] font-bold text-amber-800">In-app fully integrated deletion launches:</span>
              <span className="inline-block bg-amber-100 text-amber-900 px-3.5 py-1 rounded-lg text-xs font-black border border-amber-200 uppercase tracking-wider shadow-2xs">
                25th August 2025
              </span>
            </div>

            <p className="text-xs text-amber-700/90 leading-relaxed pt-1">
              By this date, Bareey will be opened to hundreds of users, and the account deletion option will be fully integrated within the app's settings. Until then, you can request account deletion below via this temporary secure verification form.
            </p>
          </div>

          {/* Notifications Toast */}
          <AnimatePresence mode="wait">
            {notification && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  notification.type === 'success' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                {notification.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {notification.type === 'success' ? 'Request Scheduled' : 'Validation Error'}
                  </h4>
                  <p className="text-xs mt-0.5 leading-relaxed font-semibold">
                    {notification.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deletion Credentials Form */}
          <form onSubmit={handleDeleteRequest} className="space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Username Input */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <User className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username" 
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-red-500 focus:outline-hidden transition-all text-gray-950"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-red-500 focus:outline-hidden transition-all text-gray-950"
                  />
                </div>
              </div>

            </div>

            {/* Checkbox confirmation */}
            <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl flex items-start gap-3 transition-all hover:bg-gray-100/50">
              <input 
                type="checkbox" 
                id="confirmDelete" 
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
                disabled={loading}
                className="w-4.5 h-4.5 mt-0.5 rounded-sm border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
              />
              <label htmlFor="confirmDelete" className="text-xs text-gray-600 font-bold select-none cursor-pointer leading-relaxed">
                I understand that submitting this request will schedule my Bareey account, linked wallet details, active escrow metadata, and saved profile credentials for irreversible permanent deletion.
              </label>
            </div>

            {/* Deletion Trigger CTA */}
            <AnimatePresence>
              {confirmDelete && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className="pt-2 overflow-hidden"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-red-500/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Processing request...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 text-white" />
                        <span>Request Account Deletion</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </form>

        </motion.div>
      </main>

      {/* Small Legal Disclaimer Footer block */}
      <footer className="border-t border-gray-100 bg-white py-8 mt-16 text-center text-xs text-gray-400 shrink-0 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Bareey Inc. Kaduna, Nigeria. Settle confidently.</p>
          <p className="mt-1">
            Data erasure pipeline is compliant with regional and global user protection mandates.
          </p>
        </div>
      </footer>

    </div>
  );
}
