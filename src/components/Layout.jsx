import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages, ArrowUpRight } from 'lucide-react';

const links = [
  ['Explore', '/explore'],
  ['Culture', '/culture'],
  ['Cuisine', '/cuisine'],
  ['Festivals', '/festivals'],
  ['Learn Spanish', '/learn'],
  ['About', '/about'],
];

export function Header({ language, setLanguage, dark, setDark }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="nav-wrap">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="¡Viva España! Home">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span>¡Viva <b>España</b>!</span>
        </Link>

        <nav className={open ? 'nav-links open' : 'nav-links'} id="primary-navigation" aria-label="Main navigation">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-button language-toggle"
            onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
            aria-label={`Switch language; current language ${language}`}
          >
            <Languages size={17} aria-hidden="true" />
            <span>{language}</span>
          </button>
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={dark}
          >
            {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="primary-navigation"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <Link className="nav-cta" to="/explore">
            Start exploring <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">V</span>
            <span>¡Viva <b>España</b>!</span>
          </Link>
          <p>A little window into the places, flavours and traditions of Spain.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/explore">Destinations</Link>
          <Link to="/culture">Culture</Link>
          <Link to="/cuisine">Cuisine</Link>
          <Link to="/festivals">Festivals</Link>
          <Link to="/learn">Learn Spanish</Link>
          <Link to="/about">About this project</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ¡Viva España! Student project</span>
        <span>Hecho con cariño · Made with care</span>
      </div>
    </footer>
  );
}
