// const Footer = ({ profile, theme }) => {
//   return (
//     <footer className={`${theme.card} ${theme.cardBorder} mt-16 py-6 text-center text-sm text-gray-500`}>
//       <p>&copy; {new Date().getFullYear()} {profile.full_name}. Built with Foliofy.</p>
//     </footer>
//   );
// };

// export default Footer;

import { useEffect, useRef, useState } from 'react'

const IconArrowUp = (props) => (
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
    <path d="M12 19V6" />
    <path d="M6 11.5 12 6l6 5.5" />
  </svg>
)

const Footer = ({ profile, theme }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showFab, setShowFab] = useState(false)
  const footerRef = useRef(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer
        ref={footerRef}
        className={`${theme.card} ${theme.cardBorder} mt-16 border-t py-8`}
      >
        <div
          className={`mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-center transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 sm:flex-row sm:justify-between sm:text-left ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="text-sm text-current/50">
            &copy; {new Date().getFullYear()} {profile.full_name}. Built with{' '}
            <span className="font-medium text-current/70">Foliofy</span>.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full border border-current/10 px-3 py-1.5 text-xs font-medium text-current/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            <IconArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </footer>

      {/* Floating back-to-top — appears once you've scrolled down the page,
          so the control is available without hunting for the footer */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        tabIndex={showFab ? 0 : -1}
        className={`fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border ${theme.cardBorder} ${theme.card} shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
          showFab
            ? 'opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 translate-y-2'
        }`}
      >
        <IconArrowUp className="h-4 w-4" />
      </button>
    </>
  )
}

export default Footer