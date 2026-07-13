const SkillsSection = ({ skills, theme }) => {
  if (!skills?.length) return null;

  return (
    <section id="skills" className="max-w-3xl mx-auto px-4 py-12">
      <h2 className={`text-2xl font-semibold mb-6 ${theme.text}`}>Skills</h2>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{skill.name}</span>
              <span className="text-gray-500">{skill.proficiency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;