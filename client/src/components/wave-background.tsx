import React, { useEffect, useRef } from 'react';
import { useTheme } from "@/hooks/use-theme";

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  opacity: number;
  phaseShift: number;
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
      { amplitude: 80, frequency: 0.006, speed: 0.01, offset: 0, opacity: 0.2, phaseShift: 0.1 }, // Increased amplitude
      { amplitude: 60, frequency: 0.009, speed: 0.015, offset: Math.PI / 4, opacity: 0.25, phaseShift: 0.15 }, // Increased amplitude
      { amplitude: 90, frequency: 0.004, speed: 0.008, offset: Math.PI / 2, opacity: 0.18, phaseShift: 0.08 }, // Increased amplitude
      { amplitude: 100, frequency: 0.0025, speed: 0.006, offset: Math.PI, opacity: 0.22, phaseShift: 0.12 } // Increased amplitude
    ];

    const particles: Particle[] = [];

    const createParticle = (x: number, y: number): void => {
      const angle = Math.random() * Math.PI / 2;
      const speed = 0.5 + Math.random() * 1;
      particles.push({
        x,
        y,
        size: 1.5 + Math.random() * 2.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        life: 0,
        maxLife: 12 + Math.random() * 12
      });
    };

    const updateParticles = (): void => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.life += 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = (): void => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(251, 191, 36, 0.5)';
      particles.forEach(p => {
        const opacity = 1 - p.life / p.maxLife;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(p.x + p.size * 0.4, p.y - p.size * 1.2, p.x, p.y - p.size * 1.8);
        ctx.quadraticCurveTo(p.x - p.size * 0.4, p.y - p.size * 1.2, p.x, p.y);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waveYs: number[][] = waves.map(() => []);
      const waveDerivs: number[][] = waves.map(() => []);

      waves.forEach((wave: Wave, index: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width / window.devicePixelRatio; x += 1) {
          const t = time * wave.speed + wave.offset;
          const baseY = canvas.height / window.devicePixelRatio * 0.65; // Lowered baseY to accommodate taller waves
          const y = baseY +
            Math.sin(x * wave.frequency + t) * wave.amplitude * (1 - 0.2 * Math.sin(t * wave.phaseShift)) +
            Math.sin(x * wave.frequency * 0.7 + t * 1.1) * wave.amplitude * 0.4 + // Increased secondary amplitude
            Math.cos(x * wave.frequency * 0.4 + t * 0.9) * wave.amplitude * 0.2 + // Increased tertiary amplitude
            (Math.random() - 0.5) * 3;

          const yNext = baseY +
            Math.sin((x + 1) * wave.frequency + t) * wave.amplitude * (1 - 0.2 * Math.sin(t * wave.phaseShift)) +
            Math.sin((x + 1) * wave.frequency * 0.7 + t * 1.1) * wave.amplitude * 0.4 +
            Math.cos((x + 1) * wave.frequency * 0.4 + t * 0.9) * wave.amplitude * 0.2;
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

        const waveGradient = ctx.createLinearGradient(0, canvas.height / window.devicePixelRatio * 0.5, 0, canvas.height / window.devicePixelRatio);
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
          ctx.shadowColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.25)' : 'rgba(251, 191, 36, 0.25)';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      for (let x = 0; x <= canvas.width / window.devicePixelRatio; x += 20) {
        for (let i = 0; i < waves.length - 1; i++) {
          for (let j = i + 1; j < waves.length; j++) {
            const y1 = waveYs[i][x];
            const y2 = waveYs[j][x];
            const dy1 = waveDerivs[i][x];
            const dy2 = waveDerivs[j][x];
            if (y1 && y2 && (Math.abs(y1 - y2) < 6 || (Math.abs(dy1) < 0.1 && Math.abs(dy2) < 0.1))) {
              if (Math.random() < 0.03) {
                createParticle(x, Math.min(y1, y2));
              }
            }
          }
        }
      }

      updateParticles();
      drawParticles();

      time += 0.4;
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