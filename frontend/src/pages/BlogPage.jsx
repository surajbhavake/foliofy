// import React from 'react'
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from '../hooks/useBlogPosts';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';
// import ReactMarkdown from 'react-markdown';

// const blogSchema = z.object({
//   title : z.string().min(1),
//   content : z.string().min(10),
//   is_published : z.boolean().optional(),
// })

// function BlogPage() {

//   const {data : posts , isLoading} = useBlogPosts();
//   const createMutation  =useCreateBlogPost();
//   const updateMutation = useUpdateBlogPost();
//   const deleteMutation = useDeleteBlogPost();
//   const [editing,setEditing] = useState(null)
//   const[showForm,setShowForm] = useState(true);
//   const [preview,setPreview] = useState(false)

//   const { register , handleSubmit,reset , watch,formState:{isSubmitting,errors}} = useForm({
//     resolver:zodResolver(blogSchema),
//     defaultValues:{title :'',content : '',is_published : false},
//   })

//   const onNew = ()=> {
//     setEditing(null),
//     reset({title :'',content : '',is_published : false}),
//     setShowForm(true)
//   };

//   const onEdit = (post)  =>{
//     setEditing(post),
//     reset(post);
//     setShowForm(true)
//   }


//   const onSubmit = async(data) =>{

//     if(editing){
//       await updateMutation.mutateAsync({
//         id : editing.id,
//         ...data
//       })
//     }
//     else {
//       await createMutation.mutateAsync(data)
//     }
//     setShowForm(false)
//   }

//   const handleDelete = async(id) =>{
//     if(window.confirm('Delete this post')){
//       await deleteMutation.mutateAsync(id)
//     }
//   }

//   if(isLoading) return <div>Loading blog posts....</div>
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Blog Posts</h1>
//         <button onClick={onNew} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">New Post</button>
//       </div>

//       {showForm && (
//         <div className="bg-white p-6 rounded shadow mb-6">
//           <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Post' : 'Create Post'}</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Title</label>
//               <input {...register('title')} className="w-full border p-2 rounded" />
//             </div>
//             <div>
//               <div className="flex justify-between">
//                 <label className="block text-sm font-medium">Content (Markdown)</label>
//                 <button type="button" onClick={() => setPreview(!preview)} className="text-sm text-indigo-600">
//                   {preview ? 'Edit' : 'Preview'}
//                 </button>
//               </div>
//               {preview ? (
//                 <div className="border p-4 rounded min-h-50 //min-h-[200px]  prose">
//                   <ReactMarkdown>{watch('content')}</ReactMarkdown>
//                 </div>
//               ) : (
//                 <textarea {...register('content')} rows={12} className="w-full border p-2 rounded font-mono" />
//               )}
//               {errors.content && <p className="text-red-400 text-xs">{errors.content.message}</p>}
//             </div>
//             <div className="flex items-center gap-2">
//               <input type="checkbox" {...register('is_published')} id="published" />
//               <label htmlFor="published">Publish immediately</label>
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
//               <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//                 {editing ? 'Update' : 'Create'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="space-y-4">
//         {posts?.map((post) => (
//           <div key={post.id} className="bg-white p-4 rounded shadow flex justify-between">
//             <div>
//               <h3 className="font-semibold">{post.title} {!post.is_published && <span className="text-xs text-gray-400">(Draft)</span>}</h3>
//               <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
//             </div>
//             <div className="flex space-x-3">
//               <button onClick={() => onEdit(post)} className="text-blue-500"><FiEdit /></button>
//               <button onClick={() => handleDelete(post.id)} className="text-red-500"><FiTrash2 /></button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default BlogPage


import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReactMarkdown from 'react-markdown'
import {
  useBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from '../hooks/useBlogPosts'

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  content: z.string().min(10, 'Content must be at least 10 characters.'),
  is_published: z.boolean().optional(),
})

const emptyPost = { title: '', content: '', is_published: false }

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

const IconDoc = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    <path d="M14 4v4h4" />
    <path d="M9 12h6" />
    <path d="M9 15.5h6" />
  </svg>
)

const IconEye = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.5" />
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

function Field({ id, label, error, action, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
          {label}
        </label>
        {action}
      </div>
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

function ConfirmDeleteDialog({ post, onCancel, onConfirm, isDeleting }) {
  return (
    <Dialog open={!!post} onClose={onCancel} labelledBy="delete-post-dialog-title" widthClass="max-w-sm">
      <div className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
          <IconTrash className="h-5 w-5" />
        </div>
        <h2 id="delete-post-dialog-title" className="mt-4 text-base font-semibold text-white">
          Delete post?
        </h2>
        <p className="mt-1.5 text-sm text-white/40">
          {post ? `"${post.title}" will be permanently removed. This can't be undone.` : ''}
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
 * Post row
 * ----------------------------------------------------------------- */

function excerptOf(markdown = '') {
  const plain = markdown
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.length > 130 ? `${plain.slice(0, 130).trim()}…` : plain
}

function PostRow({ post, onEdit, onDelete }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/30">
        <IconDoc className="h-4.5 w-4.5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-semibold text-white">{post.title}</h3>
          {post.is_published ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-white/40">
              Draft
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-white/40">{excerptOf(post.content)}</p>
        <p className="mt-2 font-mono text-[11px] text-white/25">
          {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
        </p>
      </div>

      <div className="flex shrink-0 gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(post)}
          aria-label={`Edit ${post.title}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors duration-200 hover:border-amber-400/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <IconEdit className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(post)}
          aria-label={`Delete ${post.title}`}
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
        <IconDoc className="h-5 w-5" />
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">No posts yet</p>
        <p className="mt-1 text-sm text-white/40">Write your first post to start your blog.</p>
      </div>
      <button
        type="button"
        onClick={onNew}
        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <IconPlus className="h-4 w-4" />
        New post
      </button>
    </div>
  )
}

function BlogSkeleton() {
  return (
    <div role="status" className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
      <span className="sr-only">Loading blog posts…</span>
      <div aria-hidden="true" className="animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 rounded-lg bg-white/10" />
          <div className="h-10 w-32 rounded-xl bg-white/10" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts()
  const createMutation = useCreateBlogPost()
  const updateMutation = useUpdateBlogPost()
  const deleteMutation = useDeleteBlogPost()

  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [preview, setPreview] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: emptyPost,
  })

  const onNew = () => {
    setEditing(null)
    reset(emptyPost)
    setPreview(false)
    setShowForm(true)
  }

  const onEdit = (post) => {
    setEditing(post)
    reset({
      title: post.title,
      content: post.content,
      is_published: post.is_published ?? false,
    })
    setPreview(false)
    setShowForm(true)
  }

  const onSubmit = async (data) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, ...data })
    } else {
      await createMutation.mutateAsync(data)
    }
    setShowForm(false)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteMutation.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  const isDeleting = deleteMutation.isPending ?? deleteMutation.isLoading ?? false

  if (isLoading) return <BlogSkeleton />

  const postList = posts ?? []

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
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">// Writing</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">Blog Posts</h1>
          </div>
          <button
            type="button"
            onClick={onNew}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <IconPlus className="h-4 w-4" />
            New post
          </button>
        </div>

        {postList.length === 0 ? (
          <EmptyState onNew={onNew} />
        ) : (
          <div className="space-y-3">
            {postList.map((post) => (
              <PostRow key={post.id} post={post} onEdit={onEdit} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      <Dialog open={showForm} onClose={() => setShowForm(false)} labelledBy="post-dialog-title" widthClass="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-h-[85vh] flex-col">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <h2 id="post-dialog-title" className="text-base font-semibold text-white">
              {editing ? 'Edit post' : 'New post'}
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
            <Field id="post-title" label="Title" error={errors.title}>
              <input
                {...register('title')}
                {...fieldA11y('post-title', !!errors.title)}
                className={inputClass}
                placeholder="How I shipped this feature"
              />
            </Field>

            <Field
              id="post-content"
              label="Content (Markdown)"
              error={errors.content}
              action={
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-white/60 transition-colors duration-200 hover:border-amber-400/40 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                >
                  {preview ? <IconEdit className="h-3 w-3" /> : <IconEye className="h-3 w-3" />}
                  {preview ? 'Edit' : 'Preview'}
                </button>
              }
            >
              {preview ? (
                <div className="prose prose-invert prose-sm min-h-[240px] max-w-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  {watch('content') ? (
                    <ReactMarkdown>{watch('content')}</ReactMarkdown>
                  ) : (
                    <p className="text-white/25">Nothing to preview yet.</p>
                  )}
                </div>
              ) : (
                <textarea
                  {...register('content')}
                  {...fieldA11y('post-content', !!errors.content)}
                  rows={11}
                  className={`${inputClass} font-mono leading-relaxed`}
                  placeholder="Write in Markdown…"
                />
              )}
            </Field>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/60">
              <input
                type="checkbox"
                {...register('is_published')}
                className="h-4 w-4 rounded border-white/20 bg-white/[0.03] text-amber-400 accent-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
              />
              Publish immediately
            </label>
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
              {isSubmitting ? (editing ? 'Saving…' : 'Publishing…') : editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Dialog>

      <ConfirmDeleteDialog
        post={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}


export default BlogPage