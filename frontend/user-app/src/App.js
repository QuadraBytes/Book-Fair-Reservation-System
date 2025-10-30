import './App.css';
import Home from './screens/home/home';
import StallBooking from './screens/StallBooking';
import UserLogIn from './screens/UserLogIn';
import UserSignIn from './screens/UserSignIn';

function App() {
  return (
    <div >
      { <UserSignIn />}
      {/* { <UserLogIn /> } */}
      {/* StallBooking /> */}
    </div>
  );
}

export default App;
