import { useMemo, useState } from "react";
import { Volume2, RotateCcw, GraduationCap, ChevronDown } from "lucide-react";
import "./SpanishVerbTrainer.css";

const pronouns = ["Yo", "Tú", "Él / Ella", "Nosotros", "Vosotros", "Ellos / Ellas"];
const verbs = [
  ["hablar","to speak","ar"],["estudiar","to study","ar"],["trabajar","to work","ar"],
  ["escuchar","to listen","ar"],["bailar","to dance","ar"],["comer","to eat","er"],
  ["beber","to drink","er"],["aprender","to learn","er"],["leer","to read","er"],
  ["vivir","to live","ir"],["escribir","to write","ir"],["abrir","to open","ir"],
  ["ser","to be (identity)","irregular"],["estar","to be (state/location)","irregular"],
  ["tener","to have","irregular"],["ir","to go","irregular"],["hacer","to do/make","irregular"],
  ["querer","to want","irregular"],["poder","to be able to","irregular"],["venir","to come","irregular"]
];
const endings = {
  present:{ar:["o","as","a","amos","áis","an"],er:["o","es","e","emos","éis","en"],ir:["o","es","e","imos","ís","en"]},
  past:{ar:["é","aste","ó","amos","asteis","aron"],er:["í","iste","ió","imos","isteis","ieron"],ir:["í","iste","ió","imos","isteis","ieron"]},
  future:["é","ás","á","emos","éis","án"]
};
const irregular = {
  ser:{present:["soy","eres","es","somos","sois","son"],past:["fui","fuiste","fue","fuimos","fuisteis","fueron"],future:["seré","serás","será","seremos","seréis","serán"]},
  estar:{present:["estoy","estás","está","estamos","estáis","están"],past:["estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron"],future:["estaré","estarás","estará","estaremos","estaréis","estarán"]},
  tener:{present:["tengo","tienes","tiene","tenemos","tenéis","tienen"],past:["tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron"],future:["tendré","tendrás","tendrá","tendremos","tendréis","tendrán"]},
  ir:{present:["voy","vas","va","vamos","vais","van"],past:["fui","fuiste","fue","fuimos","fuisteis","fueron"],future:["iré","irás","irá","iremos","iréis","irán"]},
  hacer:{present:["hago","haces","hace","hacemos","hacéis","hacen"],past:["hice","hiciste","hizo","hicimos","hicisteis","hicieron"],future:["haré","harás","hará","haremos","haréis","harán"]},
  querer:{present:["quiero","quieres","quiere","queremos","queréis","quieren"],past:["quise","quisiste","quiso","quisimos","quisisteis","quisieron"],future:["querré","querrás","querrá","querremos","querréis","querrán"]},
  poder:{present:["puedo","puedes","puede","podemos","podéis","pueden"],past:["pude","pudiste","pudo","pudimos","pudisteis","pudieron"],future:["podré","podrás","podrá","podremos","podréis","podrán"]},
  venir:{present:["vengo","vienes","viene","venimos","venís","vienen"],past:["vine","viniste","vino","vinimos","vinisteis","vinieron"],future:["vendré","vendrás","vendrá","vendremos","vendréis","vendrán"]}
};
const tenseNames = {present:"Present",past:"Past (preterite)",future:"Future"};

function getForms(verb, tense) {
  const [name,,type] = verb;
  if (irregular[name]) return irregular[name][tense];
  if (tense === "future") return endings.future.map(end => name + end);
  return endings[tense][type].map(end => name.slice(0,-2) + end);
}

export default function SpanishVerbTrainer() {
  const [verbName,setVerbName] = useState("hablar");
  const [tense,setTense] = useState("present");
  const [q,setQ] = useState(0);
  const [choice,setChoice] = useState("");
  const [checked,setChecked] = useState(false);
  const [score,setScore] = useState(0);
  const [total,setTotal] = useState(0);
  const verb = verbs.find(v => v[0] === verbName) || verbs[0];
  const forms = useMemo(() => getForms(verb,tense),[verb,tense]);
  const answer = forms[q % 6];
  const options = [...new Set([answer,forms[(q+1)%6],forms[(q+3)%6]])].sort();

  const speak = text => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  };
  const reset = () => {setQ(0);setChoice("");setChecked(false);setScore(0);setTotal(0);};
  const change = fn => value => {fn(value);reset();};

  return <section className="verb-trainer">
    <header className="verb-trainer-header">
      <div><span className="verb-eyebrow"><GraduationCap size={15}/> SPANISH GRAMMAR PRACTICE</span>
      <h2>Spanish Verb Trainer</h2><p>Learn how Spanish verbs change with the subject and tense.</p></div>
      <div className="verb-header-icon">ES</div>
    </header>
    <div className="verb-controls">
      <label className="verb-select-card">
        <span className="verb-select-label"><span className="verb-select-number">01</span> Choose a verb</span>
        <span className="verb-select-help">Select the action you want to practise</span>
        <span className="verb-select-field">
          <select value={verbName} onChange={e=>change(setVerbName)(e.target.value)}>
            {verbs.map(([name,meaning,type])=><option key={name} value={name}>{name} — {meaning}{type==="irregular"?" · irregular":""}</option>)}
          </select>
          <ChevronDown size={17} aria-hidden="true"/>
        </span>
      </label>
      <label className="verb-select-card">
        <span className="verb-select-label"><span className="verb-select-number">02</span> Choose a tense</span>
        <span className="verb-select-help">Choose when the action happens</span>
        <span className="verb-select-field">
          <select value={tense} onChange={e=>change(setTense)(e.target.value)}>
            {Object.entries(tenseNames).map(([key,label])=><option key={key} value={key}>{label}</option>)}
          </select>
          <ChevronDown size={17} aria-hidden="true"/>
        </span>
      </label>
    </div>
    <div className="verb-table-wrap">
      <div className="verb-table-title"><div><span className="verb-eyebrow">CONJUGATION TABLE</span>
        <h3>{verb[0]} <small>({verb[1]})</small></h3></div><span className="verb-tense-pill">{tenseNames[tense]}</span></div>
      <div className="verb-table">{pronouns.map((p,i)=><div className="verb-table-row" key={p}>
        <span>{p}</span><strong>{forms[i]}</strong>
        <button type="button" aria-label={`Hear ${forms[i]}`} onClick={()=>speak(forms[i])}><Volume2 size={16}/></button>
      </div>)}</div>
    </div>
    <div className="verb-quiz">
      <div className="verb-quiz-top"><span className="verb-eyebrow">PRACTICE CHECK</span><span className="verb-score">Score: {score} / {total}</span></div>
      <h3>Complete the sentence</h3>
      <p className="verb-question">{pronouns[q%6]} ______ {verbName==="hablar" ? "español." : `(${verb[1]})`}</p>
      <button className="verb-listen" type="button" onClick={()=>speak(`${pronouns[q%6]} ${answer}`)}><Volume2 size={15}/> Listen</button>
      <div className="verb-options">{options.map(option=><button key={option} type="button" disabled={checked}
        className={checked && option===answer ? "is-correct" : checked && option===choice ? "is-wrong" : choice===option ? "is-selected" : ""}
        onClick={()=>setChoice(option)}>{option}</button>)}</div>
      {checked && <p className={`verb-feedback ${choice===answer?"good":"bad"}`}>{choice===answer ? "¡Muy bien! Correct answer." : `Not quite. The correct form is “${answer}”.`}</p>}
      <div className="verb-quiz-actions">
        {checked ? <button className="verb-primary" onClick={()=>{setQ(q+1);setChoice("");setChecked(false);}}>Next question →</button>
        : <button className="verb-primary" disabled={!choice} onClick={()=>{setChecked(true);setTotal(total+1);if(choice===answer)setScore(score+1);}}>Check answer</button>}
        <button className="verb-reset" onClick={reset}><RotateCcw size={15}/> Reset</button>
      </div>
    </div>
    <p className="verb-footnote">Includes 12 regular and 8 common irregular verbs. Past tense shown is the preterite.</p>
  </section>;
}