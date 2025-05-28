import { useTheme } from "@/hooks/use-theme";
import firstwaveLogo from "../assets/firstwave-logo-landscape.png";

export function Footer() {
  const { theme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80; // Consistent with DesktopNav
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
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
              className={`h-12 rounded-lg object-contain transition-transform duration-300 hover:scale-110 hover:rotate-6 ${theme === "dark" ? "filter brightness-125" : ""
                }`}
            />
          </a>
        </div>
        <p className="text-gray-400 mb-4">Empowering Cambodia's Next Generation of Founders</p>
        <p className="text-sm text-gray-500">© 2024 FirstWave. All rights reserved.</p>
      </div>
    </footer>
  );
}