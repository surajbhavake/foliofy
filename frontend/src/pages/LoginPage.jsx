// import React from 'react'
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate,Link } from 'react-router-dom'; 

// const loginSchema = z.object({
//   username: z.string().min(1,'Username is required'),
//   password : z.string().min(1,'Password is required')

// })


// const LoginPage = () => {

//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [error,seterror] = useState('');
//   const {register,handleSubmit , formState :{errors,isSubmitting} } = useForm({
//     resolver:zodResolver(loginSchema)
//   });

//   const onSubmit = async(data) =>{
//     try {
//       await login(data.username,data.password);
//       navigate('/dashboard');
//     } catch (err) {
//       seterror('Invalid Credientials, Please try again')
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <form
//       className='bg-white p-8 rounded shadow-md w-96  '
//       onSubmit={handleSubmit(onSubmit)}>

//         <h1 className='text-2xl font-bold mb-6 text-center'>Log in to Foliofy</h1>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <div className='mb-4'>

//           <label className='text-sm font-medium mb-1 block' >Username</label>

//           <input 
//           className='w-full border p-2 rounded '
//           {...register('username')} 
//           placeholder='Enter your name'
//           />

//           {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
          
//         </div>

//         <div className='mb-6'>

//           <label className='text-sm font-medium mb-1 block'>Password</label>

//           <input 
//           type='password'
//           className='w-full border p-2 rounded '
//           {...register('password')} 
//           placeholder='Enter you password'
//           />

//           {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}

//         </div>

//         <button
//         className='w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50'
//         type='submit'
//         disabled = {isSubmitting}
//         >
//           {isSubmitting ? 'Logging in...' : 'Login'}

//         </button>

//         <p className="text-center text-sm text-gray-500 mt-4">
//              Don't have an account?{' '}
//              <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
//         </p>
//       </form>
//     </div>
//   )
// }

// export default LoginPage


import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
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

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setError('')
    try {
      await login(data.username, data.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    }
  }

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

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">// Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Log in to Foliofy</h1>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl shadow-black/50 sm:p-8">
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
            >
              <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Field id="username" label="Username" error={errors.username}>
              <input
                {...register('username')}
                {...fieldA11y('username', !!errors.username)}
                className={inputClass}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </Field>

            <Field id="password" label="Password" error={errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  {...fieldA11y('password', !!errors.password)}
                  className={`${inputClass} pr-10`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-white/30 transition-colors duration-200 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                >
                  {showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {isSubmitting && <IconSpinner className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />}
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-white/40">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-amber-300 transition-colors duration-200 hover:text-amber-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage