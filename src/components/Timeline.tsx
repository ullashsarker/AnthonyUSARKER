import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Sparkles, Building2 } from "lucide-react";
import { usePortfolioImage } from "../lib/imageStorage";

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
  const experiences: TimelineEvent[] = [
    {
      role: "Full-Stack Software & AI Developer",
      company: "Independent Contracts",
      period: "3+ Years Parallel",
      location: "Remote / Global",
      description: "Engineered and deployed 15+ custom web/software apps, layout customizations, bespoke UI layouts, automated chat workflows, scraping assets, and automation scripts.",
      highlights: [
        "Architected scalable bulk email deployment arrays utilizing Mailgun and Outlook relays.",
        "Optimized frontend render passes reducing paint latency by up to 40% on low-end devices.",
        "Programmed local system utility controllers executing custom desktop automation chains."
      ]
    },
    {
      role: "Front-Desk Cashier",
      company: "Hotel Elite Palace",
      period: "Jun 2023 - Jun 2025",
      location: "Cumilla, Bangladesh",
      description: "Managed high-volume daily cash transactions, POS (Point of Sale/Opera) billing software, customer relationship management, and inter-departmental coordination.",
      highlights: [
        "Ensured zero-discrepancy daily cash reports through custom ledger verification matrices.",
        "Streamlined check-in workflows, reducing client onboarding wait times from 8 to 3 minutes.",
        "Managed cross-departmental operations, ensuring seamless POS/invoice transitions."
      ]
    },
    {
      role: "Social Media Marketing Specialist",
      company: "Cloud IT Solution",
      period: "Feb 2022 - May 2023",
      location: "Dhaka, Bangladesh",
      description: "Automated platform outreach systems, graphics deployment, digital engagement, and community building.",
      highlights: [
        "Deployed multi-domain warming systems securing high domain reputation and 98%+ inbox delivery.",
        "Automated CRM synchronization flows that transferred leads into active sales funnels.",
        "Collaborated with graphic designers to implement responsive, high-CTR templates."
      ]
    },
    {
      role: "Pinterest Marketing & Pin Designing Specialist",
      company: "Tribus Limited",
      period: "Dec 2020 - Jan 2022",
      location: "Dhaka, Bangladesh",
      description: "Mastered professional visual pin asset creation, bulk graphic design pipelines via Photoshop and Canva, and viral traffic scaling.",
      highlights: [
        "Created engaging visual assets optimized for high click-through rates.",
        "Orchestrated structured pin publication schedules and community expansion plans.",
        "Analyzed referral traffic to refine high-conversion marketing funnels."
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
      {/* Left Pane - Interactive Vertical Timeline */}
      <div className="lg:col-span-7 space-y-8 relative">
        {/* Vertical Timeline Guide Line */}
        <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent opacity-20 hidden md:block" />

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
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 z-10 transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
              <Briefcase className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
            </div>

            {/* Event Details Card */}
            <div className="flex-1 p-6 rounded-2xl glass-panel border border-white/[0.06] group-hover:border-white/10 transition-all duration-300 relative overflow-hidden bg-white/[0.03]">
              {/* Background accent glow */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-all duration-500 pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div>
                  <h4 className="font-display font-semibold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400 font-sans">
                    <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium text-zinc-300">{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs text-zinc-500 border-l border-white/10 pl-2">
                        <MapPin className="w-3 h-3 text-zinc-600" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-300 bg-purple-950/20 border border-purple-500/20">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
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
                    <span className="p-0.5 rounded-full bg-purple-500/20 text-purple-400 mt-0.5 shrink-0">
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

      {/* Right Pane - Featured Corporate Image Frame (Two stacked images) */}
      <div className="lg:col-span-5 flex flex-col gap-6 items-center justify-center">
        {/* Photo 1: Headphones (Night Setup) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden box-glow-purple p-1 group scan-line"
        >
          {/* Inner Image Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950">
            <img
              src={nightSrc}
              alt="Anthony Ullash Sarker Corporate Event"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 filter saturate-75 group-hover:saturate-100"
            />
            
            {/* Cyber Corner brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Glowing Tag overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-lg glass-panel border border-white/10 text-center bg-zinc-950/80">
              <span className="font-mono text-[9px] tracking-widest text-purple-400 uppercase font-bold block mb-0.5">
                Operational Setup
              </span>
              <p className="font-display font-medium text-[11px] text-white">
                Frontend Management & Operations Executive Setup
              </p>
            </div>
          </div>
        </motion.div>

        {/* Photo 2: Elite Continental (Steps) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden box-glow-purple p-1 group scan-line"
        >
          {/* Inner Image Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950">
            <img
              src={stairsSrc}
              alt="Anthony Ullash Sarker Corporate Event Steps"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 filter saturate-75 group-hover:saturate-100"
            />
            
            {/* Cyber Corner brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Glowing Tag overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-lg glass-panel border border-white/10 text-center bg-zinc-950/80">
              <span className="font-mono text-[9px] tracking-widest text-purple-400 uppercase font-bold block mb-0.5">
                Corporate Venue
              </span>
              <p className="font-display font-medium text-[11px] text-white">
                Elite Continental Operations & Logistics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
