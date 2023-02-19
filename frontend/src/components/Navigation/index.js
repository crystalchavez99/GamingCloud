// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
            <ProfileButton user={sessionUser} />
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
        <div className='navbar p-0'>
            <ul className='d-flex justify-content-center align-items-center bg-dark p-0 mb-0'>
                <li className='nav-item bg-dark'>
                    <NavLink exact to="/">GamingCloud <i class="fa-solid fa-headphones"></i></NavLink>
                </li>
                <li className='nav-item bg-dark'>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li className='nav-item bg-dark'>
                    Feed
                </li>
                <li className='nav-item bg-dark'>
                <NavLink to="/songs">Library</NavLink>
                </li>
                <li className='nav-item bg-dark'>
                    <TextField className='bg-white' label='search' InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LibraryMusicIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"/>
                </li>
                <li className='nav-item bg-dark'><NavLink to="/upload">Upload</NavLink></li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
