import React, {FC, useState} from 'react';

import './SideBar.scss'

interface SideBarProps {
    children?: React.ReactNode
}

const SideBar: FC<SideBarProps> = ({
                                       children
                                   }) => {

    return (
        <div className='sidebar'>
            {
                children
            }
        </div>
    );
}

export default SideBar;