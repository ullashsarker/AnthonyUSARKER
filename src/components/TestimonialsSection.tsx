import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      quote: "Anthony is a fantastic developer! He understood our requirements perfectly and delivered beyond our expectations. The AI chatbot integration was flawless.",
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp",
      avatar: "SJ"
    },
    {
      id: "t2",
      quote: "Professional, creative and highly skilled. Will definitely work with Anthony again! His Pinterest marketing strategy doubled our referral traffic.",
      name: "David Brown",
      role: "Founder",
      company: "DevStudio",
      avatar: "DB"
    },
    {
      id: "t3",
      quote: "Great communication and amazing attention to detail. Highly recommended! The bulk email architecture he built has been running flawlessly for months.",
      name: "Emily Davis",
      role: "Product Manager",
      company: "InnovateTech",
      avatar: "ED"
    },
    {
      id: "t4",
      quote: "Anthony transformed our entire digital presence with his full-stack expertise. The portfolio website he designed is absolutely stunning and modern.",
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthLabs",
      avatar: "MC"
    }
  ];

  const visibleCount = 3;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const goNext = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">
            Testimonials
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            What Clients Say
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="p-2.5 rounded-full border border-white/10 hover:border-purple-500/30 bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="p-2.5 rounded-full border border-white/10 hover:border-purple-500/30 bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="hidden md:block overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${currentIndex * (100 / visibleCount + 2)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card min-w-[calc(33.333%-1rem)] flex-shrink-0 flex flex-col justify-between gap-6"
              style={{ minWidth: "calc(33.333% - 1rem)" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Quote Icon */}
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">{testimonial.name}</span>
                  <span className="text-xs text-slate-400">{testimonial.role}, {testimonial.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: Stacked cards */}
      <div className="md:hidden space-y-4">
        {testimonials.slice(0, 3).map((testimonial) => (
          <div key={`mobile-${testimonial.id}`} className="testimonial-card flex flex-col justify-between gap-4">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                <Quote className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {testimonial.quote}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">{testimonial.name}</span>
                <span className="text-xs text-slate-400">{testimonial.role}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
