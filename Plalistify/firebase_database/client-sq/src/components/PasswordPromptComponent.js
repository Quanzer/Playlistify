// PasswordPromptComponent.js
import React, { useEffect,useState } from 'react';
import { Container } from '@mui/material'; 

const PasswordPromptComponent = ({ theme, onPasswordSubmit }) => {
  const [password, setPassword] = useState('');
  const [isHorizontal, setIsHorizontal] = useState(false);

    useEffect(() => {
    const checkOrientation = () => {
      setIsHorizontal(window.innerWidth > window.innerHeight);
    };

    // Initial check
    checkOrientation();

    // Listen for resize events to update orientation
    window.addEventListener('resize', checkOrientation);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);
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
      fontSize: isHorizontal? 100 * 0.0145 + 'vw': 100 * 0.0145 + 'vh',
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
            
            fontSize: isHorizontal? 100 * 0.0145 + 'vw': 100 * 0.0145 + 'vh',
            fontWeight: "1000",
            marginTop: 100 * .018 + 'vh',
            width:isHorizontal?  40 * .29 + 'vw':40 * .29 + 'vh',
            height: isHorizontal? 40 * .06 + 'vh':40 * .1+ 'vw',
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
                width: isHorizontal?13 * .29 + 'vw':13 * .29 + 'vh',
                height: isHorizontal?40 * .06 + 'vh':40 * .1 + 'vw',
                fontSize: isHorizontal? 50 * 0.0145 + 'vw': 50 * 0.0145 + 'vh',
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
