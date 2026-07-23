/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Mail, Clock, Phone, ChevronRight } from "lucide-react";
import { BUSINESS_INFO } from "../data";
import SorubaLogo from "./SorubaLogo";

interface OffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export default function OffcanvasMenu({ isOpen, onClose, onNavigate }: OffcanvasMenuProps) {
  const handleNav = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Offcanvas Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto flex flex-col p-8 border-l border-soft-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center cursor-pointer group" onClick={() => handleNav("/")}>
                <SorubaLogo height={50} className="scale-[1.4] origin-left group-hover:scale-[1.45] transition-transform duration-300" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-light-bg rounded-full text-muted-text hover:text-primary-navy transition-colors"
                id="close-sidebar-btn"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-8">
              {/* Brand Message */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-primary-navy uppercase tracking-wider">Our Mission</h4>
                <p className="text-sm leading-relaxed text-muted-text">
                  At Soruba, we empower businesses with expert IT consulting and a comprehensive suite of managed technology services, including cybersecurity, cloud, network, and voice solutions.
                </p>
              </div>

              {/* Navigation links (Mobile fallback inside offcanvas) */}
              <div className="space-y-2 py-4 border-y border-soft-border/50">
                <h4 className="text-sm font-semibold text-primary-navy uppercase tracking-wider mb-3">Navigation</h4>
                {[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about/" },
                  { name: "Our Services", path: "/our-services/" },
                  { name: "Industries", path: "/industries/" },
                  { name: "Blog", path: "/blog/" },
                  { name: "Contact Us", path: "/contact-2/" }
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className="flex items-center justify-between w-full py-2 px-3 text-left rounded-lg text-text-dark font-medium hover:bg-light-bg hover:text-corporate-blue transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={16} className="text-muted-text" />
                  </button>
                ))}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary-navy uppercase tracking-wider">Contact Info</h4>
                
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="text-corporate-blue mt-0.5 shrink-0" size={18} />
                  <span className="text-muted-text">{BUSINESS_INFO.address}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="text-corporate-blue shrink-0" size={18} />
                  <span className="text-muted-text font-medium">{BUSINESS_INFO.phone}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="text-corporate-blue shrink-0" size={18} />
                  <span className="text-muted-text">{BUSINESS_INFO.email}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="text-corporate-blue shrink-0" size={18} />
                  <span className="text-muted-text">{BUSINESS_INFO.hours}</span>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-8 pt-6 border-t border-soft-border/50">
              <button
                onClick={() => handleNav("/contact-2/")}
                className="w-full py-3 bg-gradient-brand text-white rounded-xl font-medium shadow-md shadow-corporate-blue/10 hover:shadow-lg hover:shadow-corporate-blue/20 transition-all flex items-center justify-center space-x-2"
                id="sidebar-cta-btn"
              >
                <span>Get A Quote</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
