import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BorderRightSharp } from "@mui/icons-material";

interface StatsProps {
  totalEstimatedTime: number; 
}

const Stats: React.FC<StatsProps> = ({ totalEstimatedTime }) => {

  const [currentTime, setCurrentTime] = useState(new Date());
{/* <Typography
  variant="body1"
  component="p"
  sx={{ fontSize: "1.2rem" }}
>
  Total Estimated Time: {formatTime(totalEstimatedTime)}
</Typography> */}

  // parse time
  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: 'center'
      }}>
      <Box
        sx={{
          pl: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   backgroundColor: "rgba(0,0,0,0.5)",
        }}>
        <div
          style={{
            fontSize: "3rem",
            color: "lightblue",
          }}>
          15
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            color: "white",
          }}>
          Total Tasks
        </div>
      </Box>
      <Box
        sx={{
          pl: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   backgroundColor: "rgba(0,0,0,0.5)",
        }}>
        <div
          style={{
            fontSize: "3rem",
            color: "rgb(251, 84, 43)",
          }}>
          {formatTime(totalEstimatedTime)}
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            color: "white",
          }}>
          Estimated Time
        </div>
      </Box>
    </Box>
  );
}

export default Stats;
