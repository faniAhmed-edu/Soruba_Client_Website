/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ChevronRight, Check } from "lucide-react";
import { PARTNERS } from "../data";

// Company logos
import amazonAwsLogo from "../assets/images/Compan-Logos/Amazon_Aws.png";
import crowdStrikeLogo from "../assets/images/Compan-Logos/CroedStrike.png";
import fortinetLogo from "../assets/images/Compan-Logos/Fortinet.png";
import googleCloudLogo from "../assets/images/Compan-Logos/Google_Cloud.png";
import microsoftLogo from "../assets/images/Compan-Logos/Microsoft.png";
import paloAltoLogo from "../assets/images/Compan-Logos/Paloalto_Networks.png";
import sonicWallLogo from "../assets/images/Compan-Logos/SonicWall.png";
import watchGuardLogo from "../assets/images/Compan-Logos/Watch_Guard.png";

const PARTNER_LOGOS = [
  { name: "Amazon Web Services", logo: amazonAwsLogo },
  { name: "CrowdStrike", logo: crowdStrikeLogo },
  { name: "Fortinet", logo: fortinetLogo },
  { name: "Google Cloud", logo: googleCloudLogo },
  { name: "Microsoft", logo: microsoftLogo },
  { name: "Palo Alto Networks", logo: paloAltoLogo },
  { name: "SonicWall", logo: sonicWallLogo },
  { name: "WatchGuard", logo: watchGuardLogo },
];

interface PageHeroProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export function PageHero({ title, breadcrumbs, onNavigate }: PageHeroProps) {
  return (
    <section className="relative bg-gradient-soft py-16 md:py-24 overflow-hidden border-b border-soft-border/50">
      {/* Background grids */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3e6195_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-light-blue/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-corporate-blue/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary-navy mb-4">
          {title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-xs md:text-sm font-semibold text-muted-text">
          <button
            onClick={() => onNavigate("/")}
            className="hover:text-corporate-blue transition-colors cursor-pointer"
          >
            Home
          </button>
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <ChevronRight size={14} className="text-muted-text/60" />
              {crumb.path ? (
                <button
                  onClick={() => onNavigate(crumb.path!)}
                  className="hover:text-corporate-blue transition-colors cursor-pointer"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-primary-navy font-bold">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({ badge, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={`space-y-3 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/30 px-3.5 py-1.5 rounded-full">
        {badge}
      </span>
      <h2 className="text-2xl md:text-4xl font-extrabold text-primary-navy tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-muted-text leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

interface StatsCounterProps {
  label: string;
  value: number;
  suffix?: string;
}

export function StatsCounter({ label, value, suffix = "+" }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / value), 15);
    const timer = setInterval(() => {
      start += Math.ceil(value / 40);
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-soft-border/60 shadow-sm hover:shadow-md hover:border-corporate-blue/30 transition-all text-center group">
      <div className="text-3xl md:text-5xl font-extrabold text-primary-navy mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
        <span className="text-gradient">{count}</span>
        <span className="text-sky-400">{suffix}</span>
      </div>
      <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-text">
        {label}
      </p>
    </div>
  );
}

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen ? "bg-white border-corporate-blue shadow-md" : "bg-light-bg/50 border-soft-border hover:bg-light-bg"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-primary-navy cursor-pointer select-none"
              id={`faq-question-${idx}`}
            >
              <span>{item.question}</span>
              {isOpen ? (
                <ChevronUp size={18} className="text-corporate-blue shrink-0 ml-3" />
              ) : (
                <ChevronDown size={18} className="text-muted-text shrink-0 ml-3" />
              )}
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-60 opacity-100 border-t border-soft-border/50" : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <p className="p-5 text-xs md:text-sm leading-relaxed text-muted-text">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PartnerCarousel() {
  const items = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className="w-full bg-white border-y border-soft-border/20 relative overflow-hidden" style={{ paddingTop: "12px", paddingBottom: "12px" }}>

      {/* Soft edge fades */}
      <div className="absolute inset-y-0 left-0 z-10 pointer-events-none" style={{ width: "100px", background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div className="absolute inset-y-0 right-0 z-10 pointer-events-none" style={{ width: "100px", background: "linear-gradient(to left, #ffffff, transparent)" }} />

      {/* Scrolling logo strip — 6 logos visible at once */}
      <div className="animate-ticker flex items-center" style={{ gap: "0px" }}>
        {items.map((partner, idx) => (
          <div
            key={idx}
            className="shrink-0 flex items-center justify-center"
            style={{ width: "16.66vw", height: "200px", padding: "0 10px" }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export function PartnerGrid() {
  return (
    <div className="w-full pt-2 pb-10 relative">
      <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 md:gap-x-10">
        {PARTNER_LOGOS.map((partner, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center"
            style={{ 
              flex: "0 0 calc(20% - 40px)", // Forces 5 per row on wide screens
              minWidth: "180px", 
              height: "180px" 
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain select-none scale-110 md:scale-125"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface SidebarCTAProps {
  onNavigate: (path: string) => void;
}

export function SidebarCTA({ onNavigate }: SidebarCTAProps) {
  return (
    <div className="bg-gradient-brand p-8 rounded-2xl text-white space-y-6 relative overflow-hidden shadow-lg shadow-primary-navy/20">
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-xl pointer-events-none" />
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Need Help?</h4>
        <p className="text-xs text-white/80 leading-relaxed">
          Consult with our Oregon cybersecurity and IT veterans to design a resilient defensive blueprint for your organization.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <span className="text-[10px] text-white/60 block uppercase font-bold tracking-wider">Call Here</span>
          <a href="tel:+16824148516" className="text-lg font-extrabold hover:text-light-blue transition-colors">
            +1 682-414-8516
          </a>
        </div>
        <div>
          <span className="text-[10px] text-white/60 block uppercase font-bold tracking-wider">Email Us</span>
          <a href="mailto:support@soruballc.com" className="text-sm font-bold hover:text-light-blue transition-colors">
            support@soruballc.com
          </a>
        </div>
      </div>
      <button
        onClick={() => onNavigate("/contact/")}
        className="w-full py-3 bg-white text-primary-navy rounded-xl text-xs font-bold hover:bg-light-blue transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
        id="sidebar-cta-call-btn"
      >
        <span>Free Consultation</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
