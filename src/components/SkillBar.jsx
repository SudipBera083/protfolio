import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SkillBar({ name, percentage, color = '#00fff2', delay = 0, icon }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="mb-6 group"
        >
            <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-sm">{icon}</span>}
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {name}
                    </span>
                </div>
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: delay + 0.8, type: 'spring', stiffness: 300 }}
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                        color,
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                    }}
                >
                    {percentage}%
                </motion.span>
            </div>

            {/* Track */}
            <div
                className="w-full h-2.5 rounded-full overflow-hidden relative"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
                {/* Fill */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : {}}
                    transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full relative"
                    style={{
                        background: `linear-gradient(90deg, ${color}60, ${color})`,
                        boxShadow: `0 0 20px ${color}30, 0 0 40px ${color}10`,
                    }}
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={isInView ? { x: '200%' } : {}}
                        transition={{ duration: 2, delay: delay + 1, ease: 'easeInOut' }}
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            width: '50%',
                        }}
                    />

                    {/* Glowing Tip */}
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full"
                        style={{
                            background: `radial-gradient(circle, ${color}, ${color}80)`,
                            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}60`,
                            border: '2px solid rgba(255,255,255,0.3)',
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}
