// const ExperienceSection = ({ experiences }) => {
//   if (!experiences?.length) return null;

//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'Present';
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
//   };

//   return (
//     <section id="experience" className="max-w-3xl mx-auto px-4 py-16">
//       <h2 className="text-2xl font-semibold mb-8">Experience</h2>
      
//       <div className="relative">
//         {/* Timeline line */}
//         <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        
//         <div className="space-y-8">
//           {experiences.map((exp, index) => (
//             <div key={index} className="relative flex gap-4 md:gap-8">
//               {/* Timeline dot */}
//               <div className="flex-shrink-0 relative z-10">
//                 <div className="w-3 h-3 md:w-4 md:h-4 bg-indigo-600 rounded-full mt-1.5 ring-4 ring-white" />
//               </div>
              
//               {/* Content card */}
//               <div className="flex-1 bg-white rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-900">{exp.role}</h3>
//                     <p className="text-indigo-600 font-medium">{exp.company}</p>
//                   </div>
//                   <span className="text-sm text-gray-500 whitespace-nowrap">
//                     {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
//                   </span>
//                 </div>
//                 {exp.description && (
//                   <p className="text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExperienceSection;


import { useEffect, useRef, useState } from 'react';

const ExperienceSection = ({ experiences }) => {
  const [visibleItems, setVisibleItems] = useState(() => new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!experiences?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (prev.has(index)) return prev;
              const next = new Set(prev);
              next.add(index);
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [experiences]);

  if (!experiences?.length) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="max-w-3xl mx-auto px-4 py-20">
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600">
          Career
        </span>
        <h2 className="mt-1 text-2xl md:text-3xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Experience
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-gray-200 to-transparent" />

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isVisible = visibleItems.has(index);
            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`group relative flex gap-4 md:gap-8 transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${Math.min(index * 80, 400)}ms` }}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full mt-1.5 ring-4 ring-white transition-transform duration-200 group-hover:scale-125 ${
                      exp.is_current
                        ? 'bg-indigo-400 ring-8 ring-indigo-100 animate-pulse motion-reduce:animate-none'
                        : 'bg-indigo-600'
                    }`}
                  />
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all duration-300 ease-out group-hover:shadow-lg group-hover:border-indigo-300 group-hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {exp.is_current && (
                        <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 whitespace-nowrap">
                          Current
                        </span>
                      )}
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(exp.start_date)} —{' '}
                        {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;