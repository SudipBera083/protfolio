import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! 👋 I'm Sudip's AI assistant. Ask me anything about his work, skills, or availability.", sender: 'bot' },
    ])
    const [input, setInput] = useState('')
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return
        const userMsg = { id: Date.now(), text: input, sender: 'user' }
        setMessages((prev) => [...prev, userMsg])
        setInput('')

        // Placeholder — connect to Django REST API
        // const res = await fetch('https://your-api.com/chat', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({message: input}) })
        // const data = await res.json()

        setTimeout(() => {
            setMessages((prev) => [...prev, {
                id: Date.now() + 1,
                text: "Thanks for reaching out! This assistant connects to Sudip's Django API backend. He'll get back to you shortly. 🚀",
                sender: 'bot',
            }])
        }, 800)
    }

    return (
        <>
            {/* FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer border-none"
                style={{
                    background: 'linear-gradient(135deg, #00fff2, #b14cff)',
                    boxShadow: '0 8px 32px rgba(0,255,242,0.25), 0 0 0 1px rgba(0,255,242,0.1)',
                }}
                aria-label="Toggle chatbot"
            >
                <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl" style={{ color: '#030014' }}
                >
                    {isOpen ? '✕' : '💬'}
                </motion.span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.92 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px]"
                        style={{
                            maxHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                            backdropFilter: 'blur(40px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
                        }}
                    >
                        {/* Header */}
                        <div className="px-5 py-4 flex items-center gap-3"
                            style={{
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                                background: 'linear-gradient(135deg, rgba(0,255,242,0.04), rgba(177,76,255,0.04))',
                                borderRadius: '24px 24px 0 0',
                            }}
                        >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                                style={{ background: 'linear-gradient(135deg, #00fff2, #b14cff)', color: '#030014' }}>
                                AI
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Sudip's Assistant</div>
                                <div className="text-[10px] font-semibold flex items-center gap-1.5" style={{ color: '#00ff88' }}>
                                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
                                    Online
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: '320px' }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0.1 : 0 }}
                                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                                    style={{
                                        borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        background: msg.sender === 'user'
                                            ? 'linear-gradient(135deg, #00fff2, #4d7cff)'
                                            : 'rgba(255,255,255,0.05)',
                                        color: msg.sender === 'user' ? '#030014' : 'var(--color-text-primary)',
                                        fontWeight: msg.sender === 'user' ? 600 : 400,
                                        border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                    }}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="input-field flex-1"
                                style={{ borderRadius: '14px', padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                            />
                            <motion.button
                                onClick={handleSend}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 rounded-xl border-none cursor-pointer font-bold text-sm"
                                style={{ background: 'linear-gradient(135deg, #00fff2, #b14cff)', color: '#030014' }}
                            >
                                ➤
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
