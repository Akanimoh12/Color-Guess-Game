import React, { useState, useEffect } from 'react';
import './ColorGuessingGame.css';

const colors = ['cyan', 'magenta', 'green', 'blue', 'turquoise', 'pink'];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function ColorGuessingGame() {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCryingEmoji, setShowCryingEmoji] = useState(false);

  const startNewGame = () => {
    const shuffledColors = shuffleArray([...colors]);
    setTargetColor(shuffledColors[Math.floor(Math.random() * shuffledColors.length)]);
    setColorOptions(shuffleArray([...shuffledColors]));
    setGameStatus('');
    setScore(0);
    setShowCelebration(false);
    setShowCryingEmoji(false);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setGameStatus('Passed the guess! 🎉');
      setScore((prevScore) => prevScore + 1);
      setShowCelebration(true);
      setShowCryingEmoji(false);

      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    } else {
      setGameStatus('Wrong! Try again! 😢');
      setShowCryingEmoji(true);

      setTimeout(() => {
        setShowCryingEmoji(false);
      }, 2000);
    }

    const shuffledColors = shuffleArray([...colors]);
    setTargetColor(shuffledColors[Math.floor(Math.random() * shuffledColors.length)]);
    setColorOptions(shuffleArray([...shuffledColors]));
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="container">
      {/* <h1 className="title">Guess the color of the circle</h1> */}

      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>

      <p data-testid="gameInstructions" className="instructions">
        Guess color that matches the Circle!
      </p>

      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>

      <p data-testid="gameStatus" className="game-status">{gameStatus}</p>

      {showCelebration && <div className="fullscreen-overlay celebration">🎉 Congratulations! 🎉</div>}
      {showCryingEmoji && <div className="fullscreen-overlay fail-emoji">😢 Try Again 😢 </div>}

      <p data-testid="score" className="score">Score: {score}</p>

      <button
        data-testid="newGameButton"
        className="new-game-button"
        onClick={startNewGame}
      >
        Restart Game
      </button>
    </div>
  );
}
