import React, { FC, useContext } from 'react';

import './Header.scss';
import { Nav, Navbar } from 'react-bootstrap';
import DropDown from '../common/dropdown/DropDown';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { WebSocketClient } from '../../websocket/WebSocketClient';
import Image from 'react-bootstrap/Image';
import NotificationDropDown from './notification/NotificationButton';

interface CRMHeaderProps {
  theme: 'light' | 'dark'
}

const Header: FC<CRMHeaderProps> = ({
    theme
}) => {

    const { auth } = useContext(Context);

    return (
        <header>
            <Navbar variant={'dark'} bg={'dark'}>
                <div className="brand">
                    <Navbar.Brand as={Link} to={'/home/organizations'}>
                        <img
                            src="/logo.png"
                            width="45"
                            height="45"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </div>

                <Navbar />

                <Nav className="me-auto">

                </Nav>
                <Nav className={'left-nav'}>
                    {!auth.getIsAuth() ?
                        <>
                            <Nav.Link as={Link} to="/signin">
                                <div className="nav-item sign-in">
                                    Sign In
                                    <span className="material-symbols-outlined">
                                        login
                                    </span>
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to={'/signup'}>
                                <div className="nav-item">
                                    Sign Up
                                    <span className="material-symbols-outlined">
                                        person_add
                                    </span>
                                </div>
                            </Nav.Link>
                        </>
                        :
                        <>
                            <NotificationDropDown/>
                            <Nav.Link as={Link} to={'/profile/edit'}>
                                <div className="nav-item">
                                    {auth.getUsername()}
                                </div>
                            </Nav.Link>
                            <Nav.Link onClick={() => auth.logout()}>
                                <div className="nav-item">
                                    <span className="material-symbols-outlined">
                                    logout
                                    </span>
                                </div>
                            </Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar>
        </header>);
};

export default observer(Header);