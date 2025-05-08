import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarProps {
  isTyping?: boolean;
  position?: [number, number, number];
}

export const Avatar: React.FC<AvatarProps> = ({ 
  isTyping = false,
  position = [0, 0, 0] 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  // Animate the avatar based on typing state
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      
      // Rotate slightly based on mouse position
      const mouseX = state.mouse.x * 0.1;
      const mouseY = state.mouse.y * 0.1;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY,
        0.05
      );
    }

    if (headRef.current && isTyping) {
      // Small head movement when typing
      headRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 10) * 0.05;
    }

    if (bodyRef.current && isTyping) {
      // Subtle "breathing" effect when typing
      bodyRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 8) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Stylized Avatar - since we don't have a real 3D model, we'll create a simple placeholder */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={isTyping ? "#4f46e5" : "#6366f1"} 
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      
      <mesh ref={bodyRef} position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 1, 16, 32]} />
        <meshStandardMaterial 
          color="#2a2a2a"
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <group position={[0, 1.5, 0.3]}>
        <mesh position={[-0.15, 0, 0.2]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.15, 0, 0.2]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[-0.15, 0, 0.28]}>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.15, 0, 0.28]}>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      
      {/* Glowing aura effect */}
      <pointLight position={[0, 1.5, 0]} distance={3} intensity={1} color="#4f46e5" />
    </group>
  );
};