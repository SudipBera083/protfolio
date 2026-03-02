import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="glass-strong mt-4 px-6 py-3 flex items-center justify-between" style={{ borderRadius: '16px' }}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                            style={{
                                background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                                color: '#0a0a0f',
                            }}>
                            SB
                        </div>
                        <span className="text-white font-semibold text-lg hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>
                            Sudip Bera
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 no-underline"
                                style={{
                                    color: location.pathname === link.path ? '#00f0ff' : '#94a3b8',
                                }}
                                onMouseEnter={(e) => { if (location.pathname !== link.path) e.target.style.color = '#e2e8f0' }}
                                onMouseLeave={(e) => { if (location.pathname !== link.path) e.target.style.color = '#94a3b8' }}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-2 right-2 h-0.5"
                                        style={{ background: 'linear-gradient(90deg, #00f0ff, #a855f7)' }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <Link to="/contact" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-white rounded"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-6 h-0.5 bg-white rounded"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-white rounded"
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden glass-strong mt-2 overflow-hidden"
                            style={{ borderRadius: '16px' }}
                        >
                            <div className="p-4 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors"
                                        style={{
                                            color: location.pathname === link.path ? '#00f0ff' : '#94a3b8',
                                            background: location.pathname === link.path ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary mt-2 justify-center"
                                    style={{ fontSize: '0.85rem' }}
                                >
                                    Let's Talk
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
