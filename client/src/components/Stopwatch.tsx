// import * as React from 'react';
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import CircularProgress from "@mui/material/CircularProgress";

function Stopwatch() {
  const [checked, setChecked] = useState([0]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <Box sx={{ color: "white", display:"flex", flexDirection:'column', justifyContent:'center', textAlign:'center', pr:3 }}>
        <Typography sx={{ m: 0, fontWeight:'bold', color:'Chartreuse' }}><span>ACT: </span>{formatTime(time)}</Typography>
        <Box sx={{}}>
          <IconButton
            aria-label="start"
            onClick={handleStart}
            sx={{
              color: "MediumAquaMarine",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
              "&:focus": {
                WebkitAnimation:
                  "scale-down-center 1.0s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both",
                animation:
                  "scale-down-center 1.0s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both",
              },
              keyframes: `
                @-webkit-keyframes scale-down-center {
                  0% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                  }
                  100% {
                    -webkit-transform: scale(1.2);
                    transform: scale(1.2);
                  }
                }
                @keyframes scale-down-center {
                  0% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                  }
                  100% {
                    -webkit-transform: scale(1.2);
                    transform: scale(1.2);
                  }
                }
              `,
            }}
          >
            <PlayCircleIcon />
          </IconButton>
          <IconButton
            aria-label="pause"
            onClick={handleStop}
            sx={{ color: "Ivory" }}
          >
            <PauseCircleFilledIcon />
          </IconButton>
          <IconButton
            aria-label="stop"
            onClick={handleReset}
            sx={{ color: "Indianred" }}
          >
            <StopCircleIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Stopwatch;
