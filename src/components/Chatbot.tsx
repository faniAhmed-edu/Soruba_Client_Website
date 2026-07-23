import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";

interface ChatEntry {
  question: string;
  answer: string | null;
  error: string | null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState<ChatEntry | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  // Auto-focus the input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll answer into view when it appears
  useEffect(() => {
    if (entry?.answer || entry?.error) {
      answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [entry]);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    if (msg.length > 800) return;

    setLoading(true);
    setEntry({ question: msg, answer: null, error: null });
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEntry({ question: msg, answer: null, error: data.error || "Something went wrong. Please try again." });
      } else {
        setEntry({ question: msg, answer: data.reply, error: null });
      }
    } catch {
      setEntry({ question: msg, answer: null, error: "Unable to connect. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewQuestion = () => {
    setEntry(null);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Custom formatting function to parse simple markdown bold, list items, and clean up asterisks/stars
  const renderFormattedText = (text: string | null) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, lineIdx) => {
      // Check if line is a bullet/list item
      const isListItem = line.trim().startsWith("-") || line.trim().startsWith("*") || line.trim().startsWith("•");
      const cleanLine = isListItem ? line.trim().replace(/^[-*•]\s+/, "") : line;

      // Extract bold/italic markdown formatting like ***bold*** or **bold** or *italic*
      const parts = cleanLine.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g);

      const renderedLine = parts.map((part, partIdx) => {
        if (part.startsWith("***") && part.endsWith("***")) {
          return <strong key={partIdx} className="font-extrabold text-[#112C46]">{part.slice(3, -3)}</strong>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={partIdx} className="font-bold text-[#112C46]">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={partIdx} className="italic">{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (isListItem) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 pl-2 mt-1">
            <span className="text-[#3E6195] shrink-0 mt-0.5 text-sm leading-none">•</span>
            <span className="flex-1">{renderedLine}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className={lineIdx > 0 ? "mt-2" : ""}>
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* ── Floating Toggle Button ────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#112C46] to-[#3E6195] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-[#DCEAF7] flex flex-col overflow-hidden"
          style={{ maxHeight: "min(580px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#112C46] to-[#3E6195] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Ask Soruba LLC</p>
                <p className="text-white/70 text-[10px] font-medium">AI Customer Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F6FAFF]">
            {/* Welcome / idle state */}
            {!entry && !loading && (
              <div className="text-center py-6 px-2 space-y-3">
                <div className="w-12 h-12 bg-[#AFCCEB]/30 rounded-full flex items-center justify-center mx-auto">
                  <Bot size={24} className="text-[#3E6195]" />
                </div>
                <p className="text-[#112C46] font-bold text-sm">Hi! How can I help you?</p>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Ask me about Soruba LLC's services, pricing, cybersecurity solutions, or how to get in touch.
                </p>
              </div>
            )}

            {/* Q&A Display */}
            {entry && (
              <div className="space-y-3">
                {/* User question */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-gradient-to-br from-[#112C46] to-[#3E6195] text-white text-xs font-medium rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] leading-relaxed">
                    {entry.question}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#AFCCEB]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={13} className="text-[#3E6195]" />
                  </div>
                </div>

                {/* Loading state */}
                {loading && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#DCEAF7] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot size={13} className="text-[#3E6195]" />
                    </div>
                    <div className="bg-white border border-[#DCEAF7] text-[#64748B] text-xs rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                      <Loader2 size={13} className="animate-spin text-[#3E6195]" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Answer */}
                {entry.answer && !loading && (
                  <div ref={answerRef} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#DCEAF7] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot size={13} className="text-[#3E6195]" />
                    </div>
                    <div className="bg-white border border-[#DCEAF7] text-[#0F172A] text-xs rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] leading-relaxed shadow-sm">
                      {renderFormattedText(entry.answer)}
                    </div>
                  </div>
                )}

                {/* Error */}
                {entry.error && !loading && (
                  <div ref={answerRef} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={13} className="text-red-400" />
                    </div>
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] leading-relaxed">
                      {entry.error}
                    </div>
                  </div>
                )}

                {/* New question prompt */}
                {!loading && (entry.answer || entry.error) && (
                  <div className="text-center pt-1">
                    <button
                      onClick={handleNewQuestion}
                      className="text-[10px] font-semibold text-[#3E6195] hover:text-[#112C46] underline underline-offset-2 transition-colors"
                    >
                      Ask another question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="shrink-0 border-t border-[#DCEAF7] bg-white px-4 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 800))}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services, pricing, or support..."
                rows={1}
                disabled={loading || Boolean(entry && !entry.answer && !entry.error)}
                className="flex-1 resize-none bg-[#F6FAFF] border border-[#DCEAF7] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] placeholder:text-[#64748B]/60 focus:outline-none focus:border-[#3E6195] focus:bg-white transition-colors leading-relaxed max-h-[100px] disabled:opacity-50 disabled:cursor-not-allowed font-[inherit]"
                style={{ minHeight: "42px" }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#112C46] to-[#3E6195] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
