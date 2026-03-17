import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { to: '/office', label: '🏢 Office' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="h-20 flex items-center justify-between px-6 py-12 lg:px-10 lg:py-5 glass-morphism border-b border-white/5 z-50">

      <Link
        to="/office"
        className="group flex items-center gap-4"
      >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20"
        >
          <span className="text-xl">🏢</span>
        </motion.div>
        <span className="text-2xl font-black tracking-tight font-display text-white">
          3D <span className="text-primary-400">OFFICE</span>
        </span>
      </Link>

      {user && (
        <div className="hidden md:flex items-center gap-3 p-1.5 bg-black/20 rounded-2xl border border-white/5">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-6 py-2.5 text-xs rounded-xl font-black tracking-widest uppercase transition-all ${isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <div className="flex items-center gap-5 lg:gap-8">
        {user ? (
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logged in as</span>
              <span className="text-sm font-bold text-white">{user.name}</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-11 w-11 rounded-full border-2 border-primary-500/30 p-0.5"
            >
              <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center text-sm font-black text-primary-400">
                {user.name[0].toUpperCase()}
              </div>
            </motion.div>

            <button
              onClick={handleLogout}
              className="px-2 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 border border-white/10 transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-8 py-13 text-sm rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-black tracking-wide shadow-xl shadow-primary-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
