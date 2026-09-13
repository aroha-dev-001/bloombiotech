import { llmFull } from "@/lib/llm-txt";

export function GET() {
  return new Response(llmFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
