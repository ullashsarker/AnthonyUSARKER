import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Server, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Code2, 
  Layers, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from "lucide-react";

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
  const [direction, setDirection] = useState(1);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"flow" | "telemetry" | "code">("flow");

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
      x: dir > 0 ? 60 : -60,
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
      x: dir > 0 ? -60 : 60,
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
    <div className="space-y-8 max-w-6xl w-full mx-auto">
      {/* Section Header */}
      <div className="relative space-y-2 pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white via-zinc-400 to-transparent rounded-full" />
        <div className="absolute -left-10 top-0 w-20 h-20 bg-white/[0.02] blur-2xl rounded-full pointer-events-none" />
        <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase font-semibold block">
          Client Validation & Flagship Systems
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          Verified Systems & Testimonials
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive Flagship Systems Showcase */}
        <div className="lg:col-span-7 bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

          <div className="space-y-5 relative z-10">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Production Flagship Case Study
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    Enterprise SMTP & Deliverability Matrix
                  </h3>
                </div>
              </div>

              {/* Showcase Tab Switcher */}
              <div className="flex items-center gap-1 bg-zinc-950/80 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveShowcaseTab("flow")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer ${
                    activeShowcaseTab === "flow"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Flow
                </button>
                <button
                  onClick={() => setActiveShowcaseTab("telemetry")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer ${
                    activeShowcaseTab === "telemetry"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Telemetry
                </button>
                <button
                  onClick={() => setActiveShowcaseTab("code")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer ${
                    activeShowcaseTab === "code"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Daemon
                </button>
              </div>
            </div>

            {/* Showcase Tab 1: Architecture Flow */}
            {activeShowcaseTab === "flow" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3.5"
              >
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  High-throughput autonomous email infrastructure engineered to bypass spam heuristics with zero deliverability degradation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    {
                      step: "01",
                      title: "Ingestion & Validation",
                      desc: "Catch-all filtering and real-time MX/SPF pre-flight checks.",
                      icon: ShieldCheck,
                      metric: "<0.12s latency"
                    },
                    {
                      step: "02",
                      title: "Autonomous IP Warmup",
                      desc: "Rate-limiting algorithm dynamically rotates dedicated IPs.",
                      icon: Zap,
                      metric: "Adaptive backoff"
                    },
                    {
                      step: "03",
                      title: "Multi-Relay Dispatch",
                      desc: "Distributed Mailgun & Outlook grid routing engine.",
                      icon: Layers,
                      metric: "5,000/min throughput"
                    },
                    {
                      step: "04",
                      title: "Deliverability Hub",
                      desc: "Live DMARC alignment & automated feedback loop parsing.",
                      icon: Activity,
                      metric: "99.4% Inbox Rate"
                    }
                  ].map((node) => {
                    const NodeIcon = node.icon;
                    return (
                      <div
                        key={node.step}
                        className="p-3.5 rounded-2xl bg-[#0d0d0d]/90 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-zinc-500">STAGE {node.step}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            {node.metric}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-xs text-white flex items-center gap-1.5">
                            <NodeIcon className="w-3.5 h-3.5 text-zinc-400" />
                            {node.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{node.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Showcase Tab 2: Live Telemetry */}
            {activeShowcaseTab === "telemetry" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-white/5">
                  <span className="font-mono uppercase tracking-wider">Production Cluster Status</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    All 8 Worker Nodes Healthy
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Inbox Placement", val: "99.4%", sub: "Industry avg: 82%" },
                    { label: "Monthly Relayed", val: "4.8M+", sub: "Zero hard bounces" },
                    { label: "P99 Dispatch", val: "0.38s", sub: "Global avg latency" },
                    { label: "Spam Score", val: "0.0 / 10", sub: "SpamAssassin clean" }
                  ].map((stat) => (
                    <div key={stat.label} className="p-3.5 rounded-2xl bg-zinc-950/70 border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">{stat.label}</span>
                      <span className="font-display font-bold text-xl text-white block">{stat.val}</span>
                      <span className="text-[10px] text-zinc-400 mt-1 block font-sans">{stat.sub}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>Catch-All Verification: 100% active</span>
                  <span className="text-zinc-300">Mailgun API Relay: Optimized</span>
                </div>
              </motion.div>
            )}

            {/* Showcase Tab 3: Production Daemon Code */}
            {activeShowcaseTab === "code" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-zinc-950/90 border border-white/10 p-4 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-x-auto"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-zinc-500">
                  <span>smtpQueueWorker.ts</span>
                  <span className="text-emerald-400">TypeScript 5.x</span>
                </div>
                <pre className="text-zinc-300">
{`// Production Outbound Queue Daemon
import { SmtpCluster, DkimSigner, BackoffEngine } from "@ops/deliverability";

export async function processOutboundQueue(batch: EmailJob[]): Promise<DispatchReport> {
  const cluster = await SmtpCluster.getOptimalRelay({
    minHealthScore: 0.98,
    tlsRequired: true
  });

  for (const job of batch) {
    const signed = await DkimSigner.sign(job, { 
      selector: "matrix2026",
      keyRotate: "auto" 
    });

    await cluster.dispatchWithBackoff(signed, {
      maxRetries: 3,
      onThrottle: BackoffEngine.rotateDedicatedIP
    });
  }
}`}
                </pre>
              </motion.div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 mt-5 flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono text-[11px] text-zinc-500">
              Built & maintained by Anthony Ullash Sarker
            </span>
            <span className="flex items-center gap-1 text-white font-medium text-xs">
              Autonomous Systems <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Column: Testimonial Reviews & Navigation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Review Header + Navigation Buttons */}
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase font-semibold block">
              Client Feedback ({currentIndex + 1} / {testimonials.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="relative overflow-hidden flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col justify-between gap-5 relative overflow-hidden"
              >
                <div>
                  {/* Quote Icon */}
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-zinc-300">
                    <Quote className="w-4 h-4" />
                  </div>
                  
                  {/* Quote content */}
                  <p className="text-sm text-zinc-200 leading-relaxed italic font-display">
                    "{currentTestimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-2">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/15 flex items-center justify-center text-white text-[11px] font-bold shadow-md shrink-0">
                    {currentTestimonial.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block leading-tight font-display">
                      {currentTestimonial.name}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-sans">
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
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex 
                    ? "bg-white w-5 shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
                    : "bg-white/10 hover:bg-white/30 w-1.5"
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
