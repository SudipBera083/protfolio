import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProjectCard({ project, index }) {
    const ref = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        x.set(px)
        y.set(py)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative cursor-pointer group"
            >
                {/* Animated Glow Border */}
                <div
                    className="absolute -inset-[1px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `conic-gradient(from ${isHovered ? '180deg' : '0deg'}, transparent 40%, #00fff260, #b14cff60, transparent 60%)`,
                        filter: 'blur(1px)',
                        transition: 'all 0.5s',
                    }}
                />

                {/* Card Body */}
                <div className="glass relative overflow-hidden" style={{ borderRadius: '22px' }}>
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: '220px' }}>
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.08 : 1 }}
                            transition={{ duration: 0.6 }}
                        />
                        {/* Gradient Overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(180deg, transparent 0%, transparent 30%, rgba(3,0,20,0.95) 100%)`,
                            }}
                        />
                        {/* Top Gradient */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(135deg, rgba(0,255,242,0.05) 0%, transparent 50%)`,
                            }}
                        />

                        {/* Hover Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center gap-3"
                        >
                            <a
                                href={project.liveUrl}
                                className="px-5 py-2.5 text-xs font-bold rounded-xl no-underline tracking-wide uppercase transition-all duration-200 hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #00fff2, #4d7cff)',
                                    color: '#030014',
                                    boxShadow: '0 4px 20px rgba(0,255,242,0.3)',
                                }}
                            >
                                ▶ Live
                            </a>
                            <a
                                href={project.codeUrl}
                                className="px-5 py-2.5 text-xs font-bold rounded-xl no-underline tracking-wide uppercase transition-all duration-200 hover:scale-105"
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#eef2ff',
                                }}
                            >
                                {'</>'} Code
                            </a>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3
                            className="text-lg font-bold mb-2"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
                        >
                            {project.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-[11px] font-semibold rounded-lg tracking-wide uppercase"
                                    style={{
                                        background: 'rgba(0, 255, 242, 0.05)',
                                        color: '#00fff2',
                                        border: '1px solid rgba(0, 255, 242, 0.1)',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Glow Accent */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #00fff240, #b14cff40, transparent)',
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
