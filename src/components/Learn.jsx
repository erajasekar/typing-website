import { LEVELS } from '../data/levels.js';
import { courseStats, isUnlocked } from '../lib/course.js';

export default function Learn({ progress, onPlay, onCertificate }) {
  const stats = courseStats(progress.levels);
  return (
    <section>
      <h2 className="page-title">The Course</h2>
      <div className="card course-card">
        <div className="live">
          <div className="stat"><b>{stats.completed}/{stats.total}</b><span>Levels done</span></div>
          <div className="stat"><b>{stats.avgWpm}</b><span>Avg WPM</span></div>
          <div className="stat"><b>{stats.avgAccuracy}%</b><span>Avg accuracy</span></div>
        </div>
        {stats.complete ? (
          <button className="primary" onClick={onCertificate}>🏆 Get your certificate</button>
        ) : (
          <p className="hint">Finish every level to earn your certificate.</p>
        )}
      </div>
      <ol className="levels">
        {LEVELS.map((l) => {
          const done = progress.levels[l.id];
          const open = isUnlocked(progress.levels, l);
          return (
            <li key={l.id}>
              <button className={`level ${done ? 'done' : ''}`} disabled={!open} onClick={() => onPlay(l)}>
                <span className="level-num">{done ? '🏁' : open ? l.id : '🔒'}</span>
                <span className="level-body">
                  <strong>{l.title}</strong>
                  <span>{l.blurb}</span>
                </span>
                <span className="level-result">
                  {done ? `${done.wpm} WPM · ${done.accuracy}%` : open ? `Pass: ${l.minAccuracy}%+` : 'Locked'}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
