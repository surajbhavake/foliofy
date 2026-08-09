// // const HeroSection = ({profile,theme})=>{
// //     return(
// //         <section className="max-w-5xl mx-auto px-4 py-20 text-center">
// //             {profile.avatar && (
// //                 <img src={profile.avatar} alt={profile.full_name} 
// //                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-200"
// //                 />
// //             )}

// //             <h1 className={theme.heading}>{profile.full_name}</h1>
// //             <p className={`mt-4 ${theme.subheading}`}>{profile.headline}</p>
// //             <div  className="flex justify-center space-x-4 mt-6">
// //                 {profile.github && (<SocialLink href = {profile.github} label = 'Github'/>)}
// //                 {profile.linkedin && <SocialLink href = {profile.linkedin} label = "LinkedIn"/>}
// //                 {profile.twitter && <SocialLink href = {profile.twitter} label ='Twitter'/>}
// //                 {profile.website && <SocialLink href = {profile.website} label = 'Webite'/>}
// //             </div>
// //         </section>
// //     )
// // }

// // const SocialLink = ({href,label}) =>(
// //     <a href={href} target="_blank" rel="noopener onreferrer"  className="text-indigo-500 hover:text-indigo-700 underline">{label}</a>
// // )


// // export default HeroSection;



import { useEffect, useRef, useState } from 'react'
import { HashLink } from 'react-router-hash-link'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const IconGithub = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.4c0-.9.3-1.5.7-1.8-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.4-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.4 1.2a11.6 11.6 0 0 1 6 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2V21" />
  </svg>
)

const IconLinkedin = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M8 10.5V16" />
    <circle cx="8" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
    <path d="M12 16v-3.2c0-1.5 1-2.3 2.2-2.3s2.1.8 2.1 2.3V16" />
    <path d="M12 10.5V16" />
  </svg>
)

const IconTwitter = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M20.5 6.2a7.5 7.5 0 0 1-2.1.6 3.6 3.6 0 0 0 1.6-2 7.3 7.3 0 0 1-2.3.9 3.6 3.6 0 0 0-6.2 3.3A10.3 10.3 0 0 1 4 5a3.6 3.6 0 0 0 1.1 4.8 3.6 3.6 0 0 1-1.6-.4v.1a3.6 3.6 0 0 0 2.9 3.5 3.6 3.6 0 0 1-1.6.1 3.6 3.6 0 0 0 3.4 2.5A7.3 7.3 0 0 1 3 17a10.3 10.3 0 0 0 5.6 1.6c6.7 0 10.4-5.6 10.4-10.4v-.5a7.4 7.4 0 0 0 1.8-1.9Z" />
  </svg>
)

const IconWebsite = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
    <path d="M12 3a15 15 0 0 0 0 18" />
  </svg>
)

const IconDownload = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M12 4v11" />
    <path d="M8 11.5 12 15.5 16 11.5" />
    <path d="M5 18h14" />
  </svg>
)

const IconArrowRight = (props) => (
  <svg {...iconProps} className={props.className} aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

const socialConfig = {
  Github: IconGithub,
  LinkedIn: IconLinkedin,
  Twitter: IconTwitter,
  Website: IconWebsite,
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')
}

const HeroSection = ({ profile, theme }) => {
  const panelRef = useRef(null)
  const frameRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const socials = [
    profile.github && { href: profile.github, label: 'Github' },
    profile.linkedin && { href: profile.linkedin, label: 'LinkedIn' },
    profile.twitter && { href: profile.twitter, label: 'Twitter' },
    profile.website && { href: profile.website, label: 'Website' },
  ].filter(Boolean)

  useEffect(() => {
    if (reducedMotion) return
    const panel = panelRef.current
    if (!panel) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMove = (e) => {
      const rect = panel.getBoundingClientRect()
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height
      targetX = Math.max(-1, Math.min(1, relX))
      targetY = Math.max(-1, Math.min(1, relY))
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      panel.style.setProperty('--tilt-x', `${(-currentY * 8).toFixed(2)}deg`)
      panel.style.setProperty('--tilt-y', `${(currentX * 8).toFixed(2)}deg`)
      panel.style.setProperty('--shine-x', `${(currentX * 50 + 50).toFixed(1)}%`)
      panel.style.setProperty('--shine-y', `${(currentY * 50 + 50).toFixed(1)}%`)
      frameRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [reducedMotion])

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
      {/* Left: content */}
      <div className="text-center lg:text-left">
        <p className="mb-4 animate-[fadeIn_0.6s_ease-out] font-mono text-xs uppercase tracking-[0.25em] text-current/40">
          Hi, I'm
        </p>

        <h1 className={`animate-[fadeIn_0.6s_ease-out_0.05s_both] ${theme.heading}`}>{profile.full_name}</h1>

        {profile.headline && (
          <p
            className={`mx-auto mt-4 max-w-xl animate-[fadeIn_0.6s_ease-out_0.1s_both] lg:mx-0 ${theme.subheading}`}
          >
            {profile.headline}
          </p>
        )}

        <div className="mt-8 flex animate-[fadeIn_0.6s_ease-out_0.15s_both] flex-wrap items-center justify-center gap-3 lg:justify-start">
          <HashLink
            smooth
            to="/#projects"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            View Work
            <IconArrowRight className="h-3.5 w-3.5" />
          </HashLink>

          {profile.resume && (
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-current/15 px-5 py-2.5 text-sm font-medium text-current/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <IconDownload className="h-3.5 w-3.5" />
              Resume
            </a>
          )}
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex animate-[fadeIn_0.6s_ease-out_0.2s_both] flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            {socials.map(({ href, label }) => (
              <SocialLink key={label} href={href} label={label} />
            ))}
          </div>
        )}
      </div>

      {/* Right: spatial panel — CSS-only, cursor-tracked tilt */}
      <div className="relative mx-auto w-full max-w-xs animate-[fadeIn_0.7s_ease-out_0.1s_both] [perspective:1200px] lg:max-w-sm">
        <div
          ref={panelRef}
          style={{ transform: 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}
          className="relative aspect-square rounded-[2rem] border border-current/10 bg-gradient-to-br from-current/[0.04] to-transparent shadow-2xl shadow-black/10 transition-transform duration-150 ease-out will-change-transform"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] opacity-40"
            style={{
              background:
                'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(251,191,36,0.18), transparent 55%)',
            }}
          />
          <div className="absolute inset-6 flex items-center justify-center overflow-hidden rounded-2xl border border-current/[0.06] bg-current/[0.02] backdrop-blur-sm">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <span className="text-5xl font-bold text-current/20">{getInitials(profile.full_name)}</span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="fadeIn"], section * { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

const SocialLink = ({ href, label }) => {
  const Icon = socialConfig[label] || IconWebsite
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.02] px-4 py-2 text-sm font-medium text-current/70 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 dark:border-white/[0.08] dark:bg-white/[0.03]"
    >
      <Icon className="h-4 w-4 shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
      {label}
    </a>
  )
}

export default HeroSection