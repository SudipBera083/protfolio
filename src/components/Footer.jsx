import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const socials = [
    { label: 'GitHub', url: 'https://github.com/sudipbera' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/sudipbera' },
    { label: 'Twitter', url: 'https://twitter.com/sudipbera' },
]

export default function Footer() {
    return (
        <footer className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {/* Top Glow Line */}
            <div className="glow-line w-full" />

            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 no-underline group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                            style={{ background: 'linear-gradient(135deg, #00fff2, #b14cff)', color: '#030014' }}
                        >
                            SB
                        </motion.div>
                        <div>
                            <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                                Sudip Bera
                            </div>
                            <div className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                Full-Stack Engineer & AI Architect
                            </div>
                        </div>
                    </Link>

                    {/* Social */}
                    <div className="flex items-center gap-6">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold tracking-wide uppercase no-underline transition-all duration-300"
                                style={{ color: 'var(--color-text-muted)' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#00fff2'; e.currentTarget.style.textShadow = '0 0 20px rgba(0,255,242,0.3)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.textShadow = 'none' }}
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                        © {new Date().getFullYear()} Sudip Bera. Crafted with precision.
                    </div>
                </div>
            </div>
        </footer>
    )
}
