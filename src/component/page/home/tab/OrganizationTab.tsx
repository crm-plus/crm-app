import React, { FC, useEffect, useState } from 'react';
import Card from '../../../common/card/Card';
import CardHeader from '../../../common/card/CardHeader';
import CardDescription from '../../../common/card/CardDescription';
import CardIcon from '../../../common/card/CardIcon';
import AddIcon from '../../../common/icon/google/AddIcon';
import { Spinner } from 'react-bootstrap';
import Organization from '../../../../type/Organization';
import OrganizationService from '../../../../service/OrganizationService';
import { toast } from 'react-toastify';
import OrganizationModal from '../../../common/modal/organization/OrganizationModal';
import { useNavigate } from 'react-router-dom';

const OrganizationTab: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSaveOrganizationLoading, setIsSaveOrganizationLoading] = useState<boolean>(false);
    const [organizations, setOrganization] = useState<Organization[]>([]);
    const [isOrganizationsLoading, setIsOrganizationsLoading] = useState<boolean>();

    const navigate = useNavigate();

    const fetchOrganizations = () => {
        setIsOrganizationsLoading(true);
        OrganizationService
            .getOrganization()
            .then((response) => response.data)
            .then((organizations) => {
                if (organizations) {
                    setOrganization(organizations);
                }
                setIsOrganizationsLoading(false);
            })
            .catch((er) => {
                toast.error(er.message);
            });
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const onSubmit = async (organization: Organization) => {
        setIsSaveOrganizationLoading(true);
        OrganizationService.saveOrganization(organization)
            .then((response) => response.data)
            .then((organization) => {
                toast.success(`Organization '${organization.name}' successfully created`);
                setIsSaveOrganizationLoading(false);
                fetchOrganizations();
                handleClose();
            });
    };

    const openOrganization = (organizationName: string) => {
        navigate(`/organization/${organizationName}`, { replace: true });
    };

    return (
        <div className="organization-tab">
            <div className="content">
                <div className={'your-workspaces'}>
                    <h3>Your organizations</h3>
                </div>
                <div className={'card-container'}>
                    {isOrganizationsLoading ? <Card>
                        <CardIcon
                            icon={<Spinner
                                as="span"
                                variant="dark"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                            text={'Loading...'} />
                    </Card> : null}
                    {organizations.map((organization) => {
                        return (
                            <Card
                                onClick={() => openOrganization(organization.name)}
                                key={organization.name}>
                                <CardHeader text={organization.name} />
                                <CardDescription text={organization.description} />
                            </Card>
                        );
                    })}
                    <Card onClick={openModal}>
                        <CardIcon icon={<AddIcon />} text={'Create new organization'} />
                    </Card>
                    {isModalOpen ?
                        <OrganizationModal
                            isLoading={isSaveOrganizationLoading}
                            handleClose={handleClose}
                            isModalOpen={isModalOpen}
                            onSubmit={onSubmit}
                        />
                        : null
                    }

                </div>
            </div>
        </div>
    );
};

export default OrganizationTab;