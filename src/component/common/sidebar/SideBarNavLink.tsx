import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './SideBarNavLink.scss';

interface SideBarNavLinkProps {
  title: string,
  to?: string,
  isActive?: boolean,
  onClick?: (title: string) => void
  icon?: React.ReactNode
}

const SideBarNavLink: FC<SideBarNavLinkProps> = ({
    title,
    to = '',
    isActive,
    onClick,
    icon
}) => {
    return (
        <Link to={to} >
            <div className={'sidebar-nav-item ' + (isActive ? 'active' : '')} onClick={() => {
                if (onClick) onClick(title);
            }}>
                {icon}
                {title}
            </div>
        </Link>
    );
};

export default SideBarNavLink;