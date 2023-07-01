import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Time from "./Time";
import Stats from "./Stats";
import Typography from "@mui/material/Typography";
import axios from "axios";

interface UpperInfoBarProps {
  currentUser: string | null;
}


const UpperInfoBar: React.FC<UpperInfoBarProps> = ({ currentUser }) => {
  const [username, setUsername] = useState("Stranger");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/find/:id", {
          headers: {
            withCredentials: true,
          }
        });
        const data = response.data;
        setUsername(data.username);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
        fetchUser();
  }, []);

  return (
    <>
      <Box>
        <Typography sx={{ color: "white", fontSize: "3rem", my: 2, mx: 5 }}>
        {currentUser ? <p>Welcome, {currentUser}!</p> : <p>Please sign in.</p>}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pt: 5,
          pb: 5,
          backgroundImage:
            "linear-gradient(to right, rgba(222, 46, 185, 0.7), rgba(36, 127, 142, 0.7))", // 透過度付きのグラデーションの指定
          // backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: "15px",
          my: 2,
          mx: 5,
        }}>
        <Stats />
        <Time />
      </Box>
    </>
  );
}

export default UpperInfoBar;
