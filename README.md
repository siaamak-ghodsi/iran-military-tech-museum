# Iranian Military Technology — Digital Museum

An interactive **archival / historical / educational** digital museum of Iranian military technology (not an operational weapons guide).

## Stack

- Nuxt 4 + Vue 3 + TypeScript
- Tailwind CSS + museum design tokens
- `@nuxtjs/i18n` — English (LTR) + Persian (RTL)
- Three.js via `@tresjs/nuxt`
- Content: JSON in `content/data/` (Prisma schema in `prisma/` for Phase 2 Postgres)

## Run locally

```bash
pnpm install
node scripts/generate-placeholder-glb.mjs   # optional if GLB missing
pnpm dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123) (English) or [http://127.0.0.1:43123/fa](http://127.0.0.1:43123/fa) (Persian).

## Build & deploy (Cloudflare)

Default production target is **Cloudflare Workers** (`nitro` preset `cloudflare_module`).

```bash
pnpm install
pnpm build                 # writes .output/ for Wrangler
pnpm deploy:cloudflare     # needs wrangler login or CLOUDFLARE_API_TOKEN
```

Local Cloudflare preview after build: `npx wrangler dev`. Node-only build: `pnpm build:node` then `node .output/server/index.mjs`.

### Cloudflare Workers (browser / Wrangler)

Worker name in `wrangler.jsonc`: **`iran-military-tech-museum`**.

```bash
pnpm install && pnpm build
npx wrangler deploy --config wrangler.jsonc
```

After deploy, the app is served on your account’s **`*.workers.dev`** subdomain (e.g. `iran-military-tech-museum.<your-subdomain>.workers.dev`).

**Cloudflare Pages (Git):** connect repo branch **`museum-main`**, build `pnpm install && pnpm build`, or use **`pnpm build:pages`** with output directory **`dist`**. See **`docs/CLOUDFLARE-PAGES-GIT.md`**.

Full instructions: **`docs/preview.md`**.

## Owner preview (Cursor)

Use the **Preview** card while a Cloud Agent run is active (`pnpm dev` on port `43123`).

## Primary journey

Home → Timeline → 1970s → Aircraft → **F-14A** → system page → **3D Collection** → sources → related systems.

## Documentation

See `docs/` — architecture, research methodology, content model, 3D pipeline, licensing, roadmap, decisions, **preview**.

## Environment (Phase 2+)

```bash
# .env
DATABASE_URL=postgresql://...
```

Then `pnpm db:generate` and future `prisma migrate deploy`.
