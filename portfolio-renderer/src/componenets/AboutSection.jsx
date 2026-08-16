// const AboutSection = ({ profile, theme }) => {
//   return (
//     <section className="max-w-3xl mx-auto px-4 py-12">
//       <h2 className={`text-2xl font-semibold mb-4 ${theme.text}`}>About</h2>
//       <p className="leading-relaxed whitespace-pre-line">{profile.bio}</p>
//     </section>
//   );
// };

// export default AboutSection;


import { useEffect, useRef, useState } from 'react';

const AboutSection = ({ profile, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!profile.bio) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [profile.bio]);

  if (!profile.bio) return null;

  const revealBase =
    'transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0';
  const revealState = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`mx-auto max-w-3xl px-4 py-16 sm:py-20 ${theme.text}`}
    >
      <div className={`mb-6 flex items-center gap-3 ${revealBase} ${revealState}`}>
        <span className="h-px w-8 bg-current/20" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/40">
          About
        </span>
      </div>

      <h2
        className={`text-2xl font-semibold sm:text-3xl ${revealBase} ${revealState}`}
        style={{ transitionDelay: isVisible ? '60ms' : '0ms' }}
      >
        A little more about me
      </h2>

      <p
        className={`mt-5 max-w-2xl whitespace-pre-line text-base leading-relaxed text-current/75 ${revealBase} ${revealState}`}
        style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
      >
        {profile.bio}
      </p>
    </section>
  );
};

export default AboutSection;