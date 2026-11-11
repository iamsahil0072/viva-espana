import { GraduationCap, Globe2, Heart, ArrowUpRight } from 'lucide-react';
import { PageIntro } from '../components/UI';

export default function About(){
  return <main className="page-shell container about-page">
    <PageIntro eyebrow="ABOUT THIS EXPERIENCE" title="A student project with a passport." description="¡Viva España! is a small digital guide created to explore Spain through language, places, food and culture."/>
    <section className="about-hero">
      <img src="https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1500&q=85" alt="A coastal town in Spain"/>
      <div className="about-hero-overlay">
        <span className="eyebrow">UN VIAJE DE DESCUBRIMIENTO</span>
        <h2>Discover a country.<br/><em>Learn a language.</em></h2>
        <span className="about-hero-caption">ESPAÑA · CULTURE · LANGUAGE</span>
      </div>
      <div className="about-stamp">HECHO<br/>CON<br/>CARIÑO</div>
    </section>
    <section className="about-columns">
      <div><span className="eyebrow">THE IDEA</span><h2>Learning Spanish beyond the classroom.</h2><span className="about-idea-mark">01 / THE PROJECT</span></div>
      <div><p>This website brings together introductory information about Spain in a visual, easy-to-explore format. It is designed as an educational project for learners who want to discover the country while practising Spanish vocabulary.</p><p>From the architecture of Barcelona to the flavours of Valencia, each section offers a starting point for further learning.</p><a className="about-explore-link" href="/explore">Start exploring <ArrowUpRight size={16}/></a></div>
    </section>
    <section className="about-values-section">
      <div className="about-values-heading"><span className="eyebrow">WHAT YOU WILL FIND</span><h2>Three ways to experience Spain.</h2></div>
      <div className="about-values">
        <div><span className="about-value-number">01</span><GraduationCap/><h3>Learn</h3><p>Build vocabulary and cultural understanding.</p></div>
        <div><span className="about-value-number">02</span><Globe2/><h3>Discover</h3><p>Explore destinations and regional identities.</p></div>
        <div><span className="about-value-number">03</span><Heart/><h3>Appreciate</h3><p>Celebrate the traditions that make Spain unique.</p></div>
      </div>
    </section>
    <section className="project-credit">
      <div><span className="eyebrow">PROJECT DETAILS</span><h2>A little project, a lot to discover.</h2><p>Created as part of a Spanish language learning project.</p></div>
      <div className="project-credit-details"><p><b>Student</b><span>Sahil Kumar</span></p><p><b>Institution</b><span>SRM Institute of Science and Technology</span></p><p><b>Subject</b><span>Spanish</span></p></div>
    </section>
  </main>
}