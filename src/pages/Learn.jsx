import SpanishVerbTrainer from "../SpanishVerbTrainer";
import SpanishVocabulary from "../SpanishVocabulary";
import { useState } from "react";
import { CheckCircle2, RotateCcw, Volume2, Languages, BookOpen, Brain, MessageCircle, ArrowDown, Sparkles, GraduationCap } from "lucide-react";

const words=[["Hola","Hello"],["Buenos días","Good morning"],["Por favor","Please"],["Gracias","Thank you"],["¿Cómo estás?","How are you?"],["Me llamo…","My name is…"],["¿Dónde está…?","Where is…?"],["Hasta luego","See you later"],["Por supuesto","Of course"],["¡Buen viaje!","Have a good trip!"]];
const questions=[{q:"What does “Gracias” mean?",opts:["Please","Thank you","Goodbye"],a:1,why:"Gracias means “Thank you”."},{q:"How do you say “Hello”?",opts:["Hola","Adiós","Perdón"],a:0,why:"Hola is the everyday Spanish greeting for “Hello”."},{q:"What does “Buenos días” mean?",opts:["Good night","Good afternoon","Good morning"],a:2,why:"Buenos días means “Good morning”."},{q:"How do you say “Please”?",opts:["Gracias","Por favor","Hasta luego"],a:1,why:"Por favor means “Please”."},{q:"What does “Me llamo…” mean?",opts:["I live…","I am…","My name is…"],a:2,why:"Me llamo… is used to introduce your name."}];


export default function Learn(){
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const score=questions.filter((q,i)=>answers[i]===q.a).length;
  const say=word=>{if("speechSynthesis" in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang="es-ES";window.speechSynthesis.speak(u);}};
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
  return <main className="page-shell container learn-page">
    <section className="learn-hero">
      <div className="learn-hero-copy">
        <span className="learn-hero-kicker"><Sparkles size={14}/> TU AVENTURA EMPIEZA AQUÍ · YOUR JOURNEY STARTS HERE</span>
        <h1>Learn Spanish.<br/><em>One little step at a time.</em></h1>
        <p>Build confidence with everyday phrases, 500 useful words, clear verb practice and quick quizzes — all in one place.</p>
        <div className="learn-hero-actions">
          <button className="learn-start-button" onClick={()=>scrollTo("learn-phrasebook")}>Start learning <ArrowDown size={16}/></button>
          <span><span className="learn-flag">🇪🇸</span> Beginner-friendly · Learn at your pace</span>
        </div>
      </div>
      <div className="learn-hero-card">
        <span className="learn-hero-card-label">YOUR SPANISH TOOLKIT</span>
        <div className="learn-toolkit-stat"><BookOpen/><span><strong>500</strong><small>useful words</small></span></div>
        <div className="learn-toolkit-stat"><GraduationCap/><span><strong>20</strong><small>verbs to practise</small></span></div>
        <div className="learn-toolkit-stat"><Brain/><span><strong>3</strong><small>ways to learn vocabulary</small></span></div>
        <div className="learn-hero-card-foot">ESPAÑOL · ENGLISH · PRONUNCIATION</div>
      </div>
      <div className="learn-hero-watermark" aria-hidden="true">¡</div>
    </section>

    <nav className="learn-path" aria-label="Learning sections">
      <button onClick={()=>scrollTo("learn-phrasebook")}><span>01</span><MessageCircle/> Everyday phrases</button>
      <button onClick={()=>scrollTo("learn-vocabulary")}><span>02</span><BookOpen/> Vocabulary</button>
      <button onClick={()=>scrollTo("learn-verbs")}><span>03</span><GraduationCap/> Verb trainer</button>
    </nav>

    <section className="learn-section-block" id="learn-phrasebook">
      <div className="learn-section-heading">
        <div><span className="eyebrow">01 · START WITH THE BASICS</span><h2>Say your first Spanish words.</h2><p>Useful expressions for greetings, introductions and everyday conversations.</p></div>
        <span className="learn-section-count">10 ESSENTIAL PHRASES</span>
      </div>
      <div className="learn-phrase-grid">{words.map(([es,en],i)=><article className="learn-phrase-card" key={es}>
        <span className="learn-phrase-number">{String(i+1).padStart(2,"0")}</span>
        <button className="learn-phrase-sound" onClick={()=>say(es)} aria-label={`Hear ${es}`}><Volume2 size={16}/></button>
        <h3>{es}</h3><p>{en}</p>
      </article>)}</div>
      <p className="small-note"><Volume2 size={14}/> Select the speaker icon to hear Spanish pronunciation, if your browser supports speech.</p>
    </section>

    <section className="quiz-panel learn-mini-quiz">
      <div className="quiz-heading"><div className="quiz-icon"><Languages/></div><div><span className="eyebrow">QUICK KNOWLEDGE CHECK</span><h2>Can you remember these?</h2><p>Five short questions to check your first phrases.</p></div></div>
      <div className="quiz-questions">{questions.map((q,i)=><div className="quiz-question" key={q.q}><span className="quiz-q-number">QUESTION 0{i+1}</span><h3>{q.q}</h3><div className="quiz-options">{q.opts.map((o,j)=><button key={o} disabled={submitted} onClick={()=>setAnswers({...answers,[i]:j})} className={answers[i]===j?"selected":""}>{String.fromCharCode(65+j)}. &nbsp;{o}</button>)}</div>{submitted&&<p className={answers[i]===q.a?"answer-correct":"answer-wrong"}>{answers[i]===q.a?"Correct! ":"Not quite. "}{q.why}</p>}</div>)}</div>
      <div className="quiz-footer">{submitted?<><div className="quiz-score"><CheckCircle2/> You scored <b>{score} / 5</b></div><button className="button button-primary" onClick={()=>{setAnswers({});setSubmitted(false);}}><RotateCcw size={16}/> Try again</button></>:<button className="button button-primary" disabled={Object.keys(answers).length!==5} onClick={()=>setSubmitted(true)}>Check my answers</button>}</div>
    </section>

    <div className="learn-tool-heading" id="learn-vocabulary"><span className="eyebrow">02 · GROW YOUR WORD BANK</span><h2>Make new words part of your day.</h2><p>Search by Spanish or English, listen to pronunciation, use flashcards, mark familiar words and test your memory.</p></div>
    <SpanishVocabulary/>

    <div className="learn-tool-heading verb-tool-heading" id="learn-verbs"><span className="eyebrow">03 · BUILD YOUR GRAMMAR</span><h2>Turn words into sentences.</h2><p>Explore regular and irregular verbs in the present, preterite and future. Listen to each form and practise with a quiz.</p></div>
    <SpanishVerbTrainer/>
    <div className="learn-finish-note"><span>¡POCO A POCO!</span><p>Small, regular practice is a great way to build a new language habit.</p></div>
  </main>;
}