// const AboutSection = ({ profile, theme }) => {
//   return (
//     <section className="max-w-3xl mx-auto px-4 py-12">
//       <h2 className={`text-2xl font-semibold mb-4 ${theme.text}`}>About</h2>
//       <p className="leading-relaxed whitespace-pre-line">{profile.bio}</p>
//     </section>
//   );
// };

// export default AboutSection;


const AboutSection = ({ profile, theme }) => {
  if (!profile.bio) return null

  return (
    <section id="about" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-6 flex items-center gap-3 animate-[fadeIn_0.6s_ease-out]">
        <span className="h-px w-8 bg-current/20" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/40">About</span>
      </div>

      <h2 className={`animate-[fadeIn_0.6s_ease-out_0.05s_both] text-2xl font-semibold sm:text-3xl ${theme.text}`}>
        A little more about me
      </h2>

      <p
        className={`mt-5 max-w-2xl animate-[fadeIn_0.6s_ease-out_0.1s_both] whitespace-pre-line text-base leading-relaxed text-current/75 ${theme.text}`}
      >
        {profile.bio}
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="fadeIn"], section * { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

export default AboutSection