/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Phone, Mail, Linkedin, Facebook, Youtube, Menu, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data";
import SorubaLogo from "./SorubaLogo";

// Custom X icon (formerly Twitter) using standard SVG/Lucide pattern
const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleOffcanvas: () => void;
}

export default function Header({ currentPath, onNavigate, onToggleOffcanvas }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about/" },
    { name: "Our Services", path: "/our-services/" },
    { name: "Industries", path: "/industries/" },
    { name: "Blog", path: "/blog/" },
    { name: "Contact", path: "/contact/" }
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50">

      {/* Sticky Main Navigation Header */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 bg-white/90 backdrop-blur-md shadow-md border-b border-soft-border/60 py-2 z-50"
            : "relative bg-transparent py-3 z-50"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Area */}
          <div
            onClick={() => onNavigate("/")}
            className="flex items-center cursor-pointer group select-none"
          >
            <SorubaLogo height={50} className="scale-[3] md:scale-[3.6] origin-left group-hover:scale-[3.1] md:group-hover:scale-[3.7] transition-transform duration-300" />
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path === "/contact/" && (currentPath === "/contact" || currentPath === "/contact-2" || currentPath === "/contact-2/"));
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`text-base font-semibold tracking-wide transition-all duration-200 relative py-1 hover:text-corporate-blue ${
                    isActive ? "text-primary-navy font-extrabold" : "text-primary-navy/80"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-corporate-blue to-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate("/contact/")}
              className="hidden sm:flex items-center space-x-2 py-3 px-6 bg-gradient-brand hover:bg-gradient-soft hover:text-primary-navy text-white text-base font-semibold rounded-xl shadow-md shadow-corporate-blue/10 hover:shadow-lg transition-all hover:-translate-y-0.5"
              id="header-quote-btn"
            >
              <span>Get A Quote</span>
              <ArrowRight size={16} />
            </button>

            {/* Menu Hamburger Button */}
            <button
              onClick={onToggleOffcanvas}
              className="p-3 bg-light-bg hover:bg-soft-border/50 text-primary-navy rounded-xl border border-soft-border transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
              id="hamburger-btn"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
