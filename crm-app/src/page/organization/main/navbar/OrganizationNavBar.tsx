import React, {FC} from 'react';
import {Avatar, Typography, Button} from '@mui/material';

import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

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
                <div className={'organization-header'}>

                    <Avatar className={'organization-avatar'} variant='square'>
                        {organizationName.at(0)}
                    </Avatar>

                    <Typography
                        color={'primary'}
                        align={'left'}
                    >
                        {organizationName}
                    </Typography>

                </div>

                <div className={'organization-bar'}>
                    <Button endIcon={<GroupIcon/>}>
                        Members
                    </Button>
                    <Button endIcon={<SettingsIcon/>}>
                        Settings
                    </Button>
                </div>
            </div>
        );
    }

export default OrganizationNavBar;