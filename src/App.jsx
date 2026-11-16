import { useEffect, useState } from 'react';
import { LEVELS } from './data/levels.js';
import { loadProgress, saveProgress, defaultProgress } from './lib/storage.js';
import { applyLevelResult } from './lib/course.js';
import Home from './components/Home.jsx';
import Learn from './components/Learn.jsx';
import LevelPlayer from './components/LevelPlayer.jsx';
import Summary from './components/Summary.jsx';
import Certificate from './components/Certificate.jsx';
import Games from './components/Games.jsx';
import CreatureDefense from './components/CreatureDefense.jsx';
import SpaceInvaders from './components/SpaceInvaders.jsx';
import Settings from './components/Settings.jsx';

const NAV = [
  ['learn', 'Learn'],
  ['games', 'Games'],
  ['settings', 'Settings'],
];
const SECTION = { level: 'learn', summary: 'learn', certificate: 'learn', creature: 'games', invaders: 'games' };

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState({ name: 'home' });
  const go = (name, extra) => setScreen({ name, ...extra });

  useEffect(() => saveProgress(progress), [progress]);
  useEffect(() => {
    document.documentElement.dataset.theme = progress.settings.racing ? 'racing' : 'plain';
  }, [progress.settings.racing]);

  const section = SECTION[screen.name] ?? screen.name;

  const finishLevel = (level, result) => {
    const { progress: next, passed } = applyLevelResult(progress, level, result);
    setProgress(next);
    go('summary', { level, result, passed, progress: next });
  };
  const recordGame = (id, r) =>
    setProgress((p) => {
      const prev = p.games[id];
      return {
        ...p,
        games: { ...p.games, [id]: { bestScore: Math.max(prev?.bestScore ?? 0, r.bestScore), bestWpm: Math.max(prev?.bestWpm ?? 0, r.bestWpm) } },
      };
    });
  const updateSettings = (patch) => setProgress((p) => ({ ...p, settings: { ...p.settings, ...patch } }));

  return (
    <>
      <header className="top no-print">
        <button className="logo" onClick={() => go('home')}>Turbo<span>Type</span></button>
        <nav aria-label="Main">
          {NAV.map(([name, label]) => (
            <button key={name} className={section === name ? 'active' : ''} aria-current={section === name ? 'page' : undefined} onClick={() => go(name)}>
              {label}
            </button>
          ))}
        </nav>
      </header>
      <div className="checkered no-print" aria-hidden="true" />
      <main className="page">
        {screen.name === 'home' && <Home progress={progress} onLearn={() => go('learn')} onGames={() => go('games')} />}
        {screen.name === 'learn' && <Learn progress={progress} onPlay={(level) => go('level', { level })} onCertificate={() => go('certificate')} />}
        {screen.name === 'level' && (
          <LevelPlayer key={`${screen.level.id}-${screen.attempt ?? 0}`} level={screen.level} onComplete={(r) => finishLevel(screen.level, r)} onExit={() => go('learn')} />
        )}
        {screen.name === 'summary' && (
          <Summary
            level={screen.level} result={screen.result} passed={screen.passed} progress={screen.progress}
            onRetry={() => go('level', { level: screen.level, attempt: Date.now() })}
            onNext={() => go('level', { level: LEVELS.find((l) => l.id === screen.level.id + 1) })}
            onLevels={() => go('learn')} onCertificate={() => go('certificate')}
          />
        )}
        {screen.name === 'certificate' && <Certificate progress={progress} onName={(name) => updateSettings({ name })} onBack={() => go('learn')} />}
        {screen.name === 'games' && <Games progress={progress} onPlay={(id) => go(id)} />}
        {screen.name === 'creature' && <CreatureDefense best={progress.games.creature} onResult={(r) => recordGame('creature', r)} onExit={() => go('games')} />}
        {screen.name === 'invaders' && <SpaceInvaders best={progress.games.invaders} onResult={(r) => recordGame('invaders', r)} onExit={() => go('games')} />}
        {screen.name === 'settings' && (
          <Settings settings={progress.settings} onChange={updateSettings} onReset={() => { setProgress(defaultProgress()); go('home'); }} />
        )}
      </main>
    </>
  );
}
