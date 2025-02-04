import React, { useState, useEffect } from 'react';
import './ColorGuessingGame.css';
import CorrectAnimation from './CorrectAnimation';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']; 

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function ColorGuessingGame() {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [score, setScore] = useState(0);

  const startNewGame = () => {
    const shuffledColors = shuffleArray([...colors]);
    setTargetColor(shuffledColors[Math.floor(Math.random() * shuffledColors.length)]);
    setColorOptions(shuffleArray([...shuffledColors]));
    setGameStatus('');
    setScore(0);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setGameStatus(<CorrectAnimation/>);
      setScore(prevScore => prevScore + 1);
    } else {
      setGameStatus('Wrong! Try again.');
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
      <h1 className="title">Color Guessing Game</h1>

      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>

      <p data-testid="gameInstructions" className="instructions">Guess the correct color!</p>

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
