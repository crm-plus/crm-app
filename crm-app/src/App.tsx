import React, {useState} from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css'

import CRMHeader from './component/header/Header';
import RegistrationPage from './page/registration/RegistrationPage';
import Page from './component/common/page/Page';

function App() {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <BrowserRouter>
            <div className='app'>
                <CRMHeader theme={theme}/>

                <Routes>
                    <Route path='signup' element={
                        <Page theme={theme}><RegistrationPage/></Page>}
                    />
                    {/*<Route path='organization/:name' element={<OrganizationMainPage/>}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
