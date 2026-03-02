import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, Stars } from "@react-three/drei"

const SORTED_ARRAY = [2, 5, 9, 13, 17, 21, 26, 30, 34, 40]
const TARGET = 26

function useBinarySearchSteps() {
  return useMemo(() => {
    const steps = []
    let low = 0
    let high = SORTED_ARRAY.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      steps.push({ low, high, mid, value: SORTED_ARRAY[mid] })
      if (SORTED_ARRAY[mid] === TARGET) break
      if (SORTED_ARRAY[mid] < TARGET) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    return steps
  }, [])
}

function BinarySearchBars({ stepIndex }) {
  const steps = useBinarySearchSteps()
  const step = steps[stepIndex] ?? steps[steps.length - 1]

  return (
    <group>
      {SORTED_ARRAY.map((value, index) => {
        const isInRange = index >= step.low && index <= step.high
        const isMid = index === step.mid
        const isTarget = value === TARGET && isMid

        let color = "#1e293b"
        let emissive = "#000000"
        let emissiveIntensity = 0

        if (isInRange) {
          color = "#0f172a"
          emissive = "#22d3ee"
          emissiveIntensity = 0.4
        }
        if (isMid) {
          color = "#22d3ee"
          emissive = "#38bdf8"
          emissiveIntensity = 0.9
        }
        if (isTarget) {
          color = "#ec4899"
          emissive = "#f472b6"
          emissiveIntensity = 1.1
        }

        const x = (index - (SORTED_ARRAY.length - 1) / 2) * 0.7
        const height = 0.4 + (index + 1) * 0.08

        return (
          <mesh key={index} position={[x, height / 2, 0]}>
            <boxGeometry args={[0.5, height, 0.5]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
              roughness={0.25}
              metalness={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Pointer({ stepIndex }) {
  const steps = useBinarySearchSteps()
  const step = steps[stepIndex] ?? steps[steps.length - 1]
  const x = (step.mid - (SORTED_ARRAY.length - 1) / 2) * 0.7

  return (
    <group position={[x, 1.8, 0.3]}>
      <mesh>
        <coneGeometry args={[0.18, 0.4, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#22d3ee"
          emissiveIntensity={1}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}

function BinaryBits() {
  const instRef = useRef()
  const positions = useMemo(() => {
    const pts = []
    const radius = 2.8
    const count = 16
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 1.4 - Math.PI * 0.7
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * 0.6
      const y = 1.6 + Math.sin(angle) * 0.1
      pts.push({ x, y, z, phase: Math.random() * Math.PI * 2 })
    }
    return pts
  }, [])

  useFrame((state) => {
    if (!instRef.current) return
    const t = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    positions.forEach((p, i) => {
      const scalePulse = 0.55 + 0.25 * Math.sin(t * 2.0 + p.phase)
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(0.06 * scalePulse)
      dummy.updateMatrix()
      instRef.current.setMatrixAt(i, dummy.matrix)
    })

    instRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instRef} args={[null, null, positions.length]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  )
}

function BinarySearchScene() {
  const [stepIndex, setStepIndex] = useState(0)
  const steps = useBinarySearchSteps()
  const groupRef = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1
        return next >= steps.length ? 0 : next
      })
    }, 1600)
    return () => clearInterval(interval)
  }, [steps.length])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15
  })

  return (
    <>
      <color attach="background" args={["transparent"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.7} color="#38bdf8" />
      <pointLight position={[3, -2, -4]} intensity={0.5} color="#a855f7" />

      <Stars
        radius={13}
        depth={24}
        count={640}
        factor={2.4}
        saturation={0}
        fade
        speed={0.25}
      />

      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.35}>
        <group ref={groupRef} position={[0, -0.4, 0]}>
          <BinarySearchBars stepIndex={stepIndex} />
          <Pointer stepIndex={stepIndex} />

          <BinaryBits />

          <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.2, 3.35, 64]} />
            <meshBasicMaterial
              color="#0f172a"
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.15}
      />
    </>
  )
}

export default function HeroAI3D() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mqMobile = window.matchMedia("(max-width: 640px)")
    const mqTablet = window.matchMedia("(max-width: 1024px)")

    const update = () => {
      setIsMobile(mqMobile.matches)
      setIsTablet(mqTablet.matches && !mqMobile.matches)
    }

    update()
    mqMobile.addEventListener("change", update)
    mqTablet.addEventListener("change", update)

    return () => {
      mqMobile.removeEventListener("change", update)
      mqTablet.removeEventListener("change", update)
    }
  }, [])

  if (isMobile) {
    return (
      <div className="relative w-full h-56 sm:h-60 overflow-visible">
        <div className="pointer-events-none absolute inset-[-22%] bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.28),transparent_65%),radial-gradient(circle_at_12%_8%,rgba(147,51,234,0.26),transparent_60%),radial-gradient(circle_at_88%_82%,rgba(37,99,235,0.28),transparent_60%)] blur-[105px] opacity-95" />
        <div className="relative z-10 flex h-full flex-col justify-between px-4 py-4">
          <div>
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[color:var(--color-text-muted)]">
              Binary search visual
            </p>
            <p className="mt-1 text-xs text-[color:var(--color-text-secondary)] max-w-xs">
              Simplified 3D view of how binary search narrows the search space over a sorted array.
            </p>
          </div>
          <p className="text-[0.6rem] text-[color:var(--color-text-muted)]">
            Lightweight · Mobile-optimized
          </p>
        </div>
      </div>
    )
  }

  const quality = isTablet ? "tablet" : "desktop"
  const dpr = quality === "desktop" ? [1, 2] : [1, 1.5]

  return (
    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] flex items-center justify-center">
      <div className="pointer-events-none absolute inset-[-24%] bg-[radial-gradient(circle_at_50%_28%,rgba(56,189,248,0.34),transparent_65%),radial-gradient(circle_at_12%_10%,rgba(147,51,234,0.32),transparent_60%),radial-gradient(circle_at_88%_82%,rgba(37,99,235,0.32),transparent_60%)] blur-[120px] opacity-90" />
      <Suspense
        fallback={
          <div className="relative z-10 flex h-full w-full items-center justify-center text-[10px] sm:text-xs text-[color:var(--color-text-muted)]">
            Initializing binary search…
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.15, 4.1], fov: 42, near: 0.1, far: 30 }}
          dpr={dpr}
          gl={{ antialias: true, alpha: true }}
          className="relative z-10 w-full h-full"
        >
          <BinarySearchScene />
        </Canvas>
      </Suspense>
    </div>
  )
}

