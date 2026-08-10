/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Linkedin, Mail, ArrowLeft, Award, ShieldAlert, UserCheck } from "lucide-react";
import { PageHero } from "../components/UI";
import { TEAM, BUSINESS_INFO } from "../data";

interface TeamDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function TeamDetail({ slug, onNavigate }: TeamDetailProps) {
  // Locate the member profile by slug
  const member = TEAM.find((m) => m.slug === slug);

  // Fallback if not found
  if (!member) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center space-y-6">
        <ShieldAlert size={48} className="text-red-500 mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold text-primary-navy">Profile Not Found</h2>
        <p className="text-sm text-muted-text">The requested executive profile or consultant resume does not exist in our system directories.</p>
        <button
          onClick={() => onNavigate("/about/")}
          className="py-2.5 px-5 bg-gradient-brand text-white font-bold rounded-lg"
        >
          Back To About Us
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title={member.name}
        breadcrumbs={[
          { label: "About Us", path: "/about/" },
          { label: member.name }
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. PROFILE AREA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Photo Column */}
        <div className="lg:col-span-5 relative">
          <button
            onClick={() => onNavigate("/about/")}
            className="flex items-center space-x-2 text-xs font-bold text-corporate-blue hover:text-primary-navy mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to Team List</span>
          </button>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-soft-border/80 group">
            <div className="absolute inset-0 bg-primary-navy/5 group-hover:bg-transparent transition-all" />
            <div className="h-[400px] w-full bg-gradient-brand flex items-center justify-center text-white p-6 text-center">
              <div>
                <Award size={44} className="mx-auto text-sky-300 animate-bounce mb-3" />
                <h3 className="text-xl font-extrabold text-white">{member.name}</h3>
                <p className="text-xs text-white/70 mt-1">{member.role}</p>
              </div>
            </div>
            
            {/* Real Headshot */}
            <img
              src={member.imageUrl}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:scale-105 transition-transform duration-500"
              onLoad={(e) => {
                (e.target as HTMLImageElement).classList.remove("opacity-0");
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Quick contact panel */}
          <div className="mt-6 p-4 rounded-2xl bg-light-bg border border-soft-border/70 space-y-2.5">
            <span className="text-[10px] font-bold text-corporate-blue uppercase tracking-wider block">Direct Path</span>
            <div className="flex items-center space-x-2.5 text-xs text-muted-text font-medium">
              <Mail size={14} className="text-corporate-blue shrink-0" />
              <span>{BUSINESS_INFO.email}</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-muted-text font-medium">
              <Linkedin size={14} className="text-corporate-blue shrink-0" />
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline hover:text-corporate-blue">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-corporate-blue bg-light-blue/20 px-3 py-1 rounded-full">
              <UserCheck size={12} />
              <span>Verified Specialist</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-navy tracking-tight leading-none">
              {member.name}
            </h2>
            <p className="text-sm text-corporate-blue font-extrabold">{member.role}</p>
          </div>

          {/* Biography */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-primary-navy text-lg border-b border-soft-border/40 pb-2">Biography</h3>
            <p className="text-sm text-muted-text leading-relaxed">
              {member.bio}
            </p>
            <p className="text-xs text-muted-text/80 leading-relaxed italic">
              "Providing custom security layouts and client-centric consulting demands absolute technical precision. At Soruba LLC, we treat client confidentiality and operational availability as our highest milestones."
            </p>
          </div>

          {/* Skills Bars */}
          <div className="space-y-6">
            <h3 className="font-extrabold text-primary-navy text-lg border-b border-soft-border/40 pb-2">Certified Capability</h3>
            
            <div className="space-y-4">
              {member.skills.map((skill, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-primary-navy">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-light-bg h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-corporate-blue to-sky-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Pathway */}
          <div className="p-6 bg-gradient-brand rounded-2xl text-white space-y-4 shadow-md shadow-primary-navy/15 mt-8">
            <h4 className="font-bold text-sm md:text-base">Ready to align with our tech veterans?</h4>
            <p className="text-xs text-white/80">
              Schedule a technical roadmap call or request an infrastructure risk audit with {member.name}.
            </p>
            <button
              onClick={() => onNavigate("/contact/")}
              className="py-2.5 px-5 bg-white hover:bg-light-blue text-primary-navy font-bold text-xs rounded-lg transition-all"
            >
              Request Roadmap Call
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
