// import * as React from 'react';
import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import UpperInfoBar from "./UpperInfoBar";
import Stopwatch from "./Stopwatch";

import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar, closeSidebar } from '../redux/openSidebarSlice'


function Todo() {
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

  // for pinned label
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // style change by sidebar open/close

  const dispatch = useDispatch();
  interface RootState {
    sidebar: {
      open: boolean;
    };
  }

  const { open } = useSelector((state: RootState) => ({
    open: state.sidebar.open,
  }));


  // WIP Status?
  const [status, setStatus] = useState("");
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };



  return (
    <Box
      sx={{
        transition: 'all 0.6s ease-in-out',
        position: "absolute",
        top: 64,
        left: open ? 360 : 0,
        width: open ? "calc(100% - 360px)" : '100%',
        // transform: open ? "translateX(0)" : "translateX(-100%)",
        // left: 0,
        // width: 100%
      }}
    >
      <UpperInfoBar />
      <List
        sx={{
          //  width: '100%',
          //  maxWidth: '100%',
          //  backgroundColor: 'rgba(0,0,0,0.5)',
          //  backgroundColor: 'white',
          color: "white",
          my: 2,
          mx: 5,
        }}
      >
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      '&:hover, &:focus-visible': {
                        outline: 'none',
                      },
                    }}
                  >
                    <Box sx={{
                       mr: 2.5, 
                       position: 'relative',
                       background: 'MidnightBlue',
                       width: '120px',
                       borderRadius: '200px',
                       height: '33px',
                      }}>
                      {" "}
                      {/* Position the FormControl absolutely */}
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                      }}>
                        <select
                          style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            backgroundImage: 'none',
                            boxShadow: 'none',
                            color: 'White',
                            fontWeight: 'bold'
                            // WebkitAppearance: 'none',
                            // appearance: 'none',                        
                          }}
                          value={status}
                          onChange={handleChange}>
                          <option
                            style={{
                              textAlign: 'center',
                            }}
                            value="Active"
                            // onMouseEnter={handleMouseEnter}
                            // onMouseLeave={handleMouseLeave}                    
                          >Active
                          </option>
                          <option
                            style={{
                              textAlign: 'center',
                            }}
                            value="On Hold"
                            // onMouseEnter={handleMouseEnter}
                            // onMouseLeave={handleMouseLeave}                    
                          >On Hold
                          </option>
                          <option
                            style={{
                              textAlign: 'center',
                            }}
                           value="Unassigned"
                          //  onMouseEnter={handleMouseEnter}
                          //  onMouseLeave={handleMouseLeave}                   
                          >Unassigned
                          </option>
                        </select>
                    </Box>
                    </Box>
                    <Stopwatch />
                    <Box sx={{ textAlign: "center", pr: 2 }}>
                      <Typography variant="body1" component="p" sx={{ fontSize: "1.2rem" }}>
                        <span>EST. </span>
                        <span>25:00</span>
                      </Typography>
                      <IconButton edge="end" aria-label="edit">
                        <EditNoteIcon
                          sx={{
                            color: "LemonChiffon",
                          }}
                        />
                      </IconButton>
                    </Box>
                    <IconButton edge="end" aria-label="trash">
                      <DeleteIcon
                        sx={{
                          color: "Azure",
                          p: 2,
                        }}
                      />
                    </IconButton>
                  </Box>
                </React.Fragment>
              }
              disablePadding
              sx={{
                backgroundColor: "rgba(0,0,0,0.65)",
                borderRadius: "5px",
                height: "70px",
                // py: 1.5,
                mb: 1,
              }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
                disableRipple
                sx={{
                  height: "100%",
                  '&:hover': {
                    // bgcolor: "rgba(0,0,0,0.2)",
                  },    
                }}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Checkbox
                    {...label}
                    disableRipple
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon sx={{ color: "Crimson" }} />}
                    sx={{ pr: 4, color: "Crimson" }}
                  />

                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    inputProps={{ "aria-labelledby": labelId }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                    sx={{ color: "white", transform: "scale(1.7)", mr: 3 }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={
                    <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
                      {`Line item ${value + 1}`}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Todo;
