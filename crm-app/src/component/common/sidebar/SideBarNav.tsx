import React, {FC, useState} from 'react';
import SideBarNavLink from './SideBarNavLink';

interface Link {
    title: string,
    to: string,
    icon: React.ReactNode,
    isActive?: boolean
}


interface SideBarNavProps {
    links: Link[]
}

const SideBarNav: FC<SideBarNavProps> = ({
                                             links
                                         }) => {

    const [navItems, setNavItems] = useState<Link[]>(links)

    const setActiveNav = (title: string) => {
        navItems.map((item) => item.isActive = item.title === title)
        setNavItems([...navItems])
    }

    return (
        <div className={'sidebar-nav'}>
            {
                links.map((link) => {
                    return <SideBarNavLink
                        key={link.title}
                        onClick={setActiveNav}
                        title={link.title}
                        to={link.to}
                        icon={link.icon}
                        isActive={link.isActive}
                    />
                })
            }
        </div>
    );
}

export default SideBarNav;