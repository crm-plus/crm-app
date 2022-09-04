import React, {FC, useState} from 'react';
import Card from "../../component/common/card/Card";
import CardHeader from "../../component/common/card/CardHeader";
import CardDescription from "../../component/common/card/CardDescription";
import CardIcon from "../../component/common/card/CardIcon";
import AddIcon from "../../component/common/icon/google/AddIcon";
import {Button, FloatingLabel, FormCheck, FormControl, FormGroup, Modal, Spinner} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Organization from "../../type/Organization";
import OrganizationSchema from '../../validation/OrganizationSchema';
import Feedback from "react-bootstrap/Feedback";
import OrganizationService from "../../service/OrganizationService";

const OrganizationTab: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: {errors, isValidating}
    } = useForm<Organization>({
        resolver: yupResolver(OrganizationSchema),
        shouldUnregister: true,
        mode: 'all'
    });

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const onSubmit = async (organization: Organization) => {
        OrganizationService.saveOrganization(organization);
    }

    return (
        <div className='organization-tab'>
            <div className={'your-workspaces'}>
                <h3>Your organizations</h3>
            </div>
            <div className={'card-container'}>
                <Card>
                    <CardHeader text={'Aroma Coffe'}/>
                    <CardDescription/>
                </Card>
                <Card onClick={openModal}>
                    <CardIcon icon={<AddIcon/>} text={'Create new organization'}/>
                </Card>
                {isModalOpen ?
                    <Modal show={isModalOpen} onHide={handleClose}>
                        <form className={'organization-form'} onSubmit={handleSubmit(onSubmit)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create organization</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <FormGroup className={'mb-3'}>
                                    <FloatingLabel label={'Name'}>
                                        <FormControl
                                            className={errors.name ? 'is-invalid' : ''}
                                            {...register('name')}
                                            type='text'
                                        />
                                        <Feedback type='invalid'>
                                            {errors.name?.message}
                                        </Feedback>
                                    </FloatingLabel>
                                </FormGroup>
                                <FormGroup>
                                    <FloatingLabel className={'mb-3'} label={'Description'}>
                                        <FormControl
                                            className={errors.description ? 'is-invalid' : ''}
                                            {...register('description')}
                                            type='text'
                                            as='textarea'
                                        />
                                        <Feedback type='invalid'>
                                            {errors.description?.message}
                                        </Feedback>
                                    </FloatingLabel>
                                </FormGroup>

                                <FormGroup className={'mb-3'}>
                                    <FormCheck
                                        type="switch"
                                        {...register('isPrivate')}
                                        label="Is private"
                                    />
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant='outline-dark'
                                    className={'submit-button'}
                                    type='submit'
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spinner
                                        as='span'
                                        variant='dark'
                                        animation='border'
                                        size='sm'
                                        role='status'
                                        aria-hidden='true'
                                    /> : null}
                                    {isLoading ? ' Loading... ' : ' Create '}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal> : null
                }

            </div>
        </div>
    );
}

export default OrganizationTab;