import { motion } from "framer-motion"

export default function DemoUnavailable({ title, onClose }) {

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
        >

            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="glass p-8 rounded-2xl max-w-md text-center border border-white/10"
            >
                <br />
                <h3 className="text-xl font-semibold text-white mb-3">
                    Live Demo Not Available
                </h3>
                <br />
                <p className="text-sm text-gray-400 mb-6">
                    The live demo for <span className="text-cyan-400">{title}</span> is not publicly available.
                    Please check the GitHub repository for the implementation.
                </p>
                <br />
                <button
                    onClick={onClose}
                    className="btn-primary"
                >
                    Close
                </button>

            </motion.div>

        </motion.div>

    )

}