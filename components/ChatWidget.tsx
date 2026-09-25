"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { welcomeAnswer, type ChatAnswer } from "@/lib/assistant";
import { isExternal, isHandoff, linkify } from "@/lib/chat-links";
import { site, telHref, whatsappUrl } from "@/lib/site";
import { AiMark } from "./AiMark";

type RoleMsg =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; answer: ChatAnswer };

/**
 * The conversation lives only as long as the page does. Earlier versions kept
 * every thread in localStorage; farmers ask from shared family phones, and a
 * dealer's questions are nobody else's business, so nothing is kept now.
 * These are the keys that used to hold it, cleared from browsers that still
 * have them.
 */
const RETIRED_KEYS = ["bloom-chat-threads-v2", "bloom-chat-active-v2"];

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "Company" },
  { href: "/gallery", label: "Film room" },
  { href: "/enquire", label: "Quote" },
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function asAnswer(raw: unknown): ChatAnswer {
  const a = (raw ?? {}) as Partial<ChatAnswer>;
  return {
    title: String(a.title || "Ask Bloom AI"),
    summary: String(a.summary || ""),
    bullets: Array.isArray(a.bullets) ? a.bullets.map(String) : [],
    cta: a.cta ? String(a.cta) : undefined,
    links: Array.isArray(a.links)
      ? a.links.filter((l) => l && typeof l.href === "string" && typeof l.label === "string")
      : [],
    followUps: Array.isArray(a.followUps) ? a.followUps.map(String) : [],
  };
}

const welcome = (): RoleMsg[] => [{ id: "welcome", role: "assistant", answer: welcomeAnswer }];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<RoleMsg[]>(welcome);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      for (const key of RETIRED_KEYS) localStorage.removeItem(key);
    } catch {
      // Blocked storage has nothing in it to clear.
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const y = window.scrollY;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const pane = listRef.current;
    if (pane) pane.scrollTop = pane.scrollHeight;
    if (window.matchMedia("(min-width: 640px)").matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [messages, open, busy]);

  function newChat() {
    setMessages(welcome());
    setInput("");
  }

  function closePanel() {
    setOpen(false);
  }

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const userMsg: RoleMsg = { id: uid(), role: "user", content: q };
    const add = (m: RoleMsg) => setMessages((all) => [...all, m]);
    add(userMsg);
    setInput("");
    setBusy(true);
    try {
      const history = [...messages, userMsg]
        .filter((m): m is Extract<RoleMsg, { role: "user" }> => m.role === "user")
        .slice(-6)
        .map((m) => ({ role: "user" as const, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json()) as { answer?: ChatAnswer };
      const answer = asAnswer(
        data.answer ?? {
          title: "Try again",
          summary:
            "The assistant did not return a briefing. Use WhatsApp or the quote form and include crop and acres.",
          bullets: ["Could not reach the assistant.", "Use WhatsApp or the quote form."],
          links: [
            { label: "Quote", href: "/enquire" },
            { label: "WhatsApp", href: whatsappUrl() },
          ],
          followUps: [],
        },
      );
      add({ id: uid(), role: "assistant", answer });
    } catch {
      add({
        id: uid(),
        role: "assistant",
        answer: asAnswer({
          title: "Offline",
          summary: "The chat could not reach the server. Call or WhatsApp the plant.",
          bullets: ["Network error.", `Call ${site.phoneDisplay}.`],
          links: [
            { label: `Call ${site.phoneDisplay}`, href: telHref() },
            { label: "WhatsApp", href: whatsappUrl() },
            { label: "Quote form", href: "/enquire" },
          ],
          followUps: [],
        }),
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open ? (
        <div className="pointer-events-auto fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--bone)] shadow-2xl overscroll-none sm:inset-auto sm:right-4 sm:bottom-20 sm:h-[min(36rem,78vh)] sm:w-[26rem] sm:rounded-none">
          <div className="flex items-center gap-2 border-b border-[var(--line)] px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
            <AiMark />
            <p className="min-w-0 flex-1 text-[1rem] font-medium leading-tight">Ask Bloom AI</p>
            <IconBtn label="New chat" onClick={newChat}>
              +
            </IconBtn>
            <IconBtn label="Close chat" onClick={closePanel}>
              ×
            </IconBtn>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-[var(--line)] px-2 py-1.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closePanel}
                className="shrink-0 rounded-full bg-cream px-3 py-2 text-[12px] text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-cream/70 p-3"
          >
            {messages.map((m) =>
              m.role === "user" ? (
                <div
                  key={m.id}
                  className="ml-8 rounded-none bg-[var(--brand)] px-3 py-2 text-[0.95rem] text-white sm:ml-10"
                >
                  {m.content}
                </div>
              ) : (
                <AnswerCard key={m.id} answer={m.answer} onAsk={send} onNavigate={closePanel} />
              ),
            )}
            {busy ? (
              <div className="flex items-center gap-2 text-[0.95rem] text-muted">
                <ThinkingOrb state="composing" size={20} theme="light" />
                Reading the catalogue…
              </div>
            ) : null}
          </div>

          <form
            className="flex gap-2 border-t border-[var(--line)] p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in a few words…"
              enterKeyHint="send"
              className="min-h-11 min-w-0 flex-1 rounded-full border border-[var(--line)] px-4 text-base"
            />
            <button
              type="submit"
              disabled={busy}
              className="btn btn-primary min-h-11 shrink-0 px-4"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        data-chrome="chat"
        className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[91] flex items-center gap-2 rounded-full bg-[var(--bone)] py-2.5 pr-4 pl-2 text-[1rem] font-medium shadow-lg ring-1 ring-forest/10 ${open ? "hidden sm:flex" : "flex"}`}
        aria-expanded={open}
        aria-label="Open Ask Bloom AI"
      >
        <AiMark />
        Ask Bloom AI
      </button>
    </>
  );
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center text-xl leading-none text-[var(--ink)] hover:bg-cream"
    >
      {children}
    </button>
  );
}

/**
 * One link, whatever kind: a page on this site moves there and closes the
 * chat (on a phone the chat covers the page it would have opened); a call or
 * an email hands off without leaving; anything else opens in a new tab.
 */
function ChatHref({
  href,
  className,
  onNavigate,
  children,
}: {
  href: string;
  className: string;
  onNavigate: () => void;
  children: ReactNode;
}) {
  if (isHandoff(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
}

const inline = "font-medium text-[var(--leaf)] underline decoration-[var(--brand)]/50 underline-offset-2";

function Linked({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  return linkify(text).map((seg, i) =>
    typeof seg === "string" ? (
      seg
    ) : (
      <ChatHref key={i} href={seg.href} className={inline} onNavigate={onNavigate}>
        {seg.text}
      </ChatHref>
    ),
  );
}

function AnswerCard({
  answer,
  onAsk,
  onNavigate,
}: {
  answer: ChatAnswer;
  onAsk: (q: string) => void;
  onNavigate: () => void;
}) {
  return (
    <div className="mr-2 rounded-none bg-[var(--bone)] p-3 text-[1rem] shadow-sm sm:mr-4">
      <p className="font-medium text-[var(--ink)]">{answer.title}</p>
      {answer.summary ? (
        <p className="mt-2 text-[13px] leading-relaxed text-ink">
          <Linked text={answer.summary} onNavigate={onNavigate} />
        </p>
      ) : null}
      <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-ink">
        {(answer.bullets ?? []).map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
            <span>
              <Linked text={b} onNavigate={onNavigate} />
            </span>
          </li>
        ))}
      </ul>
      {answer.cta ? (
        <p className="mt-2 text-[0.95rem] text-muted">
          <Linked text={answer.cta} onNavigate={onNavigate} />
        </p>
      ) : null}
      {answer.links?.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {answer.links.map((l) => (
            <ChatHref
              key={l.href + l.label}
              href={l.href}
              onNavigate={onNavigate}
              className="rounded-full bg-cream px-3 py-1.5 text-[12px] text-[var(--leaf)]"
            >
              {l.label}
            </ChatHref>
          ))}
        </div>
      ) : null}
      {answer.followUps?.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {answer.followUps.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onAsk(q)}
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-left text-[12px] text-muted"
            >
              {q}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
