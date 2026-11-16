import { gameAccuracy, gameWpm } from '../lib/wordGame.js';

export function Hud({ game }) {
  return (
    <div className="hud">
      <span className="hearts" aria-label={`${game.lives} lives left`}>{'❤️'.repeat(Math.max(game.lives, 0))}{'🖤'.repeat(Math.max(game.cfg.lives - game.lives, 0))}</span>
      <span>Score <b>{game.score}</b></span>
      <span>Wave <b>{game.wave}</b></span>
      <span>WPM <b>{gameWpm(game)}</b></span>
      <span>Accuracy <b>{gameAccuracy(game)}%</b></span>
      {game.combo >= 5 && <span className="combo">🔥 x{1 + Math.floor(game.combo / 5)}</span>}
    </div>
  );
}

export function WordLabel({ entity, active }) {
  return (
    <span className={`label ${active ? 'active' : ''}`}>
      <span className="typed">{entity.word.slice(0, entity.typed)}</span>
      {entity.word.slice(entity.typed)}
    </span>
  );
}

// Overlay for the ready / game-over states.
export function Overlay({ status, title, intro, game, best, onStart, onExit }) {
  if (status === 'playing') return null;
  const over = status === 'over';
  return (
    <div className="overlay">
      <div className="card">
        <h2>{over ? 'Game over' : title}</h2>
        {over ? (
          <>
            <div className="live">
              <div className="stat"><b>{game.score}</b><span>Score</span></div>
              <div className="stat"><b>{gameWpm(game)}</b><span>WPM</span></div>
              <div className="stat"><b>{gameAccuracy(game)}%</b><span>Accuracy</span></div>
            </div>
            <p>Wave {game.wave} · {game.kills} defeated{best?.bestScore ? ` · Best score ${best.bestScore}` : ''}</p>
          </>
        ) : (
          <p>{intro}</p>
        )}
        <div className="actions">
          <button className="primary" autoFocus={!over} onClick={onStart}>{over ? 'Play again' : 'Start'}</button>
          <button className="ghost" onClick={onExit}>Back</button>
        </div>
        {!over && <p className="hint">Press Esc to drop your current target.</p>}
      </div>
    </div>
  );
}
