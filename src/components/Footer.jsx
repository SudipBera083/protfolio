import { motion } from 'framer-motion'

const footerLinks = [
    { label: 'GitHub', url: 'https://github.com/sudipbera' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/sudipbera' },
    { label: 'Twitter', url: 'https://twitter.com/sudipbera' },
]

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                            style={{ background: 'linear-gradient(135deg, #00f0ff, #a855f7)', color: '#0a0a0f' }}>
                            SB
                        </div>
                        <div>
                            <div className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                                Sudip Bera
                            </div>
                            <div className="text-xs" style={{ color: '#64748b' }}>
                                Full-Stack Engineer & AI Architect
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium transition-colors duration-200 no-underline"
                                style={{ color: '#64748b' }}
                                onMouseEnter={(e) => (e.target.style.color = '#00f0ff')}
                                onMouseLeave={(e) => (e.target.style.color = '#64748b')}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-xs" style={{ color: '#475569' }}>
                        © {new Date().getFullYear()} Sudip Bera. All rights reserved.
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}
