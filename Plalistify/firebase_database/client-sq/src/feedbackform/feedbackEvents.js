// feedbackEvents.js
export const handleEmojiClickEvent = (container, emoji, textarea, setIsTextareaActive) => {
  emoji.addEventListener('click', (e) => {
    if (e.target.className.includes('feedbackform-emoji')) return;
    textarea.classList.add('textarea--active');
    setIsTextareaActive(true);
  });
};
