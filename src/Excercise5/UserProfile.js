import React from 'react';

function UserProfile() {
  const [user, setUser] = React.useState('');
  const [sending, setIsSending] = React.useState(true);
  const [editedName, setEditedName] = React.useState('');

  const changeHandler = e => {
    e.preventDefault();
    const answer = prompt('Enter your name');
    setEditedName(answer);
  };

  React.useEffect(() => {
    const controller = new AbortController(); // It solves Warning: Can't perform a React state update on an unmounted component.
    const signal = controller.signal;
    const getUserData = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/`, {signal}).then(res =>
          res.json()
        );
        const data = response.results[0];
        setUser(data);
        setIsSending(false);
      } catch {
        console.log('error');

        setUser('');
      }
    };
    if (sending) {
      getUserData();
    }

    return () => {
      controller.abort();
      console.log('Clean up');
    };
  }, [sending]);

  const deleteHandler = () => {
    setUser('');
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>{editedName || user.name.first + ' ' + user.name.last}</p>
          <button onClick={changeHandler}>Edit name</button>
          <p>{user.dob.age} years</p>
          <img src={user.picture.large} alt="user" />

          <p>{user.email}</p>
          <p>{user.location.country + ': ' + user.location.city}</p>
          <button onClick={deleteHandler}>Delete </button>
        </div>
      ) : (
        <button onClick={() => setIsSending(true)}>Get User</button>
      )}
    </div>
  );
}

export default UserProfile;
