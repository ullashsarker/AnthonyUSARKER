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
  ArrowUpRight,
  Sparkles,
  Cpu
} from "lucide-react";
import ProjectDetailModal, { ProjectData } from "./ProjectDetailModal";

export default function ProjectsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: "ai-assistant",
      title: "Personal AI Assistant & Automation Hub",
      category: "Core AI & Automation",
      badge: "Flagship Agent",
      description: "Advanced custom productivity bot driving desktop configurations, task execution, and system prompts.",
      fullDesc: "Bespoke desktop intelligence agent built to automate local workflows, execute shell scripts, compile complex data matrices, and interface seamlessly with Google Gemini LLMs for contextual assistance.",
      architectureDetails: [
        "Constructed custom RAG vector context memory enabling persistent recall of codebase dependencies.",
        "Integrated robust system prompt guardrails preventing prompt injection and hallucinated CLI commands.",
        "Engineered background task execution runners reducing manual spreadsheet and config tasks by 70%."
      ],
      techStack: ["TypeScript", "Node.js", "Gemini API", "Electron Shell", "Vector DB"],
      metrics: { label: "Efficiency", value: "3.5x Faster" },
      glowColor: "cyan"
    },
    {
      id: "ai-chatbot",
      title: "Intelligent Conversational NLU Gateway",
      category: "Conversational AI Systems",
      badge: "Autonomous Bot",
      description: "Natural language client handling system with smooth API webhooks and stateful conversation flows.",
      fullDesc: "Enterprise-grade conversational gateway engineered to resolve customer intent in real-time. Features stateful multi-turn dialogues, fallbacks, dynamic webhook triggers, and automated inquiry escalation.",
      architectureDetails: [
        "Architected multi-branch conversation decision trees maintaining sub-second API roundtrip responses.",
        "Implemented webhook synchronizers linking customer inquiries directly to CRM and team messaging channels.",
        "Achieved a 95% intent recognition accuracy score across diverse multi-lingual user inquiries."
      ],
      techStack: ["Node.js", "Express", "RESTful Webhooks", "State Machines", "Tailwind CSS"],
      metrics: { label: "Precision", value: "95% Accuracy" },
      glowColor: "purple"
    },
    {
      id: "bulk-email-engine",
      title: "Enterprise Bulk Email Array",
      category: "Infrastructure & Deliverability",
      badge: "High Deliverability",
      description: "Scalable marketing grid with intelligent multi-domain delivery algorithms and automated warming.",
      fullDesc: "Distributed email transmission infrastructure built with rotating IP topologies, automated domain warming algorithms, SPF/DKIM/DMARC alignment, and real-time bounce tracking to maximize primary inbox placement.",
      architectureDetails: [
        "Engineered multi-domain warming sequences securing 98.8% inbox delivery across major email providers.",
        "Configured custom Mailgun SMTP relays with automated fallback routes and throttle controls.",
        "Programmed automated catch-all filtering matrices eliminating spam-trap and dormant address penalties."
      ],
      techStack: ["Mailgun SDK", "Ubuntu Linux", "DNS Security (DKIM/SPF)", "Bouncify API", "Bash"],
      metrics: { label: "Inbox Delivery", value: "98.8% Ratio" },
      glowColor: "cyan"
    },
    {
      id: "mail-checker",
      title: "ANT High-Throughput Mail Validator",
      category: "High-Volume Verification",
      badge: "Lag-Free Tool",
      description: "A standalone high-performance validator utilizing direct socket handshakes to audit massive record sets.",
      fullDesc: "High-throughput validation utility designed to process hundreds of thousands of mail records with zero UI frame drops. Utilizes non-blocking socket connections and parallel worker streams.",
      architectureDetails: [
        "Implemented native socket handshakes bypassing slow HTTP overhead for 5,000+ checks per minute.",
        "Built lag-free virtualized list scrolling with zero DOM lag even when handling 100K+ rows.",
        "Configured real-time DNS MX record resolution with intelligent caching."
      ],
      techStack: ["HTML5 Canvas", "SMTP Sockets", "Parallel Node Streams", "Tailwind CSS"],
      metrics: { label: "Throughput", value: "5K / min" },
      glowColor: "cyan"
    },
    {
      id: "pinterest-engine",
      title: "Viral Visual Search & Content Engine",
      category: "Growth & Automation",
      badge: "Visual Funnel",
      description: "Custom-designed automated design workflows using templates and asset managers yielding massive impressions.",
      fullDesc: "Automated content generation and distribution pipeline engineered for Pinterest's visual search algorithm. Orchestrates bulk layout rendering, SEO metadata generation, and scheduled publishing.",
      architectureDetails: [
        "Built automated Photoshop and Canva macro scripts generating 50+ branded visual assets daily.",
        "Developed Pinterest SEO tag matrices driving over 1.2M+ organic impressions monthly.",
        "Engineered automated queue scheduling syncing blog posts directly to visual pin funnels."
      ],
      techStack: ["Photoshop Macros", "Canva API", "Tailwind App", "Pinterest SEO", "Node.js"],
      metrics: { label: "Impressions", value: "1.2M+ Monthly" },
      glowColor: "dual"
    },
    {
      id: "bd-bag-store",
      title: "BD-Bag-Store Cloud E-Commerce",
      category: "E-Commerce Deployment",
      badge: "Cloud Storefront",
      description: "Modern e-commerce deployment featuring cloud database hosting, real-time inventory, and serverless payments.",
      fullDesc: "High-performance consumer goods storefront built with React and Tailwind CSS. Features instant product filtering, shopping cart drawer, real-time stock sync via cloud Firestore, and secure checkout flows.",
      architectureDetails: [
        "Constructed optimistic UI state updates for immediate cart interactions without network lag.",
        "Integrated Firestore real-time listeners ensuring inventory counts remain synchronized across all sessions.",
        "Optimized client bundle and asset delivery for high mobile conversion rates."
      ],
      techStack: ["React 19", "Tailwind CSS", "Firestore Cloud", "Firebase Auth", "Vite"],
      metrics: { label: "Checkout", value: "Fully Secured" },
      glowColor: "purple"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(project)}
              className={`group relative h-[390px] rounded-2xl glass-panel p-6 border transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${
                isHovered
                   ? project.glowColor === "cyan"
                     ? "border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.18)] bg-white/[0.06] -translate-y-1.5"
                     : project.glowColor === "purple"
                       ? "border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.18)] bg-white/[0.06] -translate-y-1.5"
                       : "border-indigo-400/40 shadow-[0_0_30px_rgba(99,102,241,0.18)] bg-white/[0.06] -translate-y-1.5"
                   : "border-white/[0.07] bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {/* Background glowing sphere that expands on hover */}
              <div 
                className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-3xl opacity-15 transition-all duration-700 pointer-events-none group-hover:scale-175 ${
                  project.glowColor === "cyan" 
                    ? "bg-cyan-500 group-hover:opacity-30" 
                    : project.glowColor === "purple" 
                      ? "bg-purple-500 group-hover:opacity-30" 
                      : "bg-gradient-to-tr from-cyan-400 to-purple-500 group-hover:opacity-30"
                }`} 
              />

              {/* Top Row - Category Badge & Arrow Pill */}
              <div className="flex items-center justify-between z-10 gap-2">
                <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 font-semibold">
                  {project.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400 font-medium">
                    {project.metrics.label}: <strong className="text-white font-bold">{project.metrics.value}</strong>
                  </span>
                  <div className="text-slate-400 group-hover:text-white transition-colors p-1.5 rounded-lg bg-zinc-900/60 border border-white/10 group-hover:border-purple-400/30">
                    <ArrowUpRight className="w-4 h-4 group-hover:text-cyan-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Middle Section - Title and Description */}
              <div className="space-y-3 mt-4 z-10 relative">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* View Details Hint */}
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Click for system specs & architecture</span>
                </div>
              </div>

              {/* Bottom Row - Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 z-10">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium text-slate-300 bg-zinc-950/80 border border-white/5 group-hover:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-500/20">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
