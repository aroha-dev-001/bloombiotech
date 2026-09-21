"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { welcomeAnswer, type ChatAnswer } from "@/lib/assistant";
import { AiMark } from "./AiMark";

type RoleMsg =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; answer: ChatAnswer };

type Thread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: RoleMsg[];
};

const STORAGE_KEY = "bloom-chat-threads-v2";
const ACTIVE_KEY = "bloom-chat-active-v2";

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

function readThreads(raw: unknown): Thread[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((t) => {
      const thread = t as Partial<Thread>;
      if (!thread?.id || !Array.isArray(thread.messages)) return null;
      return {
        id: String(thread.id),
        title: String(thread.title || "Chat"),
        updatedAt: Number(thread.updatedAt) || 0,
        messages: thread.messages
          .map((m) => {
            const msg = m as RoleMsg;
            if (msg?.role === "user" && "content" in msg) {
              return { id: String(msg.id || uid()), role: "user" as const, content: String(msg.content) };
            }
            if (msg?.role === "assistant") {
              return { id: String(msg.id || uid()), role: "assistant" as const, answer: asAnswer(msg.answer) };
            }
            return null;
          })
          .filter((m): m is RoleMsg => m !== null),
      };
    })
    .filter((t): t is Thread => t !== null && t.messages.length > 0);
}

function freshThread(): Thread {
  return {
    id: uid(),
    title: "New chat",
    updatedAt: Date.now(),
    messages: [{ id: uid(), role: "assistant", answer: welcomeAnswer }],
  };
}

const BOOT_THREAD: Thread = {
  id: "boot",
  title: "New chat",
  updatedAt: 0,
  messages: [{ id: "welcome", role: "assistant", answer: welcomeAnswer }],
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([BOOT_THREAD]);
  const [activeId, setActiveId] = useState("boot");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = readThreads(raw ? JSON.parse(raw) : []);
      const lastId = localStorage.getItem(ACTIVE_KEY);
      if (saved.length) {
        setThreads(saved);
        setActiveId(saved.some((t) => t.id === lastId) ? (lastId as string) : saved[0].id);
      } else {
        const t = freshThread();
        setThreads([t]);
        setActiveId(t.id);
      }
    } catch {
      const t = freshThread();
      setThreads([t]);
      setActiveId(t.id);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !threads.length) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads.slice(0, 30)));
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
  }, [threads, activeId, ready]);

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

  const active = useMemo(
    () => threads.find((t) => t.id === activeId) ?? threads[0] ?? BOOT_THREAD,
    [threads, activeId],
  );

  useEffect(() => {
    if (!open) return;
    const pane = listRef.current;
    if (pane) pane.scrollTop = pane.scrollHeight;
    if (window.matchMedia("(min-width: 640px)").matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [active.messages, open, busy]);

  function patchThread(id: string, updater: (t: Thread) => Thread) {
    setThreads((all) => all.map((t) => (t.id === id ? updater(t) : t)));
  }

  function newChat() {
    const t = freshThread();
    setThreads((all) => [t, ...all]);
    setActiveId(t.id);
    setHistoryOpen(false);
    setInput("");
  }

  function closePanel() {
    setOpen(false);
    setHistoryOpen(false);
  }

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy || !ready) return;
    const threadId = activeIdRef.current;
    const userMsg: RoleMsg = { id: uid(), role: "user", content: q };
    const current = threads.find((t) => t.id === threadId) ?? active;
    const title = current.title === "New chat" ? q.slice(0, 36) : current.title;
    patchThread(threadId, (t) => ({
      ...t,
      title,
      updatedAt: Date.now(),
      messages: [...t.messages, userMsg],
    }));
    setInput("");
    setBusy(true);
    try {
      const history = [...current.messages, userMsg]
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
            { label: "WhatsApp", href: "https://wa.me/918884568019" },
          ],
          followUps: [],
        },
      );
      patchThread(threadId, (t) => ({
        ...t,
        updatedAt: Date.now(),
        messages: [...t.messages, { id: uid(), role: "assistant", answer }],
      }));
    } catch {
      patchThread(threadId, (t) => ({
        ...t,
        messages: [
          ...t.messages,
          {
            id: uid(),
            role: "assistant",
            answer: asAnswer({
              title: "Offline",
              summary: "The chat could not reach the server. Call or WhatsApp the plant.",
              bullets: ["Network error.", "Call +91 88845 68019."],
              links: [{ label: "Quote form", href: "/enquire" }],
              followUps: [],
            }),
          },
        ],
      }));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open ? (
        <div className="pointer-events-auto fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--bone)] shadow-2xl overscroll-none sm:inset-auto sm:right-4 sm:bottom-20 sm:h-[min(36rem,78vh)] sm:w-[26rem] sm:rounded-none">
          {historyOpen ? (
            <div className="absolute inset-0 z-10 flex flex-col bg-[var(--bone)]">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <p className="text-[1rem] font-medium">Chat history</p>
                <button
                  type="button"
                  className="grid h-11 min-w-11 place-items-center text-[0.95rem] text-muted"
                  onClick={() => setHistoryOpen(false)}
                >
                  Back
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto p-2">
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(t.id);
                        setHistoryOpen(false);
                      }}
                      className={`mb-1 w-full rounded-xl px-3 py-3 text-left text-[0.95rem] ${
                        t.id === activeId ? "bg-lime/30" : "hover:bg-cream"
                      }`}
                    >
                      <span className="block truncate font-medium text-ink">
                        {t.title}
                      </span>
                      <span className="text-[0.95rem] text-muted">
                        {t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "Current"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex items-center gap-2 border-b border-[var(--line)] px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
            <AiMark />
            <div className="min-w-0 flex-1">
              <p className="text-[1rem] font-medium leading-tight">Ask Bloom AI</p>
              <p className="truncate text-[11px] text-muted">{active.title}</p>
            </div>
            <IconBtn label="New chat" onClick={newChat}>
              +
            </IconBtn>
            <IconBtn label="History" onClick={() => setHistoryOpen(true)}>
              ☰
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
            {active.messages.map((m) =>
              m.role === "user" ? (
                <div
                  key={m.id}
                  className="ml-8 rounded-none bg-[var(--brand)] px-3 py-2 text-[0.95rem] text-white sm:ml-10"
                >
                  {m.content}
                </div>
              ) : (
                <AnswerCard key={m.id} answer={m.answer} onAsk={send} />
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
              disabled={busy || !ready}
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
  children: React.ReactNode;
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

function AnswerCard({
  answer,
  onAsk,
}: {
  answer: ChatAnswer;
  onAsk: (q: string) => void;
}) {
  return (
    <div className="mr-2 rounded-none bg-[var(--bone)] p-3 text-[1rem] shadow-sm sm:mr-4">
      <p className="font-medium text-[var(--ink)]">{answer.title}</p>
      {answer.summary ? (
        <p className="mt-2 text-[13px] leading-relaxed text-ink">{answer.summary}</p>
      ) : null}
      <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-ink">
        {(answer.bullets ?? []).map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {answer.cta ? <p className="mt-2 text-[0.95rem] text-muted">{answer.cta}</p> : null}
      {answer.links?.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {answer.links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="rounded-full bg-cream px-3 py-1.5 text-[12px] text-[var(--leaf)]"
            >
              {l.label}
            </Link>
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
