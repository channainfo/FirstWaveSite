import React, { useEffect, useRef } from 'react';
import { useTheme } from "@/hooks/use-theme";
import WaveBackground from './wave-background';
import heroImage from '../assets/images/hero-firstwave.jpg';
import { BlurredImage } from './ui/blurred-image';

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
        <BlurredImage
          src={heroImage}
          allowToggle={false}
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