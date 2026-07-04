import React from "react";

interface ServiceIconProps {
  id: string;
  className?: string;
}

export default function ServiceIcon({ id, className = "w-6 h-6" }: ServiceIconProps) {
  switch (id) {
    case "ai-operations":
      // A brain with neural connections and a pulse core
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2a5 5 0 0 0-4.9 4.1 4.5 4.5 0 0 0-.6 8.3 4 4 0 0 0 5.5 5.5V22h4v-2.1a4 4 0 0 0 5.5-5.5 4.5 4.5 0 0 0-.6-8.3A5 5 0 0 0 12 2Z" />
          <circle cx="12" cy="9" r="2" fill="currentColor" className="animate-pulse" />
          <path d="M9 13h6" />
          <path d="M12 11v4" />
        </svg>
      );
    case "web-dev":
      // Browser screen with code brackets
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="M6 8h.01" />
          <path d="M10 8h.01" />
          <path d="M14 8h.01" />
          <path d="m8 14-2-2 2-2" />
          <path d="m16 10 2 2-2 2" />
        </svg>
      );
    case "pinterest-marketing":
      // Official Pinterest logo
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.71-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.13.9 2.73.1.12.11.23.08.35-.09.37-.29 1.18-.33 1.34-.05.21-.18.25-.41.14-1.53-.71-2.48-2.96-2.48-4.77 0-3.89 2.83-7.46 8.15-7.46 4.28 0 7.6 3.05 7.6 7.12 0 4.25-2.68 7.67-6.4 7.67-1.25 0-2.43-.65-2.83-1.42 0 0-.62 2.36-.77 2.94-.28 1.08-1.04 2.43-1.55 3.27C8.96 23.75 10.44 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
        </svg>
      );
    case "digital-marketing":
      // A Megaphone
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m3 11 18-5v12L3 13v-2Z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      );
    case "ui-ux-design":
      // Official Figma logo outline
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
          <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v4.5A3.5 3.5 0 0 1 8.5 24H8.5A3.5 3.5 0 0 1 5 19.5z" />
        </svg>
      );
    case "print-design":
      // Stacked design layout files
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "brand-identity":
      // Anchor points vector circle logo
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="6" />
          <rect x="10" y="2" width="4" height="4" rx="1" />
          <rect x="10" y="18" width="4" height="4" rx="1" />
          <rect x="2" y="10" width="4" height="4" rx="1" />
          <rect x="18" y="10" width="4" height="4" rx="1" />
          <path d="m12 6-4 4" />
          <path d="m12 18 4-4" />
        </svg>
      );
    default:
      return null;
  }
}
