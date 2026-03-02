import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Projects() {
    return (
        <div className="relative z-10 min-h-screen pt-24">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="section-title">
                        <span className="text-gradient">Featured Projects</span>
                    </h1>
                    <p className="section-subtitle">
                        A showcase of enterprise SaaS platforms, AI-powered tools, and scalable cloud solutions built for real-world impact.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <div className="glass inline-flex flex-col items-center p-8" style={{ borderRadius: '20px' }}>
                        <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>
                            Interested in collaborating on your next project?
                        </p>
                        <a href="/contact" className="btn-primary">
                            Let's Build Together →
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
