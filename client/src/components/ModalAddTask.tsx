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
import Button from '@mui/material/Button';


interface ModalProps {
  open: boolean;
  onClose: () => void;
}

// const ModalContent = () => (
//   <Box sx={{background:'white'}}>
//     <Typography id="modal-addtask-title" variant="h6" component="h2">
//       Text in a modal
//     </Typography>
//     <Typography id="modal-addtask-description" sx={{ mt: 2 }}>
//       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//     </Typography>
//   </Box>
// );

const ModalAddTask: React.FC<ModalProps> = ({ open, onClose }) => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="taskName"
            label="Enter Task Name"
            name="task"
            autoComplete="task"
            // autoFocus
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "MobileTimePicker",
                "MobileTimePicker",
                "MobileTimePicker",
              ]}>
              <DemoItem label={'"Estimated Work Time"'}>
                <TimePicker views={["minutes", "seconds"]} format="mm:ss" />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <br/>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}>
                <MenuItem value={status}>Active</MenuItem>
                <MenuItem value={status}>On Hold</MenuItem>
                <MenuItem value={status}>Unassigned</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormGroup>
            <FormControlLabel required control={<Checkbox />} label="Add Pin" />
          </FormGroup>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: '18px' }}
              >
                Add Task
              </Button>

        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddTask;
