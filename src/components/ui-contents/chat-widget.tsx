/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleQuestionMarkIcon, X, Send, User, Bot, Minimize2, } from "lucide-react";
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
      timestamp: new Date()
    };

    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    await new Promise(resolve => { setTimeout(resolve, 500) });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        console.error({res});
        return;
      };

      const data = await res.json();

      setMessages([
        ...next,
        {
          role: "assistant",
          text: data.reply,
          timestamp: new Date()
        }
      ]);
    } catch (e) {
      console.error(e);
      setMessages([
        ...next,
        {
          role: "assistant",
          text: "Oops! Something went wrong on my end. Mind trying that again? 🤔",
          timestamp: new Date()
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
            className={`md:mb-4 w-screen ${minimized ? 'md:w-80' : 'md:w-96'} transition-all duration-300`}
          >
            <div className="rounded-2xl shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-white/10 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">SamzZ AI</div>
                    <div className="text-xs text-gray-400">Always here to help</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMinimized(!minimized)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Minimize"
                  >
                    <Minimize2 className="w-4 h-4 text-gray-300" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-gray-300" />
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
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === "user"
                          ? "bg-gradient-to-br from-blue-500 to-purple-500"
                          : "bg-gradient-to-br from-purple-500 to-pink-500"
                          }`}>
                          {m.role === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`flex-1 ${m.role === "user" ? "flex justify-end" : ""}`}>
                          <div
                            className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${m.role === "user"
                              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm"
                              : "bg-white/10 text-gray-100 rounded-tl-sm backdrop-blur-sm"
                              }`}
                          >
                            {m.role === "assistant" ? (
                              <div className="markdown-content">
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    // Headings
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-base font-semibold mb-2 mt-2" {...props} />,

                                    // Paragraphs
                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,

                                    // Lists
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                                    li: ({ node, ...props }) => <li className="ml-2" {...props} />,

                                    // Strong/Bold
                                    strong: ({ node, ...props }) => <strong className="font-bold text-purple-300" {...props} />,

                                    // Emphasis/Italic
                                    em: ({ node, ...props }) => <em className="italic text-blue-300" {...props} />,

                                    // Links
                                    a: ({ node, ...props }) => (
                                      <a
                                        className="text-blue-400 hover:text-blue-300 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                      />
                                    ),

                                    // Inline code
                                    code: ({ node, inline, className, children, ...props }: any) => {
                                      const match = /language-(\w+)/.exec(className || '');
                                      return !inline && match ? (
                                        <div className="my-2 rounded-lg overflow-hidden">
                                          <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{
                                              margin: 0,
                                              borderRadius: '0.5rem',
                                              fontSize: '0.85rem',
                                            }}
                                            {...props}
                                          >
                                            {String(children).replace(/\n$/, '')}
                                          </SyntaxHighlighter>
                                        </div>
                                      ) : (
                                        <code className="bg-white/20 px-1.5 py-0.5 rounded text-purple-300 text-xs" {...props}>
                                          {children}
                                        </code>
                                      );
                                    },

                                    // Blockquote
                                    blockquote: ({ node, ...props }) => (
                                      <blockquote className="border-l-4 border-purple-400 pl-3 italic my-2 text-gray-300" {...props} />
                                    ),

                                    // Horizontal rule
                                    hr: ({ node, ...props }) => <hr className="my-3 border-white/20" {...props} />,
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
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
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
                      <div className="text-xs text-gray-400 mb-2">Quick questions:</div>
                      <div className="flex flex-wrap gap-2">
                        {quickPrompts.map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickPrompt(prompt)}
                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-gray-300"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-white/10 bg-slate-900/50">
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
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
                        className="rounded-xl px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white flex items-center gap-2 shadow-lg shadow-purple-500/25"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      Crafted with love by Samir Patel ❤️
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
          className="group relative rounded-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
          onClick={() => {
            sendGTMEvent({event: ANALYTICS_EVENTS.AI_CHAT_OPEN});
            setOpen(true);
          }}
        >
          <MessageCircleQuestionMarkIcon className="w-6 h-6 text-white" />
         
          <div className="absolute -top-12 right-0 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with SamzZ AI ✨
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-slate-900 transform rotate-45" />
          </div>
        </motion.button>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
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