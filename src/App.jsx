import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThreeBackground from './components/ThreeBackground'
import ChatBot from './components/ChatBot'

export default function App() {
  const location = useLocation()

  return (
    <>
      <ThreeBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ChatBot />
    </>
  )
}
