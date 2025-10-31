import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import PublicOffer from './PublicOffer';
import './App.css';
import Confidentiality from './Confidentiality';

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
        <Route path="/public-offer" element={<PublicOffer />} />
        <Route path="/confidentiality" element={<Confidentiality />} />
      </Routes>
    </Router>
  );
}

export default App;
