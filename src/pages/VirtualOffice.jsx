import { Canvas } from '@react-three/fiber'
import { Environment, Html, CameraControls } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import OfficeScene from '../three/OfficeScene'
import Sidebar from '../components/Sidebar'

const ROOMS = [
  { id: 'engineering', label: '🔧 Engineering', position: [-5, 0, -5], color: '#6366f1' },
  { id: 'marketing', label: '📣 Marketing', position: [5, 0, -5], color: '#f59e0b' },
  { id: 'design', label: '🎨 Design', position: [-5, 0, 5], color: '#ec4899' },
  { id: 'meeting', label: '🤝 Meeting Room', position: [5, 0, 5], color: '#10b981' },
]

function RoomSign({ id, label, position, color }) {
  const navigate = useNavigate()
  return (
    <Html position={[position[0], position[1] + 2.5, position[2]]} center distanceFactor={10}>
      <motion.button
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(`/room/${id}`)}
        className="px-6 py-3 text-sm font-black uppercase tracking-widest rounded-2xl whitespace-nowrap shadow-2xl transition-all border border-white/20 backdrop-blur-xl"
        style={{ background: `${color}ee`, color: '#fff', cursor: 'pointer' }}
      >
        {label}
      </motion.button>
    </Html>
  )
}

export default function VirtualOffice() {
  const navigate = useNavigate()
  const controlsRef = useRef()

  const resetCamera = () => {
    controlsRef.current?.setLookAt(12, 10, 12, 0, 0, 0, true)
  }

  return (
    <div className="flex h-full w-full bg-slate-950 overflow-hidden">
      <Sidebar />

      <div className="flex-1 relative">

        <div className="absolute top-8 left-8 right-8 z-10 flex justify-between items-start pointer-events-none">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 glass-morphism rounded-[2rem] max-w-sm pointer-events-auto shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-2.5 w-2.5  rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
              <h1 className="text-xl font-black text-white tracking-tight font-display uppercase">Command Center</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner text-md">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Active Rooms</p>
                <p className="text-xl font-black text-white font-display">4 <span className="text-slate-500 text-lg">/ 4</span></p>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Colleagues</p>
                <p className="text-2xl font-black text-white font-display">12</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
              Welcome back to your digital headquarters. Click on any department floor to jump into the action.
            </p>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={resetCamera}
              className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] rounded-xl bg-white/5 border border-white/10 text-white transition-all shadow-xl hover:shadow-2xl"
            >
              Recenter Perspective
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 pointer-events-auto"
          >
            <div className="px-5 py-2.5 rounded-2xl glass-morphism flex items-center gap-4 shadow-xl">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-md">
                    {['JD', 'SM', 'RT'][i - 1]}
                  </div>
                ))}
              </div>
              <span className="text-xs text-white/70 font-black uppercase tracking-widest">+9 ONLINE</span>
            </div>
          </motion.div>
        </div>

        <Canvas shadows camera={{ position: [12, 10, 12], fov: 45 }} className="!absolute inset-0">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

          <OfficeScene onRoomClick={(id) => navigate(`/room/${id}`)} />

          {ROOMS.map((room) => (
            <RoomSign key={room.id} {...room} />
          ))}

          <CameraControls
            ref={controlsRef}
            minDistance={5}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
          />

          <Environment preset="night" />
        </Canvas>
      </div>
    </div>
  )
}
