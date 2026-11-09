import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import About from './About';
import PublicOffer from './PublicOffer';
import NoPublicOffer from './NoPublicOffer';
import NoPublicOfferAddendum from './NoPublicOfferAddendum';
import Confidentiality from './Confidentiality';
import ConfidentialityPartner from './ConfidentialityPartner';
import './App.css';

const navGroups = [
  {
    label: 'Клиентам',
    links: [
      { to: '/public-offer', label: 'Публичная оферта' },
      { to: '/confidentiality', label: 'Соглашение о конфиденциальности для клиентов' },
    ],
  },
  {
    label: 'Партнерам',
    links: [
      { to: '/nopublic-offer', label: 'Непубличная оферта' },
      { to: '/nopublic-offer-addendum', label: 'Доп. соглашение № 1 для партнеров' },
      { to: '/confidentiality-partners', label: 'Соглашение о конфиденциальности для партнеров' },
    ],
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="brand">
          <img src="/launcher.png" alt="" className="brand__logo" />
          <span className="brand__name">Север Гоу</span>
        </Link>

        <button
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end className="nav__link">О сервисе</NavLink>
          {navGroups.map((g) => (
            <div key={g.label} className="nav__group">
              <span className="nav__link nav__trigger">
                {g.label} <span className="caret" aria-hidden>▾</span>
              </span>
              <div className="nav__menu">
                {g.links.map((l) => (
                  <NavLink key={l.to} to={l.to} className="nav__item">
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="brand brand--small">
            <img src="/launcher.png" alt="" className="brand__logo" />
            <span className="brand__name">Север Гоу</span>
          </div>
          <p className="muted">ИП Жуков Артём Владимирович · ИНН 870902038496 · ОГРНИП 326870000001178</p>
        </div>
        <a href="mailto:dostavka24.service@yandex.ru">dostavka24.service@yandex.ru</a>
      </div>
      <div className="footer__copy muted">© {new Date().getFullYear()} Север Гоу</div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/public-offer" element={<PublicOffer />} />
          <Route path="/confidentiality" element={<Confidentiality />} />
          <Route path="/nopublic-offer" element={<NoPublicOffer />} />
          <Route path="/nopublic-offer-addendum" element={<NoPublicOfferAddendum />} />
          <Route path="/confidentiality-partners" element={<ConfidentialityPartner />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
