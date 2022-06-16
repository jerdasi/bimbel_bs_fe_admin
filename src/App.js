import React from 'react';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
