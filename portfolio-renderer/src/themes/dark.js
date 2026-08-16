const darkTheme = {
  name: 'dark',

  background: 'bg-zinc-900',
  text: 'text-zinc-100',
  muted: 'text-zinc-400',

  primary: 'bg-purple-600',
  primaryText: 'text-white',
  accent: 'text-purple-400',
  ring: 'ring-purple-500',

  card: 'bg-zinc-800',
  cardBorder: 'border border-zinc-700',
  border: 'border-zinc-700',

  // Pills, badges, and link highlights — translucent so they read
  // correctly against zinc-800/900 instead of a flat light fill
  highlightBg: 'bg-purple-500/10',
  highlightBorder: 'border-purple-500/30',
  highlightText: 'text-purple-300',

  // Form fields (ContactSection)
  inputBg: 'bg-zinc-900',
  inputBorder: 'border-zinc-700',

  // Status banners — translucent variants; the light-mode bg-green-50/
  // bg-red-50 equivalents would be nearly invisible on zinc-900
  successBg: 'bg-green-500/10',
  successBorder: 'border-green-500/30',
  successText: 'text-green-400',
  errorBg: 'bg-red-500/10',
  errorBorder: 'border-red-500/30',
  errorText: 'text-red-400',

  heading: 'text-4xl sm:text-5xl font-bold tracking-tight text-white',
  subheading: 'mt-2 text-lg sm:text-xl text-zinc-400',
}

export default darkTheme