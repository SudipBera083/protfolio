import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function TechObject() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={2} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Main Sphere */}
        <mesh>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial
            color="#4f46e5"
            wireframe
            emissive="#4f46e5"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        {/* Rotating Torus */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00fff2" emissive="#00fff2" emissiveIntensity={1} />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </>
  )
}

export default function HeroTech3D() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <TechObject />
      </Canvas>
    </div>
  )
}