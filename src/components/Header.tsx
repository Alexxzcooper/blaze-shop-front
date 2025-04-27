
import { Code } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a 
            href="/" 
            className="text-xl font-bold text-primary flex items-center gap-3 
            transition-transform hover:scale-105 hover:text-primary/80"
          >
            <Code className="h-7 w-7 text-primary" />
            FlutterDev
          </a>
          <div className="flex gap-6 items-center">
            {["projects", "skills", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="text-gray-600 hover:text-primary 
                transition-colors font-medium group relative"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary 
                transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
