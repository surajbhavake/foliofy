const ExperienceSection = ({ experiences }) => {
  if (!experiences?.length) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-8">Experience</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex gap-4 md:gap-8">
              {/* Timeline dot */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-indigo-600 rounded-full mt-1.5 ring-4 ring-white" />
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{exp.role}</h3>
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;