import React, { useContext } from 'react';
import SideBar from '../../common/sidebar/SideBar';
import SideBarNav from '../../common/sidebar/SideBarNav';
import './ProfilePage.scss';
import { Context } from '../../../index';
import ManageAccountIcon from '../../common/icon/google/ManageAccountIcon';
import HistoryIcon from '../../common/icon/google/HistoryIcon';
import NotificationIcon from '../../common/icon/google/NotificationIcon';
import SecurityIcon from '../../common/icon/google/SecurityIcon';
import { Route, Routes } from 'react-router-dom';
import ProfileTab from './ProfileTab';
import CustomAvatar from '../../common/avatar/Avatar';
import NotificationTab from './tab/notification/NotificationTab';

const ProfilePage = () => {

    const { auth } = useContext(Context);
    const items = [
        { title: 'Personal Info', to: 'edit', icon: <ManageAccountIcon />, isActive: true },
        { title: 'User history', to: '', icon: <HistoryIcon />, isActive: false },
        { title: 'Notification', to: 'notification', icon: <NotificationIcon />, isActive: false },
        { title: 'Security', to: '', icon: <SecurityIcon />, isActive: false }
    ];

    return (
        <div className="profile-page">
            <div className="left-navbar">

                <SideBar variant={'tabs'}>
                    <div className="user-header">
                        <CustomAvatar name={auth.getUsername()} size={'40px'} textSizeRation={0.2} round={'2px'} />
                        <div className="username">{auth.getUsername()}</div>
                    </div>
                    <SideBarNav links={items} />
                </SideBar>
            </div>
            <Routes>
                <Route path={'edit'} element={<ProfileTab />} />
                <Route path={'notification'} element={<NotificationTab />} />
            </Routes>
        </div>
    );
};

export default ProfilePage;