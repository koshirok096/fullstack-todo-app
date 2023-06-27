import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BorderRightSharp } from "@mui/icons-material";
import Time from './Time';
import Stats from './Stats';

function UpperInfoBar() {

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            pt:5,
            pb:5,
            backgroundImage: 'linear-gradient(to right, rgba(222, 46, 185, 0.7), rgba(36, 127, 142, 0.7))', // 透過度付きのグラデーションの指定
            // backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '15px',
            my:2,
            mx:5
            }}
    >
      <Stats />
      <Time />
    </Box>
  );
}

export default UpperInfoBar;
