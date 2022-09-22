import React from 'react';
import {useParams} from "react-router-dom";
import OrganizationNavBar from "./navbar/OrganizationNavBar";

import './OrganizationPage.scss'

function OrganizationPage() {
    const {organizationName} = useParams()

    return (
        <div className={'organization-page'}>
            <OrganizationNavBar
                organizationName={organizationName}
            />
            <div className='tab'>

            </div>
        </div>
    )
        ;
}

export default OrganizationPage;