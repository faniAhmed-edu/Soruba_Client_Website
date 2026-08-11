import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { Lock, Mail, Loader as Loader2, ShieldCheck, CircleAlert as AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.hash = "/admin";
        window.location.reload();
      }
    });
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(signInError.message || "Invalid credentials.");
        return;
      }
      if (data.session) {
        window.location.hash = "/admin";
        window.location.reload();
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-brand-900 to-navy-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={() => { window.location.hash = "/"; window.location.reload(); }}
          className="flex items-center gap-2 text-brand-100/70 hover:text-white transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Website</span>
        </button>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-navy-900 to-brand-700 px-8 py-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
              <ShieldCheck size={32} className="text-brand-100" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-brand-100/80 text-sm mt-1.5 font-medium">Soruba LLC Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 focus:bg-white transition-colors disabled:opacity-60"
                  placeholder="admin@soruballc.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 focus:bg-white transition-colors disabled:opacity-60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-navy-900 to-brand-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-brand-100/50 mt-6 font-medium">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
