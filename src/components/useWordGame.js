import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { createGame, tick, typeChar, cancelTarget } from '../lib/wordGame.js';

// Runs the game loop and keyboard handling for a word-shooter game.
export default function useWordGame(makeConfig, onOver) {
  const gameRef = useRef(createGame(makeConfig()));
  const [status, setStatus] = useState('ready'); // ready | playing | over
  const [, redraw] = useReducer((n) => n + 1, 0);
  const onOverRef = useRef(onOver);
  onOverRef.current = onOver;

  const start = useCallback(() => {
    gameRef.current = createGame(makeConfig());
    setStatus('playing');
  }, [makeConfig]);

  useEffect(() => {
    if (status !== 'playing') return undefined;
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1); // clamp so a hidden tab can't skip ahead
      last = now;
      tick(gameRef.current, dt);
      redraw();
      if (gameRef.current.over) {
        setStatus('over');
        onOverRef.current?.(gameRef.current);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Escape') { cancelTarget(gameRef.current); return; }
      if (e.key.length !== 1) return;
      e.preventDefault();
      typeChar(gameRef.current, e.key);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [status]);

  return { game: gameRef.current, status, start };
}
