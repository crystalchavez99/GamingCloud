// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import TextField from '@mui/material/TextField';

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
            <ul className='d-flex justify-content-center align-items-center '>
                <li className='nav-item'>
                    <NavLink exact to="/">GamingCloud <i class="fa-solid fa-headphones"></i></NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    Feed
                </li>
                <li className='nav-item'>
                <NavLink to="/songs">Library</NavLink>
                </li>
                <li className='nav-item'>
                    <TextField className='bg-white' label='search'/>
                </li>
                <li className='nav-item'><NavLink to="/upload">Upload</NavLink></li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
