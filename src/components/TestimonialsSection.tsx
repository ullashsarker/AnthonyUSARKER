import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import HologramDeveloper from "./HologramDeveloper";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right (next), -1 for left (prev)

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      quote: "Anthony built an autonomous AI workflow for our customer acquisition. It handles lead qualification on autopilot, saving our team 25+ hours a week. Truly game-changing work!",
      name: "Marcus Vance",
      role: "COO",
      company: "AutoFlow Systems",
      avatar: "MV"
    },
    {
      id: "t2",
      quote: "The custom React application designed by Anthony loads instantly and has a flawless conversion rate. His code is clean, well-documented, and highly optimized.",
      name: "Sarah Lindqvist",
      role: "CTO",
      company: "ApexRetail",
      avatar: "SL"
    },
    {
      id: "t3",
      quote: "Our Pinterest traffic went from flat to over 500k monthly viewers in just 90 days under Anthony's strategy. The automated pin scheduler he built works like magic.",
      name: "Jessica Kincaid",
      role: "Founder",
      company: "BloomBoutique",
      avatar: "JK"
    },
    {
      id: "t4",
      quote: "Anthony's Facebook lead generation funnels turned our campaign around. Our cost per lead dropped by 45% while the lead quality improved significantly.",
      name: "David R.",
      role: "Marketing Director",
      company: "NexusCorp",
      avatar: "DR"
    },
    {
      id: "t5",
      quote: "Absolutely gorgeous interface design! Anthony has a rare eye for modern aesthetics, animations, and micro-interactions that make apps feel premium.",
      name: "Elena Rostova",
      role: "Product Manager",
      company: "SlideApp",
      avatar: "ER"
    },
    {
      id: "t6",
      quote: "Anthony completely reimagined our brand identity. The logo, typography guidelines, and brand kit he created gave us the corporate maturity we needed.",
      name: "Jonathan Patel",
      role: "Managing Director",
      company: "VertexVentures",
      avatar: "JP"
    },
    {
      id: "t7",
      quote: "He integrated a fine-tuned GPT chatbot on our support portal. It resolved 70% of inbound tickets instantly without human intervention. Excellent developer!",
      name: "Mia Zhang",
      role: "Support Lead",
      company: "CloudCore",
      avatar: "MZ"
    },
    {
      id: "t8",
      quote: "Working with Anthony was a breeze. He delivered a complex full-stack dashboard ahead of schedule, with responsive charts and flawless security protocols.",
      name: "Robert Hughes",
      role: "CEO",
      company: "SaaSify Ltd",
      avatar: "RH"
    },
    {
      id: "t9",
      quote: "His approach to search SEO and Pinterest traffic automation is outstanding. We gained over 15,000 email subscribers directly from Pinterest pins.",
      name: "Amara Vance",
      role: "Content Director",
      company: "LifestyleCo",
      avatar: "AV"
    },
    {
      id: "t10",
      quote: "Our conversion rates skyrocketed after implementing Anthony's multi-stage checkout funnel. He knows exactly how to hook visitors and guide them to buy.",
      name: "Tariq Ahmed",
      role: "Founder",
      company: "ShopNation",
      avatar: "TA"
    },
    {
      id: "t11",
      quote: "From corporate brochures to business cards, Anthony's print design assets were exceptionally clean and crisp. Our trade show presentation was a huge success.",
      name: "Clara Dupont",
      role: "Event Lead",
      company: "LuxeDecor",
      avatar: "CD"
    },
    {
      id: "t12",
      quote: "Anthony is a rare talent who bridges business intelligence and high-level software engineering. He cleaned up our messy codebase and made the server 4x faster.",
      name: "Alex Mercer",
      role: "Head of Engineering",
      company: "DeltaSys",
      avatar: "AM"
    }
  ];

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="space-y-8 max-w-5xl w-full mx-auto">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">
          Testimonials
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          What Clients Say
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Work Flow Hologram Animation */}
        <div className="lg:col-span-5 flex justify-center items-center bg-zinc-900/25 border border-white/5 rounded-3xl p-4 shadow-xl relative overflow-hidden min-h-[320px] lg:min-h-[380px]">
          {/* Subtle orb background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent blur-[50px] animate-pulse" />
          </div>
          <HologramDeveloper />
        </div>

        {/* Right Column: Testimonial Reviews & Navigation */}
        <div className="lg:col-span-7 space-y-5">
          {/* Review Header + Navigation Buttons */}
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase font-semibold block">
              Active Client Reviews
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="p-2 rounded-full border border-zinc-800 hover:border-purple-500/30 bg-zinc-900/40 hover:bg-zinc-900/80 text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                className="p-2 rounded-full border border-zinc-800 hover:border-purple-500/30 bg-zinc-900/40 hover:bg-zinc-900/80 text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="relative overflow-hidden min-h-[200px] sm:min-h-[170px] flex items-center justify-center p-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-5 sm:p-7 rounded-2xl shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden"
              >
                {/* Glowing background hint */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-[40px] rounded-full pointer-events-none" />

                <div>
                  {/* Quote Icon */}
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                    <Quote className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  
                  {/* Quote content */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic px-1 font-display">
                    "{currentTestimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md shrink-0">
                    {currentTestimonial.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block leading-tight">
                      {currentTestimonial.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex flex-wrap justify-center gap-1.5 px-4 pt-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex 
                    ? "bg-purple-500 w-4 shadow-[0_0_8px_rgba(168,85,247,0.5)]" 
                    : "bg-white/10 hover:bg-white/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
