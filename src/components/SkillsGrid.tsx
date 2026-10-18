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
  shortDesc: string;
  skills: SkillItem[];
}

export default function SkillsGrid() {
  const [activeTab, setActiveTab] = useState<string>("ai_ops");

  const skillCategories: SkillCategory[] = [
    {
      id: "ai_ops",
      title: "AI Operations & Intelligence",
      icon: BrainCircuit,
      shortDesc: "Bespoke assistant engineering, intelligent conversational agents, and high-volume scripts.",
      skills: [
        { name: "Custom AI Assistant Architecture", level: 98, details: ["Personal Productivity Bot", "System Prompt Hardening", "RAG Alignment"] },
        { name: "Intelligent Conversational Chatbots", level: 96, details: ["NLU Webhook Routing", "API Gateway Integration", "Dynamic State Management"] },
        { name: "Advanced Prompt Engineering", level: 98, details: ["Few-shot Calibration", "Prompt Attack Guardrails", "Output Formatting Filters"] },
        { name: "Automated High-Volume Workflow Scripts", level: 94, details: ["Node.js Run Loops", "Batch Generation Scripts", "Scraped Content Pipelines"] }
      ]
    },
    {
      id: "tech",
      title: "Web & Full-Stack Development",
      icon: Code2,
      shortDesc: "Building modern scalable interfaces, Node.js optimization, and lag-free interactive experiences.",
      skills: [
        { name: "Frontend Engineering (React 19, Tailwind CSS, TypeScript)", level: 96, details: ["Interactive Canvas API", "Modern Framer Motion", "Semantic Fluid Layouts"] },
        { name: "Node.js & Backend Architecture", level: 94, details: ["Package Bundlers (Vite)", "Task Automation Engines", "Async Event Architectures"] },
        { name: "API Integration & Core Logic", level: 95, details: ["RESTful JSON Parsing", "Secure API Proxies", "State Store Managers"] },
        { name: "Lag-Free Native Mobile Optimization", level: 95, details: ["ResizeObserver Guards", "Debounced Events", "Touch Momentum Locks"] }
      ]
    },
    {
      id: "bulk_systems",
      title: "Systems & Digital Architecture",
      icon: Terminal,
      shortDesc: "Industrial email delivery grids, domain warming setups, and OS tuning configurations.",
      skills: [
        { name: "Bulk Email Architecture", level: 98, details: ["Mailgun SMTP Relays", "Outlook Batch Grids", "Word Mail Merge Routing"] },
        { name: "Deliverability Tuning & Verification", level: 97, details: ["Catch-All Domains Setup", "Bouncify Filtering", "Spam-Score Audits"] },
        { name: "Linux Systems (Ubuntu & Zorin OS)", level: 92, details: ["Bash System Daemons", "Automated Cron Jobs", "SSH Security Opts"] },
        { name: "Windows 11 Pro Performance Tuning", level: 94, details: ["Registry Tuning", "PowerShell Automation", "WSL2 Containers Setup"] }
      ]
    },
    {
      id: "pinterest",
      title: "Digital Growth & Visual Search",
      icon: Share2,
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
      title: "UI/UX & Content Creation",
      icon: Palette,
      shortDesc: "Expert visual asset production, layout customization, and high-converting graphic banners.",
      skills: [
        { name: "Expert Visual Asset Design", level: 96, details: ["Composition Theory", "Brand Identity Guidelines", "Vector Asset Designing"] },
        { name: "Adobe Photoshop Mastery", level: 94, details: ["Advanced Compositing", "Bulk Action Macros", "Color Correction"] },
        { name: "Canva Layout Customization", level: 98, details: ["Speed Prototyping", "Template Libraries Tuning", "Consistency Guardrails"] },
        { name: "High-Converting Banner Graphics", level: 95, details: ["A/B Tested Visuals", "Social CTA Layouts", "Optimized CTR Assets"] }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.id === activeTab) || skillCategories[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Category Selection Sidebar */}
      <div className="lg:col-span-5 space-y-3">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeTab === category.id;
          
          return (
            <div
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`group relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                isActive 
                  ? "bg-white/[0.08] border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                  : "bg-white/[0.03] border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-zinc-950 font-bold" 
                    : "bg-zinc-900/80 text-zinc-400 group-hover:text-zinc-200"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className={`font-display font-medium text-sm sm:text-base transition-colors ${
                    isActive ? "text-white font-semibold" : "text-zinc-300 group-hover:text-white"
                  }`}>
                    {category.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {category.shortDesc}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-600 self-center transition-transform duration-300 ${
                  isActive ? "translate-x-1 text-white" : "group-hover:translate-x-1 group-hover:text-zinc-400"
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills Detail Display */}
      <div className="lg:col-span-7">
        <ThreeDCard 
          className="h-full min-h-[460px] flex flex-col justify-between bg-[#121212]/80 backdrop-blur-xl border border-white/10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-white/10 text-white border border-white/10">
                <currentCategory.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs tracking-wider text-zinc-400 uppercase font-semibold">
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
                    <span className="font-mono text-xs font-bold text-white">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Outer track */}
                  <div className="h-1.5 w-full bg-zinc-950/80 rounded-full overflow-hidden border border-white/5">
                    {/* Inner glowing bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    />
                  </div>

                  {/* Bullet Spec details with Staggered Entrance */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skill.details.map((detail) => (
                      <span 
                        key={detail}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-zinc-400 bg-zinc-950/60 border border-white/5"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-zinc-400" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-center text-xs text-zinc-400 font-mono">
            <span>Verified Core Competencies</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              Operational Master-Level
            </span>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
}