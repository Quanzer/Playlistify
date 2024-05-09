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
      fontSize: 100 * 0.0145 + 'vw',
      fontWeight: "1000",
      color: theme.palette.text.primary
    }}>
      Host Password 
      <div>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{
            
            fontSize: 50 * 0.0145 + 'vw',
            fontWeight: "1000",
            marginTop: 100 * .018 + 'vh',
            width: 40 * .29 + 'vw',
            height: 40 * .06 + 'vh',
            borderRadius: 100 * .005 + 'vh',
            border: ".25vh solid " + theme.palette.common.border,
            borderColor: theme.palette.common.border,
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.text.primary
          }}
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
        <button 
        style={{
                fontWeight: 500,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                width: 13 * .29 + 'vw',
                height: 40 * .06 + 'vh',
                fontSize: 50 * 0.0145 + 'vw',
                borderRadius: '.75vh',
                marginLeft: ".2vh",
                borderRadius: 100 * .005 + 'vh',
                border: ".25vh solid " + theme.palette.common.border,
                border: 'none'}}
              onClick={handleSubmit}>Submit</button>
      </div>
    </Container>
  );
};

export default PasswordPromptComponent;
