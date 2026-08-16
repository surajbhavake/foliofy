import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience
} from '../hooks/useExperiences';
import { FiEdit, FiTrash2, FiBriefcase } from 'react-icons/fi';

const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  description: z.string().optional(),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional().or(z.literal('')),
  is_current: z.boolean().optional(),
  order: z.number().optional().default(0),
});

const ExperiencesPage = () => {
  const { data: experiences, isLoading } = useExperiences();
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '', role: '', description: '',
      start_date: '', end_date: '', is_current: false, order: 0
    },
  });

  const isCurrentlyWorking = watch('is_current');

  const onNew = () => {
    setEditing(null);
    reset({ company: '', role: '', description: '', start_date: '', end_date: '', is_current: false, order: 0 });
    setShowForm(true);
  };

  const onEdit = (exp) => {
    setEditing(exp);
    reset({
      ...exp,
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
    });
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    // Clean up data before sending
    const payload = { ...data };
    if (data.is_current) {
      payload.end_date = null;  // clear end date for current positions
    }
    if (!data.end_date) {
      payload.end_date = null;
    }

    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, ...payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this experience?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (isLoading) return <div className="p-6">Loading experiences...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button
          onClick={onNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
        >
          <FiBriefcase /> Add Experience
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? 'Edit Experience' : 'Add Experience'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input {...register('company')} className="w-full border p-2 rounded" placeholder="Google" />
                {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input {...register('role')} className="w-full border p-2 rounded" placeholder="Senior Frontend Developer" />
                {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full border p-2 rounded"
                placeholder="Led the redesign of the company's main product..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input type="date" {...register('start_date')} className="w-full border p-2 rounded" />
                {errors.start_date && <p className="text-red-400 text-xs mt-1">{errors.start_date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  {...register('end_date')}
                  className="w-full border p-2 rounded"
                  disabled={isCurrentlyWorking}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('is_current')}
                id="is_current"
                className="h-4 w-4"
              />
              <label htmlFor="is_current" className="text-sm">I currently work here</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Display Order</label>
              <input
                type="number"
                {...register('order', { valueAsNumber: true })}
                className="w-24 border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                {editing ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline Display */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {experiences?.map((exp) => (
            <div key={exp.id} className="relative flex gap-6">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-16 flex justify-center">
                <div className="w-4 h-4 bg-indigo-600 rounded-full mt-1.5 border-4 border-white shadow" />
              </div>

              {/* Content */}
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(exp)} className="text-blue-500 hover:text-blue-700">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                </p>
                {exp.description && (
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {experiences?.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <FiBriefcase className="mx-auto text-4xl mb-3" />
            <p>No experience added yet. Add your first position to build your timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencesPage