import React, {FC} from 'react'

import './Header.scss'
import {Nav, Navbar} from 'react-bootstrap';
import DropDown from '../common/dropdown/DropDown';

interface CRMHeaderProps {
    theme: 'light' | 'dark'
}

const Header: FC<CRMHeaderProps> = ({
                                        theme
                                    }) => {

    return (
        <header>
            <Navbar variant={theme} bg={theme}>
                <div className='brand'>
                    <Navbar.Brand>CRM+</Navbar.Brand>
                </div>

                <Navbar/>

                <Nav className='me-auto'>
                    <DropDown
                        items={[{title: 'BMW', url: '/bmw'}]}
                        theme={theme}
                        title={'Organization'}
                    />
                    <DropDown
                        items={[{title: 'Audi', url: '/audi'}]}
                        theme={theme}
                        title={'Recent'}
                    />
                </Nav>

                <Nav className={'left-nav'}>
                    <Nav.Link href='/signin'>
                        <div className='nav-item sign-in'>
                            Sign In
                            <span className='material-symbols-outlined'>
                            login
                        </span>
                        </div>
                    </Nav.Link>
                    <Nav.Link href='/signup'>
                        <div className='nav-item'>
                            Sign Up
                            <span className='material-symbols-outlined'>
                                person_add
                            </span>
                        </div>
                    </Nav.Link>

                </Nav>
            </Navbar>
        </header>)
}

export default Header