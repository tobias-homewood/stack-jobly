import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import CurrentUserContext from "./utils/currentUserContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Companies from "./components/Companies";
import Jobs from "./components/Jobs";
import useAuthentication from "./hooks/useAuthentication";

function App() {
    // Authentication hook handles the logic for setting up the state for currentUser and token in local storage
    const { currentUser, setCurrentUser, setToken, clearToken, isLoading } =
        useAuthentication();

    // Don't render the app until we've checked for a user
    if (isLoading) return null;

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, setCurrentUser, setToken, clearToken }}
        >
            <Router>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />

                    {currentUser ? (
                        <>
                            <Route path="/companies">
                                <Route index element={<Companies />} />
                                <Route
                                    path=":handle"
                                    element={
                                        <div>This is the COMPANY JOB LIST</div>
                                    }
                                />
                            </Route>
                            <Route path="/jobs" element={<Jobs />} />
                            <Route
                                path="/profile"
                                element={<div>This is the PROFILE PAGE</div>}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </CurrentUserContext.Provider>
    );
}

export default App;
