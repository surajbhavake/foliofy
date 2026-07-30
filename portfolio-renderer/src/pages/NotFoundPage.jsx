// import { Link } from 'react-router-dom';

// const NotFoundPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-6xl font-bold text-gray-300">404</h1>
//         <p className="text-gray-500 mt-4">Page not found.</p>
//         <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Go Home</Link>
//       </div>
//     </div>
//   );
// };

// export default NotFoundPage;


import { Link } from 'react-router-dom'

const IconArrowLeft = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden="true"
  >
    <path d="M19 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </svg>
)

const IconCompass = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.5 13 13l-3.5 1.5L11 11z" />
  </svg>
)

const NotFoundPage = () => {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
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

      <div className="relative flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-amber-300">
          <IconCompass className="h-6 w-6" />
        </div>

        <p className="mt-6 font-mono text-8xl font-bold tracking-tight text-white/10 sm:text-9xl">404</p>
        <h1 className="-mt-6 text-2xl font-semibold text-white sm:text-3xl">Page not found</h1>
        <p className="mt-3 max-w-sm text-sm text-white/40">
          The page you're looking for doesn't exist, or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <IconArrowLeft className="h-4 w-4" />
          Go home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage