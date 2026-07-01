import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const loginSchema = z.object({
  username: z.string().min(1,'Username is required'),
  password : z.string().min(1,'Password is required')

})


const LoginPage = () => {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error,seterror] = useState('');
  const {register,handleSubmit , formState :{errors,isSubmitting} } = useForm({
    resolver:zodResolver(loginSchema)
  });

  const onSubmit = async(data) =>{
    try {
      await login(data.username,data.password);
      navigate('/dashboard');
    } catch (err) {
      seterror('Invalid Credientials, Please try again')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
      className='bg-white p-8 rounded shadow-md w-96  '
      onSubmit={handleSubmit(onSubmit)}>

        <h1 className='text-2xl font-bold mb-6 text-center'>Log in to Foliofy</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className='mb-4'>

          <label className='text-sm font-medium mb-1 block' >Username</label>

          <input 
          className='w-full border p-2 rounded '
          {...register('username')} 
          placeholder='Enter your name'
          />

          {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
          
        </div>

        <div className='mb-6'>

          <label className='text-sm font-medium mb-1 block'>Password</label>

          <input 
          type='password'
          className='w-full border p-2 rounded '
          {...register('password')} 
          placeholder='Enter you password'
          />

          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}

        </div>

        <button
        className='w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50'
        type='submit'
        disabled = {isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}

        </button>
      </form>
    </div>
  )
}

export default LoginPage