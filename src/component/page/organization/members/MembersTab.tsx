import React, { FC, useEffect, useState } from 'react';
import Organization from '../../../../type/Organization';
import SideBar from '../../../common/sidebar/SideBar';import SideBarNav from '../../../common/sidebar/SideBarNav';

import './MembersTab.scss';
import { Route, Routes } from 'react-router-dom';
import { Badge, Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddMemberIcon from '../../../common/icon/google/AddMemberIcon';
import User from '../../../../type/User';
import OrganizationService from '../../../../service/OrganizationService';
import CustomAvatar from '../../../common/avatar/Avatar';
import InviteModal from '../../../common/modal/invite/InviteModal';

interface MembersPageProps {
  organization: Organization
}

const AllMembers: FC<MembersPageProps> = ({organization}) => {
    const [members, setMembers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchMembers = () => {
        if(organization) {
            OrganizationService.getAllMembers(organization.id)
                .then((members) => {
                    setMembers(members);
                });
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return <div className={'all-members'}>
        <div className={'members-info'}>
            <h5>Organization Members (count)</h5>
            <p>Organization members can view and management Organization.</p>
        </div>
        <div className="search-bar">
            <Form.Control
                type="search"
                placeholder="Filter by name"
                className="search-input"
                aria-label="Search"
            />
        </div>
        <div className="members-list">
            {
                members.map((member) => (
                    <div className={'member-row'} key={member.id}>
                        <div className={'member-info'}>
                            <CustomAvatar name={member.email} size="40" textSizeRation={1.45} round="50px" />
                            <p>{member.email}</p>
                        </div>
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip>
                                    {`${member.organizationRole!.roleType.name} can `}
                                    <i>{member.organizationRole!.roleType.organizationPermissionTypes
                                        .map((permission: string) => permission.toLowerCase()).join(', ')
                                    }</i>
                                    {' organization'}
                                </Tooltip>
                            }
                        >
                            <Badge pill bg="primary">
                                {member.organizationRole!.roleType.name}
                            </Badge>
                        </OverlayTrigger>

                    </div>
                ))
            }
        </div>
    </div>;
};

const MembersTab: FC<MembersPageProps> = ({
    organization
}) => {
    const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

    return (
        <div className={'members-tab'}>
            <div className={'header'}>
                <h2>Members</h2>
                <button className={'invite-btn'} onClick={() => setInviteModalOpen(true)}>
                    <AddMemberIcon/>Invite organization members
                </button>
            </div>
            <div className={'content'}>
                <SideBar variant={'pills'}>
                    <SideBarNav
                        links={[
                            {
                                title: 'Organization members',
                                to: 'all',
                                isActive: true
                            },
                            {
                                title: 'Pending',
                                to: 'pending',
                                isActive: false
                            }
                        ]}
                    />
                </SideBar>

                <Routes>
                    <Route path={'all'} element={<AllMembers organization={organization}/>}/>
                    <Route path={'pending'} element={<div></div>}/>
                </Routes>

                <InviteModal
                    isOpen={inviteModalOpen}
                    onHide={() => setInviteModalOpen(false )}
                    organizationId={organization.id}
                />
            </div>

        </div>
    );
};

export default MembersTab;