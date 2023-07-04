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

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "../redux/openSidebarSlice";

import {
  fetchAllTodos,
  saveTodo,
  toggleTodoStatus,
  updateTodoData,
  deleteTodoItem,
  toggleTaskPinned,
  toggleTaskCompleted
} from "../redux/todoSlice";

interface TodoProps {
  currentUser: string | null;
}

enum TaskStatus {
  Active = "Active",
  OnHold = "On Hold",
  Unassigned = "Unassigned",
  Completed = "Completed",
}

interface TodoItem {
  id: number;
  label: string;
  pinned: boolean;
  status: TaskStatus; // Add the status property with the TaskStatus enum type
  completed: boolean; // 新しいcompletedプロパティを追加
}


const Todo: React.FC<TodoProps> = ({ currentUser }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state: any) => state.todo);

  const [checked, setChecked] = useState<boolean[]>(todo.map((task: TodoItem) => task.pinned));
  const [checked2, setChecked2] = useState<boolean[]>(todo.map((task: TodoItem) => task.completed));

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const [selectedStatus, setSelectedStatus] = useState(TaskStatus.Active);

  const handleToggle = (index: number) => () => {
    setChecked(prevChecked => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };
  
  const handleToggle2 = (index: number) => () => {
    setChecked2(prevChecked2 => {
      const newChecked2 = [...prevChecked2];
      newChecked2[index] = !newChecked2[index];
      return newChecked2;
    });
  };

    
    // for pinned label
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // style change by sidebar open/close
  interface RootState {
    sidebar: {
      open: boolean;
    };
  }

  const { open } = useSelector((state: RootState) => ({
    open: state.sidebar.open,
  }));

  // WIP Status?
  // const [status, setStatus] = useState("");
  // const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setStatus(event.target.value);
  // };

  // const handleAddTodo = () => {
  //   dispatch(addTodo("New Todo"));
  // };

  // const handleRemoveTodo = (id: number) => {
  //   dispatch(removeTodo(id));
  // };

  // const handleClearTodos = () => {
  //   dispatch(clearTodos());
  // };

  // const [editing, setEditing] = React.useState(-1);
  // const [inputValues, setInputValues] = React.useState(
  //   [0, 1, 2, 3].map((value, index) => `Line item ${index + 1}`)
  // );

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const newInputValues = [...inputValues];
  //   newInputValues[index] = event.target.value;
  //   setInputValues(newInputValues);
  // };

  // const handleListItemClick = (index: number) => {
  //   setEditing(index);
  // };

  // const handleInputBlur = () => {
  //   setEditing(-1);
  // };

  // const onFormSubmit = async (e: React.FormEvent) => {
  // e.preventDefault();
  // setEditing(prevState => !prevState);
  // try {
  //   await dispatch(updateTodoData(todo._id, { data: text }));
  // } catch (error) {
  //   console.log('Error while dispatching updateTodoData: ', 'error');
  // }
  // };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditing((prevState) => !prevState);
    try {
      await dispatch(updateTodoData(todo._id, { data: text }) as any);
    } catch (error) {
      console.log("Error while dispatching updateTodoData: ", error);
    }
  };
  // parse time
  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const timeInSeconds = 30;
  const formattedTime = formatTime(timeInSeconds);
  console.log(formattedTime);

  const totalEstimatedTime = todo.reduce((total: number, task: any) => total + task.estimatedTime, 0);


  return (
    
    <Box
      sx={{
        transition: "all 0.6s ease-in-out",
        position: "absolute",
        top: 64,
        left: open ? 360 : 0,
        width: open ? "calc(100% - 360px)" : "100%",
        height: '100vh',
        overflow: 'scroll'
      }}>
        {/* <Typography
          variant="body1"
          component="p"
          sx={{ fontSize: "7rem", color: 'white' }}
        >
          Total Estimated Time: {formatTime(totalEstimatedTime)}
        </Typography> */}

      <UpperInfoBar currentUser={currentUser} formattedTime={formattedTime} totalEstimatedTime={totalEstimatedTime} />
      <Box
        sx={{
          color: "white",
          my: 2,
          mx: 5,
        }}>
          {/* <li
          className="task"
          onClick={() => dispatch(toggleTodoStatus(todo._id) as any)}
          style={{
              textDecoration: todo?.done ? "line-through" : "",
              color: todo?.done ? "#bdc3c7" : "#34495e",
              listStyle: 'none',
              backgroundColor: 'rgba(0,0,0,0.65)',
              padding: '1rem',
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
            }}
            data-testid="todo-test">
            <form
              // style={{ display: editing ? 'inline' : 'none' }}
              onSubmit={onFormSubmit}>
              <input
                type="text"
                value={text}
                className="edit-todo"
                onChange={(e: any) => setText(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    onFormSubmit(e);
                  }
                }}
                style={{
                  width: "500px",
                  height: "50px",
                  backgroundColor: "rgba(0,0,0,0.95)",
                  color:'white',
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </form>
            <span
              className="icon"
              // onClick={() => dispatch(deleteTodoItem(todo._id) as any)}
            >
              <Stopwatch/>
              <i className="fas fa-trash" />
            </span>
            <span className="icon" onClick={() => setEditing((prevState) => !prevState)}></span>
            <span
              className="icon"
              onClick={() => setEditing((prevState) => !prevState)}>
              <i className="fas fa-pen" />
            </span>
          </li> */}

          <ul style={{
              display: "flex",
              flexDirection: 'column',
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              listStyle: 'none',
              margin: '0',
              padding: '0',
             }}
            >
      {todo.map((task: any, index: number) => (
              <li
                key={task._id}
                className="task"
                onClick={() => dispatch(toggleTodoStatus(task._id) as any)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.75)",
                  backdropFilter: 'blur(10px)',
                  borderRadius: "55px",
                  height: "85px",
                  // padding: '1rem',
                  border: '5px ivory solid',
                  margin: '1rem',
                  width: '100%'
                }}
                >
                <Box sx={{ 
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "60%",                  
                 }}>
                  <Checkbox
                    checked={checked[index]}
                    onChange={handleToggle(index)}
                    {...label}
                    disableRipple
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon sx={{ color: "Crimson" }} />}
                    sx={{ pr: 4, color: "Crimson", ml: 2 }}
                  />{" "}
                  <Checkbox
                    checked={checked2[index]}
                    onChange={handleToggle2(index)} // ここを修正
                    {...label}
                    icon={<CircleOutlinedIcon />}
                    checkedIcon={<CheckCircleOutlineOutlinedIcon sx={{ }} />}
                    sx={{ color: "white", transform: "scale(1.7)", mr: 3 }}
                  />{" "}
                  <p style={{ fontSize:'1.7rem'}}>{task.taskTitle}</p>
                </Box>
                <Box
                  sx={{
                    mr: 2.5,
                    position: "relative",
                    background: "MidnightBlue",
                    width: "170px",
                    borderRadius: "200px",
                    height: "47px",
                  }}>
                  {" "}
                  {/* Position the FormControl absolutely */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}>
                    <select
                    value={task.status}
                    // onChange={(e) => dispatch(updateTodoData(task._id, { status: e.target.value }) as any)}
                    onChange={(e) => dispatch(updateTodoData(task._id, { data: e.target.value }) as any)}

                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        backgroundImage: "none",
                        boxShadow: "none",
                        color: "White",
                        fontWeight: "bold",
                        fontSize: "1.2rem"
                        // WebkitAppearance: 'none',
                        // appearance: 'none',
                      }}>
                      <option
                        value={TaskStatus.Active}
                        style={{ textAlign: "center" }}>
                        Active
                      </option>
                      <option
                        value={TaskStatus.OnHold}
                        style={{ textAlign: "center" }}>
                        On Hold
                      </option>
                      <option
                        value={TaskStatus.Unassigned}
                        style={{ textAlign: "center" }}>
                        Unassigned
                      </option>
                      <option
                        value={TaskStatus.Completed}
                        style={{ textAlign: "center" }}>
                        Completed
                      </option>
                    </select>
                  </Box>
                </Box>
                <Stopwatch />
                <Box sx={{ textAlign: "center", pr: 2 }}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: "1.2rem" }}>
                    <span>EST. </span>
                    <span>{formatTime(task.estimatedTime)}</span>
                  </Typography>
                  <IconButton edge="end" aria-label="edit">
                    <EditNoteIcon
                      sx={{
                        color: "LemonChiffon",
                      }}
                    />
                  </IconButton>
                </Box>
                <IconButton
                  edge="end"
                  aria-label="trash"
                  // onClick={() => handleRemoveTodo(parseInt(id))}
                >
                  <DeleteIcon
                    sx={{
                      color: "Azure",
                      p: 2,
                      ml: 2
                    }}
                  />
                </IconButton>
              </li>
            ))}
          </ul>
      </Box>
    </Box>

    // design only
    // <Box
    //   sx={{
    //     transition: "all 0.6s ease-in-out",
    //     position: "absolute",
    //     top: 64,
    //     left: open ? 360 : 0,
    //     width: open ? "calc(100% - 360px)" : "100%",
    //   }}>
    //   <UpperInfoBar currentUser={currentUser} />
    //   <List
    //     sx={{
    //       color: "white",
    //       my: 2,
    //       mx: 5,
    //     }}>
    //     {[0, 1, 2, 3].map((value: number, index) => {
    //       const id = `todo-${value}`;
    //       const labelId = `checkbox-list-label-${id}`;
    //       const isEditing = editing === index;

    //       return (
    //         <ListItem
    //           key={id}
    //           secondaryAction={
    //             <React.Fragment>
    //               <Box
    //                 sx={{
    //                   display: "flex",
    //                   flexDirection: "row",
    //                   alignItems: "center",
    //                   "&:hover, &:focus-visible": {
    //                     outline: "none",
    //                   },
    //                 }}>
    //                 <Box
    //                   sx={{
    //                     mr: 2.5,
    //                     position: "relative",
    //                     background: "MidnightBlue",
    //                     width: "120px",
    //                     borderRadius: "200px",
    //                     height: "33px",
    //                   }}>
    //                   {" "}
    //                   {/* Position the FormControl absolutely */}
    //                   <Box
    //                     sx={{
    //                       display: "flex",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       height: "100%",
    //                     }}>
    //                     <select
    //                       style={{
    //                         border: "none",
    //                         outline: "none",
    //                         background: "transparent",
    //                         backgroundImage: "none",
    //                         boxShadow: "none",
    //                         color: "White",
    //                         fontWeight: "bold",
    //                         // WebkitAppearance: 'none',
    //                         // appearance: 'none',
    //                       }}
    //                       value={status}
    //                       onChange={handleChange}>
    //                       <option
    //                         style={{
    //                           textAlign: "center",
    //                         }}
    //                         value="Active">
    //                         Active
    //                       </option>
    //                       <option
    //                         style={{
    //                           textAlign: "center",
    //                         }}
    //                         value="On Hold">
    //                         On Hold
    //                       </option>
    //                       <option
    //                         style={{
    //                           textAlign: "center",
    //                         }}
    //                         value="Unassigned">
    //                         Unassigned
    //                       </option>
    //                     </select>
    //                   </Box>
    //                 </Box>
    //                 <Stopwatch />
    //                 <Box sx={{ textAlign: "center", pr: 2 }}>
    //                   <Typography
    //                     variant="body1"
    //                     component="p"
    //                     sx={{ fontSize: "1.2rem" }}>
    //                     <span>EST. </span>
    //                     <span>25:00</span>
    //                   </Typography>
    //                   <IconButton edge="end" aria-label="edit">
    //                     <EditNoteIcon
    //                       sx={{
    //                         color: "LemonChiffon",
    //                       }}
    //                     />
    //                   </IconButton>
    //                 </Box>
    //                 <IconButton
    //                   edge="end"
    //                   aria-label="trash"
    //                   onClick={() => handleRemoveTodo(parseInt(id))}>
    //                   <DeleteIcon
    //                     sx={{
    //                       color: "Azure",
    //                       p: 2,
    //                     }}
    //                   />
    //                 </IconButton>
    //               </Box>
    //             </React.Fragment>
    //           }
    //           disablePadding
    //           sx={{
    //             backgroundColor: "rgba(0,0,0,0.65)",
    //             borderRadius: "5px",
    //             height: "70px",
    //             // py: 1.5,
    //             mb: 1,
    //           }}>
    //           <ListItemButton
    //             role={undefined}
    //             onClick={() => handleToggle(parseInt(id))}
    //             dense
    //             disableRipple
    //             sx={{
    //               height: "100%",
    //               "&:hover": {
    //                 // bgcolor: "rgba(0,0,0,0.2)",
    //               },
    //             }}>
    //             <ListItemIcon
    //               sx={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 textAlign: "center",
    //               }}>
    //               <Checkbox
    //                 {...label}
    //                 disableRipple
    //                 icon={<BookmarkBorderIcon />}
    //                 checkedIcon={<BookmarkIcon sx={{ color: "Crimson" }} />}
    //                 sx={{ pr: 4, color: "Crimson" }}
    //               />

    //               <Checkbox
    //                 edge="start"
    //                 // checked={checked.indexOf(value) !== -1}
    //                 tabIndex={-1}
    //                 inputProps={{ "aria-labelledby": labelId }}
    //                 icon={<CircleOutlinedIcon />}
    //                 checkedIcon={<CheckCircleOutlineOutlinedIcon />}
    //                 sx={{ color: "white", transform: "scale(1.7)", mr: 3 }}
    //               />
    //             </ListItemIcon>

    //             {editing ? (
    //               <input
    //                 type="text"
    //                 value={inputValues[index]}
    //                 onChange={(event) => handleInputChange(event, index)}
    //                 onBlur={handleInputBlur}
    //                 autoFocus
    //               />
    //             ) : (
    //               <ListItemText
    //                 id={labelId}
    //                 primary={
    //                   <Typography
    //                     variant="body1"
    //                     style={{ fontSize: "1.2rem" }}>
    //                     {inputValues[index]}
    //                   </Typography>
    //                 }
    //                 onClick={() => handleListItemClick(index)}
    //               />
    //             )}
    //           </ListItemButton>
    //         </ListItem>
    //       );
    //     })}
    //   </List>
    // </Box>
  );
};

export default Todo;
