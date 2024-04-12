import React, { useState } from "react";
import ContactForm from "../contactUs/ContactUs";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="contact-page-wrapper" id="contact-section">
      <h1 className="primary-heading">Have Question In Mind?</h1>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="accordion">
              <div className="accordion-item">
                <h4 className="accordion-header">
                  <button
                    className={`accordion-button ${!isAccordionOpen ? "collapsed" : ""}`}
                    type="button"
                    onClick={toggleAccordion}
                  >
                    <h2 className="primary-heading">Let Us Help You</h2>
                  </button>
                </h4>
                <div
                  className={`accordion-collapse collapse ${isAccordionOpen ? "show" : ""}`}
                >
                  <div className="accordion-body">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
