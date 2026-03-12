import { useRef } from "react"
import { motion, useAnimationFrame } from "framer-motion"

export default function TechOrbit({ tech = [] }) {
  const angle = useRef(0)

  useAnimationFrame((t, delta) => {
    angle.current += delta * 0.0002
  })

  const radius = 70

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

      {tech.map((item, i) => {

        const a = angle.current + (i * (Math.PI * 2)) / tech.length
        const x = Math.cos(a) * radius
        const y = Math.sin(a) * radius

        return (
          <motion.div
            key={item}
            style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px)`
            }}
            className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10 backdrop-blur text-gray-200"
          >
            {item}
          </motion.div>
        )
      })}
    </div>
  )
}