import React, { FC } from 'react';
import SideBarNav from '../../../common/sidebar/SideBarNav';
import SideBar from '../../../common/sidebar/SideBar';

import './OrganizationNavBar.scss';

import CustomAvatar from '../../../common/avatar/Avatar';
import SettingsIcon from '../../../common/icon/google/SettingsIcon';
import AnalyticIcon from '../../../common/icon/google/AnalyticIcon';
import MembersIcon from '../../../common/icon/google/MembersIcon';
import CalendarIcon from '../../../common/icon/google/CalendarIcon';
import TaskIcon from '../../../common/icon/google/TaskIcon';
import DashboardIcon from '../../../common/icon/google/DashboardIcon';
import CategoryIcon from '../../../common/icon/google/CategoryIcon';
import ListIcon from '../../../common/icon/google/ListIcon';
import OrderIcon from '../../../common/icon/google/OrderIcon';

interface OrganizationNavBarProps {
  organizationName?: string,
}

const OrganizationNavBar: FC<OrganizationNavBarProps> = ({
    organizationName
}) => {

    return (
        <div className={'organization-navbar'}>
            <div className={'header'}>
                <CustomAvatar name={organizationName} size="50" textSizeRation={1.45} round="5px" />
                <div className={'info'}>
                    <p>{organizationName}</p>
                </div>
                <div className="settings-icon">
                    <SettingsIcon />

                </div>
            </div>
            <SideBar variant={'tabs'}>
                <SideBarNav
                    links={[
                        {
                            title: 'Analytic',
                            to: 'analytic',
                            icon: <AnalyticIcon />,
                            isActive: false
                        },
                        {
                            title: 'Members',
                            to: 'members/all',
                            icon: <MembersIcon />,
                            isActive: false
                        },
                        {
                            title: 'Calendar',
                            to: '',
                            icon: <CalendarIcon />,
                            isActive: false
                        },
                        {
                            title: 'Project',
                            options: [
                                {
                                    title: 'Tasks',
                                    to: '',
                                    icon: <TaskIcon />,
                                    isActive: false
                                },
                                {
                                    title: 'Scrum Boards',
                                    to: '',
                                    icon: <DashboardIcon />,
                                    isActive: false
                                }
                            ]
                        },
                        {
                            title: 'E-Commerce',
                            options: [
                                {
                                    title: 'Category',
                                    to: '',
                                    icon: <CategoryIcon />,
                                    isActive: false
                                },
                                {
                                    title: 'Products',
                                    to: '',
                                    icon: <ListIcon />,
                                    isActive: false
                                },
                                {
                                    title: 'Orders',
                                    to: '',
                                    icon: <OrderIcon />,
                                    isActive: false
                                }
                            ]
                        }
                    ]}
                />
            </SideBar>
        </div>
    );
};

// {
//     title: 'E-Commerce',
//         options: [{
//     title: 'Product',
//     to: '',
//     icon: <OrganizationIcon/>,
//     isActive: false
// },
//     {
//         title: 'Orders',
//         to: '',
//         icon: <OrganizationIcon/>,
//         isActive: false
//     }
// ]
// },

export default OrganizationNavBar;