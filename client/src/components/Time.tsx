import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BorderRightSharp } from '@mui/icons-material';

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1秒ごとに更新

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Box
      sx= {{
        pr:5
        // backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <div
        style = {{
          fontSize: '3rem', 
          color: 'white'
        }}        
      >
        {formattedTime}
      </div>
      <div
        style = {{
          fontSize: '1.2rem', 
          color: 'white'
        }}              
      >{formattedDate}</div>
    </Box>
  );
}

export default Time;
