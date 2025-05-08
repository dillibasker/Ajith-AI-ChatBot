import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 100 }) => {
  const points = useRef<THREE.Points>(null);
  
  // Generate particles data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 0.1 + 0.05;
      const radius = Math.random() * 10 + 5; // Distance from center
      
      // Position particles in a sphere
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({ 
        position: [x, y, z],
        size,
        // Randomize the movement speed and direction
        factor: Math.random() * 0.5,
        speed: Math.random() * 0.2 + 0.05
      });
    }
    return temp;
  }, [count]);
  
  // Create buffer geometry and attributes
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position[0];
      positions[i * 3 + 1] = particle.position[1];
      positions[i * 3 + 2] = particle.position[2];
      sizes[i] = particle.size;
    });
    
    return [positions, sizes];
  }, [particles, count]);
  
  // Animation
  useFrame((state) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const particle = particles[i];
        
        // Move particles in a wavy pattern
        const time = state.clock.getElapsedTime();
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Calculate distance from origin
        const dist = Math.sqrt(x * x + y * y + z * z);
        
        // Get direction vector
        const dirX = x / dist;
        const dirY = y / dist;
        const dirZ = z / dist;
        
        // Apply wave effect
        const wave = Math.sin(time * particle.speed + dist * 0.2) * particle.factor;
        
        positions[i3] += dirX * wave * 0.01;
        positions[i3 + 1] += dirY * wave * 0.01;
        positions[i3 + 2] += dirZ * wave * 0.01;
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.8}
        color="#4f46e5"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};