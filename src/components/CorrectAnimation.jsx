import React, { useState, useEffect } from 'react';
import './ColorGuessingGame.css';

const CorrectAnimation = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h1>Congratulations! 🎉</h1>
            {/* <img src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" alt="Celebration" /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectAnimation;

/* Add the following CSS to your styles */

