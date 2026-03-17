import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import VirtualOffice from './pages/VirtualOffice'
import Room from './pages/Room'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <ChatProvider>
        <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-200">
          <Navbar />
          <main className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/login"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <Login />
                    </motion.div>
                  }
                />

                <Route
                  path="/office"
                  element={
                    <ProtectedRoute>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="h-full w-full"
                      >
                        <VirtualOffice />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/room/:roomId"
                  element={
                    <ProtectedRoute>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="h-full w-full"
                      >
                        <Room />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />

                <Route path="/" element={<Navigate to="/office" replace />} />
                <Route path="*" element={<Navigate to="/office" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </ChatProvider>
    </AuthProvider>
  )
}

export default App
