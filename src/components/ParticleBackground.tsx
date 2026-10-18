import { useEffect, useRef, useState } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorStart: string;
  colorEnd: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // If mobile, do NOT run requestAnimationFrame canvas to keep mobile touch scrolling at silky 60/120fps
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const orbs: Orb[] = [];

    // Helper to generate a large ambient blur orb
    const createOrb = (colorStart: string, colorEnd: string): Orb => {
      const radius = Math.random() * (width * 0.15) + width * 0.25;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Ultra slow movement
        vy: (Math.random() - 0.5) * 0.25,
        radius,
        colorStart,
        colorEnd,
      };
    };

    // 3 subtle ambient color orbs for desktop
    orbs.push(createOrb("rgba(139, 92, 246, 0.07)", "rgba(139, 92, 246, 0.005)"));
    orbs.push(createOrb("rgba(79, 70, 229, 0.06)", "rgba(79, 70, 229, 0.005)"));
    orbs.push(createOrb("rgba(6, 182, 212, 0.04)", "rgba(6, 182, 212, 0.004)"));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      orbs.forEach(orb => {
        orb.radius = Math.random() * (width * 0.15) + width * 0.25;
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius / 2) {
          orb.x = -orb.radius / 2;
          orb.vx *= -1;
        }
        if (orb.x > width + orb.radius / 2) {
          orb.x = width + orb.radius / 2;
          orb.vx *= -1;
        }
        if (orb.y < -orb.radius / 2) {
          orb.y = -orb.radius / 2;
          orb.vy *= -1;
        }
        if (orb.y > height + orb.radius / 2) {
          orb.y = height + orb.radius / 2;
          orb.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, orb.colorStart);
        gradient.addColorStop(0.5, orb.colorEnd);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  if (isMobile) {
    // Pure lightweight CSS background for mobile with zero GPU calculation
    return (
      <div 
        aria-hidden="true" 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-[90px]" />
      </div>
    );
  }

  return (
    <canvas
      id="particles-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
