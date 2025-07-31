import { useState, useEffect, type SetStateAction } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  
  // Simulando la función de scroll
  const scrollToSection = (section: SetStateAction<string>) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    console.log(`Scrolling to ${section}`);
  };
  
  // Función para cerrar el menú al cambiar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <nav 
        className={`fixed top-5 mx-auto z-50 bg-white/10 backdrop-blur-md border border-white/30 transition-all duration-300 ${
          isMenuOpen ? "rounded-2xl" : "rounded-full"
        } w-[95%] max-w-3xl`}
      >
        <div className="px-4 py-2 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo - tamaño responsivo */}
            <div className="bg-indigo-600 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">DT</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {["hero", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-white font-medium hover:text-purple-300 transition-colors capitalize whitespace-nowrap px-2 py-1 ${
                    activeSection === section ? "text-purple-400" : ""
                  }`}
                >
                  {section === "hero"
                    ? "Home"
                    : section === "about"
                      ? "About Me"
                      : section === "skills"
                        ? "Skills"
                        : section === "projects"
                          ? "Projects"
                          : "Contact"}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 pb-3 animate-in slide-in-from-top duration-200">
              {["hero", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-center py-3 text-white/90 hover:text-white transition-colors capitalize rounded-lg hover:bg-white/10 ${
                    activeSection === section ? "text-purple-400 font-medium" : ""
                  }`}
                >
                  {section === "hero"
                    ? "Home"
                    : section === "about"
                      ? "About Me"
                      : section === "skills"
                        ? "Skills"
                        : section === "projects"
                          ? "Projects"
                          : "Contact"}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;