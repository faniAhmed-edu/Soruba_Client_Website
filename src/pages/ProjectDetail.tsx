/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle2, ShieldAlert, Cpu, Award } from "lucide-react";
import { PageHero } from "../components/UI";
import { PROJECTS } from "../data";

interface ProjectDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function ProjectDetail({ slug, onNavigate }: ProjectDetailProps) {
  // Locate the project entry by slug
  const project = PROJECTS.find((p) => p.slug === slug);

  // Fallback if not found
  if (!project) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center space-y-6">
        <ShieldAlert size={48} className="text-red-500 mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold text-primary-navy">Case Study Not Found</h2>
        <p className="text-sm text-muted-text">The requested engineering case study is not active in our archives.</p>
        <button
          onClick={() => onNavigate("/")}
          className="py-2.5 px-5 bg-gradient-brand text-white font-bold rounded-lg"
        >
          Back To Home
        </button>
      </div>
    );
  }

  // Suggest other projects (excluding current one)
  const otherProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="space-y-16 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title={project.title}
        breadcrumbs={[
          { label: "Case Studies" },
          { label: project.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. CASE STUDY CONTAINER */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center space-x-2 text-xs font-bold text-corporate-blue hover:text-primary-navy"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        {/* Project Header Info */}
        <div className="space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-corporate-blue bg-light-blue/20 px-3 py-1.5 rounded-full">
            {project.category} CASE STUDY
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary-navy tracking-tight leading-none">
            {project.title} Implementation Report
          </h2>
          <p className="text-xs text-muted-text font-bold">
            Category: <span className="text-primary-navy">{project.category}</span>
          </p>
        </div>

        {/* Visual Showcase Box */}
        <div className="h-64 md:h-96 w-full bg-gradient-brand rounded-3xl relative overflow-hidden flex items-center justify-center text-white/20">
          <div className="text-center p-6 space-y-2">
            <Cpu size={44} className="mx-auto text-sky-300 animate-pulse" />
            <h4 className="text-lg font-bold text-white">{project.title} Architecture</h4>
            <p className="text-xs text-white/70 max-w-sm">Secure enterprise frameworks deployed with full redundancy verification.</p>
          </div>
          {/* Real Project Image */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove("opacity-0");
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Challenge, Solution, Results */}
        <div className="space-y-8 pt-4">
          
          {/* Challenge */}
          <div className="space-y-3 p-6 bg-red-50/50 border border-red-100 rounded-2xl">
            <h3 className="font-extrabold text-primary-navy text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
              <span>1. The Business Challenge</span>
            </h3>
            <p className="text-xs md:text-sm text-muted-text leading-relaxed font-medium">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-3 p-6 bg-light-bg border border-soft-border rounded-2xl">
            <h3 className="font-extrabold text-primary-navy text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-corporate-blue rounded-full shrink-0 animate-ping" />
              <span>2. Engineering Solution</span>
            </h3>
            <p className="text-xs md:text-sm text-text-dark leading-relaxed font-medium">
              {project.solution}
            </p>
          </div>

          {/* Results */}
          <div className="space-y-3 p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
            <h3 className="font-extrabold text-primary-navy text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0" />
              <span>3. Final Business Results</span>
            </h3>
            <p className="text-xs md:text-sm text-muted-text leading-relaxed font-medium">
              {project.results}
            </p>
          </div>

        </div>

        {/* Technologies Used */}
        <div className="space-y-3 pt-6 border-t border-soft-border/40">
          <h4 className="font-extrabold text-primary-navy text-base">Technologies & Services Deployed:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-bold text-corporate-blue bg-light-blue/20 py-1.5 px-3 rounded-lg border border-soft-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Suggest other projects */}
        <div className="space-y-6 pt-12 border-t border-soft-border/40 mt-12">
          <h3 className="font-extrabold text-primary-navy text-lg md:text-xl">Other Successful Deliveries</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((other) => (
              <div
                key={other.id}
                onClick={() => onNavigate(`/all-project/${other.slug}/`)}
                className="p-5 rounded-2xl border border-soft-border/60 bg-white shadow-sm hover:shadow-md cursor-pointer group space-y-2.5"
              >
                <span className="text-[10px] font-bold text-corporate-blue bg-light-blue/20 py-0.5 px-2 rounded-full">
                  {other.category}
                </span>
                <h4 className="font-bold text-primary-navy text-sm md:text-base group-hover:text-corporate-blue transition-colors leading-snug line-clamp-2">
                  {other.title}
                </h4>
                <p className="text-xs text-muted-text line-clamp-2">{other.challenge}</p>
                <div className="text-xs font-semibold text-corporate-blue pt-1.5 border-t border-soft-border/30">
                  View Case Study
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-gradient-brand rounded-2xl text-white text-center space-y-4 shadow-md shadow-primary-navy/20 mt-12">
          <Award size={36} className="mx-auto text-sky-300 animate-pulse" />
          <h4 className="text-lg md:text-xl font-bold">Align your corporate structures today</h4>
          <p className="text-xs text-white/80 max-w-md mx-auto">
            Discuss your upcoming system integration, network security segmentation, or helpdesk rollout goals with our experts.
          </p>
          <button
            onClick={() => onNavigate("/contact/")}
            className="py-2.5 px-6 bg-white hover:bg-light-blue text-primary-navy font-bold text-xs rounded-lg transition-all"
          >
            Start Your Project
          </button>
        </div>

      </section>
    </div>
  );
}
