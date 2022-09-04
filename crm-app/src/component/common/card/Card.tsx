import React, {FC} from 'react';
import './Card.scss'

interface CardProps {
    onClick?: () => void,
    children: React.ReactNode
}

const Card: FC<CardProps> = ({
                                 onClick,
                                 children
                             }) => {
    return (
        <div className={'image-card'} onClick={onClick}>
            {children}
        </div>
    );
}

export default Card;