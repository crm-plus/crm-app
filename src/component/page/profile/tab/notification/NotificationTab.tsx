import React, { useContext, useEffect } from 'react';

import './NotificationTab.scss';
import { ListGroup, ListGroupItem, Tab, Tabs } from 'react-bootstrap';
import InvitationTab from './InvitationTab';




function NotificationTab() {
    return (
        <div className={'notification-tab'}>
            <Tabs
                defaultActiveKey="invitations"
                className={'tabs'}
                transition={false}
            >
                <Tab eventKey="invitations" title="Invitations">
                    <InvitationTab/>
                </Tab>
                <Tab eventKey="messages" title="Messages">
                    Invitation
                </Tab>
            </Tabs>
        </div>
    );
}

export default NotificationTab;