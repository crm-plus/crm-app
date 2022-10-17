import React, { FC } from 'react';

import './SideBar.scss';

interface SideBarProps {
  variant?: 'pills' | 'tabs'
  children?: React.ReactNode
}

const SideBar: FC<SideBarProps> = ({
    variant = 'pills',
    children
}) => {

    return (
        <div className={'sidebar ' + variant}>
            {
                children
            }
        </div>
    );
};

export default SideBar;