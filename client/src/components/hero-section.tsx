import React, { useEffect, useRef } from 'react';
import { useTheme } from "@/hooks/use-theme";

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  opacity: number;
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

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave: Wave, index: number) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Create wave path
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = canvas.height * 0.7 +
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5 + wave.offset) * wave.amplitude * 0.3;

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
            // Primary wave - cyan tones
            waveGradient.addColorStop(0, `rgba(6, 182, 212, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(8, 145, 178, ${wave.opacity * 0.8})`);
            waveGradient.addColorStop(1, `rgba(21, 94, 117, ${wave.opacity * 0.6})`);
          } else {
            // Supporting waves - blue and purple tones
            waveGradient.addColorStop(0, `rgba(59, 130, 246, ${wave.opacity})`);
            waveGradient.addColorStop(0.5, `rgba(99, 102, 241, ${wave.opacity * 0.8})`);
            waveGradient.addColorStop(1, `rgba(79, 70, 229, ${wave.opacity * 0.6})`);
          }
        } else {
          if (index === 0) {
            // Primary wave - warmer tones for light theme
            waveGradient.addColorStop(0, `rgba(251, 191, 36, ${wave.opacity})`); // yellow-400
            waveGradient.addColorStop(0.5, `rgba(245, 158, 11, ${wave.opacity * 0.8})`); // amber-500
            waveGradient.addColorStop(1, `rgba(217, 119, 6, ${wave.opacity * 0.6})`); // amber-600
          } else {
            // Supporting waves - orange and purple tones
            waveGradient.addColorStop(0, `rgba(249, 115, 22, ${wave.opacity})`); // orange-500
            waveGradient.addColorStop(0.5, `rgba(147, 51, 234, ${wave.opacity * 0.8})`); // purple-600
            waveGradient.addColorStop(1, `rgba(126, 34, 206, ${wave.opacity * 0.6})`); // purple-700
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

export function HeroSection() {
  const { toggleTheme, theme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80;
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg dark:dark-gradient-bg relative overflow-hidden">
      {/* Wave Animation Background */}
      <WaveBackground theme={theme} />

      {/* Background Image */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 2 }}>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
          alt="Entrepreneurs collaborating"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating particles for extra visual interest */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 dark:bg-cyan-400 rounded-full animate-ping opacity-20" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-orange-400 dark:bg-blue-400 rounded-full animate-pulse opacity-30" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 dark:bg-cyan-300 rounded-full animate-bounce opacity-25" />
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-amber-400 dark:bg-blue-300 rounded-full animate-ping opacity-35" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center text-white relative z-10 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Cambodia's<br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Next Generation
            </span>
            <br />
            of Founders
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Bridging the Gap for Post-Acceleration Startups
          </p>
          <p className="text-base md:text-lg mb-10 opacity-80 max-w-3xl mx-auto">
            Welcome to FirstWave, a Founders-First Initiative dedicated to nurturing the growth of post-acceleration startups in Cambodia. We believe in creating a thriving ecosystem where entrepreneurs can solve meaningful local problems and compete on the global stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:team@firstwave.asia?subject=Startup%20Support%20Inquiry%20-%20FirstWave"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <i className="fas fa-rocket mr-2"></i>
              Apply for Support
            </a>

            <a
              href="mailto:team@firstwave.asia?subject=Investment%20Opportunity%20-%20FirstWave"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-200 text-lg"
            >
              <i className="fas fa-handshake mr-2"></i>
              Become an Investor
            </a>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <i className="fas fa-info-circle mr-2"></i>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ zIndex: 11 }}>
        <a onClick={() => scrollToSection('about')} href="#about">
          <i className="fas fa-chevron-down text-white text-2xl opacity-70"></i>
        </a>
      </div>
    </section>
  );
}