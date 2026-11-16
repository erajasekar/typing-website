import useWordGame from './useWordGame.js';
import { Hud, Overlay, WordLabel } from './GameFrame.jsx';
import { creatureConfig, gameAccuracy, gameWpm } from '../lib/wordGame.js';

const CREATURES = ['👹', '🐲', '🦖', '🐙', '🧟', '👻', '🦂', '🐛'];

export default function CreatureDefense({ best, onResult, onExit }) {
  const { game, status, start } = useWordGame(creatureConfig, (g) =>
    onResult({ bestScore: g.score, bestWpm: gameWpm(g), accuracy: gameAccuracy(g) }),
  );
  const lanePct = (lane) => ((lane + 0.5) / game.cfg.lanes) * 100;
  const shot = game.lastShot && game.elapsed - game.lastShot.at < 0.12 ? game.entities.find((e) => e.id === game.lastShot.id) : null;

  return (
    <section className="game">
      <h2 className="page-title">Creature Defense</h2>
      <Hud game={game} />
      <div className="arena creatures">
        <div className="base" aria-hidden="true">🏰</div>
        {game.entities.map((e) => {
          const left = 92 - e.p * 78; // 92% (spawn) -> 14% (base)
          return (
            <div key={e.id} className={`mob ${e.dying ? 'dying' : ''}`} style={{ left: `${left}%`, top: `${lanePct(e.lane)}%` }}>
              {e.dying ? '💥' : CREATURES[e.id % CREATURES.length]}
              {!e.dying && <WordLabel entity={e} active={game.target === e.id} />}
            </div>
          );
        })}
        {shot && <div className="bolt h" style={{ top: `${lanePct(shot.lane)}%`, left: '12%', width: `${92 - shot.p * 78 - 12}%` }} />}
        <Overlay status={status} title="Defend the castle!" game={game} best={best} onStart={start} onExit={onExit}
          intro="Creatures march toward your castle. Type the word on a creature to defeat it before it arrives. Mistakes break your combo!" />
      </div>
    </section>
  );
}
