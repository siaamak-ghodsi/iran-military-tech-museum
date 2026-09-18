import type {
  Category,
  ConfidenceLevel,
  HistoricalPeriod,
  MuseumContent,
  OriginType,
  Relation,
  RelationType,
  Source,
  System,
  SystemRelationRef,
} from '../../shared/types/content'
import seedSystems from '../../content/data/systems.researched.json'
import seedSources from '../../content/data/sources.researched.json'
import faMuseum from '../../content/data/systems.fa-museum.json'
import categoriesMeta from '../../content/data/categories.json'
import periodsMeta from '../../content/data/periods.json'

type FaMuseumEntry = {
  names?: { fa?: string }
  description?: { fa?: string }
  historicalContext?: { fa?: string }
  technologicalSignificance?: { fa?: string }
  notes?: { fa?: string }
  disputedClaims?: string[]
}

const FA_OVERLAY = faMuseum as Record<string, FaMuseumEntry>

const SPEC_LABEL_FA: Record<string, string> = {
  aircraft_ordered: 'تعداد سفارش',
  aircraft_delivered: 'تعداد تحویل‌شده',
  crew: 'خدمه',
  primary_radar: 'رادار اصلی',
  f4e_delivered_pre1979: 'اف-۴ای تحویل‌شده پیش از ۱۳۵۸',
  f4d_delivered: 'اف-۴دی تحویل‌شده',
  rf4e_delivered: 'RF-4E تحویل‌شده',
  crew_f5e: 'خدمه (اف-۵ای)',
  crew_f5f: 'خدمه (اف-۵اف)',
  engines: 'موتورها',
  aircraft_purchased: 'تعداد خرید',
  tow_capable_subset: 'زیرمجموعه TOW-capable',
  batteries_ordered_1972: 'باتری سفارش ۱۹۷۲',
  fms_case_value_approx: 'ارزش تقریبی پرونده FMS',
  mersad_service_entry: 'ورود به خدمت مرصاد',
  mk3p_mk5p_received: 'Mk3P/Mk5P دریافت‌شده',
  fv4030_1_received: 'FV4030/1 دریافت‌شده',
  main_gun: 'سلاح اصلی',
  mobarez_engine_power: 'توان موتور مبارز',
  main_armament_baseline: 'سلاح اصلی (خط پایه)',
  iranian_inventory: 'موجودی ایران',
  combat_weight_reported: 'وزن combat گزارش‌شده',
  engine_reported: 'موتور گزارش‌شده',
  dorud_production_start: 'شروع تولید دورود',
  role: 'نقش',
  range: 'برد',
  length: 'طول',
  wingspan: 'دهانه بال',
  endurance: 'مداومت پرواز',
  ababil2_length: 'طول ابابیل-۲',
  ababil2_wingspan: 'دهانه ابابیل-۲',
  ababil2_mtow: 'حداکثر وزن برخاست ابابیل-۲',
  ababil1_specs: 'مشخصات ابابیل-۱',
  propulsion: 'پیشرانه',
  mobility: 'تحرک',
  range_early_reported: 'برد گزارش‌شده اولیه',
  range_later_generations_claimed: 'برد ادعایی نسل‌های بعد',
  public_unveil: 'رونمایی عمومی',
  service_induction: 'ورود به خدمت',
  claimed_engagement_range: 'برد engagement ادعایی',
  claimed_targets_tracked: 'اهداف ردیابی‌شده ادعایی',
  battery_launchers_typical: 'پرتابگرهای معمول باتری',
  kaman_boats_delivered: 'قایق کaman تحویل‌شده',
  displacement_approx: 'جابجایی تقریبی',
  speed_western_estimate: 'سرعت (برآورد غربی)',
  guidance_baseline: 'هدایت (خط پایه)',
  toophan3_length_claimed: 'طول طوفان-۳ (ادعایی)',
  toophan3_range_day_claimed: 'برد روز طوفان-۳ (ادعایی)',
}

type SeedSystem = (typeof seedSystems.systems)[number]
type SeedSource = (typeof seedSources.sources)[number]

const CATEGORY_MAP: Record<string, string> = {
  aircraft: 'cat-aircraft',
  helicopter: 'cat-rotary',
  'air-defense': 'cat-air-defense',
  armored: 'cat-armor',
  uav: 'cat-uav',
  missile: 'cat-missiles',
  naval: 'cat-naval',
  infantry: 'cat-atgm',
  historical: 'cat-historical',
}

const PERIOD_TOKEN_MAP: Record<string, string[]> = {
  pahlavi: ['period-pre-1979', 'period-1970s'],
  'iran-iraq-war': ['period-1980s'],
  'post-war': ['period-1990s', 'period-2000s', 'period-2010s'],
  'pre-modern': ['period-pre-modern'],
  safavid: ['period-pre-modern'],
  qajar: ['period-pre-modern'],
}

export function normalizeConfidence(raw: string | null | undefined): ConfidenceLevel {
  const s = (raw ?? 'unknown').toLowerCase().replace(/\s+/g, '_')
  const map: Record<string, ConfidenceLevel> = {
    confirmed: 'confirmed',
    strongly_documented: 'strongly_documented',
    probable: 'probable',
    disputed: 'disputed',
    unknown: 'unknown',
  }
  return map[s] ?? 'unknown'
}

export function normalizeOriginType(raw: string): OriginType {
  const map: Record<string, OriginType> = {
    imported: 'imported',
    licensed: 'licensed',
    licensed_production: 'licensed',
    designed_in_iran: 'designed_in_iran',
    developed_in_iran: 'developed_in_iran',
    manufactured_in_iran: 'manufactured_in_iran',
    assembled_in_iran: 'assembled_in_iran',
    modified: 'modified',
    modified_from_foreign: 'modified',
    reverse_engineered: 'reverse_engineered',
    jointly_developed: 'joint',
    joint: 'joint',
    captured: 'captured',
    disputed: 'disputed_attribution',
    disputed_attribution: 'disputed_attribution',
  }
  return map[raw] ?? 'disputed_attribution'
}

function mapRelationType(raw: string): RelationType {
  const map: Record<string, RelationType> = {
    related: 'related_program',
    variant_of: 'variant_of',
    derived_from: 'derived_from',
    influenced: 'influenced',
    replaced_by: 'replaced_by',
    licensed_from: 'licensed_from',
    successor_of: 'successor_of',
    operated_alongside: 'operated_alongside',
  }
  return map[raw] ?? 'related_program'
}

function loc(en: string | null | undefined, fa: string | null | undefined) {
  const enText = en ?? ''
  return { en: enText, fa: fa ?? enText }
}

/** Exhibit prose: Persian must not silently fall back to English when fa is absent. */
function locExhibit(en: string | null | undefined, fa: string | null | undefined) {
  return { en: en ?? '', fa: fa ?? '' }
}

function specLabel(key: string): { en: string; fa: string } {
  const en = key.replace(/_/g, ' ')
  return { en, fa: SPEC_LABEL_FA[key] ?? en }
}

function formatSpecValue(value: unknown, unit: string | null): { en: string; fa: string } {
  if (value === null || value === undefined || value === '') {
    return { en: 'Unknown', fa: 'نامشخص' }
  }
  const base = String(value)
  const text = unit ? `${base} ${unit}` : base
  return { en: text, fa: text }
}

function mapSources(raw: SeedSource[]): Source[] {
  return raw.map((s) => ({
    id: s.id,
    title: s.title,
    url: s.url,
    authorOrOrg: s.authorOrOrg,
    publishedAt: s.publishedAt ?? undefined,
    accessedAt: s.accessedAt,
    relevantClaim: loc(s.relevantClaim, s.relevantClaim),
    confidence: normalizeConfidence(s.confidence),
    notes: s.notes ? loc(s.notes, s.notes) : undefined,
    conflictsWith: s.conflictsWith ?? [],
  }))
}

function mapSystem(raw: SeedSystem, sourceIds: Set<string>): System {
  const fa = FA_OVERLAY[raw.id]
  const categoryId = CATEGORY_MAP[raw.category] ?? 'cat-aircraft'
  const periodTokens = (raw.historicalPeriod ?? '').split('|').filter(Boolean)
  const historicalPeriodIds = [
    ...new Set(periodTokens.flatMap((t) => PERIOD_TOKEN_MAP[t] ?? [])),
  ]

  const referenceIds = (raw.sources ?? []).filter((id) => sourceIds.has(id))

  const related: SystemRelationRef[] = (raw.relations ?? []).map((r) => ({
    systemId: r.targetId,
    relationType: mapRelationType(r.type),
    notes: r.note ? loc(r.note, r.note) : undefined,
  }))

  const specifications = (raw.specifications ?? []).map((spec, i) => ({
    id: `${raw.id}-spec-${spec.key ?? i}`,
    label: specLabel(spec.key),
    value: formatSpecValue(spec.value, spec.unit),
    confidence: normalizeConfidence(spec.confidence),
    sourceIds: referenceIds,
    notes: spec.notes ? { en: spec.notes, fa: spec.notes } : undefined,
  }))

  const variants = (raw.variants ?? []).map((v) => ({
    id: v.id,
    designation: v.name,
    description: loc(v.notes ?? v.name, v.notes ?? v.name),
    confidence: 'probable' as ConfidenceLevel,
    sourceIds: referenceIds,
  }))

  const disputedClaims = (raw.disputedClaims ?? []).map((claim, i) => ({
    id: `${raw.id}-dispute-${i}`,
    claim: locExhibit(
      typeof claim === 'string' ? claim : String(claim),
      fa?.disputedClaims?.[i] ?? null,
    ),
    confidence: 'disputed' as ConfidenceLevel,
    sourceIds: referenceIds,
  }))

  const operators = (raw.operators ?? []).map((o) => loc(o, o))

  const model3d =
    raw.id === 'f-14a-tomcat-iriaf'
      ? {
          status: 'placeholder' as const,
          url: '/models/placeholder-aircraft.gltf',
          provenance: 'concept' as const,
          license: 'MIT — museum-generated placeholder mesh',
          label: loc(
            'Concept silhouette — not an authenticated museum scan',
            'سیلوئت مفهومی — اسکن موزه احرازنشده',
          ),
        }
      : {
          status: 'none' as const,
          provenance: 'none' as const,
          license: 'n/a',
          label: loc('No 3D model in this slice', 'بدون مدل سه‌بعدی'),
        }

  return {
    id: raw.id,
    names: locExhibit(raw.names.en, fa?.names?.fa ?? raw.names.fa),
    alternativeNames: raw.alternativeNames ?? [],
    designation: raw.designation ?? raw.id,
    categoryId,
    originCountry: raw.originCountry,
    originType: normalizeOriginType(raw.originType),
    developer: loc(raw.developer, raw.developer),
    manufacturer: loc(raw.manufacturer, raw.manufacturer),
    developmentPeriod: raw.developmentPeriod ?? undefined,
    introductionPeriod: raw.introductionPeriod ?? undefined,
    productionStatus: loc(raw.productionStatus, raw.productionStatus),
    serviceStatus: loc(raw.serviceStatus, raw.serviceStatus),
    historicalPeriodIds,
    description: locExhibit(raw.description?.en, fa?.description?.fa ?? raw.description?.fa),
    historicalContext: locExhibit(
      raw.historicalContext?.en,
      fa?.historicalContext?.fa ?? raw.historicalContext?.fa,
    ),
    technologicalSignificance: locExhibit(
      raw.technologicalSignificance?.en,
      fa?.technologicalSignificance?.fa ?? raw.technologicalSignificance?.fa,
    ),
    specifications,
    variants,
    predecessorIds: raw.predecessorIds ?? [],
    successorIds: raw.successorIds ?? [],
    related,
    operators,
    images: [
      {
        id: `${raw.id}-img`,
        alt: loc(raw.names.en, raw.names.fa),
        url: null,
        attribution: loc(
          'See linked sources for external imagery rights.',
          'حقوق تصویر در منابع پیوندشده.',
        ),
        license: 'reference-only',
      },
    ],
    model3d,
    referenceIds,
    confidence: normalizeConfidence(raw.confidence),
    disputedClaims,
    notes: raw.notes || fa?.notes?.fa
      ? locExhibit(raw.notes ?? '', fa?.notes?.fa ?? null)
      : undefined,
  }
}

function buildRelations(systems: System[]): Relation[] {
  const out: Relation[] = []
  for (const sys of systems) {
    for (const rel of sys.related) {
      out.push({
        id: `rel-${sys.id}-${rel.systemId}-${rel.relationType}`,
        fromSystemId: sys.id,
        toSystemId: rel.systemId,
        relationType: rel.relationType,
        description: rel.notes ?? loc(rel.relationType, rel.relationType),
        sourceIds: sys.referenceIds,
        confidence: sys.confidence,
      })
    }
  }
  return out
}

export function loadMuseumFromResearchSeed(): MuseumContent {
  const sources = mapSources(seedSources.sources)
  const sourceIds = new Set(sources.map((s) => s.id))
  const systems = seedSystems.systems.map((s) => mapSystem(s, sourceIds))
  return {
    categories: categoriesMeta as Category[],
    periods: periodsMeta as HistoricalPeriod[],
    sources,
    systems,
    relations: buildRelations(systems),
  }
}

/** Legacy placeholder IDs → researched IDs (for bookmarks). */
export const LEGACY_SYSTEM_ID_REDIRECTS: Record<string, string> = {
  'sys-f-14a-iriaf': 'f-14a-tomcat-iriaf',
  'sys-f-4e-iriaf': 'f-4e-phantom-iriaf',
  'sys-f-5e-iriaf': 'f-5ef-tiger-iriaf',
  'sys-ah-1j-cobra': 'ah-1j-seacobra-iriaa',
  'sys-mim-23-hawk': 'mim-23-hawk-iran',
  'sys-chieftain-mobarez': 'chieftain-fv4030-mobarez',
  'sys-bmp-1': 'bmp-1-iran',
  'sys-t-72s': 't-72s-iran',
  'sys-mohajer-1': 'mohajer-1',
  'sys-mohajer-2': 'mohajer-2',
  'sys-mohajer-6': 'mohajer-4',
  'sys-ababil-t': 'ababil-family',
  'sys-fateh-110': 'fateh-110',
  'sys-bavar-373': 'bavar-373',
  'sys-peykaap-class': 'sina-class-fac',
  'sys-hq-2-lineage': 'mim-23-hawk-iran',
  'sys-toophan': 'toophan-atgm',
}
