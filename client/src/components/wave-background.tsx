import React, { useEffect, useRef } from 'react';
import { useTheme } from "@/hooks/use-theme";

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const WaveBackground: React.FC<{ theme: string }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time: number = 0;
    const waves: Wave[] = [
      { amplitude: 60, frequency: 0.008, speed: 0.015, offset: 0, opacity: 0.15 },
      { amplitude: 45, frequency: 0.012, speed: 0.02, offset: Math.PI / 3, opacity: 0.2 },
      { amplitude: 80, frequency: 0.006, speed: 0.012, offset: Math.PI / 2, opacity: 0.1 },
      { amplitude: 100, frequency: 0.004, speed: 0.01, offset: Math.PI, opacity: 0.25 }
    ];

    const particles: Particle[] = [];

    const createParticle = (x: number, y: number): void => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      particles.push({
        x,
        y,
        size: 2 + Math.random() * 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // Upward bias for splash
        life: 0,
        maxLife: 20 + Math.random() * 20
      });
    };

    const updateParticles = (): void => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity effect
        p.life += 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = (): void => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(6, 182, 212, 0.7)' : 'rgba(251, 191, 36, 0.7)';
      particles.forEach(p => {
        const opacity = 1 - p.life / p.maxLife;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Store wave y-coordinates for collision detection
      const waveYs: number[][] = waves.map(() => []);

      waves.forEach((wave: Wave, index: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Calculate wave path and store y-coordinates
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = canvas.height * 0.7 +
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5 + wave.offset) * wave.amplitude * 0.3;

          waveYs[index][x] = y;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Create wave gradient based on theme
        const waveGradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
        if (theme === 'dark') {
          if (index === 0) {
            waveGradient.addColorStop(0, `rgba(6, 182, 212, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(8, 145, 178, ${wave.opacity * 0.8})`);
            waveGradient.addColorStop(1, `rgba(21, 94, 117, ${wave.opacity * 0.6})`);
          } else {
            waveGradient.addColorStop(0, `rgba(59, 130, 246, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(99, 102, 241, ${wave.opacity * 0.8})`);
            waveGradient.addColorStop(1, `rgba(79, 70, 229, ${wave.opacity * 0.6})`);
          }
        } else {
          if (index === 0) {
            waveGradient.addColorStop(0, `rgba(251, 191, 36, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(245, 158, 11, ${wave.opacity * 0.8})`);
            waveGradient.addColorStop(1, `rgba(217, 119, 6, ${wave.opacity * 0.6})`);
          } else {
            waveGradient.addColorStop(0, `rgba(249, 115, 22, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(147, 51, 234, ${wave.opacity * 0.8})`);
            waveGradient.addColorStop(1, `rgba(126, 34, 206, ${wave.opacity * 0.6})`);
          }
        }

        ctx.fillStyle = waveGradient;
        ctx.fill();

        // Add glow effect for primary wave
        if (index === 0) {
          ctx.shadowColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(251, 191, 36, 0.2)';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Detect collisions and create splash particles
      for (let x = 0; x <= canvas.width; x += 10) { // Check every 10px for performance
        for (let i = 0; i < waves.length - 1; i++) {
          for (let j = i + 1; j < waves.length; j++) {
            const y1 = waveYs[i][x];
            const y2 = waveYs[j][x];
            if (y1 && y2 && Math.abs(y1 - y2) < 10) { // Threshold for "collision"
              if (Math.random() < 0.1) { // Randomize to avoid excessive particles
                createParticle(x, Math.min(y1, y2));
              }
            }
          }
        }
      }

      updateParticles();
      drawParticles();

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default WaveBackground;