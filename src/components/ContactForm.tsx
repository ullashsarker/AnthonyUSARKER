import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

// ==========================================
// CONFIGURATION: Replace these with your real details!
// ==========================================
const CONTACT_LINKS = {
  whatsapp: "https://wa.me/8801700000000", // Replace 8801700000000 with your WhatsApp number (include country code, no + or zeros)
  messenger: "https://m.me/anthonyullashsarker", // Opens Facebook Messenger directly
  instagram: "https://www.instagram.com/your._.ullash/", // Opens Instagram profile
  linkedin: "https://linkedin.com", // Replace with your LinkedIn profile URL
};

// Custom Brand SVGs for a highly polished, premium appearance
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C15.753 1.876 13.278 1.84 10.639 1.84 5.205 1.84.78 6.26.777 11.704c-.001 1.73.457 3.419 1.32 4.93l-.995 3.635 3.722-.976zm11.365-6.85c-.3-.15-1.77-.875-2.045-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.777-1.665-2.076-.175-.3-.02-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.925-2.235-.24-.58-.49-.5-.676-.51-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.276.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.116 4.523.714.31 1.27.495 1.703.633.717.227 1.37.195 1.887.118.577-.087 1.77-.724 2.02-1.425.25-.7.25-1.3 1.175-1.425.075-.025.15-.05.225-.075z" />
  </svg>
);

const MessengerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.742 6.615 4.469 8.63V24l4.095-2.247c1.077.299 2.221.462 3.436.462 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.282 14.808l-3.08-3.284-6.01 3.284 6.61-7.017 3.15 3.284 5.94-3.284-6.61 7.017z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" h="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus({ type: null, message: '' });

    emailjs
      .sendForm(
        'service_jz62qdr',     // Service ID
        'template_b3gii4a',    // Template ID
        formRef.current,
        'hJ9wKv3rwHVliJO9O'    // Public Key
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: 'success',
            message: 'Your message has been sent successfully! I will get back to you shortly.'
          });
          formRef.current?.reset();
        },
        (error) => {
          setLoading(false);
          setStatus({
            type: 'error',
            message: 'Failed to send the message. Please try again or reach out directly via socials.'
          });
          console.error('EmailJS Error:', error);
        }
      );
  };

  const socialChannels = [
    {
      name: "WhatsApp",
      label: "Direct Chat",
      desc: "Fastest response for inquiries",
      href: CONTACT_LINKS.whatsapp,
      icon: WhatsAppIcon,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300",
      btnBg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 text-emerald-300",
      glowColor: "shadow-[0_0_15px_rgba(16,185,129,0.15)]"
    },
    {
      name: "Facebook Messenger",
      label: "Direct Message",
      desc: "Chat on Messenger anytime",
      href: CONTACT_LINKS.messenger,
      icon: MessengerIcon,
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:text-blue-300",
      btnBg: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-300",
      glowColor: "shadow-[0_0_15px_rgba(59,130,246,0.15)]"
    },
    {
      name: "Instagram",
      label: "Direct Message (DM)",
      desc: "Follow and stay connected",
      href: CONTACT_LINKS.instagram,
      icon: InstagramIcon,
      color: "from-pink-500/20 to-rose-500/10 border-pink-500/20 hover:border-pink-500/40 text-pink-400 hover:text-pink-300",
      btnBg: "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20 text-pink-300",
      glowColor: "shadow-[0_0_15px_rgba(236,72,153,0.15)]"
    },
    {
      name: "LinkedIn",
      label: "Professional Network",
      desc: "Let's connect professionally",
      href: CONTACT_LINKS.linkedin,
      icon: LinkedinIcon,
      color: "from-sky-500/20 to-cyan-500/10 border-sky-500/20 hover:border-sky-500/40 text-sky-400 hover:text-sky-300",
      btnBg: "bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/20 text-sky-300",
      glowColor: "shadow-[0_0_15px_rgba(14,165,233,0.15)]"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Left Column: Quick Contacts */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-white">Instant Connection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Skip the forms! Click any platform below to message me instantly. I am active across these networks daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {socialChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-b border transition-all duration-300 group hover:-translate-y-0.5 cursor-pointer ${channel.color} ${channel.glowColor}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold group-hover:text-white transition-colors">
                        {channel.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{channel.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-wider uppercase font-mono text-slate-400 group-hover:text-white transition-colors">
                      {channel.label}
                    </span>
                    <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold flex items-center gap-1.5 transition-colors ${channel.btnBg}`}>
                      Connect
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Glassmorphic Message Form */}
      <div className="lg:col-span-7 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-lg text-white">Send a Message</h3>
            <p className="text-xs text-slate-400">
              Fill out this form to send an email inquiry directly to my inbox.
            </p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                Your Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 min-h-[120px] resize-y"
                placeholder="Hi Anthony, let's collaborate on..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_25px_rgba(147,51,234,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>

          {status.type && (
            <div className={`p-4 rounded-xl flex items-start gap-3 border text-xs leading-relaxed animate-fade-in ${
              status.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
