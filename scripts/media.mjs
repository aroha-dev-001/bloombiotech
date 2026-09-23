#!/usr/bin/env node
/**
 * The site's heavy media, served from Cloudflare Pages instead of the repo or
 * Netlify. See lib/media.ts for why.
 *
 *   npm run media:build     hash the files into .media-dist/ and write lib/media-manifest.json
 *   npm run media:deploy    build, then upload .media-dist/ to the Cloudflare Pages project
 *   npm run media:check     fetch a few files from NEXT_PUBLIC_MEDIA_URL and report
 *   (prebuild)              the guard below, run automatically before `next build`
 *
 * Every file gets its content hash in its name (leg00.3f9a1c2b7e.mp4), so it can
 * be cached for a year without ever going stale: a changed clip is a new name.
 * The manifest maps the plain path the code uses to the hashed one, and is
 * committed, so a deploy of the site always asks for exactly the files that the
 * last media deploy put there.
 *
 * Settings come from the environment or .env.local (git-ignored):
 *
 *   MEDIA_PAGES_PROJECT=bloom-biotech-media   Cloudflare Pages project name
 *   CLOUDFLARE_ACCOUNT_ID=...                 optional if `wrangler login` was used
 *   CLOUDFLARE_API_TOKEN=...                  optional if `wrangler login` was used
 *   NEXT_PUBLIC_MEDIA_URL=https://bloom-biotech-media.pages.dev   (for media:check)
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PUBLIC = path.join(ROOT, "public");
const DIST = path.join(ROOT, ".media-dist");
const MANIFEST = path.join(ROOT, "lib", "media-manifest.json");

/** What lives on the media host. Paths are relative to /public. */
const SOURCES = [
  { dir: "world", match: /\.(mp4|jpg)$/ },
  { dir: "film", match: /^(plant-aerial-full|fermentation-full)\.(mp4|jpg)$/ },
];

/**
 * Pages headers. CORS because the home page fetch()es its clips to scrub them,
 * and any origin may read them because the files are public anyway (that also
 * covers Netlify deploy previews). Hashed names make the long cache safe.
 */
const HEADERS = `/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
`;

function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

function sources() {
  const out = [];
  for (const { dir, match } of SOURCES) {
    const abs = path.join(PUBLIC, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs).sort()) if (match.test(name)) out.push(`${dir}/${name}`);
  }
  return out;
}

const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;

function build() {
  const files = sources();
  if (!files.length) {
    console.error("No media found in public/world or public/film. Nothing to build.");
    process.exit(1);
  }
  fs.rmSync(DIST, { recursive: true, force: true });
  const manifest = {};
  let bytes = 0;
  for (const rel of files) {
    const body = fs.readFileSync(path.join(PUBLIC, rel));
    const hash = createHash("sha256").update(body).digest("hex").slice(0, 10);
    const { dir, name, ext } = path.parse(rel);
    const hashed = `${dir}/${name}.${hash}${ext}`;
    fs.mkdirSync(path.join(DIST, dir), { recursive: true });
    fs.writeFileSync(path.join(DIST, hashed), body);
    manifest[`/${rel}`] = `/${hashed}`;
    bytes += body.length;
  }
  fs.writeFileSync(path.join(DIST, "_headers"), HEADERS);
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`built ${files.length} files (${mb(bytes)}) into .media-dist/, manifest in lib/media-manifest.json`);
}

function deploy() {
  build();
  const project = process.env.MEDIA_PAGES_PROJECT;
  if (!project) {
    console.error("Set MEDIA_PAGES_PROJECT in .env.local (the Cloudflare Pages project name).");
    process.exit(1);
  }
  // wrangler 3 runs on Node 20; the current major needs Node 22.
  const run = spawnSync(
    "npx",
    ["-y", "wrangler@3", "pages", "deploy", DIST, "--project-name", project, "--branch", "main", "--commit-dirty=true"],
    { stdio: "inherit", env: process.env },
  );
  if (run.status !== 0) process.exit(run.status ?? 1);
  console.log("\nNext: commit lib/media-manifest.json and push, so the site asks for these exact files.");
}

async function probe(base, rel) {
  let res;
  try {
    res = await fetch(`${base}${rel}`, { headers: { origin: "https://example.netlify.app", range: "bytes=0-0" } });
  } catch (e) {
    // Unreachable host, DNS failure, TLS error: report it like a bad status.
    res = { status: `unreachable (${e.cause?.code ?? e.message})`, headers: new Headers() };
  }
  const h = (n) => res.headers.get(n) ?? "-";
  return { ok: (res.status === 200 || res.status === 206) && h("access-control-allow-origin") !== "-", res, h };
}

async function check() {
  const base = (process.env.NEXT_PUBLIC_MEDIA_URL || "").replace(/\/+$/, "");
  if (!base) {
    console.error("Set NEXT_PUBLIC_MEDIA_URL to check it.");
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const picks = ["/world/leg00.mp4", "/world/leg00.jpg", "/world/leg10-m.mp4", "/film/fermentation-full.mp4"];
  let all = true;
  for (const key of picks) {
    const rel = manifest[key];
    if (!rel) {
      console.log(`FAIL  ${key} is not in the manifest (run media:build)`);
      all = false;
      continue;
    }
    const { ok, res, h } = await probe(base, rel);
    all &&= ok;
    console.log(`${ok ? "ok  " : "FAIL"}  ${res.status}  ${rel}  type=${h("content-type")}  cors=${h("access-control-allow-origin")}  cache=${h("cache-control")}`);
  }
  process.exit(all ? 0 : 1);
}

/**
 * Runs before every `next build`. Off Netlify it does nothing. On Netlify it
 * refuses to build a site whose home page would have no film: public/world is
 * not in the repo, so without a working media URL the page would ship broken.
 * A failed build leaves the previous deploy live, which is the right outcome.
 */
async function guard() {
  if (process.env.NETLIFY !== "true") return;
  const base = (process.env.NEXT_PUBLIC_MEDIA_URL || "").replace(/\/+$/, "");
  if (!base) {
    if (fs.existsSync(path.join(PUBLIC, "world"))) return;
    console.error(
      "\nNEXT_PUBLIC_MEDIA_URL is not set and public/world is not in the repo, so the home page\n" +
        "would deploy without its film. Run `npm run media:deploy`, then set NEXT_PUBLIC_MEDIA_URL\n" +
        "in netlify.toml (see docs/media-cdn.md).\n",
    );
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const { ok, res } = await probe(base, manifest["/world/leg00.mp4"]);
  if (!ok) {
    console.error(`\nThe media host is not serving the current files (${res.status} for ${manifest["/world/leg00.mp4"]}).\n` +
      "Run `npm run media:deploy` before pushing (see docs/media-cdn.md).\n");
    process.exit(1);
  }
  console.log(`media host ok: ${base}`);
}

loadEnv();
const cmd = process.argv[2];
if (cmd === "build") build();
else if (cmd === "deploy") deploy();
else if (cmd === "check") await check();
else if (cmd === "guard") await guard();
else {
  console.error("usage: node scripts/media.mjs build|deploy|check|guard");
  process.exit(1);
}
