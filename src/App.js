import './App.css';
import Counter from './Excercise1/Counter';
import XYPosition from './Excercise2/XYPosition';
import Gif from './Excercise3/Gif';
import RoboHash from './Excercise4/RoboHash';
import UserProfile from './Excercise5/UserProfile';

function App() {
  return (
    <div className="App">
      <Counter />
      <XYPosition />
      <Gif />
      {/* <RoboHash /> */}
      <UserProfile />
    </div>
  );
}

export default App;
