import defaultTheme from '../themes/default'
import darkTheme from '../themes/dark'
import minimalTheme from '../themes/minimal'

const themes  = {
    default : defaultTheme,
    dark : darkTheme,
    minimal : minimalTheme,
}

export const ThemeWrapper = ({themeName,children}) =>{
    const theme = themes[themeName] || themes['default'];

    return (

        <div className={`min-h-screen ${theme.background} ${theme.text}`}>{children}</div>
    )

}

export  const useTheme  = (themeName)=>{
    return themes[themeName] || themes['default']
};

export default ThemeWrapper;