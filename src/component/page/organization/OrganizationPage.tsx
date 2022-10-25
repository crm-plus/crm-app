import React, { FC, useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import OrganizationNavBar from './navbar/OrganizationNavBar';

import Organization from '../../../type/Organization';
import MembersTab from './members/MembersTab';
import OrganizationService from '../../../service/OrganizationService';

import './OrganizationPage.scss';
import { useNavigate } from 'react-router-dom';

const OrganizationPage: FC = () => {
    const { organizationName } = useParams();
    const navigation = useNavigate();
    const [organization, setOrganization] = useState<Organization>();
    const [error, setError] = useState<string>();

    const fetchOrganization = async () => {
        OrganizationService.searchOrganizationByName(organizationName)
            .then((organizations) => {
                if(organizations.length == 0 || organizations.length > 1) {
                    throw Error('Found zero or more then one organization(s)');
                }
                const organization: Organization = organizations[0];
                if (organization) {
                    setOrganization(organization);
                }
                return organization;
            }).catch((er) => {
                navigation('/home/organizations');
            });

    };

    useEffect(() => {
        fetchOrganization();
    }, []);

    return organization ?
        (<div className={'organization-page'}>
            <OrganizationNavBar
                organizationName={organizationName}
            />
            <Routes>
                <Route path={'members/*'} element={
                    <MembersTab
                        organization={organization}
                    />
                } />
            </Routes>
        </div>) :
        (<div>

        </div>);


};

export default OrganizationPage;