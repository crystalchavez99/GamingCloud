// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LoginFormModal from '../LoginFormPage/newIndex';
import SignupFormModal from '../SignupFormPage/newIndex';

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
                {/* <NavLink to="/login">Log In</NavLink> */}
                <li className='nav-item bg-dark' key="login">
                    <LoginFormModal />
                </li>
                <li className='nav-item bg-dark' key="signup"><SignupFormModal /></li>
            </>
        );
    }

    return (
        <div className='navbar p-0'>
            <ul className='d-flex justify-content-center align-items-center bg-dark p-0 mb-0'>
                <li className='nav-item bg-dark' key="logo">
                    <NavLink exact to="/">GamingCloud <i className="fa-solid fa-headphones"></i></NavLink>
                </li>
                <li className='nav-item bg-dark' key="home">
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li className='nav-item bg-dark' key="feed">
                    <NavLink to="/feed">Feed</NavLink>
                </li>
                <li className='nav-item bg-dark' key="songs">
                    <NavLink to="/songs">Library</NavLink>
                </li>
                <li className='nav-item bg-dark' key="search">
                    <TextField className='bg-white' label='search' placeholder='In Progress' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LibraryMusicIcon />
                            </InputAdornment>
                        ),
                    }}
                        variant="standard" />
                </li>
                <li className='nav-item bg-dark' key="upload"><NavLink to="/upload">Upload</NavLink></li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    );
}

export default Navigation;
