import { Navbar } from 'react-bootstrap'
import { ThemeProvider, useTheme } from '../context/ThemeContext'


export function Header() {
    const darkTheme = useTheme()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : "#fff",
    }
    return (
      <ThemeProvider>
            <Navbar className='px-4 py-3 text-primary' style={themeStyles}>
                <h1>Woohoho translator</h1>
            </Navbar>
        </ThemeProvider>
       
    )
}