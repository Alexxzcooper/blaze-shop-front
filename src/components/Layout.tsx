import { Outlet } from "react-router-dom";
import { Code, Smartphone, Mail, Github } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              <a 
                href="#projects" 
                className="text-gray-600 hover:text-primary 
                transition-colors font-medium group relative"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary 
                transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#skills" 
                className="text-gray-600 hover:text-primary 
                transition-colors font-medium group relative"
              >
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary 
                transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 hover:text-primary 
                transition-colors font-medium group relative"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary 
                transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
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
        
        <section id="projects" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((project) => (
                <div key={project} className="bg-white rounded-lg shadow-lg overflow-hidden border">
                  <div className="aspect-video bg-gray-100"></div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2">Flutter App {project}</h3>
                    <p className="text-gray-600 mb-4">
                      A beautiful mobile application built with Flutter and Firebase
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Flutter
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        Firebase
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Flutter",
                "Dart",
                "Firebase",
                "REST APIs",
                "Git",
                "UI/UX Design",
                "State Management",
                "CI/CD",
              ].map((skill) => (
                <div
                  key={skill}
                  className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="max-w-lg mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-70">
            &copy; {new Date().getFullYear()} Flutter Developer Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
