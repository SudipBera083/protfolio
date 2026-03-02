import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const roles = ['Full-Stack Engineer', 'Oracle SaaS Specialist', 'Django & AI Architect']

const letterAnim = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
        opacity: 1, y: 0, rotateX: 0,
        transition: { duration: 0.6, delay: 0.5 + i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 1.2 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
}

function AnimatedText({ text, className, style }) {
    return (
        <span className={className} style={{ ...style, display: 'inline-flex', flexWrap: 'wrap' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnim}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    )
}

export default function Home() {
    return (
        <div className="relative z-10 min-h-screen flex items-center">
            <div className="section-container w-full">
                <div className="max-w-4xl">

                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,255,242,0.06), rgba(177,76,255,0.04))',
                            border: '1px solid rgba(0,255,242,0.12)',
                        }}
                    >
                        <span className="glow-dot" />
                        <span className="text-xs font-semibold tracking-wide" style={{ color: '#00fff2' }}>
                            Open to Opportunities
                        </span>
                    </motion.div>

                    {/* Cinematic Heading */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] mb-3"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="block"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            Hi, I'm
                        </motion.span>
                        <AnimatedText
                            text="Sudip Bera"
                            className="text-gradient-hero text-glow block"
                        />
                    </h1>

                    {/* Role Tags */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-3 mt-6 mb-8"
                    >
                        {roles.map((role) => (
                            <motion.span
                                key={role}
                                variants={fadeUp}
                                className="px-4 py-2 rounded-xl text-sm font-medium"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                {role}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Glowing Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 1.4, ease: 'easeInOut' }}
                        className="glow-line w-32 my-8 origin-left"
                    />

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.5 }}
                        className="text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        I engineer <span style={{ color: '#00fff2' }}>enterprise-grade SaaS platforms</span>,
                        architect <span style={{ color: '#b14cff' }}>scalable backend systems</span>, and build
                        intelligent <span style={{ color: '#ff2d8a' }}>AI-powered solutions</span> that transform businesses.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.7 }}
                        className="flex flex-wrap gap-4 mb-20"
                    >
                        <Link to="/projects" className="btn-primary">
                            Explore My Work
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/contact" className="btn-outline">
                            Let's Connect
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="flex flex-wrap gap-12 pt-10"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                    >
                        {[
                            { value: '5+', label: 'Years Experience', color: '#00fff2' },
                            { value: '30+', label: 'Projects Shipped', color: '#b14cff' },
                            { value: '15+', label: 'Enterprise Clients', color: '#ff2d8a' },
                            { value: '99%', label: 'Client Satisfaction', color: '#4d7cff' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 2.1 + i * 0.1 }}
                            >
                                <div
                                    className="text-3xl md:text-4xl font-black mb-1"
                                    style={{ fontFamily: 'var(--font-display)', color: stat.color, textShadow: `0 0 30px ${stat.color}30` }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-xs font-medium tracking-wide uppercase" style={{ color: 'var(--color-text-muted)' }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
