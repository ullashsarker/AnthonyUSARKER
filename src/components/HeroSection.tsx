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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center w-full">
        {/* Left: Text Content */}
        <div className="space-y-6 z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-purple-300"
          >
            HELLO, I'M
          </motion.span>

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
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer group"
              >
                View My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>

            <button
              onClick={() => onNavigate("about")}
              className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-purple-400 transition-colors">
                <Play className="w-3.5 h-3.5 ml-0.5" />
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
          <div className="relative w-[320px] h-[380px] sm:w-[400px] sm:h-[460px] lg:w-[440px] lg:h-[500px]">
            {/* Gradient Orb Behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-pink-500/30 blur-[60px] animate-pulse-glow" />
            </div>

            {/* Main Hero Image */}
            <img
              src={heroSrc}
              alt="Anthony Ullash Sarker"
              className="relative z-10 w-full h-full object-cover object-top rounded-3xl"
            />

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -right-2 sm:right-0 top-1/4 z-20 px-4 py-3 rounded-xl bg-[#0D0D20]/90 backdrop-blur-md border border-white/10 shadow-xl"
            >
              <span className="font-display font-bold text-2xl text-white block">3+</span>
              <span className="text-[10px] text-slate-400 font-medium">Years of<br/>Experience</span>
            </motion.div>

            {/* Decorative floating elements */}
            <div className="absolute top-8 -left-4 w-3 h-3 rounded-full bg-purple-400/40 floating-dot" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-12 -right-6 w-4 h-4 rounded-full border border-pink-400/30 floating-ring" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 -left-8 w-2 h-2 rounded-full bg-cyan-400/50 floating-dot" style={{ animationDelay: "1s" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
