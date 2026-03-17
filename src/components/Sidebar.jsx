import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const menuItems = [
  { icon: '🏢', label: 'Office', to: '/office' },
  { icon: '🔧', label: 'Engineering', to: '/room/engineering' },
  { icon: '📣', label: 'Marketing', to: '/room/marketing' },
  { icon: '🎨', label: 'Design', to: '/room/design' },
  { icon: '🤝', label: 'Meeting', to: '/room/meeting' },
]

const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

export default function Sidebar() {
  return (
    <motion.aside 
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-20 lg:w-[300px] glass-morphism border-r border-white/5 flex flex-col py-8 gap-4 shrink-0 z-20"
    >
      <div className="px-10 mb-6 hidden lg:block">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Workspace Navigation</h2>
      </div>
      
      <div className="flex-1 flex flex-col gap-3 px-4 lg:px-6">
        {menuItems.map((item) => (
          <motion.div key={item.label} variants={itemVariants}>
            <NavLink
              to={item.to}
              className={({ isActive }) => `
                flex items-center lg:gap-5 justify-center lg:justify-start px-2 lg:px-6 py-4 lg:py-4 text-base rounded-[1.25rem] transition-all font-bold group
                ${isActive
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20 shadow-lg shadow-primary-900/10'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                }
              `}
            >
              <motion.span 
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-2xl shrink-0"
              >
                {item.icon}
              </motion.span>
              <span className="hidden lg:inline font-display text-[15px] tracking-tight">{item.label}</span>
              
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `hidden lg:block ml-auto h-2 w-2 rounded-full bg-primary-400 transition-all duration-300 ${isActive ? 'opacity-100 scale-100 shadow-[0_0_12px_rgba(99,102,241,0.6)]' : 'opacity-0 scale-0'}`
                }
              />
            </NavLink>
          </motion.div>
        ))}
      </div>

      <div className="px-6 pt-8 border-t border-white/5 hidden lg:block">
        <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 shadow-inner">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Network Status</p>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <p className="text-[13px] font-bold text-white tracking-wide">System Online</p>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
