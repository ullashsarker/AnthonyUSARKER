import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "dual";
}

export default function ThreeDCard({
  children,
  className = "",
  glowColor = "cyan",
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  // Light flare positions
  const flareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const flareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates to -0.5 to 0.5 range
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowClass = 
    glowColor === "cyan" 
      ? "box-glow-cyan shadow-cyan-950/20" 
      : glowColor === "purple" 
        ? "box-glow-purple shadow-purple-950/20" 
        : "box-glow-dual";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative glass-panel rounded-2xl p-6 transition-all duration-300 select-none ${glowClass} ${
        isHovered ? "border-white/10" : "border-white/5"
      } ${className}`}
    >
      {/* Glossy reflective light flare overlay */}
      {isHovered && (
        <motion.div
          style={{
            background: `radial-gradient(circle 120px at ${flareX} ${flareY}, rgba(255,255,255,0.06), transparent)`,
          }}
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
        />
      )}
      
      {/* Content wrapper with depth */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}
