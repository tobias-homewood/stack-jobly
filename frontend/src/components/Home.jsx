import { useContext } from 'react';
import CurrentUserContext from '../utils/currentUserContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div>
      <h1>Welcome to Jobly</h1>
      <p>The best place to find your next job!</p>
      {currentUser ? <h2>Welcome back, {currentUser.username}!</h2> : (
        <div>
          <Link to="/login"><button>Log in</button></Link>
          <Link to="/signup"><button>Sign up</button></Link>
        </div>
      )}
    </div>
  )
}

export default Home