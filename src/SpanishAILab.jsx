

import React, { useState } from "react";
import "./SpanishAILab.css";

const presets = [
  "Los gatos negros duermen",
  "Yo hablo español",
  "La casa es bonita",
  "Nosotros comemos paella",
  "Ella tiene un libro",
];

const dictionary = {
  yo: ["I", "Pronoun", "Subject"],
  tu: ["you", "Pronoun", "Subject"],
  tú: ["you", "Pronoun", "Subject"],
  el: ["the", "Article", "Masculine singular"],
  él: ["he", "Pronoun", "Subject"],
  la: ["the", "Article", "Feminine singular"],
  los: ["the", "Article", "Masculine plural"],
  las: ["the", "Article", "Feminine plural"],
  un: ["a / an", "Article", "Masculine singular"],
  una: ["a / an", "Article", "Feminine singular"],
  nosotros: ["we", "Pronoun", "Subject"],
  nosotras: ["we", "Pronoun", "Subject"],
  vosotros: ["you all", "Pronoun", "Subject"],
  vosotros: ["you all", "Pronoun", "Subject"],
  ellos: ["they", "Pronoun", "Subject"],
  ellas: ["they", "Pronoun", "Subject"],
  ella: ["she", "Pronoun", "Subject"],
  usted: ["you", "Pronoun", "Formal"],
  es: ["is", "Verb", "Ser"],
  soy: ["am", "Verb", "Ser"],
  eres: ["are", "Verb", "Ser"],
  somos: ["are", "Verb", "Ser"],
  son: ["are", "Verb", "Ser"],
  estoy: ["am", "Verb", "Estar"],
  está: ["is", "Verb", "Estar"],
  estan: ["are", "Verb", "Estar"],
  están: ["are", "Verb", "Estar"],
  hablo: ["I speak", "Verb", "Hablar"],
  hablas: ["you speak", "Verb", "Hablar"],
  habla: ["speaks", "Verb", "Hablar"],
  hablamos: ["we speak", "Verb", "Hablar"],
  hablan: ["they speak", "Verb", "Hablar"],
  tengo: ["I have", "Verb", "Tener"],
  tienes: ["you have", "Verb", "Tener"],
  tiene: ["has", "Verb", "Tener"],
  tenemos: ["we have", "Verb", "Tener"],
  tienen: ["they have", "Verb", "Tener"],
  como: ["I eat", "Verb", "Comer"],
  comes: ["you eat", "Verb", "Comer"],
  come: ["eats", "Verb", "Comer"],
  comemos: ["we eat", "Verb", "Comer"],
  comen: ["they eat", "Verb", "Comer"],
  duermen: ["they sleep", "Verb", "Dormir"],
  duerme: ["sleeps", "Verb", "Dormir"],
  libro: ["book", "Noun", "Masculine singular"],
  casa: ["house", "Noun", "Feminine singular"],
  gato: ["cat", "Noun", "Masculine singular"],
  gatos: ["cats", "Noun", "Masculine plural"],
  comida: ["food", "Noun", "Feminine singular"],
  español: ["Spanish", "Noun", "Language"],
  paella: ["paella", "Noun", "Feminine singular"],
  perro: ["dog", "Noun", "Masculine singular"],
  perros: ["dogs", "Noun", "Masculine plural"],
  bonita: ["beautiful", "Adjective", "Feminine singular"],
  bonito: ["beautiful", "Adjective", "Masculine singular"],
  negros: ["black", "Adjective", "Masculine plural"],
  negras: ["black", "Adjective", "Feminine plural"],
  negro: ["black", "Adjective", "Masculine singular"],
  roja: ["red", "Adjective", "Feminine singular"],
  rojo: ["red", "Adjective", "Masculine singular"],
  grande: ["big", "Adjective", "Singular"],
  pequeño: ["small", "Adjective", "Masculine singular"],
  pequeña: ["small", "Adjective", "Feminine singular"],
  feliz: ["happy", "Adjective", "Singular"],
};

const colors = {
  Article: "article",
  Pronoun: "pronoun",
  Noun: "noun",
  Verb: "verb",
  Adjective: "adjective",
  Unknown: "unknown",
};

function cleanWord(word) {
  return word.toLowerCase().replace(/[.,!?¿¡;:]/g, "");
}

function detectWord(word) {
  const key = cleanWord(word);

  if (dictionary[key]) {
    const [meaning, type, detail] = dictionary[key];

    return { word, meaning, type, detail };
  }

  return {
    word,
    meaning: "Not in demo dictionary",
    type: "Unknown",
    detail: "Try another example",
  };
}

function analyzeSentence(sentence) {
  const words = sentence.trim().match(/[¿¡]?[\p{L}áéíóúüñÁÉÍÓÚÜÑ]+[.,!?;:]?/gu) || [];

  return words.map(detectWord);
}

function translateSentence(sentence, tokens) {
  const known = tokens.every((token) => token.type !== "Unknown");

  const phraseTranslations = {
    "los gatos negros duermen": "The black cats sleep",
    "yo hablo español": "I speak Spanish",
    "la casa es bonita": "The house is beautiful",
    "nosotros comemos paella": "We eat paella",
    "ella tiene un libro": "She has a book",
  };

  const key = cleanWord(sentence)
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (phraseTranslations[key]) {
    return phraseTranslations[key];
  }

  if (!known) {
    return "Some words are not included in the demo dictionary.";
  }

  return tokens.map((token) => token.meaning).join(" ");
}

export default function SpanishAILab() {
  const [sentence, setSentence] = useState(presets[0]);
  const [analyzed, setAnalyzed] = useState(presets[0]);
  const [activeTab, setActiveTab] = useState("analysis");
  const [speechMessage, setSpeechMessage] = useState("");

  const tokens = analyzeSentence(analyzed);
  const translation = translateSentence(analyzed, tokens);
  const unknownCount = tokens.filter(
    (token) => token.type === "Unknown"
  ).length;

  const analyze = () => {
    if (!sentence.trim()) return;
    setAnalyzed(sentence.trim());
    setActiveTab("analysis");
    setSpeechMessage("");
  };

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      setSpeechMessage("Speech is not supported by this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(analyzed);
    utterance.lang = "es-ES";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
    setSpeechMessage("Playing Spanish pronunciation...");
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeechMessage("Speech stopped.");
    }
  };

  return (
    <section className="spanish-ai-lab" id="spanish-ai-lab">
      <div className="ai-lab-container">

        <header className="ai-lab-header">
          <div className="ai-brand">
            <div className="ai-brand-icon">✳</div>
            <div>
              <h2>ESPAÑOL<span>.AI</span></h2>
              <small>CASTILIAN LANGUAGE LAB</small>
            </div>
          </div>

          <span className="ai-live-status">
            <i /> LOCAL ENGINE ONLINE
          </span>
        </header>

        <div className="ai-hero">
          <div className="ai-eyebrow">
            SPANISH LANGUAGE INTELLIGENCE
          </div>

          <h1>
            Decoding <span>Español</span>
          </h1>

          <p>
            Discover how Spanish grammar works.
            Analyze sentences, explore word structures
            and practice your pronunciation.
          </p>
        </div>

        <div className="ai-stat-grid">
          <div className="ai-stat">
            <strong>50+</strong>
            <span>Example word forms</span>
          </div>
          <div className="ai-stat">
            <strong>5</strong>
            <span>Practice sentences</span>
          </div>
          <div className="ai-stat">
            <strong>ES</strong>
            <span>Spanish language</span>
          </div>
          <div className="ai-stat">
            <strong>LIVE</strong>
            <span>Grammar analysis</span>
          </div>
        </div>

        <div className="ai-section-heading">
          <span>01 // LIVE LANGUAGE DEMO</span>
          <h2>Interactive Spanish Parser</h2>
          <p>
            Enter a sentence or choose a preset to
            explore its grammatical structure.
          </p>
        </div>

        <div className="ai-workspace">

          <div className="ai-presets">
            <span>⚡ PRESETS</span>
            {presets.map((item, index) => (
              <button
                key={item}
                className={sentence === item ? "preset-active" : ""}
                onClick={() => {
                  setSentence(item);
                  setAnalyzed(item);
                  setActiveTab("analysis");
                }}
              >
                {index + 1}. {item}
              </button>
            ))}
          </div>

          <div className="ai-input-row">
            <input
              value={sentence}
              onChange={(event) => setSentence(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") analyze();
              }}
              placeholder="Escribe una frase en español..."
              aria-label="Spanish sentence"
              maxLength={200}
            />

            <button onClick={analyze} className="ai-analyze-button">
              ANALYZE →
            </button>
          </div>

          <div className="ai-actions">
            <button onClick={speak}>🔊 SPEAK SPANISH</button>
            <button onClick={stopSpeech} className="ai-stop-button">
              ■ STOP
            </button>
            <span>{speechMessage}</span>
          </div>

          <div className="ai-tabs">
            <button
              className={activeTab === "analysis" ? "tab-active" : ""}
              onClick={() => setActiveTab("analysis")}
            >
              WORD ANALYSIS
            </button>
            <button
              className={activeTab === "translation" ? "tab-active" : ""}
              onClick={() => setActiveTab("translation")}
            >
              TRANSLATION
            </button>
          </div>

          {activeTab === "analysis" ? (
            <div className="ai-results">
              <div className="ai-token-panel">
                <div className="ai-panel-top">
                  <span>LIVE TOKENIZATION & POS TAGGING</span>
                  <strong>{tokens.length} WORDS</strong>
                </div>

                <div className="ai-token-grid">
                  {tokens.map((token, index) => (
                    <div
                      key={`${token.word}-${index}`}
                      className={`ai-token ${colors[token.type]}`}
                    >
                      <strong>{token.word}</strong>
                      <span>{token.type}</span>
                      <small>{token.detail}</small>
                    </div>
                  ))}
                </div>

                <div className="ai-legend">
                  <span>● Article</span>
                  <span>● Pronoun</span>
                  <span>● Noun</span>
                  <span>● Verb</span>
                  <span>● Adjective</span>
                </div>
              </div>

              <aside className="ai-diagnostic">
                <span className="diagnostic-label">
                  ✳ GRAMMAR DIAGNOSTIC
                </span>

                <h3>
                  {unknownCount === 0
                    ? "Sentence analyzed"
                    : "Partial analysis"}
                </h3>

                <p>
                  {unknownCount === 0
                    ? `All ${tokens.length} words were recognized in the local demo dictionary.`
                    : `${unknownCount} word(s) were not recognized. Try one of the example sentences.`}
                </p>

                <div className="diagnostic-divider" />

                <span className="diagnostic-label">
                  WORD COUNT
                </span>
                <strong>{tokens.length}</strong>

                <span className="diagnostic-label">
                  DETECTED CATEGORIES
                </span>
                <strong>
                  {new Set(tokens.map((token) => token.type)).size}
                </strong>

                <span className="diagnostic-note">
                  Demo grammar engine. Results are
                  dictionary-based, not AI-generated.
                </span>
              </aside>
            </div>
          ) : (
            <div className="ai-translation-panel">
              <span>ENGLISH TRANSLATION</span>
              <h3>{translation}</h3>
              <p>Original sentence</p>
              <strong>{analyzed}</strong>
            </div>
          )}
        </div>

        <footer className="ai-lab-footer">
          <span>ESPAÑOL.AI // LEARNING MODULE</span>
          <span>MADE FOR ¡VIVA ESPAÑA! 🇪🇸</span>
        </footer>

      </div>
    </section>
  );
}
