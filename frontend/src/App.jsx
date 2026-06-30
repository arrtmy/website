import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import PublicOffer from './PublicOffer';
import NoPublicOffer from './NoPublicOffer';
import './App.css';
import Confidentiality from './Confidentiality';
import ConfidentialityPartner from './ConfidentialityPartner';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>О сервисе</Link>
        <Link to="/public-offer" style={{ marginRight: 10 }}>Публичная оферта</Link>
        <Link to="/nopublic-offer" style={{ marginRight: 10 }}>Непубличная оферта</Link>
        <Link to="/confidentiality">Соглашение о конфиденциальности для клиентов</Link>
        <Link to="/confidentiality-partners">Соглашение о конфиденциальности для парнеров</Link>
      </nav>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/public-offer" element={<PublicOffer />} />
        <Route path="/confidentiality" element={<Confidentiality />} />
        <Route path="/nopublic-offer" element={<NoPublicOffer />} />
        <Route path="/confidentiality-partners" element={<ConfidentialityPartner />} />
      </Routes>
    </Router>
  );
}

export default App;
