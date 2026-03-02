import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, shaderMaterial } from "@react-three/drei"
import * as THREE from "three"

const CodeSphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uBaseColor: new THREE.Color("#00fff2"),
    uAccentColor: new THREE.Color("#4f46e5"),
  },
  `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uAccentColor;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    float sdStrip(float coord, float width) {
      float d = abs(fract(coord) - 0.5);
      return smoothstep(width, 0.0, d);
    }

    void main() {
      vec3 n = normalize(vNormal);
      float u = atan(n.z, n.x) / (2.0 * 3.14159265) + 0.5;
      float v = acos(clamp(n.y, -1.0, 1.0)) / 3.14159265;

      float scrollSpeed = 0.35;
      float timeOffset = uTime * scrollSpeed;

      float rowPattern = sdStrip(v * 24.0 + timeOffset, 0.28);
      float colPattern = sdStrip(u * 36.0 - timeOffset * 1.5, 0.3);

      float diagonal1 = sdStrip(u * 18.0 + v * 18.0 + timeOffset * 0.8, 0.23);
      float diagonal2 = sdStrip(u * 18.0 - v * 18.0 - timeOffset * 0.6, 0.23);

      float codeMask = max(rowPattern * 0.9, colPattern * 0.6);
      codeMask = max(codeMask, max(diagonal1 * 0.4, diagonal2 * 0.4));

      float coreGlow = pow(1.0 - v, 3.0) * 0.6;

      float dataPulse = 0.0;
      for (int i = 0; i < 4; i++) {
        float bandOffset = float(i) * 0.7;
        float wave = sin((u * 6.2831) + (uTime * 1.6) + bandOffset);
        float band = smoothstep(0.82, 1.0, wave);
        dataPulse += band * smoothstep(0.3, 1.0, rowPattern + colPattern);
      }
      dataPulse = clamp(dataPulse, 0.0, 1.0);

      vec3 base = mix(uBaseColor, uAccentColor, v);
      vec3 codeColor = mix(base * 0.4, base, codeMask);

      float intensity = codeMask * 0.9 + coreGlow * 0.8 + dataPulse * 0.8;
      float fresnel = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);

      vec3 color = codeColor * (0.45 + intensity) + vec3(0.2, 0.5, 1.0) * fresnel * 0.8;
      float alpha = 0.22 + intensity * 0.75;

      gl_FragColor = vec4(color, alpha);
    }
  `
)

extend({ CodeSphereMaterial })

function useDataOrbits(count = 6, radius = 2.2) {
  return useMemo(() => {
    const curves = []
    for (let i = 0; i < count; i++) {
      const tilt = (Math.random() - 0.5) * 0.9
      const angleOffset = Math.random() * Math.PI * 2
      const points = []
      const segments = 32
      for (let j = 0; j <= segments; j++) {
        const t = (j / segments) * Math.PI * 2
        const x = Math.cos(t + angleOffset) * radius
        const y = Math.sin(t + angleOffset) * radius * Math.cos(tilt)
        const z = Math.sin(t + angleOffset) * radius * Math.sin(tilt)
        points.push(new THREE.Vector3(x, y, z))
      }
      curves.push(new THREE.CatmullRomCurve3(points, true, "catmullrom"))
    }
    return curves
  }, [count, radius])
}

function DataPulse({ orbits }) {
  const instRef = useRef()
  const pulseConfigs = useMemo(
    () =>
      Array.from({ length: Math.min(orbits.length * 3, 18) }).map((_, index) => ({
        orbitIndex: index % orbits.length,
        offset: Math.random(),
        speed: 0.25 + Math.random() * 0.45,
      })),
    [orbits]
  )

  useFrame((state) => {
    if (!instRef.current) return
    const t = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    pulseConfigs.forEach((pulse, i) => {
      const orbit = orbits[pulse.orbitIndex]
      const progress = fract(t * pulse.speed + pulse.offset)
      const pos = orbit.getPointAt(progress)
      dummy.position.copy(pos)
      const scale = 0.06 + 0.04 * Math.sin(t * 4.0 + i)
      dummy.scale.setScalar(scale)
      dummy.lookAt(0, 0, 0)
      dummy.updateMatrix()
      instRef.current.setMatrixAt(i, dummy.matrix)
    })

    instRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instRef} args={[null, null, pulseConfigs.length]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial
        color="#e5f4ff"
        transparent
        opacity={0.95}
      />
    </instancedMesh>
  )
}

function MatrixSphereCore() {
  const groupRef = useRef()
  const matRef = useRef()
  const orbits = useDataOrbits()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.16
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.18
    }
    if (matRef.current) {
      matRef.current.uTime = t
    }
  })

  return (
    <group ref={groupRef}>
      <mesh scale={1.85}>
        <sphereGeometry args={[1, 64, 64]} />
        <codeSphereMaterial
          ref={matRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh scale={1.9}>
        <sphereGeometry args={[1, 40, 40]} />
        <meshBasicMaterial
          color="#1d4ed8"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#0ea5e9"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      <group>
        {orbits.map((curve, idx) => (
          <mesh key={idx}>
            <tubeGeometry args={[curve, 80, 0.012, 6, true]} />
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#22d3ee"
              emissiveIntensity={0.55}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
        ))}
      </group>

      <DataPulse orbits={orbits} />
    </group>
  )
}

function MatrixSphereScene({ pointer, quality }) {
  const rig = useRef()

  useFrame(() => {
    if (!rig.current) return
    const targetX = pointer.current.x * 0.22
    const targetY = pointer.current.y * 0.16
    rig.current.rotation.y += (targetX - rig.current.rotation.y) * 0.08
    rig.current.rotation.x += (targetY - rig.current.rotation.x) * 0.08
  })

  const starCount = quality === "desktop" ? 1200 : 700

  return (
    <>
      <color attach="background" args={["transparent"]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 6, 8]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -3, -6]} intensity={0.8} color="#4f46e5" />
      <pointLight position={[0, 4, -4]} intensity={0.6} color="#22d3ee" />

      <Stars
        radius={18}
        depth={32}
        count={starCount}
        factor={3}
        saturation={0}
        fade
        speed={0.35}
      />

      <group ref={rig}>
        <MatrixSphereCore />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.45}
      />
    </>
  )
}

export default function HeroMatrixSphere() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return
    const mqMobile = window.matchMedia("(max-width: 768px)")
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
      <div className="relative w-full h-64 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_0%,rgba(0,255,242,0.28),transparent_55%),radial-gradient(circle_at_95%_30%,rgba(177,76,255,0.3),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.35),transparent_55%)] opacity-90 blur-[4px]" />
        <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_65%)] mix-blend-screen" />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5">
          <div>
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[color:var(--color-text-muted)]">
              Live code matrix
            </p>
            <p className="mt-1 text-xs text-[color:var(--color-text-secondary)] max-w-xs">
              Lightweight visualization on mobile. Full 3D code sphere on larger viewports.
            </p>
          </div>
          <p className="text-[0.6rem] text-[color:var(--color-text-muted)]">
            Battery-aware · 60fps-optimized
          </p>
        </div>
      </div>
    )
  }

  const quality = isTablet ? "tablet" : "desktop"

  return (
    <div className="relative w-full h-[340px] sm:h-[380px] md:h-[420px] lg:h-[460px] xl:h-[520px]">
      <div className="absolute inset-0 rounded-[1.7rem] bg-[radial-gradient(circle_at_10%_0%,rgba(0,255,242,0.24),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(177,76,255,0.26),transparent_55%)] opacity-75 blur-2xl pointer-events-none" />
      <Suspense
        fallback={
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[1.7rem] bg-[rgba(3,0,20,0.9)] border border-[rgba(255,255,255,0.04)] text-[10px] sm:text-xs text-[color:var(--color-text-muted)]">
            Spinning up code matrix…
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0.4, 7.5], fov: 40, near: 0.1, far: 40 }}
          dpr={quality === "desktop" ? [1, 2] : [1, 1.5]}
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
          <MatrixSphereScene pointer={pointer} quality={quality} />
        </Canvas>
      </Suspense>
    </div>
  )
}

