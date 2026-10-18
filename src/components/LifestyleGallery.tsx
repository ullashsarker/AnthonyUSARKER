import { useState } from "react";
import { motion } from "motion/react";
import { Compass, Sailboat, Palmtree, Map, Maximize2, MapPin } from "lucide-react";
import { usePortfolioImage } from "../lib/imageStorage";
import ImageLightboxModal from "./ImageLightboxModal";

export default function LifestyleGallery() {
  const { src: seaSrc } = usePortfolioImage("lifestyleSea");
  const { src: bicycleSrc } = usePortfolioImage("lifestyleBicycle");

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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left side: Content / Philosophy of The Traveling Developer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-950/20 border border-purple-500/20">
              <Compass className="w-4 h-4 text-purple-400 animate-spin-slow" />
              Active Explorations
            </div>
            <h3 className="font-display font-semibold text-2xl text-white">
              The Traveling Developer
            </h3>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed font-sans">
            Traveling is the vital fuel for my problem-solving creativity. I am an avid explorer who has successfully navigated the diverse terrains of Bangladesh. My journeys include the breathtaking shores of Cox's Bazar and Saint Martin's Island, the majestic hill tracts of Bandarban, Rangamati, and Khagrachari, the serenity of Kuakata sea beach, the deep mangrove mysteries of the Sundarbans, the historical landscapes of Ishwardi, and the grueling high-altitude trek up the sacred Chandranath Hill. Navigating these vast, challenging terrains directly inspires my approach to cracking complex algorithmic structures.
          </p>

          {/* List of Expeditions */}
          <div className="space-y-4 pt-2">
            <div className="flex gap-4 p-4 rounded-xl glass-panel border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg h-fit">
                <Sailboat className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-medium text-sm text-zinc-200">River & Inland Navigation</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Navigating the wide, labyrinthine local river systems of Bangladesh by traditional boat networks, studying natural currents.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-xl glass-panel border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg h-fit">
                <Palmtree className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-medium text-sm text-zinc-200">Coastal Cycling Expeditions</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Traversing the sandy shorelines and winding marine drives of Saint Martin's Island and the vast horizons of Cox's Bazar on bicycle.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 font-mono text-xs text-zinc-500">
            <Map className="w-4 h-4 text-zinc-600" />
            <span>Synthesizing physical adventures into clean application nodes.</span>
          </div>
        </div>

        {/* Right side: Beautiful visual grid cards for traveling */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          {/* Scenic Beach Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setLightboxData({
              isOpen: true,
              imageSrc: seaSrc,
              title: "Finding Focus by the Coastal Horizon",
              subtitle: "Deep-focus ideation across Saint Martin's marine horizons",
              location: "Saint Martin's Island, Bangladesh"
            })}
            className="relative group rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-cyan-400/40 shadow-xl h-[360px] cursor-pointer transition-all duration-500"
          >
            <img
              src={seaSrc}
              alt="Finding focus by the horizon"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Hover zoom pill */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/80 border border-white/20 p-1.5 rounded-lg text-white">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Overlay Tag */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-wider uppercase text-cyan-400 font-bold block">
                  Coastal Expedition
                </span>
                <p className="font-display font-medium text-xs text-white">
                  Saint Martin Marine Horizons
                </p>
              </div>
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
            </div>
          </motion.div>

          {/* Coastal Cycling Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => setLightboxData({
              isOpen: true,
              imageSrc: bicycleSrc,
              title: "Coastal Cycling Trails",
              subtitle: "Exploring remote island trails on two wheels",
              location: "Cox's Bazar / Saint Martin"
            })}
            className="relative group rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-purple-500/40 shadow-xl h-[360px] cursor-pointer transition-all duration-500"
          >
            <img
              src={bicycleSrc}
              alt="Exploring Saint Martin on two wheels"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Hover zoom pill */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/80 border border-white/20 p-1.5 rounded-lg text-white">
              <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Overlay Tag */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-wider uppercase text-purple-400 font-bold block">
                  Endurance Trail
                </span>
                <p className="font-display font-medium text-xs text-white">
                  Island Marine Cycling
                </p>
              </div>
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </motion.div>
        </div>
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
    </>
  );
}
