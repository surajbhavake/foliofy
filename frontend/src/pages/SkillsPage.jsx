// import React from 'react'
// import {useSkills,useCreateSkill,useDeleteSkill,useUpdateSkill} from '../hooks/useSkills'
// import { useState } from 'react'
// function SkillsPage() {

//   const {data : skills,isLoading} = useSkills();
//   const createMutation = useCreateSkill();
//   const deleteMutation = useDeleteSkill();
//   const updateMutation = useUpdateSkill();
//   const [name, setName] = useState('')
//   const [proficiency,setProficiency] = useState(50);
//   const [editing,setEditing] = useState(null)


//   const handleAdd = async(e) =>{
//     e.preventDefault();
//     if(!name.trim()) return;

//     if(editing){
//       await updateMutation.mutateAsync({
//         id: editing.id,
//         name,
//         proficiency,
//       })
//       setEditing(null)
//     }else{
//     await createMutation.mutateAsync({name,proficiency});
    


//   }
//   setName('')
//   setProficiency(50)
// }

//   if(isLoading) return <div>Loading Skills....</div>
//   return (
//         <div>
//       <h1 className="text-2xl font-bold mb-4">Skills</h1>
//       <form onSubmit={handleAdd} className="flex gap-2 mb-6">
//         <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill name" className="border p-2 rounded flex-1" />
//         <input type="number" value={proficiency} onChange={(e) => setProficiency(Number(e.target.value))} min="0" max="100" className="border p-2 w-24" />
//         <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{editing ? 'Update' : 'Add'}</button>
//         {editing && (
//     <button
//         type="button"
//         onClick={() => {
//             setEditing(null);
//             setName('');
//             setProficiency(50);
//         }}
//         className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//     >
//         Cancel
//     </button>
// )}
//       </form>

//       <div className="space-y-4 w-2xs ">
//         {skills?.map((skill) => (
//           <div key={skill.id} className="flex items-center justify-between bg-white py-3  px-4 gap-1  rounded shadow">
//             <div>
//               <span className="font-medium">{skill.name}</span>
//               <span className="ml-4 text-gray-500">{skill.proficiency}%</span>
//             </div>
//             <button onClick={() => deleteMutation.mutateAsync(skill.id)} className="text-red-500 hover:text-red-700">Delete </button>
//             <button onClick={()=>(setName(skill.name),setProficiency(skill.proficiency),setEditing(skill))} className ="text-blue-500 hover:text-blue-700  "> Edit</button>
//           </div>
//         ))}
//       </div>
//     </div>
 

//   )
// }

// export default SkillsPage



import React from 'react'
import { useEffect, useState } from 'react'
import { useSkills, useCreateSkill, useDeleteSkill, useUpdateSkill } from '../hooks/useSkills'

/* ----------------------------------------------------------------- *
 * Icons
 * ----------------------------------------------------------------- */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const IconAlert = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
)

const IconSpinner = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const IconSparkle = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="m6 6 2.5 2.5" />
    <path d="m15.5 15.5 2.5 2.5" />
    <path d="m18 6-2.5 2.5" />
    <path d="m8.5 15.5-2.5 2.5" />
  </svg>
)

const IconEdit = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M4 20h4L18.5 9.5a2 2 0 0 0-4-4L4 16v4Z" />
  </svg>
)

const IconTrash = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M5 7h14" />
    <path d="M10 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
    <path d="M6.5 7 7.3 19a1 1 0 0 0 1 .95h7.4a1 1 0 0 0 1-.95L17.5 7" />
  </svg>
)

const IconPlus = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

const IconClose = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
)

/* ----------------------------------------------------------------- *
 * Shared form primitives
 * ----------------------------------------------------------------- */

const inputClass =
  'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-amber-400/50 focus:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-amber-400/40'

function fieldA11y(id, hasError) {
  return {
    id,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError ? `${id}-error` : undefined,
  }
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
          <IconAlert className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------- *
 * Dialog primitive
 * ----------------------------------------------------------------- */

function Dialog({ open, onClose, labelledBy, widthClass = 'max-w-lg', children }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div aria-hidden="true" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative w-full ${widthClass} overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-2xl shadow-black/50`}
      >
        {children}
      </div>
    </div>
  )
}

function ConfirmDeleteDialog({ skill, onCancel, onConfirm, isDeleting }) {
  return (
    <Dialog open={!!skill} onClose={onCancel} labelledBy="delete-skill-dialog-title" widthClass="max-w-sm">
      <div className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
          <IconTrash className="h-5 w-5" />
        </div>
        <h2 id="delete-skill-dialog-title" className="mt-4 text-base font-semibold text-white">
          Delete skill?
        </h2>
        <p className="mt-1.5 text-sm text-white/40">
          {skill ? `"${skill.name}" will be permanently removed. This can't be undone.` : ''}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
          >
            {isDeleting && <IconSpinner className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />}
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </Dialog>
  )
}

/* ----------------------------------------------------------------- *
 * Skill card
 * ----------------------------------------------------------------- */

function proficiencyTone(value) {
  if (value >= 75) return { bar: 'from-emerald-400 to-emerald-300', text: 'text-emerald-300' }
  if (value >= 40) return { bar: 'from-amber-400 to-amber-300', text: 'text-amber-300' }
  return { bar: 'from-rose-400 to-rose-300', text: 'text-rose-300' }
}

function SkillCard({ skill, onEdit, onDelete }) {
  const tone = proficiencyTone(skill.proficiency)

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]">
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-semibold text-white">{skill.name}</h3>
          <span className={`shrink-0 font-mono text-xs ${tone.text}`}>{skill.proficiency}%</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${tone.bar} transition-all duration-500`}
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>

      <div className="flex shrink-0 gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(skill)}
          aria-label={`Edit ${skill.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors duration-200 hover:border-amber-400/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <IconEdit className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(skill)}
          aria-label={`Delete ${skill.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors duration-200 hover:border-rose-400/40 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50"
        >
          <IconTrash className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function EmptyState({ onNew }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/[0.12] px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40">
        <IconSparkle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">No skills yet</p>
        <p className="mt-1 text-sm text-white/40">Add your first skill to start building your profile.</p>
      </div>
      <button
        type="button"
        onClick={onNew}
        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <IconPlus className="h-4 w-4" />
        Add skill
      </button>
    </div>
  )
}

function SkillsSkeleton() {
  return (
    <div role="status" className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
      <span className="sr-only">Loading skills…</span>
      <div aria-hidden="true" className="animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 rounded-lg bg-white/10" />
          <div className="h-10 w-28 rounded-xl bg-white/10" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

const emptySkill = { name: '', proficiency: 50 }

function SkillsPage() {
  const { data: skills, isLoading } = useSkills()
  const createMutation = useCreateSkill()
  const updateMutation = useUpdateSkill()
  const deleteMutation = useDeleteSkill()

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [name, setName] = useState(emptySkill.name)
  const [proficiency, setProficiency] = useState(emptySkill.proficiency)
  const [nameError, setNameError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onNew = () => {
    setEditing(null)
    setName(emptySkill.name)
    setProficiency(emptySkill.proficiency)
    setNameError(null)
    setShowForm(true)
  }

  const onEdit = (skill) => {
    setEditing(skill)
    setName(skill.name)
    setProficiency(skill.proficiency)
    setNameError(null)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setNameError('Skill name is required.')
      return
    }
    setNameError(null)
    setIsSubmitting(true)
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, name: name.trim(), proficiency })
      } else {
        await createMutation.mutateAsync({ name: name.trim(), proficiency })
      }
      setShowForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteMutation.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  const isDeleting = deleteMutation.isPending ?? deleteMutation.isLoading ?? false

  if (isLoading) return <SkillsSkeleton />

  const skillList = skills ?? []
  const tone = proficiencyTone(proficiency)

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">// Profile</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">Skills</h1>
          </div>
          <button
            type="button"
            onClick={onNew}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <IconPlus className="h-4 w-4" />
            New skill
          </button>
        </div>

        {skillList.length === 0 ? (
          <EmptyState onNew={onNew} />
        ) : (
          <div className="space-y-3">
            {skillList.map((skill) => (
              <SkillCard key={skill.id} skill={skill} onEdit={onEdit} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      <Dialog open={showForm} onClose={() => setShowForm(false)} labelledBy="skill-dialog-title" widthClass="max-w-md">
        <form onSubmit={handleSubmit} noValidate className="flex max-h-[85vh] flex-col">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <h2 id="skill-dialog-title" className="text-base font-semibold text-white">
              {editing ? 'Edit skill' : 'New skill'}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
            <Field id="skill-name" label="Skill name" error={nameError}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                {...fieldA11y('skill-name', !!nameError)}
                className={inputClass}
                placeholder="React"
              />
            </Field>

            <Field id="skill-proficiency" label="Proficiency">
              <div className="flex items-center gap-4">
                <input
                  id="skill-proficiency"
                  type="range"
                  min="0"
                  max="100"
                  value={proficiency}
                  onChange={(e) => setProficiency(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-amber-400"
                />
                <span className={`w-12 shrink-0 text-right font-mono text-sm ${tone.text}`}>{proficiency}%</span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${tone.bar} transition-all duration-300`}
                  style={{ width: `${proficiency}%` }}
                />
              </div>
            </Field>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/[0.08] px-6 py-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              {isSubmitting && <IconSpinner className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />}
              {isSubmitting ? (editing ? 'Saving…' : 'Creating…') : editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Dialog>

      <ConfirmDeleteDialog
        skill={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default SkillsPage