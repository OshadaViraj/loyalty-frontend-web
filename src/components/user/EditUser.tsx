import * as React from "react";
import Modal from "../common/Modal";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../hooks";
import { updateUser } from "../../store/userSlice";
import { TUser } from "../../store/user.type";
import { Box } from "@mui/system";
import { useState } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  user: TUser;
}

export default function EditUserModal({ open, onClose, user }: DialogProps) {
  const dispatch = useAppDispatch();

  const edit = () => {
  
    dispatch(
      updateUser(details)
    );
  };

  const [details , setDetails] = useState({
    mobileNumber: user.mobileNumber,
    firstName: user.firstName,
    address: "",
    middleName: user.middleName,
    lastName: user.lastName,
    totalPoints: user.totalPoints
  });

  const handleChange = (event : any) => {
    const { name, value } = event.target;
    setDetails((prev) => {
      return {...prev , [name]: value }
    })
  };
  

  return (
    <Modal onClose={onClose} title="Update User" open={open}>
      <DialogContent dividers>
      <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField label="Mobile Number" 
          disabled
          name='mobileNumber' 
          variant="outlined" 
          value={details.mobileNumber} 
          />
          <TextField label="First Name" 
          name='firstName' 
          variant="outlined" 
          onChange={handleChange} 
          value={details.firstName}
          />
          <TextField label="Middle Name"
           name='middleName'
            variant="outlined"
             onChange={handleChange} 
             value={details.middleName}
             />
          <TextField label="Last Name"
           name='lastName' 
           variant="outlined" 
           onChange={handleChange} 
           value={details.lastName}
           />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="contained" onClick={edit}>
          Update User
        </Button>
      </DialogActions>
    </Modal>
  );
}
