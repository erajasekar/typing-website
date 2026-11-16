// Engine shared by Creature Defense and Space Invaders.
// Entities travel along a path from p=0 (spawn) to p=1 (the base). How that
// path is drawn (left-to-right vs top-to-bottom) is up to the renderer.
export const WORDS = {
  easy: ['cat', 'dog', 'sun', 'map', 'fox', 'run', 'hat', 'pen', 'bug', 'jam', 'cup', 'box', 'sky', 'ice', 'red'],
  medium: ['tiger', 'rocket', 'monster', 'bridge', 'planet', 'castle', 'dragon', 'forest', 'pirate', 'wizard', 'turbo', 'engine', 'racing', 'finish', 'speed'],
  hard: ['lightning', 'adventure', 'champion', 'mountain', 'spaceship', 'keyboard', 'explosion', 'treasure', 'victory', 'accelerate'],
  short: ['go', 'up', 'star', 'moon', 'ship', 'laser', 'comet', 'alien', 'orbit', 'blast', 'zoom', 'nova', 'mars', 'beam'],
};
const HOME = 'asdfjkl'.split('');
const TOP = 'qwertyuiop'.split('');
const ALL = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const creatureConfig = () => ({
  lanes: 5,
  lives: 5,
  killsPerWave: 6,
  speed: (w) => 0.07 * (1 + 0.1 * (w - 1)),
  spawnEvery: (w) => Math.max(1.3, 3.2 - 0.25 * (w - 1)),
  poolFor: (w) => (w <= 1 ? WORDS.easy : w <= 3 ? [...WORDS.easy, ...WORDS.medium] : w <= 6 ? WORDS.medium : [...WORDS.medium, ...WORDS.hard]),
});

export const invaderConfig = () => ({
  lanes: 5,
  lives: 5,
  killsPerWave: 8,
  speed: (w) => 0.08 * (1 + 0.08 * (w - 1)),
  spawnEvery: (w) => Math.max(1.0, 2.4 - 0.2 * (w - 1)),
  poolFor: (w) =>
    w <= 1 ? HOME : w <= 2 ? [...HOME, ...TOP] : w <= 3 ? ALL : w <= 6 ? WORDS.short : [...WORDS.short, ...WORDS.medium],
});

export function createGame(cfg) {
  return {
    cfg, entities: [], nextId: 1, target: null, spawnIn: 0.6, elapsed: 0,
    lives: cfg.lives, score: 0, kills: 0, hits: 0, misses: 0, combo: 0, wave: 1,
    over: false, lastShot: null,
  };
}

const alive = (g) => g.entities.filter((e) => !e.dying);

function pickWord(g, rng) {
  const pool = g.cfg.poolFor(g.wave);
  const used = new Set(alive(g).map((e) => e.word[0]));
  const free = pool.filter((w) => !used.has(w[0])); // keep first letters unique so targeting is unambiguous
  const choices = free.length ? free : pool;
  return choices[Math.floor(rng() * choices.length)];
}

function pickLane(g, rng) {
  const busy = new Set(alive(g).filter((e) => e.p < 0.3).map((e) => e.lane));
  const open = Array.from({ length: g.cfg.lanes }, (_, i) => i).filter((i) => !busy.has(i));
  const lanes = open.length ? open : Array.from({ length: g.cfg.lanes }, (_, i) => i);
  return lanes[Math.floor(rng() * lanes.length)];
}

export function tick(g, dt, rng = Math.random) {
  if (g.over) return;
  g.elapsed += dt;
  g.spawnIn -= dt;
  if (g.spawnIn <= 0) {
    g.entities.push({
      id: g.nextId++, word: pickWord(g, rng), typed: 0, p: 0, lane: pickLane(g, rng),
      speed: g.cfg.speed(g.wave) * (0.85 + rng() * 0.3), dying: false, ttl: 0,
    });
    g.spawnIn = g.cfg.spawnEvery(g.wave);
  }
  for (const e of g.entities) {
    if (e.dying) { e.ttl -= dt; continue; }
    e.p += e.speed * dt;
    if (e.p >= 1) {
      e.reached = true;
      g.lives -= 1;
      g.combo = 0;
      if (g.target === e.id) g.target = null;
    }
  }
  g.entities = g.entities.filter((e) => !e.reached && !(e.dying && e.ttl <= 0));
  if (g.lives <= 0) g.over = true;
}

export function cancelTarget(g) {
  const t = g.entities.find((e) => e.id === g.target);
  if (t) t.typed = 0;
  g.target = null;
}

// Handle one typed character. Returns 'hit' | 'kill' | 'miss'.
export function typeChar(g, rawCh) {
  if (g.over) return 'miss';
  const ch = rawCh.toLowerCase();
  let t = alive(g).find((e) => e.id === g.target);
  if (!t) {
    const starts = alive(g).filter((e) => e.word[0] === ch);
    t = starts.sort((a, b) => b.p - a.p)[0]; // the one closest to the base
    if (!t) { g.misses++; g.combo = 0; return 'miss'; }
    g.target = t.id;
  }
  if (t.word[t.typed] !== ch) { g.misses++; g.combo = 0; return 'miss'; }
  t.typed++;
  g.hits++;
  g.lastShot = { id: t.id, at: g.elapsed };
  if (t.typed === t.word.length) {
    t.dying = true; t.ttl = 0.35;
    g.score += t.word.length * 10 * (1 + Math.floor(g.combo / 5));
    g.combo++; g.kills++;
    g.target = null;
    g.wave = 1 + Math.floor(g.kills / g.cfg.killsPerWave);
    return 'kill';
  }
  return 'hit';
}

export const gameWpm = (g) => (g.elapsed > 1 ? Math.round(g.hits / 5 / (g.elapsed / 60)) : 0);
export const gameAccuracy = (g) => (g.hits + g.misses === 0 ? 100 : Math.round((g.hits / (g.hits + g.misses)) * 100));
