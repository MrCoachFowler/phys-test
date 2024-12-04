import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Set initial position and speed of the ball
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState({ x: 2, y: 2 }); // Speed of the ball in x and y directions
  const ballRadius = 20;

  useEffect(() => {
    // Function to update the position of the ball
    const moveBall = () => {
      setPosition((prevPosition) => {
        let newX = prevPosition.x + direction.x;
        let newY = prevPosition.y + direction.y;

        // Boundary collision detection and reverse direction
        if (newX + ballRadius > window.innerWidth || newX - ballRadius < 0) {
          setDirection({x: -direction.x, y: direction.y});
        }
        if (newY + ballRadius > window.innerHeight || newY - ballRadius < 0) {
          setDirection({x: direction.x, y: -direction.y});
        }

        return { x: newX, y: newY };
      });
    };

    // Use requestAnimationFrame for smooth animation
    const interval = setInterval(moveBall, 16); // roughly 60fps

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="App">
      <div
        style={{
          position: 'absolute',
          top: position.y - ballRadius,
          left: position.x - ballRadius,
          width: ballRadius * 2,
          height: ballRadius * 2,
          borderRadius: '50%',
          backgroundColor: 'red',
        }}
      />
    </div>
  );
};

export default App;