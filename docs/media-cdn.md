# Media on Cloudflare Pages

The home page film (`public/world`, ~52 MB) and the two gallery clips are not in
the repo and not served by Netlify. They are deployed to a separate Cloudflare
Pages project and served from Cloudflare's edge, which includes servers across
India.

**Why:**
- **Git.** The video never enters GitHub, so every re-encode doesn't grow the
  repo's history.
- **Netlify's free plan.** It has a hard limit of 300 credits a month, and
  bandwidth costs 20 credits per GB. That's at most ~15 GB a month, and one
  full scroll of the home page streams up to ~34 MB.
- **Cloudflare Pages is free.** It doesn't meter static requests or bandwidth,
  and it doesn't need a domain.

How it fits together:
- `scripts/media.mjs` copies the files into `.media-dist/` with a content hash
  in each name (`leg00.19c63931d1.mp4`), adds CORS and cache headers, and
  deploys that folder.
- `lib/media-manifest.json` maps each plain path to its hashed name. It is
  committed.
- `lib/media.ts` builds the URLs from `NEXT_PUBLIC_MEDIA_URL` and the manifest.
  With the variable unset (local dev), everything loads from `public/`.
- Before every Netlify build, a guard checks the media host is serving the
  current files. If it isn't, the build fails and the previous deploy stays
  live, instead of publishing a home page with no film.

---

## One-time setup

1. **Create a free Cloudflare account** at dash.cloudflare.com. No domain is
   needed.
2. **Log wrangler in** from the project folder. This opens the browser once:
   ```bash
   npx wrangler@3 login
   ```
3. **Create the Pages project.** Pick a name; it becomes `<name>.pages.dev`:
   ```bash
   npx wrangler@3 pages project create bloom-biotech-media --production-branch main
   ```
   If the name is taken, pick another and use it everywhere below.
4. **Create `.env.local`** (git-ignored) from `.env.example`, and set
   `MEDIA_PAGES_PROJECT` to that name.
5. **Deploy the media:**
   ```bash
   npm run media:deploy
   ```
6. **Check it.** Put the address in `.env.local` as
   `NEXT_PUBLIC_MEDIA_URL=https://bloom-biotech-media.pages.dev`, then:
   ```bash
   npm run media:check
   ```
   Every line must say `ok` with `cors=*`. After checking, remove the line from
   `.env.local` so local dev keeps loading from `public/`.
7. **Point the site at it.** Uncomment `NEXT_PUBLIC_MEDIA_URL` in
   `netlify.toml` with the same address. Then commit, including
   `lib/media-manifest.json`, and push.

---

## Changing a clip later

1. Re-encode into `public/world/` as before.
2. Run `npm run media:deploy`. Changed files get new hashed names and the
   manifest updates.
3. Commit `lib/media-manifest.json` and push straight away.

Between the media deploy and Netlify finishing its build (a few minutes), the
old live site still asks for the old names. Push promptly.

---

## At launch, on bloombiotech.co.in

At launch, give the media its own subdomain: in the Pages project, open
**Custom domains → Set up a domain**, enter `media.bloombiotech.co.in`, and add
the CNAME record it asks for at GoDaddy. The DNS doesn't need to move to
Cloudflare for a subdomain. Then change `NEXT_PUBLIC_MEDIA_URL` in
`netlify.toml` and push.

## Keeping the source files safe

`public/world/` is git-ignored, so it exists only on the machine that built it
and in the deployed Pages project. Keep a copy somewhere of your own, such as
Google Drive. The source renders in `scrollcraft/builds/bloom-home/raw/` can
recreate it with `tools/enc.sh`.
