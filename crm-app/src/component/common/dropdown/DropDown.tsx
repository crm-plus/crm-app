import React, {FC} from 'react';
import {NavDropdown} from 'react-bootstrap';

interface DropDownProps {
    theme: 'dark' | 'light',
    title: string,
    items: [{
        title: string,
        url: string
    }]
}

const DropDown: FC<DropDownProps>
    = ({
           theme,
           title,
           items
       }
) => {
    return (
        <div>
            <NavDropdown
                title={title}
                menuVariant={theme}
            >
                {items.map((item) => {
                    return <NavDropdown.Item href={item.url}>{item.title}</NavDropdown.Item>
                })}
            </NavDropdown>
        </div>
    );
}

export default DropDown;