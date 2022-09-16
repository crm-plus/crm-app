import React, {useContext} from 'react';
import SideBar from "../../component/common/sidebar/SideBar";
import SideBarNav from "../../component/common/sidebar/SideBarNav";
import "./ProfilePage.scss"
import {Context} from "../../index";
import ProfileIcon from "../../component/common/icon/ProfileIcon";
import ManageAccountIcon from "../../component/common/icon/google/ManageAccountIcon";
import HistoryIcon from "../../component/common/icon/google/HistoryIcon";
import NotificationIcon from "../../component/common/icon/google/NotificationIcon";
import SecurityIcon from "../../component/common/icon/google/SecurityIcon";
import Card from "../../component/common/card/Card";
import CardHeader from "../../component/common/card/CardHeader";
import CardDescription from "../../component/common/card/CardDescription";
import {Form} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import ProfileTab from "./ProfileTab";

const ProfilePage = () => {

    const {auth} = useContext(Context);
    const settingButtons = [
        {title: 'Personal Info', to: 'edit', icon: <ManageAccountIcon/>, isActive: true},
        {title: 'User history', to: '', icon: <HistoryIcon/>, isActive: false},
        {title: 'Notification', to: '', icon: <NotificationIcon/>, isActive: false},
        {title: 'Security', to: '', icon: <SecurityIcon/>, isActive: false}
    ]

    return (
        <div className="profile-page">
            <div className="left-navbar">

                <SideBar variant={'tabs'}>
                    <div className="icon-username">
                        <ProfileIcon imgSrc="1.jpg"/>
                        <div className="username">{auth.username}</div>
                    </div>
                    <SideBarNav links={settingButtons}/>
                </SideBar>
            </div>
            <Routes>
                <Route path={'edit'} element={<ProfileTab/>}/>
            </Routes>
        </div>
    );
};

export default ProfilePage;