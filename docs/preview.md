# Preview guide

This museum is a Nuxt 4 app with a Nitro **Cloudflare Workers** build by default. No database or API keys are required for the current file-backed seed.

## Local development

```bash
pnpm install
pnpm dev
```

- English: [http://127.0.0.1:43123](http://127.0.0.1:43123)
- Persian (RTL): [http://127.0.0.1:43123/fa](http://127.0.0.1:43123/fa)

Optional: `node scripts/generate-placeholder-glb.mjs` if you need to regenerate the concept GLB (F-14 viewer).

## Cloudflare production build

```bash
pnpm install
pnpm build          # NITRO_PRESET=cloudflare_module → .output/
```

Preview the Cloudflare bundle locally:

```bash
npx wrangler dev
```

Open the URL Wrangler prints (default [http://127.0.0.1:8787](http://127.0.0.1:8787)).

Alternative Nitro targets:

| Script | Preset | Use |
|--------|--------|-----|
| `pnpm build` | `cloudflare_module` | Deploy to Cloudflare Workers |
| `pnpm build:pages` | `cloudflare-pages` | `wrangler pages deploy dist` |
| `pnpm build:node` | `node-server` | `node .output/server/index.mjs` |

## Deploy to Cloudflare (Wrangler)

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) auth (`wrangler login` or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`).

```bash
pnpm deploy:cloudflare
```

Config: `wrangler.jsonc` (worker name `iran-military-tech-museum`, static assets from `.output/public`).

## Cursor Cloud Agent (owner)

While a Cloud Agent run is active, use the **Preview** card in the agent UI (`pnpm dev` on port `43123`).

## Public URL

When deployed, the live site is served from your Cloudflare Workers / Pages project (e.g. `*.workers.dev` or `*.pages.dev`). See the root `README.md` for the current deployment URL if recorded.
