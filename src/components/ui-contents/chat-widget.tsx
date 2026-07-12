/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircleQuestionMarkIcon,
  X,
  Send,
  User,
  Bot,
  Minimize2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { ANALYTICS_EVENTS, sendGTMEvent } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; text: string; timestamp?: Date };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hey there! 👋 I'm Samir's AI assistant. Ask me about his projects, tech stack, experience, or anything else!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && !minimized) {
      inputRef.current?.focus();
    }
  }, [open, minimized]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Msg = {
      role: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        console.error({ res });
        return;
      }

      const data = await res.json();

      setMessages([
        ...next,
        {
          role: "assistant",
          text: data.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (e) {
      console.error(e);
      setMessages([
        ...next,
        {
          role: "assistant",
          text: "Oops! Something went wrong on my end. Mind trying that again? 🤔",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const quickPrompts = [
    "What's your tech stack?",
    "Do you have experience with AWS?",
    "What is HareKrsna TV?",
    "How can I contact you?",
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-2 right-0 md:bottom-2 md:right-2 z-99 font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`md:mb-4 w-screen ${minimized ? "md:w-80" : "md:w-96"} transition-all duration-300`}
          >
            <div className="rounded-2xl shadow-2xl backdrop-blur-2xl bg-console-panel/95 border border-console-border flex flex-col overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-console-border flex items-center justify-between bg-console-panel-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-console-amber flex items-center justify-center">
                      <Bot className="w-5 h-5 text-console-bg" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-console-panel" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-console-text-strong">
                      SamzZ AI
                    </div>
                    <div className="text-xs text-console-muted">
                      Always here to help
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMinimized(!minimized)}
                    className="p-2 hover:bg-console-border rounded-md transition-colors"
                    aria-label="Minimize"
                  >
                    <Minimize2 className="w-4 h-4 text-console-muted" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-console-border rounded-md transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-console-muted" />
                  </button>
                </div>
              </div>

              {!minimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[400px] custom-scrollbar">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                            m.role === "user"
                              ? "bg-console-border"
                              : "bg-console-amber"
                          }`}
                        >
                          {m.role === "user" ? (
                            <User className="w-4 h-4 text-console-text" />
                          ) : (
                            <Bot className="w-4 h-4 text-console-bg" />
                          )}
                        </div>
                        <div
                          className={`flex-1 ${m.role === "user" ? "flex justify-end" : ""}`}
                        >
                          <div
                            className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                              m.role === "user"
                                ? "bg-console-amber text-console-bg rounded-tr-sm"
                                : "bg-console-panel-2 text-console-text rounded-tl-sm border border-console-border"
                            }`}
                          >
                            {m.role === "assistant" ? (
                              <div className="markdown-content">
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    // Headings
                                    h1: ({ node, ...props }) => (
                                      <h1
                                        className="text-xl font-bold mb-2 mt-4"
                                        {...props}
                                      />
                                    ),
                                    h2: ({ node, ...props }) => (
                                      <h2
                                        className="text-lg font-bold mb-2 mt-3"
                                        {...props}
                                      />
                                    ),
                                    h3: ({ node, ...props }) => (
                                      <h3
                                        className="text-base font-semibold mb-2 mt-2"
                                        {...props}
                                      />
                                    ),

                                    // Paragraphs
                                    p: ({ node, ...props }) => (
                                      <p
                                        className="mb-2 last:mb-0"
                                        {...props}
                                      />
                                    ),

                                    // Lists
                                    ul: ({ node, ...props }) => (
                                      <ul
                                        className="list-disc list-inside mb-2 space-y-1"
                                        {...props}
                                      />
                                    ),
                                    ol: ({ node, ...props }) => (
                                      <ol
                                        className="list-decimal list-inside mb-2 space-y-1"
                                        {...props}
                                      />
                                    ),
                                    li: ({ node, ...props }) => (
                                      <li className="ml-2" {...props} />
                                    ),

                                    // Strong/Bold
                                    strong: ({ node, ...props }) => (
                                      <strong
                                        className="font-bold text-console-amber"
                                        {...props}
                                      />
                                    ),

                                    // Emphasis/Italic
                                    em: ({ node, ...props }) => (
                                      <em
                                        className="italic text-console-amber/80"
                                        {...props}
                                      />
                                    ),

                                    // Links
                                    a: ({ node, ...props }) => (
                                      <a
                                        className="text-console-amber hover:text-console-amber/80 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                      />
                                    ),

                                    // Inline code
                                    code: ({
                                      node,
                                      inline,
                                      className,
                                      children,
                                      ...props
                                    }: any) => {
                                      const match = /language-(\w+)/.exec(
                                        className || "",
                                      );
                                      return !inline && match ? (
                                        <div className="my-2 rounded-lg overflow-hidden">
                                          <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{
                                              margin: 0,
                                              borderRadius: "0.5rem",
                                              fontSize: "0.85rem",
                                            }}
                                            {...props}
                                          >
                                            {String(children).replace(
                                              /\n$/,
                                              "",
                                            )}
                                          </SyntaxHighlighter>
                                        </div>
                                      ) : (
                                        <code
                                          className="bg-console-border px-1.5 py-0.5 rounded text-console-amber text-xs"
                                          {...props}
                                        >
                                          {children}
                                        </code>
                                      );
                                    },

                                    // Blockquote
                                    blockquote: ({ node, ...props }) => (
                                      <blockquote
                                        className="border-l-4 border-console-amber pl-3 italic my-2 text-console-muted"
                                        {...props}
                                      />
                                    ),

                                    // Horizontal rule
                                    hr: ({ node, ...props }) => (
                                      <hr
                                        className="my-3 border-console-border"
                                        {...props}
                                      />
                                    ),
                                  }}
                                >
                                  {m.text}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              m.text
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-console-amber">
                          <Bot className="w-4 h-4 text-console-bg" />
                        </div>
                        <div className="bg-console-panel-2 border border-console-border px-4 py-3 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-console-muted rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: 0,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-console-muted rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: 0.2,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-console-muted rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: 0.4,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Prompts */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-3">
                      <div className="text-xs text-console-muted mb-2">
                        Quick questions:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {quickPrompts.map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickPrompt(prompt)}
                            className="text-xs px-3 py-1.5 bg-console-panel-2 hover:bg-console-border border border-console-border rounded-full transition-colors text-console-muted"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-console-border bg-console-panel-2">
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          className="w-full bg-console-bg border border-console-border rounded-xl px-4 py-3 text-sm outline-none focus:border-console-amber/50 transition-all text-console-text placeholder-console-faint"
                          placeholder="Ask me anything..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyPress}
                          disabled={loading}
                        />
                      </div>
                      <button
                        onClick={send}
                        disabled={!input.trim() || loading}
                        className="rounded-xl px-4 py-3 bg-console-amber hover:bg-console-amber/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-console-bg flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-console-faint mt-2 text-center">
                      Crafted by Samir Patel
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative rounded-full p-4 bg-console-amber hover:bg-console-amber/90 shadow-lg transition-all"
          onClick={() => {
            sendGTMEvent({ event: ANALYTICS_EVENTS.AI_CHAT_OPEN });
            setOpen(true);
          }}
        >
          <MessageCircleQuestionMarkIcon className="w-6 h-6 text-console-bg" />

          <div className="absolute -top-12 right-0 bg-console-panel border border-console-border text-console-text text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with SamzZ AI
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-console-panel border-r border-b border-console-border transform rotate-45" />
          </div>
        </motion.button>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #12151c;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a3040;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3d4250;
        }

        /* Markdown content styling */
        .markdown-content {
          line-height: 1.6;
        }

        .markdown-content > *:first-child {
          margin-top: 0;
        }

        .markdown-content > *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
