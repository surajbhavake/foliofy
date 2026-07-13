const AboutSection = ({ profile, theme }) => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className={`text-2xl font-semibold mb-4 ${theme.text}`}>About</h2>
      <p className="leading-relaxed whitespace-pre-line">{profile.bio}</p>
    </section>
  );
};

export default AboutSection;