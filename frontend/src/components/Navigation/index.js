// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

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
        <div className='navbar'>
            <ul>
                <li>
                    <NavLink exact to="/">GamingCloud <i class="fa-solid fa-headphones"></i></NavLink>
                </li>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="/songs">Songs</NavLink>
                </li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
