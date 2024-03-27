import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './LandingPage/Home';
import About from './LandingPage/About';
import Work from './LandingPage/Work';
import Contact from './LandingPage/Contact';
import Footer from './LandingPage/Footer';
import Navbar from './LandingPage/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  // State to store the authentication code
  const [code, setCode] = useState(null);

  // Effect to check if the code is present in the URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    if (codeParam) {
      // If code is present, set it in the state
      setCode(codeParam);
    }
  }, []);

  return (
    <Router>
      <div className='app-container'>
        {/* Pass code state to Navbar */}
        <Navbar code={code} />
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/about' element={<Container />} />
          <Route path='/work' element={<Container />} />
          <Route path='/contact' element={<Container />} />
          {/* Pass code state to Dashboard */}
          <Route path='/dashboard' element={<Dashboard code={code} />} />
          {/* Route for the login page */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

// Container component for routing
function Container() {
  return (
    <div>
      <Home />
      <About />
      <Work />
      <Contact />
    </div>
  );
}

export default App;
