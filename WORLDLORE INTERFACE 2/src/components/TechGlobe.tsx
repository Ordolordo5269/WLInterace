import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSphereProps {
  count?: number;
}

// Componente principal de la esfera de partículas futurista
function ParticleSphere({ count = 15000 }: ParticleSphereProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  // Generar posiciones de partículas en forma esférica
  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const radius = 4;
    
    for (let i = 0; i < count; i++) {
      // Distribución esférica uniforme usando el método de Marsaglia
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    
    return { positions, originalPositions };
  }, [count]);
  
  // Animación de las partículas
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    
    // Rotación suave de la esfera
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    
    // Respuesta al mouse
    const mouseInfluence = 0.3;
    pointsRef.current.rotation.y += mouse.x * mouseInfluence * 0.01;
    pointsRef.current.rotation.x += mouse.y * mouseInfluence * 0.01;
    
    // Animación de pulsación y ondas sinusoidales
    if (positionAttribute && positionAttribute.array instanceof Float32Array) {
      const positions = positionAttribute.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Posiciones originales
        const originalX = originalPositions[i3];
        const originalY = originalPositions[i3 + 1];
        const originalZ = originalPositions[i3 + 2];
        
        // Calcular distancia desde el centro para efectos de onda
        const distance = Math.sqrt(originalX * originalX + originalY * originalY + originalZ * originalZ);
        
        // Efecto de pulsación global
        const pulsation = 1 + Math.sin(time * 2 + distance * 0.5) * 0.1;
        
        // Efecto de onda sinusoidal
        const wave = Math.sin(time * 3 + distance * 0.8 + originalY * 0.5) * 0.2;
        
        // Aplicar transformaciones
        positions[i3] = originalX * pulsation + wave * 0.3;
        positions[i3 + 1] = originalY * pulsation + wave * 0.2;
        positions[i3 + 2] = originalZ * pulsation + wave * 0.3;
      }
      
      positionAttribute.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Componente para partículas de acento brillantes
function AccentParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const radius = 4.5;
    
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.05;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.01}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Componente principal TechGlobe
const TechGlobe: React.FC = () => {
  
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'transparent'
        }}
      >
        {/* Iluminación suave y atmosférica */}
        <ambientLight intensity={0.1} color="#ffffff" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#00d4ff"
          castShadow
        />
        <pointLight
          position={[-5, -5, 5]}
          intensity={0.2}
          color="#ffffff"
        />
        <pointLight
          position={[0, 0, -10]}
          intensity={0.1}
          color="#00d4ff"
        />
        
        {/* Esfera principal de partículas */}
        <ParticleSphere count={3000} />
        
        {/* Partículas de acento */}
        <AccentParticles />
        
        {/* Niebla atmosférica */}
        <fog attach="fog" args={['#000011', 15, 30]} />
      </Canvas>
      
      {/* Overlay de información minimalista */}
      <div className="absolute bottom-4 right-4 text-white/50 text-xs font-mono tracking-wider">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span>WORLDLORE NEURAL INTERFACE</span>
        </div>
      </div>
    </div>
  );
};

export default TechGlobe;