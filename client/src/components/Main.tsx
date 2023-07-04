// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/modalTaskSlice";
import { openSidebar, closeSidebar } from "../redux/openSidebarSlice";
import { RootState } from "../redux/store";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Todo from "./Todo";
import loading from "../loading.gif";

import { loginStart } from "../redux/userSlice";
import { setBackgroundImage } from "../redux/unsplashGetImageSlice";

import axios from "axios";

const Main: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userId = useSelector((state: RootState) => state.user.userId);
  const bgwallpaper = useSelector((state: RootState) => state.user.bgwallpaper);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [isLoading, setLoading] = useState(true);
  const Navigate = useNavigate();

  // MY MEMO: code for modal with redux

  const dispatch = useDispatch();

  useEffect(() => {
    // コンポーネントのマウント時にユーザー情報を取得する
    dispatch(loginStart());
  }, [dispatch]);

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

  const backgroundImage = useSelector(
    (state: RootState) => state.unsplashGetImage.copiedImageUrl
  );

  useEffect(() => {
    if (!currentUser) {
      Navigate("/register");
    } else {
      setLoading(false);
    }
  }, [currentUser, Navigate]);

  // latest bg check

  // useEffect(() => {
  //   if (bgwallpaper === null) {
  //     // Set a default background image URL
  //     dispatch(
  //       setBackgroundImage(
  //         "https://images.unsplash.com/photo-1581590212320-a1f693559160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  //       )
  //     );
  //   } else {
  //     dispatch(setBackgroundImage(bgwallpaper));
  //   }
  // }, [bgwallpaper, dispatch]);

  // get user for bg

  // const cookie = document.cookie;
  // const updatedCookie = `${cookie}; access_token=${accessToken}`;
  // console.log(updatedCookie)
  // console.log('updatedCookie ha doudesuka?')

  // useEffect(() => {
  //   // Fetch the user data and set the background image
  //   const fetchUserData = async () => {
  //     try {
  //       // Check if accessToken is available
  //       if (!accessToken) {
  //         console.error("Access token is not available");
  //         return;
  //       }

  //       // for request headers
  //       const headers = {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         typ: "JWT",
  //         withCredentials: true,
  //         Cookie: updatedCookie,
  //       };
  //       // replace user's bg
  //       const payload = {
  //         // bgwallpaper,
  //         userId, // ユーザーのIDを追加する
  //       };
  //       // Check to see latest states
  //       // console.log("Request headers are:", headers);
  //       // console.log("my payloads are:", payload);

  //       const response = await axios.get(`http://localhost:8000/api/user/${userId}`, {
  //         data: payload, // Set the request payload
  //         headers: headers,
  //       });

  //       console.log("Initialised bg");

  //       const userData = response.data;
  //       const bgwallpaper = userData.bgwallpaper;

  //       if (bgwallpaper) {
  //         dispatch(setBackgroundImage(bgwallpaper));
  //       } else {
  //         // Set a default background image URL
  //         dispatch(
  //           setBackgroundImage(
  //             "https://images.unsplash.com/photo-1581590212320-a1f693559160?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       // Handle error
  //       console.error("Error fetching user data:", error);
  //     }

  //     setLoading(false);
  //   };

  //   // Check if the user is logged in and fetch the data
  //   if (!currentUser) {
  //     Navigate("/register");
  //   } else {
  //     fetchUserData();
  //   }
  // }, [userId, accessToken, currentUser, dispatch, Navigate]);

  if (isLoading) {
    // Render a loading indicator while the user data is being fetched
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <img
          src={loading}
          alt="mainlogo"
          width="150px"
          height="150px"
          style={{
            padding: "12px",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${bgwallpaper})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        boxShadow: "0 0 200px rgba(0,0,0,0.9) inset",
        overflow: 'hidden'
      }}>
      <Header />
      <Sidebar
        open={sidebar}
        onClose={handleCloseSidebar}
        bgwallpaper={bgwallpaper}
        userId={userId}
        accessToken={accessToken}
      />
      <Todo currentUser={currentUser} />
    </Box>
  );
};

export default Main;
