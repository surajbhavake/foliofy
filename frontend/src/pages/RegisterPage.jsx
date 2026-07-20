import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";



const registerSchema = z.object({
    username : z.string().min(3,'Username must be atleast 2 characters')
        .max(30).regex(/^[a-zA-Z0-9]+$/,'Only letters,numbers and underscores'),
    
    email : z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password2: z.string(),

    subdomain: z.string().min(3, 'Subdomain must be at least 3 characters')
    .max(50).regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Invalid subdomain format'),

    full_name: z.string().min(2, 'Full name is required'),

}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
});



const RegisterPage = () => {
    // const {login} = useAuth();

    // const navigate = useNavigate()
    const[error,setError] = useState('');
    const[subdomainPreview,setSubdomainPreview] = useState('')

    const {register:registerUser} = useAuth()

    const{register,handleSubmit,watch,formState:{errors,isSubmitting}} = useForm({
        resolver:zodResolver(registerSchema),
    })



const watchSubdomain = watch('subdomain')

const updatePreview = (e)=>{
    const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    e.target.value = val;
    setSubdomainPreview(val ? `https://${val}.blackfade.com` : '')
};

const onSubmit = async(data) =>{
    try {
        // const response = await api.post('/register/',{
        //     username : data.username,
        //     email : data.email,
        //     password : data.password,
        //     password2 : data.password2,
        //     subdomain : data.subdomin,
        //     full_name: data.full_name,
        // })

        // localStorage.setItem('access_token',response.data.access);
        // localStorage.setItem('refresh_token',response.data.refresh);
        await registerUser(data);
        window.location.href = '/dashboard'
    } catch (err) {
        const serverErrors = err.response?.data
        if(serverErrors){
            const message = Object.entries(serverErrors).map(([fields,msg])=>`${fields}:${Array.isArray(msg) ? msg.join(',') : msg}`).join('\n');
            setError(message)
        }else{
            setError('Registration failed. Please try again later.')
        }
    }
}

return(
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Your Portfolio</h1>

             {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-line">
            {error}
          </div>
        )}
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input {...register('full_name')} className="w-full border p-2 rounded" placeholder="Amanda Johnson" />
             {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" {...register('email')} className="w-full border p-2 rounded" placeholder="amanda@example.com" />
             {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input {...register('username')} className="w-full border p-2 rounded" placeholder="amanda_j" />
          {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
            Portfolio Subdomain
          </label>
            <div className="flex items-center">
                            <input
              {...register('subdomain')}
              onChange={updatePreview}
              className="w-full border p-2 rounded-l"
              placeholder="amanda"
            />
            <span className="bg-gray-100 border border-l-0 p-2 rounded-r text-gray-500 text-sm">.blackfade.com</span>

            </div>

                      {subdomainPreview && (
            <p className="text-xs text-indigo-600 mt-1">Your portfolio: {subdomainPreview}</p>
          )}
          {errors.subdomain && <p className="text-red-400 text-xs mt-1">{errors.subdomain.message}</p>}
        </div>


         <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" {...register('password')} className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

         <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input type="password" {...register('password2')} className="w-full border p-2 rounded" />
          {errors.password2 && <p className="text-red-400 text-xs mt-1">{errors.password2.message}</p>}
        </div>


         <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Portfolio'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
             Already have an account?{' '}
             <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </p>
         </form>
     </div>
)

}


export default RegisterPage