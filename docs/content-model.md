# Content model

TypeScript definitions: `shared/types/content.ts`  
Authoritative seed: `content/data/systems.researched.json`, `content/data/sources.researched.json` (mapped at runtime via `server/utils/seedMapper.ts`)  
Persian museum prose overlay: `content/data/systems.fa-museum.json` (descriptions, context, significance, disputed-claim FA; no spec invention)  
Taxonomy: `content/data/categories.json`, `content/data/periods.json`  
Prisma mirror: `prisma/schema.prisma`

## System

| Field | Notes |
|-------|--------|
| `names`, `description`, … | Bilingual `{ en, fa }` |
| `originType` | Enum — see types file |
| `specifications[]` | Each with `confidence`, `sourceIds` |
| `variants[]` | Sub-designations with sources |
| `related[]` | Typed edges (`variant_of`, `derived_from`, …) |
| `model3d` | `status`, optional `url`, `provenance`, `license` |
| `referenceIds` | Foreign keys to `Source.id` |
| `disputedClaims[]` | Shown prominently on detail pages |

## Source

Bibliographic entity: title, URL, author/org, optional `publishedAt`, `accessedAt`, bilingual `relevantClaim`, `confidence`, `conflictsWith[]`.

## Category / HistoricalPeriod

First-class taxonomy for navigation, timeline filters, and search haystack.

## Relation

Optional explicit graph edges in `relations.json` (in addition to per-system `related[]`).

## Runtime loading

`server/utils/contentStore.ts` imports JSON modules (Nuxt/Nitro bundling). Swap to Prisma queries in Phase 2 while keeping API handlers stable.
