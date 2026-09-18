# 3D pipeline

## Current slice

| Asset | Provenance | Notes |
|-------|------------|--------|
| `public/models/placeholder-aircraft.gltf` | **concept** | Minimal mesh + optional script-generated geometry |

Generate or regenerate:

```bash
node scripts/generate-placeholder-glb.mjs
```

Requires `three` (project dependency). Output is **not** claimed as an authenticated museum scan.

## Viewer

- Component: `app/components/ModelViewer.vue` + `SceneGltf.vue`
- Controls: `@tresjs/cientos` `OrbitControls` (orbit, zoom, pan)
- UI: reset view, fullscreen, provenance label, reduced-motion respected globally via CSS
- Lazy: `ClientOnly` + `Suspense` around GLTF load
- Fallback: typographic `PlaceholderImage` when `model3d.status === 'none'`

## Future phases

1. Ingest CC0 / institution Open Access meshes with rights metadata table.
2. Draco compression + CDN with `loading="lazy"` intersection observer.
3. Optional KTX2 textures; keep provenance badge mandatory in UI.
