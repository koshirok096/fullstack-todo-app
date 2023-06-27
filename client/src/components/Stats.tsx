import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BorderRightSharp } from "@mui/icons-material";

function Stats() {
  const [currentTime, setCurrentTime] = useState(new Date());

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center'
        }}
    >
      <Box
        sx={{
          pl: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        //   backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            color: "lightblue",
          }}
        >
          15
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            color: "white",
          }}
        >
          Total Tasks
        </div>
      </Box>
      <Box
        sx={{
          pl: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        //   backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            color: "rgb(251, 84, 43)",
          }}
        >
          00:32
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            color: "white",
          }}
        >
          Estimated Time
        </div>
      </Box>
    </Box>
  );
}

export default Stats;
