// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {z} from 'zod'
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";



// const registerSchema = z.object({
//     username : z.string().min(3,'Username must be atleast 2 characters')
//         .max(30).regex(/^[a-zA-Z0-9]+$/,'Only letters,numbers and underscores'),
    
//     email : z.string().email('Please enter a valid email'),
//     password: z.string().min(8, 'Password must be at least 8 characters'),
//     password2: z.string(),

//     subdomain: z.string().min(3, 'Subdomain must be at least 3 characters')
//     .max(50).regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Invalid subdomain format'),

//     full_name: z.string().min(2, 'Full name is required'),

// }).refine((data) => data.password === data.password2, {
//   message: "Passwords don't match",
//   path: ["password2"],
// });



// const RegisterPage = () => {
//     // const {login} = useAuth();

//     // const navigate = useNavigate()
//     const[error,setError] = useState('');
//     const[subdomainPreview,setSubdomainPreview] = useState('')

//     const {register:registerUser} = useAuth()

//     const{register,handleSubmit,watch,formState:{errors,isSubmitting}} = useForm({
//         resolver:zodResolver(registerSchema),
//     })



// const watchSubdomain = watch('subdomain')

// const updatePreview = (e)=>{
//     const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
//     e.target.value = val;
//     setSubdomainPreview(val ? `https://${val}.blackfade.com` : '')
// };

// const onSubmit = async(data) =>{
//     try {
//         // const response = await api.post('/register/',{
//         //     username : data.username,
//         //     email : data.email,
//         //     password : data.password,
//         //     password2 : data.password2,
//         //     subdomain : data.subdomin,
//         //     full_name: data.full_name,
//         // })

//         // localStorage.setItem('access_token',response.data.access);
//         // localStorage.setItem('refresh_token',response.data.refresh);
//         await registerUser(data);
//         window.location.href = '/dashboard'
//     } catch (err) {
//         const serverErrors = err.response?.data
//         if(serverErrors){
//             const message = Object.entries(serverErrors).map(([fields,msg])=>`${fields}:${Array.isArray(msg) ? msg.join(',') : msg}`).join('\n');
//             setError(message)
//         }else{
//             setError('Registration failed. Please try again later.')
//         }
//     }
// }

// return(
//      <div className="min-h-screen flex items-center justify-center bg-gray-100">
//          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//             <h1 className="text-2xl font-bold mb-6 text-center">Create Your Portfolio</h1>

//              {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-line">
//             {error}
//           </div>
//         )}
//         <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input {...register('full_name')} className="w-full border p-2 rounded" placeholder="Amanda Johnson" />
//              {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name.message}</p>}
//         </div>

//         <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input type="email" {...register('email')} className="w-full border p-2 rounded" placeholder="amanda@example.com" />
//              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Username</label>
//           <input {...register('username')} className="w-full border p-2 rounded" placeholder="amanda_j" />
//           {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
//         </div>

//         <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//             Portfolio Subdomain
//           </label>
//             <div className="flex items-center">
//                             <input
//               {...register('subdomain')}
//               onChange={updatePreview}
//               className="w-full border p-2 rounded-l"
//               placeholder="amanda"
//             />
//             <span className="bg-gray-100 border border-l-0 p-2 rounded-r text-gray-500 text-sm">.blackfade.com</span>

//             </div>

//                       {subdomainPreview && (
//             <p className="text-xs text-indigo-600 mt-1">Your portfolio: {subdomainPreview}</p>
//           )}
//           {errors.subdomain && <p className="text-red-400 text-xs mt-1">{errors.subdomain.message}</p>}
//         </div>


//          <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input type="password" {...register('password')} className="w-full border p-2 rounded" />
//           {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
//         </div>

//          <div className="mb-6">
//           <label className="block text-sm font-medium mb-1">Confirm Password</label>
//           <input type="password" {...register('password2')} className="w-full border p-2 rounded" />
//           {errors.password2 && <p className="text-red-400 text-xs mt-1">{errors.password2.message}</p>}
//         </div>


//          <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Creating Account...' : 'Create Portfolio'}
//         </button>

//         <p className="text-center text-sm text-gray-500 mt-4">
//              Already have an account?{' '}
//              <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
//         </p>
//          </form>
//      </div>
// )

// }


// export default RegisterPage


import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30)
      .regex(/^[a-zA-Z0-9]+$/, 'Only letters and numbers'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password2: z.string(),
    subdomain: z
      .string()
      .min(3, 'Subdomain must be at least 3 characters')
      .max(50)
      .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Invalid subdomain format'),
    full_name: z.string().min(2, 'Full name is required'),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ['password2'],
  })

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

const IconEye = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
)

const IconEyeOff = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M3 3l18 18" />
    <path d="M10.6 5.6A10.6 10.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15 15 0 0 1-2.9 3.8" />
    <path d="M6.6 6.9C4.3 8.4 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.4 0 2.6-.3 3.7-.8" />
    <path d="M9.7 10a2.5 2.5 0 0 0 3.6 3.5" />
  </svg>
)

const IconGlobe = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
    <path d="M12 3a15 15 0 0 0 0 18" />
  </svg>
)

const IconCheck = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" />
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

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        {label}
      </label>
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

function PasswordField({ id, label, register, name, error, show, onToggle }) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          {...register(name)}
          {...fieldA11y(id, !!error)}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-white/30 transition-colors duration-200 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        >
          {show ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  )
}

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

const RegisterPage = () => {
  const [error, setError] = useState('')
  const [subdomainPreview, setSubdomainPreview] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const updatePreview = (e) => {
    const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    e.target.value = val
    setSubdomainPreview(val ? `${val}.blackfade.com` : '')
  }

  const onSubmit = async (data) => {
    setError('')
    try {
      await registerUser(data)
      window.location.href = '/dashboard'
    } catch (err) {
      const serverErrors = err.response?.data
      if (serverErrors) {
        const message = Object.entries(serverErrors)
          .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
          .join('\n')
        setError(message)
      } else {
        setError('Registration failed. Please try again later.')
      }
    }
  }

  const { subdomainReg, ...subdomainFieldProps } = (() => {
    const reg = register('subdomain')
    return { subdomainReg: reg, ...reg }
  })()

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]"
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

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">// Get started</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Create your portfolio</h1>
          <p className="mt-2 text-sm text-white/40">Set up your account and claim your subdomain.</p>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl shadow-black/50 sm:p-8">
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 whitespace-pre-line rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
            >
              <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="full_name" label="Full name" error={errors.full_name}>
                <input
                  {...register('full_name')}
                  {...fieldA11y('full_name', !!errors.full_name)}
                  className={inputClass}
                  placeholder="Amanda Johnson"
                />
              </Field>

              <Field id="username" label="Username" error={errors.username}>
                <input
                  {...register('username')}
                  {...fieldA11y('username', !!errors.username)}
                  className={inputClass}
                  placeholder="amanda_j"
                />
              </Field>
            </div>

            <Field id="email" label="Email" error={errors.email}>
              <input
                type="email"
                {...register('email')}
                {...fieldA11y('email', !!errors.email)}
                className={inputClass}
                placeholder="amanda@example.com"
              />
            </Field>

            <Field id="subdomain" label="Portfolio subdomain" error={errors.subdomain}>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-200 focus-within:border-amber-400/50 focus-within:bg-white/[0.05]">
                <div className="flex items-center pl-3.5 text-white/25">
                  <IconGlobe className="h-4 w-4" />
                </div>
                <input
                  {...subdomainFieldProps}
                  onChange={(e) => {
                    subdomainFieldProps.onChange(e)
                    updatePreview(e)
                  }}
                  {...fieldA11y('subdomain', !!errors.subdomain)}
                  className="w-full bg-transparent px-2.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none"
                  placeholder="amanda"
                />
                <span className="flex items-center whitespace-nowrap border-l border-white/[0.08] bg-white/[0.02] px-3 font-mono text-xs text-white/40">
                  .blackfade.com
                </span>
              </div>
              {subdomainPreview && !errors.subdomain && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300/80">
                  <IconCheck className="h-3 w-3 shrink-0" />
                  Your portfolio will live at{' '}
                  <span className="font-mono text-amber-300">{subdomainPreview}</span>
                </p>
              )}
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <PasswordField
                id="password"
                label="Password"
                name="password"
                register={register}
                error={errors.password}
                show={showPassword}
                onToggle={() => setShowPassword((s) => !s)}
              />
              <PasswordField
                id="password2"
                label="Confirm password"
                name="password2"
                register={register}
                error={errors.password2}
                show={showPassword2}
                onToggle={() => setShowPassword2((s) => !s)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {isSubmitting && <IconSpinner className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />}
              {isSubmitting ? 'Creating account…' : 'Create portfolio'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-white/40">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-amber-300 transition-colors duration-200 hover:text-amber-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage