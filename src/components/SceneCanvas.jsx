import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, OrbitControls, RoundedBox, Sparkles, Stars, Text } from '@react-three/drei'
import { useRef } from 'react'

function TerminalCore() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.16
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.1
  })

  return (
    <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.7}>
      <group ref={groupRef}>
        <RoundedBox args={[4.1, 2.65, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color="#1b1712"
            metalness={0.48}
            roughness={0.34}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[3.74, 2.18]} />
          <meshBasicMaterial color="#090806" />
        </mesh>
        <mesh position={[-1.45, 0.88, 0.12]}>
          <sphereGeometry args={[0.06, 18, 18]} />
          <meshBasicMaterial color="#d6c3a5" />
        </mesh>
        <mesh position={[-1.25, 0.88, 0.12]}>
          <sphereGeometry args={[0.06, 18, 18]} />
          <meshBasicMaterial color="#7d6d58" />
        </mesh>
        <Text
          position={[-1.48, 0.46, 0.14]}
          fontSize={0.21}
          color="#f2e6d7"
          anchorX="left"
          anchorY="middle"
        >
          {'$ launch-portfolio'}
        </Text>
        <Text
          position={[-1.48, 0.08, 0.14]}
          fontSize={0.13}
          color="#d6c3a5"
          anchorX="left"
          anchorY="middle"
        >
          {'stack.init(["React", "Three", "CSS"])'}
        </Text>
        <Text
          position={[-1.48, -0.22, 0.14]}
          fontSize={0.13}
          color="#cdb89b"
          anchorX="left"
          anchorY="middle"
        >
          {'ui.render({ smooth: true, clean: true })'}
        </Text>
        <Text
          position={[-1.48, -0.52, 0.14]}
          fontSize={0.13}
          color="#b59b78"
          anchorX="left"
          anchorY="middle"
        >
          {'deploy.ready();'}
        </Text>
        <mesh position={[0, -1.62, -0.1]} rotation={[-0.74, 0, 0]}>
          <boxGeometry args={[2.8, 0.18, 1.2]} />
          <meshStandardMaterial color="#201a14" roughness={0.45} metalness={0.28} />
        </mesh>
      </group>
    </Float>
  )
}

function OrbitFrame() {
  const ringRef = useRef(null)

  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.18
  })

  return (
    <group ref={ringRef}>
      <Line
        points={[
          [-2.8, 0, 0],
          [-1.4, 1.4, 0],
          [1.2, 1.55, 0],
          [2.8, 0, 0],
          [1.3, -1.5, 0],
          [-1.4, -1.4, 0],
          [-2.8, 0, 0],
        ]}
        color="#d6c3a5"
        lineWidth={1.2}
        transparent
        opacity={0.8}
      />
    </group>
  )
}

function FloatingTag({ position, label }) {
  return (
    <Float speed={1.8} rotationIntensity={0.28} floatIntensity={1.05} position={position}>
      <group>
        <mesh>
          <boxGeometry args={[1.5, 0.42, 0.18]} />
          <meshStandardMaterial color="#1c1712" metalness={0.25} roughness={0.55} />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.12}
          color="#f4ebdf"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.pointer.x * 0.18
    groupRef.current.rotation.x = -state.pointer.y * 0.08
  })

  return (
    <>
      <color attach="background" args={['#050403']} />
      <fog attach="fog" args={['#050403', 8, 18]} />

      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 6, 3]} intensity={0.95} color="#dfccb2" />
      <pointLight position={[-3, 0, 3]} intensity={1.35} color="#d6c3a5" />
      <pointLight position={[2, -1, 2]} intensity={0.8} color="#8b7964" />

      <Stars radius={45} depth={25} count={1300} factor={2.2} saturation={0} fade />
      <Sparkles count={30} scale={6.5} size={2.1} speed={0.22} color="#d6c3a5" />

      <group ref={groupRef}>
        <OrbitFrame />
        <TerminalCore />
        <FloatingTag position={[-2.35, 1.35, -0.7]} label="React" />
        <FloatingTag position={[2.4, 1.05, -0.9]} label="UI" />
        <FloatingTag position={[2.1, -1.0, -0.7]} label="3D" />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.32}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}

export default function SceneCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 52 }} dpr={[1, 1.5]}>
      <Scene />
    </Canvas>
  )
}
