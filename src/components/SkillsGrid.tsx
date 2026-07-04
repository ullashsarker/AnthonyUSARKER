import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Code2, 
  Terminal, 
  BrainCircuit, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Palette,
  Share2
} from "lucide-react";
import ThreeDCard from "./ThreeDCard";

interface SkillItem {
  name: string;
  level: number; // percentage out of 100
  details: string[];
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  glowColor: "cyan" | "purple" | "dual";
  shortDesc: string;
  skills: SkillItem[];
}

export default function SkillsGrid() {
  const [activeTab, setActiveTab] = useState<string>("ai_ops");

  const skillCategories: SkillCategory[] = [
    {
      id: "ai_ops",
      title: "AI Operations",
      icon: BrainCircuit,
      glowColor: "dual",
      shortDesc: "Bespoke assistant engineering, intelligent conversational agents, and high-volume scripts.",
      skills: [
        { name: "Custom AI Assistant Architecture", level: 98, details: ["Personal Productivity Bot", "System Prompt Hardening", "RAG Alignment"] },
        { name: "Intelligent Conversational Chatbots", level: 96, details: ["NLU Webhook Routing", "API Gateway Integration", "Dynamic State Management"] },
        { name: "Advanced Prompt Engineering", level: 98, details: ["Few-shot Calibration", "Prompt Attack Guardrails", "Output Formatting Filters"] },
        { name: "Automated High-Volume Workflow Scripts", level: 94, details: ["Node.js Run Loops", "Batch Generation Scripts", "Scraped Content Pipelines"] }
      ]
    },
    {
      id: "pinterest",
      title: "Digital & Pinterest Marketing",
      icon: Share2,
      glowColor: "purple",
      shortDesc: "Driving high-CTR pin aesthetics, strategic boards optimization, and automated viral traffic scaling.",
      skills: [
        { name: "Strategic Pinterest Marketing", level: 97, details: ["Algorithmic SEO Placement", "Keyword Mapping", "Audience Insights"] },
        { name: "High-Engagement Pin Designing", level: 96, details: ["Dynamic Typography Pairing", "Viral Aesthetic Testing", "Ratio Optimization"] },
        { name: "Board Optimization", level: 95, details: ["Categorization Matrix", "Keyword-Rich Metadata", "Board Management"] },
        { name: "Viral Content Funnels & Growth Automation", level: 94, details: ["Automated Publishing Schedules", "Outreach Pipeline Syncing", "Conversion Optimization"] }
      ]
    },
    {
      id: "design",
      title: "Design & Content Creation",
      icon: Palette,
      glowColor: "cyan",
      shortDesc: "Expert visual asset production, layout customization, and high-converting graphic banners.",
      skills: [
        { name: "Expert Visual Asset Design", level: 96, details: ["Composition Theory", "Brand Identity Guidelines", "Vector Asset Designing"] },
        { name: "Adobe Photoshop Mastery", level: 94, details: ["Advanced Compositing", "Bulk Action Macros", "Color Correction"] },
        { name: "Canva Layout Customization", level: 98, details: ["Speed Prototyping", "Template Libraries Tuning", "Consistency Guardrails"] },
        { name: "High-Converting Banner Graphics", level: 95, details: ["A/B Tested Visuals", "Social CTA Layouts", "Optimized CTR Assets"] }
      ]
    },
    {
      id: "tech",
      title: "Tech & Web Development",
      icon: Code2,
      glowColor: "cyan",
      shortDesc: "Building modern scalable interfaces, Node.js optimization, and lag-free interactive experiences.",
      skills: [
        { name: "Frontend Engineering (HTML5, Tailwind CSS, JS UI)", level: 96, details: ["Interactive Canvas API", "Modern Framer Motion", "Semantic Fluid Layouts"] },
        { name: "Node.js Environment Optimization", level: 92, details: ["Package Bundlers (Vite)", "Task Automation Engines", "Async Event Architectures"] },
        { name: "API Integration & Core Logic", level: 94, details: ["RESTful JSON Parsing", "Secure API Proxies", "State Store Managers"] },
        { name: "Lag-Free Canvas Scroll Optimization", level: 93, details: ["ResizeObserver Guards", "Debounced Events", "Animation Frame Locks"] }
      ]
    },
    {
      id: "bulk_systems",
      title: "Bulk Messaging & Systems",
      icon: Terminal,
      glowColor: "purple",
      shortDesc: "Industrial email delivery grids, domain warming setups, and OS tuning configurations.",
      skills: [
        { name: "Bulk Email Architecture", level: 98, details: ["Mailgun SMTP Relays", "Outlook Batch Grids", "Word Mail Merge Routing"] },
        { name: "Deliverability Tuning & Verification", level: 97, details: ["Catch-All Domains Setup", "Bouncify Filtering", "Spam-Score Audits"] },
        { name: "Linux Systems (Ubuntu & Zorin OS)", level: 92, details: ["Bash System Daemons", "Automated Cron Jobs", "SSH Security Opts"] },
        { name: "Windows 11 Pro Performance Tuning", level: 94, details: ["Registry Tuning", "PowerShell Automation", "WSL2 Containers Setup"] }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.id === activeTab) || skillCategories[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Category Selection Sidebar */}
      <div className="lg:col-span-5 space-y-4">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeTab === category.id;
          
          return (
            <div
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                isActive 
                   ? category.glowColor === "cyan"
                     ? "bg-indigo-950/15 border-indigo-500/30 box-glow-blue"
                     : category.glowColor === "purple"
                       ? "bg-purple-950/15 border-purple-500/30 box-glow-purple"
                       : "bg-slate-900/40 border-purple-500/30 box-glow-dual"
                   : "bg-white/[0.03] border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? category.glowColor === "cyan" 
                      ? "bg-indigo-500/20 text-indigo-400 glow-blue" 
                      : "bg-purple-500/20 text-purple-400 glow-purple" 
                    : "bg-zinc-900/80 text-zinc-400 group-hover:text-zinc-200"
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className={`font-display font-medium text-md transition-colors ${
                    isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                  }`}>
                    {category.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {category.shortDesc}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 text-zinc-600 self-center transition-transform duration-300 ${
                  isActive ? "translate-x-1 text-zinc-300" : "group-hover:translate-x-1 group-hover:text-zinc-400"
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills Detail Display */}
      <div className="lg:col-span-7">
        <ThreeDCard 
          glowColor={currentCategory.glowColor}
          className="h-full min-h-[460px] flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className={`p-2 rounded-lg ${
                currentCategory.glowColor === "cyan" 
                  ? "bg-indigo-500/10 text-indigo-400" 
                  : currentCategory.glowColor === "purple"
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-indigo-500/10 text-indigo-400"
              }`}>
                <currentCategory.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs tracking-wider text-purple-400 uppercase font-semibold">
                  Technical Metrics
                </span>
                <h3 className="font-display font-semibold text-lg text-white">
                  {currentCategory.title}
                </h3>
              </div>
            </div>

            {/* List of Skills with Progress Bars */}
            <div className="space-y-6">
              {currentCategory.skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-sans font-medium text-zinc-200">{skill.name}</span>
                    <span className="font-mono text-xs font-semibold text-purple-400 glow-purple">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Outer track */}
                  <div className="h-2 w-full bg-zinc-950/80 rounded-full overflow-hidden border border-white/5">
                    {/* Inner glowing bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        currentCategory.glowColor === "cyan"
                          ? "bg-gradient-to-r from-indigo-600 to-blue-400 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                          : currentCategory.glowColor === "purple"
                            ? "bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                            : "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                      }`}
                    />
                  </div>

                  {/* Bullet Spec details with Staggered Entrance */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skill.details.map((detail) => (
                      <span 
                        key={detail}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-zinc-400 bg-zinc-950/40 border border-white/5"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-xs text-zinc-500 font-mono">
            <span>Verified Core Competencies</span>
            <span className="flex items-center gap-1 text-purple-400">
              <ShieldCheck className="w-4 h-4 text-purple-400 animate-pulse" />
              Operational Master-Level
            </span>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
}