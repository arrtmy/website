import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import License from './License';
import Agreement from './Agreement';
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>О себе</Link>
        <Link to="/license" style={{ marginRight: 10 }}>Лицензия</Link>
        <Link to="/agreement">Соглашение о персональных данных</Link>
      </nav>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/license" element={<License />} />
        <Route path="/agreement" element={<Agreement />} />
      </Routes>
    </Router>
  );
}

export default App;
