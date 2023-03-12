import * as React from "react";
import Modal from "../common/Modal";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField
} from "@mui/material";
import { useAppDispatch } from "../../hooks";
import { addPointsByUserId ,redeemPointsByUserId } from "../../store/userSlice";
import { TUser } from "../../store/user.type";
import { Box } from "@mui/system";
import { useState } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  user: TUser;
  type: 'add' | "redeem"
}

export default function PointModal({ open, onClose, user, type }: DialogProps) {
  const dispatch = useAppDispatch();

  const [details , setDetails] = useState({
    mobileNumber: user.mobileNumber,
    loyaltyPoint: 0,
    productId: "", 
    createdDate : ""
  });

  const [error, setError] = useState<string | undefined>(undefined);


  const add = () => {
    dispatch(addPointsByUserId(details));
  };

  const redeem = () => {
    if(user.totalPoints < details.loyaltyPoint){
        setError('Maximum points limit exceded ' );
      }else{
        setError(undefined);
        dispatch(redeemPointsByUserId(details));
      }
  };

  const validate = () => {
    
  };

 
  const handleChange = (event : any) => {
    const { name, value } = event.target;
    setDetails((prev) => {
      return {...prev , [name]: value }
    })
  };


  return (
    <Modal onClose={onClose} title={type === 'add' ? 'Add Points' : "Redeem Points"} open={open}>
      <DialogContent dividers>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField
            disabled
            id="mobileNumber"
            label="Mobile Number"
            variant="outlined"
            value={user.mobileNumber}
          />

          <TextField
            disabled
            id="user Name"
            label="User Name"
            variant="outlined"
            value={user.firstName}
          />
          <TextField
            id="product Id"
            label="Product Id"
            variant="outlined"
            name="productId"
            value={details.productId}
            onChange={handleChange}
          />
          <TextField
            id="point"
            label={error === undefined ? "Points " : error}
            variant="outlined"
            name="loyaltyPoint"
            type="number"
            error={error !== undefined}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
      {type === 'add' ? (
               <Button autoFocus variant="contained" onClick={add}> Add Points </Button>) : (
               <Button autoFocus variant="contained" onClick={redeem} onChange={validate}> Redeem Points </Button> )}
      </DialogActions>
    </Modal>
  );
}
