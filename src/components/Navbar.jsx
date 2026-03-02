import { useState, useEffect } from 'react'
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
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className="glass-nav mt-4 px-6 py-3.5 flex items-center justify-between transition-all duration-500"
                    style={{
                        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)' : 'none',
                    }}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 no-underline group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #00fff2, #b14cff)',
                                color: '#030014',
                            }}
                        >
                            <span style={{ position: 'relative', zIndex: 1 }}>SB</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </motion.div>
                        <div className="hidden sm:block">
                            <div className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                                Sudip Bera
                            </div>
                            <div className="text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                                Engineer
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-4 py-2.5 text-sm font-medium no-underline transition-all duration-300 rounded-lg"
                                    style={{
                                        color: isActive ? '#00fff2' : 'var(--color-text-secondary)',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = '#eef2ff'
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = 'var(--color-text-secondary)'
                                            e.currentTarget.style.background = 'transparent'
                                        }
                                    }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                                            style={{
                                                background: 'linear-gradient(90deg, #00fff2, #b14cff)',
                                                boxShadow: '0 0 12px rgba(0,255,242,0.4)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/contact"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-xl no-underline transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,255,242,0.1), rgba(177,76,255,0.1))',
                                border: '1px solid rgba(0,255,242,0.15)',
                                color: '#00fff2',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,242,0.15), rgba(177,76,255,0.15))'
                                e.currentTarget.style.borderColor = 'rgba(0,255,242,0.3)'
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,255,242,0.15)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,242,0.1), rgba(177,76,255,0.1))'
                                e.currentTarget.style.borderColor = 'rgba(0,255,242,0.15)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <span className="glow-dot" style={{ width: '5px', height: '5px' }} />
                            Hire Me
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
                            aria-label="Menu"
                        >
                            <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] rounded-full" style={{ background: '#eef2ff' }} />
                            <motion.span animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block w-5 h-[2px] rounded-full" style={{ background: '#eef2ff' }} />
                            <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] rounded-full" style={{ background: '#eef2ff' }} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="md:hidden glass-nav mt-2 overflow-hidden"
                        >
                            <div className="p-5 flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200"
                                            style={{
                                                color: location.pathname === link.path ? '#00fff2' : 'var(--color-text-secondary)',
                                                background: location.pathname === link.path ? 'rgba(0,255,242,0.06)' : 'transparent',
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
