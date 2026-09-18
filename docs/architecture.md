# Architecture

## Overview

Iran Military Tech Museum is a **Nuxt 4** (Vue 3 + TypeScript) full-stack app with **Nitro** server routes and **file-backed content** that mirrors a committed **Prisma** schema for Phase 2 PostgreSQL.

```
content/data/*.json  →  server/utils/contentStore.ts  →  /api/*
                              ↓
                    app/pages + components (SSR/CSR)
```

## Frontend

- **Routing:** `app/pages` with `@nuxtjs/i18n` (`prefix_except_default`, EN default, FA RTL).
- **Design system:** Tailwind + CSS variables in `app/assets/css/museum.css`.
- **3D:** `@tresjs/nuxt` + Three.js `GLTFLoader`; one concept GLB in `public/models/`.
- **State:** `useMuseum()` composable caches `/api/content` in `useState`.

## Backend

- `GET /api/content` — full museum bundle
- `GET /api/systems` — filters: `categoryId`, `categorySlug`, `periodId`, `periodSlug`
- `GET /api/systems/:id` — system + resolved sources, category, periods, related
- `GET /api/search?q=` — name/designation/category search

## Phase 2 database

`prisma/schema.prisma` models `System`, `Source`, `Category`, `HistoricalPeriod`, `Specification`, and join tables. A future migration can import JSON seed via a one-off script without changing the public API shape.

## Non-goals (this slice)

- Admin CMS, auth, production Postgres hosting, large GLB CDN library.
