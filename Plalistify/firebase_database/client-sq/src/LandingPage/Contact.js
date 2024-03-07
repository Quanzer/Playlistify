import React from "react";

//The contact page is where users can submit their email to ask us a question.
const Contact = () => {
  return (
    <div className="contact-page-wrapper" id="contact-section">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
    </div>
  );
};

export default Contact;