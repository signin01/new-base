import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';

function RotatingCube() {
  const meshRef = useRef();
  useFrame(() => { meshRef.current.rotation.x += 0.01; meshRef.current.rotation.y += 0.01; });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2,2,2]} />
      <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

const ThreeHero = () => {
  return (
    <div className="h-screen w-full relative">
      <Canvas camera={{ position: [0,0,5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10,10,10]} />
        <RotatingCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h1 className="text-white text-6xl font-bold">CollabFlow Pro</h1>
      </div>
    </div>
  );
};
export default ThreeHero;
