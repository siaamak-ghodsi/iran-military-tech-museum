/**
 * Generates a minimal aircraft-like placeholder GLTF for museum demo.
 * MIT — not an authentic scan; labeled CONCEPT in seed data.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as THREE from 'three'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../public/models')
mkdirSync(outDir, { recursive: true })

if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      Promise.resolve(blob.arrayBuffer()).then((buf) => {
        this.onload?.({ target: { result: buf } })
      })
    }
  }
}

const group = new THREE.Group()
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4a5568, metalness: 0.4, roughness: 0.6 })
const wingMat = new THREE.MeshStandardMaterial({ color: 0x3d5a80, metalness: 0.3, roughness: 0.7 })

const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 3.2, 4, 12), bodyMat)
fuselage.rotation.z = Math.PI / 2
group.add(fuselage)

const wing = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.08, 0.9), wingMat)
group.add(wing)

const exporter = new GLTFExporter()

exporter.parse(
  group,
  (gltf) => {
    writeFileSync(join(outDir, 'placeholder-aircraft.gltf'), JSON.stringify(gltf))
    console.log('Wrote public/models/placeholder-aircraft.gltf')
  },
  (err) => {
    console.error(err)
    process.exit(1)
  },
  { binary: false },
)
