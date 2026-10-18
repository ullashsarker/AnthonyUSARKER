import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Sparkles } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
  location?: string;
}

export default function ImageLightboxModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
  location
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-3xl w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 my-4"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-zinc-950/70 border border-white/10 text-white/80 hover:text-white hover:bg-zinc-950 transition-colors cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-contain sm:object-cover"
              loading="lazy"
            />
          </div>

          {/* Footer Details */}
          <div className="p-5 bg-zinc-950/90 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-white">
                {title}
              </h4>
              {subtitle && (
                <p className="text-xs text-slate-400">
                  {subtitle}
                </p>
              )}
            </div>

            {location && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[11px] self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
