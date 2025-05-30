import { useTheme } from "@/hooks/use-theme";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import firstwaveLogo from "../assets/logos/firstwave-logo.png";
import TagManager from "react-gtm-module";
import { useState, useEffect } from "react";

const sections = ["home", "about", "how-it-works", "team", "impact", "contact"];

const sectionLabels = {
  home: "Home",
  about: "About",
  "how-it-works": "How It Works",
  team: "Team",
  impact: "Impact",
  contact: "Contact Us",
};

export function DesktopNav() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(sections);
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll events to toggle logo size
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Minimize logo after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically calculate headerHeight based on padding
  const headerHeight = isScrolled ? 64 : 80; // py-2: 8+8+~48, py-4: 16+16+~48

  const scrollToSection = (sectionId: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "nav_click",
        click_label: sectionId,
      },
    });

    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200 dark:border-gray-700">
      <div
        className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${isScrolled ? "py-2" : "py-4"
          }`}
      >
        <div className="flex justify-between items-start relative">
          {/* Logo Section */}
          <div className="flex items-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="block relative z-10"
            >
              <img
                src={firstwaveLogo}
                alt="FirstWave Logo"
                className={`object-contain rounded-lg overflow-hidden dark:border-gray-700 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6 hover:shadow-2xl ${isScrolled
                  ? "w-12 h-12 mt-0 shadow-xl shadow-purple-500/30"
                  : "w-20 h-20 -mb-12 mt-2 shadow-xl shadow-purple-500/30"
                  } ${theme === "dark" ? "filter brightness-125" : ""}`}
              />
            </a>
          </div>

          {/* Navigation Section */}
          <nav className="flex items-center space-x-4 md:space-x-8">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => {
                const label = sectionLabels[section as keyof typeof sectionLabels];
                const isActive = activeSection === section;

                return (
                  <a
                    key={section}
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section);
                    }}
                    className={`transition-colors ${isActive
                      ? "text-purple-500 dark:text-purple-400 font-semibold uppercase"
                      : "hover:text-purple-500 dark:hover:text-purple-400 font-semibold uppercase"
                      }`}
                  >
                    {label}
                  </a>
                );
              })}
            </div>

            {/* Mobile "Contact Us" Link */}
            <div className="md:hidden flex items-center space-x-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors text-sm"
              >
                Contact Us
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <i className="fas fa-sun text-yellow-400"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}