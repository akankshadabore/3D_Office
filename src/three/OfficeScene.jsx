import { useState } from 'react'
import Desk from './Desk'

const ROOMS = [
  { id: 'engineering', label: 'Engineering', color: '#6366f1', position: [-5, 0, -5] },
  { id: 'marketing', label: 'Marketing', color: '#f59e0b', position: [5, 0, -5] },
  { id: 'design', label: 'Design', color: '#ec4899', position: [-5, 0, 5] },
  { id: 'meeting', label: 'Meeting', color: '#10b981', position: [5, 0, 5] },
]

export default function OfficeScene({ onRoomClick }) {
  const [hovered, setHovered] = useState(null)

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {ROOMS.map((room) => (
        <group key={room.id} position={room.position}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={(e) => {
              e.stopPropagation()
              onRoomClick(room.id)
            }}
            onPointerOver={() => {
              setHovered(room.id)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHovered(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial
              color={room.color}
              opacity={hovered === room.id ? 0.3 : 0.15}
              transparent
              emissive={room.color}
              emissiveIntensity={hovered === room.id ? 0.5 : 0}
            />
          </mesh>

          <Desk />

          {room.id === 'engineering' && (
            <>
              <Desk position={[2, 0, 2]} />
              <Desk position={[-2, 0, 2]} />
            </>
          )}

          {room.id === 'meeting' && (
            <mesh position={[0, 0.4, 0]} castShadow>
              <boxGeometry args={[3, 0.1, 5]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          )}
        </group>
      ))}

      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.1, 4, 20]} />
        <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
      </mesh>
      <mesh position={[0, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.1, 4, 20]} />
        <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
      </mesh>

      <mesh position={[0, 2, -11]} receiveShadow>
        <boxGeometry args={[22, 4, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[-11, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[22, 4, 0.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  )
}
