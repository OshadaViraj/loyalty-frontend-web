import * as React from 'react';
import Modal from '../common/Modal';
import { Button, DialogActions, DialogContent, TextField, Typography, Grid } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { createNewUser } from '../../store/userSlice';
import { useState } from 'react';
import { Box } from "@mui/system";


interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddUserModal({ open, onClose }: DialogProps) {
  const dispatch = useAppDispatch();

  const add = () => {
    dispatch(createNewUser(details));
  };

  const [details, setDetails] = useState({
    mobileNumber: "",
    firstName: "",
    address: "",
    middleName: "",
    lastName: "",
    totalPoints: 0
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  };

  return (
    <Modal
      onClose={onClose}
      title="Add User"
      open={open}
    >
      <DialogContent dividers>
        <Typography gutterBottom>
          Add customer basic information
        </Typography>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField label="Mobile Number" 
          name='mobileNumber' 
          variant="outlined" 
          onChange={handleChange} 
          />
          <TextField label="First Name" 
          name='firstName' 
          variant="outlined" 
          onChange={handleChange} 
          />
          <TextField label="Middle Name"
           name='middleName'
            variant="outlined"
             onChange={handleChange} 
             />
          <TextField label="Last Name"
           name='lastName' 
           variant="outlined" 
           onChange={handleChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant='contained' onClick={add}>
          Create User
        </Button>
      </DialogActions>
    </Modal>
  );
}
