import Organization from "../type/Organization";
import $api from "../http";

class OrganizationService {

    static async saveOrganization(organization: Organization) {
        return $api.post<Organization>('/organizations', organization);
    }
}

export default OrganizationService;