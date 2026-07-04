import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  Code2, 
  Share2, 
  Palette, 
  TrendingUp, 
  Layers, 
  Printer 
} from 'lucide-react';

export interface ServiceDetail {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  color: string;
  glowVar: string;
  iconBg: string;
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
  price: string;
  deliveryTime: string;
  highlights: string[];
}

export const servicesDetailsData: ServiceDetail[] = [
  {
    id: "ai-operations",
    icon: BrainCircuit,
    title: "AI Operations",
    category: "Automation & Intelligence",
    shortDesc: "Designing custom AI assistants, intelligent chatbots, and automated workflow scripts that drive results.",
    longDesc: "Seamlessly integrate artificial intelligence into your business infrastructure. From deploying customized Retrieval-Augmented Generation (RAG) knowledge systems to building automated agentic pipelines, we optimize workflows, replace repetitive tasks, and empower your brand with cognitive intelligence.",
    color: "from-purple-500 to-indigo-500",
    glowVar: "rgba(168, 85, 247, 0.15)",
    iconBg: "bg-purple-500/15 text-purple-400",
    deliverables: [
      "Custom AI Chatbots & Customer Service Assistants",
      "Retrieval-Augmented Generation (RAG) Custom Knowledge Bases",
      "Automated Workflow Connections (Make, Zapier, Custom APIs)",
      "Prompt Optimization & Custom LLM Finetuning Guidance",
      "Backend Integration for Web and Discord/Slack Channels"
    ],
    process: [
      { step: "01", title: "Assessment", desc: "Analyze current operations to identify manual bottlenecks ripe for AI automation." },
      { step: "02", title: "Architecture", desc: "Design a customized AI pipeline and select optimal LLMs/embeddings." },
      { step: "03", title: "Integration", desc: "Build the agent logic, set up vector databases, and link API workflows." },
      { step: "04", title: "Tuning & Launch", desc: "Perform prompt refining, system guardrails setting, and final live deployment." }
    ],
    price: "Starting at $499",
    deliveryTime: "7 - 14 Days",
    highlights: ["Saves 20+ hours/week", "24/7 autonomous operation", "Zero API maintenance logs"]
  },
  {
    id: "web-dev",
    icon: Code2,
    title: "Web Development",
    category: "Full-Stack Engineering",
    shortDesc: "Building fast, responsive and modern websites with clean code and cutting-edge frameworks.",
    longDesc: "Elevate your web presence with high-performance, responsive applications. Built utilizing clean coding standards, lightning-fast rendering engines, and industry-standard security. We handle everything from custom database architecture to pixel-perfect frontends.",
    color: "from-blue-500 to-indigo-500",
    glowVar: "rgba(59, 130, 246, 0.15)",
    iconBg: "bg-blue-500/15 text-blue-400",
    deliverables: [
      "Responsive React, Vite, or Next.js Single Page Applications",
      "High-Performance Server-Side Rendered (SSR) Web Portals",
      "Robust RESTful API design & Secure Authentication Systems",
      "NoSQL (MongoDB) or SQL Database Structure & Integration",
      "Premium Custom Interactions, Micro-animations, & Dark Themes"
    ],
    process: [
      { step: "01", title: "Planning", desc: "Translate product specifications into system architecture and layout mockups." },
      { step: "02", title: "Engineering", desc: "Develop the clean semantic frontend and assemble the database connections." },
      { step: "03", title: "Optimization", desc: "Optimize bundle sizes, implement caching, and test across mobile breakpoints." },
      { step: "04", title: "Deployment", desc: "Host on high-availability infrastructures (Netlify, Vercel, VPS) with SSL." }
    ],
    price: "Starting at $799",
    deliveryTime: "10 - 20 Days",
    highlights: ["SEO & Accessibility ready", "PageSpeed Score > 90%", "Fully modular React codebase"]
  },
  {
    id: "pinterest-marketing",
    icon: Share2,
    title: "Pinterest Marketing",
    category: "Visual Search Growth",
    shortDesc: "Crafting viral pin strategies and automated content funnels that stand out from the crowd.",
    longDesc: "Tap into one of the largest organic visual search engines in the world. We build comprehensive keyword structures, launch beautiful engaging pins, and build automated scheduling systems designed to drive massive, passive organic traffic directly to your blog, Shopify shop, or services hub.",
    color: "from-pink-500 to-rose-500",
    glowVar: "rgba(236, 72, 153, 0.15)",
    iconBg: "bg-pink-500/15 text-pink-400",
    deliverables: [
      "Comprehensive Profile Overhaul & Board Keyword Architecture",
      "High-Converting Viral Pins (Static, Carousel, Video designs)",
      "Strict Pinterest SEO Mapping (Rich Pins & Meta descriptions)",
      "Tailwind App Automatic Pinning & Funnel Schedule Setup",
      "Analytics Monitoring & Monthly Traffic Growth Reports"
    ],
    process: [
      { step: "01", title: "SEO Audit", desc: "Inspect current boards and research high-demand niche keywords." },
      { step: "02", title: "Design", desc: "Create conversion-optimized pin templates tailored to capture attention." },
      { step: "03", title: "Funnels", desc: "Establish Tailwind schedules and auto-pin rules for continuous activity." },
      { step: "04", title: "Scale", desc: "Analyze performance metrics to expand top-tier boards and increase clicks." }
    ],
    price: "Starting at $299 / mo",
    deliveryTime: "Ongoing Service",
    highlights: ["Build passive organic views", "Pinterest SEO target matching", "Full design & scheduling handled"]
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    category: "Growth & ROI Optimization",
    shortDesc: "Driving targeted traffic, generating warm leads, and scaling conversions with ROI-focused funnels.",
    longDesc: "Convert passive users into high-intent customers. We build customized multi-channel marketing campaigns, design high-converting landing pages, and structure automated email sequences that systematically guide audiences through your digital pipeline, maximizing every dollar of ad spend.",
    color: "from-emerald-500 to-teal-500",
    glowVar: "rgba(16, 185, 129, 0.15)",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    deliverables: [
      "Ad Campaign Setup & Optimizations (Meta Ads, Google Ads)",
      "High-Converting Sales Funnels & Lead Squeeze Pages",
      "Automated Email Marketing Workflows (Klaviyo, Mailchimp)",
      "Conversion Rate Optimization (CRO) & User Behavior Tracking",
      "Strategic Social Media Growth & Lead Generation Blueprints"
    ],
    process: [
      { step: "01", title: "Strategy", desc: "Identify key target personas, competitive landscape, and campaign math." },
      { step: "02", title: "Creative", desc: "Design ad creatives, build high-converting landing page layouts, and write copy." },
      { step: "03", title: "Launch", desc: "Set up analytics tracking and run structured A/B tests on live campaigns." },
      { step: "04", title: "Optimization", desc: "Scale successful ad-sets, prune low performers, and launch retargeting lists." }
    ],
    price: "Starting at $399",
    deliveryTime: "7 - 14 Days",
    highlights: ["Built-in conversion metrics", "Laser-targeted local/global reach", "Detailed analytics reports"]
  },
  {
    id: "ui-ux-design",
    icon: Layers,
    title: "UI/UX & Visual Designing",
    category: "Creative Interface Design",
    shortDesc: "Designing beautiful, user-centric interfaces and interactive prototypes that engage and convert.",
    longDesc: "Transform abstract software ideas into beautiful, intuitive interfaces. We focus on modern layouts, structured grid systems, accessibility standards, and clean interactive Figma prototypes that simplify the developer's job and leave a strong visual impact on your audience.",
    color: "from-cyan-500 to-blue-500",
    glowVar: "rgba(6, 182, 212, 0.15)",
    iconBg: "bg-cyan-500/15 text-cyan-400",
    deliverables: [
      "User Research, Wireframes, & Intuitive Interface Flows",
      "High-Fidelity UI Mockups in Figma (Clean, Organized Layers)",
      "Fully Interactive, Clickable Desktop & Mobile Prototypes",
      "Reusable UI Component Libraries & Global Style Systems",
      "Creative Assets & High-Quality Vector Illustrations"
    ],
    process: [
      { step: "01", title: "Research", desc: "Understand target audience goals, design directions, and content needs." },
      { step: "02", title: "Wireframing", desc: "Build low-fidelity digital wireframes to establish logical user flow." },
      { step: "03", title: "Visual Design", desc: "Apply colors, typography, glassmorphism elements, and high-fidelity visuals." },
      { step: "04", title: "Prototyping", desc: "Connect Figma panels into clickable transitions for validation and handoff." }
    ],
    price: "Starting at $599",
    deliveryTime: "8 - 15 Days",
    highlights: ["Modern Figma source file", "Pixel-perfect grid layouts", "Developer-ready component handoff"]
  },
  {
    id: "print-design",
    icon: Printer,
    title: "Print Design",
    category: "Tangible Offline Media",
    shortDesc: "Crafting tangible, high-impact marketing materials that elevate your offline brand presence.",
    longDesc: "Bring your brand message into the physical world. We specialize in producing pixel-perfect, vector-based print layouts calibrated with proper bleed margins, safe zones, and high-resolution CMYK color spaces to ensure your print shop outputs look crisp and vibrant.",
    color: "from-amber-500 to-orange-500",
    glowVar: "rgba(245, 158, 11, 0.15)",
    iconBg: "bg-amber-500/15 text-amber-400",
    deliverables: [
      "Premium Corporate Brochures, Flyers, & Bi-fold/Tri-fold Layouts",
      "Professional Print-Ready Business Cards & Executive Stationery",
      "Large-Format Banners, Billboard Vector Art, & Event Posters",
      "Custom Branded Merchandise, Apparel Graphics, & Package Layouts",
      "Press-Ready Formats (High-Res PDF, Scalable Vector EPS, AI)"
    ],
    process: [
      { step: "01", title: "Sizing", desc: "Establish precise physical dimensions, folding coordinates, and bleed setups." },
      { step: "02", title: "Artwork", desc: "Design crisp vector layouts combining brand assets, typography, and images." },
      { step: "03", title: "Calibration", desc: "Convert elements to CMYK profile and verify color contrast ratios." },
      { step: "04", title: "Handoff", desc: "Deliver production-ready vector archives and direct specifications for the printer." }
    ],
    price: "Starting at $199",
    deliveryTime: "4 - 7 Days",
    highlights: ["Press-ready CMYK files", "Unlimited revisions on layouts", "Scalable vector formats"]
  },
  {
    id: "brand-identity",
    icon: Palette,
    title: "Brand Identity",
    category: "Creative Branding",
    shortDesc: "Creating memorable brand identities, custom logos, and guidelines that set your business apart.",
    longDesc: "Establish a remarkable brand footprint. We draft extensive visual structures, design flexible custom logo assets, and assemble comprehensive branding guidelines (brand books) that guarantee your brand speaks with one unified, professional voice across all digital and print mediums.",
    color: "from-rose-500 to-purple-500",
    glowVar: "rgba(244, 63, 94, 0.15)",
    iconBg: "bg-rose-500/15 text-rose-400",
    deliverables: [
      "Custom Logo Systems (Primary, Secondary, & Submark versions)",
      "Cohesive Brand Color Palettes (RGB, CMYK, Web Hex codes)",
      "Modern Typography Systems & Hierarchy Guidelines",
      "Comprehensive Brand Guidelines Document (Brand Book PDF)",
      "Social Media Brand Kit (Covers, Profile layouts, Post templates)"
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Establish the brand values, personality, and aesthetic target directions." },
      { step: "02", title: "Concepting", desc: "Create multiple initial vector concepts representing the brand values." },
      { step: "03", title: "Refining", desc: "Develop the surrounding typography system and match brand color palette." },
      { step: "04", title: "Delivery", desc: "Package all files with a comprehensive guidebook for consistent future use." }
    ],
    price: "Starting at $349",
    deliveryTime: "6 - 12 Days",
    highlights: ["Memorable, custom designs", "Full brand guidelines document", "100% vector scaling files"]
  }
];

interface ServiceDetailModalProps {
  selectedServiceId: string | null;
  onClose: () => void;
}

export default function ServiceDetailModal({ selectedServiceId, onClose }: ServiceDetailModalProps) {
  const service = servicesDetailsData.find(s => s.id === selectedServiceId);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedServiceId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedServiceId]);

  const handleCTAClick = () => {
    onClose();
    // Smooth scroll to contact form after modal animation completes
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Auto-fill form details if possible
        const messageInput = document.getElementById('form-message') as HTMLTextAreaElement | null;
        const nameInput = document.getElementById('form-name') as HTMLInputElement | null;
        if (messageInput && service) {
          messageInput.value = `Hi Anthony, I would like to discuss my project regarding your "${service.title}" service. Let's connect!`;
          // Trigger React onChange handler by dispatching input event
          messageInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (nameInput) {
          nameInput.focus();
        }
      }
    }, 300);
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      {selectedServiceId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto">
          {/* Backdrop click-away */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-[#09090b]/95 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 flex flex-col max-h-[90vh] font-sans"
            style={{ "--card-glow": service.glowVar } as React.CSSProperties}
          >
            {/* Ambient Card Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--card-glow),transparent_60%)] pointer-events-none" />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/20 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${service.iconBg} flex items-center justify-center`}>
                  <service.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 uppercase">
                    {service.category}
                  </span>
                  <h2 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-wide">
                    {service.title} Details
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 relative z-10 min-h-0">
              {/* Top Overview Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Description Side */}
                <div className="md:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Service Overview
                    </h3>
                    <p className="text-[13px] text-slate-300 leading-relaxed">
                      {service.longDesc}
                    </p>
                  </div>

                  {/* Highlights Bullet Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-3 py-1 text-[10px] font-mono bg-white/[0.02] border border-white/5 text-slate-300 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Package details Side */}
                <div className="md:col-span-5 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 relative overflow-hidden space-y-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-xl rounded-full" />
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">Investment</span>
                    <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
                      {service.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 py-3 border-y border-white/5 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>{service.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Safe Delivery</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCTAClick}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-[11px] font-bold tracking-widest uppercase rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2 group"
                  >
                    <span>Start Project / Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* What You Get / Deliverables */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  What You'll Get
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/30 border border-white/5 hover:bg-zinc-950/60 transition-colors">
                      <CheckCircle2 className="w-4.5 h-4.5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-[12px] text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Process Roadmap */}
              <div className="space-y-5 pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  Operational Roadmap (Work Process)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950/20 border border-white/5 relative overflow-hidden space-y-2 group/step">
                      <div className="absolute top-2 right-2 text-2xl font-display font-extrabold text-white/[0.02] group-hover/step:text-purple-500/[0.04] transition-colors font-mono">
                        {step.step}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-purple-400">
                        STEP {step.step}
                      </div>
                      <h4 className="text-[13px] font-bold text-white">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-4 sm:p-5 bg-zinc-950 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0 relative z-10">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Zap className="w-3.5 h-3.5 animate-pulse" />
                Active Deployment
              </span>
              <span>Operator: Sarker.AU</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
