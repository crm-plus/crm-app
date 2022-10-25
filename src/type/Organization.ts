import User from './User';

interface Organization {
    id: number,
    name: string,
    description: string,
    createdBy: User,
    isPrivate: boolean
}

export default Organization;