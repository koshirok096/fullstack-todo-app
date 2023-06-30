// import * as React from 'react';
import React, { useState } from "react";
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

import ModalAddTask from './ModalAddTask';
import logo from '../main-logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalTaskSlice'
import { openSidebar, closeSidebar } from '../redux/openSidebarSlice'

import Checkbox from "@mui/material/Checkbox";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Link from '@mui/material/Link';


interface RootState {
  modal: {
    open: boolean;
  };
  modalTheme: {
    open: boolean;
  };
  sidebar: {
    open: boolean;
  };
}

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
      <Link href="/register" variant="body2" sx={{fontSize:'16px'}}>
        Logout
      </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // MY MEMO: code for modal without redux

  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // MY MEMO: code for modal with redux

  const dispatch = useDispatch();    
  
  // const isOpen = useSelector((state: RootState) => state.modal.open);

  const { modal, sidebar } = useSelector((state: RootState) => ({
    modal: state.modal.open,
    sidebar: state.sidebar.open,
    }));

  
  const handleOpenMTD = () => {
    dispatch(openModal());
  };

  const handleCloseMTD = () => {
    dispatch(closeModal());
  };

  //

  const handleOpenSidebar = () => {
    dispatch(sidebar ? closeSidebar() : openSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  // darkmode header

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const [darkMode, setDarkMode] = useState(false);
  
    const handleToggle = () => {
      setDarkMode(!darkMode);
    };
      
  
  return (
    <>
      <AppBar
       position="static"
       style={{
        transition: 'all 0.6s ease-in-out',
        backgroundColor: !darkMode ? 'rgba(249, 248, 241, 0.95)' : 'rgba(33, 33, 33, 0.95)',
        color: !darkMode ? 'black' : 'white',
        // backgroundColor: 'white',
        // backgroundColor: darkMode
        boxShadow: 'none',
        }}
       >
        <Toolbar
        sx={{ height: '64px' }}
        >
            <IconButton 
              sx = {{
                 color:"grey",
                 mr:1,
                 transition: 'all 0.1s ease',
                 ...(!sidebar ? { transform: 'rotate(90deg)' } : {}),
                }}
              size="large"
              edge="end"
              aria-label="open sidebar"
              aria-haspopup="true"
              onClick={handleOpenSidebar}
            >
               <MenuOpenRoundedIcon />
            </IconButton>
          <img
           src={logo}
           alt="mainlogo"
           width="40px"
           height="40px"
           style={{
            padding: '12px'
           }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            style={{
                fontFamily: "'Pathway Extreme', sans-serif",
                fontSize:'24px',
                fontWeight: 'bold'
            }}
          >
            Task<span style={{ fontWeight:'400' }}>Chaska</span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="add tasks"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOpenMTD}
              color="inherit"
            >
              <AddCircleIcon />
            </IconButton>
            <ModalAddTask open={modal} onClose={handleCloseMTD} />
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Checkbox
                  {...label}
                  disableRipple
                  icon={<DarkModeIcon />}
                  checkedIcon={<DarkModeOutlinedIcon sx={{ color: "Orange" }} />}
                  checked={darkMode}
                  onChange={handleToggle}            
                  sx={{ pr: 4, color: "MediumSlateBlue" }}
                />

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

export default Header