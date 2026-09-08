"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

// The floating product Q&A widget, mounted globally from app/layout.tsx. The
// conversation lives in component state only: nothing is stored client-side, and
// the server keeps counters, never transcripts. Plain-CSS classes (globals.css,
// "Chat widget" block), matching the rest of the site rather than Tailwind.

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_POSTED_MESSAGES = 12;
const MAX_INPUT_CHARS = 1200;

const WELCOME = "Hello! Ask me anything about The Advice Engine - what it does, pricing, "
  + "security, or how the founding beta works. I can't give financial advice.";

const STARTERS = [
  "What does the engine actually do?",
  "What does it cost?",
  "How is client data handled?",
];

function track(event: string) {
  try {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, path: window.location.pathname }),
    });
  } catch {
    // Analytics must never break the chat.
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [messages, sending]);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && !opened) {
      setOpened(true);
      track("chat_opened");
    }
  }

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_INPUT_CHARS);
    if (!question || sending) return;
    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");
    setError(null);
    setSending(true);
    track("chat_message_sent");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-MAX_POSTED_MESSAGES) }),
      });
      const body = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !body.reply) {
        setError(body.error ?? "Something went wrong. Email hello@theadviceengine.ai instead.");
      } else {
        setMessages([...history, { role: "assistant", content: body.reply }]);
      }
    } catch {
      setError("The assistant could not be reached. Email hello@theadviceengine.ai instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" role="dialog" aria-label="Ask about The Advice Engine">
          <header className="chat-panel-header">
            <div>
              <strong>Ask about The Advice Engine</strong>
              <span>AI assistant · product questions only</span>
            </div>
            <button type="button" onClick={toggle} aria-label="Close the chat">
              <X aria-hidden="true" />
            </button>
          </header>
          <div className="chat-messages" ref={scrollerRef} aria-live="polite">
            <div className="chat-bubble assistant">{WELCOME}</div>
            {messages.length === 0 && (
              <div className="chat-starters">
                {STARTERS.map((starter) => (
                  <button key={starter} type="button" onClick={() => void send(starter)}>
                    {starter}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.role}`}>{message.content}</div>
            ))}
            {sending && <div className="chat-bubble assistant chat-typing">Thinking...</div>}
            {error && <p className="chat-error" role="status">{error}</p>}
          </div>
          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <input
              type="text"
              value={input}
              maxLength={MAX_INPUT_CHARS}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the product..."
              aria-label="Your question about The Advice Engine"
              disabled={sending}
            />
            <button type="submit" disabled={sending || !input.trim()} aria-label="Send">
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="chat-disclosure">
            An AI assistant for product questions - it cannot give financial advice.
            Please do not include personal or client information; messages are processed
            by our AI provider (Anthropic) to generate the reply and are not stored as a
            conversation.
          </p>
        </section>
      )}
      <button
        type="button"
        className="chat-launcher"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close the product chat" : "Chat about The Advice Engine"}
      >
        <MessageCircle aria-hidden="true" />
        {!open && <span>Questions?</span>}
      </button>
    </div>
  );
}
