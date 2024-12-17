import { Link, NavLink } from "react-router-dom";

const Navbar = ({ authenticated, logout }) => {
    return (
        <nav>
            <NavLink to="/">Jobly</NavLink>

            {authenticated ? (
                <>
                    <NavLink to="/companies">Companies</NavLink>
                    <NavLink to="/jobs">Jobs</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <Link onClick={logout} to="/">Logout</Link>
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
