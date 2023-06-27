// import * as React from 'react';
import React, { useState, useEffect } from "react";
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


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

  // WIP Status?

  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };


  return (
    <Box
      sx={{
        position: "absolute",
        top: 64,
        left: 360,
        width: "calc(100% - 360px)",
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
                    }}
                  >
<Box sx={{ pr:3, position: 'absolute', right: 0 }}> {/* Position the FormControl absolutely */}
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Status"
                          value={status} // Updated prop name
                          onChange={handleChange}
                        >
                          <MenuItem value={'Active'}>Active</MenuItem>
                          <MenuItem value={'On Hold'}>On Hold</MenuItem>
                          <MenuItem value={'Unassigned'}>Unassigned</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Stopwatch />
                    <Box sx={{ textAlign: "center", pr: 3 }}>
                      <Typography variant="body1" component="p">
                        <span>EST. </span>
                        <span>25:00</span>
                      </Typography>
                      <IconButton edge="end" aria-label="edit">
                        <EditNoteIcon
                          sx={{
                            color: "Turquoise",
                          }}
                        />
                      </IconButton>
                    </Box>
                    <IconButton edge="end" aria-label="trash">
                      <DeleteIcon
                        sx={{
                          color: "Azure",
                          p: 3
                        }}
                      />
                    </IconButton>
                  </Box>
                </React.Fragment>
              }
              disablePadding
              sx={{
                backgroundColor: "rgba(0,0,0,0.7)",
                borderRadius: "5px",
                py: 2,
                mb: 1,
              }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
                disableRipple
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
                      sx={{ pr:4, color: "Crimson" }}
                    />

                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    inputProps={{ "aria-labelledby": labelId }}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                    sx={{ color: "white", transform: "scale(1.7)", mr:3, }}
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
