import useWordGame from './useWordGame.js';
import { Hud, Overlay, WordLabel } from './GameFrame.jsx';
import { invaderConfig, gameAccuracy, gameWpm } from '../lib/wordGame.js';

const ALIENS = ['👾', '🛸', '👽', '🤖'];
const alienTop = (p) => 10 + p * 70; // 10% (spawn, fully visible) -> 80% (ground)

export default function SpaceInvaders({ best, onResult, onExit }) {
  const { game, status, start } = useWordGame(invaderConfig, (g) =>
    onResult({ bestScore: g.score, bestWpm: gameWpm(g), accuracy: gameAccuracy(g) }),
  );
  const lanePct = (lane) => ((lane + 0.5) / game.cfg.lanes) * 100;
  const target = game.entities.find((e) => e.id === game.target && !e.dying);
  const shot = game.lastShot && game.elapsed - game.lastShot.at < 0.12 ? game.entities.find((e) => e.id === game.lastShot.id) : null;
  const aimLane = (target ?? shot)?.lane;
  const shipX = aimLane == null ? 50 : lanePct(aimLane); // ship slides under whatever it's aiming at

  return (
    <section className="game">
      <h2 className="page-title">Space Invaders Typing</h2>
      <Hud game={game} />
      <div className="arena space">
        {game.entities.map((e) => {
          const top = alienTop(e.p);
          return (
            <div key={e.id} className={`mob ${e.dying ? 'dying' : ''}`} style={{ left: `${lanePct(e.lane)}%`, top: `${top}%` }}>
              {e.dying ? '💥' : ALIENS[e.id % ALIENS.length]}
              {!e.dying && <WordLabel entity={e} active={game.target === e.id} />}
            </div>
          );
        })}
        {shot && <div className="bolt v" style={{ left: `${shipX}%`, top: `${alienTop(shot.p)}%`, height: `${86 - alienTop(shot.p)}%` }} />}
        <div className="ship" style={{ left: `${shipX}%` }} aria-hidden="true">🚀</div>
        <div className="ground" aria-hidden="true" />
        <Overlay status={status} title="Defend Earth!" game={game} best={best} onStart={start} onExit={onExit}
          intro="Aliens are descending! Type the letters or words on them to blast them out of the sky. Don't let them land!" />
      </div>
    </section>
  );
}
