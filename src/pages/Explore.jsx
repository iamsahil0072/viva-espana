import { useEffect, useMemo, useState } from 'react';
import { Search, MapPin, ArrowUpRight, Compass } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { cities } from '../data';
import { attractions } from '../attractions';
import { CityCard, PageIntro } from '../components/UI';
function AttractionImage({ placeName, placeImage }) {
  const [imageUrl, setImageUrl] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setImageUrl('');
    setFailed(false);
    const loadExactImage = async () => {
      try {
        const params = new URLSearchParams({
          action: 'query',
          titles: `File:${placeImage}`,
          prop: 'imageinfo',
          iiprop: 'url',
          iiurlwidth: '900',
          format: 'json',
          origin: '*'
        });
        const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
        if (!response.ok) throw new Error('Image lookup failed');
        const data = await response.json();
        const page = Object.values(data.query?.pages || {})[0];
        const info = page?.imageinfo?.[0];
        const url = info?.thumburl || info?.url;
        if (active && url) setImageUrl(url);
        else if (active) setFailed(true);
      } catch {
        if (active) setFailed(true);
      }
    };
    if (placeImage) loadExactImage();
    else setFailed(true);
    return () => { active = false; };
  }, [placeName, placeImage]);

  if (failed) return <div role="img" aria-label={`Photo unavailable for ${placeName}`} style={{width:'100%',height:'190px',background:'linear-gradient(135deg,#e9dfd0,#d8c7b2)',display:'grid',placeItems:'center',color:'#786b5e',fontSize:'.9rem'}}>Photo unavailable</div>;
  return <div style={{width:'100%',height:'190px',background:'#eee5d9'}}>
    {imageUrl && <img src={imageUrl} alt={placeName} loading="lazy" style={{width:'100%',height:'190px',objectFit:'cover',display:'block'}} />}
  </div>;
}

export function Explore(){const [query,setQuery]=useState('');const filtered=useMemo(()=>cities.filter(c=>(c.name+' '+c.region+' '+c.tag).toLowerCase().includes(query.toLowerCase())),[query]);return <main className="page-shell container"><PageIntro eyebrow="FIND YOUR PLACE" title="Explore Spain" description={`Discover ${cities.length} destinations, each with its own character, flavours and stories waiting to be explored.`}/><div className="explore-overview"><div className="explore-overview-copy"><span className="eyebrow">BEYOND THE POSTCARD</span><p>From Mediterranean coastlines to historic northern cities, find the Spain that speaks to you.</p></div><div className="explore-stat"><strong>{cities.length.toString().padStart(2,'0')}</strong><span>DESTINATIONS</span></div><div className="explore-stat"><strong>17</strong><span>AUTONOMOUS COMMUNITIES</span></div></div><div className="explore-search-heading"><div><span className="eyebrow">CHOOSE YOUR NEXT STOP</span><h2>Find a place to fall for.</h2></div><span className="explore-search-hint"><Compass size={15}/> Search by city, region or feeling</span></div><div className="search-bar"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search cities, regions or experiences..."/><span>{filtered.length} places</span></div><div className="city-grid explore-grid">{filtered.map((c,i)=><CityCard key={c.name} city={c} index={i}/>)}</div>{filtered.length===0&&<div className="empty-state">No places found. Try another search.</div>}<div className="map-note"><MapPin/><div><b>Explore at your own pace</b><p>Spain has 17 autonomous communities and two autonomous cities, each with distinct local identities.</p></div></div></main>}
export function CityDetail(){const {slug}=useParams();const city=cities.find(c=>c.name.toLowerCase()===decodeURIComponent(slug||''));if(!city)return <main className="container page-shell"><PageIntro eyebrow="DESTINATION" title="Place not found" description="Return to the destinations page to choose another city."/><Link to="/explore" className="button button-primary">Back to destinations</Link></main>;return <main className="container page-shell"><Link to="/explore" className="back-link">← All destinations</Link><div className="detail-hero"><img src={city.image} alt={city.name}/><div><span className="eyebrow">{city.region}</span><h1>{city.name}</h1><p>{city.description}</p><span className="detail-highlight"><MapPin size={16}/> Don't miss: {city.highlight}</span></div></div><section className="detail-text"><span className="eyebrow">GET TO KNOW THE CITY</span><h2>A little more about {city.name}</h2><p>{city.detail}</p><section className="detail-places" style={{marginTop:'4rem'}}><span className="eyebrow">MUST-SEE LANDMARKS</span><h2>Important places to visit in {city.name}</h2><p className="detail-places-intro">Explore some of the city’s most memorable sights, from historic monuments to beautiful public spaces.</p><div className="detail-places-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:'1.25rem',marginTop:'2rem'}}>{(attractions[city.name]||[]).map(([placeName,placeDescription,placeImage],i)=><article className="detail-place-card" key={placeName} style={{overflow:'hidden',borderRadius:'12px',background:'var(--paper, #f7f3eb)',border:'1px solid rgba(0,0,0,.08)'}}><AttractionImage placeName={placeName} placeImage={placeImage}/><div className="detail-place-copy" style={{padding:'1rem 1.1rem 1.25rem'}}><span className="eyebrow">0{i+1} · {city.name}</span><h3 style={{margin:'0.5rem 0'}}>{placeName}</h3><p>{placeDescription}</p></div></article>)}</div></section><p>Take time to explore beyond the famous sights: visit local markets, notice the architecture and enjoy the pace of everyday life.</p><Link to="/culture" className="text-link">Discover Spanish culture <ArrowUpRight size={16}/></Link></section></main>}
