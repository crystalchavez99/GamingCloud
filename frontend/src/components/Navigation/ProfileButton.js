// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import './Navigation.css';
import { Button, Menu, MenuItem } from '@mui/material';
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [anchor, setAnchor] = useState(null)
  const open = Boolean(anchor)
  const handleOpen = e => {
    setAnchor(e.currentTarget)
  }
  const handleClose = e => {
    setAnchor(null)
  }
  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
       {user && <><li>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleOpen}>
                Profile
            {/* <NavLink to={`/users/${user?.id}`} exact={true} activeClassName='active'>
          </NavLink> */}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={handleClose} id="popup">
              <a href={`/profile/${user.username}`}exact={true} activeClassName='active'>
                <i className="fa-solid fa-user">
                </i>
              </a>

            </MenuItem>
            <MenuItem onClick={handleClose}><button onClick={logout} className="logout">Log Out</button></MenuItem>
          </Menu>
        </li>
        </>}
    </>
  );
}

export default ProfileButton;
