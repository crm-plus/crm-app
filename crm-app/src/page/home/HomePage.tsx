import React, {useEffect} from 'react';

import './HomePage.scss'
import SideBar from "../../component/common/sidebar/SideBar";
import SideBarNav from "../../component/common/sidebar/SideBarNav";
import {Route, Routes, useNavigate} from "react-router-dom";
import OrganizationIcon from "../../component/common/icon/google/OrganizationIcon";
import OrganizationTab from "./tab/OrganizationTab";
import SettingsIcon from "../../component/common/icon/google/SettingsIcon";

function HomePage() {

    let navigate = useNavigate()

    return (
        <div className='main-page'>
            <SideBar>
                <SideBarNav
                    links={[
                        {
                            title: 'Organizations',
                            to: 'organization',
                            icon: <OrganizationIcon/>,
                            isActive: true
                        }
                    ]}
                />
            </SideBar>
            <Routes>
                <Route path={'organization'} element={<OrganizationTab/>}/>
            </Routes>
        </div>
    );
}

export default HomePage;