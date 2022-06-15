import React from 'react';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
