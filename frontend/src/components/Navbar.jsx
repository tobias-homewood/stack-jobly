import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CurrentUserContext from "../utils/currentUserContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const logout = (e) => {
        e.preventDefault();
        setCurrentUser(null);
        navigate("/");
    }
    return (
        <nav>
            <NavLink to="/">Jobly</NavLink>

            {currentUser ? (
                <>
                    <NavLink to="/companies">Companies</NavLink>
                    <NavLink to="/jobs">Jobs</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <Link onClick={logout}>Logout</Link>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </>
            )}
        </nav>
    );
};

export default Navbar;