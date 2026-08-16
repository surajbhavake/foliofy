import React from 'react'
import { useEffect } from 'react'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import api from '../api/axios'
import { useForm } from 'react-hook-form'
import {useProfile,useUpdateProfile,useCreateProfile, useUploadResume} from '../hooks/useProfile'

const profileSchema = z.object({
  full_name : z.string().min(2,'Full name is required'),
  headline : z.string().min(2,'Headline is required'),
  bio : z.string().min(10,'Bio must be least 10 characters'),
  github : z.string().url().optional().or(z.literal('')),
  linkedin : z.string().url().optional().or(z.literal('')),
  twitter : z.string().url().optional().or(z.literal('')),
  website : z.string().url().optional().or(z.literal('')),
  theme : z.string().min(1),
  contact_email: z.string().email('Valid email is required').optional().or(z.literal('')),
  show_contact_form: z.boolean().optional(),
  location: z.string().optional(),
  available_for: z.string().optional(),
})



function ProfilePage() {

  const {data:profile , isLoading} = useProfile();
  const updateMutation = useUpdateProfile();
  const createMutation = useCreateProfile();
  const uploadResume = useUploadResume();
  const isNew = !profile;

  const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm({
    resolver:zodResolver(profileSchema),
    defaultValues:{
      full_name:'',
      headline : '',
      bio : '',
      github : '',
      linkedin : '',
      twitter : '',
      website : '',
      theme : 'default',
      contact_email: '',
      show_contact_form: false,
      location: '',
      available_for: '',
    }
  })
  
  useEffect(()=>{
    if(profile){
      reset(profile);
    }
  },[profile,reset])



  const onSubmit =async(data)=>{
    const payload = {...data}
    if(!isNew){
      payload.id = profile.id
      await updateMutation.mutateAsync(payload);

    }else {
      await createMutation.mutateAsync(payload)
    }
  }

  const handleAvatarUpload = async(e)=>{
    const file = e.target.files[0];
    if(!file || !profile) return ;
    const formData = new FormData();
    formData.append('avatar',file)

    if(profile){
      await api.patch(`/profiles/${profile.id}/`,formData,{
        headers : {
          'Content-Type' : 'mutipart/form-data'
        },
      })
      window.location.reload();
    }
  }

  const handleResumeUpload = async(e)=>{
    const file = e.target.files[0];
    if(!file || !profile) return;
    const formData = new FormData();
    formData.append('resume',file);
    await uploadResume.mutateAsync({
      id : profile.id,
      formData : formData
    })
    // if(profile){
    //   await api.patch(`/profiles/${profile.id}/`,formData,{
    //   headers : {
    //     'Content-Type' : 'multipart/form-data'
    //   }
    // })
    // }
    window.location.reload();
  }

  if(isLoading)return <div>Loading profile...</div>

  return (
    <div className='max-w-2xl mx-auto '> 
      <h1 className='text-2xl mb-6 font-bold'>{isNew ? 'Create Your Profile' : 'Edit Profile'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded shadow space-y-4'>

        <div>
          <label className='block text-sm font-medium ' >Full Name</label>
          <input {...register('full_name')} className='w-full border p-2  rounded  ' />
          {errors.full_name && <p className="text-red-400 text-xs">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className='text-sm font-medium block '>Headline</label>
          <input {...register('headline')} className='w-full border p-2 rounded ' />
          {errors.headline && <p  className="text-red-400 text-xs">{errors.headline.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium'>Bio</label>
          <textarea {...register('bio')} rows={4} className='w-full border rounded p-2 '/>
          {errors.bio && <p className="text-red-400 text-xs">{errors.bio.message}</p>}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium' >Github URL</label>
            <input {...register('github')} className='w-full p-2 rounded border'/>
          </div>

          <div>
            <label className='block text-sm font-medium'>LinkedIn URL </label>
            <input{...register('linkedin')} className='w-full border  rounded p-2 '/>
          </div>

          <div>
            <label className='block text-sm font-medium'>Twitter URL</label>
            <input {...register('twitter')} className='w-full border rounded p-2 '/>
          </div>

          <div>
            <label className='block font-medium text-sm'>Personal Website</label>
            <input {...register('website')} className='w-full border rounded p-2 '/>
          </div>
        </div>
        {/* Contact Settings Section */}
<div className="border-t pt-4 mt-4">
  <h3 className="text-lg font-semibold mb-3">Contact Settings</h3>
  
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Contact Email</label>
    <input
      {...register('contact_email')}
      type="email"
      className="w-full border p-2 rounded"
      placeholder="you@example.com"
    />
    <p className="text-xs text-gray-500 mt-1">
      Messages from your portfolio will be sent to this email.
      Leave blank to use your account email.
    </p>
  </div>

  <div className="flex items-center gap-2 mb-4">
    <input
      type="checkbox"
      {...register('show_contact_form')}
      id="show_contact_form"
      className="h-4 w-4"
    />
    <label htmlFor="show_contact_form" className="text-sm">
      Show contact form on my portfolio
    </label>
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Location</label>
    <input
      {...register('location')}
      className="w-full border p-2 rounded"
      placeholder="San Francisco, CA"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Available For</label>
    <input
      {...register('available_for')}
      className="w-full border p-2 rounded"
      placeholder="Freelance projects, Full-time roles"
    />
  </div>
</div>

        <div>
          <label className='block text-sm font-medium'>Theme</label>
          <select {...register('theme')} className='w-full border rounded p-2'>
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value='minimal'>Minimal</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>Avatar</label>
          {profile?.avatar && <img src={profile.avatar} alt='Avatar' className='h-20 w-20 object-cover rounded-full mb-2'/>}
          <input type="file" accept='image/*' onChange={handleAvatarUpload} />
        </div>

        <div>
          <label className='block text-sm font-medium'>Resume</label>
          {profile?.resume && <a href={profile.resume} target='_blank' className='text-blue-600 underline block mb-1'>Current Resume : {profile.resume}</a>}
          <input type="file" accept='.pdf,.doc,.docx' onChange={handleResumeUpload} />
        </div>


        <button type="submit" disabled = {isSubmitting} className='bg-indigo-500  text-white py-2 px-6 rounded hover:bg-indogo-700    cursor-pointer shadow   '>
          {isSubmitting ? "Saving" : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}

export default ProfilePage



// import React from 'react'
// import { useEffect, useState } from 'react'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import api from '../api/axios'
// import { useForm } from 'react-hook-form'
// import { useProfile, useUpdateProfile, useCreateProfile, useUploadResume } from '../hooks/useProfile'

// const profileSchema = z.object({
//   full_name: z.string().min(2, 'Full name is required'),
//   headline: z.string().min(2, 'Headline is required'),
//   bio: z.string().min(10, 'Bio must be least 10 characters'),
//   github: z.string().url().optional().or(z.literal('')),
//   linkedin: z.string().url().optional().or(z.literal('')),
//   twitter: z.string().url().optional().or(z.literal('')),
//   website: z.string().url().optional().or(z.literal('')),
//   theme: z.string().min(1),
//   contact_email: z.string().email().optional().or(z.literal('')),
//   show_contact_form: z.boolean().optional(),
//   location: z.string().optional(),
//   available_for: z.string().optional(),
// })

// /* ----------------------------------------------------------------- *
//  * Icons
//  * ----------------------------------------------------------------- */

// const iconProps = {
//   viewBox: '0 0 24 24',
//   fill: 'none',
//   stroke: 'currentColor',
//   strokeWidth: 1.5,
//   strokeLinecap: 'round',
//   strokeLinejoin: 'round',
// }

// const IconAlert = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <circle cx="12" cy="12" r="9" />
//     <path d="M12 8v5" />
//     <path d="M12 16h.01" />
//   </svg>
// )

// const IconLink = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M9.5 14.5 14.5 9.5" />
//     <path d="M11 6.5 12.5 5a3.5 3.5 0 0 1 5 5L16 11.5" />
//     <path d="M13 17.5 11.5 19a3.5 3.5 0 0 1-5-5L8 12.5" />
//   </svg>
// )

// const IconSpinner = (props) => (
//   <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden="true">
//     <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
//     <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// )

// /* ----------------------------------------------------------------- *
//  * Shared form primitives
//  * ----------------------------------------------------------------- */

// const inputClass =
//   'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-amber-400/50 focus:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-amber-400/40'

// function fieldA11y(id, hasError) {
//   return {
//     id,
//     'aria-invalid': hasError || undefined,
//     'aria-describedby': hasError ? `${id}-error` : undefined,
//   }
// }

// function Field({ id, label, error, hint, children }) {
//   return (
//     <div>
//       <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
//         {label}
//       </label>
//       {children}
//       {error ? (
//         <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
//           <IconAlert className="h-3 w-3 shrink-0" />
//           {error.message}
//         </p>
//       ) : hint ? (
//         <p className="mt-1.5 text-xs text-white/30">{hint}</p>
//       ) : null}
//     </div>
//   )
// }

// function LinkField({ id, name, label, placeholder, register, error }) {
//   return (
//     <Field id={id} label={label} error={error}>
//       <div className="relative">
//         <IconLink className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
//         <input
//           type="url"
//           placeholder={placeholder}
//           {...register(name)}
//           {...fieldA11y(id, !!error)}
//           className={`${inputClass} pl-9`}
//         />
//       </div>
//     </Field>
//   )
// }

// function Section({ eyebrow, title, description, children }) {
//   return (
//     <section className="border-b border-white/[0.08] py-8 first:pt-0 last:border-b-0 last:pb-0">
//       <div className="mb-5">
//         <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300/70">{eyebrow}</p>
//         <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
//         {description && <p className="mt-1 text-sm text-white/40">{description}</p>}
//       </div>
//       <div className="space-y-5">{children}</div>
//     </section>
//   )
// }

// const themeOptions = [
//   { value: 'default', label: 'Default' },
//   { value: 'dark', label: 'Dark' },
//   { value: 'minimal', label: 'Minimal' },
// ]

// function ThemeSelector({ register }) {
//   return (
//     <div className="inline-flex flex-wrap rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
//       {themeOptions.map((opt) => (
//         <label key={opt.value} className="relative">
//           <input type="radio" value={opt.value} {...register('theme')} className="peer sr-only" />
//           <span className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-white/50 transition-colors duration-200 peer-checked:bg-amber-400 peer-checked:font-medium peer-checked:text-zinc-950 peer-hover:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-amber-400/50">
//             {opt.label}
//           </span>
//         </label>
//       ))}
//     </div>
//   )
// }
// <div className="border-t pt-4 mt-4">
//   <h3 className="text-lg font-semibold mb-3">Contact Settings</h3>
  
//   <div className="mb-4">
//     <label className="block text-sm font-medium mb-1">Contact Email</label>
//     <input
//       {...register('contact_email')}
//       type="email"
//       className="w-full border p-2 rounded"
//       placeholder="you@example.com"
//     />
//     <p className="text-xs text-gray-500 mt-1">
//       Messages from your portfolio will be sent to this email.
//       Leave blank to use your account email.
//     </p>
//   </div>

//   <div className="flex items-center gap-2 mb-4">
//     <input
//       type="checkbox"
//       {...register('show_contact_form')}
//       id="show_contact_form"
//       className="h-4 w-4"
//     />
//     <label htmlFor="show_contact_form" className="text-sm">
//       Show contact form on my portfolio
//     </label>
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-medium mb-1">Location</label>
//     <input
//       {...register('location')}
//       className="w-full border p-2 rounded"
//       placeholder="San Francisco, CA"
//     />
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-medium mb-1">Available For</label>
//     <input
//       {...register('available_for')}
//       className="w-full border p-2 rounded"
//       placeholder="Freelance projects, Full-time roles"
//     />
//   </div>
// </div>

// function AvatarUploader({ avatarUrl, fullName, onUpload, uploading }) {
//   const initials =
//     (fullName || '')
//       .split(' ')
//       .filter(Boolean)
//       .slice(0, 2)
//       .map((part) => part[0]?.toUpperCase())
//       .join('') || '?'

//   return (
//     <div className="flex flex-col items-center gap-2 sm:items-start">
//       <label
//         htmlFor="avatar-upload"
//         className="group relative block h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/[0.04] focus-within:ring-2 focus-within:ring-amber-400/50 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950"
//       >
//         {avatarUrl ? (
//           <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
//         ) : (
//           <span className="flex h-full w-full items-center justify-center font-mono text-xl text-white/40">
//             {initials}
//           </span>
//         )}
//         <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-center text-[11px] font-medium leading-tight text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
//           {uploading ? 'Uploading…' : 'Change photo'}
//         </span>
//         <input
//           id="avatar-upload"
//           type="file"
//           accept="image/*"
//           onChange={onUpload}
//           disabled={uploading}
//           className="sr-only"
//         />
//       </label>
//       <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">Avatar</p>
//     </div>
//   )
// }

// function ResumeUploader({ resumeUrl, onUpload, uploading }) {
//   const filename = resumeUrl ? decodeURIComponent(resumeUrl.split('/').pop()) : null

//   return (
//     <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
//       <div className="min-w-0">
//         {filename ? (
//           <>
//             <p className="truncate text-sm text-white">{filename}</p>
//             <a
//               href={resumeUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xs text-amber-300/80 underline decoration-white/20 underline-offset-2 hover:text-amber-300"
//             >
//               View current resume
//             </a>
//           </>
//         ) : (
//           <p className="text-sm text-white/40">No resume uploaded yet.</p>
//         )}
//       </div>

//       <label
//         htmlFor="resume-upload"
//         className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition-colors duration-200 hover:border-amber-400/40 hover:text-white focus-within:ring-2 focus-within:ring-amber-400/50 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950"
//       >
//         {uploading ? 'Uploading…' : filename ? 'Replace file' : 'Upload file'}
//         <input
//           id="resume-upload"
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={onUpload}
//           disabled={uploading}
//           className="sr-only"
//         />
//       </label>
//     </div>
//   )
// }

// function ProfileFormSkeleton() {
//   return (
//     <div role="status" className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
//       <span className="sr-only">Loading profile…</span>
//       <div aria-hidden="true" className="animate-pulse space-y-8">
//         <div className="space-y-3">
//           <div className="h-3 w-20 rounded bg-white/10" />
//           <div className="h-8 w-56 rounded-lg bg-white/10" />
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="h-24 w-24 rounded-full bg-white/10" />
//           <div className="flex-1 space-y-3">
//             <div className="h-10 rounded-xl bg-white/[0.06]" />
//             <div className="h-10 rounded-xl bg-white/[0.06]" />
//           </div>
//         </div>
//         <div className="h-28 rounded-xl bg-white/[0.06]" />
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className="h-10 rounded-xl bg-white/[0.06]" />
//           <div className="h-10 rounded-xl bg-white/[0.06]" />
//           <div className="h-10 rounded-xl bg-white/[0.06]" />
//           <div className="h-10 rounded-xl bg-white/[0.06]" />
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ----------------------------------------------------------------- *
//  * Page
//  * ----------------------------------------------------------------- */

// function ProfilePage() {
//   const { data: profile, isLoading } = useProfile()
//   const updateMutation = useUpdateProfile()
//   const createMutation = useCreateProfile()
//   const uploadResume = useUploadResume()
//   const isNew = !profile

//   const [avatarUploading, setAvatarUploading] = useState(false)
//   const [resumeUploading, setResumeUploading] = useState(false)

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       full_name: '',
//       headline: '',
//       bio: '',
//       github: '',
//       linkedin: '',
//       twitter: '',
//       website: '',
//       theme: 'default',
//     },
//   })

//   useEffect(() => {
//     if (profile) {
//       reset(profile)
//     }
//   }, [profile, reset])

//   const bioLength = watch('bio')?.length ?? 0

//   const onSubmit = async (data) => {
//     const payload = { ...data }
//     if (!isNew) {
//       payload.id = profile.id
//       await updateMutation.mutateAsync(payload)
//     } else {
//       await createMutation.mutateAsync(payload)
//     }
//   }

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file || !profile) return
//     const formData = new FormData()
//     formData.append('avatar', file)

//     setAvatarUploading(true)
//     try {
//       await api.patch(`/profiles/${profile.id}/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       window.location.reload()
//     } finally {
//       setAvatarUploading(false)
//     }
//   }

//   const handleResumeUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file || !profile) return
//     const formData = new FormData()
//     formData.append('resume', file)

//     setResumeUploading(true)
//     try {
//       await uploadResume.mutateAsync({
//         id: profile.id,
//         formData: formData,
//       })
//       window.location.reload()
//     } finally {
//       setResumeUploading(false)
//     }
//   }

//   if (isLoading) return <ProfileFormSkeleton />

//   return (
//     <div className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-10 sm:px-10 sm:py-14">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[120px]"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-[0.04]"
//         style={{
//           backgroundImage:
//             'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
//           backgroundSize: '40px 40px',
//         }}
//       />

//       <div className="relative mx-auto max-w-2xl">
//         <header className="mb-10">
//           <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">// Profile</p>
//           <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
//             {isNew ? 'Create your profile' : 'Edit profile'}
//           </h1>
//           <p className="mt-2 text-sm text-white/40">This information appears on your public portfolio.</p>
//         </header>

//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <Section eyebrow="Identity" title="Name &amp; headline">
//             <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
//               <AvatarUploader
//                 avatarUrl={profile?.avatar}
//                 fullName={profile?.full_name}
//                 onUpload={handleAvatarUpload}
//                 uploading={avatarUploading}
//               />

//               <div className="flex-1 space-y-5">
//                 <Field id="full_name" label="Full name" error={errors.full_name}>
//                   <input
//                     {...register('full_name')}
//                     {...fieldA11y('full_name', !!errors.full_name)}
//                     className={inputClass}
//                     placeholder="Ada Lovelace"
//                   />
//                 </Field>

//                 <Field id="headline" label="Headline" error={errors.headline}>
//                   <input
//                     {...register('headline')}
//                     {...fieldA11y('headline', !!errors.headline)}
//                     className={inputClass}
//                     placeholder="Frontend engineer building delightful interfaces"
//                   />
//                 </Field>
//               </div>
//             </div>

//             <Field
//               id="bio"
//               label="Bio"
//               error={errors.bio}
//               hint={`${bioLength} characters · 10 minimum`}
//             >
//               <textarea
//                 rows={4}
//                 {...register('bio')}
//                 {...fieldA11y('bio', !!errors.bio)}
//                 className={inputClass}
//                 placeholder="Tell visitors what you work on and what you care about."
//               />
//             </Field>
//           </Section>

//           <Section eyebrow="Social" title="Links" description="Optional — leave any of these blank.">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <LinkField
//                 id="github"
//                 name="github"
//                 label="GitHub"
//                 placeholder="https://github.com/username"
//                 register={register}
//                 error={errors.github}
//               />
//               <LinkField
//                 id="linkedin"
//                 name="linkedin"
//                 label="LinkedIn"
//                 placeholder="https://linkedin.com/in/username"
//                 register={register}
//                 error={errors.linkedin}
//               />
//               <LinkField
//                 id="twitter"
//                 name="twitter"
//                 label="Twitter"
//                 placeholder="https://twitter.com/username"
//                 register={register}
//                 error={errors.twitter}
//               />
//               <LinkField
//                 id="website"
//                 name="website"
//                 label="Personal website"
//                 placeholder="https://yourdomain.com"
//                 register={register}
//                 error={errors.website}
//               />
//             </div>
//           </Section>

//           <Section eyebrow="Appearance" title="Portfolio theme" description="Applied to your public portfolio.">
//             <ThemeSelector register={register} />
//           </Section>

//           <Section eyebrow="Documents" title="Resume">
//             <ResumeUploader
//               resumeUrl={profile?.resume}
//               onUpload={handleResumeUpload}
//               uploading={resumeUploading}
//             />
//           </Section>

//           <div className="flex items-center justify-end gap-3 pt-8">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isSubmitting && <IconSpinner className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />}
//               {isSubmitting ? 'Saving…' : 'Save profile'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage