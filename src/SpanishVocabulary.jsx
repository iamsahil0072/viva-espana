
import { useMemo, useState } from "react";
import {
  Volume2, Search, ChevronLeft, ChevronRight, Shuffle,
  RotateCcw, CheckCircle2, BookOpen, Layers3
} from "lucide-react";
import "./SpanishVocabulary.css";

const RAW = {
  "Greetings & expressions": `hola=hello;adiós=goodbye;buenos días=good morning;buenas tardes=good afternoon;buenas noches=good evening / good night;hasta luego=see you later;hasta pronto=see you soon;hasta mañana=see you tomorrow;bienvenido=welcome;por favor=please;gracias=thank you;muchas gracias=thank you very much;de nada=you're welcome;perdón=sorry / excuse me;lo siento=I'm sorry;disculpe=excuse me (formal);sí=yes;no=no;quizás=maybe;claro=of course;por supuesto=certainly;vale=okay;está bien=it's alright;¿qué tal?=how's it going?;¿cómo estás?=how are you?;¿cómo está usted?=how are you? (formal);muy bien=very well;más o menos=so-so;mal=badly;encantado=pleased to meet you (masculine);encantada=pleased to meet you (feminine);mucho gusto=nice to meet you;¿cómo te llamas?=what's your name?;me llamo=my name is;¿de dónde eres?=where are you from?;soy de=I am from;¿hablas inglés?=do you speak English?;no entiendo=I don't understand;entiendo=I understand;más despacio=more slowly;repita, por favor=repeat, please;¿qué significa?=what does it mean?;¿cómo se dice?=how do you say?;ayuda=help;salud=cheers / bless you;felicidades=congratulations;buena suerte=good luck;buen viaje=have a good trip;que tengas un buen día=have a nice day;hasta la vista=see you`,

  "Family & people": `la familia=family;la madre=mother;el padre=father;la mamá=mum;el papá=dad;los padres=parents;el hermano=brother;la hermana=sister;el hijo=son;la hija=daughter;el abuelo=grandfather;la abuela=grandmother;los abuelos=grandparents;el nieto=grandson;la nieta=granddaughter;el tío=uncle;la tía=aunt;el primo=cousin (male);la prima=cousin (female);el sobrino=nephew;la sobrina=niece;el marido=husband;la esposa=wife;el esposo=husband / spouse;la pareja=partner / couple;el novio=boyfriend;la novia=girlfriend;el bebé=baby;el niño=boy / child;la niña=girl / child;el hombre=man;la mujer=woman;el amigo=male friend;la amiga=female friend;el vecino=male neighbour;la vecina=female neighbour;la persona=person;la gente=people;el compañero=male classmate / colleague;la compañera=female classmate / colleague;el profesor=male teacher;la profesora=female teacher;el estudiante=male student;la estudiante=female student;el doctor=male doctor;la doctora=female doctor;el señor=sir / Mr.;la señora=madam / Mrs.;el invitado=male guest;la invitada=female guest`,

  "Food & drinks": `el agua=water;la leche=milk;el café=coffee;el té=tea;el zumo=juice;el pan=bread;el arroz=rice;la pasta=pasta;la sopa=soup;la ensalada=salad;el queso=cheese;la mantequilla=butter;el huevo=egg;la carne=meat;el pollo=chicken;el pescado=fish;la fruta=fruit;la manzana=apple;el plátano=banana;la naranja=orange;la uva=grape;la fresa=strawberry;el limón=lemon;la sandía=watermelon;la patata=potato;el tomate=tomato;la cebolla=onion;la zanahoria=carrot;la lechuga=lettuce;el pepino=cucumber;el azúcar=sugar;la sal=salt;la pimienta=pepper;el aceite=oil;el desayuno=breakfast;el almuerzo=lunch;la comida=meal / food;la cena=dinner;el postre=dessert;el helado=ice cream;el pastel=cake;la galleta=cookie;el chocolate=chocolate;el bocadillo=sandwich;la pizza=pizza;el menú=menu;la cuenta=bill / check;delicioso=delicious;dulce=sweet;salado=salty`,

  "Home & everyday objects": `la casa=house;el hogar=home;el apartamento=apartment;la habitación=room;el dormitorio=bedroom;la cocina=kitchen;el baño=bathroom;el salón=living room;la puerta=door;la ventana=window;la pared=wall;el suelo=floor;el techo=ceiling / roof;la mesa=table;la silla=chair;el sofá=sofa;la cama=bed;la almohada=pillow;la manta=blanket;el armario=wardrobe;el espejo=mirror;la lámpara=lamp;la luz=light;la llave=key;el reloj=clock / watch;el teléfono=telephone;el móvil=mobile phone;el ordenador=computer;el portátil=laptop;el libro=book;el cuaderno=notebook;el bolígrafo=pen;el lápiz=pencil;la mochila=backpack;la botella=bottle;el vaso=glass;la taza=cup / mug;el plato=plate;la cuchara=spoon;el tenedor=fork;el cuchillo=knife;la toalla=towel;el jabón=soap;el champú=shampoo;el cepillo=brush;la ropa=clothes;los zapatos=shoes;la camisa=shirt;los pantalones=trousers;la puerta de entrada=front door`,

  "Education & college": `la escuela=school;el colegio=school;la universidad=university;la facultad=faculty / college;la clase=class;el aula=classroom;el curso=course;el semestre=semester;la asignatura=subject;el horario=timetable;el examen=exam;la prueba=test;la tarea=homework / task;los deberes=homework;el proyecto=project;la presentación=presentation;la pregunta=question;la respuesta=answer;el ejercicio=exercise;la lección=lesson;el libro de texto=textbook;los apuntes=notes;la página=page;el capítulo=chapter;la biblioteca=library;el laboratorio=laboratory;el ordenador=computer;la pantalla=screen;el teclado=keyboard;el ratón=mouse;la ciencia=science;las matemáticas=mathematics;la física=physics;la química=chemistry;la biología=biology;la informática=computer science / IT;la programación=programming;el código=code;el algoritmo=algorithm;el profesor=teacher (male);la profesora=teacher (female);el alumno=pupil / student (male);la alumna=pupil / student (female);el compañero de clase=classmate;la nota=grade / mark;aprobar=to pass;suspender=to fail;estudiar=to study;aprender=to learn;enseñar=to teach`,

  "Travel & transport": `el viaje=trip / journey;el turismo=tourism;el turista=tourist (male);la turista=tourist (female);el aeropuerto=airport;la estación=station;la estación de tren=train station;la parada=stop;la parada de autobús=bus stop;el tren=train;el metro=metro / subway;el autobús=bus;el avión=airplane;el barco=boat / ship;el taxi=taxi;el coche=car;la bicicleta=bicycle;la moto=motorbike;el billete=ticket;el pasaporte=passport;la maleta=suitcase;el equipaje=luggage;la mochila=backpack;el mapa=map;la guía=guide;la reserva=reservation;el hotel=hotel;el hostal=hostel;la habitación doble=double room;la recepción=reception;la salida=departure / exit;la llegada=arrival;la puerta de embarque=boarding gate;el vuelo=flight;el retraso=delay;el asiento=seat;el conductor=driver;el pasajero=passenger;la carretera=road;la calle=street;el puente=bridge;el tráfico=traffic;la gasolina=petrol / gasoline;el aparcamiento=car park;a la izquierda=to the left;a la derecha=to the right;todo recto=straight ahead;cerca=near;lejos=far;¿cuánto cuesta?=how much does it cost?`,

  "Places & directions": `el lugar=place;la ciudad=city;el pueblo=town / village;el país=country;el barrio=neighbourhood;el centro=centre / downtown;la plaza=square;el parque=park;el jardín=garden;la calle=street;la avenida=avenue;el mercado=market;la tienda=shop;el supermercado=supermarket;el centro comercial=shopping centre;el restaurante=restaurant;la cafetería=café;el hospital=hospital;la farmacia=pharmacy;el banco=bank;el cajero automático=ATM;la oficina=office;el museo=museum;el cine=cinema;el teatro=theatre;la iglesia=church;la playa=beach;la montaña=mountain;el río=river;el lago=lake;el mar=sea;el bosque=forest;el campo=countryside;el monumento=monument;el castillo=castle;el palacio=palace;la entrada=entrance;la salida=exit;aquí=here;ahí=there;allí=over there;arriba=upstairs / above;abajo=downstairs / below;delante=in front;detrás=behind;al lado=next to;entre=between;dentro=inside;fuera=outside;¿dónde está?=where is it?`,

  "Verbs & actions": `ser=to be (identity / characteristics);estar=to be (state / location);tener=to have;hacer=to do / make;ir=to go;venir=to come;hablar=to speak;decir=to say / tell;escuchar=to listen;oír=to hear;ver=to see;mirar=to look at;leer=to read;escribir=to write;estudiar=to study;aprender=to learn;enseñar=to teach;trabajar=to work;jugar=to play;comer=to eat;beber=to drink;cocinar=to cook;comprar=to buy;vender=to sell;pagar=to pay;abrir=to open;cerrar=to close;entrar=to enter;salir=to leave / go out;llegar=to arrive;esperar=to wait / hope;buscar=to search for;encontrar=to find;necesitar=to need;querer=to want / love;poder=to be able to / can;deber=to have to / should;saber=to know (a fact / how to);conocer=to know / be familiar with;vivir=to live;dormir=to sleep;despertarse=to wake up;levantarse=to get up;caminar=to walk;correr=to run;viajar=to travel;conducir=to drive;ayudar=to help;llamar=to call;gustar=to like`,

  "Adjectives & descriptions": `bueno=good;malo=bad;grande=big;pequeño=small;alto=tall / high;bajo=short / low;largo=long;corto=short;nuevo=new;viejo=old;joven=young;bonito=pretty;feo=ugly;hermoso=beautiful;fácil=easy;difícil=difficult;rápido=fast;lento=slow;caro=expensive;barato=cheap;caliente=hot;frío=cold;templado=mild / lukewarm;limpio=clean;sucio=dirty;feliz=happy;triste=sad;cansado=tired;ocupado=busy;libre=free / available;amable=kind;simpático=friendly;antipático=unfriendly;inteligente=intelligent;tonto=silly / foolish;interesante=interesting;aburrido=boring;importante=important;necesario=necessary;posible=possible;imposible=impossible;fuerte=strong;débil=weak;rico=rich / tasty;pobre=poor;dulce=sweet;salado=salty;abierto=open;cerrado=closed;despierto=awake`,

  "Time, numbers & useful words": `hoy=today;ayer=yesterday;mañana=tomorrow / morning;ahora=now;luego=later;antes=before;después=after;siempre=always;nunca=never;a veces=sometimes;pronto=soon;tarde=late / afternoon;temprano=early;el día=day;la semana=week;el mes=month;el año=year;la hora=hour / time;el minuto=minute;el segundo=second;el lunes=Monday;el martes=Tuesday;el miércoles=Wednesday;el jueves=Thursday;el viernes=Friday;el sábado=Saturday;el domingo=Sunday;enero=January;febrero=February;marzo=March;abril=April;mayo=May;junio=June;julio=July;agosto=August;septiembre=September;octubre=October;noviembre=November;diciembre=December;uno=one;dos=two;tres=three;cuatro=four;cinco=five;seis=six;siete=seven;ocho=eight;nueve=nine;diez=ten;porque=because`
};

const WORDS = Object.entries(RAW).flatMap(([category, line]) =>
  line.split(";").map((entry, index) => {
    const splitAt = entry.indexOf("=");
    return {
      id: `${category}-${index}`,
      category,
      spanish: entry.slice(0, splitAt),
      english: entry.slice(splitAt + 1)
    };
  })
);

function speak(word) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "es-ES";
  window.speechSynthesis.speak(utterance);
}

export default function SpanishVocabulary() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("cards");
  const [cardIndex, setCardIndex] = useState(0);
  const [known, setKnown] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const filtered = useMemo(() => WORDS.filter(word => {
    const inCategory = category === "All" || word.category === category;
    const term = search.trim().toLowerCase();
    return inCategory && (!term || word.spanish.toLowerCase().includes(term) || word.english.toLowerCase().includes(term));
  }), [category, search]);

  const current = filtered.length ? filtered[cardIndex % filtered.length] : null;

  const quiz = useMemo(() => {
    const pool = filtered.length >= 4 ? filtered : WORDS;
    return pool.slice(0, 10).map((word, index) => {
      const others = WORDS.filter(item => item.id !== word.id && item.english !== word.english);
      const choices = [word, ...others.slice(index * 4, index * 4 + 3)];
      return { word, choices };
    });
  }, [filtered]);

  function resetQuiz() {
    setQuizIndex(0);
    setSelected(null);
    setScore(0);
    setQuizDone(false);
  }

  function answer(choice) {
    if (selected !== null || quizDone) return;
    setSelected(choice.id);
    if (choice.id === quiz[quizIndex].word.id) setScore(value => value + 1);
  }

  function nextQuestion() {
    if (quizIndex === quiz.length - 1) setQuizDone(true);
    else {
      setQuizIndex(value => value + 1);
      setSelected(null);
    }
  }

  function toggleKnown(id) {
    setKnown(list => list.includes(id) ? list.filter(item => item !== id) : [...list, id]);
  }

  return (
    <section className="sv-wrap" aria-labelledby="sv-title">
      <div className="sv-heading">
        <div>
          <span className="sv-eyebrow">TU VOCABULARIO · YOUR VOCABULARY</span>
          <h2 id="sv-title">Build your Spanish word bank.</h2>
          <p>Explore 500 useful words, practise pronunciation, and test what you remember.</p>
        </div>
        <div className="sv-total"><BookOpen size={18} /><strong>500</strong><span>WORDS</span></div>
      </div>

      <div className="sv-stats">
        <div><strong>{WORDS.length}</strong><span>Total words</span></div>
        <div><strong>{known.length}</strong><span>Marked as known</span></div>
        <div><strong>{Math.round(known.length / WORDS.length * 100)}%</strong><span>Progress</span></div>
      </div>
      <div className="sv-progress"><span style={{ width: `${known.length / WORDS.length * 100}%` }} /></div>

      <div className="sv-toolbar">
        <label className="sv-search"><Search size={17} /><input value={search} onChange={event => { setSearch(event.target.value); setCardIndex(0); }} placeholder="Search Spanish or English..." /></label>
        <div className="sv-modes">
          <button className={mode === "cards" ? "active" : ""} onClick={() => setMode("cards")}>Flashcards</button>
          <button className={mode === "list" ? "active" : ""} onClick={() => setMode("list")}>Word list</button>
          <button className={mode === "quiz" ? "active" : ""} onClick={() => { setMode("quiz"); resetQuiz(); }}>Quiz</button>
        </div>
      </div>

      <div className="sv-categories">
        <button className={category === "All" ? "active" : ""} onClick={() => { setCategory("All"); setCardIndex(0); }}>All (500)</button>
        {Object.entries(RAW).map(([name]) => (
          <button key={name} className={category === name ? "active" : ""} onClick={() => { setCategory(name); setCardIndex(0); }}>
            {name} <span>50</span>
          </button>
        ))}
      </div>
      <div className="sv-result-count">Showing {filtered.length} words</div>

      {mode === "cards" && (
        <div className="sv-flashcard-area">
          {current ? <>
            <article className="sv-flashcard">
              <div className="sv-card-top"><span>{current.category}</span><span>{String(cardIndex + 1).padStart(2, "0")} / {filtered.length}</span></div>
              <span className="sv-card-label">SPANISH</span>
              <h3>{current.spanish}</h3>
              <button className="sv-sound" onClick={() => speak(current.spanish)}><Volume2 size={17} /> Hear pronunciation</button>
              <div className="sv-card-divider" />
              <span className="sv-card-label">ENGLISH</span>
              <p>{current.english}</p>
              <button className={`sv-known ${known.includes(current.id) ? "is-known" : ""}`} onClick={() => toggleKnown(current.id)}>
                <CheckCircle2 size={17} /> {known.includes(current.id) ? "Known" : "Mark as known"}
              </button>
            </article>
            <div className="sv-card-controls">
              <button onClick={() => setCardIndex(index => (index - 1 + filtered.length) % filtered.length)} aria-label="Previous word"><ChevronLeft /></button>
              <button className="sv-shuffle" onClick={() => setCardIndex(Math.floor(Math.random() * filtered.length))}><Shuffle size={16} /> Shuffle</button>
              <button onClick={() => setCardIndex(index => (index + 1) % filtered.length)} aria-label="Next word"><ChevronRight /></button>
            </div>
          </> : <p className="sv-empty">No words match your search. Try another term or category.</p>}
        </div>
      )}

      {mode === "list" && (
        <div className="sv-word-list">
          {filtered.map(word => (
            <div className="sv-word-row" key={word.id}>
              <div><strong>{word.spanish}</strong><span>{word.english}</span></div>
              <button onClick={() => speak(word.spanish)} aria-label={`Hear ${word.spanish}`}><Volume2 size={17} /></button>
              <button className={known.includes(word.id) ? "marked" : ""} onClick={() => toggleKnown(word.id)} aria-label="Toggle known"><CheckCircle2 size={17} /></button>
            </div>
          ))}
          {filtered.length === 0 && <p className="sv-empty">No words found.</p>}
        </div>
      )}

      {mode === "quiz" && (
        <div className="sv-quiz">
          {quizDone ? (
            <div className="sv-quiz-finish"><CheckCircle2 size={32} /><h3>Quiz complete!</h3><p>You scored <strong>{score} / {quiz.length}</strong>.</p><button onClick={resetQuiz}><RotateCcw size={16} /> Try again</button></div>
          ) : (
            <>
              <div className="sv-quiz-top"><span>QUESTION {quizIndex + 1} / {quiz.length}</span><span>Score: {score}</span></div>
              <h3>What does <em>{quiz[quizIndex].word.spanish}</em> mean?</h3>
              <button className="sv-quiz-sound" onClick={() => speak(quiz[quizIndex].word.spanish)}><Volume2 size={16} /> Listen</button>
              <div className="sv-choices">
                {quiz[quizIndex].choices.map(choice => {
                  const correct = choice.id === quiz[quizIndex].word.id;
                  const chosen = selected === choice.id;
                  return <button key={choice.id} disabled={selected !== null} className={selected !== null && correct ? "correct" : chosen ? "incorrect" : ""} onClick={() => answer(choice)}>{choice.english}</button>;
                })}
              </div>
              {selected !== null && <button className="sv-next" onClick={nextQuestion}>{quizIndex === quiz.length - 1 ? "See result" : "Next question"} <ChevronRight size={16} /></button>}
            </>
          )}
        </div>
      )}
      <p className="sv-footnote"><Layers3 size={14} /> 10 categories · 50 words each · Pronunciation uses your browser's available Spanish voice.</p>
    </section>
  );
}


