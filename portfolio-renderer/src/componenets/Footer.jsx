// const Footer = ({ profile, theme }) => {
//   return (
//     <footer className={`${theme.card} ${theme.cardBorder} mt-16 py-6 text-center text-sm text-gray-500`}>
//       <p>&copy; {new Date().getFullYear()} {profile.full_name}. Built with Foliofy.</p>
//     </footer>
//   );
// };

// export default Footer;


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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={`${theme.card} ${theme.cardBorder} mt-16 border-t py-8`}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
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
  )
}

export default Footer