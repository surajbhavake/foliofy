// import {Link} from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';

// const Navbar = ({profile,theme})=>{
//     return(
//         <nav className={`${theme.card} ${theme.cardBorder} shadow-sm`}>
//             <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
//                 <Link to='/'  className="text-xl font-bold">{profile.full_name}</Link>
//                 <div className="space-x-4">
//                     <HashLink smooth to="/#projects">
//     Projects
// </HashLink>

// <HashLink smooth to="/#skills">
//     Skills
// </HashLink>
//                     <Link to = '/blog' className="hover:underline">Blog</Link>

//                     {profile.resume && (
//                         <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar;


import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const IconMenu = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

const IconClose = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
)

const IconDownload = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M12 4v11" />
    <path d="M8 11.5 12 15.5 16 11.5" />
    <path d="M5 18h14" />
  </svg>
)

const navLinkClass =
  'relative text-sm font-medium text-current/70 transition-colors duration-200 hover:text-current after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-200 hover:after:w-full'

function NavLinks({ profile, onNavigate }) {
  return (
    <>
      <HashLink smooth to="/#projects" onClick={onNavigate} className={navLinkClass}>
        Projects
      </HashLink>
      <HashLink smooth to="/#skills" onClick={onNavigate} className={navLinkClass}>
        Skills
      </HashLink>
      <Link to="/blog" onClick={onNavigate} className={navLinkClass}>
        Blog
      </Link>
      {profile.resume && (
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1.5 text-sm font-medium text-current transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/70 hover:bg-amber-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <IconDownload className="h-3.5 w-3.5" />
          Resume
        </a>
      )}
    </>
  )
}

const Navbar = ({ profile, theme }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  return (
    <nav
      className={`sticky top-0 z-40 ${theme.card} ${theme.cardBorder} transition-shadow duration-300 ${
        scrolled ? 'shadow-md backdrop-blur-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          {profile.full_name}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 sm:flex">
          <NavLinks profile={profile} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-current/70 transition-colors duration-200 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 sm:hidden"
        >
          {mobileOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`${theme.cardBorder} border-t px-4 py-4 sm:hidden`}>
          <div className="flex flex-col items-start gap-4">
            <NavLinks profile={profile} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar