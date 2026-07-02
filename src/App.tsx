import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Settings, 
  History, 
  Layers, 
  Compass, 
  Mail, 
  ChevronDown, 
  Terminal, 
  Flame, 
  Sparkles,
  ArrowRight
} from "lucide-react";

import ParticleBackground from "./components/ParticleBackground";
import Typewriter from "./components/Typewriter";
import MagneticButton from "./components/MagneticButton";
import ThreeDCard from "./components/ThreeDCard";
import SkillsGrid from "./components/SkillsGrid";
import Timeline from "./components/Timeline";
import ProjectsGrid from "./components/ProjectsGrid";
import LifestyleGallery from "./components/LifestyleGallery";
import ContactForm from "./components/ContactForm";
import { usePortfolioImage } from "./lib/imageStorage";
import AdminDashboardModal from "./components/AdminDashboardModal";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const { src: headshotSrc } = usePortfolioImage("profileHeadshot");
  const { src: eliteSrc } = usePortfolioImage("lifestyleElite");


  // Monitor scrolling to highlight active section and apply header blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "skills", "experience", "projects", "lifestyle", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Core", icon: Flame },
    { id: "about", label: "Identity", icon: User },
    { id: "skills", label: "Skills", icon: Settings },
    { id: "experience", label: "Milestones", icon: History },
    { id: "projects", label: "Payloads", icon: Layers },
    { id: "lifestyle", label: "Expeditions", icon: Compass },
    { id: "contact", label: "Transmit", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Background Ambient Glows from the Atmospheric Theme */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Dynamic Cybernetic Particles Background (Global constellation mesh) */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <ParticleBackground />
        {/* Deep global ambient mesh overlay */}
        <div className="absolute inset-0 bg-[#050506]/5" />
      </div>

      {/* Cybernetic top laser scanning line effect (decorative) */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-purple-500 z-50 opacity-40 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

      {/* Sticky Glassmorphic Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#050506]/80 backdrop-blur-md border-b border-white/10 py-4 shadow-xl" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          
          {/* Logo Name */}
          <div 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-display font-black text-sm text-white">AU</span>
              {/* Inner glowing corner */}
              <div className="absolute inset-0.5 rounded-[6px] bg-[#050506] flex items-center justify-center">
                <span className="font-display font-black text-xs text-gradient">AU</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-display font-bold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse"></span>
                Anthony Ullash Sarker
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/80 font-mono">
                System Architecture & AI Operations
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/40 border border-white/5 backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all ${
                    isActive 
                      ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]" 
                      : "text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Contact Direct CTA Header Button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex gap-2">
              <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Status: Online
              </div>
              <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-wider text-slate-300 font-mono">Khulna, BD</div>
            </div>
            <MagneticButton strength={15}>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-cyan-400 text-xs font-mono font-semibold text-white tracking-widest uppercase transition-all shadow-[0_0_10px_rgba(255,255,255,0.02)] cursor-pointer"
              >
                Signal Link
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Main Single Page Sections Container */}
      <main className="max-w-7xl mx-auto px-6 relative z-10 pt-20">

        {/* 1. HERO SECTION */}
        <section id="hero" className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-16 text-center relative">
          <div className="space-y-8 max-w-4xl">
            
            {/* Main Profile Picture inside a glowing, neon-bordered circular frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto"
            >
              {/* Outer Neon Glow Circle (Rotating background gradient) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-indigo-500 animate-spin-slow blur-md opacity-75 shadow-[0_0_25px_rgba(6,182,212,0.4)]" />
              
              {/* Inner Circle Image Container */}
              <div className="absolute inset-[4px] rounded-full bg-white overflow-hidden border border-white/10 z-10">
                <img
                  src={headshotSrc}
                  alt="Anthony Ullash Sarker Headshot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-center scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Cyber Operational Dot badge */}
              <div className="absolute bottom-2 right-4 w-6 h-6 rounded-full bg-[#030305] border border-white/10 flex items-center justify-center z-20">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              </div>
            </motion.div>

            {/* Typography Name & System Tag */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-950/20 border border-purple-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                SYSTEM_NODE_ACTIVE
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight leading-none"
              >
                Anthony Ullash Sarker
              </motion.h1>

              {/* Animated Headlines - Typewriter Integration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="h-8 flex items-center justify-center"
              >
                <Typewriter
                  phrases={[
                    "AI Operations Expert",
                    "Full-Stack Developer",
                    "Pinterest & Growth Marketing Specialist"
                  ]}
                  typingSpeed={70}
                  deletingSpeed={30}
                  pauseDuration={2500}
                />
              </motion.div>
            </div>

            {/* Short Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Blending technical development, creative visual asset design, and cutting-edge AI orchestration into high-performance digital environments.
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              {/* Explore button */}
              <MagneticButton strength={20}>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-xs font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center gap-2 group"
                >
                  Explore Portfolio
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </MagneticButton>

              {/* Touch button */}
              <MagneticButton strength={20}>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3.5 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-cyan-400 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                >
                  Get In Touch
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Animated Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce" onClick={() => scrollToSection("about")}>
            <div className="w-6 h-10 rounded-full border border-zinc-700 flex items-start justify-center p-1.5 bg-[#030305]/40 backdrop-blur-sm">
              <div className="w-1.5 h-2 bg-cyan-400 rounded-full" />
            </div>
          </div>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="py-24 border-t border-white/5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-16"
          >
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-cyan-500 uppercase font-bold block">
                  Profile Registry
                </span>
                <h2 className="font-display font-semibold text-3xl text-white">
                  About Me
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs max-w-xs">
                Mapping analytical frameworks into robust, scalable software layers.
              </p>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Suit Image Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl p-1 box-glow-cyan overflow-hidden group">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950">
                    <img
                      src={eliteSrc}
                      alt="Anthony Ullash Sarker Professional Shot"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 filter saturate-50 group-hover:saturate-100"
                    />
                    
                    {/* Retro coordinate HUD text overlay */}
                    <div className="absolute top-4 left-4 font-mono text-[9px] text-cyan-400 bg-zinc-950/80 px-2 py-1 rounded border border-white/5">
                      NODE_ID // sarker.au
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Analytical context */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-display font-semibold text-xl text-white">
                  Bridging Financial Analytics & Elite Software Systems
                </h3>
                
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  Equipped with an academic background in <span className="text-cyan-400 font-medium">BBA (Honours) in Accounting from Govt. Hazi Muhammad Mohsin College, Khulna</span>, Anthony drives analytical thinking and meticulous data precision directly into advanced software engineering. This mathematical and structured background ensures every system is architected with complete operational efficiency, financial viability, and absolute logic.
                </p>

                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  Throughout years of active technical specialization, Anthony has built a strong foundation in building custom AI-driven utilities, orchestrating automated digital environments, advanced prompt engineering, and eliminating infrastructure bugs. From responsive layouts to optimized native interfaces, he transforms complex operational requirements into pristine digital products.
                </p>

                {/* Cyber HUD stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-white/5">
                    <span className="font-mono text-zinc-500 text-[10px] uppercase block">Operations</span>
                    <span className="font-display font-bold text-lg text-white">3+ Years</span>
                  </div>
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-white/5">
                    <span className="font-mono text-zinc-500 text-[10px] uppercase block">Delivered Apps</span>
                    <span className="font-display font-bold text-lg text-white">15+ Nodes</span>
                  </div>
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-white/5">
                    <span className="font-mono text-zinc-500 text-[10px] uppercase block">Email Warmups</span>
                    <span className="font-display font-bold text-lg text-white">98% Inbox</span>
                  </div>
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-white/5">
                    <span className="font-mono text-zinc-500 text-[10px] uppercase block">Core OS</span>
                    <span className="font-display font-bold text-lg text-white">Linux Power</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" className="py-24 border-t border-white/5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-16"
          >
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-purple-500 uppercase font-bold block">
                  Capabilities Grid
                </span>
                <h2 className="font-display font-semibold text-3xl text-white">
                  Technical Arsenal
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs max-w-xs">
                Interactive metrics grading software engineering and automated operations capabilities.
              </p>
            </div>

            {/* Interactive Grid component */}
            <SkillsGrid />
          </motion.div>
        </section>

        {/* 4. EXPERIENCE TIMELINE */}
        <section id="experience" className="py-24 border-t border-white/5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-16"
          >
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-cyan-500 uppercase font-bold block">
                  Career Registry
                </span>
                <h2 className="font-display font-semibold text-3xl text-white">
                  Operational History
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs max-w-xs">
                Documenting physical nodes of operational control and software milestones.
              </p>
            </div>

            {/* Dual Pane Timeline component */}
            <Timeline />
          </motion.div>
        </section>

        {/* 5. PROJECTS SHOWCASE */}
        <section id="projects" className="py-24 border-t border-white/5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-16"
          >
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-purple-500 uppercase font-bold block">
                  Delivered Payloads
                </span>
                <h2 className="font-display font-semibold text-3xl text-white">
                  Project Showcases
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs max-w-xs">
                Bento-style representation of systems, validation utilities, and custom applications.
              </p>
            </div>

            {/* Projects Bento Grid */}
            <ProjectsGrid />
          </motion.div>
        </section>

        {/* 6. HOBBIES & LIFESTYLE SECTION - "THE TRAVELING DEVELOPER" */}
        <section id="lifestyle" className="py-24 border-t border-white/5 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-16"
          >
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-cyan-500 uppercase font-bold block">
                  Outdoor Expeditions
                </span>
                <h2 className="font-display font-semibold text-3xl text-white">
                  The Traveling Developer
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs max-w-xs">
                Charting wilderness trails to expand cognitive boundaries.
              </p>
            </div>

            {/* Custom Gallery Component */}
            <LifestyleGallery />
          </motion.div>
        </section>

        {/* 7. ANIMATED CONTACT SECTION */}
        <section id="contact" className="py-24 border-t border-white/5 relative pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-16"
          >
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-purple-500 uppercase font-bold block">
                  Transmission Link
                </span>
                <h2 className="font-display font-semibold text-3xl text-white">
                  Get In Touch
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs max-w-xs">
                Initiate a high-speed communication channel with the operational base.
              </p>
            </div>

            {/* Contact Terminal Panel */}
            <ContactForm />
          </motion.div>
        </section>

      </main>

      {/* Cybernetic Footer */}
      <footer className="border-t border-white/10 bg-[#050506]/80 py-8 relative z-10 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <span>© 2026 Anthony Ullash Sarker. All Rights Reserved.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span 
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-dashboard'))}
              className="cursor-pointer hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              title="Open Admin Operations Console"
            >
              SYSTEM VERSION: 4.2.0-STABLE
              <span className="text-[8px] text-slate-600 hover:text-cyan-400 border border-slate-800 px-1.5 py-0.5 rounded leading-none lowercase select-none">[access]</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span>UPTIME: 99.98%</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
              LATENCY: 14MS
            </span>
            <span className="text-purple-400">ENCRYPTION: AES-256</span>
          </div>
        </div>
      </footer>
      <AdminDashboardModal />
    </div>
  );
}
