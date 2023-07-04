import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTask } from "../redux/todoSlice";


interface ModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;  
  accessToken:  string | null;  
}

const ModalAddTask: React.FC<ModalProps> = ({ open, onClose }) => {
  const [taskTitle, settaskTitle] = React.useState("");
  const [isPinned, setIsPinned] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handletaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settaskTitle(event.target.value);
  };

  const handlePinnedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPinned(event.target.checked);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  const handleEstimatedTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedTime(event.target.value);
  };
    
  
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
      try {
        // Check if accessToken is available
        if (!accessToken) {
          console.error("Access token is not available");
          return;
        }

        // for request headers
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          'Accept' : 'application/json',
          typ: "JWT",
        };

        // 
        const payload = {
          taskTitle: taskTitle,
          createdBy: true,
          _id: '',
          data: '',
          completed: false,
          pinned: isPinned,
          status: status,
          estimatedTime: parseInt(estimatedTime),
        };
        
        // Check to see latest states
        console.log("Request headers are:", headers);
        console.log("my payloads are:", payload);
    
        const response = await axios.post(
          `http://localhost:8000/api/task/${userId}`,
          payload, // 作成したデータをリクエストの body に設定
          { headers, withCredentials: true }
        );
  
        console.log('Task Added!');
        dispatch(addTask(payload)); // Reduxのアクションを呼び出してタスクを追加
        onClose();
        return response.data;
      } catch (error) {
        console.error('Failed to add task...', 'error.message');
      }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Task
        </Typography>
        <Box>
        <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="taskTitle"
              label="Enter Task Name"
              name="task"
              autoComplete="task"
              value={taskTitle}
              onChange={handletaskTitleChange}
            />
      <TextField
        margin="normal"
        required
        fullWidth
        id="estimatedTime"
        label="Estimated Time (Minutes)"
        name="estimatedTime"
        autoComplete="off"
        value={estimatedTime}
        onChange={handleEstimatedTimeChange}
      />
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                {/* <MenuItem value={status}>Completed</MenuItem> */}
                <MenuItem value="Unassigned">Unassigned</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormGroup>
          <FormControlLabel
        control={<Checkbox checked={isPinned} onChange={handlePinnedChange} />}
        label="Add Pin"
      />
          </FormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: "18px" }}>
            Add Task
          </Button>
        </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddTask;
