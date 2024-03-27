import React from "react";
//importing stock images to be placed on landing page
import CreateParty from "../Assets/create-a-party-image.png";
import ChooseSettings from "../Assets/choose-image.png";
import MicrophoneParty from "../Assets/microphone-image.png";

//The work component is created to path a step by step plan for Users.
const Work = () => {
  const workInfoData = [
    {
      // create party UI
      image: CreateParty,
      title: "Create a Party",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      //choose setting UI
      image: ChooseSettings,
      title: "Choose your settings",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      //Party with Friends UI
      image: MicrophoneParty,
      title: "Party With Friends",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];
  return (
    // The header and paragraph for the work component
    <div className="work-section-wrapper" id="how-it-works-section">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;