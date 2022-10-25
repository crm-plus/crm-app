import { InvitationStore } from '../../../../../store/InvitationStore';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../../../../index';
import InvitationService from '../../../../../service/InvitationService';
import Invitation from '../../../../../type/Invitation';
import { Button, ListGroup, ListGroupItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import DoneIcon from '../../../../common/icon/google/DoneIcon';
import CloseIcon from '../../../../common/icon/google/CloseIcon';
import CustomAvatar from '../../../../common/avatar/Avatar';
import { toast } from 'react-toastify';

function InvitationTab() {
    const invitationStore = InvitationStore.getInstance();
    const { auth } = useContext(Context);

    const fetchInvitations = () => {
        InvitationService.getAllInvitations(auth.getUsername())
            .then((invitations: Invitation[]) => {
                invitationStore.setInvitations(invitations);
            });
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    const acceptInvitation = (invitationId: number) => {
        InvitationService.acceptInvitation(invitationId).then((invitation) => {
            toast.success('Successfully accepted invitation');
            fetchInvitations();
        });

    };

    return(
        <div className={'invitation-tab'}>
            <div className={'invitations-list'}>
                {invitationStore.getInvitations().map((invitation) => {

                    return (
                        <div key={invitation.id} className="list-item">
                            <div className={'content'}>
                                <CustomAvatar name={invitation.sender.email} size={'50px'} textSizeRation={1.55} round={'5px'}/>
                                <div className={'invitation-info'}>
                                    <div className='sender-info'>
                                        <h6>{invitation.sender.email}</h6>
                                        <p className={'date'}>
                                            {new Date(Date.parse(invitation.createdAt)).toDateString()}
                                        </p>
                                    </div>
                                    <p className={'message'}>
                                      Invites you to the <i>{`'${invitation.organization.name}'`}</i> organization
                                    </p>
                                </div>
                            </div>

                            <div className='btn-container'>
                                <OverlayTrigger
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip>
                                          Accept <strong>invitation</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <Button className={'accept-btn'} size={'sm'} variant="light" onClick={() => acceptInvitation(invitation.id)}>
                                        <DoneIcon/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip>
                                          Decline <strong>invitation</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <Button className={'decline-btn'} size={'sm'} variant="light"><CloseIcon/></Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default observer(InvitationTab);