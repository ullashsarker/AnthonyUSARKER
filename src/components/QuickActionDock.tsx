import React from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  Linkedin, 
  Github, 
  Download, 
  Volume2, 
  VolumeX, 
  ArrowUpRight,
  Send,
  CalendarCheck
} from "lucide-react";

interface QuickActionDockProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
  onContactClick: () => void;
}

// Brand SVGs
const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C15.753 1.876 13.278 1.84 10.639 1.84 5.205 1.84.78 6.26.777 11.704c-.001 1.73.457 3.419 1.32 4.93l-.995 3.635 3.722-.976zm11.365-6.85c-.3-.15-1.77-.875-2.045-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.777-1.665-2.076-.175-.3-.02-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.925-2.235-.24-.58-.49-.5-.676-.51-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.276.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.116 4.523.714.31 1.27.495 1.703.633.717.227 1.37.195 1.887.118.577-.087 1.77-.724 2.02-1.425.25-.7.25-1.3 1.175-1.425.075-.025.15-.05.225-.075z" />
  </svg>
);

export default function QuickActionDock({
  isPlaying,
  onToggleAudio,
  onContactClick
}: QuickActionDockProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      aria-label="Quick Actions Dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Primary Contact / Book Call Button */}
        <button
          onClick={onContactClick}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-md hover:shadow-cyan-500/20 active:scale-95 cursor-pointer shrink-0"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Book a Call</span>
          <span className="sm:hidden">Connect</span>
        </button>

        <div className="w-[1px] h-5 bg-white/10 mx-0.5" />

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/8801700000000"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          aria-label="WhatsApp"
          className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all border border-transparent hover:border-emerald-500/20 cursor-pointer"
        >
          <WhatsAppIcon />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ullashsarker"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile"
          aria-label="GitHub Profile"
          className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/15 cursor-pointer"
        >
          <Github className="w-4 h-4" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
          className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all border border-transparent hover:border-sky-500/20 cursor-pointer"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Download Resume / CV */}
        <a
          href="/api/download-cv"
          download="Anthony_CV.pdf"
          title="Download Official CV"
          aria-label="Download CV"
          className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all border border-transparent hover:border-purple-500/20 cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </a>

        <div className="w-[1px] h-5 bg-white/10 mx-0.5" />

        {/* Background Music Audio Toggle */}
        <button
          onClick={onToggleAudio}
          title={isPlaying ? "Mute Ambient Soundtrack" : "Play Ambient Soundtrack"}
          aria-label="Toggle Soundtrack"
          className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20 cursor-pointer"
        >
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
              <span className="w-0.5 h-3 bg-cyan-400 rounded-full audio-bar audio-bar-1" />
              <span className="w-0.5 h-3.5 bg-purple-400 rounded-full audio-bar audio-bar-2" />
              <span className="w-0.5 h-2.5 bg-cyan-400 rounded-full audio-bar audio-bar-3" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
