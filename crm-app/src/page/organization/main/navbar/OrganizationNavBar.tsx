import React, {FC} from 'react';

import './OrganizationNavBar.scss'

interface OrganizationNavBarProps {
    organizationName: string
}

const OrganizationNavBar: FC<OrganizationNavBarProps> =
    ({
         organizationName
     }) => {
        return (
            <div className={'organization-nav-bar'}>

            </div>
        );
    }

export default OrganizationNavBar;