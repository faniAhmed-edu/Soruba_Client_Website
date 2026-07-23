/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, User, ArrowLeft, Tag, ShieldAlert } from "lucide-react";
import { PageHero } from "../components/UI";
import { BLOGS } from "../data";

interface BlogDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function BlogDetail({ slug, onNavigate }: BlogDetailProps) {
  // Locate the blog post by slug
  const post = BLOGS.find((b) => b.slug === slug);

  // Fallback if not found
  if (!post) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center space-y-6 text-left">
        <ShieldAlert size={48} className="text-red-500 mx-auto animate-pulse" />
        <h2 className="text-2xl font-bold text-primary-navy">Article Not Found</h2>
        <p className="text-sm text-muted-text">The requested cybersecurity or consulting log is not present in our directories.</p>
        <button
          onClick={() => onNavigate("/blog/")}
          className="py-2.5 px-5 bg-gradient-brand text-white font-bold rounded-lg"
        >
          Back To Blog Feed
        </button>
      </div>
    );
  }

  // Related posts: exclude current and take remaining
  const relatedPosts = BLOGS.filter((b) => b.id !== post.id).slice(0, 2);

  return (
    <div className="space-y-16 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "Blog", path: "/blog/" },
          { label: "Article Details" }
        ]}
        onNavigate={onNavigate}
      />

      {/* 2. FULL ARTICLE CONTAINER */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate("/blog/")}
          className="flex items-center space-x-2 text-xs font-bold text-corporate-blue hover:text-primary-navy transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Blog List</span>
        </button>

        {/* Article Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-text font-semibold">
            <span className="flex items-center space-x-1">
              <User size={13} className="text-corporate-blue" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar size={13} className="text-corporate-blue" />
              <span>{post.date}</span>
            </span>
            <span className="bg-light-blue/30 text-corporate-blue py-0.5 px-2.5 rounded-full uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-primary-navy tracking-tight leading-tight">
            {post.title}
          </h2>
        </div>

        {/* Featured Image display box */}
        <div className="aspect-video w-full bg-light-bg rounded-3xl relative overflow-hidden flex items-center justify-center text-primary-navy/20">
          <div className="text-center p-6">
            <span className="text-xs uppercase font-bold tracking-widest text-corporate-blue block mb-1">Knowledge File</span>
            <h4 className="text-lg font-bold text-primary-navy max-w-sm mx-auto">{post.title}</h4>
          </div>
          {/* Real Blog Image */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-contain opacity-0 bg-white"
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove("opacity-0");
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-blue max-w-none space-y-6 text-sm md:text-base leading-relaxed text-text-dark/95">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-justify font-medium">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags Block */}
        <div className="pt-6 border-t border-soft-border/40 flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="flex items-center space-x-1 text-xs font-bold text-muted-text bg-light-bg py-1.5 px-3 rounded-full border border-soft-border"
            >
              <Tag size={12} className="text-corporate-blue" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Author box */}
        <div className="p-6 md:p-8 bg-light-bg rounded-2xl border border-soft-border/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-8">
          <div className="md:col-span-2 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-brand text-white flex items-center justify-center font-bold text-xl shadow-md">
              S
            </div>
          </div>
          <div className="md:col-span-10 text-center md:text-left space-y-1">
            <h4 className="font-extrabold text-primary-navy text-sm md:text-base">Soruba LLC Research Group</h4>
            <p className="text-xs text-muted-text leading-relaxed">
              Based in Oregon, USA, our executive advisory group is comprised of IT consultants, cybersecurity architects, and managed service experts who secure commercial operations.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        <div className="space-y-6 pt-12 border-t border-soft-border/40 mt-12">
          <h3 className="font-extrabold text-primary-navy text-lg md:text-xl">Related Security Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => onNavigate(`/blog/${related.slug}`)}
                className="p-5 rounded-2xl border border-soft-border/60 bg-white shadow-sm hover:shadow-md cursor-pointer group space-y-2.5"
              >
                <span className="text-[10px] font-bold text-corporate-blue bg-light-blue/20 py-0.5 px-2 rounded-full">
                  {related.category}
                </span>
                <h4 className="font-bold text-primary-navy text-sm md:text-base group-hover:text-corporate-blue transition-colors leading-snug line-clamp-2">
                  {related.title}
                </h4>
                <p className="text-xs text-muted-text line-clamp-2">{related.excerpt}</p>
                <div className="text-xs font-semibold text-corporate-blue pt-1.5 border-t border-soft-border/30">
                  Read Article
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner: Need help securing your business? Book a consultation */}
        <div className="p-8 bg-gradient-brand rounded-2xl text-white text-center space-y-4 shadow-md shadow-primary-navy/20 mt-12">
          <h4 className="text-lg md:text-xl font-bold">Need help securing your business?</h4>
          <p className="text-xs text-white/80 max-w-md mx-auto">
            Book an executive cybersecurity or IT compliance review with our Oregon advisory group.
          </p>
          <button
            onClick={() => onNavigate("/contact-2/")}
            className="py-2.5 px-6 bg-white hover:bg-light-blue text-primary-navy font-bold text-xs rounded-lg transition-all"
          >
            Book Free Consultation
          </button>
        </div>

      </section>
    </div>
  );
}
