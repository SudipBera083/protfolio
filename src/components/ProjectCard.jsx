import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass group cursor-pointer overflow-hidden"
            style={{ borderRadius: '20px' }}
        >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.9) 100%)',
                    }}
                />
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                        href={project.liveUrl}
                        className="px-4 py-2 text-xs font-semibold rounded-lg no-underline transition-transform hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #00f0ff, #3b82f6)',
                            color: '#0a0a0f',
                        }}
                    >
                        ▶ Live Demo
                    </a>
                    <a
                        href={project.codeUrl}
                        className="px-4 py-2 text-xs font-semibold rounded-lg no-underline border transition-transform hover:scale-105"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderColor: 'rgba(255,255,255,0.2)',
                            color: '#e2e8f0',
                        }}
                    >
                        {'</>'} Code
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full"
                            style={{
                                background: 'rgba(0, 240, 255, 0.08)',
                                color: '#00f0ff',
                                border: '1px solid rgba(0, 240, 255, 0.15)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
