import React from 'react'
import Header from './component/header/Header'

import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import OrganizationMainPage from "./page/organization/main/OrganizationMainPage";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css'

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
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <div className='app'>
                    <Header/>
                    <Routes>
                        <Route path='organization/:name' element={<OrganizationMainPage/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
