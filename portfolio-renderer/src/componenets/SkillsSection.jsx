// const SkillsSection = ({ skills, theme }) => {
//   if (!skills?.length) return null;

//   return (
//     <section id="skills" className="max-w-3xl mx-auto px-4 py-12">
//       <h2 className={`text-2xl font-semibold mb-6 ${theme.text}`}>Skills</h2>
//       <div className="space-y-4">
//         {skills.map((skill, index) => (
//           <div key={index}>
//             <div className="flex justify-between mb-1">
//               <span className="font-medium">{skill.name}</span>
//               <span className="text-gray-500">{skill.proficiency}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3">
//               <div
//                 className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
//                 style={{ width: `${skill.proficiency}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SkillsSection;
import { useEffect, useRef, useState } from 'react'

function toneFor(value) {
  if (value >= 75) return 'from-indigo-600 to-indigo-500'
  if (value >= 40) return 'from-indigo-400 to-indigo-300'
  return 'from-current/30 to-current/20'
}

function levelLabel(value) {
  if (value >= 75) return 'Advanced'
  if (value >= 40) return 'Intermediate'
  return 'Learning'
}

const SkillsSection = ({ skills, theme }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!skills?.length) return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [skills])

  if (!skills?.length) return null

  return (
    <section id="skills" ref={sectionRef} className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-current/20" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/40">
          Toolkit
        </span>
      </div>

      <h2 className={`mb-8 text-2xl font-semibold sm:text-3xl ${theme.text}`}>Skills</h2>

      <div className="space-y-5">
        {skills.map((skill, index) => (
          <div
            key={skill.id ?? index}
            className={`transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: isVisible ? `${Math.min(index * 60, 360)}ms` : '0ms' }}
          >
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className={`text-sm font-medium ${theme.text}`}>{skill.name}</span>
              <span className="font-mono text-xs text-current/40">
                {skill.proficiency}%
                <span className="ml-1.5 hidden text-current/30 sm:inline">
                  · {levelLabel(skill.proficiency)}
                </span>
              </span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-current/[0.08]"
              role="progressbar"
              aria-label={skill.name}
              aria-valuenow={skill.proficiency}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full bg-gradient-to-r ${toneFor(
                  skill.proficiency
                )} transition-[width] duration-700 ease-out motion-reduce:transition-none`}
                style={{ width: isVisible ? `${skill.proficiency}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection