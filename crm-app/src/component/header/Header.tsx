import React, {FC, useContext} from 'react'

import './Header.scss'
import {Nav, Navbar} from 'react-bootstrap';
import DropDown from '../common/dropdown/DropDown';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {WebSocketClient} from '../../websocket/WebSocketClient'

interface CRMHeaderProps {
    theme: 'light' | 'dark'
}
const Header: FC<CRMHeaderProps> = ({
                                        theme
                                    }) => {

    const {auth} = useContext(Context);

    return (
        <header>
            <Navbar variant={'dark'} bg={'dark'} >
                <div className='brand'>
                    <Navbar.Brand as={Link} to={'/home/organization'}>
                        <img
                            src="/logo.png"
                            width="45"
                            height="45"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </div>

                <Navbar/>

                <Nav className='me-auto'>

                </Nav>

                {!auth.getIsAuth() ?
                    <Nav className={'left-nav'}>
                        <Nav as={Link} to='/signin'>
                            <div className='nav-item sign-in'>
                                Sign In
                                <span className='material-symbols-outlined'>
                            login
                        </span>
                            </div>
                        </Nav>
                        <Nav as={Link} to={'/signup'}>
                            <div className='nav-item'>
                                Sign Up
                                <span className='material-symbols-outlined'>
                                person_add
                                </span>
                            </div>
                        </Nav>
                    </Nav> :
                    <Nav className={'left-nav'}>
                        <Nav.Link as={Link} to={'/profile'}>
                            <div className='nav-item'>
                                {auth.getUsername()}
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