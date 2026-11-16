import { LEVELS } from '../data/levels.js';
import { courseStats } from '../lib/course.js';
import { formatTime } from '../lib/typing.js';

export default function Summary({ level, result, passed, progress, onRetry, onNext, onLevels, onCertificate }) {
  const last = level.id === LEVELS.at(-1).id;
  const stats = courseStats(progress.levels);
  return (
    <section className="summary card">
      <div className="flag-big">{passed ? '🏁' : '🔧'}</div>
      <h2>{passed ? `Level ${level.id} complete!` : 'Almost there — back to the pits!'}</h2>
      <div className="live">
        <div className="stat"><b>{result.wpm}</b><span>WPM</span></div>
        <div className="stat"><b>{result.accuracy}%</b><span>Accuracy</span></div>
        <div className="stat"><b>{formatTime(result.timeMs)}</b><span>Time</span></div>
      </div>
      {passed ? (
        <p>Nice driving! You beat the {level.minAccuracy}% accuracy goal.</p>
      ) : (
        <p>You need {level.minAccuracy}% accuracy to pass. Slow down a touch — accuracy first, speed follows.</p>
      )}
      {passed && stats.complete && last && (
        <div className="card inset">
          <h3>🏆 Course complete!</h3>
          <p>Average speed <b>{stats.avgWpm} WPM</b> at <b>{stats.avgAccuracy}%</b> accuracy across all {stats.total} levels.</p>
          <button className="primary" onClick={onCertificate}>Get your certificate</button>
        </div>
      )}
      <div className="actions">
        <button onClick={onRetry}>{passed ? 'Replay level' : 'Try again'}</button>
        {passed && !last && <button className="primary" onClick={onNext}>Next level →</button>}
        <button className="ghost" onClick={onLevels}>All levels</button>
      </div>
    </section>
  );
}
