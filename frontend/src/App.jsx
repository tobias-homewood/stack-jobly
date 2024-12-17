import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import './App.css'
import CurrentUserContext from "./utils/currentUserContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    const [currentUser, setCurrentUser] = useState({ username: "testUser" });

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
                                element={<div>This is the COMPANIES LIST</div>}
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
                            element={<div>This is the JOBS LIST</div>}
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
