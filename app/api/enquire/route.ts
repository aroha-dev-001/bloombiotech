import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const file = path.join(process.cwd(), "data", "enquiries.json");

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || !phone || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const entry = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    name,
    phone,
    email: String(body.email ?? "").trim(),
    audience: String(body.audience ?? ""),
    product: String(body.product ?? ""),
    message,
  };

  try {
    await mkdir(path.dirname(file), { recursive: true });
    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await readFile(file, "utf8")) as unknown[];
    } catch {
      existing = [];
    }
    existing.push(entry);
    await writeFile(file, JSON.stringify(existing, null, 2));
  } catch {
    // Workers / serverless runtimes have no writable local disk.
  }
  return NextResponse.json({ ok: true, id: entry.id });
}
