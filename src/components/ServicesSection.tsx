import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BrainCircuit, 
  Code2, 
  Share2, 
  Palette, 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  Printer 
} from "lucide-react";
import ServiceDetailModal from "./ServiceDetailModal";

const services = [
  {
    id: "ai-operations",
    icon: BrainCircuit,
    title: "AI Operations",
    description: "Designing custom AI assistants, intelligent chatbots, and automated workflow scripts that drive results.",
    color: "from-purple-500 to-indigo-500",
    glowVar: "rgba(168, 85, 247, 0.08)",
    iconBg: "bg-purple-500/15 text-purple-400",
  },
  {
    id: "web-dev",
    icon: Code2,
    title: "Web Development",
    description: "Building fast, responsive and modern websites with clean code and cutting-edge frameworks.",
    color: "from-blue-500 to-indigo-500",
    glowVar: "rgba(59, 130, 246, 0.08)",
    iconBg: "bg-blue-500/15 text-blue-400",
  },
  {
    id: "pinterest-marketing",
    icon: Share2,
    title: "Pinterest Marketing",
    description: "Crafting viral pin strategies and automated content funnels that stand out from the crowd.",
    color: "from-pink-500 to-rose-500",
    glowVar: "rgba(236, 72, 153, 0.08)",
    iconBg: "bg-pink-500/15 text-pink-400",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Driving targeted traffic, generating warm leads, and scaling conversions with ROI-focused funnels.",
    color: "from-emerald-500 to-teal-500",
    glowVar: "rgba(16, 185, 129, 0.08)",
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
  {
    id: "ui-ux-design",
    icon: Layers,
    title: "UI/UX Designing",
    description: "Designing beautiful, user-centric interfaces and interactive prototypes that engage and convert.",
    color: "from-cyan-500 to-blue-500",
    glowVar: "rgba(6, 182, 212, 0.08)",
    iconBg: "bg-cyan-500/15 text-cyan-400",
  },
  {
    id: "print-design",
    icon: Printer,
    title: "Print Design",
    description: "Crafting tangible, high-impact marketing materials that elevate your offline brand presence.",
    color: "from-amber-500 to-orange-500",
    glowVar: "rgba(245, 158, 11, 0.08)",
    iconBg: "bg-amber-500/15 text-amber-400",
  },
  {
    id: "brand-identity",
    icon: Palette,
    title: "Brand Identity",
    description: "Creating memorable brand identities, custom logos, and guidelines that set your business apart.",
    color: "from-rose-500 to-purple-500",
    glowVar: "rgba(244, 63, 94, 0.08)",
    iconBg: "bg-rose-500/15 text-rose-400",
  },
];

export default function ServicesSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs tracking-[0.2em] text-purple-400 uppercase font-semibold block">
            What I Do
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Services I Offer
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedServiceId(service.id)}
                className="service-card group cursor-pointer card-shine"
                style={{ "--card-glow": service.glowVar } as React.CSSProperties}
              >
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-[17px] text-white group-hover:text-white/90">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Learn More */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
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
