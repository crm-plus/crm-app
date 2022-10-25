import Organization from '../type/Organization';
import $api from '../http/Http';
import { toast } from 'react-toastify';
import User from '../type/User';

class OrganizationService {

    static async saveOrganization(organization: Organization) {
        return $api.post<Organization>('/organizations', organization);
    }

    static async getOrganization() {
        return $api.get<Organization[]>('/organizations/user');
    }

    static async searchOrganizationByName(organizationName: string | undefined): Promise<Organization[]> {
        return $api.get<Organization[]>(`/organizations/${organizationName}`)
            .then((response) => {
                if(response) {
                    return response.data;
                }
                return response;
            }).catch((er) => {
                if(er.response) {
                    toast.error(er.response.data.message);
                }
                throw er;
            });
    }

    static async getAllMembers(organizationId: number): Promise<User[]> {
        return $api.get<User[]>(`/organizations/${organizationId}/members?page=0&size=5`)
            .then((response) => {
                if(response) {
                    return response.data;
                }
                return response;
            }).catch((er) => {
                if(er.response) {
                    toast.error(er.response.data.message);
                }
                throw er;
            });
    }

    static async getAllPendingMembers(organizationId: number): Promise<User[]> {
        return $api.get<User[]>(`/organizations/${organizationId}/users/pending?page=0&size=5`)
            .then((response) => {
                if(response) {
                    return response.data;
                }
                return response;
            }).catch((er) => {
                if(er.response) {
                    toast.error(er.response.data.message);
                }
                throw er;
            });
    }

}

export default OrganizationService;