import React from 'react';

function Gif() {
  const [search, setSearch] = React.useState('');
  const [gifs, setGifs] = React.useState([]);

  const changeHandler = e => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const controller = new AbortController(); // It solves Warning: Can't perform a React state update on an unmounted component.
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_KEY}&q=${search}&limit=5&offset=0&rating=G&lang=en`,
          {signal}
        ).then(response => response.json());
        const gifsLoaded = await data.data;
        setGifs(gifsLoaded);
      } catch {
        console.log('Error');
      }
    };
    fetchData();
    return () => {
      console.log('Abort');
      controller.abort();
    };
  }, [search]);
  return (
    <div>
      <input type="text" name="search" value={search} onChange={changeHandler} />
      <div>
        {gifs.length > 0 &&
          gifs.map(gif => (
            <img key={Math.random() * 1000} src={gif.images.original.url} alt="gif" />
          ))}
        {gifs.length === 0 && <p>No gifs found</p>}
      </div>
    </div>
  );
}

export default Gif;
