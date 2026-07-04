import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  Smartphone, 
  MailCheck, 
  ServerCrash, 
  ShoppingBag, 
  ExternalLink, 
  Github, 
  Layers, 
  Zap, 
  ArrowUpRight 
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDesc: string;
  icon: React.ComponentType<any>;
  techStack: string[];
  metrics: { label: string; value: string };
  glowColor: "cyan" | "purple" | "dual";
}

export default function ProjectsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: "ai-assistant",
      title: "Personal AI Assistant",
      category: "Core AI & Automation",
      description: "Advanced custom productivity bot driving desktop configurations, task execution, and system prompts.",
      fullDesc: "Optimizes local task runners, formats dynamic spreadsheet reports, structures deep-level prompt chains, and automates high-speed desktop configurations effortlessly.",
      icon: Bot,
      techStack: ["TypeScript", "Node.js", "Gemini API", "Electron Shell"],
      metrics: { label: "Efficiency", value: "3.5x Faster" },
      glowColor: "cyan"
    },
    {
      id: "ai-chatbot",
      title: "Intelligent AI Chatbot Architecture",
      category: "Conversational NLU Gateway",
      description: "Natural language client handling system with smooth API web hooks.",
      fullDesc: "Bespoke customer-facing chat architecture designed to resolve user intent dynamically. Leverages multi-turn stateful memory, prompt templates, and custom webhook loops.",
      icon: Layers,
      techStack: ["Node.js", "Express", "RESTful APIs", "State Engines"],
      metrics: { label: "Precision", value: "95% Accuracy" },
      glowColor: "purple"
    },
    {
      id: "pinterest-engine",
      title: "Viral Pinterest Content Engine",
      category: "Growth & Brand Automation",
      description: "Custom-designed automated design workflows using templates and asset managers yielding massive impressions.",
      fullDesc: "Orchestrates bulk asset design pipelines, high-CTR typography pairing, and strategic scheduled publications to scale organic platform referrals exponentially.",
      icon: Zap,
      techStack: ["Photoshop Macros", "Canva API", "Schedules Scheduler", "Lead Capture"],
      metrics: { label: "Impressions", value: "1.2M+ Monthly" },
      glowColor: "dual"
    },
    {
      id: "mail-checker",
      title: "ANT Mail Checker",
      category: "High-Volume Email Validator",
      description: "A standalone application with a fully lag-free visual scroll canvas to process high-volume mail records effortlessly.",
      fullDesc: "A high-speed email checker script designed to handle and validate massive list matrices using direct socket handshakes and parallel domain testing loops.",
      icon: MailCheck,
      techStack: ["HTML5 Canvas", "SMTP Sockets", "Parallel Streams", "Tailwind CSS"],
      metrics: { label: "Throughput", value: "5K / min" },
      glowColor: "cyan"
    },
    {
      id: "bulk-email-engine",
      title: "Enterprise Bulk Email Engine",
      category: "Marketing Deliverability Engine",
      description: "Scalable marketing grid with intelligent multi-domain delivery algorithms.",
      fullDesc: "Custom deployment architecture integrating automated warming scripts, Outlook batch operations, DNS record management (SPF/DKIM), and clean catch-all processing.",
      icon: ServerCrash,
      techStack: ["Mailgun SDK", "Ubuntu OS", "Catch-all Routing", "Bouncify Filters"],
      metrics: { label: "Inbox Delivery", value: "98.8% Ratio" },
      glowColor: "cyan"
    },
    {
      id: "bd-bag-store",
      title: "BD-Bag-Store",
      category: "E-Commerce Deployment",
      description: "Modern e-commerce deployment featuring cloud database hosting and serverless capabilities.",
      fullDesc: "Consumer luggage storefront with responsive product cards, shopping cart triggers, serverless payment flows, and robust real-time cloud inventory syncing.",
      icon: ShoppingBag,
      techStack: ["React", "Tailwind CSS", "Firestore Cloud", "Firebase Auth"],
      metrics: { label: "Checkout Engine", value: "Fully Secured" },
      glowColor: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => {
        const Icon = project.icon;
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative h-[380px] rounded-2xl glass-panel p-6 border transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${
              isHovered
                 ? project.glowColor === "cyan"
                   ? "border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.15)] bg-white/[0.06]"
                   : project.glowColor === "purple"
                     ? "border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)] bg-white/[0.06]"
                     : "border-purple-500/20 border-r-indigo-500/20 shadow-[0_0_25px_rgba(168,85,247,0.1)] bg-white/[0.06]"
                 : "border-white/[0.06] bg-white/[0.03]"
            }`}
          >
            {/* Background glowing sphere that moves or shines slightly */}
            <div className={`absolute -right-16 -bottom-16 w-32 h-32 rounded-full blur-3xl opacity-10 transition-all duration-500 group-hover:scale-150 ${
              project.glowColor === "cyan" 
                ? "bg-indigo-500 group-hover:opacity-25" 
                : project.glowColor === "purple" 
                  ? "bg-purple-500 group-hover:opacity-25" 
                  : "bg-gradient-to-tr from-indigo-500 to-purple-500 group-hover:opacity-25"
            }`} />

            {/* Top Row - Icon, Tech Count & Link Button */}
            <div className="flex items-center justify-between z-10">
              <div className={`p-3 rounded-xl transition-all duration-300 ${
                isHovered 
                   ? project.glowColor === "cyan" 
                     ? "bg-indigo-500/20 text-indigo-400" 
                     : project.glowColor === "purple"
                       ? "bg-purple-500/20 text-purple-400"
                       : "bg-indigo-500/20 text-indigo-400"
                   : "bg-zinc-900/60 text-zinc-400"
              }`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  {project.metrics.label}: <span className="text-zinc-300">{project.metrics.value}</span>
                </span>
                <div className="text-zinc-600 hover:text-white transition-colors p-1.5 rounded-lg bg-zinc-900/40 border border-white/5">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>
            </div>

            {/* Middle Section - Text details */}
            <div className="space-y-2 mt-4 z-10 relative">
               <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase font-bold">
                {project.category}
              </span>
              <h3 className="font-display font-semibold text-lg text-white group-hover:text-zinc-100 leading-snug">
                {project.title}
              </h3>

              {/* Dynamic cross-fading description with AnimatePresence */}
              <div className="relative h-20 overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isHovered ? (
                    <motion.p
                      key="short"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-zinc-400 leading-relaxed absolute top-0 left-0 right-0"
                    >
                      {project.description}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="full"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-zinc-300 leading-relaxed absolute top-0 left-0 right-0"
                    >
                      {project.fullDesc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Row - Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 z-10">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium text-zinc-400 bg-zinc-950/80 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
