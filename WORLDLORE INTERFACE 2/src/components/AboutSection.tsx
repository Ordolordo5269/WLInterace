import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

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

const AboutSection = () => {
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
          forceAnimate: false,
          fps: 30,
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
      if (window.VANTA && typeof window.VANTA.WAVES === 'function') {
        initVanta();
        return;
      }

      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.onload = () => {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js';
        vantaScript.onload = () => {
          initVanta();
        };
        vantaScript.onerror = () => {
          console.warn('Failed to load Vanta WAVES script');
        };
        document.head.appendChild(vantaScript);
      };
      threeScript.onerror = () => {
        console.warn('Failed to load Three.js script');
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
      className="w-full min-h-screen flex items-center justify-center relative"
    >
      {/* Vanta Waves Background */}
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
        }}
      />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8)' }}>
            Understand the world like never before.
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto"
            style={{ textShadow: '0 0 15px rgba(0, 0, 0, 0.7)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            WorldLore is an AI-powered platform that analyzes conflicts, political shifts, and global innovation in real time. Our mission is to help you interpret the present and anticipate the future.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;