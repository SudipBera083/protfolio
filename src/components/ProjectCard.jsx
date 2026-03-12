import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ProjectCard({ project, index }) {

  const [stats, setStats] = useState(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  useEffect(() => {

    if (!project.github) return

    fetch(project.github)
      .then(res => res.json())
      .then(data => {
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          watchers: data.watchers_count
        })
      })

  }, [project.github])


  const handleMove = (e) => {

    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = -(y - rect.height / 2) / 25
    const rotateY = (x - rect.width / 2) / 25

    setRotate({ x: rotateX, y: rotateY })
  }

  const reset = () => setRotate({ x: 0, y: 0 })


  return (

    <div
      style={{ perspective: "1200px" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >

      <motion.div

        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}

        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d"
        }}

        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-xl"

      >

        {/* IMAGE */}

        <div
          className="relative h-52 overflow-hidden"
          style={{ transform: "translateZ(40px)" }}
        >

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        </div>


        {/* CONTENT */}

        <div
          className="p-6"
          style={{ transform: "translateZ(80px)" }}
        >

          <h3 className="text-lg font-semibold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-gray-400 mb-4">
            {project.description}
          </p>


          {/* TECH STACK */}

          <div className="flex flex-wrap gap-2 mb-4">

            {(project.stack || []).map(tech => (

              <span
                key={tech}
                className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10"
              >
                {tech}
              </span>

            ))}

          </div>


          {/* GITHUB STATS */}

          {stats && (

            <div className="flex gap-4 text-xs text-gray-400 mb-4">

              <span>⭐ {stats.stars}</span>
              <span>🍴 {stats.forks}</span>
              <span>👁 {stats.watchers}</span>

            </div>

          )}


          {/* LINKS */}

          <div className="flex gap-4 text-sm">

            {project.repo && (
              <a
                href={project.github}
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300"
              >
                GitHub →
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                className="text-purple-400 hover:text-purple-300"
              >
                Live Demo →
              </a>
            )}

          </div>

        </div>

      </motion.div>

    </div>

  )

}