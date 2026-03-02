import { useState } from 'react'
import { motion } from 'framer-motion'

const contactInfo = [
    { icon: '📧', title: 'Email', value: 'sudip@example.com', link: 'mailto:sudip@example.com', color: '#00fff2' },
    { icon: '📍', title: 'Location', value: 'India', link: null, color: '#b14cff' },
    { icon: '🔗', title: 'LinkedIn', value: 'linkedin.com/in/sudipbera', link: 'https://linkedin.com/in/sudipbera', color: '#4d7cff' },
    { icon: '🐙', title: 'GitHub', value: 'github.com/sudipbera', link: 'https://github.com/sudipbera', color: '#ff2d8a' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Connect to Django API: fetch('https://your-api.com/contact', { method: 'POST', body: JSON.stringify(form) })
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(null), 4000)
    }

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
                        Contact
                    </div>
                    <h1 className="section-title">
                        <span className="text-gradient">Let's Build</span>{' '}
                        <span style={{ color: 'var(--color-text-primary)' }}>Together</span>
                    </h1>
                    <p className="section-desc">
                        Have a project, idea, or opportunity? Let's connect and create something impactful.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Form — 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass p-8 md:p-10" style={{ borderRadius: '24px' }}>
                            <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-xs font-semibold tracking-wide uppercase mb-2.5" style={{ color: 'var(--color-text-muted)' }}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text" name="name" value={form.name} onChange={handleChange}
                                        placeholder="John Doe" required className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold tracking-wide uppercase mb-2.5" style={{ color: 'var(--color-text-muted)' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email" name="email" value={form.email} onChange={handleChange}
                                        placeholder="john@company.com" required className="input-field"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block text-xs font-semibold tracking-wide uppercase mb-2.5" style={{ color: 'var(--color-text-muted)' }}>
                                    Subject
                                </label>
                                <input
                                    type="text" name="subject" value={form.subject} onChange={handleChange}
                                    placeholder="Project Discussion" required className="input-field"
                                />
                            </div>
                            <div className="mb-8">
                                <label className="block text-xs font-semibold tracking-wide uppercase mb-2.5" style={{ color: 'var(--color-text-muted)' }}>
                                    Message
                                </label>
                                <textarea
                                    name="message" value={form.message} onChange={handleChange}
                                    placeholder="Tell me about your vision..." required rows={6}
                                    className="input-field resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full justify-center text-base"
                                style={{ padding: '1rem' }}
                            >
                                Send Message
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                                </svg>
                            </motion.button>

                            {status === 'sent' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-5 text-center text-sm font-semibold flex items-center justify-center gap-2"
                                    style={{ color: '#00ff88' }}
                                >
                                    <span className="w-2 h-2 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 8px #00ff88' }} />
                                    Message sent! I'll respond within 24 hours.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Info Cards — 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-2 space-y-5"
                    >
                        {contactInfo.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                                className="glass glass-hover p-5 flex items-center gap-4"
                                style={{ borderRadius: '18px' }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                                    style={{ background: `${item.color}08`, border: `1px solid ${item.color}15` }}
                                >
                                    {item.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[11px] font-semibold tracking-wider uppercase mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                        {item.title}
                                    </div>
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                                            className="text-sm font-semibold no-underline truncate block transition-colors duration-200"
                                            style={{ color: 'var(--color-text-primary)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = item.color}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                        >{item.value}</a>
                                    ) : (
                                        <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.value}</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Availability */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="glass p-6"
                            style={{
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, rgba(0,255,136,0.03), rgba(0,255,242,0.03))',
                                border: '1px solid rgba(0,255,136,0.08)',
                            }}
                        >
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="glow-dot" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88, 0 0 30px rgba(0,255,136,0.3)' }} />
                                <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Currently Available</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                Open to freelance, consulting, and full-time opportunities. Let's discuss how I can contribute to your vision.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
