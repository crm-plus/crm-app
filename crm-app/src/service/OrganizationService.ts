import Organization from "../type/Organization";
import $api from "../http/Http";

class OrganizationService {

    static async saveOrganization(organization: Organization) {
        return $api.post<Organization>('/organizations', organization);
    }

    static async getOrganization() {
        return $api.get<Organization[]>('/organizations/user');
    }
}

export default OrganizationService;