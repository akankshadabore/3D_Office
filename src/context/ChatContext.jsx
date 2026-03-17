import { createContext, useContext, useState, useEffect } from 'react'

const ChatContext = createContext()

const SEED_MESSAGES = {
  engineering: [
    { id: 1, author: 'Alice', text: 'PR #42 is ready for review 🚀', time: '3:01 PM' },
    { id: 2, author: 'Bob', text: 'On it! Looks good so far.', time: '3:02 PM' },
  ],
  design: [
    { id: 1, author: 'Carol', text: 'New mocks in Figma — take a look!', time: '2:50 PM' },
  ],
  marketing: [
    { id: 1, author: 'Dave', text: 'Campaign going live at 5 PM.', time: '2:30 PM' },
  ],
  meeting: [
    { id: 1, author: 'Eve', text: 'Is everyone ready for the standup?', time: '2:00 PM' },
  ],
}

const BOT_PHRASES = [
  "That makes sense!",
  "Could you elaborate on that?",
  "I'll have to check the docs, but I think you're right.",
  "Great progress! Let's keep moving.",
  "Does anyone have a link to that Figma file?",
  "I'll be OOO for 15 mins, brb!",
]

export function ChatProvider({ children }) {
  const [roomMessages, setRoomMessages] = useState(SEED_MESSAGES)

  const sendRoomMessage = (roomId, text, author) => {
    const newMessage = {
      id: Date.now(),
      author: author,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setRoomMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage]
    }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const rooms = Object.keys(SEED_MESSAGES)
        const room = rooms[Math.floor(Math.random() * rooms.length)]
        const bots = ['Sarah', 'James', 'Elena', 'Mark']
        const bot = bots[Math.floor(Math.random() * bots.length)]

        const newMessage = {
          id: Date.now(),
          author: bot,
          text: BOT_PHRASES[Math.floor(Math.random() * BOT_PHRASES.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setRoomMessages(prev => ({
          ...prev,
          [room]: [...(prev[room] || []), newMessage]
        }))
      }
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChatContext.Provider value={{ roomMessages, sendRoomMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within a ChatProvider')
  return context
}
