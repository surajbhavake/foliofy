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

const socialConfig = {
  Github: IconGithub,
  LinkedIn: IconLinkedin,
  Twitter: IconTwitter,
  Website: IconWebsite,
}

const HeroSection = ({ profile, theme }) => {
  const socials = [
    profile.github && { href: profile.github, label: 'Github' },
    profile.linkedin && { href: profile.linkedin, label: 'LinkedIn' },
    profile.twitter && { href: profile.twitter, label: 'Twitter' },
    profile.website && { href: profile.website, label: 'Website' },
  ].filter(Boolean)

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
      {profile.avatar && (
        <div className="relative mx-auto mb-7 h-32 w-32 animate-[fadeIn_0.6s_ease-out]">
          <div
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-amber-300/40 via-transparent to-transparent blur-md"
          />
          <img
            src={profile.avatar}
            alt={profile.full_name}
            className="relative h-32 w-32 rounded-full border border-black/[0.06] object-cover shadow-xl shadow-black/10 ring-4 ring-white/60 dark:border-white/[0.08] dark:ring-white/[0.06]"
          />
        </div>
      )}

      <h1 className={`animate-[fadeIn_0.6s_ease-out_0.05s_both] ${theme.heading}`}>{profile.full_name}</h1>

      {profile.headline && (
        <p className={`mt-4 animate-[fadeIn_0.6s_ease-out_0.1s_both] ${theme.subheading}`}>{profile.headline}</p>
      )}

      {socials.length > 0 && (
        <div className="mt-8 flex animate-[fadeIn_0.6s_ease-out_0.15s_both] flex-wrap items-center justify-center gap-2.5">
          {socials.map(({ href, label }) => (
            <SocialLink key={label} href={href} label={label} />
          ))}
        </div>
      )}

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


import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Detects basic WebGL support so devices/browsers that can't render it
 * get the CSS-only background (aurora + noise) instead of a blank canvas.
 */
function useWebGLSupport() {
  const [supported, setSupported] = useState(true)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      setSupported(!!gl)
    } catch {
      setSupported(false)
    }
  }, [])
  return supported
}

/** Tracks normalized (-1..1) pointer position across the viewport. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handleMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])
  return pointer
}

/**
 * Small glowing spheres at each vertex of an icosahedron — reads as a
 * compiled node graph / API schema rather than a decorative blob, which
 * is why it's the signature shape for a backend-leaning full stack dev.
 */
function VertexNodes({ accent }) {
  const positions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.7, 0)
    const pos = geo.attributes.position
    const seen = new Set()
    const unique = []
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(v)
      }
    }
    geo.dispose()
    return unique
  }, [])

  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.026, 10, 10]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
    </>
  )
}

function Lattice({ pointer, reducedMotion, accent }) {
  const group = useRef(null)
  const core = useRef(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      const targetX = reducedMotion ? 0 : pointer.current.y * 0.3
      const targetY = (reducedMotion ? 0 : pointer.current.x * 0.3) + (reducedMotion ? 0 : t * 0.06)
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta)
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta)
    }
    if (core.current && !reducedMotion) {
      core.current.rotation.y -= delta * 0.18
      core.current.rotation.x += delta * 0.05
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.3} />
      </mesh>
      <VertexNodes accent={accent} />
      <mesh ref={core}>
        <icosahedronGeometry args={[0.82, 2]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.025}
          anisotropy={0.1}
          color={accent}
          backside
        />
      </mesh>
    </group>
  )
}

/**
 * Ambient, cursor-reactive 3D piece for the hero background.
 * Deliberately skips @react-three/postprocessing (bloom) — the emissive
 * nodes + colored point light already read as "glowing," and cutting the
 * extra render pass matters more for the Lighthouse >95 performance target
 * than the marginal bloom would add. Easy to layer back in later if wanted.
 */
export default function HeroScene({ accent = '#D9A756', reducedMotion = false, className = '' }) {
  const supported = useWebGLSupport()
  const pointer = usePointer()

  if (!supported) return null

  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5.5], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 5]} intensity={1.4} color={accent} />
        <pointLight position={[-4, -2, -3]} intensity={0.6} color="#5b6b8c" />
        <Suspense fallback={null}>
          <Float
            speed={reducedMotion ? 0 : 1.1}
            rotationIntensity={reducedMotion ? 0 : 0.35}
            floatIntensity={reducedMotion ? 0 : 0.6}
          >
            <Lattice pointer={pointer} reducedMotion={reducedMotion} accent={accent} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}