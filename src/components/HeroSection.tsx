import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono font-semibold text-purple-400 tracking-wider uppercase shadow-inner"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse badge-pulse" />
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
            <h2 className="font-display text-xl sm:text-2xl text-slate-300 font-medium">
              I Build Systems That Make an{" "}
              <span className="text-gradient-warm font-bold">Impact.</span>
            </h2>
            <div className="h-7 flex items-center">
              <Typewriter
                phrases={[
                  "AI Operations Expert",
                  "Full-Stack Developer",
                  "Pinterest Marketing Specialist"
                ]}
                typingSpeed={70}
                deletingSpeed={30}
                pauseDuration={2500}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-sm sm:text-[15px] max-w-lg leading-relaxed"
          >
            I'm a Full-Stack Developer helping startups and businesses create
            high-performance digital products and automated systems users love.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton strength={15}>
              <button
                onClick={() => onNavigate("projects")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold uppercase tracking-wider glow-button transition-all cursor-pointer group"
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>

            <button
              onClick={() => onNavigate("about")}
              className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-white/5 transition-all">
                <Play className="w-3.5 h-3.5 ml-0.5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
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
            <span className="text-[11px] text-slate-500 font-medium block mb-3">Trusted by clients worldwide</span>
            <div className="flex flex-wrap items-center gap-6 text-slate-500">
              {["Fiverr", "Upwork", "Pinterest", "Canva", "Mailgun"].map((brand) => (
                <span key={brand} className="text-sm font-semibold tracking-wide opacity-40 hover:opacity-70 transition-opacity cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Hero Image with Gradient Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-[320px] h-[380px] sm:w-[400px] sm:h-[460px] lg:w-[420px] lg:h-[480px] group">
            {/* Gradient Orb Behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-pink-500/20 blur-[70px] animate-pulse-glow" />
            </div>

            {/* Double Frame Effect */}
            <div className="absolute inset-0 border border-white/5 rounded-3xl transform rotate-3 scale-[0.97] origin-center transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />
            <div className="absolute inset-0 border border-cyan-400/20 rounded-3xl transform -rotate-3 scale-[0.98] origin-center transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />

            {/* Main Hero Image Frame wrapper */}
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40">
              <img
                src={heroSrc}
                alt="Anthony Ullash Sarker"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle glass overlay on bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-60" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -right-4 sm:-right-6 top-1/4 z-20 px-4 py-3 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center font-display font-bold text-base text-white shadow-inner">
                3+
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
              className="absolute -left-6 sm:-left-8 bottom-12 z-20 px-4 py-3 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-display font-bold text-base text-white shadow-inner">
                50+
              </div>
              <div className="leading-tight">
                <span className="text-[9px] text-zinc-400 font-medium block">Completed</span>
                <span className="text-[10px] text-white font-bold block uppercase tracking-wider">Projects</span>
              </div>
            </motion.div>

            {/* Decorative floating elements */}
            <div className="absolute top-8 -left-4 w-3 h-3 rounded-full bg-purple-400/40 floating-dot" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-16 -right-6 w-4 h-4 rounded-full border border-pink-400/30 floating-ring" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 -left-8 w-2 h-2 rounded-full bg-cyan-400/50 floating-dot" style={{ animationDelay: "1s" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
