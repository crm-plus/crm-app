import React, {useState} from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css'

import CRMHeader from "./component/header/Header";

function App() {

    return (
        <BrowserRouter>
            <div className='app'>
                <CRMHeader theme={'dark'}/>

                <Routes>
                    {/*<Route path='organization/:name' element={<OrganizationMainPage/>}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
