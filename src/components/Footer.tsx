/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Clock, ArrowRight, ChevronRight, Copyright } from "lucide-react";
import { BUSINESS_INFO, BLOGS } from "../data";
import SorubaLogo from "./SorubaLogo";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  // Grab the two specified blogs
  const recentBlogs = BLOGS.slice(0, 2);

  return (
    <footer className="bg-gradient-to-b from-light-bg via-white to-light-bg border-t border-soft-border pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Column 1: Logo & Tagline */}
        <div className="space-y-3">
          <div
            onClick={() => onNavigate("/")}
            className="flex items-center justify-center cursor-pointer select-none group w-full"
          >
            <SorubaLogo height={100} className="scale-[1.5] md:scale-[1.8] origin-center group-hover:scale-[1.55] md:group-hover:scale-[1.85] transition-transform duration-300" />
          </div>
          <p className="text-sm leading-relaxed text-muted-text pt-1">
            As a trusted Managed Security Service Provider (MSSP), we specialize in tailored cybersecurity strategies that safeguard organizations.
          </p>
          <div className="text-xs text-muted-text/80 bg-soft-border/30 p-3 rounded-lg border border-soft-border/50">
            <span className="font-semibold text-primary-navy">Oregon Office:</span> Registered LLC providing local expert consulting across the Pacific Northwest and nationwide.
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6">
          <h4 className="text-base font-bold text-primary-navy relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-corporate-blue">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about/" },
              { name: "Our Services", path: "/our-services/" },
              { name: "Industries", path: "/industries/" },
              { name: "Blog Feed", path: "/blog/" },
              { name: "Contact Us", path: "/contact/" }
            ].map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => onNavigate(link.path)}
                  className="flex items-center text-sm text-muted-text hover:text-corporate-blue hover:translate-x-1 transition-all text-left"
                >
                  <ChevronRight size={14} className="mr-1.5 text-corporate-blue/70" />
                  <span>{link.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Recent Posts */}
        <div className="space-y-6">
          <h4 className="text-base font-bold text-primary-navy relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-corporate-blue">
            Recent Posts
          </h4>
          <div className="space-y-4">
            {recentBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigate(`/blog/${blog.slug}`)}
                className="group cursor-pointer space-y-1.5"
              >
                <span className="text-[11px] font-semibold text-corporate-blue/90 uppercase tracking-wide">
                  {blog.date}
                </span>
                <h5 className="text-xs font-bold text-text-dark leading-snug group-hover:text-corporate-blue transition-colors line-clamp-2">
                  {blog.title}
                </h5>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Contact Us */}
        <div className="space-y-6">
          <h4 className="text-base font-bold text-primary-navy relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-corporate-blue">
            Contact Us
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2.5">
              <MapPin size={16} className="text-corporate-blue mt-0.5 shrink-0" />
              <span className="text-muted-text text-xs leading-relaxed">{BUSINESS_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone size={16} className="text-corporate-blue shrink-0" />
              <span className="text-muted-text text-xs font-medium">{BUSINESS_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail size={16} className="text-corporate-blue shrink-0" />
              <span className="text-muted-text text-xs">{BUSINESS_INFO.email}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Clock size={16} className="text-corporate-blue shrink-0" />
              <span className="text-muted-text text-xs">{BUSINESS_INFO.hours}</span>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("/contact/")}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-gradient-brand text-white text-xs font-semibold rounded-lg shadow-md shadow-corporate-blue/10 hover:shadow-lg transition-all"
              id="footer-cta-btn"
            >
              <span>Get A Quote</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 border-t border-soft-border/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-text">
        <div className="flex items-center space-x-1">
          <Copyright size={12} />
          <span>Copyright © 2026 soruballc. All Rights Reserved.</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => onNavigate("/contact/")} className="hover:text-corporate-blue transition-colors">
            Terms & Condition
          </button>
          <button onClick={() => onNavigate("/contact/")} className="hover:text-corporate-blue transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
