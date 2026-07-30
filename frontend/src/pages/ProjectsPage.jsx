// import React from 'react'
// import { useState } from 'react'
// import {z} from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { useProjects,useCreateProject,useDeleteProject,useUpdateProject } from '../hooks/useProjects'
// import {FiEdit,FiTrash2} from 'react-icons/fi'

// const projectSchema = z.object({
//   title:z.string().min(1),
//   description : z.string().min(5),
//   live_url : z.string().url().optional().or(z.literal('')),
//   repo_url : z.string().url().optional().or(z.literal('')),
//   order : z.number().optional()
// })
// function ProjectsPage() {

//   const {data:projects ,isLoading} = useProjects();
//   const createMutation = useCreateProject();
//   const updateMutation = useUpdateProject();
//   const deleteMutation = useDeleteProject();
//   const [editing,setEditing] = useState(null);
//   const [showForm,setShowForm] = useState(false);

//   const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm({
//     resolver:zodResolver(projectSchema),
//     // defaultValues:{
//     //     title: '',
//     //     description: '', 
//     //     live_url: '',
//     //     repo_url: '', 
//     //     order: 0 
//     // }
//   })



//   const onNew = () =>{
//     setEditing(null);
//     reset({ title: '',
//         description: '', 
//         live_url: '',
//         repo_url: '', 
//         order: 0 })
//     setShowForm(true);
//   }

//   const onEdit = (project) =>{
//     setEditing(project)
//     reset(project)
//     setShowForm(true)
//   }

//   const onSubmit = async(data) => {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key,value])=>{
//       if(value !== undefined && value !== '') formData.append(key,value)
//     });
//   const fileInput = document.querySelector('input[name="image"]');
//   const file = fileInput?.files[0]
//   if(file){
//     formData.append('image',file)
//   }


//   if(editing){
//     await updateMutation.mutateAsync({
//       id:editing.id,
//       formData
//     })
//   }
//   else{
//     await createMutation.mutateAsync(formData)
//   }
//   setShowForm(false)
//   }

//   const handleDelete = async(id) =>{
//     if(window.confirm('Are you sure you want to delete this project?')){
//       await deleteMutation.mutateAsync(id) 
//     }
//   }

//   if(isLoading) return <div>Loading projects....</div>



//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4" >
//         <h1 className="text-2xl font-bold">Projects</h1>
//         <button onClick={onNew} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">New Project</button>
//       </div>

//       {showForm && (
//         <div  className="bg-white p-6 rounded shadow mb-6">
//           <h2 className="text-lg font-semibold mb-4">{editing ? "Editing Project" : 'Create Project'}</h2>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//            <div>
//              <label  className="block text-sm font-medium">Title</label>
//             <input {...register('title')}  className="w-full border p-2 rounded" />
//             {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
//            </div>

//            <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea {...register('description')} className="w-full border p-2 rounded"/>
//             {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
//            </div>

//            <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Live URL</label>
//               <input {...register('live_url')} className="w-full border p-2 rounded" />
//               {errors.live_url && <p>{errors.live_url.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Repo URL</label>
//               <input {...register('repo_url')}  className="w-full border p-2 rounded"/>
//               {errors.repo_url && <p>{errors.repo_url.message}</p>}
//             </div>

//            </div>
//            <div>
//             <label className="block text-sm font-medium">Order</label>
//             <input type='number' {...register('order',{valueAsNumber:true})} className="w-full border p-2 rounded"/>

//            </div>

//            <div>
//             <label  className="block text-sm font-medium">Image</label>
//             <input type="file" name='image' accept='image/*'  />
//            </div>
//            <div className="flex justify-end space-x-3">
//             <button type="button" onClick={()=>setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
//             <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{editing ? 'Update' : 'Create'}</button>
//            </div>
//           </form>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {projects.map((project)=>(
//           <div key={project.id} className="bg-white p-4 rounded shadow flex space-x-4">
//             {project.image && <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded"/>}

//             <div className="flex-1">
//               <h3 className="font-semibold">{project.title}</h3>
//               <p className="text-sm text-gray-600">{project.description?.substring(0,100)}...</p>
//             </div>
//             <div className="flex flex-col space-y-2">
//                <button onClick={() => onEdit(project)} className="text-blue-500 hover:text-blue-700"><FiEdit /></button>
//               <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
    

    
//   )}

// export default ProjectsPage



import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useProjects, useCreateProject, useDeleteProject, useUpdateProject } from '../hooks/useProjects'

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  live_url: z.string().url().optional().or(z.literal('')),
  repo_url: z.string().url().optional().or(z.literal('')),
  order: z.number().optional(),
})

const emptyProject = {
  title: '',
  description: '',
  live_url: '',
  repo_url: '',
  order: 0,
}

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

const IconLink = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M9.5 14.5 14.5 9.5" />
    <path d="M11 6.5 12.5 5a3.5 3.5 0 0 1 5 5L16 11.5" />
    <path d="M13 17.5 11.5 19a3.5 3.5 0 0 1-5-5L8 12.5" />
  </svg>
)

const IconSpinner = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const IconImage = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="M4 17l5-4.5 3 2.5 4-4 4 4.5" />
  </svg>
)

const IconExternalLink = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
  </svg>
)

const IconCode = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M9 8 4.5 12 9 16" />
    <path d="M15 8l4.5 4-4.5 4" />
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
          {error.message}
        </p>
      )}
    </div>
  )
}

function LinkField({ id, name, label, placeholder, register, error }) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <IconLink className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
        <input
          type="url"
          placeholder={placeholder}
          {...register(name)}
          {...fieldA11y(id, !!error)}
          className={`${inputClass} pl-9`}
        />
      </div>
    </Field>
  )
}

/* ----------------------------------------------------------------- *
 * Dialog primitive — shared by the form and the delete confirmation
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

function ConfirmDeleteDialog({ project, onCancel, onConfirm, isDeleting }) {
  return (
    <Dialog open={!!project} onClose={onCancel} labelledBy="delete-dialog-title" widthClass="max-w-sm">
      <div className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
          <IconTrash className="h-5 w-5" />
        </div>
        <h2 id="delete-dialog-title" className="mt-4 text-base font-semibold text-white">
          Delete project?
        </h2>
        <p className="mt-1.5 text-sm text-white/40">
          {project ? `"${project.title}" will be permanently removed. This can't be undone.` : ''}
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
 * Project card
 * ----------------------------------------------------------------- */

function ProjectCard({ project, onEdit, onDelete }) {
  const description = project.description || ''
  const truncated = description.length > 110 ? `${description.slice(0, 110).trim()}…` : description

  return (
    <div className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]">
        {project.image ? (
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <IconImage className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-white">{project.title}</h3>
        <p className="mt-1 text-sm text-white/40">{truncated}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-amber-300/80 hover:text-amber-300"
            >
              <IconExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white"
            >
              <IconCode className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(project)}
          aria-label={`Edit ${project.title}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors duration-200 hover:border-amber-400/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <IconEdit className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(project)}
          aria-label={`Delete ${project.title}`}
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
        <IconImage className="h-5 w-5" />
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">No projects yet</p>
        <p className="mt-1 text-sm text-white/40">Add your first project to start building your portfolio.</p>
      </div>
      <button
        type="button"
        onClick={onNew}
        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <IconPlus className="h-4 w-4" />
        Add project
      </button>
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div role="status" className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
      <span className="sr-only">Loading projects…</span>
      <div aria-hidden="true" className="animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 rounded-lg bg-white/10" />
          <div className="h-10 w-32 rounded-xl bg-white/10" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const createMutation = useCreateProject()
  const updateMutation = useUpdateProject()
  const deleteMutation = useDeleteProject()

  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: emptyProject,
  })

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const onNew = () => {
    setEditing(null)
    reset(emptyProject)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setShowForm(true)
  }

  const onEdit = (project) => {
    setEditing(project)
    reset(project)
    setImagePreview(project.image || null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setShowForm(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') formData.append(key, value)
    })

    const file = fileInputRef.current?.files?.[0]
    if (file) {
      formData.append('image', file)
    }

    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, formData })
    } else {
      await createMutation.mutateAsync(formData)
    }
    setShowForm(false)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteMutation.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  const isDeleting = deleteMutation.isPending ?? deleteMutation.isLoading ?? false

  if (isLoading) return <ProjectsSkeleton />

  const projectList = projects ?? []

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
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">// Portfolio</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">Projects</h1>
          </div>
          <button
            type="button"
            onClick={onNew}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <IconPlus className="h-4 w-4" />
            New project
          </button>
        </div>

        {projectList.length === 0 ? (
          <EmptyState onNew={onNew} />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projectList.map((project) => (
              <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      <Dialog open={showForm} onClose={() => setShowForm(false)} labelledBy="project-dialog-title" widthClass="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-h-[85vh] flex-col">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <h2 id="project-dialog-title" className="text-base font-semibold text-white">
              {editing ? 'Edit project' : 'New project'}
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
            <Field id="title" label="Title" error={errors.title}>
              <input
                {...register('title')}
                {...fieldA11y('title', !!errors.title)}
                className={inputClass}
                placeholder="Portfolio site"
              />
            </Field>

            <Field id="description" label="Description" error={errors.description}>
              <textarea
                rows={3}
                {...register('description')}
                {...fieldA11y('description', !!errors.description)}
                className={inputClass}
                placeholder="What the project does and how you built it."
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <LinkField
                id="live_url"
                name="live_url"
                label="Live URL"
                placeholder="https://project.com"
                register={register}
                error={errors.live_url}
              />
              <LinkField
                id="repo_url"
                name="repo_url"
                label="Repo URL"
                placeholder="https://github.com/you/project"
                register={register}
                error={errors.repo_url}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_7rem]">
              <div>
                <label
                  htmlFor="image-upload"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                >
                  Image
                </label>
                <label
                  htmlFor="image-upload"
                  className="flex h-24 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/[0.15] bg-white/[0.03] px-4 text-sm text-white/40 transition-colors duration-200 hover:border-amber-400/40 hover:text-white/70"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  ) : (
                    <IconImage className="h-5 w-5 shrink-0" />
                  )}
                  <span>{imagePreview ? 'Replace image' : 'Click to upload'}</span>
                  <input
                    id="image-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
              </div>

              <Field id="order" label="Order">
                <input
                  type="number"
                  id="order"
                  {...register('order', { valueAsNumber: true })}
                  className={inputClass}
                />
              </Field>
            </div>
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
        project={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default ProjectsPage