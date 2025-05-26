import { useScrollSpy } from "@/hooks/use-scroll-spy";

const sections = ["home", "about", "how-it-works", "team", "impact"];

const sectionData = {
  home: { icon: "fas fa-home", label: "Home" },
  about: { icon: "fas fa-info-circle", label: "About" },
  "how-it-works": { icon: "fas fa-cogs", label: "How" },
  team: { icon: "fas fa-users", label: "Team" },
  impact: { icon: "fas fa-chart-line", label: "Impact" },
};

export function MobileNav() {
  const activeSection = useScrollSpy(sections);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-gray-200 dark:border-gray-700 mobile-nav-bottom">
      <div className="flex justify-around items-center py-2">
        {sections.map((section) => {
          const { icon, label } = sectionData[section as keyof typeof sectionData];
          const isActive = activeSection === section;
          
          return (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-purple-500 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
              }`}
            >
              <i className={`${icon} text-lg mb-1`}></i>
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
