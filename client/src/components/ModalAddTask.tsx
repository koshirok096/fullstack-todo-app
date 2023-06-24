import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    return (
      <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal Title
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This is the modal content.
        </Typography>
      </Box>
    </Modal>
      );
  };
  
export default ModalAddTask;
