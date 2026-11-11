
import { useState } from 'react';
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
    tabs: [
      {
        label: 'Flamenco',
        title: 'The passion of Andalusia',
        text: 'Flamenco is one of Spain’s most recognised cultural expressions. It combines expressive dancing, singing, guitar music and rhythmic handclaps. Its performances communicate powerful emotions and stories.'
      },
      {
        label: 'Sardana',
        title: 'A circle of Catalan culture',
        text: 'The Sardana is a traditional dance from Catalonia. Dancers join hands in a circle and move together to music played by a cobla ensemble. It represents unity and regional identity.'
      },
      {
        label: 'Jota & Muñeira',
        title: 'Regional dance traditions',
        text: 'The Jota is associated with Aragón and is known for lively steps and energetic music. The Muñeira is a traditional dance from Galicia, often accompanied by the sound of the gaita, a type of bagpipe.'
      }
    ]
  },
  {
    icon: Shirt,
    title: 'Traditional clothing',
    subtitle: 'Colour and regional identity',
    image: 'https://i.blogs.es/e7f6f8/279690031_1219334055266192_2406264317075660150_n/650_1200.jpeg',
    tabs: [
      {
        label: 'Flamenco dress',
        title: 'Traje de flamenca',
        text: 'The traje de flamenca is a famous Andalusian outfit. It often features colourful fabric, ruffles, fitted shapes and decorative accessories. It is especially visible during the Feria de Abril in Seville.'
      },
      {
        label: 'Fallera dress',
        title: 'Traje de fallera',
        text: 'Valencia is famous for its elaborate fallera clothing. The outfit includes a beautifully decorated dress, traditional hairstyles and ornate accessories. It is worn during the Las Fallas celebrations.'
      },
      {
        label: 'Regional styles',
        title: 'A variety of Spanish outfits',
        text: 'Different Spanish regions have their own traditional clothing. These outfits reflect local history, climate, crafts and celebrations. They are often displayed during festivals and cultural events.'
      }
    ]
  },
  {
    icon: PartyPopper,
    title: 'Famous traditions',
    subtitle: 'Celebrations and community',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85',
    tabs: [
      {
        label: 'Three Kings',
        title: 'Día de los Reyes Magos',
        text: 'Celebrated on 6 January, Three Kings Day marks the arrival of the Three Wise Men. Children receive gifts, and colourful parades known as Cabalgatas take place in many Spanish towns.'
      },
      {
        label: 'Semana Santa',
        title: 'Holy Week in Spain',
        text: 'Semana Santa takes place during the week before Easter. Cities such as Seville and Málaga hold processions featuring religious statues, traditional music and participants wearing distinctive robes.'
      },
      {
        label: 'Local fiestas',
        title: 'Celebrations across Spain',
        text: 'Spanish towns and cities organise local fiestas throughout the year. These celebrations often include music, dancing, traditional food, parades and activities that bring communities together.'
      }
    ]
  },
  {
    icon: Guitar,
    title: 'Music and instruments',
    subtitle: 'The sounds of Spain',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=85',
    tabs: [
      {
        label: 'Classical guitar',
        title: 'The Spanish guitar',
        text: 'The classical guitar is strongly associated with Spanish musical culture. Its expressive sound is used in classical compositions, traditional music and flamenco performances.'
      },
      {
        label: 'Castanets',
        title: 'Rhythm with castanets',
        text: 'Castanets are small percussion instruments traditionally made from wood or similar materials. They are held in the hands and clicked together to create rhythmic patterns, especially in dance performances.'
      },
      {
        label: 'Cajón & bagpipes',
        title: 'Regional musical sounds',
        text: 'The cajón is a box-shaped percussion instrument used in many flamenco performances. In Galicia, the gaita, a traditional bagpipe, is an important part of regional folk music.'
      }
    ]
  }
];

function TraditionCard({ item, index }) {
  const [activeTab, setActiveTab] = useState(0);
  const selected = item.tabs[activeTab];

  return (
    <article className="culture-extra-card">
      <img src={item.image} alt={item.title} />

      <div className="culture-extra-content">
        <div className="culture-icon">
          <item.icon size={24} />
        </div>

        <span className="culture-number">0{index + 5}</span>

        <span className="culture-extra-subtitle">
          {item.subtitle}
        </span>

        <h3>{item.title}</h3>

        <div className="culture-inner-tabs">
          {item.tabs.map((tab, tabIndex) => (
            <button
              key={tab.label}
              type="button"
              className={`culture-tab ${activeTab === tabIndex ? 'active' : ''}`}
              onClick={() => setActiveTab(tabIndex)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="culture-tab-content">
          <h4>{selected.title}</h4>
          <p>{selected.text}</p>
        </div>
      </div>
    </article>
  );
}

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
            Select the tabs in each card to explore more.
          </p>
        </div>

        <div className="culture-extra-grid">
          {traditions.map((item, i) => (
            <TraditionCard
              key={item.title}
              item={item}
              index={i}
            />
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

