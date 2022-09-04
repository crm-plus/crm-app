import React from 'react';

import './MainPage.scss'
import SideBar from "../../component/common/sidebar/SideBar";
import SideBarNav from "../../component/common/sidebar/SideBarNav";
import {Route, Routes} from "react-router-dom";
import OrganizationIcon from "../../component/common/icon/google/OrganizationIcon";
import OrganizationTab from "./OrganizationTab";

function MainPage() {

    return (
        <div className='main-page'>
            <SideBar>
                <SideBarNav
                    links={[
                        {
                            title: 'Organizations',
                            to: 'org',
                            icon: <OrganizationIcon/>,
                            isActive: true
                        },
                        // {
                        //     title: 'Home',
                        //     to: 'home',
                        //     icon: <HomeIcon/>
                        // },
                    ]}
                />
            </SideBar>
            <Routes>
                <Route path={'org'} element={<OrganizationTab/>}/>
            </Routes>
        </div>
    );
}

export default MainPage;