import React, { FC, useState } from 'react';
import SideBarNavLink from './SideBarNavLink';
import { Link } from './Link';
import SideBarDropDown from './SideBarDropDown';

interface SideBarNavProps {
  links: Link[]
}

const SideBarNav: FC<SideBarNavProps> = ({
    links
}) => {

    const [navItems, setNavItems] = useState<Link[]>(links);

    const setActiveNav = (title: string) => {
        navItems.forEach((item) => {
            if (item.options) {
                item.options.map((subItem) => subItem.isActive = subItem.title === title);
            }
            item.isActive = item.title === title;
        });

        setNavItems([...navItems]);
    };

    const drawNavItems = () => {
        return navItems.map((link) => {
            if (link.options) {
                return <SideBarDropDown
                    key={link.title}
                    title={link.title}
                    options={link.options}
                    onItemClick={setActiveNav}
                />;
            }
            return <SideBarNavLink
                key={link.title}
                onClick={setActiveNav}
                title={link.title}
                to={link.to}
                icon={link.icon}
                isActive={link.isActive}
            />;
        });
    };


    return (
        <div className={'sidebar-nav '}>
            {
                drawNavItems()
            }
        </div>
    );
};

export default SideBarNav;