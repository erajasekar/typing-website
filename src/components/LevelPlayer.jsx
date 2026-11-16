import { useEffect, useRef, useState } from 'react';
import Keyboard from './Keyboard.jsx';
import { calcAccuracy, calcWpm } from '../lib/typing.js';

export default function LevelPlayer({ level, onComplete, onExit }) {
  const text = level.text;
  const s = useRef({ index: 0, correct: 0, total: 0, start: null, done: false });
  const [view, setView] = useState({ index: 0, correct: 0, total: 0 });
  const [wrong, setWrong] = useState(null);
  const [, setClock] = useState(0);
  const box = useRef(null);
  const cur = useRef(null);
  const wrongTimer = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return; // ignores Shift, Backspace, etc.
      e.preventDefault();
      const st = s.current;
      if (st.done) return;
      st.start ??= Date.now();
      st.total++;
      if (e.key === text[st.index]) {
        st.correct++;
        st.index++;
        setWrong(null);
        if (st.index === text.length) {
          st.done = true;
          const ms = Date.now() - st.start;
          onCompleteRef.current({
            wpm: calcWpm(st.correct, ms),
            accuracy: calcAccuracy(st.correct, st.total),
            timeMs: ms,
          });
        }
      } else {
        setWrong(e.key);
        clearTimeout(wrongTimer.current);
        wrongTimer.current = setTimeout(() => setWrong(null), 350);
      }
      setView({ index: st.index, correct: st.correct, total: st.total });
    };
    window.addEventListener('keydown', onKey);
    const clock = setInterval(() => setClock((c) => c + 1), 250); // keeps live WPM ticking
    return () => {
      window.removeEventListener('keydown', onKey);
      clearInterval(clock);
      clearTimeout(wrongTimer.current);
    };
  }, [text]);

  // Keep the current character in view inside the scrolling text box.
  useEffect(() => {
    if (box.current && cur.current) box.current.scrollTop = Math.max(0, cur.current.offsetTop - box.current.clientHeight / 2);
  }, [view.index]);

  const st = s.current;
  const liveWpm = st.start ? calcWpm(st.correct, Date.now() - st.start) : 0;
  const liveAcc = calcAccuracy(view.correct, view.total);
  const pct = Math.round((view.index / text.length) * 100);

  let offset = 0;
  const words = text.split(' ').map((w, wi, all) => {
    const chars = (wi < all.length - 1 ? `${w} ` : w).split('');
    const node = (
      <span className="word" key={wi}>
        {chars.map((ch, ci) => {
          const i = offset + ci;
          const state = i < view.index ? 'done' : i === view.index ? `cur ${wrong ? 'bad' : ''}` : '';
          return (
            <span key={ci} ref={i === view.index ? cur : null} className={`ch ${state}`}>
              {ch === ' ' ? ' ' : ch}
            </span>
          );
        })}
      </span>
    );
    offset += chars.length;
    return node;
  });

  return (
    <section className="player">
      <div className="player-head">
        <button className="ghost" onClick={onExit}>← Levels</button>
        <h2>Level {level.id}: {level.title}</h2>
      </div>
      <div className="live">
        <div className="stat"><b>{liveWpm}</b><span>WPM</span></div>
        <div className="stat"><b>{liveAcc}%</b><span>Accuracy</span></div>
        <div className="stat"><b>{pct}%</b><span>Complete</span></div>
      </div>
      <div className="track" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
        <div className="track-fill" style={{ width: `${pct}%` }}><span className="car">🏎️</span></div>
      </div>
      <div className="text" ref={box} aria-label="Text to type">{words}</div>
      <p className="hint">{st.start ? ' ' : 'Start typing to start the clock!'} Need {level.minAccuracy}% accuracy to pass.</p>
      <Keyboard next={text[view.index]} wrong={wrong} />
    </section>
  );
}
