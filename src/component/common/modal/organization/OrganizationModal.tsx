import React, { FC } from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup, Modal, Spinner } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import Organization from '../../../../type/Organization';
import { yupResolver } from '@hookform/resolvers/yup';
import OrganizationSchema from '../../../../validation/OrganizationSchema';
import './OrganizationModal.scss';

interface OrganizationModalProps {
  isLoading: boolean,
  isModalOpen: boolean,
  handleClose: () => void,
  onSubmit: (organization: Organization) => void,
}

const OrganizationModal: FC<OrganizationModalProps> = ({
    isLoading,
    isModalOpen,
    handleClose,
    onSubmit
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating }
    } = useForm<Organization>({
        resolver: yupResolver(OrganizationSchema),
        shouldUnregister: true,
        mode: 'all'
    });

    return (
        <Modal show={isModalOpen} onHide={handleClose}>
            <form className={'organization-form'} onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create organization</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <FormGroup>
                        <Form.Control
                            className={errors.name ? 'is-invalid' : ''}
                            {...register('name')}
                            type="text"
                            as="input"
                            placeholder="Type organization name..."
                        />
                        <Feedback type="invalid">
                            {errors.name?.message}
                        </Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormControl
                            className={errors.description ? 'is-invalid' : ''}
                            {...register('description')}
                            type="text"
                            as="textarea"
                            placeholder="Type description..."
                        />
                        <Feedback type="invalid">
                            {errors.description?.message}
                        </Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormCheck
                            type="switch"
                            {...register('isPrivate')}
                            label="Is Private"
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-dark"
                        className={'submit-button'}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner
                            as="span"
                            variant="light"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : null}
                        {isLoading ? ' Loading... ' : ' Create '}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default OrganizationModal;