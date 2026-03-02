import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Sudip's AI assistant. How can I help you?", sender: 'bot' },
    ])
    const [input, setInput] = useState('')

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = { id: Date.now(), text: input, sender: 'user' }
        setMessages((prev) => [...prev, userMsg])
        setInput('')

        // Placeholder: Replace with actual Django API call
        // Example: const res = await fetch('https://your-api.com/chat', { method: 'POST', body: JSON.stringify({ message: input }) })
        // const data = await res.json()

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: "Thanks for your message! This chatbot is connected to a Django API backend. Sudip will get back to you soon.",
                    sender: 'bot',
                },
            ])
        }, 1000)
    }

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-none"
                style={{
                    background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                    boxShadow: '0 8px 32px rgba(0, 240, 255, 0.3)',
                }}
                aria-label="Toggle chatbot"
            >
                <span className="text-xl" style={{ color: '#0a0a0f' }}>
                    {isOpen ? '✕' : '💬'}
                </span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-strong overflow-hidden"
                        style={{
                            borderRadius: '20px',
                            maxHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <div
                            className="px-5 py-4 flex items-center gap-3"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(168, 85, 247, 0.08))',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                            }}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                style={{ background: 'linear-gradient(135deg, #00f0ff, #a855f7)', color: '#0a0a0f' }}
                            >
                                AI
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">Sudip's Assistant</div>
                                <div className="text-xs" style={{ color: '#00f0ff' }}>● Online</div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: '320px' }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                                    style={{
                                        borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        background: msg.sender === 'user'
                                            ? 'linear-gradient(135deg, #00f0ff, #3b82f6)'
                                            : 'rgba(255,255,255,0.06)',
                                        color: msg.sender === 'user' ? '#0a0a0f' : '#e2e8f0',
                                    }}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="input-field flex-1"
                                style={{ borderRadius: '12px', padding: '0.625rem 1rem', fontSize: '0.85rem' }}
                            />
                            <motion.button
                                onClick={handleSend}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 rounded-xl border-none cursor-pointer font-semibold text-sm"
                                style={{
                                    background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                                    color: '#0a0a0f',
                                }}
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
