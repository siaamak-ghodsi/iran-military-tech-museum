# Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-17 | Nuxt 4 (Vue 3) + Nitro | Official scaffold, SSR, API colocation |
| 2026-09-17 | File-backed JSON seed + Prisma schema | Demo without day-one Postgres; no CMS rewrite later |
| 2026-09-17 | `@nuxtjs/i18n` prefix strategy | Clean EN URLs, FA RTL at `/fa/...` |
| 2026-09-17 | TresJS for 3D | Vue-native Three.js integration |
| 2026-09-17 | Typographic image placeholders | Avoid unlicensed photography in repo |
| 2026-09-17 | Concept GLB only on F-14 record | Satisfies working viewer + honest provenance |
| 2026-09-17 | Mohajer as 3 systems | User requirement: generations, not one blob |
| 2026-09-17 | Skip pre-modern exhibit | No adequately sourced pre-modern item in time box |
| 2026-09-17 | Persian exhibit overlay | `content/data/systems.fa-museum.json` merged in `seedMapper`; specs unchanged; FA UI no longer falls back to EN for exhibit prose |
| 2026-09-17 | Spec label FA map | Human-readable spec keys translated in `SPEC_LABEL_FA`; numeric values unchanged |
| 2026-09-17 | Preview path | Local: `pnpm build` + `pnpm preview` / `pnpm start` on `127.0.0.1:43123`; docs in `docs/preview.md` |
| 2026-09-17 | Remote preview | Switched from Vercel file-deploy to **Cloudflare Workers** (`cloudflare_module`, `wrangler.jsonc`, `pnpm deploy:cloudflare`) |
| 2026-09-17 | Public URL | `https://iran-military-tech-museum.rocky-waitress-2a0.workers.dev` (Wrangler deploy; use owner CF account for durable hosting) |
