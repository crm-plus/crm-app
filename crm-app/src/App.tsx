import React from 'react'
import Header from './component/header/Header'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
})

const isDarkMode = true

function App() {
  return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme }>
          <CssBaseline />
          <div className='App'>
              <Header />
          </div>
      </ThemeProvider>
  )
}

export default App
