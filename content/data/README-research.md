# Museum seed dataset — Iranian military technology (educational)

Generated: **2026-09-17** (access date for all web sources).

## Purpose

Seed catalog for a premium educational digital museum. **Accuracy over quantity.** Unknowns are `null`. Specs without reliable sourcing are omitted or marked `Unknown` / `Disputed`.

## Files

| File | Role |
|------|------|
| `systems.json` | Exhibit objects (17 systems) |
| `sources.json` | First-class bibliographic records (35 sources) |
| `initial-objects.md` | Curator shortlist with why-included + key source |
| `parts/` | Intermediate per-object JSON used during assembly (optional to keep) |

## Methodology

1. **Source preference:** official archives/museums, academic encyclopedias (e.g. Encyclopaedia Iranica), established defense references (Jane’s via citation, CSIS Missile Threat, Wisconsin Project / Iran Watch, U.S. Army Redstone chronology, State Department FRUS), specialist aviation journalism (Key.Aero), and reputable aggregators cross-checked against multiple outlets.
2. **Deprioritized:** unsourced blogs, Telegram, social media, speculative “capabilities” sites.
3. **Tools:** WebSearch + WebFetch (and curl fallback for JS/Cloudflare-gated public pages). Claims retained only when URL + organization + access date could be recorded.
4. **Confidence vocabulary:** `Confirmed` | `Strongly documented` | `Probable` | `Disputed` | `Unknown`.
5. **Origin typing:** explicit enum values only (`imported`, `licensed_production`, `designed_in_iran`, `developed_in_iran`, `manufactured_in_iran`, `assembled_in_iran`, `modified_from_foreign`, `reverse_engineered`, `jointly_developed`, `captured`, `disputed`). Nuance goes in `description` / `notes` (e.g. Toophan: incomplete 1970s licensed pathway + post-1979 reverse engineering).
6. **No fabrication:** delivery numbers, ranges, and inventories appear only when sources support them; otherwise `null` + dispute note.
7. **Scope limits:** Fateh-110 is historical/technical only—no targeting or employment detail. Bavar-373 performance fields are marked disputed/claimed.

## Corrections vs brief

- **AH-1J:** Brief said “IRIAF service”; reliable sources place the type with **Army Aviation (IRIAA/Havanirooz)** and a small IRGC aviation contingent—not IRIAF. Dataset corrected.
- **Mobarez:** Treated as Iranian *upgrade name* for Chieftain hulls; Shir 1/2 documented as **undelivered** UK projects for Iran. Mobarez engine/power figures left `Unknown`.
- **T-72M1 vs T-72S:** Distinguished; T-72S = licensed Dorud assembly path; T-72M1 = separate earlier export model.
- **Peykaap:** Sourced for future expansion; not a separate system card in this seed to avoid conflation with Sina (different lineage).

## Known gaps / blocked fetches

- Some Iran Watch / Iranica article bodies are Cloudflare/JS gated to automated clients; **URLs verified** and claims taken from search highlights + successful fetches of companion pages.
- Jane’s Unmanned primary text is paywalled; Mohajer/Ababil dimensional specs cited via Wikipedia’s explicit Jane’s citations (Streetly ed., 2014–15)—upgrade to direct Jane’s excerpts when licensed.
- Current IRIAF airworthy fleet counts remain **Probable/Disputed** across open sources.

## Next curator steps

1. Pull full Iranica FIREARMS articles for object-level historical labels.
2. Add IISS *Military Balance* / SIPRI transfer rows for inventory fields still `null`.
3. Split Ababil-2 / Ababil-3 and Peykaap into standalone cards when needed.
4. Persian (`fa`) museum prose still mostly `null`—to be authored by bilingual curators.
