import React, {useState} from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CRMHeader from './component/header/Header';
import RegistrationPage from './page/registration/RegistrationPage';
import Page from './component/common/page/Page';
import LoginPage from "./page/login/LoginPage";

import 'react-toastify/dist/ReactToastify.css';
import './App.css'


function App() {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isAuthenticate, setIsAuthenticated] = useState<boolean>(false)

    return (
        <>
            <BrowserRouter>
                <div className='app'>
                    <CRMHeader theme={theme}/>

                    <Routes>
                        <Route path='signup' element={
                            <Page theme={theme}><RegistrationPage/></Page>}
                        />
                        <Route path='signin' element={
                            <Page theme={theme}><LoginPage setIsAuthenticate={setIsAuthenticated}/></Page>}
                        />
                        {/*<Route path='organization/:name' element={<OrganizationMainPage/>}/>*/}
                    </Routes>

                </div>

            </BrowserRouter>
            <ToastContainer position={'bottom-right'}/>
        </>

    )
}

export default App
