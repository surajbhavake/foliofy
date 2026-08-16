// const ProjectsSection = ({ projects, theme }) => {
//   if (!projects?.length) return null;

//   return (
//     <section id="projects" className="max-w-5xl mx-auto px-4 py-12">
//       <h2 className={`text-2xl font-semibold mb-6 ${theme.text}`}>Projects</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {projects.map((project, index) => (
//           <div key={index} className={`${theme.card} ${theme.cardBorder} rounded-lg overflow-hidden shadow`}>
//             {project.image && (
//               <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
//             )}
//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{project.title}</h3>
//               <p className="text-gray-600 mt-2">{project.description}</p>
//               <div className="flex space-x-3 mt-4">
//                 {project.live_url && (
//                   <a href={project.live_url} target="_blank" rel="noopener noreferrer"
//                      className="text-indigo-600 hover:underline text-sm">
//                     Live Demo
//                   </a>
//                 )}
//                 {project.repo_url && (
//                   <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
//                      className="text-indigo-600 hover:underline text-sm">
//                     Repository
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;


import { useEffect, useRef, useState } from 'react'

const IconExternalLink = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden="true"
  >
    <path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
  </svg>
)

const IconCode = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden="true"
  >
    <path d="M9 8 4.5 12 9 16" />
    <path d="M15 8l4.5 4-4.5 4" />
  </svg>
)

const IconImage = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden="true"
  >
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="M4 17l5-4.5 3 2.5 4-4 4 4.5" />
  </svg>
)

const linkChipClass =
  'inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50'

const ProjectsSection = ({ projects, theme }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!projects?.length) return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [projects])

  if (!projects?.length) return null

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-current/20" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/40">Work</span>
      </div>

      <h2 className={`mb-8 text-2xl font-semibold sm:text-3xl ${theme.text}`}>Projects</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const hasLinks = Boolean(project.live_url || project.repo_url)
          return (
            <div
              key={project.id ?? index}
              className={`group flex flex-col overflow-hidden rounded-2xl ${theme.card} ${theme.cardBorder} border transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              } ${hasLinks ? 'hover:-translate-y-1 hover:shadow-xl' : 'hover:shadow-sm'}`}
              style={{ transitionDelay: isVisible ? `${Math.min(index * 70, 350)}ms` : '0ms' }}
            >
              <div className="relative h-48 w-full overflow-hidden bg-current/5">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      hasLinks ? 'group-hover:scale-105' : ''
                    }`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-current/20">
                    <IconImage className="h-8 w-8" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className={`text-lg font-semibold ${theme.text}`}>{project.title}</h3>
                {project.description && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-current/60">
                    {project.description}
                  </p>
                )}

                {hasLinks && (
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-current/[0.08] pt-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkChipClass} text-amber-500 hover:text-amber-400 dark:text-amber-300 dark:hover:text-amber-200`}
                      >
                        <IconExternalLink className="h-3.5 w-3.5" />
                        Live demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkChipClass} text-current/60 hover:text-current`}
                      >
                        <IconCode className="h-3.5 w-3.5" />
                        Repository
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectsSection