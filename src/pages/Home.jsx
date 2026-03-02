import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const roles = [
    'Full-Stack Engineer',
    'Oracle SaaS Specialist',
    'Django & AI Architect',
]

export default function Home() {
    return (
        <div className="relative z-10 min-h-screen flex items-center">
            <div className="section-container w-full">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                        style={{
                            background: 'rgba(0, 240, 255, 0.06)',
                            border: '1px solid rgba(0, 240, 255, 0.15)',
                        }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00f0ff' }} />
                        <span className="text-xs font-medium" style={{ color: '#00f0ff' }}>
                            Available for Projects
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        <span className="text-white">Hi, I'm </span>
                        <span className="text-gradient">Sudip Bera</span>
                    </motion.h1>

                    {/* Roles */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        {roles.map((role, i) => (
                            <motion.span
                                key={role}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                className="px-4 py-2 rounded-xl text-sm font-medium"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: '#94a3b8',
                                }}
                            >
                                {role}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg leading-relaxed mb-10 max-w-2xl"
                        style={{ color: '#94a3b8' }}
                    >
                        I build enterprise-grade SaaS platforms, scalable backend systems, and intelligent AI solutions.
                        Specializing in Oracle Cloud, Django, and modern React architectures.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link to="/projects" className="btn-primary">
                            View My Work →
                        </Link>
                        <Link to="/contact" className="btn-outline">
                            Get In Touch
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex flex-wrap gap-8 mt-16 pt-8"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        {[
                            { value: '5+', label: 'Years Experience' },
                            { value: '30+', label: 'Projects Delivered' },
                            { value: '15+', label: 'Enterprise Clients' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-bold text-gradient" style={{ fontFamily: 'var(--font-display)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs mt-1" style={{ color: '#64748b' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
