import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Compass, Globe2, Sparkles, CalendarDays } from 'lucide-react';
import { cities, foods, festivals } from '../data';
import { CityCard, FoodCard, SectionHeading } from '../components/UI';
export default function Home(){return <>
  <section className="hero"><div className="hero-image"/><div className="hero-shade"/><div className="hero-content"><span className="hero-kicker"><span/> A JOURNEY THROUGH SPAIN</span><h1>Feel the <em>spirit</em><br/>of España.</h1><p>From sunlit plazas to coastal escapes, discover a country that stays with you long after the journey ends.</p><div className="hero-buttons"><Link to="/explore" className="button button-primary">Explore Spain <ArrowUpRight size={17}/></Link><Link to="/about" className="button button-glass">Our story</Link></div><div className="hero-note"><span className="flag-mini"><i/><i/><i/></span><span>17 autonomous communities · endless stories</span></div></div><div className="hero-side-label">40° 25′ N &nbsp; 3° 42′ W <span/> MADRID, ESPAÑA</div><a className="scroll-cue" href="#discover"><ArrowDown size={15}/> SCROLL TO DISCOVER</a></section>
  <section className="intro-band" id="discover"><div className="intro-symbol">✳</div><p><b>España is more than a destination.</b> It is a feeling — a rhythm of life shaped by art, food, history and the warmth of its people.</p><span className="intro-script">Bienvenidos</span></section>
  <section className="section container"><SectionHeading eyebrow="THE PLACES" title="A country of many worlds" link="/explore"/><div className="city-grid">{cities.slice(0,3).map((c,i)=><CityCard key={c.name} city={c} index={i}/>)}</div></section>
  <section className="feature-split"><div className="feature-photo"><img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=90" alt="Spanish city architecture"/><span className="photo-caption">THE BEAUTY IS IN THE DETAILS</span></div><div className="feature-copy"><span className="eyebrow">A CULTURE TO FEEL</span><h2>Where every corner tells a story.</h2><p>Walk through centuries of history, hear the pulse of flamenco, admire world-changing art and find the joy in a long meal shared with friends.</p><div className="feature-points"><div><Compass/><span><b>Rich heritage</b><small>History in every street</small></span></div><div><Globe2/><span><b>Many identities</b><small>Regions with unique traditions</small></span></div><div><Sparkles/><span><b>Living creativity</b><small>Art, music and design</small></span></div></div><Link className="text-link" to="/culture">Discover Spanish culture <ArrowUpRight size={16}/></Link></div></section>
  <section className="section container"><SectionHeading eyebrow="A TASTE OF ESPAÑA" title="Made to be savoured" link="/cuisine"/><div className="food-grid">{foods.slice(0,3).map(f=><FoodCard key={f.name} food={f}/>)}</div></section>
  <section className="home-festivals-section">
    <div className="container">
      <SectionHeading eyebrow="THE SPANISH CALENDAR" title="Celebrate the moment" link="/festivals" linkText="Explore all festivals"/>
      <p className="home-festivals-intro">From lively street fairs to treasured local traditions, every season brings a new reason to celebrate.</p>
      <div className="home-festival-grid">
        {festivals.slice(0,3).map((festival,i)=><article className="home-festival-card" key={festival.name}>
          <Link to="/festivals" className="home-festival-image"><img src={festival.image} alt={festival.name}/><span className="home-festival-number">0{i+1}</span><span className="home-festival-arrow"><ArrowUpRight size={18}/></span></Link>
          <div className="home-festival-body"><span className="home-festival-meta"><CalendarDays size={14}/>{festival.when}</span><h3>{festival.name}</h3><p>{festival.text}</p><span className="home-festival-place">{festival.place}</span></div>
        </article>)}
      </div>
    </div>
  </section>
  <section className="quote-banner"><div className="quote-mark">“</div><p>La vida es una fiesta.<br/><em>Life is a celebration.</em></p><span>— THE SPIRIT OF ESPAÑA</span></section>
  <section className="bottom-cta container"><div><span className="eyebrow">YOUR SPANISH JOURNEY STARTS HERE</span><h2>Curious about España?</h2><p>Explore the places, learn a few words and find your own favourite part of Spain.</p></div><Link to="/learn" className="button button-primary">Learn a little Spanish <ArrowUpRight size={17}/></Link></section>
</>}
