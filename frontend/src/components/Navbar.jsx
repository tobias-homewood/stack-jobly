import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CurrentUserContext from "../utils/currentUserContext";

export default function () {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const logout = (e) => {
        e.preventDefault();
        setCurrentUser(null);
        navigate("/");
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Jobly
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {currentUser ? (
                            <>
                                <Nav.Link as={NavLink} to="/companies">
                                    Companies
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/jobs">
                                    Jobs
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
