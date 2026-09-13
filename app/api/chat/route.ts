import { NextResponse } from "next/server";
import {
  answerQuestion,
  assistantSystemPrompt,
  parseModelAnswer,
} from "@/lib/assistant";
import { retrieveKnowledge } from "@/lib/knowledge";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: Msg[] };
    const messages = body.messages ?? [];
    const last = [...messages].reverse().find((m) => m.role === "user");
    if (!last?.content?.trim()) {
      return NextResponse.json({ error: "Ask a question." }, { status: 400 });
    }

    const question = last.content.trim();
    const priorUser = messages
      .filter((m) => m.role === "user")
      .slice(0, -1)
      .map((m) => m.content);
    const grounded = answerQuestion(question, priorUser);
    const groq = process.env.GROQ_API_KEY;
    const openai = process.env.OPENAI_API_KEY;

    if (groq || openai) {
      const search = `${priorUser.slice(-2).join(" ")} ${question}`.trim();
      const hits = retrieveKnowledge(search, 8);
      const context = hits
        .map((h) => `${h.title}: ${h.text} (${h.href ?? ""})`)
        .join("\n");
      const endpoint = groq
        ? "https://api.groq.com/openai/v1/chat/completions"
        : "https://api.openai.com/v1/chat/completions";
      const model = groq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groq ?? openai}`,
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({
            model,
            temperature: 0.1,
            response_format: groq ? undefined : { type: "json_object" },
            messages: [
              { role: "system", content: assistantSystemPrompt },
              { role: "system", content: `Knowledge:\n${context || "(none)"}` },
              ...messages.slice(-8),
            ],
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const raw = data.choices?.[0]?.message?.content?.trim();
          if (raw) {
            return NextResponse.json({
              answer: parseModelAnswer(raw, grounded),
              mode: "llm",
            });
          }
        }
      } catch {
        // use grounded card
      }
    }

    return NextResponse.json({ answer: grounded, mode: "grounded" });
  } catch {
    return NextResponse.json({
      mode: "grounded",
      answer: {
        title: "Ask again",
        summary:
          "The assistant hit an error. Try a product name or crop, or WhatsApp the plant.",
        bullets: ["Use the quote form if chat fails again."],
        links: [{ label: "Quote", href: "/enquire" }],
        followUps: ["What is AMC?", "Coffee nursery pack"],
      },
    });
  }
}
