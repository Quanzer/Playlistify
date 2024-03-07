import React from 'react'
import Navbar from './Navbar.js'
//banner for the picture may be added in the future
// import BannerBackground from "../Assets/home-banner-background.png"
import BannerImage from "../Assets/home-banner-image.png"
import { FiArrowRight } from "react-icons/fi";

// The Home Section is the first thing that Users see when going to the app page.
const Home = () => {
  /* may add a image banner in the future */ 
  return (
    <div className='home-container' id='home-section'>
      <Navbar />
      <div className='home-banner-container'>
        <div className="home-bannerImage-container">
          {/* <img src={BannerBackground} alt="" /> */}
        </div>
        <div className='home-text-section'>
          <h1 className='primary-heading' color >
          Your Favourite Music Party Service
          </h1>
          <p className='primary-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget commodo massa. 
          Duis ac ipsum in ex posuere ullamcorper at in lorem. 
          Sed ut purus suscipit, tristique dolor vel, lacinia justo. Ut quis ultrices nulla. Quisque euismod eu tellus vel faucibus. Nunc convallis ultricies neque, sed mollis mi. Morbi finibus dignissim tempor. Vivamus sed mauris consequat, vulputate felis at, hendrerit orci. Mauris mauris lorem, lacinia at mi sed, imperdiet facilisis elit. 
          </p>
          <button className="secondary-button">
            Join Party <FiArrowRight/>
          </button>
        </div>
        <div className='home-image-container'>
          <img src={BannerImage} alt="" />
          
        </div>
      </div>
    </div>
  )
}

export default Home
