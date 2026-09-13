import { llmIndex } from "@/lib/llm-txt";

export function GET() {
  return new Response(llmIndex(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
