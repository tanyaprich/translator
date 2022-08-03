import { Header } from './components/Header'
import { ButtonSwitchTheme } from './components/ButtonSwitchTheme'
import { Translator } from './components/Translator'
import { Container } from 'react-bootstrap'

import { ThemeProvider } from './context/ThemeContext'

export default function App() {
    return (
        <ThemeProvider>
            <Container-fluid className="h-100">
            <Header />
            <Translator />
            <ButtonSwitchTheme />
            </Container-fluid>
        </ThemeProvider>
    )
}