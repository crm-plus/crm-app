export default interface User {
    id?: number,
    email?: string,
    firstName?: string,
    lastName?: string,
    birthDate?: string,
    organizationRole?: {
        id: number,
        roleType: {
            name: string,
            organizationPermissionTypes: string[]
        }
    },
    sex?: string
};