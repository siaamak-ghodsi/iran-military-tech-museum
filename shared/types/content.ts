export type ConfidenceLevel =
  | 'confirmed'
  | 'strongly_documented'
  | 'probable'
  | 'disputed'
  | 'unknown'

export type OriginType =
  | 'designed_in_iran'
  | 'developed_in_iran'
  | 'manufactured_in_iran'
  | 'assembled_in_iran'
  | 'licensed'
  | 'imported'
  | 'modified'
  | 'reverse_engineered'
  | 'joint'
  | 'captured'
  | 'disputed_attribution'

export type Model3dProvenance =
  | 'archival'
  | 'reconstructed'
  | 'approximate'
  | 'concept'
  | 'none'

export type Model3dStatus = 'available' | 'placeholder' | 'none'

export type RelationType =
  | 'influenced'
  | 'variant_of'
  | 'derived_from'
  | 'replaced_by'
  | 'licensed_from'
  | 'successor_of'
  | 'related_program'
  | 'operated_alongside'

export interface LocalizedText {
  en: string
  fa: string
}

export interface Specification {
  id: string
  label: { en: string; fa: string }
  value: { en: string; fa: string }
  confidence: ConfidenceLevel
  sourceIds: string[]
  notes?: { en?: string; fa?: string }
}

export interface SystemVariant {
  id: string
  designation: string
  names?: LocalizedText
  description: LocalizedText
  confidence: ConfidenceLevel
  sourceIds: string[]
}

export interface SystemImage {
  id: string
  alt: LocalizedText
  /** External URL or null for typographic placeholder */
  url: string | null
  attribution: LocalizedText
  license: string
}

export interface Model3d {
  status: Model3dStatus
  url?: string
  provenance: Model3dProvenance
  license: string
  label: LocalizedText
}

export interface DisputedClaim {
  id: string
  claim: LocalizedText
  confidence: ConfidenceLevel
  sourceIds: string[]
}

export interface SystemRelationRef {
  systemId: string
  relationType: RelationType
  notes?: LocalizedText
}

export interface System {
  id: string
  names: LocalizedText
  alternativeNames: string[]
  designation: string
  categoryId: string
  originCountry: string
  originType: OriginType
  developer: LocalizedText
  manufacturer: LocalizedText
  developmentPeriod?: string
  introductionPeriod?: string
  productionStatus: LocalizedText
  serviceStatus: LocalizedText
  historicalPeriodIds: string[]
  description: LocalizedText
  historicalContext: LocalizedText
  technologicalSignificance: LocalizedText
  specifications: Specification[]
  variants: SystemVariant[]
  predecessorIds: string[]
  successorIds: string[]
  related: SystemRelationRef[]
  operators: LocalizedText[]
  images: SystemImage[]
  model3d: Model3d
  referenceIds: string[]
  confidence: ConfidenceLevel
  disputedClaims: DisputedClaim[]
  notes?: LocalizedText
}

export interface Source {
  id: string
  title: string
  url: string
  authorOrOrg: string
  publishedAt?: string
  accessedAt: string
  relevantClaim: LocalizedText
  confidence: ConfidenceLevel
  notes?: LocalizedText
  conflictsWith: string[]
}

export interface Category {
  id: string
  slug: string
  names: LocalizedText
  description: LocalizedText
  sortOrder: number
}

export interface HistoricalPeriod {
  id: string
  slug: string
  names: LocalizedText
  yearStart: number
  yearEnd: number | null
  description: LocalizedText
}

export interface Relation {
  id: string
  fromSystemId: string
  toSystemId: string
  relationType: RelationType
  description: LocalizedText
  sourceIds: string[]
  confidence: ConfidenceLevel
}

export interface MuseumContent {
  systems: System[]
  sources: Source[]
  categories: Category[]
  periods: HistoricalPeriod[]
  relations: Relation[]
}
