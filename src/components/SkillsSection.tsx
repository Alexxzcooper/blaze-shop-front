
const SkillsSection = () => {
  return (
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
  );
};

export default SkillsSection;
