import React, {FC, useContext} from 'react'

import './Header.scss'
import {Nav, Navbar} from 'react-bootstrap';
import DropDown from '../common/dropdown/DropDown';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';

interface CRMHeaderProps {
    theme: 'light' | 'dark'
}

const Header: FC<CRMHeaderProps> = ({
                                        theme
                                    }) => {

    const {auth} = useContext(Context);

    return (
        <header>
            <Navbar variant={theme} bg={theme} >
                <div className='brand'>
                    <Navbar.Brand as={Link} to={'/home/organization'}>CRM+</Navbar.Brand>
                </div>

                <Navbar/>

                <Nav className='me-auto'>

                </Nav>

                {!auth.isAuth ?
                    <Nav className={'left-nav'}>
                        <Nav.Link as={Link} to='/signin'>
                            <div className='nav-item sign-in'>
                                Sign In
                                <span className='material-symbols-outlined'>
                            login
                        </span>
                            </div>
                        </Nav.Link>
                            <Nav.Link as={Link} to={'/signup'}>
                                <div className='nav-item'>
                                    Sign Up
                                    <span className='material-symbols-outlined'>
                                person_add
                                </span>
                                </div>
                            </Nav.Link>
                    </Nav> :
                    <Nav className={'left-nav'}>
                        <Nav.Link>
                            <div className='nav-item'>
                                {auth.username}
                            </div>
                        </Nav.Link>
                        <Nav.Link onClick={() => auth.logout()}>
                            <div className='nav-item'>
                                <span className='material-symbols-outlined'>
                                    logout
                                </span>
                            </div>
                        </Nav.Link>
                    </Nav>
                }
            </Navbar>
        </header>)
}

export default observer(Header)