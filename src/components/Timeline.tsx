import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Sparkles, Building2, Maximize2 } from "lucide-react";
import { usePortfolioImage } from "../lib/imageStorage";
import ImageLightboxModal from "./ImageLightboxModal";

interface TimelineEvent {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
}

export default function Timeline() {
  const { src: nightSrc } = usePortfolioImage("lifestyleNight");
  const { src: stairsSrc } = usePortfolioImage("lifestyleStairs");

  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    subtitle?: string;
    location?: string;
  }>({
    isOpen: false,
    imageSrc: "",
    title: "",
    subtitle: "",
    location: ""
  });
  const experiences: TimelineEvent[] = [
    {
      role: "Full-Stack Software & AI Systems Engineer",
      company: "Independent Contracts",
      period: "4+ Years Parallel",
      location: "Remote / Global",
      description: "Engineered and deployed 80+ custom web apps, intelligent automation agents, RAG pipelines, distributed SMTP arrays, and mission-critical workflows for international clients.",
      highlights: [
        "Architected scalable bulk email deployment arrays utilizing Mailgun, Outlook relays, and automated DNS warming.",
        "Optimized frontend render cycles reducing paint latency by up to 45% on low-end client devices.",
        "Programmed bespoke AI desktop controllers and autonomous batch processing chains that save 25+ human hours weekly."
      ]
    },
    {
      role: "Operations & Workflow Management Executive",
      company: "Hotel Elite Palace",
      period: "Jun 2023 - Jun 2025",
      location: "Cumilla, Bangladesh",
      description: "Directed high-volume front-line operations, POS ledger synchronization, desk workflow throughput, financial reconciliation matrices, and cross-departmental coordination.",
      highlights: [
        "Enforced custom multi-point ledger verification matrices, maintaining a 100% zero-discrepancy financial audit record.",
        "Engineered standardized front-desk customer intake pipelines, slashing guest onboarding wait times from 8 to under 3 minutes.",
        "Harmonized cross-departmental operations between POS billing terminals, inventory databases, and executive financial reports."
      ]
    },
    {
      role: "Digital Systems & Automation Specialist",
      company: "Cloud IT Solution",
      period: "Feb 2022 - May 2023",
      location: "Dhaka, Bangladesh",
      description: "Designed multi-channel outreach automation, digital infrastructure synchronization, CRM lead pipelines, and conversion analytics.",
      highlights: [
        "Deployed multi-domain warming systems securing top-tier sender reputation and consistent 98%+ inbox delivery rates.",
        "Automated CRM synchronization flows that instantly routed verified inbound leads into active sales funnels.",
        "Implemented data analytics dashboards tracking campaign ROI and user conversion funnels in real time."
      ]
    },
    {
      role: "Digital Growth & Visual Asset Specialist",
      company: "Tribus Limited",
      period: "Dec 2020 - Jan 2022",
      location: "Dhaka, Bangladesh",
      description: "Orchestrated large-scale visual content pipelines, automated graphic deployment workflows, and organic traffic growth funnels.",
      highlights: [
        "Engineered automated bulk graphic generation pipelines via Photoshop scripting and structured template engines.",
        "Orchestrated scheduled content publication systems driving over 1.2M+ monthly organic impressions.",
        "Analyzed referral audience analytics to iterate on high-conversion landing page funnels."
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
      {/* Left Pane - Interactive Vertical Timeline */}
      <div className="lg:col-span-7 space-y-8 relative">
        {/* Vertical Timeline Guide Line */}
        <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/20 via-zinc-600/20 to-transparent hidden md:block" />

        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.role}-${exp.company}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative flex flex-col md:flex-row gap-6 group"
          >
            {/* Timeline node bullet (desktop only) */}
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-zinc-950 z-10 transition-all duration-300 group-hover:border-white/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0">
              <Briefcase className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>

            {/* Event Details Card */}
            <div className="flex-1 p-6 rounded-2xl glass-panel border border-white/[0.06] group-hover:border-white/15 transition-all duration-300 relative overflow-hidden bg-white/[0.03]">
              {/* Background accent glow */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-white/[0.02] blur-3xl group-hover:bg-white/[0.04] transition-all duration-500 pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div>
                  <h4 className="font-display font-semibold text-lg text-white group-hover:text-zinc-200 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400 font-sans">
                    <Building2 className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="font-medium text-zinc-300">{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs text-zinc-500 border-l border-white/10 pl-2">
                        <MapPin className="w-3 h-3 text-zinc-600" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-300 bg-white/[0.05] border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {exp.period}
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                {exp.description}
              </p>

              {/* Accomplishments Bullet list */}
              <ul className="mt-4 space-y-2">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                    <span className="p-0.5 rounded-full bg-white/10 text-zinc-300 mt-0.5 shrink-0">
                      <Sparkles className="w-3 h-3" />
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Pane - Featured Corporate Image Frame (Interactive Gallery with Lightbox) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="space-y-1">
          <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-400 font-bold block">
            Executive Presence
          </span>
          <h4 className="font-display font-bold text-lg text-white">
            Operations & Venue Logistics
          </h4>
        </div>

        {/* Photo 1: Headphones (Night Setup) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setLightboxData({
            isOpen: true,
            imageSrc: nightSrc,
            title: "Executive Operations Command Setup",
            subtitle: "Frontend Management & Operations Executive Setup",
            location: "Cumilla, Bangladesh"
          })}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden glass-panel border border-white/10 group cursor-pointer shadow-xl hover:border-white/30 transition-all duration-500"
        >
          <div className="relative w-full h-full overflow-hidden bg-zinc-950">
            <img
              src={nightSrc}
              alt="Anthony Ullash Sarker Corporate Setup"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
            />
            
            {/* Cyber Corner brackets */}
            <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Hover zoom pill */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/80 border border-white/20 p-1.5 rounded-lg text-white">
              <Maximize2 className="w-3.5 h-3.5 text-zinc-200" />
            </div>

            {/* Glowing Tag overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-panel border border-white/10 bg-zinc-950/85 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold block mb-0.5">
                    Operational Setup
                  </span>
                  <p className="font-display font-medium text-xs text-white">
                    Frontend Management & Operations Executive Setup
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Zoom
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo 2: Elite Continental (Steps) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onClick={() => setLightboxData({
            isOpen: true,
            imageSrc: stairsSrc,
            title: "Corporate Venue & Facility Coordination",
            subtitle: "Elite Continental Operations & Logistics",
            location: "Hotel Elite Palace"
          })}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden glass-panel border border-white/10 group cursor-pointer shadow-xl hover:border-white/30 transition-all duration-500"
        >
          <div className="relative w-full h-full overflow-hidden bg-zinc-950">
            <img
              src={stairsSrc}
              alt="Anthony Ullash Sarker Corporate Event Steps"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
            />
            
            {/* Cyber Corner brackets */}
            <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-white/40 opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Hover zoom pill */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/80 border border-white/20 p-1.5 rounded-lg text-white">
              <Maximize2 className="w-3.5 h-3.5 text-zinc-200" />
            </div>

            {/* Glowing Tag overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-panel border border-white/10 bg-zinc-950/85 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold block mb-0.5">
                    Corporate Venue
                  </span>
                  <p className="font-display font-medium text-xs text-white">
                    Elite Continental Operations & Logistics
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  Zoom
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData(prev => ({ ...prev, isOpen: false }))}
        imageSrc={lightboxData.imageSrc}
        title={lightboxData.title}
        subtitle={lightboxData.subtitle}
        location={lightboxData.location}
      />
    </div>
  );
}
