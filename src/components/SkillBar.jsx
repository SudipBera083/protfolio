import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SkillBar({ name, percentage, color = '#00f0ff', delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <div ref={ref} className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">{name}</span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: delay + 0.5 }}
                    className="text-xs font-semibold"
                    style={{ color }}
                >
                    {percentage}%
                </motion.span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : {}}
                    transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full relative"
                    style={{
                        background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                        boxShadow: `0 0 12px ${color}40`,
                    }}
                >
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{
                            background: color,
                            boxShadow: `0 0 10px ${color}80`,
                        }}
                    />
                </motion.div>
            </div>
        </div>
    )
}
