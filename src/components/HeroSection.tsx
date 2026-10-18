import { motion } from "motion/react";
import { ArrowRight, Play, Download } from "lucide-react";
import { usePortfolioImage } from "../lib/imageStorage";
import Typewriter from "./Typewriter";
import MagneticButton from "./MagneticButton";

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { src: heroSrc } = usePortfolioImage("heroMain");

  return (
    <section id="hero" className="min-h-[calc(100vh-40px)] flex items-center py-12 relative overflow-hidden">
      {/* Grid Overlay Background */}
      <div className="absolute inset-0 grid-bg opacity-75 pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center w-full relative z-10">
        {/* Left: Text Content */}
        <div className="space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-[10px] font-mono font-semibold text-zinc-300 tracking-wider uppercase shadow-inner"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse badge-pulse" />
            <span>Available for Freelance & AI Automation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] text-white leading-[1.1] tracking-tight"
          >
            Anthony Ullash<br />Sarker
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1"
          >
            <h2 className="font-display text-xl sm:text-2xl text-zinc-300 font-medium">
              I Build Systems That Make an{" "}
              <span className="text-white font-bold border-b border-white/40 pb-0.5">Impact.</span>
            </h2>
            <div className="min-h-[3rem] sm:min-h-[2.5rem] flex items-center">
              <Typewriter
                phrases={[
                  "Full-Stack Developer & AI Systems Engineer",
                  "AI Operations & Workflow Architect",
                  "High-Performance Cloud & Web Engineer"
                ]}
                typingSpeed={60}
                deletingSpeed={25}
                pauseDuration={2400}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 text-sm sm:text-[15px] max-w-lg leading-relaxed"
          >
            Full-Stack Developer & AI Systems Engineer specializing in automated digital pipelines,
            custom AI agents, and high-performance web applications engineered for scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <MagneticButton strength={15}>
              <button
                onClick={() => onNavigate("projects")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group shadow-[0_4px_20px_rgba(255,255,255,0.12)] active:scale-95 btn-interactive"
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>

            <a
              href="/anthony_cv.pdf"
              download="Anthony_Ullash_Sarker_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group shadow-sm active:scale-95 btn-interactive"
              title="Download Official CV (PDF)"
            >
              <Download className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
              <span>Download CV</span>
            </a>

            <button
              onClick={() => onNavigate("about")}
              className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors cursor-pointer group btn-interactive"
            >
              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                <Play className="w-3.5 h-3.5 ml-0.5 text-zinc-200 group-hover:text-white transition-colors" />
              </div>
              Watch Intro
            </button>
          </motion.div>

          {/* Trusted logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-6 border-t border-white/5"
          >
            <span className="text-[11px] text-zinc-500 font-medium block mb-3 font-mono uppercase tracking-wider">
              Trusted by clients worldwide
            </span>
            <div className="flex flex-wrap items-center gap-6 text-zinc-500">
              {["Fiverr", "Upwork", "Pinterest", "Canva", "Mailgun"].map((brand) => (
                <span key={brand} className="text-sm font-semibold tracking-wide opacity-40 hover:opacity-80 hover:text-zinc-300 transition-opacity cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Hero Image with Matte Lighting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-[320px] h-[380px] sm:w-[400px] sm:h-[460px] lg:w-[420px] lg:h-[480px] group">
            {/* Matte Ambient Lighting Behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-white/10 via-zinc-600/5 to-transparent blur-[70px]" />
            </div>

            {/* Subtle Metallic Double Frame Effect */}
            <div className="absolute inset-0 border border-white/5 rounded-3xl transform rotate-3 scale-[0.97] origin-center transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl transform -rotate-3 scale-[0.98] origin-center transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />

            {/* Main Hero Image Frame wrapper */}
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/60 shadow-2xl">
              <img
                src={heroSrc}
                alt="Anthony Ullash Sarker"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle matte glass overlay on bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-80" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -right-4 sm:-right-6 top-1/4 z-20 px-4 py-3 rounded-xl bg-[#121212]/90 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-display font-bold text-base text-white shadow-inner">
                4+
              </div>
              <div className="leading-tight">
                <span className="text-[9px] text-zinc-400 font-medium block">Years of</span>
                <span className="text-[10px] text-white font-bold block uppercase tracking-wider">Experience</span>
              </div>
            </motion.div>

            {/* Projects Completed Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -left-6 sm:-left-8 bottom-12 z-20 px-4 py-3 rounded-xl bg-[#121212]/90 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-display font-bold text-base text-white shadow-inner">
                80+
              </div>
              <div className="leading-tight">
                <span className="text-[9px] text-zinc-400 font-medium block">Completed</span>
                <span className="text-[10px] text-white font-bold block uppercase tracking-wider">Projects</span>
              </div>
            </motion.div>

            {/* Decorative subtle floating elements */}
            <div className="absolute top-8 -left-4 w-2.5 h-2.5 rounded-full bg-white/20 floating-dot" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-16 -right-6 w-3.5 h-3.5 rounded-full border border-white/20 floating-ring" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 -left-8 w-2 h-2 rounded-full bg-zinc-400/40 floating-dot" style={{ animationDelay: "1s" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
