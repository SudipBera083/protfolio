import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/* =========================
   STAR LAYER (PARALLAX)
========================= */

function StarLayer({ count, depth, size, speed, color }) {

  const ref = useRef()

  const positions = useMemo(() => {

    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {

      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = -Math.random() * depth

    }

    return pos

  }, [])

  useFrame((state) => {

    const t = state.clock.elapsedTime

    ref.current.rotation.y = t * speed
    ref.current.rotation.x = Math.sin(t * speed * 0.4) * 0.1

  })

  return (

    <points ref={ref}>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.9}
        depthWrite={false}
      />

    </points>

  )

}

/* =========================
   CONSTELLATION NETWORK
========================= */

function ConstellationField() {

  const pointsRef = useRef()
  const linesRef = useRef()

  const particleCount = 80
  const maxDistance = 1.3

  const { positions, velocities } = useMemo(() => {

    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {

      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4

      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003

    }

    return { positions: pos, velocities: vel }

  }, [])

  const linePositions = useMemo(
    () => new Float32Array(particleCount * particleCount * 3),
    []
  )

  useFrame(() => {

    const pos = pointsRef.current.geometry.attributes.position.array
    const vel = velocities

    let lineIndex = 0

    for (let i = 0; i < particleCount; i++) {

      pos[i * 3] += vel[i * 3]
      pos[i * 3 + 1] += vel[i * 3 + 1]

      if (pos[i * 3] > 4 || pos[i * 3] < -4) vel[i * 3] *= -1
      if (pos[i * 3 + 1] > 3 || pos[i * 3 + 1] < -3) vel[i * 3 + 1] *= -1

      for (let j = i + 1; j < particleCount; j++) {

        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDistance) {

          linePositions[lineIndex++] = pos[i * 3]
          linePositions[lineIndex++] = pos[i * 3 + 1]
          linePositions[lineIndex++] = pos[i * 3 + 2]

          linePositions[lineIndex++] = pos[j * 3]
          linePositions[lineIndex++] = pos[j * 3 + 1]
          linePositions[lineIndex++] = pos[j * 3 + 2]

        }

      }

    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    linesRef.current.geometry.setDrawRange(0, lineIndex / 3)
    linesRef.current.geometry.attributes.position.needsUpdate = true

  })

  return (

    <group>

      {/* POINTS */}

      <points ref={pointsRef}>

        <bufferGeometry>

          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />

        </bufferGeometry>

        <pointsMaterial
          color="#00fff2"
          size={0.05}
          transparent
          opacity={0.9}
        />

      </points>

      {/* CONNECTION LINES */}

      <lineSegments ref={linesRef}>

        <bufferGeometry>

          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />

        </bufferGeometry>

        <lineBasicMaterial
          color="#00fff2"
          transparent
          opacity={0.15}
        />

      </lineSegments>

    </group>

  )

}

/* =========================
   MOUSE PARALLAX
========================= */

function MouseParallax({ children }) {

  const group = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {

    const move = (e) => {

      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2

    }

    window.addEventListener("mousemove", move)

    return () => window.removeEventListener("mousemove", move)

  }, [])

  useFrame(() => {

    if (!group.current) return

    group.current.rotation.y +=
      (mouse.current.x * 0.3 - group.current.rotation.y) * 0.02

    group.current.rotation.x +=
      (-mouse.current.y * 0.3 - group.current.rotation.x) * 0.02

  })

  return <group ref={group}>{children}</group>

}

/* =========================
   CAMERA FLOAT
========================= */

function CameraRig() {

  useFrame((state) => {

    const t = state.clock.elapsedTime

    state.camera.position.x = Math.sin(t * 0.05) * 0.6
    state.camera.position.y = Math.cos(t * 0.04) * 0.3

    state.camera.lookAt(0, 0, 0)

  })

  return null

}

/* =========================
   MAIN BACKGROUND
========================= */

export default function ThreeBackground() {

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none"
      }}
    >

      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >

        <ambientLight intensity={0.25} />

        <CameraRig />

        <MouseParallax>

          {/* FAR STARS */}
          <StarLayer
            count={800}
            depth={20}
            size={0.015}
            speed={0.002}
            color="#4d7cff"
          />

          {/* MID STARS */}
          <StarLayer
            count={500}
            depth={12}
            size={0.02}
            speed={0.004}
            color="#b14cff"
          />

          {/* NEAR STARS */}
          <StarLayer
            count={250}
            depth={8}
            size={0.03}
            speed={0.006}
            color="#00fff2"
          />

          {/* CONSTELLATION */}
          <ConstellationField />

        </MouseParallax>

      </Canvas>

    </div>

  )

}