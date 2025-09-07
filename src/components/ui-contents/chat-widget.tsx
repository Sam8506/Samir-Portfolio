"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hey! Ask me about my projects, stack, and impact.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: "user", text: input } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", text: data.reply }]);
    } catch (e) {
      console.error(e);
      setMessages([
        ...next,
        { role: "assistant", text: "Hmm, I had a hiccup. Try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="w-[20rem] max-h-[65vh] rounded-2xl shadow-xl backdrop-blur-xl bg-black/70 border border-white/10 flex flex-col"
          >
            <div className="px-4 py-3 border-b border-white/10 flex justify-between">
              <div className="text-sm font-semibold">AI Assistant</div>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-xl ${
                    m.role === "user"
                      ? "bg-fuchsia-500/30 text-right"
                      : "bg-white/10"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && <div className="text-xs opacity-70">Thinking…</div>}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-sm outline-none"
                placeholder="Ask about a project…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button
                onClick={send}
                className="rounded-xl px-3 py-2 bg-white/20 hover:bg-white/30"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <button
          className="rounded-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 text-sm"
          onClick={() => setOpen(true)}
        >
          ✨ Chat with AI
        </button>
      )}
    </div>
  );
}
