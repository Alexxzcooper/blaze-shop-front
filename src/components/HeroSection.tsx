
import { Mail, Github, Smartphone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 
          bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
            Flutter Mobile App Developer
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Crafting beautiful, high-performance mobile applications with Flutter, 
            focusing on elegant design and seamless user experiences.
          </p>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 
              bg-gradient-to-r from-primary to-purple-600 
              text-white px-6 py-3 rounded-lg 
              hover:from-primary/90 hover:to-purple-500 
              transition-all shadow-lg shadow-primary/30 
              transform hover:-translate-y-1"
            >
              <Mail className="h-5 w-5" />
              Contact Me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 
              bg-gray-800 text-white px-6 py-3 rounded-lg 
              hover:bg-gray-700 transition-colors 
              transform hover:-translate-y-1 shadow-md"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 
            rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-xl 
            group-hover:shadow-2xl transition-shadow">
              <Smartphone className="h-48 w-48 text-primary 
              transform group-hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
