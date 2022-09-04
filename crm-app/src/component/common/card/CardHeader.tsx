import React, {FC} from 'react';

interface CardHeaderProps {
    text: string
}

const CardHeader: FC<CardHeaderProps> = ({
                                             text
                                         }) => {
    return (
        <div className="card-header">
            <span>{text}</span>
        </div>
    );
}

export default CardHeader;