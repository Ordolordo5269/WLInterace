import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, Suspense, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Vanta.js type declarations
declare global {
  interface Window {
    VANTA: {
      WAVES: (options: any) => {
        destroy: () => void;
        resize: () => void;
      };
    };
  }
}

// Continental Particles Component - Optimized with memo
const ContinentalParticles = memo(({ inView, phase }: { inView: boolean; phase: number }) => {
  const [particles, setParticles] = useState<Float32Array | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  const { opacity } = useSpring({
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Phase-based particle configurations - Enhanced visibility for continents
  const getPhaseParticleConfig = useCallback((phase: number) => {
    switch (phase) {
      case 0:
        return { maxPoints: 18000, samplingRate: 1, color: '#4ecdc4', size: 0.035 };
      case 1:
        return { maxPoints: 20000, samplingRate: 1, color: '#4ecdc4', size: 0.035 };
      case 2:
        return { maxPoints: 22000, samplingRate: 1, color: '#4ecdc4', size: 0.035 };
      case 3:
        return { maxPoints: 24000, samplingRate: 1, color: '#4ecdc4', size: 0.035 };
      default:
        return { maxPoints: 18000, samplingRate: 1, color: '#4ecdc4', size: 0.035 };
    }
  }, []);

  const processGeoData = useCallback((data: any) => {
    const points: number[] = [];
    let pointCount = 0;
    const config = getPhaseParticleConfig(phase);
    
    data.features.forEach((feature: any) => {
      if (pointCount >= config.maxPoints) return;
      
      const processCoordinates = (coords: number[][]) => {
        coords.forEach((coord: number[], index: number) => {
          if (pointCount >= config.maxPoints || index % config.samplingRate !== 0) return;
          
          const [lng, lat] = coord;
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lng + 180) * (Math.PI / 180);
          const radius = 2.23;
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          
          points.push(x, y, z);
          pointCount++;
        });
      };
      
      if (feature.geometry.type === 'Polygon') {
        processCoordinates(feature.geometry.coordinates[0]);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((polygon: any) => {
          processCoordinates(polygon[0]);
        });
      }
    });
    
    return new Float32Array(points);
  }, [phase]);

  useEffect(() => {
    let isMounted = true;
    
    fetch('/world.geo.json')
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          const processedParticles = processGeoData(data);
          setParticles(processedParticles);
        }
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
      
    return () => { isMounted = false; };
  }, [processGeoData]);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      // Dynamic rotation based on phase with smooth transitions
      pointsRef.current.rotation.y = time * (0.03 + phase * 0.01);
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * (0.02 + phase * 0.005);
      pointsRef.current.rotation.z = Math.cos(time * 0.015) * (phase * 0.003);
    }
  });

  if (!particles) return null;

  const config = getPhaseParticleConfig(phase);

  return (
    <animated.points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <animated.pointsMaterial
        size={config.size}
        color={config.color}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </animated.points>
  );
});

// AI Core Sphere Component - Optimized with memo
const AICoreOrb = memo(({ inView, phase }: { inView: boolean; phase: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const { scale } = useSpring({
    scale: inView ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Memoize geometry to avoid recreation
  const mainSphereGeometry = useMemo(() => new THREE.SphereGeometry(2.2, 32, 32), []);

  // Phase-based animations - Enhanced visibility for early phases
  const getPhaseAnimations = (phase: number) => {
    switch (phase) {
      case 0:
        return { speed: 0.15, intensity: 0.8, color: '#00aaff' };
      case 1:
        return { speed: 0.25, intensity: 0.9, color: '#8a2be2' };
      case 2:
        return { speed: 0.35, intensity: 1.0, color: '#ff6b6b' };
      case 3:
        return { speed: 0.45, intensity: 1.0, color: '#4ecdc4' };
      default:
        return { speed: 0.15, intensity: 0.8, color: '#00aaff' };
    }
  };

  const phaseAnim = getPhaseAnimations(phase);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      // Dynamic rotation based on phase with smooth transitions
      meshRef.current.rotation.y = time * phaseAnim.speed;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * (0.03 + phase * 0.01);
      meshRef.current.rotation.z = Math.cos(time * 0.08) * (0.02 + phase * 0.005);
    }
    if (groupRef.current) {
      // Phase-based group rotation with enhanced smoothness
      groupRef.current.rotation.y = time * (0.02 + phase * 0.01);
      groupRef.current.rotation.x = Math.sin(time * 0.05) * (phase * 0.01);
    }
  });

  const { scale: pulseScale } = useSpring({
    from: { scale: 1 },
    to: { scale: 1.02 + phase * 0.01 },
    loop: { reverse: true },
    config: { duration: 1500 - phase * 200 },
    pause: false
  });

  return (
    <animated.group ref={groupRef} scale={scale}>
      {/* Main AI Globe Sphere with clean appearance */}
      <animated.mesh ref={meshRef} position={[0, 0, 0]} geometry={mainSphereGeometry} scale={pulseScale}>
        <meshStandardMaterial
            color="#1a1a2e"
            roughness={0.3}
            metalness={0.1}
            emissive={phaseAnim.color}
            emissiveIntensity={phaseAnim.intensity}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
      </animated.mesh>
      
      {/* Unified subtle glow effect for all phases */}
        <animated.mesh position={[0, 0, 0]} geometry={mainSphereGeometry} scale={pulseScale}>
          <meshStandardMaterial
              color={phaseAnim.color}
              roughness={1.0}
              metalness={0}
              emissive={phaseAnim.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.05}
              depthWrite={false}
            />
        </animated.mesh>
    </animated.group>
  );
});



// Main 3D Scene - Memoized for performance
const AIScene = memo(({ inView, phase }: { inView: boolean; phase: number }) => {
  // Memoize lights to avoid recreation - Enhanced for better visibility
  const lights = useMemo(() => (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#0088ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00aaff" />
      <pointLight position={[0, 15, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 0, 15]} intensity={0.7} color="#4ecdc4" />
    </>
  ), []);

  return (
    <>
      {lights}
      <AICoreOrb inView={inView} phase={phase} />
      <ContinentalParticles inView={inView} phase={phase} />
      <Environment preset="night" />
    </>
  );
});

// Lazy Canvas Component for better performance
const LazyCanvas = memo(({ children, ...props }: any) => (
  <Canvas {...props}>
    {children}
  </Canvas>
));

// Memoize AIScene to prevent unnecessary re-renders
const MemoizedAIScene = memo(({ inView, phase }: { inView: boolean; phase: number }) => <AIScene inView={inView} phase={phase} />);

const EducationalSection = () => {
  const [phase, setPhase] = useState(0); // 0: initial, 1-3: additional phases
  const totalPhases = 4;

  const handleNext = useCallback(() => {
    setPhase((prev) => Math.min(prev + 1, totalPhases - 1));
  }, [totalPhases]);

  const handleEnterWorldLore = useCallback(() => {
    // Aquí puedes añadir la lógica para navegar a la aplicación principal
    console.log('Entering WorldLore...');
    // Por ejemplo: window.location.href = '/dashboard' o router.push('/dashboard')
  }, []);

  const handleBack = useCallback(() => {
    setPhase((prev) => Math.max(prev - 1, 0));
  }, []);

  // Content for each phase - Memoized to prevent recreation
  const phaseContent = useMemo(() => ({
    0: {
      title: 'Empower your understanding with our Educational AI Core.',
      content: (
        <>
          <p>
            WorldLore is not just a platform – it's your mentor. Our AI-powered educational system helps users of all backgrounds interpret geopolitical, social, and economic data with clarity.
          </p>
          
          <p>
            From students to analysts, the platform simplifies complex global events through guided learning, real-time case studies, and smart visual breakdowns.
          </p>
          
          <motion.p 
            className="text-xl md:text-2xl font-normal text-white"
            style={{ 
              textShadow: '0 0 20px rgba(138, 43, 226, 0.6)' 
            }}
          >
            Scroll down to start your learning journey.
          </motion.p>
        </>
      )
    },
    1: {
      title: 'Explore real-time global knowledge.',
      content: (
        <>
          <p>
            AI-interpreted data maps and stories explain what's happening — and why it matters.
          </p>
          <p>
            Our advanced algorithms process thousands of data points to provide you with comprehensive insights into global events, economic trends, and geopolitical shifts — all updated in real time.
          </p>
          <p>
            With our <span className="text-white font-semibold">Conflict Tracker module</span>, users can explore <span className="text-white font-semibold">ongoing military and geopolitical conflicts</span> worldwide. This feature highlights zones of active tension, involved parties, humanitarian consequences, and escalation risks. Interactive filters allow sorting by region, severity, or conflict type, while our AI provides tailored summaries for any user — from students to professionals.
          </p>
        </>
      )
    },
    2: {
      title: 'Interactive Learning Experience.',
      content: (
        <>
          <p>
            Engage with dynamic visualizations and interactive case studies that adapt to your learning pace and interests.
          </p>
          <p>
            From beginner-friendly explanations to expert-level analysis, WorldLore scales with your knowledge and curiosity.
          </p>
        </>
      )
    },
    3: {
      title: 'Join the Global Community.',
      content: (
        <>
          <p>
            Connect with learners, researchers, and analysts from around the world. Share insights, discuss trends, and collaborate on understanding our complex world.
          </p>
          <p>
            Ready to transform how you understand global events? Start your journey with WorldLore today.
          </p>
        </>
      )
    }
  }), []);
  const ref = useRef(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    // Function to initialize Vanta effect
    const initVanta = () => {
      if (vantaRef.current && window.VANTA && typeof window.VANTA.WAVES === 'function') {
        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x030d14,
          shininess: 30.00,
          waveHeight: 15.00,
          waveSpeed: 0.75,
          zoom: 0.65,
          forceAnimate: true, // Forzar animación
          fps: 30, // Aumentar FPS
          material: {
            options: {
              fog: true,
              wireframe: false
            }
          }
        });
      }
    };

    // Function to load Vanta.js scripts
    const loadVantaScripts = () => {
      // Limpiar scripts anteriores si existen
      const existingThreeScript = document.querySelector('script[src*="three.min.js"]');
      const existingVantaScript = document.querySelector('script[src*="vanta.waves.min.js"]');
      
      if (existingThreeScript) {
        existingThreeScript.remove();
      }
      
      if (existingVantaScript) {
        existingVantaScript.remove();
      }
      
      if (window.VANTA && typeof window.VANTA.WAVES === 'function') {
        initVanta();
        return;
      }

      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.onload = () => {
        console.log('Three.js loaded successfully');
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js';
        vantaScript.onload = () => {
          console.log('Vanta WAVES loaded successfully');
          initVanta();
        };
        vantaScript.onerror = (e) => {
          console.error('Failed to load Vanta WAVES script:', e);
        };
        document.head.appendChild(vantaScript);
      };
      threeScript.onerror = (e) => {
        console.error('Failed to load Three.js script:', e);
      };
      document.head.appendChild(threeScript);
    };

    loadVantaScripts();

    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section 
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Vanta Waves Background */}
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Educational Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -100, y: 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ willChange: 'transform, opacity' }}
          >
            <AnimatePresence mode="wait">
              <motion.h2 
                key={`title-${phase}`}
                className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight"
                style={{ 
                  textShadow: '0 0 20px rgba(138, 43, 226, 0.5), 0 0 40px rgba(138, 43, 226, 0.3)',
                  willChange: 'transform, opacity'
                }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  duration: 0.7, 
                  ease: "easeOut",
                  scale: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >
                {phaseContent[phase as keyof typeof phaseContent]?.title}
              </motion.h2>
            </AnimatePresence>
            
            <motion.div 
              className="space-y-4 text-lg md:text-xl text-white/90 leading-relaxed font-light"
              style={{ textShadow: '0 0 15px rgba(0, 0, 0, 0.7)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`desc-${phase}`}
                  className="space-y-4"
                  style={{ willChange: 'transform, opacity' }}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut", 
                    delay: 0.3,
                    scale: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  {phaseContent[phase as keyof typeof phaseContent]?.content}
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <motion.div 
                className="flex justify-center items-center mt-8 min-h-[60px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex gap-4">
                  {/* Back Button - Conditionally rendered */}
                  {phase > 0 && (
                    <button
                      onClick={handleBack}
                      className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-light text-lg rounded-full hover:shadow-[0_0_20px_rgba(128,128,128,0.5)] transition-all duration-300"
                    >
                      Back
                    </button>
                  )}
                  
                  {/* Next Button - Conditionally rendered */}
                  {phase < totalPhases - 1 && (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-light text-lg rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-300"
                    >
                      Next
                    </button>
                  )}
                  
                  {/* Enter WorldLore Button - Conditionally rendered */}
                  {phase === totalPhases - 1 && (
                    <button
                      onClick={handleEnterWorldLore}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-light text-lg rounded-full hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all duration-300"
                    >
                      Enter WorldLore
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - 3D AI Scene */}
          <motion.div
            className="flex items-center justify-center relative h-96"
            initial={{ opacity: 0, x: 100, y: 50 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 100, y: 50 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-full h-full" style={{ transform: 'translateZ(0)' }}>
              <LazyCanvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]} // Optimized pixel ratio
                performance={{ min: 0.6 }} // Better performance threshold
                gl={{ 
                  antialias: false, 
                  alpha: true, 
                  powerPreference: "high-performance",
                  stencil: false,
                  depth: false
                }}
                frameloop="always" // Render continuously for better visibility
              >
                <Suspense fallback={null}>
                  <MemoizedAIScene inView={true} phase={phase} />
                </Suspense>
              </LazyCanvas>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

EducationalSection.displayName = 'EducationalSection';

export default EducationalSection;