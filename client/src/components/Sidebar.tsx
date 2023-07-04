import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";

import Divider from '@mui/material/Divider';
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import CabinIcon from "@mui/icons-material/Cabin";
import ShapeLineIcon from "@mui/icons-material/ShapeLine";
import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import StyleIcon from "@mui/icons-material/Style";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import { RootState } from "../redux/store";

import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/modalTaskSlice";
import { openModalTheme, closeModalTheme } from "../redux/modalThemeSlice";
import ModalTheme from "./ModalTheme";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  bgwallpaper: string | null;
  userId: string | null;
  accessToken: string;
}

function Sidebar(props: SidebarProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open_w, setOpenW] = React.useState(true);
  const [open_a, setOpenA] = React.useState(true);
  const [open_s, setOpenS] = React.useState(true);

  const handleClick_w = () => {
    setOpenW(!open_w);
  };
  const handleClick_a = () => {
    setOpenA(!open_a);
  };
  const handleClick_s = () => {
    setOpenS(!open_s);
  };

  const [checked_d, setCheckedD] = React.useState(["Dark Mode"]);

  const handleToggle_d = (value: string) => () => {
    const currentIndex = checked_d.indexOf(value);
    const newCheckedD = [...checked_d];

    if (currentIndex === -1) {
      newCheckedD.push(value);
    } else {
      newCheckedD.splice(currentIndex, 1);
    }

    setCheckedD(newCheckedD);
    setDarkModeChecked(newCheckedD.includes("Dark Mode")); // setDarkModeCheckedの代わりにsetDarkModeを使用
  };

  const [checked_t, setCheckedT] = React.useState(["Theme"]);

  const handleToggle_t = (value: string) => () => {
    const currentIndex = checked_t.indexOf(value);
    const newCheckedT = [...checked_t];

    if (currentIndex === -1) {
      newCheckedT.push(value);
    } else {
      newCheckedT.splice(currentIndex, 1);
    }

    setCheckedT(newCheckedT);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const { open, onClose } = props;

  const dispatch = useDispatch();

  const { modal, modalTheme, sidebar } = useSelector((state: RootState) => ({
    modal: state.modal.open,
    modalTheme: state.modalTheme.open,
    sidebar: state.sidebar.open,
  }));

  const handleOpenMTD = () => {
    dispatch(openModal());
  };

  const handleCloseMTD = () => {
    dispatch(closeModal());
  };

  const handleOpenTHM = () => {
    dispatch(openModalTheme());
  };

  const handleCloseTHM = () => {
    dispatch(closeModalTheme());
  };

  const [darkModeChecked, setDarkModeChecked] = React.useState(
    checked_d.indexOf("Dark Mode") !== -1
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        maxWidth: 360,
        backgroundColor: darkModeChecked
          ? "rgba(249, 248, 241, 0.75)"
          : "rgba(33, 33, 33, 0.75)",
        color: darkModeChecked ? "inherit" : "Ivory",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        backdropFilter: 'blur(3px)',
        borderRight: '1px gray solid',
      }}
      style={{ transition: "all 0.6s ease-in-out" }}>
      <List sx={{ pt: 0, pb: 0, }} component="nav" aria-label="workspace">
        <ListItemButton onClick={handleClick_w} disableRipple>
          <ListItemIcon sx={{ color: darkModeChecked ? "#626262" : "Ivory" }}>
            <CabinIcon />
          </ListItemIcon>
          <ListItemText primary="Workspace" />
          {open_w ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_w} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}>
              <ListItemIcon sx={{ color: "SlateBlue" }}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}>
              <ListItemIcon sx={{ color: "Coral" }}>
                <WorkspacesIcon />
              </ListItemIcon>
              <ListItemText primary="Active" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}>
              <ListItemIcon sx={{ color: "SteelBlue" }}>
                <TaskAltIcon />
              </ListItemIcon>
              <ListItemText primary="Completed" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}>
              <ListItemIcon sx={{ color: "Crimson" }}>
                <BookmarksOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Pinned" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider sx={{ background: darkModeChecked ? "unset" : "gray" }} />
      <List sx={{ pt: 0, pb: 0 }} component="nav" aria-label="action">
        <ListItemButton onClick={handleClick_a} disableRipple>
          <ListItemIcon sx={{ color: darkModeChecked ? "#626262" : "Ivory" }}>
            <ShapeLineIcon />
          </ListItemIcon>
          <ListItemText primary="Action" />
          {open_a ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_a} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              disableRipple
              sx={{ pl: 4 }}
              onClick={handleOpenMTD}>
              <ListItemIcon sx={{ color: "SandyBrown" }}>
                <AddTaskIcon />
              </ListItemIcon>
              <ListItemText primary="Add Task" />
            </ListItemButton>
            <ListItemButton
              disableRipple
              sx={{ pl: 4 }}
              onClick={(event) => handleListItemClick(event, 5)}>
              <ListItemIcon sx={{ color: "SeaGreen" }}>
                <RemoveCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Selected Tasks" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider sx={{ background: darkModeChecked ? "unset" : "gray" }} />
      <List sx={{ pt: 0, pb: 0 }} component="nav" aria-label="style">
        <ListItemButton onClick={handleClick_s} disableRipple>
          <ListItemIcon sx={{ color: darkModeChecked ? "#626262" : "Ivory" }}>
            <StyleIcon />
          </ListItemIcon>
          <ListItemText primary="Style" />
          {open_s ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_s} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton disableRipple sx={{ pl: 4 }}>
              <ListItemIcon sx={{ color: "MediumSlateBlue" }}>
                <DarkModeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
              <Switch
                edge="end"
                onChange={handleToggle_d("Dark Mode")}
                checked={!darkModeChecked}
                inputProps={{
                  "aria-labelledby": "switch-list-label-darkmode",
                }}
              />
            </ListItemButton>
            <ListItemButton
              disableRipple
              sx={{ pl: 4 }}
              onClick={handleOpenTHM}>
              <ListItemIcon sx={{ color: "Tomato" }}>
                <WallpaperIcon />
              </ListItemIcon>
              <ListItemText primary="Theme" />
            </ListItemButton>
            <ModalTheme
              open={modalTheme}
              onClose={handleCloseTHM}
              bgwallpaper={props.bgwallpaper}
              userId={props.userId}
              accessToken={props.accessToken}
            />
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default Sidebar;
