export default function Desk({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.06, 0.8]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>

      {[
        [-0.7, 0.375, -0.35],
        [0.7, 0.375, -0.35],
        [-0.7, 0.375, 0.35],
        [0.7, 0.375, 0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
          <meshStandardMaterial color="#57534e" />
        </mesh>
      ))}

      <mesh position={[0, 1.15, -0.25]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.03]} />
        <meshStandardMaterial color="#0f172a" emissive="#6366f1" emissiveIntensity={0.15} />
      </mesh>

      <mesh position={[0, 0.9, -0.25]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#44403c" />
      </mesh>

      <mesh position={[0, 0.45, 0.6]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, 0.75, 0.85]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.06]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  )
}
