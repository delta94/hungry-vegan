import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdExit } from 'react-icons/io';
import { useMediaPredicate } from 'react-media-hook';

import { useAuth } from 'context/auth';
import logo from 'images/logo.png';
import './style.css';

const NavigationBar = (): ReactElement => {
    const { authToken, handleLogout } = useAuth();
    const isMobile = useMediaPredicate('(max-width: 550px)');

    const renderNavLinks = (): ReactElement<HTMLDivElement> => {
        const className = 'nav-links';
        if (authToken !== null) {
            return (
                <div className={className}>
                    <NavLink to="/profile">profile</NavLink>
                    <NavLink exact={true} to="/" onClick={handleLogout}>
                        {isMobile ? <IoMdExit /> : 'log out'}
                    </NavLink>
                </div>
            );
        }
        return (
            <div className={className}>
                <NavLink to="/lists">lists</NavLink>
                <NavLink to="/login">login</NavLink>
            </div>
        );
    };

    return (
        <nav>
            <div className="nav-highlight">
                <NavLink exact={true} to="/">
                    <img className="logo" src={logo} alt="carrot logo" />
                </NavLink>
            </div>
            {renderNavLinks()}
        </nav>
    );
};

export default NavigationBar;
