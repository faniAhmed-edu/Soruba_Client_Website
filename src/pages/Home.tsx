/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Cpu,
  Shield,
  Clock,
  ArrowUpRight,
  User,
  Calendar,
  MessageSquare,
  Bookmark,
  Activity,
  Check,
  MapPin,
  Network,
  BadgeCheck,
  BarChart2,
  ShieldCheck,
} from "lucide-react";
import { SERVICES, INDUSTRIES, PROJECTS, FAQS, BLOGS, TESTIMONIALS, STATS, heroDashboard, itConsultation } from "../data";
import { SectionHeading, StatsCounter, FAQAccordion, PartnerCarousel } from "../components/UI";
import LucideIcon from "../components/LucideIcon";

interface HomeProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Select 4 key featured services requested for Home Page:
  // 1. Database Security (slug: database-security)
  // 2. IT Consultancy (slug: it-consultancy)
  // 3. Cyber Security (slug: cyber-security)
  // 4. Health App Development (slug: app-development)
  const homeServices = SERVICES.filter(s => 
    ["database-security", "it-consultancy", "cyber-security", "app-development"].includes(s.slug)
  );

  // If we couldn't match exactly by slug, use first 4
  const featuredServices = homeServices.length >= 4 ? homeServices : SERVICES.slice(0, 4);

  // Select first 4 projects for Home Page
  const featuredProjects = PROJECTS.slice(0, 4);

  // Select latest 3 blogs
  const featuredBlogs = BLOGS.slice(0, 3);

  // Soruba Advantage items
  const advantageItems = [
    {
      icon: MapPin,
      title: "U.S.-Based Expertise",
      tagline: "Nationwide Service. Personalized Partnership.",
      description:
        "A U.S.-based technology partner delivering responsive IT, cybersecurity, and strategic consulting services to organizations across the United States.",
    },
    {
      icon: Network,
      title: "Strategic Technology Partnerships",
      tagline: "Best-in-Class Technology. Proven Results.",
      description:
        "Leveraging partnerships with leading technology providers to deliver innovative, secure, and scalable solutions tailored to your business objectives.",
    },
    {
      icon: BadgeCheck,
      title: "Certified Technology Ecosystem",
      tagline: "Specialized Expertise. Unified Delivery.",
      description:
        "A collaborative network of certified technology professionals delivering enterprise-grade solutions through one trusted partner.",
    },
    {
      icon: BarChart2,
      title: "Executive Technology Consulting",
      tagline: "Technology That Drives Business Growth.",
      description:
        "Helping executive leaders align technology investments with operational efficiency, cybersecurity, compliance, and long-term business strategy.",
    },
    {
      icon: ShieldCheck,
      title: "Security-First by Design",
      tagline: "Cybersecurity Built Into Everything We Deliver.",
      description:
        "Every engagement is designed with security at its core — from planning and implementation to monitoring, compliance, backup, and business continuity.",
    },
  ];

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-soft pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-soft-border/30">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#3e6195_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        {/* Floating gradient ambient blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-light-blue/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 rounded-full bg-corporate-blue/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/30 px-4 py-2 rounded-full border border-soft-border">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
              <span>Managed IT Services • Cybersecurity • MSSP</span>
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-navy tracking-tight leading-[1.1]">
                Secure IT. Strengthen <span className="text-gradient">Cybersecurity.</span> <br className="hidden lg:inline" />
                Grow Your Business with Confidence.
              </h1>
              <h3 className="text-lg md:text-2xl font-bold text-corporate-blue">
                We empower businesses with expert IT consulting.
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-text max-w-xl">
                Our mission is to deliver cutting-edge solutions that keep your business secure, agile, and ahead of the competition. Safeguard your digital boundaries with Oregon's premier cybersecurity consultants.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate("/about/")}
                className="py-3 px-7 bg-gradient-brand hover:bg-gradient-soft hover:text-primary-navy text-white font-bold rounded-xl shadow-lg shadow-corporate-blue/20 hover:shadow-xl transition-all cursor-pointer"
                id="hero-explore-btn"
              >
                Explore More
              </button>
              <a
                href="https://www.youtube.com/watch?v=5ALzVMmiqcw"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 py-3 px-5 text-primary-navy font-bold hover:text-corporate-blue transition-colors group"
                id="hero-video-link"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-soft-border shadow-sm flex items-center justify-center text-corporate-blue group-hover:scale-105 transition-transform shrink-0">
                  <Play size={14} className="fill-current ml-0.5" />
                </div>
                <span className="text-sm border-b border-transparent group-hover:border-corporate-blue transition-all">Watch Video</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Cyber Dashboard Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="relative w-full bg-white p-2 rounded-3xl shadow-xl border border-soft-border/80 hover:-translate-y-1 transition-transform duration-500 overflow-hidden group">
              <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-primary-navy">
                <img
                  src={heroDashboard}
                  alt="Soruba IT Dashboard Illustration"
                  className="w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).classList.remove("opacity-0");
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICE SCROLLING TICKER */}
      <section className="py-2 bg-primary-navy text-white overflow-hidden select-none border-y border-white/5 shadow-inner">
        <div className="relative flex overflow-x-hidden">
          <div className="animate-ticker flex whitespace-nowrap space-x-12 items-center py-2 text-xs md:text-sm font-bold tracking-widest uppercase">
            {[
              "Managed IT Services",
              "Cybersecurity Solutions",
              "Cloud & Network Solutions",
              "Compliance & Risk Management",
              "Hardware and Software Sourcing",
              "Intelligent Network and Voice",
              "Strategic IT Consulting"
            ].map((tickerText, i) => (
              <div key={i} className="flex items-center space-x-3 shrink-0">
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>{tickerText}</span>
              </div>
            ))}
            {[
              "Managed IT Services",
              "Cybersecurity Solutions",
              "Cloud & Network Solutions",
              "Compliance & Risk Management",
              "Hardware and Software Sourcing",
              "Intelligent Network and Voice",
              "Strategic IT Consulting"
            ].map((tickerText, i) => (
              <div key={i + 10} className="flex items-center space-x-3 shrink-0">
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>{tickerText}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Team image with experience overlay */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-soft-border/80 group">
            <div className="absolute inset-0 bg-primary-navy/10 group-hover:bg-transparent transition-all duration-300" />
            <div className="h-[400px] w-full bg-gradient-brand flex items-center justify-center text-white">
              <div className="text-center p-8">
                <p className="text-lg font-bold text-sky-300">Soruba IT Team</p>
                <p className="text-xs text-white/70 mt-2">Oregon's dedicated consultants designing robust network and cyber security perimeters.</p>
              </div>
            </div>
            
            {/* Real image overlay */}
            <img
              src={itConsultation}
              alt="Soruba Dedicated Professional IT Consulting Team"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:scale-105 transition-transform duration-500"
              onLoad={(e) => {
                (e.target as HTMLImageElement).classList.remove("opacity-0");
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Stat Overlay Badge */}
          <div className="absolute -bottom-6 -right-6 md:right-4 bg-white border border-soft-border p-5 rounded-2xl shadow-lg max-w-xs space-y-2">
            <span className="text-[10px] font-bold text-corporate-blue tracking-wider uppercase block">Experience Verified</span>
            <p className="text-base font-extrabold text-primary-navy leading-tight">
              YEARS SECURING <span className="text-gradient">LOCAL BUSINESSES</span>
            </p>
          </div>
        </div>

        {/* Right Side: Narrative */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <SectionHeading
            badge="ABOUT SORUBA"
            title="Soruba – Empowering Businesses with Secure, Scalable, and Innovative IT Solutions"
          />
          
          <ul className="space-y-4 text-sm text-text-dark/95">
            {[
              "Next-Generation Managed IT & Security Services",
              "Enterprise-Level Cybersecurity for SMBs & Enterprises",
              "Cloud, Network, and IT Management Tailored to Your Business Needs"
            ].map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <CheckCircle2 size={18} className="text-corporate-blue mt-0.5 shrink-0" />
                <span className="font-semibold">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Mini Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-light-bg border border-soft-border/60">
              <h4 className="font-bold text-primary-navy text-sm mb-1">Managed IT Services</h4>
              <p className="text-xs text-muted-text">Offer end-to-end solutions engineered for zero downtime.</p>
            </div>
            <div className="p-4 rounded-xl bg-light-bg border border-soft-border/60">
              <h4 className="font-bold text-primary-navy text-sm mb-1">Cybersecurity</h4>
              <p className="text-xs text-muted-text">Our team includes certified professionals & security analysts.</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("/about/")}
              className="py-3 px-6 bg-gradient-brand text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center space-x-2"
              id="about-more-btn"
            >
              <span>Explore More</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES WE SERVE */}
      <section className="bg-gradient-soft py-20 border-y border-soft-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <SectionHeading
            badge="INDUSTRIES"
            title="We Serve"
            description="Our specialized expertise spans several critical business fields requiring robust, secure, and compliant infrastructures."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.id}
                onClick={() => onNavigate("/industries/")}
                className="bg-white p-6 rounded-2xl border border-soft-border/50 shadow-sm hover:shadow-xl hover:border-corporate-blue/30 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center text-corporate-blue">
                    <LucideIcon name={ind.icon} size={20} />
                  </div>
                  <h3 className="font-bold text-primary-navy text-base">{ind.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-text line-clamp-4">
                    {ind.text}
                  </p>
                </div>
                <div className="pt-4 flex items-center space-x-1 text-xs font-bold text-corporate-blue hover:text-primary-navy transition-colors">
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES CARDS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <SectionHeading
            badge="OUR CORE OFFERINGS"
            title="Secure, Scalable IT Solutions for Modern Businesses"
            description="Protect, optimize, and grow your business operations with our expert-led technology modules."
          />
          <button
            onClick={() => onNavigate("/our-services/")}
            className="py-3 px-6 bg-light-bg hover:bg-soft-border/50 text-corporate-blue font-bold text-sm rounded-xl border border-soft-border/80 transition-colors shrink-0"
            id="view-all-services-btn"
          >
            View Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigate(`/all-service/${service.slug}/`)}
              className="bg-white p-6 rounded-2xl border border-soft-border/70 shadow-sm hover:shadow-xl hover:border-corporate-blue/30 hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between h-full group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-navy/5 to-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:scale-105 transition-transform duration-300">
                  <LucideIcon name={service.icon} size={24} className="text-corporate-blue" />
                </div>
                <h3 className="font-extrabold text-primary-navy text-lg group-hover:text-corporate-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-text">
                  {service.shortDesc}
                </p>
              </div>
              <div className="pt-6 flex items-center justify-between text-xs font-bold text-corporate-blue">
                <span>Read More</span>
                <div className="w-6 h-6 rounded-full bg-light-bg group-hover:bg-corporate-blue group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip under Services */}
        <div className="p-6 md:p-8 bg-gradient-brand rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md shadow-primary-navy/20">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg md:text-xl font-bold">Need Any Kind Of IT Solution For Your Business?</h4>
            <p className="text-xs text-white/70">Speak to our Oregon engineering architects today for a fast turnaround.</p>
          </div>
          <button
            onClick={() => onNavigate("/contact-2/")}
            className="py-3 px-6 bg-white hover:bg-light-blue text-primary-navy font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            id="services-strip-cta-btn"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* 6. THE SORUBA ADVANTAGE */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden border-y border-soft-border/30">
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          {/* Section Heading */}
          <div className="text-center mb-16 md:mb-0">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/30 px-4 py-1.5 rounded-full border border-soft-border mb-4">
              Our Differentiators
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              The Soruba{" "}
              <span className="text-corporate-blue">Advantage</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-text max-w-2xl mx-auto">
              Five pillars that define how we deliver secure, scalable, and strategic technology outcomes for our clients.
            </p>
          </div>

          {/* ── DESKTOP: Curved Arc Layout ────────────────────────── */}
          <div className="hidden lg:block relative mt-0">
            {/* SVG arc — peaks at center, descends on both sides */}
            <svg
              viewBox="0 0 1100 200"
              preserveAspectRatio="none"
              className="absolute top-[60px] left-0 w-full"
              style={{ height: "200px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 55 170 C 200 30, 400 10, 550 10 C 700 10, 900 30, 1045 170"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="7 5"
                strokeLinecap="round"
              />
            </svg>

            {/* Five items pinned along the arc */}
            <div className="relative grid grid-cols-5 gap-3 pt-6">
              {advantageItems.map((item, idx) => {
                // vertical offsets mirror the arc curve (0=bottom of arc, 2=peak)
                const topOffsets = [160, 60, 10, 60, 160];
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center px-2"
                    style={{ paddingTop: `${topOffsets[idx]}px` }}
                  >
                    {/* Numbered badge */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-corporate-blue text-white text-lg font-extrabold flex items-center justify-center shadow-xl shadow-corporate-blue/40 ring-4 ring-white mb-5 shrink-0">
                      {idx + 1}
                    </div>
                    {/* Icon */}
                    <div className="mb-3 text-primary-navy">
                      <item.icon size={38} strokeWidth={1.4} />
                    </div>
                    {/* Title */}
                    <h3 className="font-extrabold text-primary-navy text-sm mb-1 leading-snug">
                      {item.title}
                    </h3>
                    {/* Tagline */}
                    <p className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider mb-2">
                      {item.tagline}
                    </p>
                    {/* Description */}
                    <p className="text-xs text-muted-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── TABLET: 2+3 grid ──────────────────────────────────── */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 mt-12">
            {advantageItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 bg-light-bg/60 rounded-2xl border border-soft-border/60 hover:shadow-lg hover:border-corporate-blue/30 transition-all"
              >
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-corporate-blue text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-corporate-blue/30 ring-2 ring-white">
                    {idx + 1}
                  </div>
                  <item.icon size={28} strokeWidth={1.5} className="text-primary-navy" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-primary-navy text-sm leading-snug">{item.title}</h3>
                  <p className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider">{item.tagline}</p>
                  <p className="text-xs text-muted-text leading-relaxed pt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── MOBILE: Vertical stacked cards ────────────────────── */}
          <div className="flex flex-col gap-0 md:hidden mt-10 relative">
            {/* vertical connector line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-corporate-blue/60 via-corporate-blue/20 to-transparent pointer-events-none" />
            {advantageItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 pl-0 pb-6 relative">
                {/* Badge */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-corporate-blue text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-corporate-blue/40 ring-2 ring-white z-10">
                  {idx + 1}
                </div>
                {/* Card body */}
                <div className="flex-1 bg-white border border-soft-border/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                  <item.icon size={26} strokeWidth={1.5} className="text-primary-navy mb-2" />
                  <h3 className="font-extrabold text-primary-navy text-sm mb-0.5 leading-snug">{item.title}</h3>
                  <p className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider mb-1.5">{item.tagline}</p>
                  <p className="text-xs text-muted-text leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FEATURED PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <SectionHeading
          badge="RECENT PROJECTS"
          title="Our Latest Completed Security and Infrastructure Initiatives"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate(`/all-project/${project.slug}/`)}
              className="bg-white rounded-2xl overflow-hidden border border-soft-border/60 shadow-sm hover:shadow-xl hover:border-corporate-blue/30 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              {/* Image box fallback */}
              <div className="h-44 w-full bg-gradient-brand relative overflow-hidden flex items-center justify-center text-white/40">
                <div className="text-center p-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-300 block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">{project.title}</h4>
                </div>
                {/* Real project thumbnail */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-0"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).classList.remove("opacity-0");
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Detail body */}
              <div className="p-5 space-y-3">
                <span className="inline-block text-[10px] font-semibold text-corporate-blue bg-light-blue/20 py-1 px-2.5 rounded-full">
                  {project.category}
                </span>
                <h3 className="font-extrabold text-primary-navy text-sm md:text-base group-hover:text-corporate-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-text leading-relaxed line-clamp-2">
                  {project.challenge}
                </p>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-corporate-blue pt-2 border-t border-soft-border/40">
                  <span>View Case Study</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHY CHOOSE US */}
      <section className="bg-gradient-soft py-20 border-y border-soft-border/40 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Blocks */}
          <div className="space-y-6 text-left">
            <SectionHeading
              badge="WHY CHOOSE US"
              title="Next-Generation Managed IT & Security Services"
            />
            
            <div className="space-y-4 pt-2">
              {[
                {
                  title: "Proactive IT & Security Solutions",
                  desc: "We don't wait for problems to arise; we prevent them with 24/7 monitoring and proactive threat mitigation."
                },
                {
                  title: "Certified Security Experts",
                  desc: "Our team includes Cybersecurity Professionals, Security Analysts, and Cloud Solution Architects to secure your business."
                },
                {
                  title: "Tailored IT Services",
                  desc: "Custom solutions that fit your industry's unique compliance, operational, and security needs."
                },
                {
                  title: "Cloud & Infrastructure Management",
                  desc: "Scalable, secure, and cost-effective solutions to support your digital transformation."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3.5">
                  <div className="w-5 h-5 rounded-full bg-corporate-blue/10 flex items-center justify-center text-corporate-blue shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-primary-navy text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-text leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Blocks & Skills */}
          <div className="bg-white p-8 rounded-3xl border border-soft-border/60 shadow-md space-y-6 text-left">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-corporate-blue">Specialized Capabilities</h4>
              <p className="text-xs text-muted-text">We deploy verified enterprise structures aligned with global certification parameters.</p>
            </div>

            {/* Audiences Tags */}
            <div className="flex flex-wrap gap-2">
              {["Small and Medium-Sized Businesses", "Government", "Healthcare", "Education"].map((tag, idx) => (
                <span key={idx} className="text-[10px] font-bold text-primary-navy bg-light-bg border border-soft-border px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Skill Bars */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-primary-navy">
                  <span>Cybersecurity Solutions</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-light-bg h-2 rounded-full overflow-hidden">
                  <div className="w-[90%] bg-gradient-to-r from-corporate-blue to-sky-400 h-full rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-primary-navy">
                  <span>Cloud & Network Solutions</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-light-bg h-2 rounded-full overflow-hidden">
                  <div className="w-[92%] bg-gradient-to-r from-corporate-blue to-sky-400 h-full rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. CASE STUDIES / SUCCESS STORIES SLIDER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <SectionHeading
            badge="SUCCESS STORIES"
            title="What Clients Say"
            description="Read verified case study narratives from organizations that optimized their operations under our defensive perimeter."
          />
          <div className="flex space-x-2 shrink-0">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  activeTestimonial === idx ? "bg-corporate-blue w-8" : "bg-soft-border hover:bg-muted-text/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Current Testimonial Slide */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-soft-border/80 shadow-md relative overflow-hidden text-left min-h-64 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-corporate-blue bg-light-blue/20 px-3 py-1 rounded-full">
              Verified Case Study Outcome
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-primary-navy tracking-tight leading-snug">
              {TESTIMONIALS[activeTestimonial].title}
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-muted-text italic">
              "{TESTIMONIALS[activeTestimonial].body}"
            </p>
          </div>

          <div className="pt-6 border-t border-soft-border/40 mt-6 flex justify-between items-center">
            <div>
              <h5 className="font-bold text-primary-navy text-sm md:text-base">
                {TESTIMONIALS[activeTestimonial].clientName}
              </h5>
              <p className="text-xs text-muted-text">
                {TESTIMONIALS[activeTestimonial].clientRole}
              </p>
            </div>
            <div className="text-xs text-corporate-blue font-bold tracking-wide">
              Soruba LLC Client Success Representative
            </div>
          </div>
        </div>
      </section>

      {/* 10. PARTNERS CAROUSEL */}
      <section className="space-y-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            badge="TECHNOLOGY PARTNERS"
            title="Certified Vendors & Integrations"
            description="We partner with industry-leading technology providers to deliver secure, reliable, and innovative infrastructure solutions."
            centered
          />
        </div>
        <PartnerCarousel />
      </section>

      {/* 11. FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column info */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <SectionHeading
            badge="FAQS"
            title="Keep Your Business Safe & Ensure High Availability"
            description="Review quick answers to foundational questions about Managed Security Services (MSSP) and outsourced technology."
          />
          <div className="p-6 bg-light-bg rounded-2xl border border-soft-border space-y-3">
            <h4 className="font-bold text-primary-navy text-sm">Need a Custom Security Review?</h4>
            <p className="text-xs text-muted-text leading-relaxed">
              Every organization faces a unique compliance and network footprint. Schedule an assessment to map your current vulnerability index.
            </p>
            <button
              onClick={() => onNavigate("/contact-2/")}
              className="text-xs font-bold text-corporate-blue hover:text-primary-navy flex items-center space-x-1"
            >
              <span>Schedule Free Review</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Right column accordion */}
        <div className="lg:col-span-7">
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* 12. LATEST BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <SectionHeading
            badge="SECURITY INSIGHTS"
            title="Stay ahead with our expert blogs, whitepapers, and security updates."
            description="Our threat research group compiles emerging attack models and best practices for modern corporate administrators."
          />
          <button
            onClick={() => onNavigate("/blog/")}
            className="py-3 px-6 bg-light-bg hover:bg-soft-border/50 text-corporate-blue font-bold text-sm rounded-xl border border-soft-border/80 transition-colors shrink-0"
            id="view-all-blogs-btn"
          >
            Read All Posts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => onNavigate(`/blog/${blog.slug}`)}
              className="relative bg-white rounded-3xl overflow-hidden border border-soft-border/50 shadow-md hover:shadow-2xl hover:shadow-corporate-blue/10 hover:-translate-y-2 transition-all duration-400 cursor-pointer group flex flex-col h-full"
            >
              {/* Thumbnail with overlay */}
              <div className="relative aspect-video bg-light-bg overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700 opacity-0"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).classList.remove("opacity-0");
                  }}
                  referrerPolicy="no-referrer"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Category Badge */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-corporate-blue/90 backdrop-blur-sm py-1 px-3 rounded-full shadow-sm">
                  {blog.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 space-y-3">
                {/* Meta row */}
                <div className="flex items-center gap-3 text-[10px] text-muted-text font-semibold">
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-corporate-blue" />
                    By Admin
                  </span>
                  <span className="w-1 h-1 rounded-full bg-soft-border" />
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-corporate-blue" />
                    {blog.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-primary-navy text-sm md:text-base leading-snug group-hover:text-corporate-blue transition-colors duration-200 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-muted-text leading-relaxed line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>

                {/* CTA footer */}
                <div className="pt-3 mt-auto border-t border-soft-border/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-corporate-blue group-hover:text-primary-navy transition-colors">
                    Read Full Article
                  </span>
                  <div className="w-7 h-7 rounded-full bg-light-bg group-hover:bg-corporate-blue flex items-center justify-center transition-all duration-300">
                    <ArrowRight size={13} className="text-corporate-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. BOTTOM HOME CTA BANNER */}
      <section className="bg-gradient-brand py-16 text-white relative overflow-hidden border-t border-white/5 shadow-inner">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-white/5 blur-2xl" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-300">GET IN TOUCH</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Let's Secure & Transform Your Business
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Configure dynamic firewalls, eliminate malware threats, secure active directories, and set up high-availability cloud configurations with our dedicated specialists.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("/contact-2/")}
              className="py-3 px-8 bg-white hover:bg-light-blue text-primary-navy font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              id="bottom-banner-cta-btn"
            >
              Book a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
