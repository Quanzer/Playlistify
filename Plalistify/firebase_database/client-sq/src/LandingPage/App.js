import React from 'react';
import '../styles/App.css';
import Home from "./Home";
import About from "./About";
import Work  from "./Work";
import Contact from './Contact';
import Footer from './Footer';

//creating the app here and importing each component created
function App() {
  return (
    <div className="App"> 
      <Home/>
      <About/>
      <Work/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
