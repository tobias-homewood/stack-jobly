import { useEffect, useState } from "react";
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
import JoblyApi from "./utils/api";

function App() {
    // Temporary hard-coded user for testing
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            setCurrentUser(await JoblyApi.getUser("testuser"));
        }
        fetchUser();
    }, []);

    return (
      <CurrentUserContext.Provider value={ {currentUser, setCurrentUser} }>
        <Router>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />

                {currentUser ? (
                    <>
                        <Route path="/companies">
                            <Route
                                index
                                element={<Companies />}
                            />
                            <Route
                                path=":handle"
                                element={
                                    <div>This is the COMPANY JOB LIST</div>
                                }
                            />
                        </Route>
                        <Route
                            path="/jobs"
                            element={<Jobs />}
                        />
                        <Route
                            path="/profile"
                            element={<div>This is the PROFILE PAGE</div>}
                        />
                    </>
                ) : (
                    <>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            path="/signup"
                            element={<Signup />}
                        />
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
      </CurrentUserContext.Provider>
    );
}

export default App;
