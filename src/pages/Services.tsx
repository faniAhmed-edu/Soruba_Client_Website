/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { CheckCircle2, ChevronRight, HelpCircle, ShoppingBag, ShieldCheck, Check } from "lucide-react";
import { PageHero, SectionHeading, SidebarCTA } from "../components/UI";
import { SERVICES } from "../data";

export default function Services({ onNavigate }: { onNavigate: (path: string) => void }) {
  // Navigation tabs represent the 5 key requested services:
  // 1. Managed IT Services (id: managed-it)
  // 2. Cybersecurity Solutions (id: cyber-security)
  // 3. Cloud & Network Solutions (id: cloud-network)
  // 4. Compliance & Risk Management (id: compliance-risk)
  // 5. Hardware and Software (id: hardware-software)
  const orderedTabs = [
    "managed-it",
    "cyber-security",
    "cloud-network",
    "compliance-risk",
    "hardware-software"
  ];

  const serviceTabs = SERVICES.filter(s => orderedTabs.includes(s.id))
    .sort((a, b) => orderedTabs.indexOf(a.id) - orderedTabs.indexOf(b.id));

  const [activeTab, setActiveTab] = useState(serviceTabs[0]?.id || "managed-it");
  const activeService = serviceTabs.find(s => s.id === activeTab) || serviceTabs[0];

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What businesses do you support?", a: "Soruba supports small and medium-sized businesses, healthcare clinics, government agencies, schools, financial planners, and national enterprises." },
    { q: "Do you provide 24/7 monitoring?", a: "Yes. Our security operation center monitors server loads and cyber threats 24/7/365 to isolate risks instantly." },
    { q: "Can you help with cloud migration?", a: "We possess certified architects across AWS, GCP, and Microsoft Azure to ensure seamless transitions." },
    { q: "Can Soruba support compliance audits?", a: "We regularly draft policies, review network parameters, and align systems to prepare you for HIPAA, CMMC, and SOC-2 audits." }
  ];

  return (
    <div className="space-y-20 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title="Our Services"
        breadcrumbs={[{ label: "Our Services" }]}
        onNavigate={onNavigate}
      />

      {/* 2. DYNAMIC SERVICE EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar navigation */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl border border-soft-border/70 p-4 shadow-sm space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-corporate-blue px-3 mb-3 block">Service Navigation</h4>
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gradient-brand text-white shadow-md"
                    : "hover:bg-light-bg text-primary-navy"
                }`}
              >
                <span>{tab.title}</span>
                <ChevronRight size={16} className={activeTab === tab.id ? "text-white" : "text-muted-text"} />
              </button>
            ))}
          </div>

          <SidebarCTA onNavigate={onNavigate} />
        </div>

        {/* Right Active Service Detail Panel */}
        <div className="lg:col-span-8 space-y-10 bg-white p-6 md:p-10 rounded-3xl border border-soft-border/60 shadow-sm">
          
          {/* Service Header Info */}
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/20 px-3.5 py-1.5 rounded-full">
              CORE CAPABILITY
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-navy tracking-tight leading-tight">
              {activeService.title}
            </h2>
            <p className="text-sm md:text-base text-muted-text leading-relaxed">
              {activeService.longDesc}
            </p>
          </div>

          {/* Service image display box */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-soft-border/40 shadow-lg group bg-white">
            {/* Aspect ratio container - tall enough to show full image */}
            <div className="relative w-full" style={{ paddingBottom: "62%" }}>
              {/* Subtle placeholder while loading */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-light-bg to-white">
                <div className="w-16 h-16 rounded-2xl bg-corporate-blue/10 flex items-center justify-center mb-3">
                  <ShoppingBag size={28} className="text-corporate-blue/40" />
                </div>
                <span className="text-xs font-semibold text-muted-text/50 tracking-wider">{activeService.title}</span>
              </div>

              {/* Actual image - fills container fully */}
              <img
                src={activeService.imageUrl}
                alt={activeService.title}
                className="absolute inset-0 w-full h-full object-contain bg-white group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-0"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).classList.remove("opacity-0");
                }}
                referrerPolicy="no-referrer"
              />

              {/* Top-left service label chip */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-soft-border/60 shadow-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-2 h-2 rounded-full bg-corporate-blue animate-pulse" />
                <span className="text-[10px] font-bold text-primary-navy uppercase tracking-widest">{activeService.title}</span>
              </div>

              {/* Bottom gradient strip */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Offerings Checklists */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-primary-navy text-lg">Key Offerings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeService.offerings.map((offering, index) => (
                <div key={index} className="flex items-start space-x-2.5 text-xs md:text-sm text-text-dark font-medium">
                  <CheckCircle2 size={16} className="text-corporate-blue shrink-0 mt-0.5" />
                  <span>{offering}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Procurement info for Hardware / Software */}
          {activeTab === "hardware-software" && (
            <div className="p-6 bg-light-bg rounded-2xl border border-soft-border/60 space-y-4">
              <h3 className="font-extrabold text-primary-navy text-base">Procurement Value Proposition</h3>
              <div className="space-y-4 text-xs md:text-sm leading-relaxed text-muted-text">
                <div>
                  <h4 className="font-bold text-primary-navy mb-1">1. Comprehensive IT Procurement & Strategic Partnerships</h4>
                  <p>We have built strong relationships with leading OEM vendors, ensuring access to cutting-edge hardware, software, and services that align with your business objectives.</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy mb-1">2. Maximizing Value on Your IT Investments</h4>
                  <p>Investing in new technology requires careful planning and significant financial commitment. Our goal is to help you make informed decisions by selecting the right solutions that align with your needs while optimizing costs.</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy mb-1">3. More Than Just a Vendor – A True IT Partner</h4>
                  <p>With years of IT consulting experience before expanding into procurement, our approach goes beyond simply selling products. We provide end-to-end solutions, guiding you from initial discovery to successful implementation.</p>
                </div>
              </div>
              <p className="text-xs md:text-sm font-bold text-primary-navy pt-2">
                “At Soruba, we are not just suppliers—we are solution providers, dedicated to empowering your business with the right technology at the right price.”
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-soft-border/30 flex items-center justify-between">
            <button
              onClick={() => onNavigate(`/all-service/${activeService.slug}/`)}
              className="py-3 px-6 bg-gradient-brand text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Learn More About {activeService.title}
            </button>
            <button
              onClick={() => onNavigate("/contact/")}
              className="text-xs font-bold text-corporate-blue hover:text-primary-navy flex items-center space-x-1"
            >
              <span>Request Quote</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* 3. MANAGED IT & CYBERSECURITY PRICING */}
      <section className="bg-light-bg py-20 border-y border-soft-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-14">

          {/* Section Heading */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/20 px-3.5 py-1.5 rounded-full">
              MANAGED IT &amp; CYBERSECURITY PLANS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-navy tracking-tight">
              Enterprise-Grade IT &amp; Cybersecurity.<br className="hidden md:block" /> Predictable Monthly Pricing.
            </h2>
            <p className="text-sm text-muted-text leading-relaxed">
              Whether you're a startup or an established organization, Soruba delivers proactive IT management, cybersecurity, cloud solutions, and strategic technology guidance tailored to your business.
            </p>
            <p className="text-sm font-semibold text-primary-navy">
              No hidden fees. No long-term surprises. Just secure, reliable technology that helps your business grow.
            </p>
          </div>

          {/* Pricing Cards — 2x2 grid on md, 4-col on xl */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">

            {/* Card 1 — Secure Start */}
            <div className="bg-white rounded-3xl border border-soft-border/80 p-8 text-left flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-primary-navy">Secure Start™</h3>
                  <p className="text-xs text-muted-text leading-relaxed">For startups and small businesses needing dependable IT support and essential cybersecurity.</p>
                </div>
                <div className="border-y border-soft-border/40 py-4">
                  <span className="text-3xl md:text-4xl font-black text-primary-navy tracking-tight">Starting at $399</span>
                  <span className="text-xs font-bold text-muted-text block mt-1">/ month</span>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider block">Plan Includes:</span>
                  <div className="space-y-2.5 text-xs text-text-dark font-medium">
                    {["Managed IT Support","Microsoft 365 Administration","Endpoint Protection","Weekly Backups","Remote Help Desk","Email Security","Monthly Health Report","Up to 5 users + $95/user"].map((f, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Check size={14} className="text-corporate-blue shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onNavigate("/contact/")}
                  className="w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer bg-light-bg hover:bg-soft-border text-primary-navy border border-soft-border"
                >
                  <span>Get Started</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 2 — Business Protect (Most Popular) */}
            <div className="bg-white rounded-3xl border-2 border-corporate-blue p-8 text-left flex flex-col justify-between relative shadow-lg shadow-corporate-blue/10 hover:shadow-xl hover:-translate-y-1 transition-all">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-corporate-blue to-sky-400 text-white text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                Most Popular
              </span>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-primary-navy">Business Protect™</h3>
                  <p className="text-xs text-muted-text leading-relaxed">Comprehensive IT management with proactive cybersecurity for growing businesses.</p>
                </div>
                <div className="border-y border-soft-border/40 py-4">
                  <span className="text-3xl md:text-4xl font-black text-primary-navy tracking-tight">Starting at $799</span>
                  <span className="text-xs font-bold text-muted-text block mt-1">/ month</span>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider block">Plan Includes:</span>
                  <div className="space-y-2.5 text-xs text-text-dark font-medium">
                    {["Everything in Secure Start™, plus","Unlimited Help Desk","Network Management","Advanced Endpoint Detection (EDR)","DNS Filtering","Security Awareness Training","Quarterly Technology Reviews","Vendor Management","Up to 10 users + $105/user"].map((f, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Check size={14} className="text-corporate-blue shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onNavigate("/contact/")}
                  className="w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer bg-gradient-to-r from-corporate-blue to-sky-500 text-white shadow-md shadow-corporate-blue/20 hover:shadow-lg"
                >
                  <span>Schedule Consultation</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 3 — Secure Growth */}
            <div className="bg-white rounded-3xl border border-soft-border/80 p-8 text-left flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-primary-navy">Secure Growth™</h3>
                  <p className="text-xs text-muted-text leading-relaxed">Enterprise-grade cybersecurity and strategic IT leadership for compliance-focused organizations.</p>
                </div>
                <div className="border-y border-soft-border/40 py-4">
                  <span className="text-3xl md:text-4xl font-black text-primary-navy tracking-tight">Starting at $1,499</span>
                  <span className="text-xs font-bold text-muted-text block mt-1">/ month</span>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider block">Plan Includes:</span>
                  <div className="space-y-2.5 text-xs text-text-dark font-medium">
                    {["Everything in Business Protect™, plus","Managed Detection & Response (MDR)","Backup & Disaster Recovery","Compliance Readiness","Risk Assessments","vCIO Consulting","Priority Support","Identity & Access Management","Up to 20 users + $115/user"].map((f, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Check size={14} className="text-corporate-blue shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onNavigate("/contact/")}
                  className="w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer bg-light-bg hover:bg-soft-border text-primary-navy border border-soft-border"
                >
                  <span>Talk to an Expert</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 4 — Enterprise Secure */}
            <div className="bg-primary-navy rounded-3xl border border-white/10 p-8 text-left flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-corporate-blue/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white">Enterprise Secure™</h3>
                  <p className="text-xs text-white/70 leading-relaxed">Tailored IT and cybersecurity solutions for organizations with complex technology needs.</p>
                </div>
                <div className="border-y border-white/10 py-4">
                  <span className="text-3xl md:text-4xl font-black text-white tracking-tight">Custom Pricing</span>
                  <span className="text-xs font-bold text-white/50 block mt-1">Built for your needs</span>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-cyan-accent uppercase tracking-wider block">Ideal For:</span>
                  <div className="space-y-2.5 text-xs text-white/80 font-medium">
                    {["Healthcare","Legal","Financial Services","Government Contractors","Education","Multi-location Businesses"].map((f, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Check size={14} className="text-cyan-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 relative z-10">
                <button
                  onClick={() => onNavigate("/contact/")}
                  className="w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer bg-white text-primary-navy hover:bg-light-bg shadow-md"
                >
                  <span>Request a Quote</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Optional One-Time Services */}
          <div className="bg-white rounded-3xl border border-soft-border/70 shadow-sm p-8 md:p-12 space-y-8">
            <div className="text-center space-y-3">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/20 px-3.5 py-1.5 rounded-full">
                PROFESSIONAL SERVICES
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy">Optional One-Time Services</h3>
              <p className="text-sm text-muted-text max-w-xl mx-auto">Need help with a specific project? We also offer fixed-price professional services.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Microsoft 365 Migration",
                "Google Workspace Migration",
                "SharePoint Deployment",
                "Network Assessment",
                "Cybersecurity Risk Assessment",
                "HIPAA Security Assessment",
                "Security Awareness Training",
                "Website Design & Business Hosting",
                "Backup & Disaster Recovery Setup"
              ].map((service, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-light-bg rounded-xl border border-soft-border/50 hover:border-corporate-blue/30 hover:shadow-sm transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-white border border-soft-border flex items-center justify-center shrink-0 group-hover:bg-corporate-blue/10 transition-colors">
                    <ShieldCheck size={16} className="text-corporate-blue" />
                  </div>
                  <span className="text-xs font-semibold text-primary-navy leading-snug">{service}</span>
                </div>
              ))}
            </div>
            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate("/contact/")}
                className="inline-flex items-center space-x-2 py-3 px-8 bg-gradient-to-r from-corporate-blue to-sky-500 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Get a Custom Quote</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 4. FAQS FOR SERVICES */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        <SectionHeading
          badge="KNOWLEDGE HUB"
          title="Common Questions About Our Services"
          centered
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen ? "bg-white border-corporate-blue shadow-md" : "bg-light-bg/50 border-soft-border hover:bg-light-bg"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-primary-navy cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle size={18} className="text-corporate-blue shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-muted-text transition-transform duration-300 ${isOpen ? "rotate-90 text-corporate-blue" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40 opacity-100 border-t border-soft-border/50" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="p-5 text-xs md:text-sm leading-relaxed text-muted-text bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
