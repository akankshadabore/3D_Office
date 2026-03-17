import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: email.split('@')[0] || 'User', email })
    navigate('/office')
  }

  return (
    <div className="flex items-center justify-center h-full bg-slate-950 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-10 glass-morphism rounded-[2.5rem] border border-white/10 shadow-2xl z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-primary-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-primary-600/20 border border-primary-400/30"
          >
            <span className="text-3xl">🏢</span>
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display uppercase mb-2">Welcome Back</h1>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest opacity-60 italic">Elite Virtual Workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Work Identity</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/5 focus:border-primary-500/50 focus:bg-white/[0.08] 
              outline-none text-sm text-white placeholder-slate-700 transition-all font-bold tracking-tight shadow-inner"
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Access Key</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/5 focus:border-primary-500/50 focus:bg-white/[0.08] outline-none text-sm text-white placeholder-slate-700 transition-all font-bold tracking-tight shadow-inner"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black tracking-[0.1em] uppercase shadow-xl shadow-primary-900/40 transition-all border border-primary-400/20"
            >
              Initialize Workspace
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-[11px] font-bold text-slate-500 uppercase tracking-widest opacity-40">
          Secure biometric encryption active
        </p>
      </motion.div>
    </div>
  )
}
