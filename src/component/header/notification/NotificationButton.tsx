import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotificationIcon from '../../common/icon/google/NotificationIcon';
import { Nav } from 'react-bootstrap';
import NotificationActiveIcon from '../../common/icon/google/NotificationActiveIcon';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import InvitationService from '../../../service/InvitationService';


function NotificationButton() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const {auth, notification} = useContext(Context);

    function fetchNotificationCount() {
        InvitationService.getAllInvitations(auth.getUsername()).then((invitations) => {
            notification.setCount(invitations.length);
        });
    }

    useEffect(() => {
        fetchNotificationCount();
    },[]);

    const NotificationCounter = () => {
        return <>
            {notification.getCount()}
        </>;
    };

    return (
        <>
            <Nav.Link as={Link} to={'/profile/notification'}>
                <div className="nav-item">
                    {
                        notification.getCount() > 0 ? <NotificationActiveIcon/> : <NotificationIcon />
                    }
                    <NotificationCounter />
                </div>
            </Nav.Link>
        </>
    );
}

export default observer(NotificationButton);