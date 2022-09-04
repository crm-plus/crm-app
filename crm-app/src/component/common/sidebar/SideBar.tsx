import React, {FC, useState} from 'react';

import './SideBar.scss'

interface SideBarProps {
    children?: React.ReactNode
}

const SideBar: FC<SideBarProps> = ({
                                       children
                                   }) => {

    const [active, setActive] = useState([]);

    return (
        <div className='sidebar'>
            {
                children
            }
        </div>
    );
}

export default SideBar;