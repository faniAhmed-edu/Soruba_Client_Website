import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { LayoutDashboard, FileText, MessageSquare, LogOut, Menu, X, ExternalLink, Loader as Loader2 } from "lucide-react";
import AdminBlogManager from "./AdminBlogManager";
import AdminChatHistory from "./AdminChatHistory";

type AdminTab = "blogs" | "chat";

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("blogs");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    window.location.hash = "/admin/login";
    window.location.reload();
  }, []);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-brand-600" />
      </div>
    );
  }

  if (!session) {
    window.location.hash = "/admin/login";
    window.location.reload();
    return null;
  }

  const navItems: { id: AdminTab; label: string; icon: typeof FileText; desc: string }[] = [
    { id: "blogs", label: "Blog Management", icon: FileText, desc: "Create, edit, and delete blog posts" },
    { id: "chat", label: "Chat Histories", icon: MessageSquare, desc: "View visitor chatbot conversations" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-navy-900 to-brand-900 text-white z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <LayoutDashboard size={20} className="text-brand-100" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight">Admin Panel</h2>
              <p className="text-[10px] text-brand-100/70 font-medium">Soruba LLC</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100/50 px-3 mb-3">Management</p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20 shadow-lg"
                    : "text-brand-100/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-brand-100" : ""} />
                <div className="text-left">
                  <div>{item.label}</div>
                  <div className={`text-[10px] font-medium ${isActive ? "text-brand-100/70" : "text-brand-100/40"}`}>{item.desc}</div>
                </div>
              </button>
            );
          })}
          <div className="pt-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100/50 px-3 mb-3">External</p>
            <button
              onClick={() => handleNavigate("/")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-brand-100/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <ExternalLink size={18} />
              <span>View Website</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-brand-100 flex items-center justify-center font-extrabold text-sm text-white shrink-0">
              {session.user.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{session.user.email}</p>
              <p className="text-[10px] text-brand-100/60">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-72 min-h-screen">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-navy-900"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-lg md:text-xl font-extrabold text-navy-900 tracking-tight">
                  {activeTab === "blogs" ? "Blog Management" : "Chat Histories"}
                </h1>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  {activeTab === "blogs" ? "Create, edit, and delete blog posts" : "View visitor chatbot conversations"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 animate-fadeIn">
          {activeTab === "blogs" && <AdminBlogManager />}
          {activeTab === "chat" && <AdminChatHistory />}
        </main>
      </div>
    </div>
  );
}
