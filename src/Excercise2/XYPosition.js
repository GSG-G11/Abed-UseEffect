import React from 'react';

function XYPosition() {
  const [xPosition, setXPosition] = React.useState(0);
  const [yPosition, setYPosition] = React.useState(0);

  const handleMouseMove = event => {
    setXPosition(event.clientX);
    setYPosition(event.clientY);
  };
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });
  return (
    <div className={`square ${xPosition < window.innerWidth / 2 ? 'blue' : 'tomato'}`}>
      <p>
        I'm now on X: {xPosition} and Y: {yPosition}
      </p>
    </div>
  );
}

export default XYPosition;
