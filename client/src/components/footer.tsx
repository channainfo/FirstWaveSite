import { useTheme } from "@/hooks/use-theme";
import firstwaveLogo from "../assets/logos/firstwave-logo-landscape.png";

const sections = ["home", "about", "how-it-works", "team", "impact", "contact"];

const sectionLabels = {
  home: "Home",
  about: "About",
  "how-it-works": "How It Works",
  team: "Team",
  impact: "Impact",
  contact: "Contact Us",
};

export function Footer() {
  const { theme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80;
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="block"
          >
            <div className="bg-white dark:bg-white rounded-lg h-20 flex items-center justify-center p-3">
              <img
                src={firstwaveLogo}
                alt="FirstWave Logo"
                className={`h-12 rounded-lg object-contain transition-transform duration-300 hover:scale-110 hover:rotate-6 ${theme === "dark" ? "filter brightness-125" : ""
                  }`}
              />
            </div>
          </a>
        </div>
        <p className="text-gray-400 mb-6 text-lg">
          Empowering Cambodia's Next Generation of Founders
        </p>
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {sections.map((section) => {
              const label = sectionLabels[section as keyof typeof sectionLabels];
              return (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section);
                    }}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-base sm:text-lg font-medium"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mb-8">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="inline-flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-base sm:text-lg"
          >
            <i className="fas fa-rocket mr-2"></i>
            Get Involved
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © {currentYear} FirstWave. All rights reserved.
        </p>
      </div>
    </footer>
  );
}