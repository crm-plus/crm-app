import React, { FC } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import User from '../../../../type/User';
import InvitationService from '../../../../service/InvitationService';

interface InviteModalProps {
    isOpen: boolean,
    onHide: () => void,
    organizationId: number
}

const InviteModal: FC<InviteModalProps> = ({
    isOpen,
    onHide,
    organizationId
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValidating }
    } = useForm<User>({
        shouldUnregister: true,
        mode: 'all'
    });

    const handleInviteSubmit = (user: User) => {
        if(user.email) {
            InvitationService.inviteMember(organizationId, user.email).then(() => {
                onHide();
            });
        }
    };

    return (
        <Modal show={isOpen} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Invite new member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleInviteSubmit)}>
                    <Form.Group>
                        <Form.Label>Type the email of the user to be invited: </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            {...register('email')}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default InviteModal;