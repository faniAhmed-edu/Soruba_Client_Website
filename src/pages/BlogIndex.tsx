/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Calendar, User, ArrowRight, Bookmark, Tag } from "lucide-react";
import { PageHero, SectionHeading } from "../components/UI";
import { BLOGS } from "../data";

interface BlogIndexProps {
  onNavigate: (path: string) => void;
}

export default function BlogIndex({ onNavigate }: BlogIndexProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Group and count categories
  const categories = [
    { name: "Cyber Security", count: BLOGS.filter(b => b.category === "Cyber Security" || b.category.includes("Cyber Security")).length },
    { name: "Database Security", count: BLOGS.filter(b => b.category === "Database Security" || b.category.includes("Database Security")).length },
    { name: "IT Consultancy", count: BLOGS.filter(b => b.category === "IT Consultancy" || b.category.includes("IT Consultancy")).length }
  ];

  // Group tags
  const tags = ["Business", "Technology", "Cybersecurity", "Cloud", "Zero-Trust"];

  // Filter blog posts
  const filteredBlogs = BLOGS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory
      ? post.category.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;

    const matchesTag = selectedTag
      ? post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  const recentPosts = BLOGS.slice(0, 3);

  return (
    <div className="space-y-20 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title="Knowledge Base & Blog"
        breadcrumbs={[{ label: "Blog" }]}
        onNavigate={onNavigate}
      />

      {/* 2. BLOG LIST LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Column: Blog Cards */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Filters Display */}
          {(selectedCategory || selectedTag || searchTerm) && (
            <div className="p-4 bg-light-bg rounded-xl border border-soft-border/60 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-primary-navy">
              <div className="flex items-center space-x-2">
                <span>Active Filters:</span>
                {selectedCategory && (
                  <span className="bg-corporate-blue text-white py-1 px-2.5 rounded-full">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag && (
                  <span className="bg-sky-400 text-white py-1 px-2.5 rounded-full">
                    Tag: {selectedTag}
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-soft-blue text-white py-1 px-2.5 rounded-full">
                    Search: "{searchTerm}"
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedTag(null);
                  setSearchTerm("");
                }}
                className="text-corporate-blue hover:text-primary-navy underline text-xs"
              >
                Clear All
              </button>
            </div>
          )}

          {filteredBlogs.length === 0 ? (
            <div className="p-12 text-center bg-light-bg rounded-3xl border border-soft-border/50">
              <p className="text-sm text-muted-text font-bold">No security posts match your current filter parameters.</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedTag(null);
                  setSearchTerm("");
                }}
                className="mt-4 py-2 px-4 bg-gradient-brand text-white text-xs font-bold rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredBlogs.map((blog, index) => (
                <article
                  key={blog.id}
                  onClick={() => onNavigate(`/blog/${blog.slug}`)}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-soft-border/50 shadow-md hover:shadow-2xl hover:shadow-corporate-blue/10 hover:-translate-y-1 transition-all duration-400 cursor-pointer grid grid-cols-1 md:grid-cols-12"
                >
                  {/* Left: Thumbnail */}
                  <div className="relative md:col-span-5 bg-light-bg overflow-hidden min-h-[220px] md:min-h-[260px]">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700 opacity-0"
                      onLoad={(e) => {
                        (e.target as HTMLImageElement).classList.remove("opacity-0");
                      }}
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* Issue number tag */}
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center">
                      <span className="text-xs font-black text-corporate-blue">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    {/* Category pill */}
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white bg-corporate-blue/90 backdrop-blur-sm py-1 px-3 rounded-full shadow">
                      {blog.category}
                    </span>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      {/* Meta */}
                      <div className="flex items-center flex-wrap gap-3 text-[10px] text-muted-text font-semibold">
                        <span className="flex items-center gap-1.5">
                          <User size={11} className="text-corporate-blue" />
                          By Soruba LLC
                        </span>
                        <span className="w-1 h-1 rounded-full bg-soft-border" />
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-corporate-blue" />
                          {blog.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-soft-border" />
                        <span className="flex items-center gap-1.5">
                          <Bookmark size={11} className="text-corporate-blue" />
                          {blog.tags[0]}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-extrabold text-primary-navy leading-snug tracking-tight group-hover:text-corporate-blue transition-colors duration-200 line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs md:text-sm text-muted-text leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-corporate-blue/80 bg-light-blue/20 border border-corporate-blue/15 py-0.5 px-2 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-soft-border/40">
                      <span className="text-xs font-bold text-corporate-blue group-hover:text-primary-navy transition-colors">
                        Read Full Article
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-text font-medium hidden sm:block">5 min read</span>
                        <div className="w-8 h-8 rounded-full bg-light-bg group-hover:bg-corporate-blue flex items-center justify-center transition-all duration-300 shadow-sm">
                          <ArrowRight size={14} className="text-corporate-blue group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Search Box */}
          <div className="bg-white p-6 rounded-2xl border border-soft-border/70 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-primary-navy">Search Feed</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-light-bg border border-soft-border rounded-xl text-xs font-medium focus:outline-none focus:border-corporate-blue text-text-dark"
                id="blog-search-input"
              />
              <Search size={14} className="absolute left-3.5 top-3.5 text-muted-text" />
            </div>
          </div>

          {/* Categories Box */}
          <div className="bg-white p-6 rounded-2xl border border-soft-border/70 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-primary-navy relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-corporate-blue">
              Categories
            </h4>
            <div className="space-y-2.5">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`w-full flex items-center justify-between text-xs font-bold py-1 px-2 rounded-lg transition-colors text-left cursor-pointer ${
                    selectedCategory === cat.name
                      ? "text-corporate-blue bg-light-blue/20"
                      : "text-muted-text hover:text-primary-navy"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Bookmark size={12} className="text-corporate-blue" />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] bg-light-bg py-0.5 px-2 rounded-full border border-soft-border text-muted-text">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Articles Box */}
          <div className="bg-white p-6 rounded-2xl border border-soft-border/70 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-primary-navy relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-corporate-blue">
              Recent Articles
            </h4>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer space-y-1 text-left"
                >
                  <span className="text-[10px] font-semibold text-corporate-blue">{post.date}</span>
                  <h5 className="text-xs font-bold text-primary-navy group-hover:text-corporate-blue transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Box */}
          <div className="bg-white p-6 rounded-2xl border border-soft-border/70 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-primary-navy relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-corporate-blue">
              Popular Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "bg-corporate-blue text-white border-corporate-blue"
                      : "bg-light-bg border-soft-border text-muted-text hover:text-primary-navy hover:border-corporate-blue/40"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
