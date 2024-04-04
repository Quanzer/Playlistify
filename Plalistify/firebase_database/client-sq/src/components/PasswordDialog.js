import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const PasswordDialog = ({ open, onClose, onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onPasswordSubmit(password);
    setPassword(''); // Reset password field after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
