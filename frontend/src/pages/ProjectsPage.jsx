import React from 'react'
import { useState } from 'react'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useProjects,useCreateProject,useDeleteProject,useUpdateProject } from '../hooks/useProjects'
import {FiEdit,FiTrash2} from 'react-icons/fi'

const projectSchema = z.object({
  title:z.string().min(1),
  description : z.string().min(5),
  live_url : z.string().url().optional().or(z.literal('')),
  repo_url : z.string().url().optional().or(z.literal('')),
  order : z.number().optional()
})
function ProjectsPage() {

  const {data:projects ,isLoading} = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  const [editing,setEditing] = useState(null);
  const [showForm,setShowForm] = useState(false);

  const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm({
    resolver:zodResolver(projectSchema),
    // defaultValues:{
    //     title: '',
    //     description: '', 
    //     live_url: '',
    //     repo_url: '', 
    //     order: 0 
    // }
  })



  const onNew = () =>{
    setEditing(null);
    reset({ title: '',
        description: '', 
        live_url: '',
        repo_url: '', 
        order: 0 })
    setShowForm(true);
  }

  const onEdit = (project) =>{
    setEditing(project)
    reset(project)
    setShowForm(true)
  }

  const onSubmit = async(data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key,value])=>{
      if(value !== undefined && value !== '') formData.append(key,value)
    });
  const fileInput = document.querySelector('input[name="image"]');
  const file = fileInput?.files[0]
  if(file){
    formData.append('image',file)
  }


  if(editing){
    await updateMutation.mutateAsync({
      id:editing.id,
      formData
    })
  }
  else{
    await createMutation.mutateAsync(formData)
  }
  setShowForm(false)
  }

  const handleDelete = async(id) =>{
    if(window.confirm('Are you sure you want to delete this project?')){
      await deleteMutation.mutateAsync(id) 
    }
  }

  if(isLoading) return <div>Loading projects....</div>



  return (
    <div>
      <div className="flex justify-between items-center mb-4" >
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={onNew} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">New Project</button>
      </div>

      {showForm && (
        <div  className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Editing Project" : 'Create Project'}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           <div>
             <label  className="block text-sm font-medium">Title</label>
            <input {...register('title')}  className="w-full border p-2 rounded" />
            {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
           </div>

           <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea {...register('description')} className="w-full border p-2 rounded"/>
            {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
           </div>

           <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Live URL</label>
              <input {...register('live_url')} className="w-full border p-2 rounded" />
              {errors.live_url && <p>{errors.live_url.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Repo URL</label>
              <input {...register('repo_url')}  className="w-full border p-2 rounded"/>
              {errors.repo_url && <p>{errors.repo_url.message}</p>}
            </div>

           </div>
           <div>
            <label className="block text-sm font-medium">Order</label>
            <input type='number' {...register('order',{valueAsNumber:true})} className="w-full border p-2 rounded"/>

           </div>

           <div>
            <label  className="block text-sm font-medium">Image</label>
            <input type="file" name='image' accept='image/*'  />
           </div>
           <div className="flex justify-end space-x-3">
            <button type="button" onClick={()=>setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{editing ? 'Update' : 'Create'}</button>
           </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project)=>(
          <div key={project.id} className="bg-white p-4 rounded shadow flex space-x-4">
            {project.image && <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded"/>}

            <div className="flex-1">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description?.substring(0,100)}...</p>
            </div>
            <div className="flex flex-col space-y-2">
               <button onClick={() => onEdit(project)} className="text-blue-500 hover:text-blue-700"><FiEdit /></button>
              <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
    

    
  )}

export default ProjectsPage