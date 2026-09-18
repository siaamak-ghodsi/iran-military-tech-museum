# Research methodology

## Principles

1. **No invented facts** — specs, dates, counts, and capabilities appear only when tied to a `Source` entity.
2. **Confidence labels** — every record and spec carries `confirmed | strongly_documented | probable | disputed | unknown`.
3. **Disagreement preserved** — conflicting sources use `conflictsWith` and `disputedClaims` instead of silent merges.
4. **Origin typing** — `originType` distinguishes import, license, modification, indigenous development, reverse engineering, etc.
5. **Educational scope** — text describes history and technology; no construction, targeting, or operational employment guides.

## Source tiers (preferred order)

1. Primary institutions (national archives, official museum fact sheets).
2. Established reference works (IISS *Military Balance*, Janes family, academic press).
3. Aggregators (GlobalSecurity, CSIS Missile Threat / program pages) — marked `probable` when not primary.
4. Wikipedia — **pointer only**, not sole justification for quantitative claims.

## Access dating

Each source stores `accessedAt` (ISO date string in seed) for reproducibility.

## Updating content

Edit `content/data/systems.researched.json` and `content/data/sources.researched.json` (see `content/data/README-research.md` from the research pass). Run `pnpm build`. The mapper in `server/utils/seedMapper.ts` projects seed fields into exhibit types — do not bypass it with invented specs in Vue pages.

## Research corrections (vertical slice)

- **AH-1J:** Army Aviation (IRIAA / Havanirooz), not IRIAF.
- **Mobarez:** upgrade label only; engine/power **Unknown** in seed.
- **Bavar-373:** engagement range / track counts **Disputed** in UI.
- **Sina-class FAC:** naval card; **Peykaap** cited on record but not merged (disputed NK vs indigenous).
- **Safavid firearms:** pre-modern exhibit; hidden from default timeline until **Pre-modern** period filter.
