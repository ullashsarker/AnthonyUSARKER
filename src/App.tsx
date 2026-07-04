import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, User, Briefcase, FolderOpen, Code2, Compass, Mail,
  Menu, X, Volume2, VolumeX, Sparkles, ArrowRight
} from "lucide-react";

import ParticleBackground from "./components/ParticleBackground";
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import SkillsGrid from "./components/SkillsGrid";
import Timeline from "./components/Timeline";
import ProjectsGrid from "./components/ProjectsGrid";
import StatsBar from "./components/StatsBar";
import TestimonialsSection from "./components/TestimonialsSection";
import LifestyleGallery from "./components/LifestyleGallery";
import ContactForm from "./components/ContactForm";
import AdminDashboardModal from "./components/AdminDashboardModal";
import { usePortfolioImage } from "./lib/imageStorage";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Audio & Page States
  const [isLoaded, setIsLoaded] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const hasInteractedRef = useRef(false);
  const hasSpokenRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { src: headshotSrc } = usePortfolioImage("profileHeadshot");
  const { src: eliteSrc } = usePortfolioImage("lifestyleElite");

  // Robust voice intro
  const speakWelcomeMessage = () => {
    if (!("speechSynthesis" in window)) return;
    if (hasSpokenRef.current) return;
    const text = "Hello, welcome to my portfolio website. It's me, Anthony. I am glad you have visited my personal workspace. As a full-stack developer and AI operations specialist, I focus on building smart, automated systems and high-performance digital environments. Please feel free to explore my projects. If you would like to connect, you can reach out via the contact section. Enjoy your visit.";
    const doSpeak = () => {
      if (hasSpokenRef.current) return;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      hasSpokenRef.current = true;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith("en") &&
               (v.name.toLowerCase().includes("male") ||
                v.name.includes("David") || v.name.includes("Alex") ||
                v.name.includes("Daniel") || v.name.includes("Google UK English Male"))
      ) || voices.find((v) => v.lang.startsWith("en"));
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
      utterance.volume = 0.40;
      window.speechSynthesis.speak(utterance);
    };
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) { doSpeak(); }
    else {
      const onVoicesReady = () => { doSpeak(); window.speechSynthesis.removeEventListener("voiceschanged", onVoicesReady); };
      window.speechSynthesis.addEventListener("voiceschanged", onVoicesReady);
    }
  };

  // Initialize audio
  useEffect(() => {
    const audio = new Audio("/audio/bg_music.mp3");
    audio.loop = true;
    audio.volume = 0.08;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  // Detect first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      setTimeout(() => {
        speakWelcomeMessage();
        if (audioRef.current && isPlaying) {
          audioRef.current.play().catch(err => console.warn("Audio blocked:", err));
        }
      }, 100);
      window.removeEventListener("mousedown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
    window.addEventListener("mousedown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true });
    return () => {
      window.removeEventListener("mousedown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    try {
      if (!audioRef.current.paused && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      } else {
        audioRef.current.play().catch(err => console.error("Audio failed:", err));
        setIsPlaying(true);
      }
    } catch (err) { console.error("Audio toggle failed:", err); }
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "skills", "experience", "projects", "lifestyle", "contact"];
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

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const mobileNavItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "projects", label: "Portfolio", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "lifestyle", label: "Expeditions", icon: Compass },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-300 font-sans selection:bg-purple-500/30 selection:text-purple-200 relative overflow-x-hidden">

      {/* Particles Background */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-zinc-950/10" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-[-150px] left-[10%] w-[500px] h-[500px] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-150px] right-[10%] w-[500px] h-[500px] bg-indigo-900/15 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Desktop Sidebar */}
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Mobile Top Nav */}
      <header className="mobile-top-nav fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3" onClick={() => scrollToSection("hero")}>
            <div className="relative w-9 h-9 rounded-full border border-zinc-800 overflow-hidden shadow-lg flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shrink-0">
              <span className="font-display font-bold text-xs text-white absolute">AU</span>
              {headshotSrc && (
                <img 
                  src={headshotSrc} 
                  alt="Anthony" 
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <span className="font-display font-bold text-sm text-white">ANTHONY</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-1 overflow-hidden"
            >
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => scrollToSection(item.id)}
                    className={`sidebar-nav-item w-full ${activeSection === item.id ? "active" : ""}`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area — offset by sidebar on desktop, offset by top nav on mobile */}
      <main className="lg:ml-[240px] relative z-10 pt-16 lg:pt-0">
        {/* Top Nav Bar (desktop only, inside content area) */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-zinc-950/60 backdrop-blur-sm sticky top-0 z-30">
          <nav className="flex items-center gap-1">
            {mobileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeSection === item.id
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Let's Talk
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8">

          {/* 1. HERO */}
          <HeroSection onNavigate={scrollToSection} />

          {/* 2. SERVICES */}
          <ServicesSection />

          {/* 3. ABOUT */}
          <section id="about" className="py-20 border-t border-white/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="relative space-y-2 pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
                <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">Profile</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">About Me</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 opacity-20 group-hover:opacity-30 transition-opacity" />
                    <img src={eliteSrc} alt="Anthony Ullash Sarker" referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top rounded-2xl border border-white/10 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="font-display font-semibold text-xl text-white">Bridging Analytics & Elite Software Systems</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Equipped with an academic background in <span className="text-purple-400 font-medium">BBA (Honours) in Accounting from Govt. Hazi Muhammad Mohsin College, Khulna</span>, Anthony drives analytical thinking and meticulous data precision directly into advanced software engineering.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Throughout years of active technical specialization, Anthony has built a strong foundation in building custom AI-driven utilities, orchestrating automated digital environments, advanced prompt engineering, and eliminating infrastructure bugs.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5">
                    {[
                      { label: "Experience", value: "3+ Years" },
                      { label: "Delivered", value: "15+ Apps" },
                      { label: "Email Rate", value: "98% Inbox" },
                      { label: "Core OS", value: "Linux" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[10px] text-slate-500 uppercase font-medium block">{stat.label}</span>
                        <span className="font-display font-bold text-base text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 4. SKILLS */}
          <section id="skills" className="py-20 border-t border-white/5">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="relative space-y-2 pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
                <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">Capabilities</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Technical Arsenal</h2>
              </div>
              <SkillsGrid />
            </motion.div>
          </section>

          {/* 5. EXPERIENCE */}
          <section id="experience" className="py-20 border-t border-white/5">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="relative space-y-2 pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
                <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">Career</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Operational History</h2>
              </div>
              <Timeline />
            </motion.div>
          </section>

          {/* 6. PROJECTS */}
          <section id="projects" className="py-20 border-t border-white/5">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="relative space-y-2 pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
                  <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                  <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">My Work</span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Featured Projects</h2>
                </div>
                <button className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer font-medium">
                  View All Projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <ProjectsGrid />
            </motion.div>
          </section>

          {/* 7. STATS BAR */}
          <StatsBar />

          {/* 8. TESTIMONIALS */}
          <section className="py-20 border-t border-white/5">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
              <TestimonialsSection />
            </motion.div>
          </section>

          {/* 9. LIFESTYLE */}
          <section id="lifestyle" className="py-20 border-t border-white/5">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="relative space-y-2 pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
                <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">Expeditions</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">The Traveling Developer</h2>
              </div>
              <LifestyleGallery />
            </motion.div>
          </section>

          {/* 10. CONTACT */}
          <section id="contact" className="py-20 border-t border-white/5 pb-32">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-12">
              <div className="relative space-y-2 pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
                <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
                <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">Get In Touch</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Let's Work Together</h2>
              </div>
              <ContactForm />
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="lg:ml-[240px] border-t border-white/5 bg-zinc-950/90 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <span>© 2026 Anthony Ullash Sarker</span>
            <span
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-dashboard'))}
              className="cursor-pointer hover:text-purple-400 transition-colors flex items-center gap-1"
              title="Admin Console"
            >
              v4.2.0 <span className="text-[8px] border border-slate-700 px-1 py-0.5 rounded">[access]</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Online
            </span>
            <span>Khulna, BD</span>
          </div>
        </div>
      </footer>

      <AdminDashboardModal />

      {/* Audio Controller */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button onClick={toggleAudio}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 hover:border-purple-400/30 text-white shadow-xl transition-all cursor-pointer group"
            title={isPlaying ? "Pause Music" : "Play Music"}>
            <div className="flex items-end gap-0.5 h-4 w-5 justify-center">
              {isPlaying ? (
                <>
                  <span className="w-0.5 h-4 bg-purple-400 rounded-full audio-bar audio-bar-1" />
                  <span className="w-0.5 h-4 bg-indigo-400 rounded-full audio-bar audio-bar-2" />
                  <span className="w-0.5 h-4 bg-purple-400 rounded-full audio-bar audio-bar-3" />
                  <span className="w-0.5 h-4 bg-indigo-400 rounded-full audio-bar audio-bar-4" />
                </>
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
              )}
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
              {isPlaying ? "On" : "Off"}
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
