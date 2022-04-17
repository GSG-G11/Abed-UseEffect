import React from 'react';

function RoboHash() {
  const [search, setSearch] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [image, setImage] = React.useState('');

  React.useEffect(() => {
    const controller = new AbortController(); // It solves Warning: Can't perform a React state update on an unmounted component.
    const signal = controller.signal;
    const getImage = async () => {
      try {
        const response = await fetch(
          `https://robohash.org/${search}.png?set=any&size=200x200`,
          {
            signal,
          }
        ).then(response => response.blob());
        const url = URL.createObjectURL(response);
        setImage(url);
      } catch {
        setImage('');
        console.log('Error');
      }
    };

    if (isSending) {
      getImage().then(() => {
        setIsSending(false);
      });
    }

    return () => {
      console.log('Clean up');
      controller.abort();
    };
  }, [isSending]);

  const changeHandler = e => {
    setSearch(e.target.value);
  };

  const clickHandler = e => {
    e.preventDefault();
    setIsSending(true);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a word"
        name="name"
        value={search}
        onChange={changeHandler}
      />
      <button onClick={clickHandler}>Search</button>
      <div>{image ? <img src={image} alt="robo" /> : 'No image found'}</div>
    </div>
  );
}

export default RoboHash;
