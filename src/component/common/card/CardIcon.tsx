import React, { FC } from 'react';

interface CardIconProps {
  icon: React.ReactNode,
  text: string
}

const CardIcon: FC<CardIconProps> = ({
    icon,
    text
}) => {
    return (
        <div className="card-icon">
            {icon}
            <p>
                {text}
            </p>
        </div>
    );
};

export default CardIcon;