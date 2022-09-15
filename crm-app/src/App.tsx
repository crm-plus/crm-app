import React, {useContext, useEffect, useState} from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";

import CRMHeader from './component/header/Header';
import RegistrationPage from './page/registration/RegistrationPage';
import Page from './component/common/page/Page';
import LoginPage from "./page/login/LoginPage";

import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {Context} from "./index";
import {ToastContainer} from "react-toastify";
import HomePage from "./page/home/HomePage";
import ProfilePage from "./page/profile/ProfilePage";


function App() {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const {auth} = useContext(Context);

    useEffect(() => {
        //auth.refresh();
    }, [])

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
                            <Page theme={theme}><LoginPage /></Page>}
                        />
                        <Route path='/home/*' element={<Page theme={theme}> <HomePage /> </Page>} />
                        {/*<Route path='organization/:organizationName' element={<Page theme={theme}><OrganizationPage /> </Page>}/>*/}
                        <Route path='/profile/*' element={<Page theme={theme}> <ProfilePage/> </Page>}/>
                    </Routes>

                </div>

            </BrowserRouter>
            <ToastContainer position={'bottom-right'}/>
        </>

    )
}

export default App
