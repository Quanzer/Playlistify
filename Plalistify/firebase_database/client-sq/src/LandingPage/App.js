import React from 'react';
import '../styles/App.css';
import Navbar from './Navbar.js';
import Home from './Home';
import About from './About';
import Work from './Work';
import Contact from './Contact';
import FeedbackForm from '../feedbackform/FeedbackForm.js';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home/>
      <About/>
      <Work/>
      <Contact/>
      <FeedbackForm/>
      <Footer />
    </div>
  );
}

export default App;
