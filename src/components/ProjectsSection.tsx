
const ProjectsSection = () => {
  return (
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
  );
};

export default ProjectsSection;
