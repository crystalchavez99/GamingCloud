// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
            <ProfileButton user={sessionUser} />
            <li><NavLink to="/upload" user={sessionUser}>Upload</NavLink></li>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='navbar '>
            <ul>
                <li className='nav-item'>
                    <NavLink exact to="/">GamingCloud <i class="fa-solid fa-headphones"></i></NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li lassName='nav-item'>
                <NavLink to="/songs">Songs</NavLink>
                </li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
