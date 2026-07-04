import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ServiceDetailModal from "./ServiceDetailModal";
import ServiceIcon from "./ServiceIcon";

const services = [
  {
    id: "ai-operations",
    title: "AI Operations",
    description: "Designing custom AI assistants, intelligent chatbots, and automated workflow scripts that drive results.",
    color: "from-purple-500 to-cyan-400",
    glowVar: "rgba(142, 114, 238, 0.1)",
    iconBg: "bg-purple-500/15 text-purple-400",
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Building fast, responsive and modern websites with clean code and cutting-edge frameworks.",
    color: "from-cyan-500 to-purple-500",
    glowVar: "rgba(0, 215, 210, 0.1)",
    iconBg: "bg-cyan-500/15 text-cyan-400",
  },
  {
    id: "pinterest-marketing",
    title: "Pinterest Marketing",
    description: "Crafting viral pin strategies and automated content funnels that stand out from the crowd.",
    color: "from-purple-500 to-indigo-500",
    glowVar: "rgba(142, 114, 238, 0.1)",
    iconBg: "bg-purple-500/15 text-purple-400",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Driving targeted traffic, generating warm leads, and scaling conversions with ROI-focused funnels.",
    color: "from-cyan-400 to-indigo-600",
    glowVar: "rgba(0, 215, 210, 0.1)",
    iconBg: "bg-cyan-500/15 text-cyan-400",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Designing",
    description: "Designing beautiful, user-centric interfaces and interactive prototypes that engage and convert.",
    color: "from-purple-600 to-cyan-400",
    glowVar: "rgba(142, 114, 238, 0.1)",
    iconBg: "bg-purple-500/15 text-purple-400",
  },
  {
    id: "print-design",
    title: "Print Design",
    description: "Crafting tangible, high-impact marketing materials that elevate your offline brand presence.",
    color: "from-cyan-500 to-indigo-500",
    glowVar: "rgba(0, 215, 210, 0.1)",
    iconBg: "bg-cyan-500/15 text-cyan-400",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "Creating memorable brand identities, custom logos, and guidelines that set your business apart.",
    color: "from-purple-500 to-cyan-500",
    glowVar: "rgba(142, 114, 238, 0.1)",
    iconBg: "bg-purple-500/15 text-purple-400",
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
        <div className="relative space-y-2 pl-6">
          {/* Glowing gradient vertical bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full" />
          {/* Subtle glow spot */}
          <div className="absolute -left-10 top-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
          
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
                    <ServiceIcon id={service.id} className="w-6 h-6" />
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
