// SequenceAndSeries.jsx
import React, { useState, useEffect } from 'react';
import './SequenceAndSeries.css';

const SequenceAndSeries = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="seq-wrapper">
      <h1 className="page-title">Maths Fun: Sequence & Series</h1>
      <div className="tab-nav">
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</button>
        <button className={activeTab === 'tools' ? 'active' : ''} onClick={() => setActiveTab('tools')}>Tools</button>
        <button className={activeTab === 'games' ? 'active' : ''} onClick={() => setActiveTab('games')}>Games</button>
      </div>

      {activeTab === 'home' && <HomeSection />}
      {activeTab === 'tools' && <ToolsSection />}
      {activeTab === 'games' && <GamesSection />}
    </div>
  );
};

const HomeSection = () => (
  <section className="tab-section">
    <h2>Welcome to the Sequence & Series Explorer!</h2>
    <p className="intro">Dive into the fascinating world of numbers and patterns with our interactive tools and games.</p>
    <div className="card-grid">
      {[
        { title: "What is a Sequence?", color: "purple", content: "A sequence is an ordered list of numbers.", example: "2, 4, 6, 8..." },
        { title: "What is a Series?", color: "green", content: "A series is the sum of the terms of a sequence.", example: "2 + 4 + 6 + 8 + ..." },
        { title: "Arithmetic Sequence (AS)", color: "orange", content: "Tn = a + (n-1)d", example: "3, 5, 7, 9... (d=2)" },
        { title: "Geometric Sequence (GS)", color: "teal", content: "Tn = ar^(n-1)", example: "2, 6, 18, 54... (r=3)" }
      ].map((card, index) => (
        <div className={`info-card ${card.color}`} key={index}>
          <h3>{card.title}</h3>
          <p>{card.content}</p>
          <p className="example">Example: {card.example}</p>
        </div>
      ))}
    </div>
  </section>
);

const ToolsSection = () => (
  <section className="tab-section">
    <h2>Sequence & Series Tools</h2>
    <p className="intro">Calculate terms, sums, generate sequences, identify patterns, and visualize them!</p>
    <div className="tool-grid">
      <SequenceIdentifier />
      <UniversalCalculator />
      <ArithmeticCalculator />
      <GeometricCalculator />
    </div>
  </section>
);

const GamesSection = () => (
  <section className="tab-section">
    <h2>Fun with Sequences & Series!</h2>
    <p className="intro">Test your knowledge and speed with these engaging games.</p>
    <div className="tool-grid">
      <TypingGame />
      <RuleGuessGame />
      <SequenceHunter />
      <SequenceBuilder />
      <SeriesSumChallenge />
    </div>
  </section>
);

// --- TOOL: Sequence Identifier ---
const SequenceIdentifier = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const identify = () => {
    const terms = input.split(',').map(Number);
    if (terms.length < 3 || terms.some(isNaN)) return setResult('Please enter valid numbers.');
    const d = terms[1] - terms[0];
    const r = terms[1] / terms[0];
    const isAP = terms.every((val, i, arr) => i === 0 || val - arr[i - 1] === d);
    const isGP = terms.every((val, i, arr) => i === 0 || arr[i - 1] !== 0 && val / arr[i - 1] === r);
    setResult(isAP ? 'Arithmetic Sequence' : isGP ? 'Geometric Sequence' : 'Neither');
  };

  return (
    <div className="tool-card">
      <h3>Sequence Identifier</h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 2, 4, 6, 8" />
      <button onClick={identify}>Identify</button>
      <div className="result">{result}</div>
    </div>
  );
};

// --- TOOL: Universal Calculator ---
const UniversalCalculator = () => {
  const [a, setA] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [tn, setTn] = useState('');
  const [sn, setSn] = useState('');

  const solve = () => {
    const fa = parseFloat(a);
    const fd = parseFloat(d);
    const fn = parseFloat(n);
    if (!isNaN(fa) && !isNaN(fd) && !isNaN(fn)) {
      setTn(fa + (fn - 1) * fd);
      setSn((fn / 2) * (2 * fa + (fn - 1) * fd));
    } else {
      setTn('?');
      setSn('?');
    }
  };

  return (
    <div className="tool-card">
      <h3>Universal Calculator</h3>
      <input placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
      <input placeholder="d/r" value={d} onChange={(e) => setD(e.target.value)} />
      <input placeholder="n" value={n} onChange={(e) => setN(e.target.value)} />
      <button onClick={solve}>Solve</button>
      <div className="result">Tn: {tn} | Sn: {sn}</div>
    </div>
  );
};

// --- TOOL: Arithmetic Calculator ---
const ArithmeticCalculator = () => {
  const [a, setA] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const fa = parseFloat(a);
    const fd = parseFloat(d);
    const fn = parseFloat(n);
    if (!isNaN(fa) && !isNaN(fd) && !isNaN(fn)) {
      const tn = fa + (fn - 1) * fd;
      const sn = (fn / 2) * (2 * fa + (fn - 1) * fd);
      setResult({ tn, sn });
    }
  };

  return (
    <div className="tool-card">
      <h3>Arithmetic Calculator</h3>
      <input placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
      <input placeholder="d" value={d} onChange={(e) => setD(e.target.value)} />
      <input placeholder="n" value={n} onChange={(e) => setN(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <div className="result">Tn: {result.tn}, Sn: {result.sn}</div>}
    </div>
  );
};

// --- TOOL: Geometric Calculator ---
const GeometricCalculator = () => {
  const [a, setA] = useState('');
  const [r, setR] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const fa = parseFloat(a);
    const fr = parseFloat(r);
    const fn = parseFloat(n);
    if (!isNaN(fa) && !isNaN(fr) && !isNaN(fn)) {
      const tn = fa * Math.pow(fr, fn - 1);
      const sn = fr === 1 ? fa * fn : fa * (Math.pow(fr, fn) - 1) / (fr - 1);
      setResult({ tn, sn });
    }
  };

  return (
    <div className="tool-card">
      <h3>Geometric Calculator</h3>
      <input placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
      <input placeholder="r" value={r} onChange={(e) => setR(e.target.value)} />
      <input placeholder="n" value={n} onChange={(e) => setN(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <div className="result">Tn: {result.tn.toFixed(2)}, Sn: {result.sn.toFixed(2)}</div>}
    </div>
  );
};

// --- GAMES (Placeholders) ---
// --- GAME: Typing Game ---
const TypingGame = () => {
  const sequences = [
    { terms: [2, 4, 6, 8], answer: 10 },
    { terms: [3, 6, 12], answer: 24 },
    { terms: [1, 4, 9, 16], answer: 25 },
  ];
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const checkAnswer = () => {
    if (parseInt(input) === sequences[current].answer) {
      setMessage('Correct! 🎉');
      setCurrent((prev) => (prev + 1) % sequences.length);
    } else {
      setMessage('Try again ❌');
    }
    setInput('');
  };

  return (
    <div className="tool-card">
      <h3>Typing Game</h3>
      <p>{sequences[current].terms.join(', ')}, ?</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={checkAnswer}>Check</button>
      <div className="result">{message}</div>
    </div>
  );
};

// --- GAME: Rule Guess Game ---
const RuleGuessGame = () => {
  const options = [
    { seq: [1, 3, 5, 7], rule: 'AP with d=2', correct: true },
    { seq: [2, 6, 18], rule: 'AP with d=2', correct: false },
    { seq: [3, 9, 27], rule: 'GP with r=3', correct: true },
  ];
  const [idx, setIdx] = useState(0);
  const [msg, setMsg] = useState('');

  const handleClick = (correct) => {
    setMsg(correct ? 'Correct rule! ✅' : 'Wrong rule ❌');
    setTimeout(() => {
      setIdx((i) => (i + 1) % options.length);
      setMsg('');
    }, 1000);
  };

  return (
    <div className="tool-card">
      <h3>Guess the Rule</h3>
      <p>Sequence: {options[idx].seq.join(', ')}</p>
      <button onClick={() => handleClick(true)}>AP with d=2</button>
      <button onClick={() => handleClick(false)}>GP with r=2</button>
      <button onClick={() => handleClick(options[idx].correct)}>GP with r=3</button>
      <div className="result">{msg}</div>
    </div>
  );
};

// --- GAME: Sequence Hunter ---
const SequenceHunter = () => {
  const grid = Array.from({ length: 20 }, (_, i) => i + 1);
  const sequence = [2, 4, 6, 8, 10];
  const [found, setFound] = useState([]);

  const toggle = (num) => {
    if (sequence.includes(num)) {
      setFound((prev) => [...new Set([...prev, num])]);
    }
  };

  return (
    <div className="tool-card">
      <h3>Sequence Hunter</h3>
      <div className="grid">
        {grid.map((n) => (
          <button key={n} className={found.includes(n) ? 'found' : ''} onClick={() => toggle(n)}>{n}</button>
        ))}
      </div>
      <p className="result">Found: {found.join(', ')}</p>
    </div>
  );
};

// --- GAME: Sequence Builder ---
const SequenceBuilder = () => {
  const target = 24;
  const [a, setA] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [msg, setMsg] = useState('');

  const check = () => {
    const fa = parseFloat(a);
    const fd = parseFloat(d);
    const fn = parseFloat(n);
    if (fa + (fn - 1) * fd === target) setMsg('Matched! 🎯');
    else setMsg('Not matching 😓');
  };

  return (
    <div className="tool-card">
      <h3>Sequence Builder</h3>
      <p>Target Tₙ = 24</p>
      <input placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
      <input placeholder="d" value={d} onChange={(e) => setD(e.target.value)} />
      <input placeholder="n" value={n} onChange={(e) => setN(e.target.value)} />
      <button onClick={check}>Try</button>
      <p className="result">{msg}</p>
    </div>
  );
};

// --- GAME: Series Sum Challenge ---
const SeriesSumChallenge = () => {
  const [a, setA] = useState('2');
  const [n, setN] = useState('5');
  const [ans, setAns] = useState(null);

  const calc = () => {
    const fa = parseFloat(a);
    const fn = parseFloat(n);
    const sum = (fn / 2) * (2 * fa + (fn - 1) * fa);
    setAns(sum);
  };

  return (
    <div className="tool-card">
      <h3>Series Sum Challenge</h3>
      <input placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
      <input placeholder="n" value={n} onChange={(e) => setN(e.target.value)} />
      <button onClick={calc}>Find Sum</button>
      {ans && <p className="result">Sum: {ans}</p>}
    </div>
  );
};

export default SequenceAndSeries;
