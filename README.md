# Bloom Biotech

Public website for Bloom Biotech, Chikkamagaluru - microbial biofertilizers, ICAR-IIHR Arka Microbial Consortium, and a quote form for farmers, dealers, estates, and institutions.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Motion

Home uses Lenis (smooth scroll, off when `prefers-reduced-motion`) and Framer Motion for section reveals. Inner pages stay as they are.

## Ask Bloom (chatbot)

The floating **Ask Bloom** widget answers from the company catalogue (products, IIHR licence, plant, quotes). It works without an API key.

To use a hosted model, copy `.env.example` to `.env.local` and set `GROQ_API_KEY` (or `OPENAI_API_KEY`).

## Notes

- Content is seeded from Google, IndiaMART, Instagram, and IIHR public licence lists. Confirm phone, packs, and claims with the plant before you treat this as official.
- Enquiries POST to `/api/enquire` and append `data/enquiries.json` (fine for local demo; use email/WhatsApp in production).
- Gallery uses Unsplash stand-ins until original plant photos are added.
