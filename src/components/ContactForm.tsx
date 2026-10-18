import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight, PhoneCall, Linkedin } from 'lucide-react';

// ==========================================
// CONFIGURATION: Verified Production Channels
// ==========================================
const CONTACT_LINKS = {
  whatsapp: "https://wa.me/8801641705815?text=Hi%20Anthony,%20I%20would%20like%20to%20discuss%20a%20project.",
  telegram: "https://t.me/Ant_Sarker",
  linkedin: "https://www.linkedin.com/in/anthonysarker/",
  phone: "tel:+8801410492047",
};

// Custom Brand SVGs
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C15.753 1.876 13.278 1.84 10.639 1.84 5.205 1.84.78 6.26.777 11.704c-.001 1.73.457 3.419 1.32 4.93l-.995 3.635 3.722-.976zm11.365-6.85c-.3-.15-1.77-.875-2.045-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.777-1.665-2.076-.175-.3-.02-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.925-2.235-.24-.58-.49-.5-.676-.51-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.276.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.116 4.523.714.31 1.27.495 1.703.633.717.227 1.37.195 1.887.118.577-.087 1.77-.724 2.02-1.425.25-.7.25-1.3 1.175-1.425.075-.025.15-.05.225-.075z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
      desc: "Fastest response (+8801641705815)",
      href: CONTACT_LINKS.whatsapp,
      icon: WhatsAppIcon,
      hoverBorder: "hover:border-emerald-500/40",
      iconColor: "text-emerald-400",
      btnClass: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/20"
    },
    {
      name: "Telegram",
      label: "Instant Message",
      desc: "Connect on Telegram (@Ant_Sarker)",
      href: CONTACT_LINKS.telegram,
      icon: TelegramIcon,
      hoverBorder: "hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
      btnClass: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/20"
    },
    {
      name: "Direct Call",
      label: "Voice & Phone",
      desc: "+880 1410-492047 (Direct)",
      href: CONTACT_LINKS.phone,
      icon: PhoneCall,
      hoverBorder: "hover:border-white/30",
      iconColor: "text-zinc-200",
      btnClass: "bg-white/10 hover:bg-white/20 text-zinc-200 border-white/10"
    },
    {
      name: "LinkedIn",
      label: "Professional",
      desc: "linkedin.com/in/anthonysarker",
      href: CONTACT_LINKS.linkedin,
      icon: Linkedin,
      hoverBorder: "hover:border-sky-500/40",
      iconColor: "text-sky-400",
      btnClass: "bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border-sky-500/20"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Left Column: Quick Contacts */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-white">Direct Communication</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Prefer instant contact? Reach out directly via WhatsApp, Telegram, Phone, or LinkedIn. I typically reply within minutes.
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
                  className={`flex flex-col justify-between p-4 rounded-2xl bg-[#121212]/80 backdrop-blur-xl border border-white/10 transition-all duration-300 group hover:-translate-y-0.5 cursor-pointer shadow-lg hover:bg-[#181818] ${channel.hoverBorder}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${channel.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold group-hover:text-white transition-colors">
                        {channel.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5 font-sans">{channel.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-wider uppercase font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      {channel.label}
                    </span>
                    <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold flex items-center gap-1.5 transition-colors ${channel.btnClass}`}>
                      Open
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
      <div className="lg:col-span-7 bg-[#121212]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
        
        {/* Subtle ambient light hint */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.02] blur-[50px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-lg text-white">Send a Message</h3>
            <p className="text-xs text-zinc-400">
              Submit your inquiry and project specifications directly to my inbox.
            </p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                Your Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300 min-h-[120px] resize-y"
                placeholder="Hi Anthony, let's discuss..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span>Dispatching Message...</span>
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
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
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
