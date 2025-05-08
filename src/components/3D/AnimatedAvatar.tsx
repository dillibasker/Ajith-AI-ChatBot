import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Avatar } from './Avatar';
import { Particles } from './Particles';

interface AnimatedAvatarProps {
  isTyping?: boolean;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ isTyping = false }) => {
  return (
    <Canvas shadows>
      <SceneSetup isTyping={isTyping} />
    </Canvas>
  );
};

const SceneSetup: React.FC<AnimatedAvatarProps> = ({ isTyping }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Position camera for optimal view
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <React.Suspense fallback={<LoadingFallback />}>
        <Avatar isTyping={isTyping} position={[0, -1, 0]} />
        <Particles count={500} />
        <Environment preset="city" />
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={5} 
        />
      </React.Suspense>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
};

const LoadingFallback: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  );
};