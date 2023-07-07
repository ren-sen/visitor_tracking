import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from '../homepage/Home';
import Dashboard from '../dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {["/", "/home", "/index"].map((path, index) =>
          <Route path={path} element={<Home />} key={index} />
        )}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
