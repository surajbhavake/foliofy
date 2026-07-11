import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from '../hooks/useBlogPosts';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const blogSchema = z.object({
  title : z.string().min(1),
  content : z.string().min(10),
  is_published : z.boolean().optional(),
})

function BlogPage() {

  const {data : posts , isLoading} = useBlogPosts();
  const createMutation  =useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();
  const [editing,setEditing] = useState(null)
  const[showForm,setShowForm] = useState(true);
  const [preview,setPreview] = useState(false)

  const { register , handleSubmit,reset , watch,formState:{isSubmitting,errors}} = useForm({
    resolver:zodResolver(blogSchema),
    defaultValues:{title :'',content : '',is_published : false},
  })

  const onNew = ()=> {
    setEditing(null),
    reset({title :'',content : '',is_published : false}),
    setShowForm(true)
  };

  const onEdit = (post)  =>{
    setEditing(post),
    reset(post);
    setShowForm(true)
  }


  const onSubmit = async(data) =>{

    if(editing){
      await updateMutation.mutateAsync({
        id : editing.id,
        ...data
      })
    }
    else {
      await createMutation.mutateAsync(data)
    }
    setShowForm(false)
  }

  const handleDelete = async(id) =>{
    if(window.confirm('Delete this post')){
      await deleteMutation.mutateAsync(id)
    }
  }

  if(isLoading) return <div>Loading blog posts....</div>
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button onClick={onNew} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">New Post</button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Post' : 'Create Post'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input {...register('title')} className="w-full border p-2 rounded" />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-medium">Content (Markdown)</label>
                <button type="button" onClick={() => setPreview(!preview)} className="text-sm text-indigo-600">
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>
              {preview ? (
                <div className="border p-4 rounded min-h-50 //min-h-[200px]  prose">
                  <ReactMarkdown>{watch('content')}</ReactMarkdown>
                </div>
              ) : (
                <textarea {...register('content')} rows={12} className="w-full border p-2 rounded font-mono" />
              )}
              {errors.content && <p className="text-red-400 text-xs">{errors.content.message}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('is_published')} id="published" />
              <label htmlFor="published">Publish immediately</label>
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h3 className="font-semibold">{post.title} {!post.is_published && <span className="text-xs text-gray-400">(Draft)</span>}</h3>
              <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => onEdit(post)} className="text-blue-500"><FiEdit /></button>
              <button onClick={() => handleDelete(post.id)} className="text-red-500"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPage