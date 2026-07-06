import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Zap, Leaf, Film, Layout, Moon, Sun, Award } from "lucide-react";

// Static data generated once to prevent flickering
const STARS_DATA = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  cx: Math.random() * 400,
  cy: Math.random() * 200,
  r: Math.random() * 1.4 + 0.3,
  delay: Math.random() * 4,
  duration: Math.random() * 2 + 2
}));

const PARTICLES_DATA = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  cx: Math.random() * 340 + 30,
  cy: Math.random() * 260 + 40,
  r: Math.random() * 2.4 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 3
}));

const RAIN_DATA = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 380 + 10,
  delay: Math.random() * 4,
  duration: Math.random() * 2 + 2.5,
  length: Math.random() * 60 + 30,
  opacity: Math.random() * 0.45 + 0.15
}));

const FIREFLIES_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  cx: Math.random() * 360 + 20,
  cy: Math.random() * 260 + 50,
  r: Math.random() * 1.8 + 0.6,
  delay: Math.random() * 4,
  duration: Math.random() * 5 + 3
}));

const CONFETTI_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  cx: Math.random() * 400,
  cy: Math.random() * -50,
  r: Math.random() * 3.5 + 0.8,
  fill: ["#ff00ff", "#00ffff", "#ffff00", "#ff3333", "#00ff66"][Math.floor(Math.random() * 5)],
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 1.5,
  drift: Math.random() * 50 - 25
}));

const EMOJIS_DATA = [
  { emoji: "💻", delay: "0s", left: 110 },
  { emoji: "🚀", delay: "3s", left: 280 },
  { emoji: "✨", delay: "6s", left: 80 },
  { emoji: "🔥", delay: "9s", left: 320 },
  { emoji: "🤖", delay: "12s", left: 190 }
];

const CODE_TEMPLATES = [
  "const agent = new AIAgent();",
  "await agent.analyzeSystem();",
  "agent.optimizeFlows();",
  "// Success! Live Level: 42"
];

type Theme = "space" | "cyberpunk" | "biohack" | "cinematic" | "minimalist";
type Scene = "coding" | "debugging" | "victory";

export default function HologramDeveloper() {
  const [theme, setTheme] = useState<Theme>("space");
  
  // Theme-specific states
  const [scene, setScene] = useState<Scene>("coding");
  const [minDarkMode, setMinDarkMode] = useState(true);
  const [minGesture, setMinGesture] = useState<"none" | "wave" | "jump">("none");
  const [cinematicGesture, setCinematicGesture] = useState<"none" | "wave">("none");
  const [typedText, setTypedText] = useState("");
  const [linesCount, setLinesCount] = useState(42);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 200, y: 150 });
  const [hoveredScreen, setHoveredScreen] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // Auto-increment lines of code ticker in minimalist theme
  useEffect(() => {
    if (theme !== "minimalist") return;
    const interval = setInterval(() => {
      setLinesCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [theme]);

  // Typing effect for minimalist mode
  useEffect(() => {
    if (theme !== "minimalist") return;
    let templateIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    
    const typeCycle = () => {
      const current = CODE_TEMPLATES[templateIdx];
      if (!isDeleting) {
        setTypedText(current.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          setTimeout(() => {}, 1200);
        }
      } else {
        setTypedText(current.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          templateIdx = (templateIdx + 1) % CODE_TEMPLATES.length;
        }
      }
    };

    const interval = setInterval(typeCycle, isDeleting ? 30 : 80);
    return () => clearInterval(interval);
  }, [theme]);

  // Cinematic 24s loop progress tracker
  useEffect(() => {
    if (theme !== "cinematic") return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % 24000;
      setProgress((elapsed / 24000) * 100);
    }, 100);
    return () => clearInterval(interval);
  }, [theme]);

  // Handle cursor tracking for head movement, parallax, and dot follow
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 400;
    setMousePos({ x, y });
  };

  // Cinematic scene click / double click dispatcher
  const handleCinematicClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      // Double click -> Wave
      setCinematicGesture("wave");
      setTimeout(() => setCinematicGesture("none"), 1800);
    } else {
      clickTimeout.current = setTimeout(() => {
        // Single click -> Cycle scenes
        setScene((prev) => {
          if (prev === "coding") return "debugging";
          if (prev === "debugging") return "victory";
          return "coding";
        });
        clickTimeout.current = null;
      }, 250);
    }
  };

  // Minimalist single/double click triggers
  const handleMinimalistClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      // Double click -> Jump
      setMinGesture("jump");
      setTimeout(() => setMinGesture("none"), 1000);
    } else {
      clickTimeout.current = setTimeout(() => {
        // Single click -> Wave
        setMinGesture("wave");
        setTimeout(() => setMinGesture("none"), 1500);
        clickTimeout.current = null;
      }, 250);
    }
  };

  // Get active color system based on current theme and sub-scenes
  const getHoloColor = () => {
    if (theme === "space") return "#00D7D2";
    if (theme === "cyberpunk") return "#00ffff";
    if (theme === "biohack") return "#00ff66";
    if (theme === "cinematic") {
      if (scene === "debugging") return "#ff3333";
      if (scene === "victory") return "#00ff66";
      return "#00D7D2";
    }
    return "#00D7D2";
  };

  const getSecondaryColor = () => {
    if (theme === "space") return "#8E72EE";
    if (theme === "cyberpunk") return "#ff00ff";
    if (theme === "biohack") return "#ffaa00";
    if (theme === "cinematic") {
      if (scene === "debugging") return "#ffaa00";
      if (scene === "victory") return "#ffeb3b";
      return "#8E72EE";
    }
    return "#8E72EE";
  };

  const holoColor = getHoloColor();
  const secondaryColor = getSecondaryColor();

  // Head tracking calculations
  const dx = mousePos.x - 200;
  const dy = mousePos.y - 148;
  const headRot = Math.max(-12, Math.min(12, Math.atan2(dy, dx) * (180 / Math.PI) * 0.25));
  const headTransX = Math.max(-4, Math.min(4, dx * 0.025));
  const headTransY = Math.max(-3, Math.min(3, dy * 0.025));

  // Parallax displacement offsets for backgrounds
  const parallaxX = -dx * 0.03;
  const parallaxY = -dy * 0.03;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`w-full h-full flex flex-col items-center justify-between relative select-none p-3 transition-colors duration-500 rounded-3xl ${
        theme === "minimalist"
          ? minDarkMode ? "bg-[#0b0b14]" : "bg-[#f8fafc]"
          : "bg-transparent"
      }`}
    >
      {/* ================= PREMIUM SELECTOR DOCK ================= */}
      <div className="z-10 w-full flex items-center justify-center flex-wrap gap-1 px-2 py-1.5 rounded-full border border-white/10 bg-black/45 backdrop-blur-md shadow-xl shadow-black/30">
        <button
          onClick={() => setTheme("space")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            theme === "space" 
              ? "bg-[#00D7D2]/15 text-[#00D7D2] border border-[#00D7D2]/25 shadow-[0_0_12px_rgba(0,215,210,0.25)]" 
              : "text-slate-400 hover:text-slate-200 border border-transparent"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Space
        </button>
        <button
          onClick={() => setTheme("cyberpunk")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            theme === "cyberpunk" 
              ? "bg-[#ff00ff]/15 text-[#ff00ff] border border-[#ff00ff]/25 shadow-[0_0_12px_rgba(255,0,255,0.25)]" 
              : "text-slate-400 hover:text-slate-200 border border-transparent"
          }`}
        >
          <Zap className="w-3.5 h-3.5" /> Cyberpunk
        </button>
        <button
          onClick={() => setTheme("biohack")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            theme === "biohack" 
              ? "bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/25 shadow-[0_0_12px_rgba(0,255,102,0.25)]" 
              : "text-slate-400 hover:text-slate-200 border border-transparent"
          }`}
        >
          <Leaf className="w-3.5 h-3.5" /> Bio-Hack
        </button>
        <button
          onClick={() => setTheme("cinematic")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            theme === "cinematic" 
              ? "bg-[#ffaa00]/15 text-[#ffaa00] border border-[#ffaa00]/25 shadow-[0_0_12px_rgba(255,170,0,0.25)]" 
              : "text-slate-400 hover:text-slate-200 border border-transparent"
          }`}
        >
          <Film className="w-3.5 h-3.5" /> Cinematic
        </button>
        <button
          onClick={() => setTheme("minimalist")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer ${
            theme === "minimalist" 
              ? "bg-[#8E72EE]/15 text-[#8E72EE] border border-[#8E72EE]/25 shadow-[0_0_12px_rgba(142,114,238,0.25)]" 
              : "text-slate-400 hover:text-slate-200 border border-transparent"
          }`}
        >
          <Layout className="w-3.5 h-3.5" /> Minimalist
        </button>
      </div>

      {/* Cinematic Scene Switcher Buttons */}
      {theme === "cinematic" && (
        <div className="z-10 flex gap-2 mt-1 bg-black/25 p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => setScene("coding")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono border transition-all cursor-pointer ${
              scene === "coding" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "bg-black/10 text-slate-400 border-transparent"
            }`}
          >
            Coding
          </button>
          <button 
            onClick={() => setScene("debugging")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono border transition-all cursor-pointer ${
              scene === "debugging" ? "bg-red-500/10 text-red-400 border-red-500/30" : "bg-black/10 text-slate-400 border-transparent"
            }`}
          >
            Debugging
          </button>
          <button 
            onClick={() => setScene("victory")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono border transition-all cursor-pointer ${
              scene === "victory" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-black/10 text-slate-400 border-transparent"
            }`}
          >
            Victory
          </button>
        </div>
      )}

      {/* Minimalist Sub-Bar */}
      {theme === "minimalist" && (
        <div className="z-10 flex items-center gap-2 mt-1 bg-black/10 px-2.5 py-0.5 rounded-full border border-white/5">
          <span className="text-[8px] font-mono text-slate-400">Lines of code: {linesCount}</span>
          <button
            onClick={() => setMinDarkMode(!minDarkMode)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            title="Toggle Light/Dark Mode"
          >
            {minDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>
        </div>
      )}

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 400 400"
        className={`w-full h-full max-w-[380px] select-none ${
          theme === "minimalist" ? "" : `drop-shadow-[0_0_35px_${holoColor}33]`
        }`}
        xmlns="http://www.w3.org/2000/svg"
        onClick={theme === "cinematic" ? handleCinematicClick : theme === "minimalist" ? handleMinimalistClick : undefined}
      >
        <defs>
          {/* Reusable Filters */}
          <filter id="holo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="neon-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="1.8"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neon-glow-pink" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="1.6"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Reusable Gradients */}
          <linearGradient id="pedestal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={holoColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(18, 18, 28, 0.9)" />
            <stop offset="100%" stopColor="rgba(8, 8, 15, 0.98)" />
          </linearGradient>

          <linearGradient id="bg-shifting-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.08" className="shift-stop-1" />
            <stop offset="50%" stopColor="#8e72ee" stopOpacity="0.08" className="shift-stop-2" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.08" className="shift-stop-3" />
          </linearGradient>

          <radialGradient id="nebula-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8e72ee" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="volumetric-light" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={holoColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
          </linearGradient>

          {/* Grids Patterns */}
          <pattern id="holo-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={holoColor} strokeWidth="0.5" opacity="0.2" />
          </pattern>

          <pattern id="honeycomb-grid" width="16" height="27.71" patternUnits="userSpaceOnUse">
            <path d="M8 0 L16 4.62 L16 13.86 L8 18.48 L0 13.86 L0 4.62 Z" fill="none" stroke={holoColor} strokeWidth="0.55" opacity="0.25" />
          </pattern>

          {/* Glitch Distortion */}
          <filter id="glitch-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.06 0.94" numOctaves="1" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -2" in="noise" result="coloredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Split clipping paths */}
          <clipPath id="human-clip">
            <rect x="0" y="0" width="200" height="400" />
          </clipPath>
          <clipPath id="holo-clip">
            <rect x="200" y="0" width="200" height="400" />
          </clipPath>

          {/* ================= REUSABLE SYMBOLS ================= */}
          <g id="star-symbol">
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>
          
          {/* Reusable monitor base frame */}
          <g id="monitor-frame">
            <rect x="0" y="0" width="95" height="90" rx="8" fill="url(#screen-grad)" strokeWidth="1" />
            <path d="M 0 20 L 95 20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="8" cy="10" r="2" fill="#ff5f56" />
            <circle cx="14" cy="10" r="2" fill="#ffbd2e" />
            <circle cx="20" cy="10" r="2" fill="#27c93f" />
          </g>
        </defs>

        <style>
          {`
            /* Animations & Keyframes */
            .float-1 { animation: float-slow 6s ease-in-out infinite; }
            .float-2 { animation: float-med 8s ease-in-out infinite; }
            .float-3 { animation: float-fast 5s ease-in-out infinite; }
            
            @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
            @keyframes float-med { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
            @keyframes float-fast { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }

            /* twinking stars */
            .star-twinkle { animation: star-twink 3s ease-in-out infinite alternate; }
            @keyframes star-twink { 0% { opacity: 0.25; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.2); } }

            /* LED glow particles */
            .led-particle { animation: led-float 6s linear infinite; }
            @keyframes led-float {
              0% { transform: translateY(100px) scale(0.5); opacity: 0; }
              20% { opacity: 0.9; }
              80% { opacity: 0.9; }
              100% { transform: translateY(-140px) scale(1.3); opacity: 0; }
            }

            /* Matrix falling code */
            .matrix-line { animation: matrix-fall 3.5s linear infinite; }
            @keyframes matrix-fall {
              0% { stroke-dashoffset: 200; transform: translateY(-120px); }
              100% { stroke-dashoffset: 0; transform: translateY(280px); }
            }

            /* Fireflies */
            .firefly-drift { animation: firefly-fly 7s ease-in-out infinite alternate; }
            @keyframes firefly-fly {
              0% { transform: translate(0, 0); }
              50% { transform: translate(20px, -25px); }
              100% { transform: translate(-15px, -50px); }
            }

            /* Confetti celebrating victory */
            .confetti-particle { animation: conf-fall 3.5s linear infinite; }
            @keyframes conf-fall {
              0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(380px) rotate(360deg); opacity: 0; }
            }

            /* Shifting background gradient stops */
            .shift-stop-1 { animation: color-stop-1 10s ease-in-out infinite alternate; }
            .shift-stop-2 { animation: color-stop-2 10s ease-in-out infinite alternate; }
            .shift-stop-3 { animation: color-stop-3 10s ease-in-out infinite alternate; }
            @keyframes color-stop-1 { 0% { stop-color: #00ffff; } 100% { stop-color: #ff00ff; } }
            @keyframes color-stop-2 { 0% { stop-color: #8e72ee; } 100% { stop-color: #00ff66; } }
            @keyframes color-stop-3 { 0% { stop-color: #ff00ff; } 100% { stop-color: #ffff00; } }

            /* Glitch effect for cyberpunk theme */
            .glitch-active { animation: glitch-shake 1.2s steps(2) infinite; filter: url(#glitch-filter); }
            @keyframes glitch-shake {
              0%, 100% { transform: translate(0, 0); }
              15% { transform: translate(-1px, 1px); }
              30% { transform: translate(2px, -0.5px) skewX(3deg); }
              45% { transform: translate(-1px, -1px); }
              60% { transform: translate(1.5px, 1px) skewX(-2deg); }
            }

            /* Walk cycle step animations */
            .character-walk-group {
              animation: ${theme === "cyberpunk" ? "walk-trans-moonwalk" : "walk-trans"} ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes walk-trans {
              0% { transform: translateX(-35px); }
              10% { transform: translateX(25px); }
              20% { transform: translateX(10px); }
              20%, 40% { transform: translateX(10px); }
              45% { transform: translateX(0px); }
              45%, 85% { transform: translateX(0px); }
              90% { transform: translateX(0px); }
              100% { transform: translateX(-35px); }
            }
            @keyframes walk-trans-moonwalk {
              0% { transform: translateX(35px); }
              50% { transform: translateX(-35px); }
              100% { transform: translateX(35px); }
            }

            /* Torso Sway & Chest breathing */
            .body-group {
              transform-origin: 200px 270px;
              animation: body-sway-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite,
                         chest-breath-premium 4s ease-in-out infinite;
            }
            @keyframes body-sway-loop {
              0%, 4%, 8%, 12%, 16%, 20% { transform: translateY(0px) rotate(0.4deg); }
              2%, 6%, 10%, 14%, 18% { transform: translateY(-2.5px) rotate(-0.4deg); }
              20%, 40% { transform: translateY(0px); }
              40%, 44% { transform: translateY(0px); }
              42% { transform: translateY(-1.5px); }
              45%, 85% { transform: translateY(${theme === "minimalist" ? "0" : "22px"}); }
              90%, 100% { transform: translateY(0px); }
            }
            @keyframes chest-breath-premium {
              0%, 100% { transform: scale(1) translateY(0); }
              50% { transform: scale(1.02, 1.01) translateY(-0.8px); }
            }

            /* Head Bobs & Nods */
            .head-group {
              transform-origin: 200px 172px;
              animation: head-nod-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes head-nod-loop {
              0%, 20% { transform: rotate(1deg); }
              10% { transform: rotate(-1deg); }
              24%, 36% { transform: rotate(-6deg) translate(-1.5px, -1px); }
              38% { transform: rotate(0deg); }
              45% { transform: rotate(2deg); }
              50%, 60%, 70% { transform: rotate(0deg); }
              55%, 65% { transform: rotate(1deg); }
              73% { transform: rotate(3deg) translateY(0.5px); }
              79% { transform: rotate(-1.5deg); }
              85% { transform: rotate(3deg) translateY(0.5px); }
              90% { transform: rotate(0deg); }
              93% { transform: rotate(-10deg); }
              97% { transform: rotate(10deg); }
              100% { transform: rotate(0deg); }
            }

            /* Neck & Eye Blinking micro-animations */
            .eye-blink { animation: eye-blink-loop 4s infinite; transform-origin: 187px 146px; }
            .eye-blink-holo { animation: eye-blink-loop 4s infinite; transform-origin: 213px 146px; }
            @keyframes eye-blink-loop {
              0%, 95%, 100% { transform: scaleY(1); }
              97% { transform: scaleY(0.1); }
            }

            /* Waving / Jumping Triggers */
            .waving-arm-right {
              animation: wave-action 1.2s ease-in-out infinite !important;
              transform-origin: 220px 205px !important;
            }
            @keyframes wave-action {
              0%, 100% { transform: translate(220px, 205px) rotate(0deg); }
              25% { transform: translate(220px, 205px) rotate(-55deg); }
              75% { transform: translate(220px, 205px) rotate(-30deg); }
            }

            .jumping-character-group {
              animation: jump-action 0.9s cubic-bezier(0.18, 0.89, 0.32, 1.25) !important;
              transform-origin: 200px 300px !important;
            }
            @keyframes jump-action {
              0%, 100% { transform: translateY(0) scaleY(1); }
              30% { transform: translateY(-35px) scaleY(1.08); }
              70% { transform: translateY(6px) scaleY(0.92); }
            }

            /* Standard Arm Swings */
            .left-arm-upper {
              transform-origin: 0px 0px;
              animation: left-upper-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes left-upper-loop {
              0%, 20% { transform: translate(180px, 205px) rotate(14deg); }
              10% { transform: translate(180px, 205px) rotate(-14deg); }
              20%, 45% { transform: translate(180px, 205px) rotate(3deg); }
              50%, 70% { transform: translate(180px, 205px) rotate(-4deg); }
              52%, 62%, 68% { transform: translate(180px, 205px) rotate(2deg); }
              73%, 85% { transform: translate(180px, 205px) rotate(-22deg); }
              90%, 100% { transform: translate(180px, 205px) rotate(0deg); }
            }

            .left-arm-fore {
              transform-origin: 0px 0px;
              animation: left-fore-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes left-fore-loop {
              0%, 20% { transform: translate(-20px, 23px) rotate(18deg); }
              10% { transform: translate(-20px, 23px) rotate(8deg); }
              20%, 45% { transform: translate(-20px, 23px) rotate(6deg); }
              50%, 70% { transform: translate(-20px, 23px) rotate(-4deg); }
              52%, 62%, 68% { transform: translate(-20px, 23px) rotate(3deg); }
              73%, 85% { transform: translate(-20px, 23px) rotate(-55deg); }
              90%, 100% { transform: translate(-20px, 23px) rotate(0deg); }
            }

            .right-arm-upper {
              transform-origin: 0px 0px;
              animation: right-upper-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes right-upper-loop {
              0%, 20% { transform: translate(220px, 205px) rotate(-14deg); }
              10% { transform: translate(220px, 205px) rotate(14deg); }
              22% { transform: translate(220px, 205px) rotate(6deg); }
              24%, 36% { transform: translate(220px, 205px) rotate(-60deg); }
              38%, 45% { transform: translate(220px, 205px) rotate(0deg); }
              50%, 70% { transform: translate(220px, 205px) rotate(-2deg); }
              54%, 64%, 68% { transform: translate(220px, 205px) rotate(3deg); }
              75%, 100% { transform: translate(220px, 205px) rotate(0deg); }
            }

            .right-arm-fore {
              transform-origin: 0px 0px;
              animation: right-fore-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes right-fore-loop {
              0%, 20% { transform: translate(16px, 25px) rotate(8deg); }
              10% { transform: translate(16px, 25px) rotate(22deg); }
              22% { transform: translate(16px, 25px) rotate(-4deg); }
              24%, 36% { transform: translate(16px, 25px) rotate(-30deg); }
              38%, 45% { transform: translate(16px, 25px) rotate(0deg); }
              50%, 70% { transform: translate(16px, 25px) rotate(-4deg); }
              54%, 64%, 68% { transform: translate(16px, 25px) rotate(4deg); }
              75%, 100% { transform: translate(16px, 25px) rotate(0deg); }
            }

            /* Finger typing flutter */
            .typing-finger { animation: typing-finger-move 0.2s infinite alternate; }
            @keyframes typing-finger-move {
              0% { transform: translateY(0); }
              100% { transform: translateY(-1.5px); }
            }

            /* Leg Walk Cycle swings */
            .leg-l-group {
              transform-origin: 0px 0px;
              animation: leg-l-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes leg-l-loop {
              0%, 20% { transform: translate(175px, 270px) rotate(${theme === "cyberpunk" ? "20deg" : "-20deg"}); }
              10% { transform: translate(175px, 270px) rotate(${theme === "cyberpunk" ? "-20deg" : "20deg"}); }
              20%, 44% { transform: translate(175px, 270px) rotate(0deg); }
              45%, 85% { transform: translate(175px, 270px) rotate(${theme === "minimalist" ? "0" : "-55deg"}); }
              90%, 100% { transform: translate(175px, 270px) rotate(0deg); }
            }

            .leg-l-shin {
              transform-origin: 0px 0px;
              animation: leg-l-shin-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes leg-l-shin-loop {
              0%, 20% { transform: translate(-7px, 42px) rotate(8deg); }
              10% { transform: translate(-7px, 42px) rotate(0deg); }
              20%, 44% { transform: translate(-7px, 42px) rotate(0deg); }
              45%, 85% { transform: translate(-7px, 42px) rotate(${theme === "minimalist" ? "0" : "65deg"}); }
              90%, 100% { transform: translate(-7px, 42px) rotate(0deg); }
            }

            .leg-r-group {
              transform-origin: 0px 0px;
              animation: leg-r-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes leg-r-loop {
              0%, 20% { transform: translate(225px, 270px) rotate(${theme === "cyberpunk" ? "-20deg" : "20deg"}); }
              10% { transform: translate(225px, 270px) rotate(${theme === "cyberpunk" ? "20deg" : "-20deg"}); }
              20%, 44% { transform: translate(225px, 270px) rotate(0deg); }
              45%, 85% { transform: translate(225px, 270px) rotate(${theme === "minimalist" ? "0" : "-55deg"}); }
              90%, 100% { transform: translate(225px, 270px) rotate(0deg); }
            }

            .leg-r-shin {
              transform-origin: 0px 0px;
              animation: leg-r-shin-loop ${theme === "minimalist" ? "12s" : "24s"} ease-in-out infinite;
            }
            @keyframes leg-r-shin-loop {
              0%, 20% { transform: translate(7px, 42px) rotate(0deg); }
              10% { transform: translate(7px, 42px) rotate(8deg); }
              20%, 44% { transform: translate(7px, 42px) rotate(0deg); }
              45%, 85% { transform: translate(7px, 42px) rotate(${theme === "minimalist" ? "0" : "65deg"}); }
              90%, 100% { transform: translate(7px, 42px) rotate(0deg); }
            }

            /* Pedestal spin */
            .ped-spin { transform-origin: 200px 355px; animation: spin-cw 20s linear infinite; }
            .ped-spin-ccw { transform-origin: 200px 355px; animation: spin-ccw 25s linear infinite; }
            @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }

            /* Coffee steam rise */
            .steam-line { stroke-dasharray: 20; animation: steam-rise-loop 3s linear infinite; }
            @keyframes steam-rise-loop {
              0% { stroke-dashoffset: 40; opacity: 0; }
              50% { opacity: 0.65; }
              100% { stroke-dashoffset: 0; opacity: 0; }
            }

            /* Keyboard key pulses */
            .keyboard-glow { animation: key-pulse-loop 2s ease-in-out infinite alternate; }
            @keyframes key-pulse-loop {
              0% { opacity: 0.4; filter: drop-shadow(0 0 1px ${holoColor}); }
              100% { opacity: 1; filter: drop-shadow(0 0 5px ${holoColor}); }
            }

            /* Screen node pulses */
            .node-pulse-1 { animation: scale-pulse 3s infinite ease-in-out; transform-origin: 55px 95px; }
            .node-pulse-2 { animation: scale-pulse 3s infinite ease-in-out 1s; transform-origin: 75px 125px; }
            .node-pulse-3 { animation: scale-pulse 3s infinite ease-in-out 2s; transform-origin: 95px 105px; }
            @keyframes scale-pulse {
              0%, 100% { transform: scale(1); opacity: 0.4; }
              50% { transform: scale(1.3); opacity: 1; filter: drop-shadow(0 0 3px ${holoColor}); }
            }

            /* Equalizer Visualizer Bars */
            .eq-bar-1 { animation: eq-bounce 0.8s ease-in-out infinite alternate; }
            .eq-bar-2 { animation: eq-bounce 1.1s ease-in-out infinite alternate 0.2s; }
            .eq-bar-3 { animation: eq-bounce 0.6s ease-in-out infinite alternate 0.4s; }
            .eq-bar-4 { animation: eq-bounce 0.9s ease-in-out infinite alternate 0.1s; }
            @keyframes eq-bounce {
              0% { transform: scaleY(0.2); }
              100% { transform: scaleY(1.3); }
            }

            /* Floating ad elements (Blade Runner) */
            .cyber-ad-float { animation: ad-sway 4s ease-in-out infinite alternate; }
            @keyframes ad-sway {
              0% { transform: translateY(0px) rotate(1deg); }
              100% { transform: translateY(-6px) rotate(-1deg); }
            }

            /* Floating Achievement badge */
            .achievement-float { animation: badge-float 5s ease-in-out infinite alternate; }
            @keyframes badge-float {
              0% { transform: translateY(0); }
              100% { transform: translateY(-8px); }
            }

            /* Floating Emojis */
            .emoji-rise { animation: emoji-rise-anim 5s ease-in infinite; }
            @keyframes emoji-rise-anim {
              0% { transform: translateY(60px) scale(0.6); opacity: 0; }
              20% { opacity: 0.9; }
              80% { opacity: 0.9; }
              100% { transform: translateY(-160px) scale(1.3); opacity: 0; }
            }

            /* Water Ripple */
            .ripple-ring { animation: rip-pulse 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; }
            @keyframes rip-pulse {
              0% { rx: 5px; ry: 1px; opacity: 1; stroke-width: 1.5; }
              100% { rx: 110px; ry: 18px; opacity: 0; stroke-width: 0.5; }
            }

            /* Flying Butterfly wings flap */
            .butterfly-fly { animation: butt-fly 7s ease-in-out infinite alternate; }
            @keyframes butt-fly {
              0% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(60px, -40px) scale(0.8); }
              100% { transform: translate(-30px, -70px) scale(1.1); }
            }

            /* Space orbits spin */
            .orbit-spin-slow { transform-origin: 200px 230px; animation: orbit-spin-loop 12s linear infinite; }
            @keyframes orbit-spin-loop {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>

        {/* ================= BACKGROUND STAGE (With Parallax Parallax) ================= */}
        <g style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)`, transition: "transform 0.2s ease-out" }}>
          
          {/* Shifting Gradient Background */}
          {theme !== "minimalist" && (
            <rect width="400" height="400" fill="url(#bg-shifting-grad)" rx="24" pointerEvents="none" />
          )}

          {/* Theme 1: Space Starry Night / Planets / Nebula */}
          {theme === "space" && (
            <g>
              {/* Nebula */}
              <circle cx="200" cy="180" r="180" fill="url(#nebula-grad)" pointerEvents="none" />
              
              {/* Twinkling Star Field */}
              {STARS_DATA.map((star) => (
                <use
                  key={star.id}
                  href="#star-symbol"
                  x={star.cx}
                  y={star.cy}
                  opacity={0.35}
                  className="star-twinkle"
                  style={{ animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }}
                />
              ))}

              {/* Saturn-like ringed planet */}
              <g transform="translate(310, 70) scale(0.7)">
                {/* Planet Ring */}
                <ellipse cx="20" cy="20" rx="35" ry="8" fill="none" stroke="#8e72ee" strokeWidth="2.5" transform="rotate(-15 20 20)" opacity="0.6" />
                {/* Planet Body */}
                <circle cx="20" cy="20" r="18" fill="#00d7d2" opacity="0.8" filter="url(#holo-glow)" />
                {/* Ring front segment */}
                <path d="M -10 23 Q 20 30 50 15" fill="none" stroke="#8e72ee" strokeWidth="2.5" transform="rotate(-15 20 20)" opacity="0.8" />
              </g>

              {/* Orbit Rings around background */}
              <g className="orbit-spin-slow">
                <ellipse cx="200" cy="230" rx="170" ry="45" fill="none" stroke="#00d7d2" strokeWidth="0.8" strokeDasharray="6 20" opacity="0.3" />
                <ellipse cx="200" cy="230" rx="185" ry="50" fill="none" stroke="#8e72ee" strokeWidth="0.8" strokeDasharray="4 30" opacity="0.25" />
              </g>

              {/* Floating Dust Particles */}
              {PARTICLES_DATA.map((p) => (
                <circle
                  key={p.id}
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill={holoColor}
                  opacity={0.16}
                  filter="url(#holo-glow)"
                  className="led-particle"
                  style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
                />
              ))}
            </g>
          )}

          {/* Theme 2: Cyberpunk Neon Skyline & Matrix Rain */}
          {theme === "cyberpunk" && (
            <g>
              {/* Neon Skyscrapers silhouettes */}
              <g fill="#0b0b14" opacity="0.35">
                <rect x="20" y="120" width="30" height="200" />
                <rect x="55" y="150" width="35" height="170" />
                <rect x="310" y="100" width="40" height="220" />
                <rect x="355" y="140" width="30" height="180" />
              </g>
              {/* Glowing window dots on skyscrapers */}
              <g fill="#ff00ff" opacity="0.5" className="star-twinkle">
                <rect x="25" y="140" width="3" height="4" />
                <rect x="32" y="140" width="3" height="4" />
                <rect x="25" y="160" width="3" height="4" fill="#00ffff" />
                <rect x="62" y="170" width="3" height="4" />
                <rect x="70" y="170" width="3" height="4" fill="#00ffff" />
                <rect x="320" y="120" width="3" height="4" />
                <rect x="330" y="120" width="3" height="4" fill="#00ffff" />
              </g>

              {/* Falling matrix code rain */}
              {RAIN_DATA.map((line) => (
                <line
                  key={line.id}
                  x1={line.x}
                  y1="0"
                  x2={line.x}
                  y2={line.length}
                  stroke={holoColor}
                  strokeWidth="1.2"
                  strokeDasharray="4 8"
                  opacity={line.opacity}
                  className="matrix-line"
                  style={{ animationDelay: `${line.delay}s`, animationDuration: `${line.duration}s` }}
                />
              ))}
            </g>
          )}

          {/* Theme 3: Bio-Hack Holographic Forest / Fireflies */}
          {theme === "biohack" && (
            <g>
              {/* Detailed Holographic Forest Projection trees */}
              <g stroke={holoColor} strokeWidth="1.2" fill="none" opacity="0.25">
                {/* Left Tree trunk/branches */}
                <path d="M 50 250 L 50 120 Q 30 100 20 80 M 50 140 Q 70 120 80 90 M 50 180 Q 20 160 10 130" />
                <circle cx="20" cy="80" r="2" fill={holoColor} />
                <circle cx="80" cy="90" r="2" fill={holoColor} />
                {/* Right Tree trunk/branches */}
                <path d="M 340 250 L 340 130 Q 360 110 370 90 M 340 150 Q 320 130 300 105 M 340 190 Q 365 175 380 150" />
                <circle cx="370" cy="90" r="2" fill={holoColor} />
                <circle cx="300" cy="105" r="2" fill={holoColor} />
              </g>
              
              {/* Bioluminescent fireflies */}
              {FIREFLIES_DATA.map((f) => (
                <circle
                  key={f.id}
                  cx={f.cx}
                  cy={f.cy}
                  r={f.r}
                  fill="#ffaa00"
                  className="firefly-drift"
                  filter="url(#holo-glow)"
                  style={{ animationDelay: `${f.delay}s`, animationDuration: `${f.duration}s` }}
                />
              ))}
            </g>
          )}

          {/* Theme 4: Cinematic Confetti & Waveform */}
          {theme === "cinematic" && (
            <g>
              {/* Audio waveform lines representing music visualizer sync */}
              <g transform="translate(130, 45)" stroke={holoColor} strokeWidth="1.8" strokeLinecap="round" opacity="0.25">
                <line x1="10" y1="15" x2="10" y2="35" className="eq-bar-1" transform-origin="10 25" />
                <line x1="25" y1="15" x2="25" y2="35" className="eq-bar-2" transform-origin="25 25" />
                <line x1="40" y1="15" x2="40" y2="35" className="eq-bar-3" transform-origin="40 25" />
                <line x1="55" y1="15" x2="55" y2="35" className="eq-bar-4" transform-origin="55 25" />
                <line x1="70" y1="15" x2="70" y2="35" className="eq-bar-2" transform-origin="70 25" />
                <line x1="85" y1="15" x2="85" y2="35" className="eq-bar-1" transform-origin="85 25" />
                <line x1="100" y1="15" x2="100" y2="35" className="eq-bar-3" transform-origin="100 25" />
                <line x1="115" y1="15" x2="115" y2="35" className="eq-bar-4" transform-origin="115 25" />
                <line x1="130" y1="15" x2="130" y2="35" className="eq-bar-2" transform-origin="130 25" />
              </g>
              {/* Emojis floating */}
              {EMOJIS_DATA.map((emo, idx) => (
                <text
                  key={idx}
                  x={emo.left}
                  y="350"
                  fontSize="13"
                  className="emoji-rise"
                  style={{ animationDelay: emo.delay }}
                >
                  {emo.emoji}
                </text>
              ))}
              {/* Confetti (victory only) */}
              {scene === "victory" && CONFETTI_DATA.map((c) => (
                <circle
                  key={c.id}
                  cx={c.cx}
                  cy={c.cy}
                  r={c.r}
                  fill={c.fill}
                  className="confetti-particle"
                  style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s` }}
                />
              ))}
            </g>
          )}

          {/* Theme 5: Minimalist dots following cursor (floating dots trail) */}
          {theme === "minimalist" && (
            <g opacity="0.3">
              <circle cx={mousePos.x} cy={mousePos.y} r="2.5" fill={holoColor} />
              <circle cx={mousePos.x - dx * 0.25} cy={mousePos.y - dy * 0.25} r="1.8" fill={secondaryColor} />
              <circle cx={mousePos.x - dx * 0.5} cy={mousePos.y - dy * 0.5} r="1.2" fill={holoColor} />
            </g>
          )}
        </g>


        {/* ================= BACKGROUND FLOATING SCREENS ================= */}

        {/* Screen 1 (Left Screen): AI Ops / Neural Net */}
        <g 
          className="float-1" 
          transform="translate(0, 0)"
          onMouseEnter={() => setHoveredScreen("left")}
          onMouseLeave={() => setHoveredScreen(null)}
          style={{ 
            transition: "transform 0.4s ease-out", 
            transform: hoveredScreen === "left" && theme === "minimalist" ? "scale(1.06) translate(-5px, -5px)" : "none" 
          }}
        >
          {theme !== "minimalist" ? (
            <g>
              <use href="#monitor-frame" x="25" y="60" stroke={theme === "cyberpunk" ? "#ff00ff" : "rgba(0, 215, 210, 0.25)"} />
              <text x="58" y="73" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">AI_OPS_FLOW</text>
              
              {/* Neural network visualization */}
              <g stroke={holoColor} strokeWidth="0.8" opacity="0.6">
                <line x1="45" y1="95" x2="70" y2="105" />
                <line x1="45" y1="95" x2="60" y2="125" />
                <line x1="70" y1="105" x2="95" y2="95" stroke={secondaryColor} />
                <line x1="60" y1="125" x2="90" y2="125" stroke={secondaryColor} />
                <line x1="70" y1="105" x2="90" y2="125" />
              </g>
              
              <circle cx="45" cy="95" r="4.5" fill={holoColor} className="node-pulse-1" />
              <circle cx="70" cy="105" r="3.5" fill={secondaryColor} className="node-pulse-2" />
              <circle cx="60" cy="125" r="4" fill={secondaryColor} className="node-pulse-3" />
              <circle cx="95" cy="95" r="3" fill={holoColor} className="node-pulse-1" />
              <circle cx="90" cy="125" r="4.5" fill={holoColor} className="node-pulse-2" />
              
              <text x="35" y="142" fill={`${holoColor}99`} fontSize="5.5" fontFamily="monospace">Workflow: ACTIVE</text>
            </g>
          ) : (
            // Minimalist Screen 1
            <g>
              <rect x="25" y="60" width="95" height="90" rx="4" fill="none" stroke={holoColor} strokeWidth="1.5" />
              <line x1="25" y1="78" x2="120" y2="78" stroke={holoColor} strokeWidth="1" />
              <circle cx="35" cy="69" r="2.5" fill={holoColor} />
              <circle cx="43" cy="69" r="2.5" fill={secondaryColor} />
              <text x="54" y="72" fill={holoColor} fontSize="6" fontFamily="monospace">OPS</text>
              
              <circle cx="72" cy="110" r="10" fill="none" stroke={secondaryColor} strokeWidth="1.5" />
              <line x1="72" y1="110" x2="79" y2="103" stroke={holoColor} strokeWidth="1.5" />
              <text x="32" y="142" fill={holoColor} fontSize="5" fontFamily="monospace">LINES: {linesCount}</text>
            </g>
          )}
        </g>

        {/* Screen 2 (Right Screen): Diagnostics / Equalizer */}
        <g 
          className="float-2" 
          transform="translate(0, 0)"
          onMouseEnter={() => setHoveredScreen("right")}
          onMouseLeave={() => setHoveredScreen(null)}
          style={{ 
            transition: "transform 0.4s ease-out", 
            transform: hoveredScreen === "right" && theme === "minimalist" ? "scale(1.06) translate(5px, -5px)" : "none" 
          }}
        >
          {theme !== "minimalist" ? (
            <g>
              <use href="#monitor-frame" x="280" y="75" stroke={theme === "cyberpunk" ? "#00ffff" : "rgba(142, 114, 238, 0.25)"} />
              <text x="313" y="88" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">RIG_DIAGNOSTICS</text>
              
              {/* Equalizer (Cyberpunk) or skeleton diagnostics */}
              {theme === "cyberpunk" ? (
                <g transform="translate(290, 110)">
                  <rect x="5" y="15" width="10" height="20" fill="#ff00ff" className="eq-bar-1" transform-origin="10 35" />
                  <rect x="20" y="5" width="10" height="30" fill="#00ffff" className="eq-bar-2" transform-origin="25 35" />
                  <rect x="35" y="10" width="10" height="25" fill="#ff00ff" className="eq-bar-3" transform-origin="40 35" />
                  <rect x="50" y="0" width="10" height="35" fill="#00ffff" className="eq-bar-4" transform-origin="55 35" />
                  <rect x="65" y="12" width="10" height="23" fill="#ff00ff" className="eq-bar-2" transform-origin="70 35" />
                </g>
              ) : (
                /* diagnostics skeleton mirroring walk cycle */
                <g transform="translate(126, -30) scale(0.5)">
                  <ellipse cx="200" cy="355" rx="50" ry="8" fill="none" stroke={holoColor} strokeWidth="1" />
                  <g className="character-walk-group">
                    <g className="body-group">
                      <line x1="200" y1="270" x2="200" y2="205" stroke={holoColor} strokeWidth="1.5" />
                      <g className="head-group">
                        <circle cx="200" cy="148" r="10" fill="none" stroke={holoColor} strokeWidth="1.2" />
                        <line x1="200" y1="158" x2="200" y2="172" stroke={holoColor} strokeWidth="1" />
                      </g>
                      <g className="left-arm-upper">
                        <line x1="0" y1="0" x2="-20" y2="23" stroke={secondaryColor} strokeWidth="1.5" />
                        <g className="left-arm-fore">
                          <line x1="0" y1="0" x2="11" y2="31" stroke={holoColor} strokeWidth="1" />
                        </g>
                      </g>
                      <g className="right-arm-upper">
                        <line x1="0" y1="0" x2="16" y2="25" stroke={secondaryColor} strokeWidth="1.5" />
                        <g className="right-arm-fore">
                          <line x1="0" y1="0" x2="-10" y2="31" stroke={holoColor} strokeWidth="1" />
                        </g>
                      </g>
                      <g className="leg-l-group">
                        <line x1="0" y1="0" x2="-7" y2="42" stroke={holoColor} strokeWidth="1.5" />
                        <g className="leg-l-shin">
                          <line x1="0" y1="0" x2="-11" y2="38" stroke={holoColor} strokeWidth="1.2" />
                        </g>
                      </g>
                      <g className="leg-r-group">
                        <line x1="0" y1="0" x2="7" y2="42" stroke={holoColor} strokeWidth="1.5" />
                        <g className="leg-r-shin">
                          <line x1="0" y1="0" x2="5" y2="38" stroke={holoColor} strokeWidth="1.2" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              )}
              
              <text x="290" y="155" fill={`${holoColor}99`} fontSize="5.5" fontFamily="monospace">
                {theme === "cyberpunk" ? "AUDIO: STREAMING" : "Mo-Cap: CALIBRATED"}
              </text>
            </g>
          ) : (
            // Minimalist Screen 2
            <g>
              <rect x="280" y="75" width="95" height="90" rx="4" fill="none" stroke={holoColor} strokeWidth="1.5" />
              <line x1="280" y1="93" x2="375" y2="93" stroke={holoColor} strokeWidth="1" />
              <text x="290" y="87" fill={holoColor} fontSize="6" fontFamily="monospace">LIVE_STAT</text>
              <rect x="292" y="105" width="70" height="6" fill={holoColor} />
              <rect x="292" y="117" width="55" height="6" fill={secondaryColor} />
              <rect x="292" y="129" width="40" height="6" fill={holoColor} />
              <text x="290" y="155" fill={holoColor} fontSize="5" fontFamily="monospace">HEALTH: OK</text>
            </g>
          )}
        </g>

        {/* Screen 3 (Center Top Screen): Code Scroller / Typing */}
        <g 
          className="float-3" 
          transform="translate(0, 0)"
          onMouseEnter={() => setHoveredScreen("center")}
          onMouseLeave={() => setHoveredScreen(null)}
          style={{ 
            transition: "transform 0.4s ease-out", 
            transform: hoveredScreen === "center" && theme === "minimalist" ? "scale(1.06) translate(0px, -5px)" : "none" 
          }}
        >
          {theme !== "minimalist" ? (
            <g>
              <rect x="110" y="7" width="130" height="60" rx="8" fill="url(#screen-grad)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <clipPath id="code-clip">
                <rect x="110" y="10" width="130" height="54" />
              </clipPath>
              <g clipPath="url(#code-clip)">
                <g className="code-scroller" style={{ animation: "scroll-up 10s linear infinite" }}>
                  <text x="120" y="24" fill={holoColor} fontSize="5.5" fontFamily="monospace" opacity="0.8">
                    {theme === "space" ? (
                      <tspan x="117" dy="0">01010101 AI_AGENT_OPS 01010</tspan>
                    ) : (
                      <tspan x="117" dy="0">import {'{ Agent }'} from "cyber";</tspan>
                    )}
                    <tspan x="117" dy="10">const system = new AI_Agent();</tspan>
                    <tspan x="117" dy="10">system.initWorkflow({'{'}</tspan>
                    <tspan x="123" dy="10">trigger: "cyberpunk_glitch",</tspan>
                    <tspan x="123" dy="10">action: "reboot_neural_net",</tspan>
                    <tspan x="117" dy="10">{'}'});</tspan>
                    <tspan x="117" dy="10">system.status === "running";</tspan>
                    
                    {/* Loop duplicate */}
                    <tspan x="117" dy="20">const system = new AI_Agent();</tspan>
                    <tspan x="117" dy="10">system.initWorkflow({'{'}</tspan>
                    <tspan x="123" dy="10">trigger: "cyberpunk_glitch",</tspan>
                    <tspan x="117" dy="10">{'}'});</tspan>
                  </text>
                </g>
              </g>
            </g>
          ) : (
            // Minimalist Screen 3 (Typing Text)
            <g>
              <rect x="110" y="7" width="130" height="60" rx="4" fill="none" stroke={holoColor} strokeWidth="1.5" />
              <text x="116" y="22" fill={holoColor} fontSize="5.5" fontFamily="monospace">
                {typedText}
                <tspan fill={secondaryColor} className="star-twinkle">|</tspan>
              </text>
              <text x="116" y="55" fill={secondaryColor} fontSize="5.5" fontFamily="monospace">LINES: {linesCount}</text>
            </g>
          )}
        </g>

        {/* Cyberpunk Floating Ad Signboard */}
        {theme === "cyberpunk" && (
          <g className="cyber-ad-float">
            <g transform="translate(10, 160)">
              <rect x="0" y="0" width="35" height="15" rx="3" fill="rgba(255, 0, 255, 0.15)" stroke="#ff00ff" strokeWidth="1.2" filter="url(#holo-glow)" />
              <text x="6" y="10" fill="#ff00ff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">NEO</text>
            </g>
            <g transform="translate(350, 180)">
              <rect x="0" y="0" width="40" height="15" rx="3" fill="rgba(0, 255, 255, 0.15)" stroke="#00ffff" strokeWidth="1.2" filter="url(#holo-glow)" />
              <text x="6" y="10" fill="#00ffff" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.5">CORP</text>
            </g>
          </g>
        )}


        {/* ================= PEDESTAL CHAMBER (BASE) ================= */}

        {theme !== "minimalist" ? (
          <g>
            {/* Volumetric upward light cone from pedestal base */}
            <polygon points="120,350 280,350 330,170 70,170" fill="url(#volumetric-light)" opacity="0.15" pointerEvents="none" />

            {/* Main Base */}
            <ellipse 
              cx="200" 
              cy="355" 
              rx="130" 
              ry="22" 
              fill={theme === "biohack" ? "url(#honeycomb-grid)" : "url(#pedestal-grad)"} 
              stroke={holoColor} 
              strokeWidth="2.2" 
              filter="url(#holo-glow)" 
            />
            
            {/* Water Ripple (Bio-Hack) */}
            {theme === "biohack" && (
              <ellipse cx="200" cy="355" rx="100" ry="16" fill="none" stroke="#00ff66" className="ripple-ring" />
            )}

            {/* Light Core */}
            <ellipse cx="200" cy="355" rx="100" ry="16" fill={`${holoColor}1a`} stroke={`${holoColor}99`} strokeWidth="1" />

            {/* Outer spinning dash rings */}
            <ellipse cx="200" cy="355" rx="145" ry="26" fill="none" stroke={`${holoColor}66`} strokeWidth="1.2" strokeDasharray="10 15" className="ped-spin" />
            <ellipse cx="200" cy="355" rx="155" ry="29" fill="none" stroke={`${secondaryColor}4d`} strokeWidth="1" strokeDasharray="5 20" className="ped-spin-ccw" />

            {/* Pulsing neon stripe wraps (Cyberpunk) */}
            {theme === "cyberpunk" && (
              <ellipse cx="200" cy="355" rx="138" ry="24" fill="none" stroke="#ff00ff" strokeWidth="1.5" className="ped-spin" strokeDasharray="50 150" />
            )}
          </g>
        ) : (
          // Minimalist Pedestal Base
          <ellipse cx="200" cy="355" rx="120" ry="18" fill="none" stroke={holoColor} strokeWidth="2" />
        )}


        {/* ================= LAYER 1: CHAIR BACKREST ================= */}
        <path d="M 175 250 L 225 250 Q 230 200 220 180 L 180 180 Q 170 200 175 250 Z" fill={theme === "minimalist" ? "none" : "#13131f"} stroke={theme === "minimalist" ? holoColor : "rgba(255,255,255,0.04)"} strokeWidth="1.2" />


        {/* ================= LAYER 2: CHARACTER LEGS ================= */}
        <g className="character-walk-group">
          {/* Left Leg */}
          <g className="leg-l-group">
            {theme !== "minimalist" && (
              <path d="M -6 0 L 6 0 L -2 42 L -12 42 Z" fill="#284473" clipPath="url(#human-clip)" />
            )}
            <line x1="0" y1="0" x2="-7" y2="42" stroke={holoColor} strokeWidth="1.8" clipPath={theme === "minimalist" ? undefined : "url(#holo-clip)"} />
            {theme !== "minimalist" && (
              <circle cx="-7" cy="42" r="2.5" fill={holoColor} clipPath="url(#holo-clip)" />
            )}

            <g className="leg-l-shin">
              {theme !== "minimalist" && (
                <g clipPath="url(#human-clip)">
                  <path d="M -4 0 L 4 0 L -8 38 L -14 38 Z" fill="#284473" />
                  <g transform="translate(-11, 38)">
                    <path d="M -12 0 H 12 V 6 H -12 Z" fill="#f4f4f5" />
                    <path d="M -12 6 H 12 V 9 H -12 Z" fill="#13131f" />
                  </g>
                </g>
              )}
              <line x1="0" y1="0" x2="-11" y2="38" stroke={holoColor} strokeWidth="1.8" clipPath={theme === "minimalist" ? undefined : "url(#holo-clip)"} />
              {theme !== "minimalist" && (
                <circle cx="-11" cy="38" r="2.5" fill={holoColor} clipPath="url(#holo-clip)" />
              )}
              <line x1="-23" y1="38" x2="-3" y2="38" stroke={holoColor} strokeWidth="2.2" clipPath={theme === "minimalist" ? undefined : "url(#holo-clip)"} />
            </g>
          </g>

          {/* Right Leg */}
          <g className="leg-r-group">
            {theme !== "minimalist" && (
              <path d="M -6 0 L 6 0 L 12 42 L 2 42 Z" fill="#1b2c4c" clipPath="url(#human-clip)" />
            )}
            <line x1="0" y1="0" x2="7" y2="42" stroke={holoColor} strokeWidth="1.8" clipPath={theme === "minimalist" ? undefined : "url(#holo-clip)"} />
            {theme !== "minimalist" && (
              <circle cx="7" cy="42" r="2.5" fill={holoColor} clipPath="url(#holo-clip)" />
            )}

            <g className="leg-r-shin">
              {theme !== "minimalist" && (
                <g clipPath="url(#human-clip)">
                  <path d="M -4 0 L 4 0 L 8 38 L 2 38 Z" fill="#1b2c4c" />
                  <g transform="translate(5, 38)">
                    <path d="M -8 0 H 16 V 6 H -8 Z" fill="#e2e2e5" />
                  </g>
                </g>
              )}
              <line x1="0" y1="0" x2="5" y2="38" stroke={holoColor} strokeWidth="1.8" clipPath={theme === "minimalist" ? undefined : "url(#holo-clip)"} />
              {theme !== "minimalist" && (
                <circle cx="5" cy="38" r="2.5" fill={holoColor} clipPath="url(#holo-clip)" />
              )}
              <line x1="-3" y1="38" x2="17" y2="38" stroke={holoColor} strokeWidth="2.2" clipPath={theme === "minimalist" ? undefined : "url(#holo-clip)"} />
            </g>
          </g>
        </g>


        {/* ================= LAYER 3: DESK TABLE & LAPTOP SCREEN ================= */}
        
        {/* Desk Tabletop */}
        <rect x="70" y="300" width="260" height="12" rx="4" fill={theme === "minimalist" ? "none" : "#202032"} stroke={theme === "minimalist" ? holoColor : "rgba(255,255,255,0.06)"} strokeWidth="1.2" />
        {/* Desk Stands */}
        <rect x="100" y="312" width="8" height="42" fill={theme === "minimalist" ? "none" : "#13131f"} stroke={theme === "minimalist" ? holoColor : "none"} strokeWidth="1" />
        <rect x="292" y="312" width="8" height="42" fill={theme === "minimalist" ? "none" : "#13131f"} stroke={theme === "minimalist" ? holoColor : "none"} strokeWidth="1" />

        {/* Bio-Roots extending to pedestal (Bio-Hack) */}
        {theme === "biohack" && (
          <g stroke="#00ff66" strokeWidth="1" fill="none" opacity="0.65">
            <path d="M 104 312 Q 95 330 100 355" />
            <path d="M 296 312 Q 310 330 300 355" />
            <path d="M 104 330 Q 110 345 105 355" />
          </g>
        )}

        {/* Laptop / Monitor Base */}
        <polygon points="180,300 220,300 215,295 185,295" fill={theme === "minimalist" ? "none" : "#13131f"} stroke={theme === "minimalist" ? holoColor : "none"} strokeWidth="1" />
        {/* Laptop Screen Angle */}
        <path d="M 182 295 L 218 295 L 230 255 L 194 255 Z" fill={theme === "minimalist" ? "none" : "#1c1b2d"} stroke={holoColor} strokeWidth="1" opacity={theme === "minimalist" ? 1 : 0.8} />
        {/* Laptop Screen glow */}
        {theme !== "minimalist" && (
          <path d="M 186 292 L 214 292 L 224 258 L 196 258 Z" fill={`${holoColor}26`} filter="url(#holo-glow)" />
        )}


        {/* ================= LAYER 4: KEYBOARD, MUG, or PLANT ================= */}
        
        {/* Holographic Keyboard */}
        {theme !== "minimalist" && (
          <g transform="translate(135, 290)" className="keyboard-glow">
            <rect x="0" y="3" width="40" height="4" rx="1.5" fill="rgba(0, 215, 210, 0.15)" stroke={holoColor} strokeWidth="0.8" />
            <line x1="3" y1="5" x2="37" y2="5" stroke={theme === "space" ? "url(#bg-shifting-grad)" : holoColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          </g>
        )}

        {/* Coffee Mug vs plant pot */}
        {theme === "biohack" ? (
          /* Converted Plant Pot with Glowing Bioluminescent sprout */
          <g transform="translate(260, 276)">
            <polygon points="1,15 11,15 13,24 -1,24" fill="#ffaa00" stroke="#ffaa00" strokeWidth="0.75" />
            <path d="M 6 15 Q 4 5 10 -2" fill="none" stroke="#00ff66" strokeWidth="1.5" />
            <path d="M 6 15 Q 12 8 13 3" fill="none" stroke="#00ff66" strokeWidth="1" />
            <circle cx="10" cy="-2" r="3.5" fill="#ffaa00" filter="url(#holo-glow)" />
          </g>
        ) : (
          /* Classic Coffee Mug on Desk */
          theme !== "minimalist" && (
            <g className="desk-mug" transform="translate(260, 282)" style={{ animation: "desk-mug-story 24s step-end infinite" }}>
              <rect x="0" y="0" width="12" height="15" rx="2" fill={secondaryColor} stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
              <path d="M 12 4 Q 16 7 12 11" fill="none" stroke={secondaryColor} strokeWidth="1.5" />
              
              {/* Pink steam for coffee mug */}
              <g className="steam-group" transform="translate(6, -4)" style={{ animation: "steam-mug-hide-story 24s ease-in-out infinite" }}>
                <path d="M 0 0 Q -2 -6 2 -12 T 0 -22" fill="none" stroke="#ff00ff" strokeWidth="0.8" className="steam-line" />
                <path d="M 4 -2 Q 2 -8 6 -14 T 4 -24" fill="none" stroke={theme === "space" ? "#00ffff" : secondaryColor} strokeWidth="0.8" className="steam-line" style={{ animationDelay: "1.5s" }} />
              </g>
            </g>
          )
        )}

        {/* Desktop Terrarium */}
        {theme === "biohack" && (
          <g transform="translate(90, 275)">
            <circle cx="12" cy="12" r="10" fill="rgba(0, 255, 102, 0.05)" stroke="#00ff66" strokeWidth="1" filter="url(#holo-glow)" />
            <path d="M 12 21 Q 10 16 12 13" fill="none" stroke="#ffaa00" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2.5" fill="#00ff66" />
          </g>
        )}


        {/* ================= LAYER 5: CHARACTER TORSO, HEAD & ARMS ================= */}
        <g className={`character-walk-group ${theme === "minimalist" && minGesture === "jump" ? "jumping-character-group" : ""}`}>
          <g className={theme === "cyberpunk" ? "glitch-active" : ""}>
            <g className="body-group">
              
              {/* Torso & Shirt (Human / Hologram Split) */}
              {theme !== "minimalist" ? (
                <g>
                  {/* Human shirt */}
                  <path d="M 180 205 L 200 205 L 200 270 L 175 270 Z" fill="#e25c38" clipPath="url(#human-clip)" />
                  {/* Hologram shirt */}
                  <path d="M 200 205 H 220 L 225 270 H 200 Z" fill="url(#holo-grid)" stroke={holoColor} strokeWidth="1" clipPath="url(#holo-clip)" />
                  
                  {/* Glowing bio-connections / vines (Bio-Hack / Cyberpunk) */}
                  {theme === "biohack" && (
                    <g stroke="#ffaa00" strokeWidth="1.2" fill="none" opacity="0.8">
                      <path d="M 185 215 Q 195 235 190 265" />
                      <path d="M 205 210 Q 215 240 200 268" />
                    </g>
                  )}
                  {theme === "cyberpunk" && (
                    <g stroke="#00ffff" strokeWidth="1" fill="none" opacity="0.8" strokeDasharray="3 3">
                      <path d="M 190 210 Q 198 230 188 260" />
                    </g>
                  )}
                </g>
              ) : (
                // Minimalist Torso
                <rect x="175" y="205" width="50" height="65" rx="3" fill="none" stroke={holoColor} strokeWidth="2" />
              )}

              {/* Head & Face (Blinking and Neck movement) */}
              <g 
                className="head-group" 
                style={theme === "minimalist" ? { transform: `rotate(${headRot}deg) translate(${headTransX}px, ${headTransY}px)` } : undefined}
              >
                {theme !== "minimalist" ? (
                  <g>
                    {/* Human Head */}
                    <g clipPath="url(#human-clip)">
                      <rect x="194" y="172" width="6" height="15" fill="#f5cba7" />
                      <circle cx="200" cy="148" r="23" fill="#f5cba7" />
                      {/* Hair */}
                      <path d="M 177 148 Q 177 127 200 127 L 200 148 Z" fill="#3d2b1f" />
                      <path d="M 177 142 C 182 135, 195 130, 200 135 Z" fill="#4d3b2f" />
                      
                      {/* Eye (Blinking) & Smile */}
                      {theme === "cinematic" && scene === "debugging" ? (
                        <g>
                          <line x1="184" y1="143" x2="190" y2="145" stroke="#ff3333" strokeWidth="1.8" />
                          <circle cx="187" cy="147" r="1.5" fill="#ff3333" className="eye-blink" />
                          <path d="M 183 156 Q 188 152 193 156" fill="none" stroke="#13131f" strokeWidth="1.5" />
                        </g>
                      ) : theme === "cinematic" && scene === "victory" ? (
                        <g>
                          <path d="M 183 143 Q 187 140 191 143" fill="none" stroke="#13131f" strokeWidth="1.5" />
                          <circle cx="187" cy="146" r="2" fill="#13131f" className="eye-blink" />
                          <path d="M 182 153 Q 187 159 192 153" fill="none" stroke="#13131f" strokeWidth="1.5" />
                        </g>
                      ) : (
                        <g>
                          <circle cx="187" cy="146" r="1.5" fill="#13131f" className="eye-blink" />
                          <path d="M 183 154 Q 188 159 193 154" fill="none" stroke="#13131f" strokeWidth="1.2" strokeLinecap="round" />
                        </g>
                      )}
                    </g>
                    
                    {/* Hologram Head */}
                    <g clipPath="url(#holo-clip)">
                      <rect x="200" y="172" width="6" height="15" fill="rgba(0,215,210,0.1)" stroke={holoColor} strokeWidth="1" />
                      <circle cx="200" cy="148" r="23" fill="url(#holo-grid)" stroke={holoColor} strokeWidth="1.2" />
                      
                      {/* Hair Outline */}
                      <path d="M 200 127 Q 223 127 223 148 H 200 Z" fill="none" stroke={holoColor} strokeWidth="1.5" />
                      
                      {/* Glowing Eye (Blinking) */}
                      {theme === "cyberpunk" ? (
                        <circle cx="213" cy="146" r="2.5" fill="#ff00ff" filter="url(#neon-glow-pink)" className="eye-blink-holo" />
                      ) : theme === "cinematic" && scene === "debugging" ? (
                        <circle cx="213" cy="146" r="2.5" fill="#ff3333" filter="url(#neon-glow-pink)" className="eye-blink-holo" />
                      ) : (
                        <circle cx="213" cy="146" r="1.5" fill={holoColor} className="eye-blink-holo" />
                      )}
                      
                      {/* Smile */}
                      {theme === "cinematic" && scene === "debugging" ? (
                        <path d="M 207 156 Q 212 152 217 156" fill="none" stroke={holoColor} strokeWidth="1.5" />
                      ) : (
                        <path d="M 207 154 Q 212 159 217 154" fill="none" stroke={holoColor} strokeWidth="1.2" strokeLinecap="round" />
                      )}
                    </g>
                  </g>
                ) : (
                  // Minimalist Head
                  <g>
                    <rect x="196" y="170" width="8" height="18" fill="none" stroke={holoColor} strokeWidth="1.5" />
                    <circle cx="200" cy="148" r="22" fill={minDarkMode ? "#0b0b14" : "#f8fafc"} stroke={holoColor} strokeWidth="2" />
                    <circle cx="192" cy="146" r="2" fill={holoColor} />
                    <circle cx="208" cy="146" r="2" fill={holoColor} />
                    <path d="M 194 156 Q 200 161 206 156" fill="none" stroke={secondaryColor} strokeWidth="1.8" />
                  </g>
                )}

                {/* Circuit Crown / Halo (Bio-Hack) */}
                {theme === "biohack" && (
                  <ellipse cx="200" cy="120" rx="16" ry="5" fill="none" stroke="#ffaa00" strokeWidth="1.5" filter="url(#holo-glow)" />
                )}
              </g>

              {/* Left Arm */}
              <g className="left-arm-upper">
                {theme !== "minimalist" ? (
                  <g>
                    {/* Human upper arm */}
                    <path d="M -5 -2 L 5 2 L -16 26 L -24 20 Z" fill="#e25c38" clipPath="url(#human-clip)" />
                    {/* Hologram upper arm */}
                    <line x1="0" y1="0" x2="-20" y2="23" stroke={holoColor} strokeWidth="2.5" clipPath="url(#holo-clip)" />
                    
                    <g className="left-arm-fore">
                      <path d="M -4 -2 L 4 2 L 15 33 L 7 29 Z" fill="#f5cba7" clipPath="url(#human-clip)" />
                      {/* Fingers (typing key-by-key) */}
                      <g className="typing-finger" clipPath="url(#human-clip)">
                        <circle cx="11" cy="31" r="3" fill="#f5cba7" />
                        <line x1="11" y1="31" x2="16" y2="31" stroke="#f5cba7" strokeWidth="1.5" />
                        <line x1="11" y1="33" x2="15" y2="35" stroke="#f5cba7" strokeWidth="1.5" />
                      </g>
                      
                      <line x1="0" y1="0" x2="11" y2="31" stroke={holoColor} strokeWidth="2" clipPath="url(#holo-clip)" />
                      <circle cx="11" cy="31" r="3.5" fill={holoColor} clipPath="url(#holo-clip)" />
                    </g>
                  </g>
                ) : (
                  // Minimalist Left Arm
                  <g>
                    <line x1="0" y1="0" x2="-18" y2="20" stroke={holoColor} strokeWidth="2" />
                    <g className="left-arm-fore">
                      <line x1="0" y1="0" x2="8" y2="28" stroke={holoColor} strokeWidth="2" />
                    </g>
                  </g>
                )}
              </g>

              {/* Right Arm */}
              <g className={`right-arm-upper ${(theme === "cinematic" && cinematicGesture === "wave") || (theme === "minimalist" && minGesture === "wave") ? "waving-arm-right" : ""}`}>
                {theme !== "minimalist" ? (
                  <g>
                    {/* Human upper arm */}
                    <path d="M -5 2 L 5 -2 L 20 23 L 12 27 Z" fill="#e25c38" clipPath="url(#human-clip)" />
                    {/* Hologram upper arm */}
                    <line x1="0" y1="0" x2="16" y2="25" stroke={holoColor} strokeWidth="2.5" clipPath="url(#holo-clip)" />
                    
                    <g className="left-arm-fore right-arm-fore">
                      <path d="M -4 2 L 4 -2 L -6 33 L -14 29 Z" fill="#f5cba7" clipPath="url(#human-clip)" />
                      {/* Fingers */}
                      <g className="typing-finger" clipPath="url(#human-clip)">
                        <circle cx="-5" cy="31" r="3.5" fill="#f5cba7" />
                        <line x1="-5" y1="31" x2="-10" y2="33" stroke="#f5cba7" strokeWidth="1.5" />
                      </g>

                      {/* Coffee Mug inside hand */}
                      {theme !== "biohack" && (
                        <g className="hand-mug" transform="translate(-14, 20)" clipPath="url(#human-clip)">
                          <rect x="0" y="0" width="12" height="15" rx="2" fill={secondaryColor} stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
                          <path d="M 12 4 Q 16 7 12 11" fill="none" stroke={secondaryColor} strokeWidth="1.5" />
                        </g>
                      )}
                      
                      {/* Hologram forearm */}
                      <line x1="0" y1="0" x2="-10" y2="31" stroke={holoColor} strokeWidth="2" clipPath="url(#holo-clip)" />
                      <circle cx="-10" cy="31" r="3.5" fill={holoColor} clipPath="url(#holo-clip)" />

                      {/* Holographic Smartphone (Cyberpunk) */}
                      {theme === "cyberpunk" ? (
                        <g transform="translate(-20, 16)" clipPath="url(#holo-clip)">
                          <rect x="0" y="0" width="10" height="18" rx="2" fill="rgba(0, 255, 255, 0.15)" stroke="#00ffff" strokeWidth="1" filter="url(#holo-glow)" />
                          <circle cx="5" cy="-4" r="2.5" fill="#ff00ff" filter="url(#holo-glow)" className="star-twinkle" />
                          <circle cx="-2" cy="-9" r="1.5" fill="#00ffff" />
                        </g>
                      ) : (
                        theme !== "biohack" && (
                          /* Wireframe Mug */
                          <g className="hand-mug" transform="translate(-19, 20)" clipPath="url(#holo-clip)">
                            <rect x="0" y="0" width="12" height="15" rx="2" fill="rgba(0,215,210,0.15)" stroke={holoColor} strokeWidth="1" />
                          </g>
                        )
                      )}

                      {/* Cinematic tools (Wrench / Magic Wand) */}
                      {theme === "cinematic" && scene === "debugging" && (
                        <g transform="translate(-18, 12)" stroke="#ff3333" strokeWidth="1.2" fill="none">
                          <path d="M0,5 L8,5 M2,5 L2,15 M2,15 H6" />
                          <circle cx="2" cy="3" r="2" />
                        </g>
                      )}
                      {theme === "cinematic" && scene === "victory" && (
                        <g transform="translate(-18, 10)">
                          <line x1="0" y1="18" x2="8" y2="4" stroke="#ffeb3b" strokeWidth="1.5" />
                          <circle cx="8" cy="4" r="2.5" fill="#ffffff" filter="url(#holo-glow)" />
                        </g>
                      )}
                    </g>
                  </g>
                ) : (
                  // Minimalist Right Arm
                  <g>
                    <line x1="0" y1="0" x2="18" y2="20" stroke={holoColor} strokeWidth="2" />
                    <g className="left-arm-fore right-arm-fore">
                      <line x1="0" y1="0" x2="-8" y2="28" stroke={holoColor} strokeWidth="2" />
                    </g>
                  </g>
                )}
              </g>

            </g>
          </g>
        </g>


        {/* ================= EXTRA FOREGROUND SPECIFIC ASSETS ================= */}

        {/* Space: Orbit Rings */}
        {theme === "space" && (
          <g pointerEvents="none" className="float-2">
            <ellipse cx="200" cy="230" rx="40" ry="12" fill="none" stroke="#ff00ff" strokeWidth="1" transform="rotate(-15 200 230)" opacity="0.65" />
            <ellipse cx="200" cy="230" rx="55" ry="18" fill="none" stroke="#00ffff" strokeWidth="1.5" transform="rotate(10 200 230)" opacity="0.8" filter="url(#holo-glow)" />
          </g>
        )}

        {/* Space: Floating "AI Developer" Badge */}
        {theme === "space" && (
          <g className="float-1" transform="translate(150, 95)" pointerEvents="none">
            <rect x="0" y="0" width="100" height="18" rx="9" fill="rgba(0, 215, 210, 0.12)" stroke={holoColor} strokeWidth="1.2" filter="url(#holo-glow)" />
            <text x="50" y="12" fill={holoColor} fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">AI DEVELOPER</text>
          </g>
        )}

        {/* Bio-Hack: Flying butterfly */}
        {theme === "biohack" && (
          <g className="butterfly-fly" transform="translate(300, 150)" pointerEvents="none">
            <path d="M 0 0 Q -5 -8 0 -12 Q 5 -8 0 0 Z M 0 0 Q -8 5 -12 0 Q -8 -5 0 0 Z" fill="#00ff66" filter="url(#holo-glow)" />
            <circle cx="0" cy="-4" r="1.5" fill="#ffaa00" />
          </g>
        )}

        {/* Cinematic: Loop Progress Bar */}
        {theme === "cinematic" && (
          <g transform="translate(0, 0)">
            <rect x="50" y="382" width="300" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x="50" y="382" width={300 * (progress / 100)} height="4" rx="2" fill={holoColor} filter="url(#holo-glow)" />
            <text x="350" y="376" fill={holoColor} fontSize="6.5" fontFamily="monospace" textAnchor="end">LOOP: {Math.floor(progress)}%</text>
          </g>
        )}

        {/* Cinematic: Floating Achievement Badge */}
        {theme === "cinematic" && (
          <g className="achievement-float" transform="translate(20, 240)" pointerEvents="none">
            <rect x="0" y="0" width="82" height="18" rx="4" fill="rgba(255,170,0,0.12)" stroke="#ffaa00" strokeWidth="1" />
            <text x="41" y="12" fill="#ffaa00" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              {scene === "victory" ? "🏆 Code Master" : scene === "debugging" ? "🛠️ Bug Squasher" : "🤖 AI Whisperer"}
            </text>
          </g>
        )}

        {/* CRT Scanline Overlay (CRT Monitor Feel) */}
        {theme === "cyberpunk" && (
          <g className="crt-overlay">
            <line x1="0" y1="40" x2="400" y2="40" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="160" x2="400" y2="160" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="240" x2="400" y2="240" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="280" x2="400" y2="280" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="320" x2="400" y2="320" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="360" x2="400" y2="360" stroke="#00ffff" strokeWidth="0.5" opacity="0.08" />
          </g>
        )}
      </svg>
    </div>
  );
}
