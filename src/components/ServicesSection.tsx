import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Cpu, Layers, ShieldCheck } from "lucide-react";
import ServiceDetailModal from "./ServiceDetailModal";
import ServiceIcon from "./ServiceIcon";

// Core Flagship Pillars — positioning Anthony as an elite AI Operations & Systems Architect
const primaryServices = [
  {
    id: "ai-operations",
    title: "AI Operations & Automation",
    badge: "Core Specialization",
    description:
      "Architecting custom AI assistants, production RAG knowledge bases, multi-agent pipelines, and autonomous workflow scripts that eliminate manual operational bottlenecks.",
    color: "from-purple-500 via-indigo-500 to-cyan-400",
    glowVar: "rgba(142, 114, 238, 0.15)",
    iconBg: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    features: [
      "Custom AI Chatbots & Knowledge Bases",
      "RAG Architecture & Dynamic Context Engines",
      "Autonomous Make & Zapier API Loops",
      "Prompt Optimization & Guardrails"
    ],
    metric: "Saves 20+ hrs/week"
  },
  {
    id: "web-dev",
    title: "High-Performance Web Development",
    badge: "Full-Stack Engineering",
    description:
      "Building lightning-fast, reactive, modern web applications with clean architecture, robust state management, and pixel-perfect responsive interactions.",
    color: "from-cyan-400 via-blue-500 to-indigo-600",
    glowVar: "rgba(0, 215, 210, 0.15)",
    iconBg: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
    features: [
      "Modern React 19, TypeScript & Vite SPAs",
      "High-Performance SSR & Next.js Architecture",
      "Secure RESTful APIs & Authentication",
      "State Management & Database Synchronization"
    ],
    metric: "90+ PageSpeed Score"
  },
  {
    id: "systems-architecture",
    title: "Digital & Systems Architecture",
    badge: "Infrastructure & Deliverability",
    description:
      "Engineering industrial-scale email delivery grids, domain warming algorithms, Linux system daemons, and automated data pipelines designed for 99.9% uptime.",
    color: "from-indigo-500 via-purple-500 to-rose-500",
    glowVar: "rgba(99, 102, 241, 0.15)",
    iconBg: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20",
    features: [
      "Bulk SMTP Grids & Relays (Mailgun / Outlook)",
      "DNS Security Calibration (SPF, DKIM, DMARC)",
      "Linux Server Automation & Worker Daemons",
      "High-Throughput Socket & Batch Syncing"
    ],
    metric: "98%+ Inbox Deliverability"
  }
];

// Secondary / Specialized capabilities organized neatly into an "Additional Expertise" section
const secondaryServices = [
  {
    id: "pinterest-marketing",
    title: "Visual Search & Pinterest Growth",
    description: "Developing automated visual pin funnels, strategic board SEO, and viral reach pipelines.",
    tag: "Growth Engine"
  },
  {
    id: "digital-marketing",
    title: "Digital Growth & Funnel Optimization",
    description: "Architecting multi-channel lead funnels, automated email workflows, and conversion metrics.",
    tag: "Conversion Funnels"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX & Interactive Design Systems",
    description: "Crafting modern Figma prototypes, accessible interfaces, and developer-ready style guides.",
    tag: "Interface Systems"
  },
  {
    id: "brand-identity",
    title: "Brand Identity & Print Collateral",
    description: "Designing memorable visual identities, scalable vector logos, and press-ready CMYK media.",
    tag: "Visual Identity"
  }
];

export default function ServicesSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="space-y-14"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="relative space-y-2 pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
            <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
            
            <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">
              Specialized Solutions
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Primary Engineering Focus
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Delivering high-leverage digital systems built at the intersection of Artificial Intelligence, scalable web engineering, and automated infrastructure.
          </p>
        </div>

        {/* 1. Core Flagship Pillars (3-Card Highlight Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primaryServices.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedServiceId(service.id)}
              className="service-card group cursor-pointer card-shine flex flex-col justify-between"
              style={{ "--card-glow": service.glowVar } as React.CSSProperties}
            >
              <div className="relative z-10 space-y-5">
                {/* Header row with Icon and Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-13 h-13 rounded-2xl ${service.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                    <ServiceIcon id={service.id} className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-semibold">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Deliverable Highlights */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Key Deliverables
                  </span>
                  <ul className="space-y-1.5">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                        <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom footer bar with metric & CTA */}
              <div className="relative z-10 pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-purple-400 font-semibold">
                  {service.metric}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* 2. Additional Capabilities & Specialized Growth Sub-Section */}
        <div className="pt-6 space-y-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[11px] tracking-wider uppercase text-purple-400 font-semibold block">
                Additional Expertise
              </span>
              <h3 className="font-display font-semibold text-xl text-white">
                Growth, Interface & Visual Capabilities
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Supporting cross-functional brand, design, and traffic scaling needs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryServices.map((sub, idx) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setSelectedServiceId(sub.id)}
                className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {sub.tag}
                    </span>
                    <ServiceIcon id={sub.id} className="w-4 h-4 text-purple-400/80 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h4 className="font-display font-medium text-sm text-white group-hover:text-purple-300 transition-colors">
                    {sub.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-white transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Interactive Service Details Modal */}
      <ServiceDetailModal 
        selectedServiceId={selectedServiceId} 
        onClose={() => setSelectedServiceId(null)} 
      />
    </section>
  );
}
