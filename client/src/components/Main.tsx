import * as React from 'react';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../redux/modalTaskSlice'
import { openSidebar, closeSidebar } from '../redux/openSidebarSlice'
import { RootState } from '../redux/store';

import Header from './Header';
import Sidebar from './Sidebar';
import Todo from './Todo'

function Main() {

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
      <Todo />
    </Box>
  );
}

export default Main