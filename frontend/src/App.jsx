import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState({username: 'testUser'})

  return (
    <Router>
      <nav>Navbar Goes Here</nav>
      <Routes>
        <Route index element={<div>This is the HOMEPAGE</div>} />
        <Route path="/companies">
          <Route index element={<div>This is the COMPANIES LIST</div>} />
          <Route path=":handle" element={<div>This is the COMPANY JOB LIST</div>} />
        </Route>
        <Route path="/jobs" element={<div>This is the JOBS LIST</div>} />
        <Route path="/profile" element={<div>This is the PROFILE PAGE</div>} />
        <Route path="/login" element={<div>This is the LOGIN PAGE</div>} />
        <Route path="/signup" element={<div>This is the SIGNUP PAGE</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
