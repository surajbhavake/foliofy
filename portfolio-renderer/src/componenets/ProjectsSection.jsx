const ProjectsSection = ({ projects, theme }) => {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className={`text-2xl font-semibold mb-6 ${theme.text}`}>Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className={`${theme.card} ${theme.cardBorder} rounded-lg overflow-hidden shadow`}>
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="flex space-x-3 mt-4">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                     className="text-indigo-600 hover:underline text-sm">
                    Live Demo
                  </a>
                )}
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                     className="text-indigo-600 hover:underline text-sm">
                    Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;