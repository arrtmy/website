import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import PublicOffer from './PublicOffer';
import './App.css';
import Confidentiality from './Confidentiality';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>О сервисе</Link>
        <Link to="/public-offer" style={{ marginRight: 10 }}>Публичная оферта</Link>
        <Link to="/confidentiality">Соглашение о конфиденциальности</Link>
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
