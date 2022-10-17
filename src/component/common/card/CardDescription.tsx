import React, { FC } from 'react';

interface CardDescriptionProps {
  text?: string
}

const CardDescription: FC<CardDescriptionProps> = ({
    text
}) => {
    return (
        <div className="card-description">
            <p>{text ? text : 'No description...'}</p>
        </div>
    );
};

export default CardDescription;