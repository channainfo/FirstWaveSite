import React from 'react';
import { useTheme } from '@/hooks/use-theme'; // Reuse your theme hook
import WaveBackground from '@/components/wave-background'; // Reuse your wave animation
import { BlurredImage } from '@/components/ui/blurred-image'; // Reuse your blurred image component
import heroImage from '@/assets/images/hero-firstwave.jpg'; // Reuse hero image (or replace with a new one)
import { AlertCircle } from 'lucide-react'; // Keep the icon for consistency
import { Link } from 'wouter'; // Use wouter for navigation
import TagManager from 'react-gtm-module'; // Reuse GTM for analytics

export default function NotFound() {
  const { theme } = useTheme();

  // Track 404 page view with GTM
  React.useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'page_view',
        page_path: '/404',
        page_title: '404 Not Found',
      },
    });
  }, []);

  // Handle CTA click with GTM tracking
  const handleCTAClick = (label: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'button_click',
        click_label: label,
      },
    });
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center gradient-bg dark:dark-gradient-bg relative overflow-hidden`}
    >
      {/* Wave Animation Background */}
      <WaveBackground />

      {/* Background Image */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 2 }}>
        <BlurredImage
          src={heroImage}
          allowToggle={false}
          alt="Ocean backdrop for 404 page"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 dark:bg-cyan-400 rounded-full animate-ping opacity-20" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-orange-400 dark:bg-blue-400 rounded-full animate-pulse opacity-30" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 dark:bg-cyan-300 rounded-full animate-bounce opacity-25" />
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-amber-400 dark:bg-blue-300 rounded-full animate-ping opacity-35" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center text-white relative z-10 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* 404 Icon and Headline */}
          <div className="flex items-center justify-center mb-6 gap-3">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <div className="text-2xl md:text-2xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Lost at Sea?
              </span>
              <br />
              <h1>
                404 - Page Not Found
              </h1>
            </div>
          </div>

          {/* Mobile: Short Message, Desktop: Full Message */}
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto block md:hidden">
            Looks like this page drifted away.
          </p>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-3xl mx-auto hidden md:block">
            It seems you’ve sailed into uncharted waters. The page you’re looking for doesn’t exist, but don’t worry—FirstWave is here to guide you back to shore and empower your entrepreneurial journey.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              onClick={() => handleCTAClick('BackToHome')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <i className="fas fa-home mr-2"></i>
              Return to Home
            </Link>
            <a
              href="mailto:firstwaveasia@gmail.com?subject=404%20Page%20Inquiry%20-%20FirstWave"
              onClick={() => handleCTAClick('ContactUs')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-200 text-lg"
            >
              <i className="fas fa-envelope mr-2"></i>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}