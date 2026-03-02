import { motion } from 'framer-motion'
import SkillBar from '../components/SkillBar'

const skills = [
    { name: 'React / Next.js', percentage: 92, color: '#00fff2', icon: '⚛️' },
    { name: 'Django / Python', percentage: 90, color: '#b14cff', icon: '🐍' },
    { name: 'Oracle HCM / ERP Cloud', percentage: 88, color: '#ff2d8a', icon: '☁️' },
    { name: 'SQL / PL/SQL', percentage: 85, color: '#4d7cff', icon: '🗄️' },
    { name: 'Node.js / Express', percentage: 82, color: '#00ff88', icon: '🟢' },
    { name: 'SaaS Architecture', percentage: 87, color: '#b14cff', icon: '🏗️' },
    { name: 'AI / Machine Learning', percentage: 78, color: '#ff2d8a', icon: '🧠' },
    { name: 'REST API Design', percentage: 90, color: '#00fff2', icon: '🔗' },
]

const experiences = [
    {
        period: '2022 — Present',
        role: 'Senior Full-Stack Engineer',
        company: 'Enterprise SaaS Company',
        desc: 'Leading Oracle Cloud integrations, building scalable React frontends, and architecting AI-powered analytics dashboards for enterprise clients.',
        color: '#00fff2',
    },
    {
        period: '2020 — 2022',
        role: 'Django & Backend Architect',
        company: 'Tech Consulting Firm',
        desc: 'Designed microservices-based backends, RESTful APIs, and automated deployment pipelines serving 100K+ requests/day.',
        color: '#b14cff',
    },
    {
        period: '2019 — 2020',
        role: 'Oracle SaaS Consultant',
        company: 'IT Services Company',
        desc: 'Implemented Oracle HCM and ERP Cloud solutions for enterprise clients. Custom PL/SQL development and third-party integrations.',
        color: '#ff2d8a',
    },
]

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function About() {
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
                        About Me
                    </div>
                    <h1 className="section-title">
                        <span className="text-gradient">Crafting Digital</span>{' '}
                        <span style={{ color: 'var(--color-text-primary)' }}>Excellence</span>
                    </h1>
                    <p className="section-desc">
                        A passionate full-stack engineer at the intersection of cloud technology, artificial intelligence, and modern web architecture.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-14">
                    {/* Left Column */}
                    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {/* Bio */}
                        <motion.div variants={fadeUp} className="glass p-7 mb-8" style={{ borderRadius: '22px' }}>
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                                Professional Summary
                            </h2>
                            <p className="text-sm leading-[1.8]" style={{ color: 'var(--color-text-secondary)' }}>
                                With extensive experience in enterprise SaaS platforms, I specialize in bridging legacy Oracle systems with modern cloud-native architectures. My expertise spans <span style={{ color: '#00fff2' }}>Oracle HCM/ERP Cloud</span> implementations, <span style={{ color: '#b14cff' }}>Django-based backend systems</span>, and <span style={{ color: '#ff2d8a' }}>React frontends</span> — enhanced with AI capabilities for intelligent automation and data-driven insights.
                            </p>
                        </motion.div>

                        {/* Experience Timeline */}
                        <motion.div variants={fadeUp}>
                            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                                Experience
                            </h2>
                            <div className="space-y-5">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.12 }}
                                        className="glass glass-hover p-6 relative overflow-hidden"
                                        style={{ borderRadius: '18px' }}
                                    >
                                        {/* Side Accent */}
                                        <div
                                            className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                                            style={{ background: `linear-gradient(180deg, ${exp.color}, ${exp.color}40)`, boxShadow: `0 0 12px ${exp.color}30` }}
                                        />
                                        <div className="pl-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-lg"
                                                    style={{ color: exp.color, background: `${exp.color}10`, border: `1px solid ${exp.color}20` }}>
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <div className="text-base font-bold mb-0.5" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                                                {exp.role}
                                            </div>
                                            <div className="text-sm font-medium mb-3" style={{ color: exp.color }}>{exp.company}</div>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{exp.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column — Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {/* Skills Card */}
                        <div className="glass p-7" style={{ borderRadius: '22px' }}>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                                    Technical Proficiency
                                </h2>
                                <span className="text-xs font-medium px-3 py-1 rounded-full"
                                    style={{ color: '#00fff2', background: 'rgba(0,255,242,0.06)', border: '1px solid rgba(0,255,242,0.1)' }}>
                                    Core Stack
                                </span>
                            </div>
                            {skills.map((skill, i) => (
                                <SkillBar key={skill.name} {...skill} delay={i * 0.06} />
                            ))}
                        </div>

                        {/* Tech Cloud */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="glass p-7 mt-8"
                            style={{ borderRadius: '22px' }}
                        >
                            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                                Technology Ecosystem
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {['React', 'Django', 'Python', 'Oracle Cloud', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'GraphQL', 'TensorFlow', 'Git', 'CI/CD', 'Kubernetes', 'TypeScript', 'MongoDB'].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        className="px-4 py-2 text-xs font-semibold rounded-xl cursor-default transition-colors duration-200"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            color: 'var(--color-text-secondary)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(0,255,242,0.2)'
                                            e.currentTarget.style.color = '#00fff2'
                                            e.currentTarget.style.background = 'rgba(0,255,242,0.04)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                                            e.currentTarget.style.color = 'var(--color-text-secondary)'
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                        }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
