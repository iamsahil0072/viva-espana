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
function ScrollReveal(){
  const {pathname}=useLocation();
  useEffect(()=>{
    const targets=document.querySelectorAll([
      '.main-content > section',
      '.main-content .page-shell > *',
      '.main-content .city-card',
      '.main-content .food-card',
      '.main-content .food-grid',
      '.main-content .section-heading',
      '.main-content .culture-card',
      '.main-content .culture-extra-card',
      '.main-content .festival-row',
      '.main-content .home-festival-card',
      '.main-content .vocab-card',
      '.main-content .quiz-panel',
      '.main-content .quiz-heading',
      '.main-content .quiz-question',
      '.main-content .quiz-footer',
      '.main-content .learn-tool-heading',
      '.main-content .about-values > div',
      '.main-content .project-credit',
      '.main-content .culture-extra-card',
      '.main-content .culture-inner-tabs',
      '.main-content .feature-split',
      '.main-content .intro-band',
      '.main-content .quote-banner',
      '.main-content .bottom-cta',
      '.main-content .language-strip',
      '.main-content .tapas-note',
      '.main-content .map-note',
      '.main-content .detail-hero',
      '.main-content .detail-text',
      '.main-content .festivals-intro-note',
      '.main-content .learn-intro-note',
      '.main-content .vocab-section',
      '.main-content .sv-wrap',
      '.main-content .verb-trainer',
      '.main-content .sv-heading',
      '.main-content .sv-stats',
      '.main-content .sv-toolbar',
      '.main-content .sv-flashcard',
      '.main-content .sv-word-list',
      '.main-content .sv-quiz',
      '.main-content .verb-trainer-header',
      '.main-content .verb-table-wrap',
      '.main-content .verb-quiz',
      '.main-content .verb-question'
    ].join(','));
    if(!('IntersectionObserver' in window)){
      targets.forEach((element)=>element.classList.add('reveal-visible'));
      return;
    }
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.08,rootMargin:'0px 0px -6% 0px'});
    targets.forEach((element)=>{
      element.classList.remove('reveal-visible');
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
    return ()=>observer.disconnect();
  },[pathname]);
  return null;
}
export default function App(){const [language,setLanguage]=useState('EN');const [dark,setDark]=useState(false);return <div className={dark?'app dark':'app'}><ScrollToTop/><ScrollReveal/><Header language={language} setLanguage={setLanguage} dark={dark} setDark={setDark}/><main id="main-content" className="main-content"><Routes><Route path="/" element={<Home/>}/><Route path="/explore" element={<Explore/>}/><Route path="/explore/:slug" element={<CityDetail/>}/><Route path="/culture" element={<Culture/>}/><Route path="/cuisine" element={<Cuisine/>}/><Route path="/festivals" element={<Festivals/>}/><Route path="/learn" element={<Learn/>}/><Route path="/about" element={<About/>}/><Route path="*" element={<Home/>}/></Routes></main><Footer/></div>}
