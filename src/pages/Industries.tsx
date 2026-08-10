/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ChevronRight, HelpCircle, ShieldCheck, Heart, Building2, Wallet, GraduationCap, Briefcase, FileText } from "lucide-react";
import { PageHero, SectionHeading, SidebarCTA } from "../components/UI";
import { INDUSTRIES } from "../data";
import LucideIcon from "../components/LucideIcon";

export default function Industries({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0]?.id || "healthcare");
  const activeInd = INDUSTRIES.find(i => i.id === activeTab) || INDUSTRIES[0];

  const industryFaqs: Record<string, { q: string; a: string }[]> = {
    healthcare: [
      { q: "Is Soruba HIPAA compliant?", a: "Yes. We sign Business Associate Agreements (BAAs) and audit all network channels to secure Patient Health Information (PHI)." },
      { q: "How do you protect medical systems against ransomware?", a: "We utilize AI-driven SentinelOne endpoints that block malicious file modifications instantly and maintain offline volume shadow copies." }
    ],
    government: [
      { q: "Do you meet NIST specifications?", a: "Yes. Our systems are engineered against the NIST SP 800-171 cybersecurity framework guidelines." },
      { q: "What is your endpoint response protocol?", a: "Any flagged threat triggers a network-level quarantine on the individual workstation, shielding the rest of the agency infrastructure." }
    ],
    finance: [
      { q: "How do you assist with PCI-DSS?", a: "We configure encrypted networks, restrict data access, audit databases regularly, and draft detailed security reports." },
      { q: "What controls protect bank records?", a: "We deploy layered firewalls, rigorous identity authentication, continuous intrusion monitoring, and secure offline storage." }
    ],
    education: [
      { q: "Is student information protected under FERPA?", a: "Yes. We restrict folder directories, encrypt data at rest, and audit administrative software for access logs." },
      { q: "How do you secure school networks?", a: "We set up web filtering, segment teacher and student Wi-Fi bands, and block unsafe script executions." }
    ],
    enterprise: [
      { q: "Can you coordinate with our internal team?", a: "Yes. We offer co-managed IT services to offload daily helpdesk tickets or provide specialized security assistance." },
      { q: "Are your solutions scalable?", a: "We configure flexible cloud configurations that support simple seat additions as your company grows." }
    ]
  };

  const activeFaqs = industryFaqs[activeTab] || industryFaqs.healthcare;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="space-y-20 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title="Industries We Serve"
        breadcrumbs={[{ label: "Industries" }]}
        onNavigate={onNavigate}
      />

      {/* 2. DYNAMIC INDUSTRY EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left navigation sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl border border-soft-border/70 p-4 shadow-sm space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-corporate-blue px-3 mb-3 block">Target Sectors</h4>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === ind.id
                    ? "bg-gradient-brand text-white shadow-md"
                    : "hover:bg-light-bg text-primary-navy"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <LucideIcon name={ind.icon} className={activeTab === ind.id ? "text-white" : "text-corporate-blue"} size={18} />
                  <span>{ind.title}</span>
                </div>
                <ChevronRight size={16} className={activeTab === ind.id ? "text-white" : "text-muted-text"} />
              </button>
            ))}
          </div>

          <SidebarCTA onNavigate={onNavigate} />
        </div>

        {/* Right Active Industry Detail Panel */}
        <div className="lg:col-span-8 space-y-10 bg-white p-6 md:p-10 rounded-3xl border border-soft-border/60 shadow-sm">
          
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/20 px-3.5 py-1.5 rounded-full">
              COMPLIANT INTEGRATION
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-navy tracking-tight leading-tight">
              {activeInd.title} Security & IT Management
            </h2>
            <p className="text-sm md:text-base text-muted-text leading-relaxed">
              {activeInd.text}
            </p>
          </div>

          {/* Placeholder/Visual Box */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-soft-border/40 shadow-lg group bg-white">
            {/* Aspect ratio container */}
            <div className="relative w-full" style={{ paddingBottom: "62%" }}>
              {/* Subtle placeholder while loading */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-light-bg to-white">
                <div className="w-16 h-16 rounded-2xl bg-corporate-blue/10 flex items-center justify-center mb-3">
                  <ShieldCheck size={28} className="text-corporate-blue/40" />
                </div>
                <span className="text-xs font-semibold text-muted-text/50 tracking-wider">{activeInd.title} Integrations</span>
              </div>
              
              {/* Real Industry Image */}
              <img
                src={activeInd.imageUrl}
                alt={activeInd.title}
                className="absolute inset-0 w-full h-full object-contain bg-white group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-0"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).classList.remove("opacity-0");
                }}
                referrerPolicy="no-referrer"
              />

              {/* Top-left industry label chip */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-soft-border/60 shadow-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-2 h-2 rounded-full bg-corporate-blue animate-pulse" />
                <span className="text-[10px] font-bold text-primary-navy uppercase tracking-widest">{activeInd.title}</span>
              </div>

              {/* Bottom gradient strip */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Strategic benefits */}
          <div className="space-y-4 p-6 bg-light-bg rounded-2xl border border-soft-border/60">
            <h3 className="font-extrabold text-primary-navy text-base">Industry-Specific Compliance Mandates</h3>
            <div className="space-y-3 text-xs md:text-sm text-muted-text">
              <p>
                Operating in the <span className="text-primary-navy font-bold">{activeInd.title}</span> domain requires thorough security reporting and zero-trust verification pipelines. We implement layered encryption models to safeguard all records against data breaches.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-text-dark font-medium">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-corporate-blue rounded-full" />
                  <span>Regulatory alignment audits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-corporate-blue rounded-full" />
                  <span>Workstation endpoint locks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-corporate-blue rounded-full" />
                  <span>24/7 SIEM firewall analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-corporate-blue rounded-full" />
                  <span>Redundant cloud data vaulting</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQS */}
          <div className="space-y-4 pt-4 border-t border-soft-border/30">
            <h3 className="font-extrabold text-primary-navy text-lg flex items-center space-x-2">
              <FileText size={20} className="text-corporate-blue" />
              <span>Compliance FAQ</span>
            </h3>
            
            <div className="space-y-3">
              {activeFaqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div key={i} className="rounded-xl border border-soft-border bg-white overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs md:text-sm text-primary-navy cursor-pointer select-none bg-light-bg/50"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight size={14} className={`text-muted-text transition-transform ${isOpen ? "rotate-90 text-corporate-blue" : ""}`} />
                    </button>
                    {isOpen && (
                      <p className="p-4 text-xs text-muted-text leading-relaxed bg-white border-t border-soft-border/40">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={() => onNavigate("/contact/")}
              className="py-3 px-6 bg-gradient-brand text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Get {activeInd.title} Compliance Quote
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
