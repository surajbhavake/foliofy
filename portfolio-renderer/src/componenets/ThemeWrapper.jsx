import defaultTheme from '../themes/default'
import darkTheme from '../themes/dark'
import minimalTheme from '../themes/minimal'

const themes = {
  default: defaultTheme,
  dark: darkTheme,
  minimal: minimalTheme,
}

const getTheme = (themeName) => themes[themeName] || themes['default']

export const ThemeWrapper = ({ themeName, children }) => {
  const theme = getTheme(themeName)

  return <div className={`min-h-screen ${theme.background} ${theme.text}`}>{children}</div>
}

export const useTheme = (themeName) => getTheme(themeName)

export default ThemeWrapper