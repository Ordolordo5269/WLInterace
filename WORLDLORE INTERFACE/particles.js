// Particles.js - Enhanced background effects for WorldLore
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
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

    // Particle properties
    const particleCount = 80;
    const particles = [];
    const colors = [
        'rgba(144, 202, 249, 0.6)',  // Light blue
        'rgba(100, 181, 246, 0.5)',  // Medium blue
        'rgba(66, 165, 245, 0.4)',   // Blue
        'rgba(30, 136, 229, 0.3)',   // Darker blue
        'rgba(187, 222, 251, 0.4)'   // Very light blue
    ];

    // Create particles
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseDirection = 1;
            this.maxSize = this.size + 1.5;
            this.minSize = this.size - 0.5;
            this.currentSize = this.size;
        }

        update() {
            // Move particles
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Pulse size effect
            this.currentSize += this.pulseSpeed * this.pulseDirection;
            if (this.currentSize >= this.maxSize || this.currentSize <= this.minSize) {
                this.pulseDirection *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
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
        
        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(16, 42, 67, 0.8)');
        gradient.addColorStop(1, 'rgba(10, 25, 41, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

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

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(144, 202, 249, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Start animation
    init();
    animate();
});