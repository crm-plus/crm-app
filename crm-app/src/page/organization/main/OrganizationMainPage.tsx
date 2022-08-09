import React from 'react';
import {useParams} from "react-router-dom";
import OrganizationNavBar from "./navbar/OrganizationNavBar";

import './OrganizationMainPage.scss'

function OrganizationMainPage() {
    const {name} = useParams();

    return (
        <div >

        </div>
    );
}

export default OrganizationMainPage;