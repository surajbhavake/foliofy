import React from 'react'
import { useState } from 'react'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useProjects,useCreateProject,useDeleteProject,useUpdateProject } from '../hooks/useProjects'
import {FiEdit,FiTrash} from 'react-icons/fi'

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
    defaultValues:{
        title: '',
        description: '', 
        live_url: '',
        repo_url: '', 
        order: 0 
    }
  })



  const onNew = () =>{
    setEditing(null);
    reset(defaultValues)
    setShowForm(true);
  }

  const onEdit = () =>{
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
    form.append('image',file)
  }


  if(editing){
    await updateMutation.mutateAsync({
      id:editing.id,
      formData
    })
  }
  else{
    await createMutation(formData)
  }
  setShowForm(false)
  }




  return (
    <div>ProjectsPage</div>
  )
}

export default ProjectsPage