import { useTheme } from "@/hooks/use-theme";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const sections = ["home", "about", "how-it-works", "team", "impact"];

const sectionLabels = {
  home: "Home",
  about: "About",
  "how-it-works": "How It Works",
  team: "Team",
  impact: "Impact",
  contact: "Contact",
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
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-gradient">FirstWave</span>
          </div>
          <nav className="flex items-center space-x-4 md:space-x-8">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => {
                const label = sectionLabels[section as keyof typeof sectionLabels];
                const isActive = activeSection === section;

                return (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`transition-colors ${isActive
                      ? "text-purple-500 dark:text-purple-400"
                      : "hover:text-purple-500 dark:hover:text-purple-400"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors text-sm"
              >
                Contact
              </button>
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
