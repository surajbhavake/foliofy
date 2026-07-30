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

function toneFor(value) {
  if (value >= 75) return 'from-emerald-400 to-emerald-300'
  if (value >= 40) return 'from-amber-400 to-amber-300'
  return 'from-rose-400 to-rose-300'
}

const SkillsSection = ({ skills, theme }) => {
  if (!skills?.length) return null

  return (
    <section id="skills" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-current/20" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/40">Toolkit</span>
      </div>

      <h2 className={`mb-8 text-2xl font-semibold sm:text-3xl ${theme.text}`}>Skills</h2>

      <div className="space-y-5">
        {skills.map((skill, index) => (
          <div key={skill.id ?? index}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className={`text-sm font-medium ${theme.text}`}>{skill.name}</span>
              <span className="font-mono text-xs text-current/40">{skill.proficiency}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-current/[0.08]">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${toneFor(skill.proficiency)} transition-all duration-700 ease-out`}
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection