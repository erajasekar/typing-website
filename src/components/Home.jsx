import { courseStats } from '../lib/course.js';

export default function Home({ progress, onLearn, onGames }) {
  const s = courseStats(progress.levels);
  return (
    <section>
      <div className="hero">
        <h2>Start your engines.</h2>
        <p>Learn to type faster with a guided course, then race through the arcade.</p>
      </div>
      <div className="grid">
        <button className="card tile" onClick={onLearn}>
          <span className="tile-icon">⌨️</span>
          <strong>Learn to Type</strong>
          <span>8 levels from the home row to full paragraphs, with live WPM and accuracy. Finish to earn a certificate.</span>
          <span className="tile-meta">{s.completed === 0 ? 'Ready to start' : `${s.completed}/${s.total} levels · ${s.avgWpm} avg WPM`}</span>
        </button>
        <button className="card tile" onClick={onGames}>
          <span className="tile-icon">🎮</span>
          <strong>Arcade Games</strong>
          <span>Creature Defense and Space Invaders Typing. Perfect for kids and a quick speed boost.</span>
          <span className="tile-meta">2 games</span>
        </button>
      </div>
    </section>
  );
}
