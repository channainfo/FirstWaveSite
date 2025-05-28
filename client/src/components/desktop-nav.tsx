import { useTheme } from "@/hooks/use-theme";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import firstwaveLogo from "../assets/logos/firstwave-logo.png";

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80;
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      // Update the URL with the section ID (e.g., #home, #team)
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="block"
            >
              <img
                src={firstwaveLogo}
                alt="FirstWave Logo"
                className={`w-10 h-10 rounded-lg object-contain transition-transform duration-300 hover:scale-110 hover:rotate-6 ${theme === "dark" ? "filter brightness-125" : ""
                  }`}
              />
            </a>
          </div>
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