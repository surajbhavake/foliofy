import React from 'react'
import {useSkills,useCreateSkill,useDeleteSkill,useUpdateSkill} from '../hooks/useSkills'
import { useState } from 'react'
function SkillsPage() {

  const {data : skills,isLoading} = useSkills();
  const createMutation = useCreateSkill();
  const deleteMutation = useDeleteSkill();
  const updateMutation = useUpdateSkill();
  const [name, setName] = useState('')
  const [proficiency,setProficiency] = useState(50);
  const [editing,setEditing] = useState(null)


  const handleAdd = async(e) =>{
    e.preventDefault();
    if(!name.trim()) return;

    if(editing){
      await updateMutation.mutateAsync({
        id: editing.id,
        name,
        proficiency,
      })
      setEditing(null)
    }else{
    await createMutation.mutateAsync({name,proficiency});
    


  }
  setName('')
  setProficiency(50)
}

  if(isLoading) return <div>Loading Skills....</div>
  return (
        <div>
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill name" className="border p-2 rounded flex-1" />
        <input type="number" value={proficiency} onChange={(e) => setProficiency(Number(e.target.value))} min="0" max="100" className="border p-2 w-24" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{editing ? 'Update' : 'Add'}</button>
        {editing && (
    <button
        type="button"
        onClick={() => {
            setEditing(null);
            setName('');
            setProficiency(50);
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
        Cancel
    </button>
)}
      </form>

      <div className="space-y-4 w-2xs ">
        {skills?.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between bg-white py-3  px-4 gap-1  rounded shadow">
            <div>
              <span className="font-medium">{skill.name}</span>
              <span className="ml-4 text-gray-500">{skill.proficiency}%</span>
            </div>
            <button onClick={() => deleteMutation.mutateAsync(skill.id)} className="text-red-500 hover:text-red-700">Delete </button>
            <button onClick={()=>(setName(skill.name),setProficiency(skill.proficiency),setEditing(skill))} className ="text-blue-500 hover:text-blue-700  "> Edit</button>
          </div>
        ))}
      </div>
    </div>
 

  )
}

export default SkillsPage