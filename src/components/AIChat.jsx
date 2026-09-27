import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send } from 'lucide-react'
import { askAI } from '../services/aiService.js'
import { PLACES } from '../data/destinations.js'

const SUGGESTIONS = ['Best places nearby?', 'Plan a 3-day trip', 'Places for families?', 'Budget travel?', 'Best food to try?']

export default function AIChat({ currentPlace }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your WanderAI travel assistant. Ask me about any destination — or tap a suggestion below." },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(text) {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setThinking(true)
    const reply = await askAI(text, { currentPlace, knownPlaces: PLACES })
    setMessages((m) => [...m, { role: 'ai', text: reply }])
    setThinking(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" id="ai-guide">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[92vw] max-w-sm h-[70vh] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-ink/10 flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 bg-ink text-paper flex items-center justify-between">
              <span className="font-display font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: 'var(--accent, #E8A33D)' }} /> Ask WanderAI
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user' ? 'bg-ink text-paper' : 'bg-ink/5 text-ink'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {thinking && <div className="text-xs text-ink/40 pl-1">WanderAI is thinking...</div>}
              <div ref={endRef} />
            </div>

            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-ink/5 text-ink/70 hover:bg-ink/10"
                >
                  💬 {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="p-3 border-t border-ink/10 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a destination..."
                className="flex-1 bg-ink/5 rounded-full px-4 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full flex items-center justify-center text-ink shrink-0"
                style={{ background: 'var(--accent, #E8A33D)' }}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-ink text-xl"
        style={{ background: 'var(--accent, #E8A33D)' }}
        aria-label="Ask WanderAI"
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </motion.button>
    </div>
  )
}
