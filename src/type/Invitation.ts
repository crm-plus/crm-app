import User from './User';
import Organization from './Organization';

interface Invitation {
  id: number,
  recipient: User,
  sender: User,
  organization: Organization,
  createdAt: string
}

export default Invitation;