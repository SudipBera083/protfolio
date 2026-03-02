import { motion } from 'framer-motion'
import SkillBar from '../components/SkillBar'

const skills = [
    { name: 'React / Next.js', percentage: 92, color: '#00f0ff' },
    { name: 'Django / Python', percentage: 90, color: '#a855f7' },
    { name: 'Oracle HCM / ERP Cloud', percentage: 88, color: '#ec4899' },
    { name: 'SQL / PL/SQL', percentage: 85, color: '#3b82f6' },
    { name: 'Node.js / Express', percentage: 82, color: '#00f0ff' },
    { name: 'SaaS Architecture', percentage: 87, color: '#a855f7' },
    { name: 'AI / Machine Learning', percentage: 78, color: '#ec4899' },
    { name: 'REST API Design', percentage: 90, color: '#3b82f6' },
]

const experiences = [
    {
        period: '2022 - Present',
        role: 'Senior Full-Stack Engineer',
        company: 'Enterprise SaaS Company',
        description: 'Leading Oracle Cloud integrations, building scalable React frontends, and architecting AI-powered analytics dashboards.',
    },
    {
        period: '2020 - 2022',
        role: 'Django & Backend Architect',
        company: 'Tech Consulting Firm',
        description: 'Designed and built microservices-based backends, RESTful APIs, and automated deployment pipelines for enterprise clients.',
    },
    {
        period: '2019 - 2020',
        role: 'Oracle SaaS Consultant',
        company: 'IT Services Company',
        description: 'Implemented Oracle HCM and ERP Cloud solutions for multiple enterprise clients. Custom PL/SQL development and integration.',
    },
]

export default function About() {
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
                        <span className="text-gradient">About Me</span>
                    </h1>
                    <p className="section-subtitle">
                        A passionate full-stack engineer building enterprise solutions at the intersection of cloud technology, AI, and modern web development.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left — Summary + Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Bio Card */}
                        <div className="glass p-6 mb-8">
                            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                                Professional Summary
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                                With extensive experience in enterprise SaaS platforms, I specialize in bridging the gap between legacy Oracle systems and modern cloud-native architectures. My expertise spans Oracle HCM/ERP Cloud implementations, Django-based backend systems, and React frontends — enhanced with AI capabilities for intelligent automation and data-driven insights.
                            </p>
                        </div>

                        {/* Experience Timeline */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="glass p-5 relative"
                                        style={{ borderLeft: '2px solid rgba(0, 240, 255, 0.3)' }}
                                    >
                                        <div className="text-xs font-semibold mb-1" style={{ color: '#00f0ff' }}>
                                            {exp.period}
                                        </div>
                                        <div className="text-base font-bold text-white mb-0.5">{exp.role}</div>
                                        <div className="text-sm mb-2" style={{ color: '#a855f7' }}>{exp.company}</div>
                                        <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="glass p-6">
                            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                                Technical Skills
                            </h2>
                            {skills.map((skill, i) => (
                                <SkillBar
                                    key={skill.name}
                                    name={skill.name}
                                    percentage={skill.percentage}
                                    color={skill.color}
                                    delay={i * 0.08}
                                />
                            ))}
                        </div>

                        {/* Tech Stack Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="glass p-6 mt-8"
                        >
                            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Django', 'Python', 'Oracle Cloud', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'REST API', 'GraphQL', 'TensorFlow', 'Git', 'CI/CD', 'Kubernetes'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-default hover:scale-105"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#94a3b8',
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
