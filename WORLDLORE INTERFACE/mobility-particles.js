// Mobility Particles.js - Animated particles for mobility icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles for each mobility icon when they are visible in viewport
    initMobilityParticles();

    // Check for new icons when DOM changes (for dynamically added icons)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initMobilityParticles();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Function to initialize particles for all mobility icons
    function initMobilityParticles() {
        // 1. Dynamic Migration Insights Icon - People Flow
        document.querySelectorAll('.migration-insights-icon').forEach(icon => {
            if (!icon.classList.contains('particles-initialized')) {
                createMigrationParticles(icon);
                icon.classList.add('particles-initialized');
            }
        });

        // 2. AI-Powered Mobility Forecasts Icon - Predictive Graph
        document.querySelectorAll('.mobility-forecast-icon').forEach(icon => {
            if (!icon.classList.contains('particles-initialized')) {
                createForecastParticles(icon);
                icon.classList.add('particles-initialized');
            }
        });

        // 3. Policy Simulation Tools Icon - Interactive Model
        document.querySelectorAll('.policy-simulation-icon').forEach(icon => {
            if (!icon.classList.contains('particles-initialized')) {
                createPolicyParticles(icon);
                icon.classList.add('particles-initialized');
            }
        });

        // 4. Global Mobility Trends Icon - World Connections
        document.querySelectorAll('.global-trends-icon').forEach(icon => {
            if (!icon.classList.contains('particles-initialized')) {
                createTrendsParticles(icon);
                icon.classList.add('particles-initialized');
            }
        });
    }

    // 1. Create particles for Migration Insights Icon
    function createMigrationParticles(iconElement) {
        const particleCount = 8;
        const container = document.createElement('div');
        container.className = 'migration-particles-container';
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.top = '0';
        container.style.left = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '4';
        container.style.overflow = 'visible';
        
        // Create migration flow particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'migration-particle';
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.borderRadius = '50%';
            particle.style.background = 'rgba(56, 189, 248, 0.9)';
            particle.style.boxShadow = '0 0 4px rgba(56, 189, 248, 0.8), 0 0 6px rgba(56, 189, 248, 0.6)';
            particle.style.filter = 'blur(0.5px)';
            
            // Random starting position around the globe
            const angle = Math.random() * Math.PI * 2;
            const radius = 12 + Math.random() * 6; // Distance from center
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            
            particle.style.top = y + '%';
            particle.style.left = x + '%';
            
            // Animation properties
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 2;
            const scale = 0.8 + Math.random() * 0.8;
            
            particle.style.animation = `migrationParticleFlow ${duration}s infinite ease-in-out ${delay}s, migrationParticleGlow 2s infinite ease-in-out ${delay}s`;
            particle.style.transform = `scale(${scale})`;
            
            container.appendChild(particle);
        }
        
        iconElement.appendChild(container);
    }

    // 2. Create particles for Mobility Forecast Icon
    function createForecastParticles(iconElement) {
        const particleCount = 10;
        const container = document.createElement('div');
        container.className = 'forecast-particles-container';
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.top = '0';
        container.style.left = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '3';
        container.style.overflow = 'visible';
        
        // Create data point particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'forecast-particle';
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.borderRadius = '50%';
            particle.style.background = 'rgba(56, 189, 248, 0.9)';
            particle.style.boxShadow = '0 0 5px rgba(56, 189, 248, 0.8)';
            
            // Position along the graph line
            const xPos = 10 + (i * (80 / particleCount));
            const yPos = 70 - (Math.sin(i * 0.8) * 20) - (Math.random() * 10);
            
            particle.style.bottom = yPos + '%';
            particle.style.left = xPos + '%';
            
            // Animation properties
            const duration = 2 + Math.random();
            const delay = i * 0.2;
            
            particle.style.animation = `forecastParticleRise ${duration}s infinite ease-in-out ${delay}s, forecastParticleGlow 1.5s infinite ease-in-out ${delay}s`;
            
            container.appendChild(particle);
        }
        
        iconElement.appendChild(container);
    }

    // 3. Create particles for Policy Simulation Icon
    function createPolicyParticles(iconElement) {
        const particleCount = 12;
        const container = document.createElement('div');
        container.className = 'policy-particles-container';
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.top = '0';
        container.style.left = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '3';
        container.style.overflow = 'visible';
        
        // Create policy document particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'policy-particle';
            particle.style.position = 'absolute';
            
            // Alternate between square (document) and circle (data point) particles
            if (i % 2 === 0) {
                // Document-like particles
                particle.style.width = '3px';
                particle.style.height = '4px';
                particle.style.background = 'rgba(56, 189, 248, 0.8)';
                particle.style.boxShadow = '0 0 4px rgba(56, 189, 248, 0.7)';
            } else {
                // Data point particles
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.borderRadius = '50%';
                particle.style.background = 'rgba(56, 189, 248, 0.9)';
                particle.style.boxShadow = '0 0 5px rgba(56, 189, 248, 0.8)';
            }
            
            // Random position around the model nodes
            const angle = Math.random() * Math.PI * 2;
            const radius = 8 + Math.random() * 10;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            
            particle.style.top = y + '%';
            particle.style.left = x + '%';
            
            // Animation properties
            const duration = 4 + Math.random() * 3;
            const delay = Math.random() * 2;
            
            particle.style.animation = `policyParticleOrbit ${duration}s infinite linear ${delay}s, policyParticleGlow 2s infinite ease-in-out ${delay}s`;
            
            container.appendChild(particle);
        }
        
        iconElement.appendChild(container);
    }

    // 4. Create particles for Global Trends Icon
    function createTrendsParticles(iconElement) {
        const particleCount = 15;
        const container = document.createElement('div');
        container.className = 'trends-particles-container';
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.top = '0';
        container.style.left = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '4';
        container.style.overflow = 'visible';
        
        // Create global trend particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'trend-particle';
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.borderRadius = '50%';
            particle.style.background = 'rgba(56, 189, 248, 0.9)';
            particle.style.boxShadow = '0 0 5px rgba(56, 189, 248, 0.8)';
            particle.style.filter = 'blur(0.5px)';
            
            // Random position around the globe
            const angle = Math.random() * Math.PI * 2;
            const radius = 12 + Math.random() * 8;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            
            particle.style.top = y + '%';
            particle.style.left = x + '%';
            
            // Animation properties
            const duration = 6 + Math.random() * 6;
            const delay = Math.random() * 3;
            const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
            const scale = 0.7 + Math.random() * 0.6;
            
            particle.style.animation = `trendParticleFloat ${duration}s infinite ease-in-out ${delay}s, trendParticleGlow 2s infinite ease-in-out ${delay}s`;
            particle.style.animationDirection = direction;
            particle.style.transform = `scale(${scale})`;
            
            container.appendChild(particle);
        }
        
        iconElement.appendChild(container);
    }
});