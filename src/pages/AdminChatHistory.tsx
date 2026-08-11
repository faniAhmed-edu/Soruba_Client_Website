import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { ChatHistoryRow } from "../lib/supabase";
import { MessageSquare, Search, Loader as Loader2, Trash2, Calendar, Bot, User, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Circle as XCircle, ChevronRight, X } from "lucide-react";

export default function AdminChatHistory() {
  const [history, setHistory] = useState<ChatHistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "success" | "error">("all");
  const [selectedChat, setSelectedChat] = useState<ChatHistoryRow | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<ChatHistoryRow | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("chat_history").select("*").order("created_at", { ascending: false });
    if (error) setActionError(error.message);
    else setHistory((data as ChatHistoryRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const filteredHistory = history.filter((h) => {
    const matchesSearch =
      h.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (h.answer || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || (filter === "success" && h.answer && !h.error) || (filter === "error" && h.error);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (chat: ChatHistoryRow) => {
    setActionError(null);
    try {
      const { error } = await supabase.from("chat_history").delete().eq("id", chat.id);
      if (error) throw error;
      setSuccessMsg("Chat record deleted successfully.");
      setDeleteConfirm(null);
      if (selectedChat?.id === chat.id) setSelectedChat(null);
      await fetchHistory();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete chat record.";
      setActionError(msg);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      " at " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const successCount = history.filter((h) => h.answer && !h.error).length;
  const errorCount = history.filter((h) => h.error).length;

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-semibold text-emerald-700 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={18} className="shrink-0" /><span>{successMsg}</span>
        </div>
      )}
      {actionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" /><span>{actionError}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Chats", value: history.length, icon: MessageSquare, color: "text-brand-600" },
          { label: "Successful", value: successCount, icon: CheckCircle2, color: "text-emerald-500" },
          { label: "Errors", value: errorCount, icon: XCircle, color: "text-red-500" },
          { label: "Showing", value: filteredHistory.length, icon: Search, color: "text-brand-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-lg font-extrabold text-navy-900">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors" />
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
          {(["all", "success", "error"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                filter === f ? "bg-gradient-to-r from-navy-900 to-brand-700 text-white shadow-sm" : "text-slate-500 hover:text-navy-900"
              }`}>
              {f === "all" ? "All" : f === "success" ? "Answered" : "Errors"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-brand-600" />
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-bold text-navy-900">No chat records found</p>
            <p className="text-xs text-slate-500 mt-1">
              {searchTerm || filter !== "all" ? "Try adjusting your filters." : "Visitor conversations will appear here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredHistory.map((chat) => (
              <div key={chat.id} className="p-4 md:p-5 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedChat(chat)}>
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${chat.error ? "bg-red-50" : "bg-brand-50"}`}>
                    {chat.error ? <XCircle size={18} className="text-red-500" /> : <Bot size={18} className="text-brand-600" />}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                        <Calendar size={11} className="text-brand-600" />{formatDate(chat.created_at)}
                      </span>
                      {chat.error ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Error</span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Answered</span>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <User size={13} className="text-brand-600 shrink-0 mt-0.5" />
                      <p className="text-sm font-bold text-navy-900 line-clamp-1">{chat.question}</p>
                    </div>
                    {chat.answer && (
                      <div className="flex items-start gap-2">
                        <Bot size={13} className="text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{chat.answer}</p>
                      </div>
                    )}
                    {chat.error && <p className="text-xs text-red-500 font-medium line-clamp-1 pl-5">{chat.error}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ChevronRight size={18} className="text-slate-400 hidden md:block" />
                    <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(chat); }}
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-200 flex items-center justify-center transition-all" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedChat(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-navy-900 to-brand-700 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <MessageSquare size={18} className="text-brand-100" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white">Conversation Detail</h2>
                  <p className="text-[10px] text-brand-100/70 font-medium">{formatDate(selectedChat.created_at)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedChat(null)} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  <User size={14} /><span>Visitor Question</span>
                </div>
                <div className="bg-gradient-to-br from-navy-900 to-brand-700 text-white text-sm font-medium rounded-2xl rounded-tr-sm px-4 py-3 leading-relaxed">
                  {selectedChat.question}
                </div>
              </div>
              {selectedChat.answer && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-600">
                    <Bot size={14} /><span>AI Response</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 text-navy-900 text-sm rounded-2xl rounded-tl-sm px-4 py-3 leading-relaxed whitespace-pre-wrap">
                    {selectedChat.answer}
                  </div>
                </div>
              )}
              {selectedChat.error && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-red-600">
                    <AlertCircle size={14} /><span>Error</span>
                  </div>
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3 leading-relaxed">
                    {selectedChat.error}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">Record ID: {selectedChat.id.slice(0, 8)}...</span>
              <button onClick={() => { setSelectedChat(null); setDeleteConfirm(selectedChat); }}
                className="flex items-center gap-2 py-2 px-4 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-200 font-bold text-xs rounded-xl transition-all">
                <Trash2 size={14} /><span>Delete Record</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
                <Trash2 size={28} className="text-red-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-extrabold text-navy-900">Delete Chat Record?</h3>
                <p className="text-sm text-slate-500">This conversation will be permanently removed. This action cannot be undone.</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 bg-slate-50 text-navy-900 font-bold text-sm rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                  <Trash2 size={15} /><span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
