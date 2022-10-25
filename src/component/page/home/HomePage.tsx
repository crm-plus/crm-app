import React, { useEffect } from 'react';

import './HomePage.scss';
import SideBar from '../../common/sidebar/SideBar';
import SideBarNav from '../../common/sidebar/SideBarNav';
import { Route, Routes, useNavigate } from 'react-router-dom';
import OrganizationIcon from '../../common/icon/google/OrganizationIcon';
import OrganizationTab from './tab/OrganizationTab';

function HomePage() {

    return (
        <div className="main-page">
            <SideBar>
                <SideBarNav
                    links={[
                        {
                            title: 'Organizations',
                            to: 'organizations',
                            icon: <OrganizationIcon />,
                            isActive: true
                        }
                    ]}
                />
            </SideBar>
            <Routes>
                <Route path={'organizations'} element={<OrganizationTab />} />
            </Routes>
        </div>
    );
}

export default HomePage;