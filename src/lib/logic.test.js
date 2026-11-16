import { describe, it, expect } from 'vitest';
import { LEVELS } from '../data/levels.js';
import { describeChar, ROWS } from '../data/keyboard.js';
import { calcWpm, calcAccuracy } from './typing.js';
import { courseStats, applyLevelResult, isUnlocked } from './course.js';
import { defaultProgress } from './storage.js';
import { certificateSvg } from './certificate.js';
import { createGame, tick, typeChar, creatureConfig, invaderConfig, cancelTarget } from './wordGame.js';

const seq = (vals) => { let i = 0; return () => vals[i++ % vals.length]; };

describe('levels', () => {
  const lower = 'asdfghjkl;\' ';
  const allowed = [
    lower,
    lower + 'qwertyuiop',
    lower + 'qwertyuiop' + 'zxcvbnm,.',
    null, // level 4 adds capitals
    null, null, null, null,
  ];
  it('every character is typeable on the on-screen keyboard', () => {
    for (const l of LEVELS) for (const ch of l.text) expect(describeChar(ch), `L${l.id} "${ch}"`).not.toBeNull();
  });
  it('early levels only use the keys taught so far', () => {
    for (const [i, set] of allowed.entries()) {
      if (!set) continue;
      for (const ch of LEVELS[i].text) expect(set, `L${i + 1} "${ch}"`).toContain(ch);
    }
  });
  it('level 4+ introduce capitals, numbers and punctuation in order', () => {
    expect(/[A-Z]/.test(LEVELS[3].text)).toBe(true);
    expect(/[0-9]/.test(LEVELS[4].text)).toBe(true);
    expect(/[?!]/.test(LEVELS[5].text)).toBe(true);
  });
  it('get progressively longer and stricter', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i].minAccuracy).toBeGreaterThanOrEqual(LEVELS[i - 1].minAccuracy);
    }
    expect(LEVELS.at(-1).text.length).toBeGreaterThan(LEVELS[0].text.length * 2);
  });
  it('keyboard rows cover all home-row keys', () => {
    expect(ROWS.flat()).toEqual(expect.arrayContaining('asdfghjkl;'.split('')));
  });
});

describe('describeChar', () => {
  it('maps capitals and symbols to key + opposite-hand shift', () => {
    expect(describeChar('A')).toMatchObject({ key: 'a', shift: 'right' });
    expect(describeChar('J')).toMatchObject({ key: 'j', shift: 'left' });
    expect(describeChar('?')).toMatchObject({ key: '/', shift: 'left' });
    expect(describeChar('!')).toMatchObject({ key: '1', shift: 'right' });
    expect(describeChar('a').shift).toBeNull();
    expect(describeChar(' ').key).toBe(' ');
    expect(describeChar('~')).toBeNull();
  });
});

describe('metrics', () => {
  it('computes WPM with 5 chars per word', () => {
    expect(calcWpm(250, 60000)).toBe(50);
    expect(calcWpm(0, 5000)).toBe(0);
  });
  it('computes accuracy', () => {
    expect(calcAccuracy(90, 100)).toBe(90);
    expect(calcAccuracy(0, 0)).toBe(100);
  });
});

describe('course progress', () => {
  it('failing attempts do not count; passing ones do', () => {
    const p = defaultProgress();
    const fail = applyLevelResult(p, LEVELS[0], { wpm: 30, accuracy: 50 });
    expect(fail.passed).toBe(false);
    expect(fail.progress.levels[1]).toBeUndefined();
    const ok = applyLevelResult(p, LEVELS[0], { wpm: 30, accuracy: 95 });
    expect(ok.passed).toBe(true);
    expect(ok.progress.levels[1].wpm).toBe(30);
  });
  it('levels unlock in order', () => {
    const p = defaultProgress();
    expect(isUnlocked(p.levels, LEVELS[0])).toBe(true);
    expect(isUnlocked(p.levels, LEVELS[1])).toBe(false);
    const after = applyLevelResult(p, LEVELS[0], { wpm: 20, accuracy: 100 }).progress;
    expect(isUnlocked(after.levels, LEVELS[1])).toBe(true);
  });
  it('averages WPM and accuracy across the course and stamps completion', () => {
    let p = defaultProgress();
    LEVELS.forEach((l, i) => { p = applyLevelResult(p, l, { wpm: 20 + i * 10, accuracy: 94 + (i % 2) * 2 }, '2026-01-02').progress; });
    const s = courseStats(p.levels);
    expect(s.complete).toBe(true);
    expect(s.avgWpm).toBe(Math.round((20 + 30 + 40 + 50 + 60 + 70 + 80 + 90) / 8));
    expect(p.completedAt).toBe('2026-01-02');
  });
  it('keeps the fastest passing attempt', () => {
    let p = applyLevelResult(defaultProgress(), LEVELS[0], { wpm: 40, accuracy: 95 }).progress;
    p = applyLevelResult(p, LEVELS[0], { wpm: 25, accuracy: 99 }).progress;
    expect(p.levels[1]).toMatchObject({ wpm: 40, accuracy: 95, attempts: 2 });
  });
});

describe('certificate', () => {
  it('escapes the learner name', () => {
    const svg = certificateSvg({ name: '<script>alert(1)</script>', date: '2026-01-02', avgWpm: 40, avgAccuracy: 95, levels: 8 });
    expect(svg).not.toContain('<script>');
    expect(svg).toContain('&lt;script&gt;');
    expect(svg).toContain('January 2, 2026');
  });
});

describe('word game engine', () => {
  const rng = seq([0.1, 0.5, 0.9]);
  it('spawns, targets by first letter, and kills a word', () => {
    const g = createGame(creatureConfig());
    tick(g, 1, rng);
    expect(g.entities).toHaveLength(1);
    const word = g.entities[0].word;
    for (let i = 0; i < word.length - 1; i++) expect(typeChar(g, word[i])).toBe('hit');
    expect(typeChar(g, word.at(-1))).toBe('kill');
    expect(g.kills).toBe(1);
    expect(g.score).toBeGreaterThan(0);
  });
  it('counts wrong keys as misses and resets combo', () => {
    const g = createGame(creatureConfig());
    tick(g, 1, rng);
    g.combo = 4;
    expect(typeChar(g, '1')).toBe('miss');
    expect(g.misses).toBe(1);
    expect(g.combo).toBe(0);
  });
  it('lets a target be cancelled', () => {
    const g = createGame(creatureConfig());
    tick(g, 1, rng);
    const e = g.entities[0];
    typeChar(g, e.word[0]);
    expect(g.target).toBe(e.id);
    cancelTarget(g);
    expect(g.target).toBeNull();
    expect(e.typed).toBe(0);
  });
  it('costs a life when an enemy reaches the base, then ends the game', () => {
    const g = createGame({ ...creatureConfig(), lives: 2 });
    for (let i = 0; i < 400 && !g.over; i++) tick(g, 0.25, rng);
    expect(g.lives).toBeLessThanOrEqual(0);
    expect(g.over).toBe(true);
  });
  it('never spawns two on-screen enemies with the same first letter when avoidable', () => {
    const g = createGame(creatureConfig());
    for (let i = 0; i < 6; i++) { g.spawnIn = 0; tick(g, 0.01, Math.random); }
    const firsts = g.entities.map((e) => e.word[0]);
    expect(new Set(firsts).size).toBe(firsts.length);
  });
  it('invaders start with single letters, then move to words', () => {
    const cfg = invaderConfig();
    expect(cfg.poolFor(1).every((w) => w.length === 1)).toBe(true);
    expect(cfg.poolFor(5).every((w) => w.length > 1)).toBe(true);
  });
});
