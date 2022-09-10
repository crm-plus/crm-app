import React, {FC, useState} from 'react';
import {Link} from "./Link";
import DropUpIcon from "../icon/google/DropUpIcon";
import DropDownIcon from "../icon/google/DropDownIcon";
import SideBarNavLink from "./SideBarNavLink";

interface SideBarDropDownProps {
    title: string,
    options: Link[],
    onItemClick: (title: string) => void
}

const SideBarDropDown: FC<SideBarDropDownProps> = ({
                                                       title,
                                                       options,
                                                       onItemClick
                                                   }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    console.log(options)

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} className="sidebar-nav-item dropdown">
                {title}
                {isOpen ? <DropDownIcon/> : <DropUpIcon/>}
            </div>
            <div className="dropdown-items">
                {isOpen ?
                    options.map((link) => {
                        return (<SideBarNavLink
                            key={link.title}
                            onClick={onItemClick}
                            title={link.title}
                            to={link.to}
                            icon={link.icon}
                            isActive={link.isActive}
                        />)
                    })
                    :
                    null
                }
            </div>
        </>)
}

export default SideBarDropDown;