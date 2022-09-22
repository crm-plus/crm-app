import React, {FC} from 'react';
import Avatar, {createAvatarComponent} from 'react-avatar';


interface AvatarProps {
    name?: string,
    size: string,
    textSizeRation: number,
    round: string,
    color?: string
}

const colors: string[]
    = ['#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF', '#6eb7cd']
const color = colors[Math.floor(Math.random()*colors.length)];

const CustomAvatar: FC<AvatarProps> = ({
                                           name,
                                           size,
                                           textSizeRation,
                                           round
                                       }) => {


    return (
        <Avatar
            name={name}
            size={size}
            textSizeRatio={textSizeRation}
            round={round}
            color={color}
        />
    );

}

export default CustomAvatar;