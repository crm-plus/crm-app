import React, {FC} from 'react';
import Image from 'react-bootstrap/Image'
import "./ProfileIcon.scss"

interface ProfileIconProps {
    imgSrc: string;
}

const ProfileIcon: FC<ProfileIconProps> = ({imgSrc}) => {
    return (
            <div>
                <Image roundedCircle={true} src={imgSrc} className="profile-icon"/>
            </div>
    );
};

export default ProfileIcon;