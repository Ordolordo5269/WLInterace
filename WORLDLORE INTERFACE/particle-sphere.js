// Particle Sphere Animation for WorldLore
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle spheres when DOM is loaded
    initParticleSpheres();
});

function initParticleSpheres() {
    // Find all globe containers and replace with particle spheres
    const globeContainers = document.querySelectorAll('.globe-container');
    
    globeContainers.forEach((container, index) => {
        // Remove existing globe elements
        container.innerHTML = '';
        
        // Create canvas for particle sphere
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-sphere-canvas';
        canvas.id = `particle-sphere-${index}`;
        canvas.width = 200;
        canvas.height = 200;
        container.appendChild(canvas);
        
        // Initialize the particle sphere
        createParticleSphere(canvas, index);
    });
}

function createParticleSphere(canvas, sphereIndex) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2.5;
    
    // Particle properties
    const particles = [];
    const particleCount = 150;
    const colors = [
        'rgba(144, 202, 249, 0.8)',  // Light blue
        'rgba(100, 181, 246, 0.7)',  // Medium blue
        'rgba(66, 165, 245, 0.6)',   // Blue
        'rgba(30, 136, 229, 0.5)',   // Darker blue
        'rgba(187, 222, 251, 0.7)'   // Very light blue
    ];
    
    // Create particles distributed on a sphere
    for (let i = 0; i < particleCount; i++) {
        // Use spherical coordinates to position particles
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        
        // Convert to cartesian coordinates
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);
        
        // Add some randomness to positions
        x += (Math.random() - 0.5) * 10;
        y += (Math.random() - 0.5) * 10;
        z += (Math.random() - 0.5) * 10;
        
        particles.push({
            x: x,
            y: y,
            z: z,
            size: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 0.01 + 0.005,
            rotationSpeed: Math.random() * 0.01 + 0.005,
            angle: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulseDirection: Math.random() > 0.5 ? 1 : -1,
            maxSize: Math.random() * 2 + 2,
            minSize: Math.random() * 0.5 + 0.5,
            currentSize: Math.random() * 2 + 1,
            dataPoint: Math.random() > 0.9 // Some particles are data points
        });
    }
    
    // Add data flow lines
    const dataFlows = [];
    const dataFlowCount = 5;
    
    for (let i = 0; i < dataFlowCount; i++) {
        const startAngle = Math.random() * Math.PI * 2;
        const endAngle = startAngle + (Math.random() * Math.PI);
        
        dataFlows.push({
            startAngle: startAngle,
            endAngle: endAngle,
            progress: 0,
            speed: Math.random() * 0.02 + 0.01,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 1.5 + 0.5
        });
    }
    
    // Animation variables
    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Slowly rotate the entire sphere
        rotationX += 0.002;
        rotationY += 0.003;
        rotationZ += 0.001;
        
        // Sort particles by z-coordinate for proper depth rendering
        particles.sort((a, b) => b.z - a.z);
        
        // Draw connections between nearby particles
        drawConnections();
        
        // Draw data flows
        drawDataFlows();
        
        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Rotate particle around the sphere
            p.angle += p.rotationSpeed;
            
            // Apply 3D rotation to the particle
            const rotatedX = p.x * Math.cos(rotationY) - p.z * Math.sin(rotationY);
            const rotatedZ = p.x * Math.sin(rotationY) + p.z * Math.cos(rotationY);
            const rotatedY = p.y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
            const finalZ = p.y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
            
            // Project 3D coordinates to 2D screen
            const scale = 400 / (400 + finalZ);
            const projectedX = centerX + rotatedX * scale;
            const projectedY = centerY + rotatedY * scale;
            
            // Update particle size with pulsing effect
            p.currentSize += p.pulseSpeed * p.pulseDirection;
            if (p.currentSize >= p.maxSize || p.currentSize <= p.minSize) {
                p.pulseDirection *= -1;
            }
            
            // Calculate size based on z-coordinate (depth)
            const sizeScale = scale * p.currentSize;
            
            // Draw particle with glow effect
            ctx.beginPath();
            ctx.arc(projectedX, projectedY, sizeScale, 0, Math.PI * 2);
            
            // Special styling for data points
            if (p.dataPoint) {
                // Create gradient for data points
                const gradient = ctx.createRadialGradient(
                    projectedX, projectedY, 0,
                    projectedX, projectedY, sizeScale * 2
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                gradient.addColorStop(0.5, p.color);
                gradient.addColorStop(1, 'rgba(30, 136, 229, 0)');
                
                ctx.fillStyle = gradient;
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
            } else {
                // Regular particles
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 5;
                ctx.shadowColor = p.color;
            }
            
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        
        requestAnimationFrame(animate);
    }
    
    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                // Calculate 3D distance
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dz = p1.z - p2.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                // Only connect particles that are close to each other
                if (distance < radius * 0.5) {
                    // Apply 3D rotation to both particles
                    const p1RotatedX = p1.x * Math.cos(rotationY) - p1.z * Math.sin(rotationY);
                    const p1RotatedZ = p1.x * Math.sin(rotationY) + p1.z * Math.cos(rotationY);
                    const p1RotatedY = p1.y * Math.cos(rotationX) - p1RotatedZ * Math.sin(rotationX);
                    const p1FinalZ = p1.y * Math.sin(rotationX) + p1RotatedZ * Math.cos(rotationX);
                    
                    const p2RotatedX = p2.x * Math.cos(rotationY) - p2.z * Math.sin(rotationY);
                    const p2RotatedZ = p2.x * Math.sin(rotationY) + p2.z * Math.cos(rotationY);
                    const p2RotatedY = p2.y * Math.cos(rotationX) - p2RotatedZ * Math.sin(rotationX);
                    const p2FinalZ = p2.y * Math.sin(rotationX) + p2RotatedZ * Math.cos(rotationX);
                    
                    // Project to 2D
                    const scale1 = 400 / (400 + p1FinalZ);
                    const scale2 = 400 / (400 + p2FinalZ);
                    
                    const x1 = centerX + p1RotatedX * scale1;
                    const y1 = centerY + p1RotatedY * scale1;
                    const x2 = centerX + p2RotatedX * scale2;
                    const y2 = centerY + p2RotatedY * scale2;
                    
                    // Calculate opacity based on distance and z-position
                    const avgZ = (p1FinalZ + p2FinalZ) / 2;
                    const zFactor = (400 - Math.min(Math.max(avgZ, -200), 200)) / 400;
                    const opacity = (1 - distance / (radius * 0.5)) * 0.5 * zFactor;
                    
                    // Draw connection line
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = `rgba(144, 202, 249, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Draw data flow animations
    function drawDataFlows() {
        for (let i = 0; i < dataFlows.length; i++) {
            const flow = dataFlows[i];
            
            // Update flow progress
            flow.progress += flow.speed;
            if (flow.progress > 1) {
                // Reset flow with new random parameters
                flow.startAngle = Math.random() * Math.PI * 2;
                flow.endAngle = flow.startAngle + (Math.random() * Math.PI);
                flow.progress = 0;
                flow.speed = Math.random() * 0.02 + 0.01;
                flow.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            // Calculate current position on the sphere
            const currentAngle = flow.startAngle + (flow.endAngle - flow.startAngle) * flow.progress;
            const x = radius * Math.cos(currentAngle);
            const y = radius * Math.sin(currentAngle);
            
            // Apply 3D rotation
            const rotatedX = x * Math.cos(rotationY) - 0 * Math.sin(rotationY);
            const rotatedZ = x * Math.sin(rotationY) + 0 * Math.cos(rotationY);
            const rotatedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
            const finalZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
            
            // Project to 2D
            const scale = 400 / (400 + finalZ);
            const projectedX = centerX + rotatedX * scale;
            const projectedY = centerY + rotatedY * scale;
            
            // Draw data flow point
            ctx.beginPath();
            ctx.arc(projectedX, projectedY, flow.size * scale * 2, 0, Math.PI * 2);
            
            // Create gradient for glow effect
            const gradient = ctx.createRadialGradient(
                projectedX, projectedY, 0,
                projectedX, projectedY, flow.size * scale * 4
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.5, flow.color);
            gradient.addColorStop(1, 'rgba(30, 136, 229, 0)');
            
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 15;
            ctx.shadowColor = flow.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Draw trail
            const trailLength = 0.2;
            const trailSteps = 10;
            
            for (let j = 1; j <= trailSteps; j++) {
                const trailProgress = flow.progress - (j / trailSteps) * trailLength;
                
                if (trailProgress > 0) {
                    const trailAngle = flow.startAngle + (flow.endAngle - flow.startAngle) * trailProgress;
                    const trailX = radius * Math.cos(trailAngle);
                    const trailY = radius * Math.sin(trailAngle);
                    
                    // Apply 3D rotation
                    const trailRotatedX = trailX * Math.cos(rotationY) - 0 * Math.sin(rotationY);
                    const trailRotatedZ = trailX * Math.sin(rotationY) + 0 * Math.cos(rotationY);
                    const trailRotatedY = trailY * Math.cos(rotationX) - trailRotatedZ * Math.sin(rotationX);
                    const trailFinalZ = trailY * Math.sin(rotationX) + trailRotatedZ * Math.cos(rotationX);
                    
                    // Project to 2D
                    const trailScale = 400 / (400 + trailFinalZ);
                    const trailProjectedX = centerX + trailRotatedX * trailScale;
                    const trailProjectedY = centerY + trailRotatedY * trailScale;
                    
                    // Draw trail point with fading opacity
                    const trailOpacity = (1 - j / trailSteps) * 0.5;
                    const trailSize = flow.size * trailScale * (1 - j / trailSteps);
                    
                    ctx.beginPath();
                    ctx.arc(trailProjectedX, trailProjectedY, trailSize, 0, Math.PI * 2);
                    ctx.fillStyle = flow.color.replace(/[\d\.]+\)$/g, trailOpacity + ')');
                    ctx.fill();
                }
            }
        }
    }
    
    // Start animation
    animate();
}