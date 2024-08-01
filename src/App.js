import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Province from './components/Province';
import Schedule from './components/Schedule';
import List from './components/List';
import Dashboard from './components/Dashboard';
import Place from './components/Place';
import CRUD from './components/CRUD';
import Result from './components/Result'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/province" element={<Province />} />
          <Route path="/province/:id" element={<Place />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/list" element={<List />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard/:id" element={<CRUD />} />
          <Route path="/result/:id" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
