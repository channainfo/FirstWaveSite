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
  rotation: number; // For droplet orientation
  life: number;
  maxLife: number;
}

const WaveBackground: React.FC<{ theme: string }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })!;
    if (!ctx) return;

    const resizeCanvas = (): void => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
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

    const createParticle = (x: number, y: number, intensity: number = 1): void => {
      const angle = Math.random() * Math.PI / 2; // Upper hemisphere for realistic splash
      const speed = (0.8 + Math.random() * 1.2) * intensity; // Scale with intensity
      particles.push({
        x,
        y,
        size: 2 + Math.random() * 3 * intensity, // Size varies with intensity
        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4), // Randomize spread
        vy: Math.sin(angle) * speed - (1.5 + Math.random() * 1), // Upward bias
        rotation: Math.random() * Math.PI / 4, // Slight random rotation
        life: 0,
        maxLife: 15 + Math.random() * 15 // Shorter lifetime for realism
      });
    };

    const updateParticles = (): void => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gentle gravity
        p.vx *= 0.98; // Air drag
        p.vy *= 0.98; // Air drag
        p.rotation += 0.02; // Slight rotation over time
        p.life += 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = (): void => {
      particles.forEach(p => {
        const opacity = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Gradient for wet look
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        gradient.addColorStop(0, theme === 'dark' ? `rgba(6, 182, 212, ${opacity * 0.8})` : `rgba(251, 191, 36, ${opacity * 0.8})`);
        gradient.addColorStop(1, theme === 'dark' ? `rgba(6, 182, 212, ${opacity * 0.3})` : `rgba(251, 191, 36, ${opacity * 0.3})`);

        ctx.fillStyle = gradient;
        ctx.globalAlpha = opacity;

        // Draw teardrop shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size * 0.4, -p.size * 1.2, 0, -p.size * 1.8);
        ctx.quadraticCurveTo(-p.size * 0.4, -p.size * 1.2, 0, 0);
        ctx.fill();

        // Inner glow for translucency
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.globalAlpha = opacity * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size * 0.2, -p.size * 0.6, 0, -p.size * 0.9);
        ctx.quadraticCurveTo(-p.size * 0.2, -p.size * 0.6, 0, 0);
        ctx.fill();

        ctx.restore();
        ctx.globalAlpha = 1;
      });
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waveYs: number[][] = waves.map(() => []);
      const waveDerivs: number[][] = waves.map(() => []);

      waves.forEach((wave: Wave, index: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / window.devicePixelRatio);

        for (let x = 0; x <= canvas.width / window.devicePixelRatio; x += 3) {
          const y = (canvas.height / window.devicePixelRatio) * 0.7 +
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5 + wave.offset) * wave.amplitude * 0.3;

          // Calculate derivative for crest detection
          const yNext = (canvas.height / window.devicePixelRatio) * 0.7 +
            Math.sin((x + 1) * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin((x + 1) * wave.frequency * 0.5 + time * wave.speed * 1.5 + wave.offset) * wave.amplitude * 0.3;
          const dy = yNext - y;

          waveYs[index][x] = y;
          waveDerivs[index][x] = dy;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        ctx.lineTo(0, canvas.height / window.devicePixelRatio);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(0, (canvas.height / window.devicePixelRatio) * 0.5, 0, canvas.height / window.devicePixelRatio);
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

        if (index === 0) {
          ctx.shadowColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(251, 191, 36, 0.2)';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Detect crests and collisions for splashes
      for (let x = 0; x <= canvas.width / window.devicePixelRatio; x += 10) {
        for (let i = 0; i < waves.length - 1; i++) {
          for (let j = i + 1; j < waves.length; j++) {
            const y1 = waveYs[i][x];
            const y2 = waveYs[j][x];
            const dy1 = waveDerivs[i][x];
            const dy2 = waveDerivs[j][x];
            if (y1 && y2) {
              const intensity = Math.min(1 + Math.abs(dy1 + dy2) * 5, 2); // Intensity based on slope
              if (Math.abs(y1 - y2) < 10 || (Math.abs(dy1) < 0.15 && Math.abs(dy2) < 0.15)) {
                if (Math.random() < 0.08) { // Reduced probability
                  createParticle(x, Math.min(y1, y2), intensity);
                }
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