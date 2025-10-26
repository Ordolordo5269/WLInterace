// Enhanced Particles.js - Advanced background effects for WorldLore
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'enhanced-particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    // Set canvas size
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Mouse position for interactive effects
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseRadius = 150; // Radius of mouse influence

    // Particle properties
    const particleCount = 100;
    const particles = [];
    const colors = [
        'rgba(144, 202, 249, 0.7)',  // Light blue
        'rgba(100, 181, 246, 0.6)',  // Medium blue
        'rgba(66, 165, 245, 0.5)',   // Blue
        'rgba(30, 136, 229, 0.4)',   // Darker blue
        'rgba(187, 222, 251, 0.5)'   // Very light blue
    ];

    // Create particles with enhanced properties
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.baseSize = this.size;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseDirection = 1;
            this.maxSize = this.size + 1.5;
            this.minSize = this.size - 0.5;
            this.currentSize = this.size;
            this.depth = Math.random() * 3; // For parallax effect
        }

        update() {
            // Move particles with depth-based speed (parallax effect)
            this.x += this.speedX * (this.depth * 0.5 + 0.5);
            this.y += this.speedY * (this.depth * 0.5 + 0.5);

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Calculate distance to mouse for interactive effects
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Interactive size change based on mouse proximity
            if (distance < mouseRadius) {
                const influence = 1 - distance / mouseRadius;
                this.currentSize = this.baseSize + influence * 2;
            } else {
                // Pulse size effect when not influenced by mouse
                this.currentSize += this.pulseSpeed * this.pulseDirection;
                if (this.currentSize >= this.maxSize || this.currentSize <= this.minSize) {
                    this.pulseDirection *= -1;
                }
            }
        }

        draw() {
            // Set shadow properties for glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            
            // Draw particle with depth-based opacity
            const depthOpacity = 0.3 + (this.depth / 3) * 0.7;
            const finalColor = this.color.replace(/[\d\.]+\)$/g, depthOpacity + ')');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
            ctx.fillStyle = finalColor;
            ctx.fill();
            
            // Reset shadow to avoid affecting other elements
            ctx.shadowBlur = 0;
        }
    }

    // Initialize particles
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        // Draw connection lines between nearby particles
        drawConnections();

        requestAnimationFrame(animate);
    }

    // Draw connections between particles that are close to each other
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Draw lines between particles that are close to each other
                // Line opacity depends on distance and particle depth
                if (distance < 100) {
                    const depthFactor = ((particles[i].depth + particles[j].depth) / 6);
                    const opacity = 0.15 * (1 - distance / 100) * depthFactor;
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(144, 202, 249, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Track mouse movement for interactive effects
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Start animation
    init();
    animate();
});