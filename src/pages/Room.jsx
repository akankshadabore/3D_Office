import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'

const ROOM_META = {
  engineering: { label: '🔧 Engineering', color: '#6366f1', bg: 'from-indigo-950/40 to-slate-950', topic: 'Architecture & Scalability' },
  design: { label: '🎨 Design', color: '#ec4899', bg: 'from-pink-950/40 to-slate-950', topic: 'UI/UX Design System' },
  marketing: { label: '📣 Marketing', color: '#f59e0b', bg: 'from-amber-950/40 to-slate-950', topic: 'Q1 Growth Strategy' },
  meeting: { label: '🤝 Meeting Room', color: '#10b981', bg: 'from-emerald-950/40 to-slate-950', topic: 'Daily Standup' },
}

const messageVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }
}

export default function Room() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { roomMessages, sendRoomMessage } = useChat()

  const meta = ROOM_META[roomId] ?? ROOM_META.meeting
  const [input, setInput] = useState('')
  const [isCalling, setIsCalling] = useState(false)
  const bottomRef = useRef(null)

  const messages = roomMessages[roomId] ?? []

  const scrollToBottom = (behavior = 'smooth') => {
    bottomRef.current?.scrollIntoView({ behavior })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    scrollToBottom('auto')
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    sendRoomMessage(roomId, input.trim(), user?.name ?? 'You')
    setInput('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col h-full bg-slate-950 relative overflow-hidden`}
    >
      <div className={`absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b ${meta.bg} opacity-50 blur-[120px] pointer-events-none`} />

      <div className="flex items-center justify-between px-6 py-4 lg:px-10 lg:py-6 glass-morphism border-b border-white/5 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-5 lg:gap-8">
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/office')}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-slate-300 pointer-events-auto shadow-md"
          >
            <span className="text-xl lg:text-2xl">←</span>
          </motion.button>
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl lg:text-3xl font-black text-white tracking-tight font-display uppercase">{meta.label}</h1>
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] lg:text-xs text-emerald-400 font-black uppercase tracking-widest">Live</span>
              </motion.div>
            </div>
            <p className="text-xs lg:text-[13px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider">
              Channel Topic: <span className="text-slate-300 opacity-80 pl-2">{meta.topic}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCalling(!isCalling)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] lg:text-xs font-black uppercase tracking-widest transition-all border shadow-lg
              ${isCalling
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 ring-8 ring-rose-500/5 shadow-rose-900/20'
                : 'bg-primary-600 text-white border-primary-400 shadow-primary-600/20'
              }`}
          >
            {isCalling ? '📞 End Session' : '📹 Start Huddle'}
          </motion.button>

          <div className="flex -space-x-4 hidden sm:flex">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, zIndex: 10 }}
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-[3px] border-slate-950 bg-slate-800 flex items-center justify-center text-xs lg:text-sm font-black text-white shadow-xl cursor-pointer"
                style={{ background: meta.color }}
              >
                {['JD', 'SM', 'RT'][i - 1]}
              </motion.div>
            ))}
            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-[3px] border-slate-950 bg-slate-900 flex items-center justify-center text-xs lg:text-sm font-black text-slate-500 shadow-xl">
              +4
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-6 lg:p-8 gap-6 lg:gap-8">

        <div className="flex-1 flex flex-col min-w-0 glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">

          <AnimatePresence>
            {isCalling && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-6 bg-black/40 border-b border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0 overflow-hidden"
              >
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-video rounded-3xl bg-slate-900/80 border border-white/10 relative overflow-hidden group shadow-xl"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">👤</div>
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/60 text-[10px] font-black text-white backdrop-blur uppercase tracking-widest border border-white/10">
                      Member {i}
                    </div>
                    {i === 1 && <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-12 lg:py-10 space-y-8 lg:space-y-10 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isMe = msg.author === (user?.name ?? 'You')
                const showAuthor = idx === 0 || messages[idx - 1].author !== msg.author

                return (
                  <motion.div
                    key={msg.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    variants={messageVariants}
                    className={`flex gap-4 lg:gap-6 ${isMe ? 'flex-row-reverse text-right' : ''} ${!showAuthor ? 'mt-[-1.5rem] lg:mt-[-2rem]' : ''}`}
                  >
                    {showAuthor ? (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="h-10 w-10 lg:h-12 lg:w-12 rounded-2xl lg:rounded-3xl shrink-0 flex items-center justify-center text-xs lg:text-sm font-black text-white shadow-xl shadow-black/40 border border-white/10"
                        style={{ background: isMe ? '#312e81' : meta.color }}
                      >
                        {msg.author[0].toUpperCase()}
                      </motion.div>
                    ) : (
                      <div className="w-10 lg:w-12 shrink-0" />
                    )}

                    <div className={`max-w-[75%] lg:max-w-[65%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                      {showAuthor && (
                        <div className="flex items-center gap-3 px-2 mb-1">
                          <span className="text-[11px] lg:text-[13px] font-black text-white uppercase tracking-[0.15em] font-display">{msg.author}</span>
                          <span className="text-[10px] lg:text-[11px] font-bold text-slate-500 uppercase tracking-widest opacity-60">{msg.time}</span>
                        </div>
                      )}
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className={`px-6 py-4 lg:px-6 lg:py-4 rounded-3xl text-[15px] lg:text-base font-medium leading-relaxed shadow-lg
                          ${isMe
                            ? 'bg-primary-600 text-white rounded-tr-sm shadow-primary-900/20'
                            : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-sm hover:bg-white/[0.08] transition-colors shadow-inner'
                          }`}
                      >
                        {msg.text}
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            <div ref={bottomRef} className="h-4 lg:h-8" />
          </div>

          <div className="px-6 py-5 lg:px-10 lg:py-8 bg-black/30 backdrop-blur-3xl border-t border-white/5 shrink-0">
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-4 lg:gap-6 w-full mx-auto"
            >
              <div className="flex-1 relative group w-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Send a message to ${meta.label.split(' ')[1]}…`}
                  className="w-full pl-6 pr-16 lg:pr-20 py-4 lg:py-5 rounded-[1.5rem] bg-white/[0.04] border border-white/10 focus:border-primary-500/50 focus:bg-white/[0.08] outline-none text-sm
                   lg:text-[15px] text-white placeholder-slate-500 transition-all font-bold tracking-tight shadow-inner"
                />
                <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button type="button" className="p-2 text-slate-500 hover:text-white transition-colors text-lg lg:text-xl opacity-60 hover:opacity-100">😄</button>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={!input.trim()}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="h-14 w-14 lg:h-16 lg:w-16 flex items-center justify-center rounded-[1.5rem] lg:rounded-[1.75rem] text-white transition-all disabled:opacity-30 shadow-2xl shrink-0"
                style={{ background: meta.color }}
              >
                <svg className="w-6 h-6 lg:w-7 lg:h-7 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </form>
          </div>
        </div>

        <div className="hidden xl:flex w-80 lg:w-96 flex-col gap-8">
          <div className="glass rounded-[2.5rem] p-8 lg:p-10 border border-white/5 shadow-2xl">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Channel Stats</h3>
            <div className="space-y-6 lg:space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-[13px] font-bold text-slate-400">Total Members</p>
                <p className="text-[15px] font-black text-white px-3 py-1 rounded-lg bg-white/5 border border-white/10">42</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[13px] font-bold text-slate-400">Average Activity</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="h-3 w-1 bg-emerald-500 rounded-full" />
                    <div className="h-3 w-1 bg-emerald-500 rounded-full" />
                    <div className="h-3 w-1 bg-emerald-500/30 rounded-full" />
                  </div>
                  <p className="text-[15px] font-black text-emerald-400">High</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[13px] font-bold text-slate-400">Last Sync</p>
                <p className="text-[15px] font-black text-white">2m ago</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 list-none">Top Contributors</h4>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[11px]
                   lg:text-xs font-black text-slate-300 shadow-inner hover:bg-white/10 hover:scale-105 transition-all cursor-pointer">
                    {['A', 'B', 'C', 'D'][i - 1]}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-[2.5rem] p-8 lg:p-10 border border-white/5 shadow-2xl flex-1 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-[2rem] bg-primary-600/20 flex items-center justify-center text-3xl mb-6 border border-primary-500/20 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-500/20 animate-pulse" />
              <span className="relative z-10">🚀</span>
            </div>
            <h3 className="text-[15px] lg:text-base font-black text-white font-display mb-3 uppercase tracking-tight">Enterprise Mode</h3>
            <p className="text-[12px] lg:text-[13px] text-slate-500 font-medium leading-relaxed max-w-[200px]">
              All interactions are encrypted and stored in your private cloud workspace.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
