import React, { useEffect, useRef } from 'react';

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  opacity: number;
  currentDrift: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  type: 'droplet' | 'bubble' | 'micro-droplet' | 'mist';
  rotation?: number;
  wobble?: number;
  shapeDistortion?: number;
  spin?: number;
  angularVelocity?: number;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
}

// Mock useTheme hook (replace with actual implementation)
const useTheme = (): ThemeContextType => ({
  theme: 'dark', // Replace with your context logic
});

const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const waveAudioRef = useRef<HTMLAudioElement | null>(null);
  const splashAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastSplashTimeRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    try {
      waveAudioRef.current = new Audio('/assets/sounds/sea-waves.mp3');
      waveAudioRef.current.loop = true;
      waveAudioRef.current.volume = 0.15;
      splashAudioRef.current = new Audio('/assets/sounds/splash.mp3');
      splashAudioRef.current.volume = 0.25;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }

    const startAudio = () => {
      if (waveAudioRef.current) {
        waveAudioRef.current.play().catch((error) => console.warn('Wave audio error:', error));
      }
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);

    let time = 0;
    const waves: Wave[] = [
      { amplitude: 30, frequency: 0.012, speed: 0.008, offset: 0, opacity: 0.25, currentDrift: 0.008 },
      { amplitude: 20, frequency: 0.018, speed: 0.01, offset: Math.PI / 3, opacity: 0.3, currentDrift: 0.006 },
      { amplitude: 35, frequency: 0.01, speed: 0.007, offset: Math.PI / 2, opacity: 0.2, currentDrift: 0.009 },
      { amplitude: 40, frequency: 0.008, speed: 0.006, offset: Math.PI, opacity: 0.25, currentDrift: 0.005 },
      { amplitude: 25, frequency: 0.014, speed: 0.009, offset: Math.PI / 4, opacity: 0.22, currentDrift: 0.007 },
    ];

    const particles: Particle[] = [];
    const maxParticles = 90; // Reduced to prevent overcrowding

    const createParticle = (x: number, y: number, type: Particle['type'], delay = 0) => {
      if (particles.length >= maxParticles) return;
      const timeoutId = setTimeout(() => {
        const isDroplet = type === 'droplet';
        const isMicro = type === 'micro-droplet';
        const isMist = type === 'mist';
        const isBurst = isDroplet && Math.random() < 0.1; // Occasional larger burst
        const count = isDroplet
          ? (isBurst ? 4 + Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 3)) // 3–5, burst 4–6
          : isMicro
            ? 2 + Math.floor(Math.random() * 2) // 2–3
            : isMist
              ? 2 + Math.floor(Math.random() * 3) // 2–4
              : 3 + Math.floor(Math.random() * 3); // Bubbles 3–5
        for (let i = 0; i < count; i++) {
          const speed = isDroplet
            ? 0.8 + Math.random() * 1.7 // Wider range
            : isMicro
              ? 0.6 + Math.random() * 0.9
              : isMist
                ? 0.3 + Math.random() * 0.5
                : 0;
          const angle = isDroplet || isMicro || isMist ? Math.PI * (0.05 + Math.random() * 0.6) : 0; // Wider spray
          particles.push({
            x: x + (Math.random() - 0.5) * 14, // Tighter spread
            y: y + (Math.random() - 0.5) * 14,
            size: isDroplet
              ? 2 + Math.random() * 5 // 2–7
              : isMicro
                ? 0.8 + Math.random() * 2.2 // 0.8–3
                : isMist
                  ? 2 + Math.random() * 3 // 2–5
                  : 1.2 + Math.random() * 2,
            vx: isDroplet || isMicro || isMist ? Math.cos(angle) * speed + (isDroplet ? 0.8 : isMicro ? 0.7 : 0.5) : 0,
            vy: isDroplet
              ? Math.sin(angle) * speed - 2 // Stronger upward
              : isMicro
                ? Math.sin(angle) * speed - 1.5
                : isMist
                  ? Math.sin(angle) * speed - 1
                  : -0.1, // Vertical for bubbles
            life: 0,
            maxLife: isDroplet
              ? 3 + Math.random() * 3 // 3–6
              : isMicro
                ? 2 + Math.random() * 2 // 2–4
                : isMist
                  ? 5 + Math.random() * 4 // 5–9
                  : 12 + Math.random() * 8,
            type,
            rotation: isDroplet || isMicro || isMist ? Math.random() * Math.PI : undefined,
            wobble: isDroplet || isMicro || isMist ? Math.random() * 0.15 : undefined,
            shapeDistortion: isDroplet || isMicro ? 0.6 + Math.random() * 0.6 : isMist ? 0.7 + Math.random() * 0.5 : 0.9 + Math.random() * 0.2,
            spin: isDroplet || isMicro || isMist ? (Math.random() - 0.5) * 0.2 : undefined,
            angularVelocity: isDroplet || isMicro ? (Math.random() - 0.5) * 0.1 : isMist ? (Math.random() - 0.5) * 0.05 : undefined,
          });
        }
        if (isDroplet) {
          if (Math.random() < 0.75) createParticle(x, y, 'micro-droplet', 80); // Longer delay
          if (Math.random() < 0.3) createParticle(x, y, 'mist', 150); // Reduced chance
          const now = Date.now();
          if (now - lastSplashTimeRef.current > 1000 && splashAudioRef.current) {
            splashAudioRef.current.currentTime = 0;
            splashAudioRef.current.play().catch((error) => console.warn('Splash audio error:', error));
            lastSplashTimeRef.current = now;
          }
        }
      }, delay);
      return () => clearTimeout(timeoutId);
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.y > canvas.height || p.y < 0 || p.x < 0 || p.x > canvas.width) {
          particles.splice(i, 1);
          continue;
        }
        const waveInfluence = p.type !== 'bubble' ? Math.sin(p.x * 0.03 + time * 0.02) * 0.2 : 0;
        p.x += p.vx + (p.type !== 'bubble' ? 0.3 + waveInfluence : 0);
        p.y += p.vy;
        p.vy += p.type === 'droplet' ? 0.05 : p.type === 'micro-droplet' ? 0.04 : p.type === 'mist' ? 0.025 : 0;
        p.vx *= p.type === 'droplet' || p.type === 'micro-droplet' || p.type === 'mist' ? 0.96 : 1; // Stronger drag
        p.vx += (Math.random() - 0.5) * (p.type === 'droplet' ? 0.06 : p.type === 'micro-droplet' ? 0.05 : p.type === 'mist' ? 0.04 : 0);
        p.life += 1;
        if (p.wobble && p.rotation !== undefined) {
          p.rotation += Math.sin(p.life * p.wobble) * 0.15 + (p.spin ?? 0) + (p.angularVelocity ?? 0);
        }
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        if (p.y < 0 || p.y > canvas.height || p.x < 0 || p.x > canvas.width) return;
        const opacity = 1 - Math.pow(p.life / p.maxLife, 1.5);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x - p.size / 2, p.y - p.size / 2, p.size);
        if (p.type === 'droplet' || p.type === 'micro-droplet') {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`); // Brighter glint
          gradient.addColorStop(0.15, theme === 'dark' ? `rgba(6, 255, 212, ${opacity * 0.95})` : `rgba(255, 191, 36, ${opacity * 0.95})`);
          gradient.addColorStop(0.5, theme === 'dark' ? `rgba(6, 182, 212, ${opacity * 0.6})` : `rgba(251, 191, 36, ${opacity * 0.6})`);
          gradient.addColorStop(1, theme === 'dark' ? `rgba(6, 182, 212, ${opacity * 0.2})` : `rgba(251, 191, 36, ${opacity * 0.2})`);
        } else if (p.type === 'mist') {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.35})`); // Softer haze
          gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.05})`);
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.7})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.2})`);
        }
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.type === 'droplet' ? 0.95 : p.type === 'micro-droplet' ? 0.8 : p.type === 'mist' ? 0.25 : 0.5;
        ctx.save();
        ctx.translate(p.x, p.y);
        if (p.rotation) ctx.rotate(p.rotation);
        ctx.beginPath();
        const rx = p.type === 'bubble' ? p.size * 1.1 : p.size * (p.shapeDistortion ?? 1);
        const ry = p.type === 'bubble' ? p.size * 0.9 : p.size / (p.shapeDistortion ?? 1);
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        if ((p.type === 'droplet' || p.type === 'micro-droplet') && p.life < p.maxLife * 0.5) {
          ctx.globalAlpha = opacity * 0.4;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          const fan = Math.random() * 0.6;
          ctx.quadraticCurveTo(-p.vx * (1.8 + fan), -p.vy * (1.8 + fan), -p.vx * (3.5 + fan), -p.vy * (3.5 + fan));
          ctx.strokeStyle = theme === 'dark' ? `rgba(6, 255, 212, ${opacity * 0.4})` : `rgba(255, 191, 36, ${opacity * 0.4})`;
          ctx.stroke();
        }
        ctx.restore();
        if (p.type === 'droplet' || p.type === 'micro-droplet') {
          ctx.shadowColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.25)';
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        if ((p.type === 'droplet' || p.type === 'micro-droplet') && p.life > p.maxLife * 0.8 && p.y >= canvas.height * 0.3) {
          ctx.globalAlpha = opacity * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); // Larger ripple
          ctx.strokeStyle = theme === 'dark' ? 'rgba(6, 255, 212, 0.3)' : 'rgba(255, 191, 36, 0.3)';
          ctx.stroke();
        }
        if (p.type === 'bubble' && p.life > p.maxLife * 0.7) {
          ctx.globalAlpha = opacity * 0.15;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.5, p.size, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const shoreY = canvas.height * 0.3;
      const maxHeight = canvas.height * 0.5;
      const waveYs: (number | undefined)[][] = waves.map(() => Array(canvas.width + 1));

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        const windOffset = Math.sin(time * 0.025 + index) * 6;
        wave.offset += wave.currentDrift + Math.sin(time * 0.008) * 0.0015;

        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= canvas.width; x += 6) {
          const baseY = canvas.height * 0.4;
          const vortex = Math.sin(x * 0.04 + time * 0.01) * 3;
          let y =
            baseY +
            (Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
              windOffset +
              vortex) +
            Math.sin(x * wave.frequency * 0.6 + time * wave.speed * 1.3 + wave.offset) * wave.amplitude * 0.3;

          y = Math.max(shoreY, Math.min(y, maxHeight));

          points.push({ x, y });
          waveYs[index][x] = y;
        }

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          if (i === 0) ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(p1.x, p1.y, mx, my);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(0, shoreY, 0, canvas.height);
        if (theme === 'dark') {
          if (index === 0) {
            waveGradient.addColorStop(0, `rgba(6, 182, 212, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(8, 145, 178, ${wave.opacity * 0.9})`);
            waveGradient.addColorStop(1, `rgba(21, 94, 117, ${wave.opacity * 0.7})`);
          } else {
            waveGradient.addColorStop(0, `rgba(59, 130, 246, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(99, 102, 241, ${wave.opacity * 0.9})`);
            waveGradient.addColorStop(1, `rgba(79, 70, 229, ${wave.opacity * 0.7})`);
          }
        } else {
          if (index === 0) {
            waveGradient.addColorStop(0, `rgba(251, 191, 36, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(245, 158, 11, ${wave.opacity * 0.9})`);
            waveGradient.addColorStop(1, `rgba(217, 119, 6, ${wave.opacity * 0.7})`);
          } else {
            waveGradient.addColorStop(0, `rgba(249, 115, 22, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(147, 51, 234, ${wave.opacity * 0.9})`);
            waveGradient.addColorStop(1, `rgba(126, 34, 206, ${wave.opacity * 0.7})`);
          }
        }

        ctx.fillStyle = waveGradient;
        ctx.fill();

        if (index === 0) {
          ctx.shadowColor = theme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(251, 191, 36, 0.4)';
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      for (let x = 0; x <= canvas.width; x += 22) {
        const isEdge = x < 60 || x > canvas.width - 60;
        const edgeBoost = isEdge ? 1.8 : 1; // Reduced
        const shoreIntensity = Math.random() < 0.2 ? 1.3 : 1; // Reduced intensity
        for (let i = 0; i < waves.length; i++) {
          const y = waveYs[i][x];
          if (y !== undefined && y <= shoreY + 15) { // Tighter shore
            if (Math.random() < 0.2 * edgeBoost * shoreIntensity) { // Reduced to 0.2
              createParticle(x, y, 'droplet');
            }
          }
        }
        for (let i = 0; i < waves.length - 1; i++) {
          for (let j = i + 1; j < waves.length; j++) {
            const y1 = waveYs[i][x];
            const y2 = waveYs[j][x];
            if (y1 !== undefined && y2 !== undefined && Math.abs(y1 - y2) < 8 && y1 <= shoreY + 40) { // Tighter
              if (Math.random() < 0.14 * edgeBoost * shoreIntensity) { // Reduced to 0.14
                createParticle(x, Math.min(y1, y2), 'droplet');
              }
            }
          }
        }
        if (Math.random() < 0.05 * edgeBoost) {
          const waveIndex = Math.floor(Math.random() * waves.length);
          const y = waveYs[waveIndex][x];
          if (y !== undefined && y > shoreY && y <= shoreY + 60) {
            createParticle(x, y, 'bubble');
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
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (waveAudioRef.current) waveAudioRef.current?.pause();
      if (splashAudioRef.current) splashAudioRef.current?.pause();
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