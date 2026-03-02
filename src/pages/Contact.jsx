import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Placeholder: connect to Django API
        // fetch('https://your-api.com/contact', { method: 'POST', body: JSON.stringify(form) })
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(null), 4000)
    }

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
                        <span className="text-gradient">Get In Touch</span>
                    </h1>
                    <p className="section-subtitle">
                        Have a project in mind or just want to connect? Drop me a message and I'll get back to you soon.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="glass p-8" style={{ borderRadius: '20px' }}>
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Project Discussion"
                                    required
                                    className="input-field"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={5}
                                    className="input-field resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full justify-center"
                                style={{ padding: '0.875rem' }}
                            >
                                Send Message →
                            </motion.button>

                            {status === 'sent' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-center text-sm font-medium"
                                    style={{ color: '#00f0ff' }}
                                >
                                    ✓ Message sent successfully! I'll get back to you soon.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: '📧',
                                title: 'Email',
                                value: 'sudip@example.com',
                                link: 'mailto:sudip@example.com',
                            },
                            {
                                icon: '📍',
                                title: 'Location',
                                value: 'India',
                                link: null,
                            },
                            {
                                icon: '🔗',
                                title: 'LinkedIn',
                                value: 'linkedin.com/in/sudipbera',
                                link: 'https://linkedin.com/in/sudipbera',
                            },
                            {
                                icon: '🐙',
                                title: 'GitHub',
                                value: 'github.com/sudipbera',
                                link: 'https://github.com/sudipbera',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                className="glass p-5 flex items-center gap-4 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                                style={{ borderRadius: '16px' }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                    style={{ background: 'rgba(0, 240, 255, 0.06)' }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="text-xs font-medium mb-0.5" style={{ color: '#64748b' }}>
                                        {item.title}
                                    </div>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium no-underline text-white transition-colors hover:text-[#00f0ff]"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <div className="text-sm font-medium text-white">{item.value}</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Availability Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="glass p-6"
                            style={{
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.04), rgba(168, 85, 247, 0.04))',
                                border: '1px solid rgba(0, 240, 255, 0.1)',
                            }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                                <span className="text-sm font-semibold text-white">Currently Available</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                                I'm open to freelance projects, consulting, and full-time roles. Let's discuss how I can contribute to your team.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
