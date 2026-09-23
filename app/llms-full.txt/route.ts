import { llmFull } from "@/lib/llm-txt";

// Built once, with the address of the deploy it ships in (lib/site-url.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
