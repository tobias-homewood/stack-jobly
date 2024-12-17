import { useContext } from 'react'
import CurrentUserContext from '../utils/currentUserContext'

const Login = () => {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const bypassLogin = () => {
        setCurrentUser({ username: "logedInAgain" })
    }

  return (
    <div>
        <h1>Log In</h1>
        <div>THIS IS WHERE THE FORM SHOULD BE</div>
        {/* this is while  authentication is not ready */}
        <button onClick={bypassLogin}><h1>Bypass Login</h1></button>
    </div>
  )
}

export default Login