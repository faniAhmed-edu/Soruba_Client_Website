/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ShieldCheck,
  Server,
  Cloud,
  Cpu,
  Lock,
  ArrowRight,
  Award,
  Users,
  MapPin,
  Building2,
  LineChart,
  Network,
  Briefcase,
  Headset,
  TrendingUp,
  FileCheck,
  Linkedin,
  ExternalLink,
  Search,
  ShieldAlert,
  Shield,
  Settings,
  Radar
} from "lucide-react";
import { PageHero, SectionHeading, PartnerGrid } from "../components/UI";
import LucideIcon from "../components/LucideIcon";
import { TEAM, INDUSTRIES } from "../data";
import coFounderHero from "../assets/images/Co_Founderr.png";
import coFounderProfile from "../assets/images/Co-Founder.png";

interface AboutProps {
  onNavigate: (path: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="pb-0 text-left bg-white">
      {/* 1. HERO SECTION */}
      <PageHero
        title="About Us"
        breadcrumbs={[{ label: "About Us" }]}
        onNavigate={onNavigate}
      />

      {/* 2. VERIFIED HISTORY & 3. MISSION STATEMENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-24">
        {/* Left column visual / Verified History */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-soft-border/80 group h-[420px]">
            {/* Full-cover photo */}
            <img
              src={coFounderHero}
              alt="Soruba Co-Founder"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient strictly at the bottom for readability without darkening the whole image */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            {/* Caption at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <span className="text-xs font-mono text-cyan-accent block tracking-widest mb-1 uppercase drop-shadow-md">Co-Founder</span>
              <h3 className="text-2xl font-extrabold text-white leading-tight drop-shadow-lg">Your Trusted Tech Partner</h3>
              <p className="text-xs text-white mt-2 leading-relaxed drop-shadow-md">
                Delivering certified expertise, enterprise-grade security, and reliable IT solutions since day one.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 md:right-4 bg-primary-navy text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/10 flex items-center gap-4">
            <Award className="text-cyan-accent shrink-0" size={32} />
            <div>
              <span className="text-[10px] font-bold text-cyan-accent uppercase tracking-widest block">Founding Pillar</span>
              <p className="text-base font-extrabold leading-tight mt-1">Years of Verified Service</p>
            </div>
          </div>
        </div>

        {/* Right column text / Mission Statement */}
        <div className="lg:col-span-7 space-y-6 lg:pl-6 pt-12 lg:pt-0">
          <SectionHeading
            badge="OUR MISSION STATEMENT"
            title="Soruba – Empowering Businesses with Secure, Scalable, and Innovative IT Solutions"
          />
          <p className="text-sm text-muted-text leading-relaxed">
            Our company was founded with a singular, clear purpose: to bridge the gap between heavy enterprise-grade security structures and the operational budgets of growing organizations. We do not just act as a technical vendor — we are a long-term strategic technology partner, ensuring your local assets remain resilient, secure, and completely optimized.
          </p>
          
          <div className="space-y-4 pt-2">
            {[
              {
                title: "Next-Generation Managed IT & Security Services",
                desc: "We provide proactive, end-to-end IT solutions designed to secure business operations, support users, and strengthen technology performance.",
                icon: Cpu
              },
              {
                title: "Enterprise-Level Cybersecurity for SMBs & Enterprises",
                desc: "Our cybersecurity approach helps organizations defend against cyber threats, protect sensitive data, and improve security readiness.",
                icon: ShieldCheck
              },
              {
                title: "Cloud, Network, and IT Management Tailored to Your Business Needs",
                desc: "We design, manage, and optimize cloud, network, and IT environments that scale with your organization.",
                icon: Cloud
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-soft-border shadow-sm hover:shadow-md hover:border-corporate-blue/30 transition-all group">
                <div className="bg-light-bg group-hover:bg-corporate-blue/10 p-3 rounded-xl h-fit transition-colors">
                  <feature.icon className="text-corporate-blue" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-text leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 SECURITY LIFECYCLE SECTION */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-soft-border/40">
        {/* Futuristic Grid & Glow Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-corporate-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24 space-y-4 max-w-3xl mx-auto">
            <SectionHeading
              badge="THE SORUBA SECURITY LIFECYCLE"
              title="A proven six-stage framework ensuring continuous protection, optimization, and alignment with your business goals."
              centered
            />
          </div>

          <div className="relative">
            {/* Horizontal Timeline Line for Desktop/Tablet */}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-1 bg-gradient-to-r from-transparent via-corporate-blue/30 to-transparent rounded-full" />
            
            {/* Vertical Timeline Line for Mobile */}
            <div className="md:hidden absolute top-8 bottom-8 left-8 w-1 bg-gradient-to-b from-corporate-blue/20 via-cyan-accent/30 to-corporate-blue/20 rounded-full" />

            {/* Grid Container */}
            <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
              {[
                { id: "01", title: "Discover", desc: "Understand Your Business", icon: Search, align: "bottom" },
                { id: "02", title: "Assess", desc: "Identify Risks & Opportunities", icon: ShieldAlert, align: "top" },
                { id: "03", title: "Secure", desc: "Strengthen Your Digital Defense", icon: Shield, align: "bottom" },
                { id: "04", title: "Implement", desc: "Deploy With Confidence", icon: Settings, align: "top" },
                { id: "05", title: "Monitor", desc: "Maintain Continuous Protection", icon: Radar, align: "bottom" },
                { id: "06", title: "Optimize", desc: "Drive Future Performance", icon: TrendingUp, align: "top" },
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-row md:flex-col items-start md:items-center group">
                  
                  {/* Step Number Circle */}
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-corporate-blue/20 flex items-center justify-center text-xl font-extrabold text-primary-navy shadow-[0_0_15px_rgba(0,0,0,0.05)] group-hover:border-cyan-accent group-hover:text-cyan-accent group-hover:shadow-[0_0_20px_rgba(25,211,255,0.4)] group-hover:scale-110 transition-all duration-300 relative z-10 shrink-0 mb-0 md:mb-8 mr-6 md:mr-0">
                    {step.id}
                  </div>

                  {/* Glassmorphism Card */}
                  <div className={`bg-white/80 backdrop-blur-md border border-soft-border/80 rounded-2xl p-6 shadow-sm group-hover:shadow-xl group-hover:border-cyan-accent/50 group-hover:-translate-y-2 transition-all duration-300 flex-1 w-full text-left md:text-center relative z-10 ${step.align === 'bottom' ? 'lg:mt-12' : ''}`}>
                    <div className="w-12 h-12 bg-light-bg group-hover:bg-cyan-accent/10 rounded-xl flex items-center justify-center mb-4 md:mx-auto transition-colors">
                      <step.icon size={24} className="text-corporate-blue group-hover:text-cyan-accent transition-colors" />
                    </div>
                    <h4 className="text-base font-bold text-primary-navy mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-text font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP & EXPERTISE SECTION */}
      <section className="bg-primary-navy text-white py-24 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-corporate-blue/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-accent bg-cyan-accent/10 px-4 py-1.5 rounded-full border border-cyan-accent/20">
            Leadership & Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Strategic Technology Leadership. Cybersecurity Excellence. Trusted Partnerships.
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            At Soruba, we help organizations transform technology into a competitive advantage. Through strategic leadership, enterprise-grade cybersecurity, and trusted technology partnerships, we deliver secure, reliable, and scalable IT solutions that empower businesses to operate with confidence and grow without disruption.
          </p>
          <div className="pt-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-cyan-accent tracking-wide uppercase bg-white/5 inline-block px-6 py-3 rounded-xl border border-white/10">
              Protect Your Business. Optimize Your Technology. Accelerate Your Growth.
            </h3>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER / CEO PROFILE SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="bg-white rounded-3xl border border-soft-border shadow-xl overflow-hidden flex flex-col md:flex-row relative">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-light-blue/30 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Left side: Photo */}
          <div className="w-full md:w-2/5 relative min-h-[400px] bg-light-bg">
            <img 
              src={coFounderProfile}
              alt="Aham Reginald Ebere - Co-Founder & CEO" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Bottom-only gradient for readability */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            {/* Strong overlay so name & title are always readable */}
            <div className="absolute inset-0 flex items-end p-8 z-10">
              <div>
                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">Aham Reginald Ebere</h3>
                <p className="text-white font-semibold text-sm mt-1 drop-shadow-md">Co-Founder | Chief Executive Officer</p>
              </div>
            </div>
          </div>
          
          {/* Right side: Bio */}
          <div className="w-full md:w-3/5 p-8 md:p-12 space-y-6 relative z-10 bg-white/95 backdrop-blur-sm">
            <p className="text-sm md:text-base text-muted-text leading-relaxed">
              Aham Reginald Ebere founded Soruba with a vision to help organizations align technology with business success. He partners with business owners and executive leaders to simplify technology, strengthen cybersecurity, and build resilient IT environments that support long-term growth.
            </p>
            <p className="text-sm md:text-base text-muted-text leading-relaxed">
              Drawing on experience in business strategy, information technology, cybersecurity, and operational leadership, Aham provides practical, business-focused technology solutions that deliver measurable results.
            </p>
            
            <blockquote className="border-l-4 border-corporate-blue pl-6 py-2 my-8 bg-light-bg/50 rounded-r-xl">
              <p className="text-base md:text-lg font-bold text-primary-navy italic leading-relaxed">
                "Technology should empower your business, not become another challenge. Our commitment is to simplify IT, strengthen security, and become a trusted technology partner in your success."
              </p>
            </blockquote>

            <div className="space-y-4 pt-4 border-t border-soft-border/50">
              <h4 className="text-sm font-bold text-primary-navy uppercase tracking-widest">Areas of Leadership</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Business Technology Strategy",
                  "Managed IT & Cybersecurity",
                  "Microsoft 365 & Cloud Solutions",
                  "Cybersecurity Risk Management",
                  "Compliance Readiness",
                  "Business Process Automation",
                  "Digital Transformation",
                  "Executive Technology Advisory"
                ].map((tag, i) => (
                  <span key={i} className="text-xs font-semibold bg-light-bg text-corporate-blue border border-corporate-blue/10 px-3 py-1.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL EXPERTS SECTION */}
      <section className="bg-light-bg py-24 border-y border-soft-border/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="max-w-3xl">
            <SectionHeading
              badge="OUR TECHNICAL EXPERTS"
              title="Exceptional results require exceptional expertise."
            />
            <p className="text-sm md:text-base text-muted-text leading-relaxed mt-6">
              Soruba is supported by a trusted network of experienced technology professionals with specialized expertise across cybersecurity, cloud technologies, networking, infrastructure, compliance, automation, and enterprise IT.
            </p>
            <p className="text-sm md:text-base text-muted-text leading-relaxed mt-4">
              This collaborative approach enables us to deliver the right expertise for every engagement while maintaining the personalized service and accountability our clients expect. <strong>Every engagement is led by Soruba, ensuring consistent communication, quality delivery, and long-term client success.</strong>
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <h4 className="text-sm font-bold text-primary-navy uppercase tracking-widest border-b border-soft-border/60 pb-3">Our Expertise Includes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Managed IT Services", icon: Server },
                { name: "Cybersecurity Operations", icon: ShieldCheck },
                { name: "Cloud Architecture", icon: Cloud },
                { name: "Network Infrastructure & Security", icon: Network },
                { name: "Backup & Disaster Recovery", icon: Lock },
                { name: "Identity & Access Management", icon: Users },
                { name: "Compliance & Risk Management", icon: FileCheck },
                { name: "Security Awareness Training", icon: Award },
                { name: "Business Continuity Planning", icon: TrendingUp }
              ].map((exp, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-soft-border/60 shadow-sm hover:shadow-md hover:border-corporate-blue/30 transition-all cursor-default">
                  <exp.icon size={20} className="text-corporate-blue shrink-0" />
                  <span className="font-semibold text-primary-navy text-sm">{exp.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. MANAGED IT AND CYBERSECURITY HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
        <div className="bg-primary-navy text-white p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:shadow-2xl hover:shadow-corporate-blue/20 transition-all border border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/20 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700" />
          <Cloud size={48} className="text-cyan-accent mb-6 relative z-10" />
          <h3 className="text-2xl font-extrabold mb-4 relative z-10">Managed IT Services</h3>
          <p className="text-sm md:text-base text-white/80 leading-relaxed relative z-10">
            Soruba offers end-to-end managed IT solutions designed to secure operational endpoints, support business continuity, improve system performance, and simplify technology management for growing organizations.
          </p>
        </div>
        <div className="bg-gradient-brand text-white p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary-navy/20 transition-all border border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700" />
          <ShieldCheck size={48} className="text-white mb-6 relative z-10" />
          <h3 className="text-2xl font-extrabold mb-4 relative z-10">Cybersecurity</h3>
          <p className="text-sm md:text-base text-white/90 leading-relaxed relative z-10">
            Our engineering group consists of certified security professionals focused on protecting organizations from cyber threats, strengthening infrastructure, and improving security posture through practical, business-aligned cybersecurity strategies.
          </p>
        </div>
      </section>

      {/* 8. INDUSTRIES WE SERVE */}
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

      {/* 11. WHY BUSINESSES CHOOSE SORUBA SECTION */}
      <section className="bg-primary-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#19D3FF_1px,transparent_1px)] opacity-[0.03] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Why Businesses Choose Soruba</h2>
            <p className="text-sm md:text-base text-white leading-relaxed">
              Businesses choose Soruba because they need more than an IT provider — they need a trusted technology advisor. We combine strategic guidance, proactive IT management, enterprise-grade cybersecurity, and responsive support to help organizations reduce risk, improve operational efficiency, and confidently embrace digital transformation.
            </p>
            <p className="text-sm md:text-base text-white font-semibold bg-white/5 inline-block px-6 py-3 rounded-xl border border-white/20">
              When you partner with Soruba, you gain a dedicated technology partner committed to protecting your business today while preparing it for tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Strategic Technology Guidance", icon: LineChart },
              { title: "Proactive IT Management", icon: Server },
              { title: "Enterprise-Grade Cybersecurity", icon: ShieldCheck },
              { title: "Responsive Support", icon: Headset },
              { title: "Compliance & Risk Readiness", icon: FileCheck },
              { title: "Cloud and Infrastructure Expertise", icon: Cloud },
              { title: "Long-Term Technology Partnership", icon: Briefcase },
              { title: "Business Growth Enablement", icon: TrendingUp }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 hover:bg-white/10 hover:border-white/40 transition-all group">
                <div className="bg-white/10 p-4 rounded-xl text-white group-hover:scale-110 transition-transform">
                  <benefit.icon size={28} />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{benefit.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 10. TECHNOLOGY PARTNERS SECTION */}
      <section className="space-y-10 py-20 bg-light-bg/50 border-y border-soft-border/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            badge="OUR TECHNOLOGY PARTNERS"
            title="Delivering exceptional outcomes starts with trusted technology."
            description="Soruba partners with industry-leading technology providers to deliver secure, innovative, and enterprise-grade solutions backed by world-class support and continuous innovation."
            centered
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <PartnerGrid />
        </div>
      </section>


      {/* 13. CALL TO ACTION SECTION */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-primary-navy border-t border-white/10">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-screen" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Strengthen Your Technology and Cybersecurity?
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Schedule your complimentary IT & Security Risk Assessment and discover how Soruba can help your business operate securely, efficiently, and confidently.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => onNavigate("/contact/")}
              className="w-full sm:w-auto py-4 px-10 bg-white text-primary-navy font-bold rounded-xl shadow-lg hover:shadow-white/20 hover:bg-light-bg transition-all flex items-center justify-center cursor-pointer"
            >
              <span>Get A Quote</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
            <button
              onClick={() => onNavigate("/contact/")}
              className="w-full sm:w-auto py-4 px-10 bg-transparent text-white font-bold rounded-xl hover:bg-white/10 border border-white/40 transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              <span>Contact Us</span>
            </button>
          </div>
          <button
            onClick={() => onNavigate("/contact/")}
            className="block w-full text-center text-sm text-white hover:text-white/70 transition-colors underline underline-offset-4 cursor-pointer mt-6"
          >
            Or schedule your complimentary IT & Security Risk Assessment
          </button>
        </div>
      </section>
    </div>
  );
}
