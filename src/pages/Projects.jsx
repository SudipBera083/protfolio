import { motion } from "framer-motion"
import { useState } from "react"
import ProjectCard from "../components/ProjectCard"
import projects from "../data/projects"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const filters = ["All", "AI", "SaaS", "Cloud", "Web"]

export default function Projects() {

  const [activeFilter,setActiveFilter] = useState("All")

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(p =>
          (p.stack || []).some(s =>
            s.toLowerCase().includes(activeFilter.toLowerCase())
          )
        )

  return (

    <div className="relative z-10 min-h-screen pt-28">

      <div className="section-container">

        {/* HEADER */}

        <motion.div
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.7}}
          className="mb-16"
        >

          <div className="section-label">
            <span className="glow-dot"/>
            Portfolio
          </div>

          <h1 className="section-title">

            <span className="text-gradient">
              Innovative
            </span>{" "}

            <span style={{color:"var(--color-text-primary)"}}>
              Projects
            </span>

          </h1>

          <p className="section-desc max-w-2xl">
            A showcase of full-stack platforms, enterprise cloud systems,
            AI-powered tools, and modern digital products engineered for
            performance and scalability.
          </p>

        </motion.div>


        {/* FILTERS */}
        <br />

        <div className="flex flex-wrap gap-3 mb-12">

          {filters.map(filter => (

            <button
              key={filter}
              onClick={()=>setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm border transition
              ${activeFilter===filter
                ? "border-cyan-400 text-cyan-300 bg-cyan-400/10"
                : "border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {filter}
            </button>

          ))}

        </div>


        {/* PROJECT GRID */}
          <br />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >

          {filteredProjects.map((project,i)=>(
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
            />
          ))}

        </motion.div>


        {/* PROJECT STATS */}
          <br />
        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:0.6}}
          className="grid md:grid-cols-3 gap-8 mt-20 text-center"
        >

          {[
            {value:"10+",label:"Projects Built"},
            {value:"15+",label:"Technologies Used"},
            {value:"2+",label:"Years Experience"}
          ].map(stat=>(

            <div
              key={stat.label}
              className="glass p-8 rounded-2xl"
            >

              <div className="text-3xl font-bold text-cyan-300 mb-1">
                {stat.value}
              </div>

              <div className="text-sm text-gray-400">
                {stat.label}
              </div>

            </div>

          ))}

        </motion.div>


        {/* CTA */}
          <br />
        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:0.7}}
          className="mt-24 text-center"
        >

          <div className="glass inline-flex flex-col items-center px-12 py-12 rounded-3xl">

            <div className="text-4xl mb-4">🚀</div>

            <h3
              className="text-2xl font-bold mb-3"
              style={{fontFamily:"var(--font-display)"}}
            >
              Ready to Build Something Amazing?
            </h3>

            <p className="text-sm text-gray-400 mb-6 max-w-md">
              Let's collaborate to create scalable platforms,
              intelligent systems, and modern digital experiences.
            </p>
            <br />
            <a
              href="/contact"
              className="btn-primary"
            >
              Start a Conversation →
            </a>

          </div>

        </motion.div>

      </div>

    </div>

  )

}