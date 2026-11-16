export default function Games({ progress, onPlay }) {
  const cards = [
    { id: 'creature', icon: '🏰', title: 'Creature Defense', blurb: 'Monsters march at your castle. Type their words to stop them!' },
    { id: 'invaders', icon: '🚀', title: 'Space Invaders Typing', blurb: 'Blast incoming aliens by typing the letters and words on their ships.' },
  ];
  return (
    <section>
      <h2 className="page-title">Arcade</h2>
      <p className="hint">Play for fun and build speed. Games don't affect your course progress.</p>
      <div className="grid">
        {cards.map((c) => {
          const best = progress.games[c.id];
          return (
            <button key={c.id} className="card tile" onClick={() => onPlay(c.id)}>
              <span className="tile-icon">{c.icon}</span>
              <strong>{c.title}</strong>
              <span>{c.blurb}</span>
              <span className="tile-meta">{best ? `Best score ${best.bestScore} · ${best.bestWpm} WPM` : 'Not played yet'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
