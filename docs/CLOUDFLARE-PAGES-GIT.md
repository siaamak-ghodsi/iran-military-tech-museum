# Cloudflare Pages — Connect to Git

Repository branch for deploy: **`museum-main`** (Nuxt museum app; repo default `main` is unrelated legacy template).

## Workers (Wrangler CLI)

```bash
pnpm install
pnpm build
wrangler deploy --config wrangler.jsonc
```

Worker name: **`iran-military-tech-museum`**

## Pages (Git integration)

In Cloudflare Dashboard → Workers & Pages → Create → Connect to Git → select **`siaamak-ghodsi/iran-aerospace-museum`** → branch **`museum-main`**.

| Setting | Value |
|---------|--------|
| Framework preset | Nuxt.js |
| Build command | `pnpm install && pnpm build:pages` |
| Build output directory | `dist` |
| Root directory | `/` |

For **Workers** Git build (Nuxt module preset):

| Build command | `pnpm install && pnpm build` |
| Deploy | Use Cloudflare’s Nuxt / Workers CI or manual `wrangler deploy` |

No GitHub Actions or repository secrets required for Phase 1 (JSON seed only). Cloudflare runs `pnpm install` and `pnpm build` in the dashboard build step.

## Source tarball (wget on parent box)

```bash
wget -O museum-main.tar.gz https://github.com/siaamak-ghodsi/iran-aerospace-museum/archive/refs/heads/museum-main.tar.gz
tar xzf museum-main.tar.gz
cd iran-aerospace-museum-museum-main
pnpm install && pnpm build
npx wrangler deploy --config wrangler.jsonc
```

Prebuilt `.output/` bundle (deploy only): download **`museum-cloudflare-prebuilt.tgz`** from this Cloud Agent run’s **Artifacts** panel ([agent run](https://cursor.com/agents/bc-a8997dd8-a0a8-56c3-9448-9067eff17a6f)).
