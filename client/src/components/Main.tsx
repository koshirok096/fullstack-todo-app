// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalTaskSlice'
import { openSidebar, closeSidebar } from '../redux/openSidebarSlice'
import { RootState } from '../redux/store';

import Header from './Header';
import Sidebar from './Sidebar';
import Todo from './Todo';
import loading from '../loading.gif';

import { loginStart } from '../redux/userSlice';

function Main() {
  const [isLoading, setLoading] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const Navigate = useNavigate();

  console.log(currentUser); // ユーザー情報をコンソールに出力する例
  console.log('currentUser ha dou datta?');


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
  

  useEffect(() => {
    // コンポーネントのマウント時にユーザー情報を取得する
    dispatch(loginStart());
  }, [dispatch]);

  // const isOpen = useSelector((state: RootState) => state.modal.open);


  const { modal, modalTheme, sidebar } = useSelector((state: RootState) => ({
    modal: state.modal.open,
    modalTheme: state.modalTheme.open,
    sidebar: state.sidebar.open,
  }));
  //

  const handleOpenSidebar = () => {
    dispatch(sidebar ? closeSidebar() : openSidebar());
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const backgroundImage = useSelector((state: RootState) => state.unsplashGetImage.copiedImageUrl);



  useEffect(() => {
    if (!currentUser) {
      Navigate('/register');
    } else {
      setLoading(false);
    }
  }, [currentUser, Navigate]);

  if (isLoading) {
    // Render a loading indicator while the user data is being fetched
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <img
          src={loading}
          alt="mainlogo"
          width="150px"
          height="150px"
          style={{
            padding: '12px',
          }}
        />
      </Box>
    );
  }
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundImage: `url(${backgroundImage})`, // backgroundImageを設定

      // backgroundImage: 'url(https://images.unsplash.com/photo-1581590212320-a1f693559160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)',
      backgroundPosition: 'center',
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat'
      }}>
      <Header />
      <Sidebar open={sidebar} onClose={handleCloseSidebar} />
      <Todo currentUser={currentUser} />
    </Box>
  );
}

export default Main