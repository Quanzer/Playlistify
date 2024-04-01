// FeedbackForm.js
import React, { useEffect, useState } from 'react';
import '../styles/FeedbackForm.css';
import { handleEmojiClickEvent } from './feedbackEvents';

const FeedbackForm = () => {
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    const container = document.querySelector('.feedbackform-container');
    const emoji = document.querySelector('.feedbackform-emoji');
    const textarea = document.querySelector('.textarea');

    handleEmojiClickEvent(container, emoji, textarea, setIsTextareaActive);
  }, []);

  const handleButtonClick = () => {
    // Your logic when the "Send" button is clicked
    console.log('Sending feedback:', textareaValue);
  };

  return (
    <div className='feedbackform-container'>
      <div className='feedbackform-wrapper'>
        <p className='feedbackform-text'>How Would You Rate This App?</p>

        <div className='feedbackform-emoji'>
          <div>😣</div>
          <div>😐</div>
          <div>🙂</div>
          <div>😁</div>
          <div>😍</div>
        </div>
      </div>

      <textarea
        className={`textarea ${isTextareaActive ? 'textarea--active' : ''}`}
        id=""
        cols="30"
        rows="3"
        placeholder='Write your opinion!'
        onChange={(e) => setTextareaValue(e.target.value)}
      ></textarea>

      <button
        className={`btn ${isTextareaActive ? 'btn--active' : ''}`}
        onClick={handleButtonClick}
      >
        Send
      </button>
    </div>
  );
};

export default FeedbackForm;
