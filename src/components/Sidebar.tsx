import { motion } from "motion/react";
import { 
  Home, 
  User, 
  Briefcase, 
  FolderOpen, 
  Code2, 
  Compass, 
  Mail, 
  ArrowRight, 
  Download, 
  Facebook, 
  Instagram, 
  Github, 
  Linkedin,
  Send
} from "lucide-react";

import { usePortfolioImage } from "../lib/imageStorage";

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "projects", label: "Portfolio", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "lifestyle", label: "Expeditions", icon: Compass },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const { src: logoSrc } = usePortfolioImage("profileHeadshot");

  return (
    <aside className="sidebar-desktop fixed left-0 top-0 bottom-0 w-[240px] bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col justify-between py-6 px-4 overflow-y-auto no-scrollbar">
      {/* Logo & Navigation */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => onNavigate("hero")}>
          <div className="relative w-10 h-10 rounded-full border border-white/15 overflow-hidden shadow-lg flex items-center justify-center bg-zinc-900 shrink-0">
            <span className="font-display font-bold text-xs text-white absolute">AU</span>
            {logoSrc && (
              <img 
                src={logoSrc} 
                alt="Anthony" 
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white leading-tight">ANTHONY</h3>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wide">AI Systems & Ops Architect</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`sidebar-nav-item w-full ${isActive ? "active text-white bg-white/10 border-white/10" : "text-zinc-400 hover:text-white"}`}
              >
                <Icon className={`nav-icon w-[18px] h-[18px] ${isActive ? "text-white" : "text-zinc-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Available for Projects Box - Matte Frosted Card */}
        <div className="mx-1 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 border border-emerald-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
          <h4 className="font-display font-semibold text-sm text-white mb-1">Available for Projects</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
            Open for AI workflow architecture & high-scale development.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all cursor-pointer group shadow-sm active:scale-95"
          >
            Hire Me
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 mt-4">
        {/* Download CV */}
        <a 
          href="/api/download-cv" 
          download="Anthony_CV.pdf"
          className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </a>

        {/* Social */}
        <div className="px-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block mb-2 font-mono">
            Direct Channels
          </span>
          <div className="flex items-center gap-2">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/anthonysarker/", label: "LinkedIn", color: "hover:text-sky-400" },
              { icon: Send, href: "https://t.me/Ant_Sarker", label: "Telegram", color: "hover:text-cyan-400" },
              { icon: Github, href: "https://github.com/ullashsarker", label: "GitHub", color: "hover:text-white" },
              { icon: Facebook, href: "https://www.facebook.com/anthonyullashsarker", label: "Facebook", color: "hover:text-blue-400" },
              { icon: Instagram, href: "https://www.instagram.com/your._.ullash/", label: "Instagram", color: "hover:text-pink-400" },
            ].map(({ icon: Icon, href, label, color }) => (
              <a 
                key={label} 
                href={href} 
                target="_blank" 
                rel="noreferrer" 
                aria-label={label}
                title={label}
                className={`w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 ${color} hover:border-white/20 hover:bg-white/10 transition-all`}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
