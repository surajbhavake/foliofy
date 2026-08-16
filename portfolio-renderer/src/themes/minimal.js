const minimalTheme = {
  name: 'minimal',

  background: 'bg-white',
  text: 'text-neutral-900',
  muted: 'text-neutral-400',

  primary: 'bg-neutral-900',
  primaryText: 'text-white',
  accent: 'text-neutral-900',
  ring: 'ring-neutral-900',

  card: 'bg-neutral-50',
  cardBorder: 'border-0',
  border: 'border-neutral-200',

  // Kept monochrome on purpose — minimal's whole point is no color,
  // so highlights are just a slightly darker neutral fill, not a brand hue
  highlightBg: 'bg-neutral-100',
  highlightBorder: 'border-neutral-300',
  highlightText: 'text-neutral-900',

  // Form fields (ContactSection)
  inputBg: 'bg-white',
  inputBorder: 'border-neutral-200',

  // Status banners keep conventional red/green — usability of "this
  // succeeded / this failed" outweighs strict monochrome here
  successBg: 'bg-green-50',
  successBorder: 'border-green-200',
  successText: 'text-green-700',
  errorBg: 'bg-red-50',
  errorBorder: 'border-red-200',
  errorText: 'text-red-700',

  heading: 'text-4xl sm:text-5xl font-light tracking-tight text-neutral-900',
  subheading: 'mt-2 text-lg sm:text-xl font-light text-neutral-400',
}

export default minimalTheme