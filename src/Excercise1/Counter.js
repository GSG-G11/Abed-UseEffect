import React, {useState, useEffect} from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.addEventListener('mousedown', incrementCount);

    return () => {
      document.removeEventListener('mousedown', incrementCount);
    };
  });

  function incrementCount() {
    setCount(prevCount => prevCount + 1);
  }
  return (
    <div>
      <button onClick={incrementCount}>Increase</button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;
