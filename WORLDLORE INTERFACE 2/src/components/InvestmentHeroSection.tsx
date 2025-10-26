import { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

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

// Feature Badge Component
const FeatureBadge = memo(({ icon, text, delay }: { icon: string; text: string; delay: number }) => (
  <motion.div
    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-300"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.05, y: -2 }}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-white/90 font-medium text-sm md:text-base">{text}</span>
  </motion.div>
));

FeatureBadge.displayName = 'FeatureBadge';

// Advanced 3D Chart Dashboard Component
const ChartPlaceholder = memo(() => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const metrics = [
    { name: 'S&P 500', value: '6,090.27', change: '+24.8%', color: '#10b981' },
    { name: 'NASDAQ', value: '21,053.58', change: '+28.5%', color: '#3b82f6' },
    { name: 'BTC/USD', value: '$113,746', change: '-1.12%', color: '#ef4444' },
    { name: 'EUR/USD', value: '1.0520', change: '-4.8%', color: '#ef4444' }
  ];

  const chartData = [
    { x: 0, y: 120, volume: 0.3 },
    { x: 50, y: 95, volume: 0.7 },
    { x: 100, y: 75, volume: 0.5 },
    { x: 150, y: 60, volume: 0.9 },
    { x: 200, y: 45, volume: 0.6 },
    { x: 250, y: 35, volume: 0.8 },
    { x: 300, y: 25, volume: 0.4 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [metrics.length]);

  return (
    <div className="w-full h-full relative">
      {/* Main Dashboard Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/30 to-purple-900/40 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Header with Live Metrics */}
        <div className="relative z-10 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">AI Investment Dashboard</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Sample Data</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">$3.2M</div>
              <div className="text-green-400 text-sm font-semibold">+28.4% YTD</div>
            </div>
          </div>

          {/* Live Metrics Carousel */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-xl border transition-all duration-500 ${
                  currentMetric === index 
                    ? 'bg-white/10 border-white/30 shadow-lg' 
                    : 'bg-white/5 border-white/10'
                }`}
                animate={{
                  scale: currentMetric === index ? 1.05 : 1,
                  opacity: currentMetric === index ? 1 : 0.7,
                }}
              >
                <div className="text-white/80 text-xs font-medium">{metric.name}</div>
                <div className="text-white font-bold text-sm">{metric.value}</div>
                <div 
                  className="text-xs font-semibold"
                  style={{ color: metric.color }}
                >
                  {metric.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Trading Chart */}
        <div className="relative px-6 pb-6 flex-1">
          <div className="relative w-full h-40 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-white/10 overflow-hidden">
            {/* Chart Header - Compact */}
            <div className="absolute top-2 left-4 z-20">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-white/90">Portfolio Performance</div>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-400/30">
                  Example
                </span>
              </div>
              <div className="text-xs text-white/40">Last 6 months</div>
            </div>
            

            
            {/* Y-axis Price Scale - Minimal */}
            <div className="absolute left-0.5 top-12 bottom-8 flex flex-col justify-between text-xs text-white/40">
              <span>$4k</span>
              <span>$3.5k</span>
              <span>$3k</span>
              <span>$2.5k</span>
              <span>$2k</span>
            </div>

            <svg className="w-full h-full relative z-10" viewBox="0 0 500 160">
              <defs>
                {/* Clean Gradients */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Simplified Grid */}
              <g className="opacity-15">
                {[40, 80, 120].map((y, i) => (
                  <line
                    key={`h-grid-${i}`}
                    x1="60"
                    y1={y}
                    x2="440"
                    y2={y}
                    stroke="#64748b"
                    strokeWidth="0.5"
                    strokeDasharray="3,6"
                  />
                ))}
              </g>

              {/* Main Portfolio Line - Clean and Smooth */}
              <motion.path
                d="M 60 120 Q 120 100, 180 80 Q 240 60, 300 45 Q 360 30, 420 25"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {/* Area Fill under the curve */}
              <motion.path
                d="M 60 120 Q 120 100, 180 80 Q 240 60, 300 45 Q 360 30, 420 25 L 420 140 L 60 140 Z"
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />

              {/* Key Portfolio Milestones - Only the most important ones */}
              {[
                { x: 180, y: 80, value: '$2,890', month: 'Aug' },
                { x: 300, y: 45, value: '$3,120', month: 'Oct' },
                { x: 420, y: 25, value: '$3,350', month: 'Dec' }
              ].map((point, i) => (
                <motion.g key={`milestone-${i}`}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + i * 0.3 }}
                  />
                  <motion.text
                    x={point.x}
                    y={point.y - 12}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-blue-400"
                    style={{ fontSize: '11px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2 + i * 0.3 }}
                  >
                    {point.value}
                  </motion.text>
                </motion.g>
              ))}



              {/* AI Prediction Line - Better integrated */}
              <motion.path
                d="M 420 25 Q 450 20, 480 18"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="5,3"
                fill="none"
                opacity="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 3 }}
              />
              
              <motion.text
                x="485"
                y="15"
                className="text-xs font-medium fill-emerald-400"
                style={{ fontSize: '10px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 3.5 }}
              >
                $3,800
              </motion.text>
            </svg>
            
            {/* Time labels - Bottom, aligned with chart */}
            <div className="absolute bottom-1 left-16 right-16">
              <div className="flex justify-between text-white/50 text-xs">
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
            
            {/* Legend - Bottom right, separate */}
            <div className="absolute bottom-6 right-2">
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-0.5 bg-blue-400 rounded"></div>
                  <span className="text-white/50">Growth</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-0.5 bg-emerald-400 rounded"></div>
                  <span className="text-white/50">Forecast</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-10 px-6 pb-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/60">Price</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white/60">Trend</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/60">AI Prediction</span>
              </div>
            </div>
            <div className="text-white/60">
              Last updated: <span className="text-white">2s ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ChartPlaceholder.displayName = 'ChartPlaceholder';

const InvestmentHeroSection = () => {
  const ref = useRef(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isInView = useInView(ref, { once: true });

  // Feature badges data
  const features = [
    { icon: '📈', text: 'Real-time Market Analysis' },
    { icon: '🤖', text: 'AI-Powered Insights' },
    { icon: '🌍', text: 'Global Economic Trends' },
    { icon: '⚡', text: 'Instant Alerts & Signals' }
  ];

  useEffect(() => {
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
        });
      }
    };

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
          
          {/* Left Column - Investment Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -100, y: 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Main Headline */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
              style={{ 
                textShadow: '0 0 20px rgba(0, 170, 255, 0.5), 0 0 40px rgba(0, 170, 255, 0.3)',
                willChange: 'transform, opacity'
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.2,
                scale: { type: "spring", stiffness: 300, damping: 30 }
              }}
            >
              Understand Global Markets with AI
            </motion.h1>
            
            {/* Subheadline */}
            <motion.h2 
              className="text-xl md:text-2xl text-white/80 font-light mb-6"
              style={{ textShadow: '0 0 15px rgba(0, 0, 0, 0.7)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">WorldLore Investment AI</span> — your intelligent guide to stocks, crypto, and global finance.
            </motion.h2>
            
            {/* Description Paragraph */}
            <motion.p 
              className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-8"
              style={{ textShadow: '0 0 15px rgba(0, 0, 0, 0.7)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Visualize global markets in near real time. From indices and commodities to economic alerts — WorldLore interprets the data for you.
            </motion.p>
            
            {/* Feature Badges */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <FeatureBadge
                  key={index}
                  icon={feature.icon}
                  text={feature.text}
                  delay={1 + index * 0.1}
                />
              ))}
            </motion.div>
            
            {/* CTA Button */}
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-medium text-lg rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #6366f1)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                }}
              >
                Explore Investment AI
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Chart Visualization */}
          <motion.div
            className="flex items-center justify-center relative h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: 100, y: 50 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 100, y: 50 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-full h-full">
              <ChartPlaceholder />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

InvestmentHeroSection.displayName = 'InvestmentHeroSection';

export default InvestmentHeroSection;