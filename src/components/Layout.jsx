import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages, ArrowUpRight } from 'lucide-react';

const links = [ ['Explore','/explore'], ['Culture','/culture'], ['Cuisine','/cuisine'], ['Festivals','/festivals'], ['Learn Spanish','/learn'], ['About','/about'] ];
export function Header({ language, setLanguage, dark, setDark }) {
  const [open,setOpen] = useState(false);
  return <header className="site-header"><div className="nav-wrap">
    <Link to="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-mark">V</span><span>¡Viva <b>España</b>!</span></Link>
    <nav className={open?'nav-links open':'nav-links'}>{links.map(([label,path])=><NavLink key={path} to={path} onClick={()=>setOpen(false)}>{label}</NavLink>)}</nav>
    <div className="nav-actions"><button className="icon-button language-toggle" onClick={()=>setLanguage(language==='EN'?'ES':'EN')} aria-label="Switch language"><Languages size={17}/><span>{language}</span></button><button className="icon-button theme-toggle" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button><Link className="nav-cta" to="/explore">Start exploring <ArrowUpRight size={15}/></Link></div>
  </div></header>;
}
export function Footer(){return <footer className="footer"><div className="footer-top"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">V</span><span>¡Viva <b>España</b>!</span></Link><p>A little window into the places, flavours and traditions of Spain.</p></div><div className="footer-links"><Link to="/explore">Destinations</Link><Link to="/cuisine">Cuisine</Link><Link to="/learn">Learn Spanish</Link><Link to="/about">About this project</Link></div></div><div className="footer-bottom"><span>© 2026 ¡Viva España! Student project</span><span>Hecho con cariño · Made with care</span></div></footer>}
