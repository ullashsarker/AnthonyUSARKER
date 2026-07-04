import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Users, FolderCheck, Clock, Award } from "lucide-react";

interface StatItem {
  icon: React.ComponentType<any>;
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <div ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-white">
      {count}{suffix}
    </div>
  );
}

export default function StatsBar() {
  const stats: StatItem[] = [
    { icon: Users, value: 80, suffix: "+", label: "Happy Clients" },
    { icon: FolderCheck, value: 120, suffix: "+", label: "Projects Completed" },
    { icon: Clock, value: 3, suffix: "+", label: "Years Experience" },
    { icon: Award, value: 15, suffix: "+", label: "Awards Received" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-2xl stats-gradient-bar p-[1px] my-4"
    >
      <div className="w-full rounded-2xl bg-[#0B0B1A]/90 backdrop-blur-sm py-8 px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all mb-1">
                  <Icon className="w-5 h-5 text-purple-300" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
