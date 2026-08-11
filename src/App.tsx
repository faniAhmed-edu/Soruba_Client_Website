import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { Chrome as Home, ShieldCheck, MessageSquare, FileText, ArrowRight } from "lucide-react";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function getCurrentPath(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  const [_session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const onHashChange = () => setCurrentPath(getCurrentPath());
    window.addEventListener("hashchange", onHashChange);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  if (currentPath === "/admin/login") {
    return <AdminLogin />;
  }

  if (currentPath === "/admin" || currentPath === "/admin/") {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy-900 to-brand-700 flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <span className="font-extrabold text-navy-900 text-sm md:text-base">Soruba LLC</span>
          </div>
          <button
            onClick={() => navigateTo("/admin")}
            className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-navy-900 to-brand-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <ShieldCheck size={15} />
            <span>Admin Dashboard</span>
          </button>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-brand-50 border border-brand-100 rounded-full text-xs font-bold text-brand-700">
            <Home size={14} />
            <span>IT Managed Services Provider</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            Securing Your Business with <span className="text-brand-600">Enterprise-Grade IT Solutions</span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Soruba LLC delivers proactive cybersecurity, cloud infrastructure, and managed IT services tailored for modern enterprises. Based in Oregon, serving nationwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigateTo("/admin")}
              className="flex items-center gap-2 py-3 px-8 bg-gradient-to-r from-navy-900 to-brand-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <ShieldCheck size={18} />
              <span>Access Admin Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
              <FileText size={24} className="text-brand-600" />
            </div>
            <h3 className="text-lg font-extrabold text-navy-900 mb-2">Blog Management</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create, edit, and delete blog posts through a secure admin interface. All content is stored in a managed database with full-text search and categorization.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
              <MessageSquare size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-extrabold text-navy-900 mb-2">Chat Histories</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Review all visitor chatbot conversations in one place. Filter by successful responses or errors, search through messages, and manage records.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-navy-950 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-xs text-slate-400 font-medium">Soruba LLC — Oregon, USA · support@soruballc.com · +1 682-414-8516</p>
          <p className="text-[10px] text-slate-500 mt-2">© 2026 Soruba LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
