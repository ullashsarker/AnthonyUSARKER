import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  Sparkles,
  Layers,
  ShieldCheck,
  Zap
} from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  fullDesc: string;
  architectureDetails: string[];
  techStack: string[];
  metrics: { label: string; value: string };
  glowColor: "cyan" | "purple" | "dual";
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onContactClick?: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
  onContactClick
}: ProjectDetailModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Subtle Ambient Light inside modal */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4 relative z-10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/15 font-semibold">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                  {project.metrics.label}: {project.metrics.value}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 relative z-10 text-slate-300">
            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Project Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {project.fullDesc}
              </p>
            </div>

            {/* Architecture & Engineering Highlights */}
            <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-300" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  System Architecture & Solved Challenges
                </h4>
              </div>
              <ul className="space-y-2">
                {project.architectureDetails.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Technologies & Architecture Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-950/80 border border-white/10 text-slate-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 border-t border-white/10 bg-zinc-950/80 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live App / Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                if (onContactClick) {
                  onContactClick();
                } else {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] cursor-pointer active:scale-95"
            >
              <span>Discuss Similar Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
