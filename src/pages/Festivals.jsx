import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { festivals } from '../data';
import { PageIntro } from '../components/UI';

export default function Festivals(){
  return <main className="page-shell container festivals-page">
    <div className="festivals-intro-layout">
      <PageIntro eyebrow="CELEBRATIONS & TRADITIONS" title="Spain knows how to celebrate." description="From neighbourhood fairs to internationally known events, festivals bring music, creativity and community into the streets."/>
      <aside className="festivals-intro-note">
        <Sparkles size={21}/>
        <strong>{String(festivals.length).padStart(2,'0')}</strong>
        <span>FESTIVALS TO DISCOVER</span>
        <p>Every celebration has its own rhythm, story and sense of place.</p>
      </aside>
    </div>
    <div className="festivals-section-label"><span className="eyebrow">THE FESTIVAL CALENDAR</span><span>TRADITION · MUSIC · COMMUNITY</span></div>
    <div className="festival-list">{festivals.map((f,i)=><article className="festival-row" key={f.name}>
      <div className="festival-image"><img src={f.image} alt={f.name}/><span className="festival-image-number">{String(i+1).padStart(2,'0')}</span></div>
      <div className="festival-info"><span className="eyebrow">FESTIVAL {String(i+1).padStart(2,'0')}</span><h2>{f.name}</h2><p>{f.text}</p>
        <div className="festival-meta"><span><CalendarDays size={15}/>{f.when}</span><span><MapPin size={15}/>{f.place}</span></div>
      </div>
    </article>)}</div>
    <p className="small-note">Festival dates can change each year. Check local event information before planning a visit.</p>
  </main>
}