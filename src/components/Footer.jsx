import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react"

const socials = [
  {
    icon: Github,
    label: "GitHub",
    url: "https://github.com/SudipBera083",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/sudipbera083/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    url: "https://www.instagram.com/itzz_bonggo_hriday/",
  },
]

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
]

export default function Footer() {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (

    <footer
      className="relative z-10 mt-20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >

      {/* Glow Divider */}
      <div className="glow-line w-full" />

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10 items-center">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg,#00fff2,#b14cff)",
                color: "#030014"
              }}
            >
              SB
            </motion.div>

            <div>

              <div
                className="text-sm font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)"
                }}
              >
                Sudip Bera
              </div>

              <div
                className="text-[11px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Full-Stack Engineer • Oracle SaaS • AI Systems
              </div>

            </div>

          </div>


          {/* QUICK LINKS */}

          <div className="flex justify-center gap-6 text-sm">

            {quickLinks.map(link => (

              <Link
                key={link.path}
                to={link.path}
                className="text-gray-400 hover:text-cyan-400 transition"
              >
                {link.label}
              </Link>

            ))}

          </div>


          {/* SOCIAL ICONS */}

          <div className="flex justify-end items-center gap-5">

            {socials.map(s => {

              const Icon = s.icon

              return (

                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition"
                >

                  <Icon size={18} />

                </a>

              )

            })}


            {/* EMAIL QUICK CONTACT */}

            <a
              href="mailto:sudipbera083@gmail.com"
              className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition"
            >
              <Mail size={18} />
            </a>

          </div>

        </div>


        {/* BOTTOM SECTION */}

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 text-xs text-gray-500 border-t border-white/5">
        <br /><br />

          <div>
            © {new Date().getFullYear()} Sudip Bera — Built with React & Three.js
          </div>


          {/* BACK TO TOP */}

          <button
            onClick={scrollTop}
            className="flex items-center gap-2 hover:text-cyan-400 transition mt-4 md:mt-0"
          >
            <ArrowUp size={14} />
            Back to top
          </button>

        </div>

      </div>

    </footer>

  )

}