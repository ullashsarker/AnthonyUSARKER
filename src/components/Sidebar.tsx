import { motion } from "motion/react";
import { Home, User, Briefcase, FolderOpen, Code2, Compass, Mail, ArrowRight, Download, Facebook, Instagram, Github, Linkedin } from "lucide-react";

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
  return (
    <aside className="sidebar-desktop fixed left-0 top-0 bottom-0 w-[240px] bg-[#0D0D20]/95 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col justify-between py-6 px-4 overflow-y-auto no-scrollbar">
      {/* Logo */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => onNavigate("hero")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="font-display font-black text-sm text-white">A</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white leading-tight">ANTHONY</h3>
            <span className="text-[10px] text-purple-400 font-medium">Full-Stack Developer</span>
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
                className={`sidebar-nav-item w-full ${isActive ? "active" : ""}`}
              >
                <Icon className={`nav-icon w-[18px] h-[18px] ${isActive ? "text-purple-400" : ""}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Freelance CTA */}
        <div className="mx-1 p-4 rounded-2xl bg-gradient-to-b from-purple-900/20 to-indigo-900/10 border border-purple-500/15">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
          <h4 className="font-display font-semibold text-sm text-white mb-1">Available for Projects</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">Let's build something amazing together!</p>
          <button
            onClick={() => onNavigate("contact")}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer group"
          >
            Hire Me
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 mt-4">
        {/* Download CV */}
        <a href="/anthony_suit.png" download="Anthony_CV.pdf" className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white transition-colors">
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </a>

        {/* Social */}
        <div className="px-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium block mb-2">Follow Me</span>
          <div className="flex items-center gap-2">
            {[
              { icon: Facebook, href: "https://www.facebook.com/anthonyullashsarker", color: "hover:text-blue-400" },
              { icon: Instagram, href: "https://www.instagram.com/your._.ullash/", color: "hover:text-pink-400" },
              { icon: Github, href: "https://github.com", color: "hover:text-white" },
              { icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-300" },
            ].map(({ icon: Icon, href, color }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className={`w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 ${color} hover:border-white/10 transition-all`}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
