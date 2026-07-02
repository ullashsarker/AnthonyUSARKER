import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = (field: string, val: string) => {
    if (focusedField === field) {
      setFocusedField(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
      {/* Contact Information Pane */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest text-cyan-500 uppercase font-bold">
              Secure Channels
            </span>
            <h3 className="font-display font-semibold text-2xl text-white">
              Let's Architect Something Great
            </h3>
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed font-sans">
            Have a custom software design, bulk automated system proposal, or an interesting operational workflow to discuss? Let's connect and build a highly calibrated system tailored to your technical needs.
          </p>

          <div className="space-y-4 pt-4">
            {/* Direct Email Link */}
            <a 
              href="mailto:anthonyusarker@gmail.com" 
              className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 group"
            >
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:bg-cyan-500/20 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase block">Send Direct Mail</span>
                <span className="text-sm font-sans font-medium text-zinc-200 group-hover:text-cyan-300 transition-colors">
                  anthonyusarker@gmail.com
                </span>
              </div>
            </a>

            {/* Location Coordinate Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 group">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase block">Operating Base</span>
                <span className="text-sm font-sans font-medium text-zinc-200">
                  Khulna, Bangladesh
                </span>
              </div>
            </div>

            {/* WhatsApp Connect Card with QR Code */}
            <div className="p-5 rounded-xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center gap-5 bg-white/[0.02]">
              {/* QR Code Container */}
              <div className="relative w-24 h-24 bg-white p-1.5 rounded-lg shrink-0 overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.15)] border border-green-500/20 group">
                <img 
                  src="image_6da57b.png" 
                  onError={(e) => {
                    e.currentTarget.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fwa.me%2F14709302244";
                  }}
                  alt="WhatsApp QR Code" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[9px] font-bold text-green-600 bg-white px-1.5 py-0.5 rounded shadow">SCAN</span>
                </div>
              </div>
              
              <div className="text-center sm:text-left space-y-2">
                <div>
                  <span className="font-mono text-[9px] text-green-400 uppercase tracking-widest block font-bold">Instant Messenger</span>
                  <h4 className="text-xs font-bold text-white mt-0.5">Scan to Chat</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-normal">
                    Scan the QR code or click below to start a secure chat session directly.
                  </p>
                </div>
                
                <a 
                  href="https://wa.me/14709302244"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 text-[10px] font-mono font-medium border border-green-500/30 transition-all cursor-pointer"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.022-.015-.022-.015-.403-.206-.118-.06-.59-.29-.683-.34-.09-.047-.156-.071-.226.04-.07.11-.271.341-.332.409-.06.068-.12.076-.226.024-.114-.055-.48-.177-.915-.566-.337-.3-.564-.67-.631-.782-.067-.11-.007-.17.048-.223.05-.047.11-.128.165-.19.055-.064.073-.11.11-.184.037-.074.018-.139-.01-.19-.028-.053-.226-.547-.31-.75-.081-.197-.163-.17-.226-.173-.058-.002-.124-.002-.19-.002-.066 0-.173.024-.263.12-.09.098-.344.336-.344.818 0 .482.35.948.399 1.014.048.066.69 1.053 1.672 1.479.233.102.415.163.557.21.236.074.451.064.62.039.189-.028.58-.238.661-.468.082-.23.082-.428.058-.468-.025-.04-.09-.063-.195-.11zM12.01 21.496c-1.637 0-3.238-.44-4.637-1.27l-.332-.2-.345.09c-.43.111-1.42.368-1.42.368s.262-.962.378-1.377l.1-.358-.22-.351A9.37 9.37 0 0 1 4.148 12c0-5.178 4.218-9.397 9.402-9.397 2.509 0 4.87.978 6.643 2.756a9.345 9.345 0 0 1 2.75 6.643c0 5.183-4.218 9.394-9.395 9.394zm10.743-16.711A11.916 11.916 0 0 0 12.01 1c-6.581 0-11.936 5.352-11.936 11.934 0 2.106.541 4.162 1.571 5.993L.05 24l5.122-1.341a11.9 11.9 0 0 0 5.833 1.528h.005c6.575 0 11.93-5.35 11.93-11.934 0-3.19-1.242-6.192-3.487-8.438z"/>
                  </svg>
                  <span>Chat Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Social Icons */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500">Secure Node Links</span>
          <div className="flex items-center gap-3">
            {/* Facebook Link */}
            <MagneticButton strength={20}>
              <a 
                href="https://www.facebook.com/anthonyullashsarker" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950/80 border border-white/5 hover:border-blue-500 text-zinc-400 hover:text-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </MagneticButton>

            {/* Instagram Link */}
            <MagneticButton strength={20}>
              <a 
                href="https://www.instagram.com/your._.ullash/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950/80 border border-white/5 hover:border-pink-500 text-zinc-400 hover:text-pink-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </MagneticButton>

            {/* WhatsApp Link */}
            <MagneticButton strength={20}>
              <a 
                href="https://wa.me/14709302244" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950/80 border border-white/5 hover:border-green-500 text-zinc-400 hover:text-green-500 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.022-.015-.022-.015-.403-.206-.118-.06-.59-.29-.683-.34-.09-.047-.156-.071-.226.04-.07.11-.271.341-.332.409-.06.068-.12.076-.226.024-.114-.055-.48-.177-.915-.566-.337-.3-.564-.67-.631-.782-.067-.11-.007-.17.048-.223.05-.047.11-.128.165-.19.055-.064.073-.11.11-.184.037-.074.018-.139-.01-.19-.028-.053-.226-.547-.31-.75-.081-.197-.163-.17-.226-.173-.058-.002-.124-.002-.19-.002-.066 0-.173.024-.263.12-.09.098-.344.336-.344.818 0 .482.35.948.399 1.014.048.066.69 1.053 1.672 1.479.233.102.415.163.557.21.236.074.451.064.62.039.189-.028.58-.238.661-.468.082-.23.082-.428.058-.468-.025-.04-.09-.063-.195-.11zM12.01 21.496c-1.637 0-3.238-.44-4.637-1.27l-.332-.2-.345.09c-.43.111-1.42.368-1.42.368s.262-.962.378-1.377l.1-.358-.22-.351A9.37 9.37 0 0 1 4.148 12c0-5.178 4.218-9.397 9.402-9.397 2.509 0 4.87.978 6.643 2.756a9.345 9.345 0 0 1 2.75 6.643c0 5.183-4.218 9.394-9.395 9.394zm10.743-16.711A11.916 11.916 0 0 0 12.01 1c-6.581 0-11.936 5.352-11.936 11.934 0 2.106.541 4.162 1.571 5.993L.05 24l5.122-1.341a11.9 11.9 0 0 0 5.833 1.528h.005c6.575 0 11.93-5.35 11.93-11.934 0-3.19-1.242-6.192-3.487-8.438z"/>
                </svg>
              </a>
            </MagneticButton>

            {/* GitHub Link */}
            <MagneticButton strength={20}>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950/80 border border-white/5 hover:border-cyan-400 text-zinc-400 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </MagneticButton>

            {/* LinkedIn Link */}
            <MagneticButton strength={20}>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950/80 border border-white/5 hover:border-purple-400 text-zinc-400 hover:text-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Contact Form */}
      <div className="lg:col-span-7">
        <form 
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl glass-panel border border-white/10 box-glow-dual relative space-y-6 flex flex-col justify-between h-full bg-white/[0.03]"
        >
          {/* Form Header */}
          <div className="pb-4 border-b border-white/5">
            <h4 className="font-display font-semibold text-lg text-white">
              Transmission Terminal
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Encrypted pipeline direct to developer operational inbox.
            </p>
          </div>

          <div className="space-y-6 py-4">
            {/* Input Name field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                id="form-name"
                value={formState.name}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name", formState.name)}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-950/60 rounded-xl border border-white/5 focus:border-cyan-500/40 focus:outline-none text-sm text-white font-sans transition-colors pt-5 h-12"
              />
              <label
                htmlFor="form-name"
                className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                  focusedField === "name" || formState.name
                    ? "top-1 text-[10px] text-cyan-400 font-semibold"
                    : "top-4 text-zinc-400"
                }`}
              >
                Sender Name
              </label>
            </div>

            {/* Input Email field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                id="form-email"
                value={formState.email}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email", formState.email)}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-950/60 rounded-xl border border-white/5 focus:border-cyan-500/40 focus:outline-none text-sm text-white font-sans transition-colors pt-5 h-12"
              />
              <label
                htmlFor="form-email"
                className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                  focusedField === "email" || formState.email
                    ? "top-1 text-[10px] text-cyan-400 font-semibold"
                    : "top-4 text-zinc-400"
                }`}
              >
                Operational Email
              </label>
            </div>

            {/* Message Area field */}
            <div className="relative">
              <textarea
                name="message"
                id="form-message"
                rows={4}
                value={formState.message}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message", formState.message)}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-950/60 rounded-xl border border-white/5 focus:border-purple-500/40 focus:outline-none text-sm text-white font-sans transition-colors pt-6 min-h-[120px] resize-none"
              />
              <label
                htmlFor="form-message"
                className={`absolute left-4 transition-all pointer-events-none font-mono text-xs ${
                  focusedField === "message" || formState.message
                    ? "top-1 text-[10px] text-purple-400 font-semibold"
                    : "top-4 text-zinc-400"
                }`}
              >
                Message Details / Proposal
              </label>
            </div>
          </div>

          {/* Form Action & Feedback states */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-white/5 pt-6 mt-4">
            <div className="h-6">
              <AnimatePresence mode="wait">
                {status === "sending" && (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 text-xs text-cyan-400 font-mono"
                  >
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    Transmitting payload...
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 text-xs text-emerald-400 font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Message delivered successfully.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 text-xs text-rose-400 font-mono"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    Please fill out all operational fields.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MagneticButton strength={15}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Transmit Signal
              </button>
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
}
