import { useTheme } from "@/hooks/use-theme";

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
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
          alt="Entrepreneurs collaborating"
          className="w-full h-full object-cover"
        />
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
            { /* mailto:team@firstwave.asia?subject=Startup Support Inquiry - FirstWave */}
            <a
              href="mailto:team@firstwave.asia?subject=Startup%20Support%20Inquiry%20-%20FirstWave"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <i className="fas fa-rocket mr-2"></i>
              Apply for Support
            </a>

            { /* mailto:team@firstwave.asia?subject=Investment Opportunity - FirstWave */}
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a onClick={() => scrollToSection('about')} href="#about">
          <i className="fas fa-chevron-down text-white text-2xl opacity-70"></i>
        </a>
      </div>
    </section >
  );
}
