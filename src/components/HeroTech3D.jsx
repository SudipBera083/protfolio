import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

function NeuralSphereCluster() {
  const group = useRef()

  useEffect(() => {
    if (!group.current) return
    const nodeCount = 12
    const radius = 2.4
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      nodes.push(new THREE.Vector3(x, y, z))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(
      nodes.flatMap((from, i) =>
        nodes
          .slice(i + 1)
          .filter(() => Math.random() > 0.6)
          .map((to) => [from, to])
      ).flat()
    )

    const lineSegments = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: "#00fff2",
        transparent: true,
        opacity: 0.35,
      })
    )

    group.current.add(lineSegments)

    return () => {
      group.current?.remove(lineSegments)
      geometry.dispose()
      lineSegments.material.dispose()
    }
  }, [])

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.4}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color="#4f46e5"
            wireframe
            emissive="#4f46e5"
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.2} floatIntensity={1.2}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} scale={0.08} position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
          ]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00fff2" : "#b14cff"}
              emissive={i % 2 === 0 ? "#00fff2" : "#b14cff"}
              emissiveIntensity={1.1}
            />
          </mesh>
        ))}
      </Float>
    </group>
  )
}

function TechScene({ pointer }) {
  const rig = useRef()

  useFrame(() => {
    if (!rig.current) return
    const targetX = pointer.current.x * 0.25
    const targetY = pointer.current.y * 0.15
    rig.current.rotation.y += (targetX - rig.current.rotation.y) * 0.06
    rig.current.rotation.x += (targetY - rig.current.rotation.x) * 0.06
  })

  return (
    <>
      <color attach="background" args={["transparent"]} />
      <fog attach="fog" args={["#05020f", 10, 26]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 4, 4]}
        intensity={1.5}
        color="#ffffff"
      />
      <pointLight position={[-4, -2, -6]} intensity={0.8} color="#4d7cff" />

      <Stars
        radius={22}
        depth={40}
        count={1500}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />

      <group ref={rig}>
        <NeuralSphereCluster />

        <Float speed={1.6} rotationIntensity={1.4} floatIntensity={0.8}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.4, 0.06, 24, 120]} />
            <meshStandardMaterial
              color="#00fff2"
              emissive="#00fff2"
              emissiveIntensity={1.1}
              metalness={0.4}
              roughness={0.25}
            />
          </mesh>
        </Float>
      </group>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
      />
    </>
  )
}

export default function HeroTech3D() {
  const [isMobile, setIsMobile] = useState(false)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(max-width: 768px)")
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  if (isMobile) {
    return (
      <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,255,242,0.18),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(177,76,255,0.2),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(255,45,138,0.15),transparent_55%)] opacity-80 blur-[2px]" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.09),transparent_60%)] mix-blend-screen" />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 py-5 space-y-1">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[color:var(--color-text-muted)]">
            Neural visual system
          </p>
          <p className="text-xs text-[color:var(--color-text-secondary)] max-w-xs">
            Lightweight holographic field on mobile. Full 3D experience unlocks on larger screens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] md:h-[420px] lg:h-[460px] xl:h-[520px]">
      <div className="absolute inset-0 rounded-[1.7rem] bg-[radial-gradient(circle_at_10%_0%,rgba(0,255,242,0.22),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(177,76,255,0.24),transparent_55%)] opacity-75 blur-2xl pointer-events-none" />
      <Suspense
        fallback={
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[1.7rem] bg-[rgba(3,0,20,0.88)] border border-[rgba(255,255,255,0.04)] text-[10px] sm:text-xs text-[color:var(--color-text-muted)]">
            Initializing real-time 3D surface…
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0.2, 7], fov: 42, near: 0.1, far: 50 }}
          dpr={[1, 1.9]}
          gl={{ antialias: true, alpha: true }}
          className="relative z-10 rounded-[1.7rem] overflow-hidden"
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
            pointer.current.x = x
            pointer.current.y = y
          }}
        >
          <TechScene pointer={pointer} />
        </Canvas>
      </Suspense>
    </div>
  )
}