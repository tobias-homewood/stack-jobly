import { useContext } from 'react';
import CurrentUserContext from '../utils/currentUserContext';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className='mt-5 text-center text-light'>
      <h1>Welcome to Jobly</h1>
      <p>The best place to find your next job!</p>
      {currentUser ? <h2>Welcome back, {currentUser.username}!</h2> : (
        <div>
          <Button as={Link} to='/login' className='m-2'>Log in</Button>
          <Button as={Link} to='/signup' className='m-2'>Sign up</Button>
        </div>
      )}
    </div>
  )
}

export default Home