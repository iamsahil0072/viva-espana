import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import Home from './pages/Home';
import { Explore, CityDetail } from './pages/Explore';
import Culture from './pages/Culture';
import Cuisine from './pages/Cuisine';
import Festivals from './pages/Festivals';
import Learn from './pages/Learn';
import About from './pages/About';
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}
export default function App(){const [language,setLanguage]=useState('EN');const [dark,setDark]=useState(false);return <div className={dark?'app dark':'app'}><ScrollToTop/><Header language={language} setLanguage={setLanguage} dark={dark} setDark={setDark}/><Routes><Route path="/" element={<Home/>}/><Route path="/explore" element={<Explore/>}/><Route path="/explore/:slug" element={<CityDetail/>}/><Route path="/culture" element={<Culture/>}/><Route path="/cuisine" element={<Cuisine/>}/><Route path="/festivals" element={<Festivals/>}/><Route path="/learn" element={<Learn/>}/><Route path="/about" element={<About/>}/><Route path="*" element={<Home/>}/></Routes><Footer/></div>}
