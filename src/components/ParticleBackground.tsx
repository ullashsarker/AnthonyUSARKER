import { useEffect, useRef } from "react";

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

  useEffect(() => {
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
      const radius = Math.random() * (width * 0.15) + width * 0.25; // Large size
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Ultra slow movement
        vy: (Math.random() - 0.5) * 0.3,
        radius,
        colorStart,
        colorEnd,
      };
    };

    // 3 premium ambient color orbs
    // 1. Soft Violet-Purple Glow
    orbs.push(createOrb("rgba(139, 92, 246, 0.08)", "rgba(139, 92, 246, 0.01)"));
    // 2. Soft Indigo-Blue Glow
    orbs.push(createOrb("rgba(79, 70, 229, 0.07)", "rgba(79, 70, 229, 0.01)"));
    // 3. Soft Cyan Glow
    orbs.push(createOrb("rgba(6, 182, 212, 0.05)", "rgba(6, 182, 212, 0.005)"));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Adjust orb sizes based on new screen size
      orbs.forEach(orb => {
        orb.radius = Math.random() * (width * 0.15) + width * 0.25;
      });
    };

    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render large radial gradients that drift slowly
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce from boundaries with radius offset (drift slightly offscreen is okay)
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

        // Draw radial gradient orb
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
  }, []);

  return (
    <canvas
      id="particles-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
