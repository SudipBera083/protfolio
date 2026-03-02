import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ═══════════════ NEBULA PARTICLES ═══════════════ */
function NebulaField() {
    const ref = useRef()
    const count = 4000

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)
        const palette = [
            new THREE.Color('#00fff2'),
            new THREE.Color('#b14cff'),
            new THREE.Color('#ff2d8a'),
            new THREE.Color('#4d7cff'),
        ]

        for (let i = 0; i < count; i++) {
            // Distribute in a volumetric sphere with density falloff
            const r = 2 + Math.pow(Math.random(), 0.5) * 5
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6 // Flatten slightly
            pos[i * 3 + 2] = r * Math.cos(phi)

            const color = palette[Math.floor(Math.random() * palette.length)]
            col[i * 3] = color.r
            col[i * 3 + 1] = color.g
            col[i * 3 + 2] = color.b
        }
        return [pos, col]
    }, [])

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime
            ref.current.rotation.y = t * 0.015
            ref.current.rotation.x = Math.sin(t * 0.05) * 0.08
        }
    })

    return (
        <group rotation={[0.3, 0, 0.2]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.006}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>
        </group>
    )
}

/* ═══════════════ FLOATING GEOMETRY ═══════════════ */
function FloatingIcosahedron({ position, scale, color, speed = 1 }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed
            ref.current.position.y = position[1] + Math.sin(t * 0.4) * 0.5
            ref.current.position.x = position[0] + Math.cos(t * 0.3) * 0.3
            ref.current.rotation.x = t * 0.15
            ref.current.rotation.z = t * 0.1
        }
    })

    return (
        <mesh ref={ref} position={position} scale={scale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.25}
                transparent
                opacity={0.12}
                wireframe
                roughness={0.3}
            />
        </mesh>
    )
}

function FloatingTorus({ position, scale, color, speed = 1 }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed
            ref.current.position.y = position[1] + Math.sin(t * 0.35) * 0.4
            ref.current.rotation.x = t * 0.2
            ref.current.rotation.y = t * 0.15
        }
    })

    return (
        <mesh ref={ref} position={position} scale={scale}>
            <torusGeometry args={[1, 0.3, 16, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.08}
                wireframe
                roughness={0.4}
            />
        </mesh>
    )
}

function FloatingOctahedron({ position, scale, color, speed = 1 }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed
            ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.35
            ref.current.position.x = position[0] + Math.sin(t * 0.2) * 0.2
            ref.current.rotation.y = t * 0.25
            ref.current.rotation.z = t * 0.1
        }
    })

    return (
        <mesh ref={ref} position={position} scale={scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.1}
                wireframe
                roughness={0.3}
            />
        </mesh>
    )
}

/* ═══════════════ LIGHT ORBS ═══════════════ */
function LightOrb({ position, color, intensity = 2 }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime
            ref.current.position.y = position[1] + Math.sin(t * 0.3) * 0.5
            ref.current.position.x = position[0] + Math.cos(t * 0.2) * 0.3
        }
    })

    return <pointLight ref={ref} position={position} color={color} intensity={intensity} distance={8} decay={2} />
}

/* ═══════════════ AUTO-MOVING CAMERA ═══════════════ */
function CameraRig() {
    useFrame((state) => {
        const t = state.clock.elapsedTime
        state.camera.position.x = Math.sin(t * 0.05) * 0.5
        state.camera.position.y = Math.cos(t * 0.04) * 0.3
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

/* ═══════════════ MAIN EXPORT ═══════════════ */
export default function ThreeBackground() {
    return (
        <div id="three-canvas">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 55 }}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.08} />
                <CameraRig />

                {/* Nebula Particles */}
                <NebulaField />

                {/* Floating Geometric Objects */}
                <FloatingIcosahedron position={[-3.5, 1.5, -4]} scale={0.5} color="#00fff2" speed={0.8} />
                <FloatingTorus position={[4, -1, -5]} scale={0.4} color="#b14cff" speed={0.6} />
                <FloatingOctahedron position={[-2, -2, -3]} scale={0.35} color="#ff2d8a" speed={0.9} />
                <FloatingIcosahedron position={[3, 2.5, -6]} scale={0.6} color="#4d7cff" speed={0.5} />
                <FloatingOctahedron position={[0, 3, -5]} scale={0.3} color="#00fff2" speed={0.7} />

                {/* Light Orbs for volumetric feel */}
                <LightOrb position={[-3, 2, -2]} color="#00fff2" intensity={1.5} />
                <LightOrb position={[3, -1, -3]} color="#b14cff" intensity={1.2} />
                <LightOrb position={[0, 0, -4]} color="#ff2d8a" intensity={0.8} />
            </Canvas>
        </div>
    )
}
