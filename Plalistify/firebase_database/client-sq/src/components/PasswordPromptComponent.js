// PasswordPromptComponent.js
import React, { useState } from 'react';
import { Container } from '@mui/material'; 

const PasswordPromptComponent = ({ theme, onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onPasswordSubmit(password);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Container style={{
      fontFamily: "'DM Sans', sans-serif",
      marginTop: 100 * .045 + 'vh',
      marginLeft: 100 * .01 + 'vw',
      fontSize: 100 * .021 + 'vw',
      fontWeight: "1000",
      color: theme.palette.text.primary
    }}>
      Host Password
      <div>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Container>
  );
};

export default PasswordPromptComponent;
