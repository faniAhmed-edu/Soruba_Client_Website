/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle2, ShieldAlert, Cpu, Check } from "lucide-react";
import { PageHero } from "../components/UI";
import { SERVICES } from "../data";

interface ServiceDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function ServiceDetail({ slug, onNavigate }: ServiceDetailProps) {
  // Locate the service item by slug
  const service = SERVICES.find((s) => s.slug === slug);

  // Fallback if not found
  if (!service) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center space-y-6">
        <ShieldAlert size={48} className="text-red-500 mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold text-primary-navy">Service Not Found</h2>
        <p className="text-sm text-muted-text">The requested technology or consulting service is not listed in our database registers.</p>
        <button
          onClick={() => onNavigate("/our-services/")}
          className="py-2.5 px-5 bg-gradient-brand text-white font-bold rounded-lg"
        >
          Back To Services List
        </button>
      </div>
    );
  }

  // Related services
  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="space-y-16 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title={service.title}
        breadcrumbs={[
          { label: "Our Services", path: "/our-services/" },
          { label: service.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. SERVICE DETAIL MAIN CONTENT */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate("/our-services/")}
          className="flex items-center space-x-2 text-xs font-bold text-corporate-blue hover:text-primary-navy"
        >
          <ArrowLeft size={14} />
          <span>Back to Services List</span>
        </button>

        {/* Header Title */}
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/20 px-3.5 py-1.5 rounded-full">
            In-Depth Analysis
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary-navy tracking-tight leading-tight">
            Comprehensive Overview: {service.title}
          </h2>
          <p className="text-sm md:text-base text-muted-text leading-relaxed">
            {service.longDesc}
          </p>
        </div>

        {/* Visual representation card */}
        <div className="h-64 md:h-80 w-full bg-gradient-brand rounded-2xl relative overflow-hidden flex items-center justify-center text-white/20 group">
          <div className="text-center p-6 space-y-2">
            <Cpu size={44} className="mx-auto text-sky-300 animate-bounce" />
            <h4 className="text-lg font-bold text-white">{service.title} Systems</h4>
            <p className="text-xs text-white/70 max-w-sm">Secure architecture designed to safeguard enterprise assets.</p>
          </div>
          {/* Real Service Image */}
          <img
            src={service.imageUrl}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-0"
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove("opacity-0");
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Benefits and core steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          <div className="space-y-4">
            <h3 className="font-extrabold text-primary-navy text-lg">Key Deliverables</h3>
            <div className="space-y-3">
              {service.offerings.map((offering, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs md:text-sm text-text-dark font-medium">
                  <CheckCircle2 size={16} className="text-corporate-blue shrink-0 mt-0.5" />
                  <span>{offering}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-light-bg rounded-2xl border border-soft-border space-y-4">
            <h3 className="font-extrabold text-primary-navy text-base">Why Choose Soruba for {service.title}?</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              We operate as a premium Managed Security Service Provider (MSSP), combining elite technical capabilities with customized corporate compliance checklists. We manage and mitigate system vulnerabilities around the clock.
            </p>
            <div className="space-y-2 text-xs font-semibold text-primary-navy">
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-corporate-blue shrink-0" />
                <span>Certified security professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-corporate-blue shrink-0" />
                <span>24/7 SIEM monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-corporate-blue shrink-0" />
                <span>Oregon-based emergency dispatch</span>
              </div>
            </div>
          </div>

        </div>

        {/* Service CTA Section */}
        <div className="p-8 bg-gradient-brand rounded-2xl text-white text-center space-y-4 shadow-md shadow-primary-navy/20">
          <h4 className="text-lg md:text-xl font-bold">Secure Your Business Assets</h4>
          <p className="text-xs text-white/80 max-w-sm mx-auto">
            Contact us today to coordinate a full vulnerability audit and map out a bulletproof strategy for your company.
          </p>
          <button
            onClick={() => onNavigate("/contact/")}
            className="py-2.5 px-6 bg-white hover:bg-light-blue text-primary-navy font-bold text-xs rounded-lg transition-all"
          >
            Schedule Free Evaluation
          </button>
        </div>

      </section>
    </div>
  );
}
