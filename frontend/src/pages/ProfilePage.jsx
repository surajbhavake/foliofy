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