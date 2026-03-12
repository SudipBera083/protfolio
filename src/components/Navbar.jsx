import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "./Container"

import { Home, User, FolderKanban, Mail } from "lucide-react"

const navLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: User },
  { path: "/projects", label: "Projects", icon: FolderKanban },
  { path: "/contact", label: "Contact", icon: Mail },
]

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()

  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)

  }, [])

  return (

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >

      <Container>

        <div
          className={`relative mt-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
            scrolled
              ? "bg-black/70 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
              : "bg-black/40 border-white/5"
          }`}
        >

          <div className="flex items-center justify-between px-6 py-4">

            {/* LOGO */}

            <Link to="/" className="flex items-center gap-3 group">

              <motion.img
                whileHover={{ scale: 1.08 }}
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto object-contain"
              />

              <div className="hidden sm:block leading-tight">

                <div className="text-white font-semibold text-sm">
                  Sudip Bera
                </div>

                <div className="text-[10px] uppercase tracking-widest text-gray-400">
                  Engineer
                </div>

              </div>

            </Link>


            {/* DESKTOP NAV */}

            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">

              {navLinks.map((link) => {

                const isActive = location.pathname === link.path
                const Icon = link.icon

                return (

                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition group"
                  >

                    <Icon size={16} className="transition group-hover:scale-110" />

                    {link.label}

                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      />
                    )}

                  </Link>

                )

              })}

            </div>


            {/* RIGHT SIDE */}

            <div className="flex items-center gap-4">

              <Link
                to="/contact"
                className="hidden md:inline-flex px-6 py-2 rounded-xl text-xs font-semibold uppercase bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 text-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.25)] transition"
              >
                Hire Me
              </Link>


              {/* MOBILE MENU BUTTON */}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col gap-[5px]"
              >

                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : {}}
                  className="w-5 h-[2px] bg-white"
                />

                <motion.span
                  animate={isOpen ? { opacity: 0 } : {}}
                  className="w-5 h-[2px] bg-white"
                />

                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : {}}
                  className="w-5 h-[2px] bg-white"
                />

              </button>

            </div>

          </div>

        </div>


        {/* MOBILE MENU */}

        <AnimatePresence>

          {isOpen && (

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-6 space-y-4"
            >

              {navLinks.map((link) => {

                const Icon = link.icon

                return (

                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition"
                  >

                    <Icon size={18} />

                    {link.label}

                  </Link>

                )

              })}

            </motion.div>

          )}

        </AnimatePresence>

      </Container>

    </motion.nav>

  )

}