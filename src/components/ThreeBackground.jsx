import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function StarField() {
    const ref = useRef()
    const count = 3000

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const r = 1.5 + Math.random() * 4
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)
        }
        return pos
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta * 0.02
            ref.current.rotation.y -= delta * 0.03
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00f0ff"
                    size={0.004}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

function FloatingOrb({ position, color, scale = 1 }) {
    const ref = useRef()

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
            ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.2
        }
    })

    return (
        <mesh ref={ref} position={position} scale={scale}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                transparent
                opacity={0.3}
                roughness={0.2}
            />
        </mesh>
    )
}

export default function ThreeBackground() {
    return (
        <div id="three-canvas">
            <Canvas
                camera={{ position: [0, 0, 3], fov: 60 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.1} />
                <StarField />
                <FloatingOrb position={[-2, 1, -2]} color="#00f0ff" scale={1.2} />
                <FloatingOrb position={[2.5, -1, -3]} color="#a855f7" scale={0.8} />
                <FloatingOrb position={[0, 2, -4]} color="#ec4899" scale={1} />
            </Canvas>
        </div>
    )
}
