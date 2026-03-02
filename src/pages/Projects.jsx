import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
}

export default function Projects() {
    return (
        <div className="relative z-10 min-h-screen pt-28">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <div className="section-label">
                        <span className="glow-dot" />
                        Portfolio
                    </div>
                    <h1 className="section-title">
                        <span className="text-gradient">Featured</span>{' '}
                        <span style={{ color: 'var(--color-text-primary)' }}>Projects</span>
                    </h1>
                    <p className="section-desc">
                        Enterprise SaaS platforms, AI-powered tools, and scalable cloud solutions built for real-world impact at scale.
                    </p>
                </motion.div>

                {/* Glow Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="glow-line w-full mb-12 origin-left"
                />

                {/* Grid */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
                >
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <div
                        className="glass inline-flex flex-col items-center px-12 py-10"
                        style={{
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, rgba(0,255,242,0.02), rgba(177,76,255,0.02))',
                        }}
                    >
                        <div className="text-3xl mb-4">🚀</div>
                        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                            Have a Project in Mind?
                        </h3>
                        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            Let's collaborate and build something extraordinary together.
                        </p>
                        <a href="/contact" className="btn-primary">
                            Start a Conversation
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
