/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, HelpCircle, AlertCircle, CheckCircle2, RefreshCw, ShieldAlert } from "lucide-react";
import { PageHero, SectionHeading } from "../components/UI";
import { BUSINESS_INFO, itConsultation } from "../data";
// @ts-ignore
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

export default function Contact({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    captchaAnswer: ""
  });

  useEffect(() => {
    loadCaptchaEnginge(6); 
  }, []);

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Form Validation
    if (!formData.name || !formData.email || !formData.message) {
      setValidationError("Please fill out all required fields.");
      return;
    }

    // CAPTCHA validation (react-simple-captcha)
    if (!validateCaptcha(formData.captchaAnswer)) {
      setValidationError("Incorrect CAPTCHA answer. Please try again.");
      // Reload captcha if failed
      loadCaptchaEnginge(6);
      setFormData({ ...formData, captchaAnswer: "" });
      return;
    }

    setFormState("submitting");

    // Simulate sending network request
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "", captchaAnswer: "" });
    }, 1500);
  };

  return (
    <div className="space-y-20 pb-12 text-left">
      {/* 1. PAGE HERO */}
      <PageHero
        title="Contact Us"
        breadcrumbs={[{ label: "Contact Us" }]}
        onNavigate={onNavigate}
      />

      {/* 2. CONTACT INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Phone */}
        <div className="p-6 bg-white rounded-2xl border border-soft-border/70 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center text-corporate-blue shrink-0">
            <Phone size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-primary-navy text-sm uppercase tracking-wider">Call Us 7/24</h4>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="text-sm font-extrabold text-corporate-blue hover:text-primary-navy transition-colors">
              {BUSINESS_INFO.phone}
            </a>
            <p className="text-xs text-muted-text">Dedicated hotline for Oregon operations support.</p>
          </div>
        </div>

        {/* Card 2: Email */}
        <div className="p-6 bg-white rounded-2xl border border-soft-border/70 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center text-corporate-blue shrink-0">
            <Mail size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-primary-navy text-sm uppercase tracking-wider">Email Us</h4>
            <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm font-extrabold text-corporate-blue hover:text-primary-navy transition-colors">
              {BUSINESS_INFO.email}
            </a>
            <p className="text-xs text-muted-text">We review and reply within 2 hours on business days.</p>
          </div>
        </div>

        {/* Card 3: Location */}
        <div className="p-6 bg-white rounded-2xl border border-soft-border/70 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center text-corporate-blue shrink-0">
            <MapPin size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-primary-navy text-sm uppercase tracking-wider">Our Location</h4>
            <span className="text-xs font-bold text-text-dark block">
              {BUSINESS_INFO.address}
            </span>
            <p className="text-xs text-muted-text">Registered Oregon LLC central headquarters.</p>
          </div>
        </div>

      </section>

      {/* 3. CONTACT FORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-soft-border/60 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-corporate-blue block">READY TO GET STARTED?</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary-navy tracking-tight leading-none">
              Let's Secure & Transform Your Business
            </h2>
            <p className="text-xs md:text-sm text-muted-text">
              Schedule a Free Consultation — Let's discuss how we can fortify your IT infrastructure and security posture.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-xs font-bold text-primary-navy">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name-input"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-light-bg border border-soft-border rounded-xl text-xs font-medium focus:outline-none focus:border-corporate-blue text-text-dark"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email-input" className="text-xs font-bold text-primary-navy">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email-input"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-light-bg border border-soft-border rounded-xl text-xs font-medium focus:outline-none focus:border-corporate-blue text-text-dark"
                placeholder="e.g. support@yourcompany.com"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message-input" className="text-xs font-bold text-primary-navy">
                Write Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message-input"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 bg-light-bg border border-soft-border rounded-xl text-xs font-medium focus:outline-none focus:border-corporate-blue text-text-dark resize-none"
                placeholder="Briefly state your technology objectives, compliance framework needs, or security concerns..."
              />
            </div>

            {/* CAPTCHA Quiz - Premium Design */}
            <div className="p-5 bg-gradient-to-br from-light-bg to-white rounded-2xl border border-soft-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="captcha-input" className="text-xs font-extrabold text-primary-navy flex items-center space-x-1.5">
                  <ShieldAlert size={16} className="text-corporate-blue" />
                  <span>Human Verification</span>
                </label>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-text">Security Check</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                {/* Canvas Container */}
                <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-soft-border/60 shadow-sm relative group overflow-hidden">
                  <div className="absolute inset-0 bg-corporate-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="bg-light-bg rounded-lg overflow-hidden border border-soft-border border-dashed">
                    <LoadCanvasTemplateNoReload />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      loadCaptchaEnginge(6);
                      setFormData({ ...formData, captchaAnswer: "" });
                    }}
                    className="p-2.5 rounded-lg bg-light-bg hover:bg-corporate-blue text-corporate-blue hover:text-white transition-all shadow-sm border border-soft-border/50 group-hover:border-corporate-blue/30"
                    title="Reload CAPTCHA"
                  >
                    <RefreshCw size={16} className="active:rotate-180 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Input Container */}
                <div className="flex-1 w-full relative">
                  <input
                    type="text"
                    id="captcha-input"
                    name="captchaAnswer"
                    required
                    value={formData.captchaAnswer}
                    onChange={handleInputChange}
                    className="w-full h-full min-h-[52px] p-3 pl-4 bg-white border border-soft-border rounded-xl text-sm font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 focus:border-corporate-blue text-primary-navy placeholder:tracking-normal placeholder:font-medium placeholder:text-muted-text/50 transition-all shadow-sm"
                    placeholder="Enter characters..."
                  />
                  {formData.captchaAnswer.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 rounded-full bg-corporate-blue animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Error alerts */}
            {validationError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-start space-x-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Success states */}
            {formState === "success" && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-600 flex items-start space-x-2">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 animate-bounce" />
                <span>Message submitted successfully! Our Oregon engineering group will reach out shortly.</span>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={formState === "submitting" || formState === "success"}
              className="w-full py-3 bg-gradient-brand hover:bg-gradient-soft hover:text-primary-navy text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              id="contact-submit-btn"
            >
              <span>{formState === "submitting" ? "Sending Secure Payload..." : "Send Message"}</span>
              <Send size={12} />
            </button>

          </form>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-soft-border/80 group">
            <div className="absolute inset-0 bg-primary-navy/5 group-hover:bg-transparent transition-all" />
            <div className="h-[400px] w-full bg-gradient-brand flex items-center justify-center text-white p-6 text-center">
              <div>
                <span className="text-xs font-mono text-sky-400 block tracking-widest mb-1">LOCAL DISPATCH</span>
                <h3 className="text-xl font-extrabold text-white">Oregon Tech Consulting</h3>
                <p className="text-xs text-white/70 mt-3 max-w-xs mx-auto">
                  Scheduling an on-site security review or network audit across Salem, Portland, and statewide.
                </p>
              </div>
            </div>
            
            {/* Real Illustration */}
            <img
              src={itConsultation}
              alt="Soruba IT Consultation Client Meeting"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:scale-105 transition-transform duration-500"
              onLoad={(e) => {
                (e.target as HTMLImageElement).classList.remove("opacity-0");
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* 4. GEOGRAPHIC MAP PORT AREA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-corporate-blue block">OFFICE COORDINATES</span>
          <h3 className="text-lg md:text-xl font-extrabold text-primary-navy tracking-tight">Map Coordinates</h3>
        </div>

        {/* Real Embedded Map Element */}
        <div className="w-full h-96 border border-soft-border/60 rounded-3xl overflow-hidden relative shadow-inner">
          <iframe
            title="Oregon Location Map"
            src="https://maps.google.com/maps?q=Oregon,+USA&t=&z=6&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
