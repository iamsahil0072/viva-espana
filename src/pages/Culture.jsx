
import {
  Music2,
  Palette,
  Landmark,
  Users,
  Shirt,
  PartyPopper,
  Guitar,
  Drama
} from 'lucide-react';

import { PageIntro } from '../components/UI';

const pillars = [
  {
    icon: Music2,
    title: 'Flamenco',
    text: 'A powerful art form combining song, guitar, rhythmic handclaps and expressive dance. It is especially associated with Andalusia.'
  },
  {
    icon: Palette,
    title: 'Art & architecture',
    text: 'Spain has inspired artists such as Velázquez, Goya, Picasso and Dalí, while Gaudí transformed the language of architecture.'
  },
  {
    icon: Landmark,
    title: 'Heritage',
    text: 'Roman remains, Islamic architecture, medieval towns and modern design reveal the many chapters of Spanish history.'
  },
  {
    icon: Users,
    title: 'Everyday life',
    text: 'Social life often centres on family, friends, neighbourhood cafés, public squares and shared meals.'
  }
];

const traditions = [
  {
    icon: Drama,
    title: 'Traditional dances',
    subtitle: 'Dance, rhythm and expression',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1000&q=85',
    text: 'Flamenco is one of Spain’s best-known dance traditions. It combines singing, guitar, handclaps and expressive movement. Other regional dances include the Sardana of Catalonia, Jota of Aragón and Muñeira of Galicia.'
  },
  {
    icon: Shirt,
    title: 'Traditional clothing',
    subtitle: 'Colour and regional identity',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    text: 'Traditional Spanish clothing differs across regions. The traje de flamenca is famous for its colourful fabric and ruffles. Valencia is known for the elaborate traje de fallera worn during Fallas celebrations.'
  },
  {
    icon: PartyPopper,
    title: 'Famous traditions',
    subtitle: 'Celebrations and community',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85',
    text: 'Spanish celebrations bring communities together. Semana Santa features religious processions, Three Kings Day includes parades and gifts, and local fiestas celebrate music, food and community.'
  },
  {
    icon: Guitar,
    title: 'Music and instruments',
    subtitle: 'The sounds of Spain',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=85',
    text: 'Spanish music has a rich history. The classical guitar is internationally recognised, while castanets and cajón are associated with traditional performances. Regional music reflects Spain’s diverse identities.'
  }
];

export default function Culture() {
  return (
    <main className="page-shell">
      <div className="container">
        <PageIntro
          eyebrow="IDENTITY & EXPRESSION"
          title="Culture is the heartbeat."
          description="Spain's culture is wonderfully diverse. Traditions, languages, art and daily life vary from region to region."
        />
      </div>

      <div className="culture-hero">
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=85"
          alt="Coastal landscape"
        />
        <div>
          <span className="eyebrow">MANY REGIONS, MANY STORIES</span>
          <h2>One country.<br /><em>Many identities.</em></h2>
        </div>
      </div>

      <section className="container section">
        <div className="culture-grid">
          {pillars.map((p, i) => (
            <article className="culture-card" key={p.title}>
              <span className="culture-number">0{i + 1}</span>
              <div className="culture-icon">
                <p.icon size={24} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="culture-traditions container section">
        <div className="culture-section-heading">
          <span className="eyebrow">TRADITIONS & HERITAGE</span>
          <h2>Experience the Spanish way of life.</h2>
          <p>
            Discover the customs, celebrations, clothing and musical
            traditions that have shaped Spanish identity across generations.
          </p>
        </div>

        <div className="culture-extra-grid">
          {traditions.map((item, i) => (
            <article className="culture-extra-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="culture-extra-content">
                <div className="culture-icon">
                  <item.icon size={24} />
                </div>
                <span className="culture-number">0{i + 5}</span>
                <span className="culture-extra-subtitle">
                  {item.subtitle}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="language-strip">
        <div className="container language-inner">
          <div>
            <span className="eyebrow">LANGUAGES OF SPAIN</span>
            <h2>More than one voice.</h2>
            <p>
              Spanish (Castilian) is the official language of the state.
              Catalan, Galician, Basque and Aranese also have official
              status in their respective territories.
            </p>
          </div>

          <div className="language-chips">
            <span>Castellano</span>
            <span>Català</span>
            <span>Galego</span>
            <span>Euskara</span>
            <span>Aranés</span>
          </div>
        </div>
      </section>
    </main>
  );
}
