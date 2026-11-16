import { LEVELS } from '../data/levels.js';

export function courseStats(levelsProgress, levels = LEVELS) {
  const done = levels.map((l) => levelsProgress[l.id]).filter(Boolean);
  const avg = (key) => (done.length ? Math.round(done.reduce((s, r) => s + r[key], 0) / done.length) : 0);
  return {
    completed: done.length,
    total: levels.length,
    avgWpm: avg('wpm'),
    avgAccuracy: avg('accuracy'),
    complete: done.length === levels.length,
  };
}

export const isUnlocked = (levelsProgress, level, levels = LEVELS) => {
  const i = levels.findIndex((l) => l.id === level.id);
  return i === 0 || !!levelsProgress[levels[i - 1].id];
};

// Applies a finished attempt to saved progress. Only passing attempts count
// toward the course; we keep the fastest passing attempt per level.
export function applyLevelResult(progress, level, result, today = new Date().toISOString().slice(0, 10)) {
  const passed = result.accuracy >= level.minAccuracy;
  if (!passed) return { progress, passed };
  const prev = progress.levels[level.id];
  const best = !prev || result.wpm >= prev.wpm ? { wpm: result.wpm, accuracy: result.accuracy } : prev;
  const levels = { ...progress.levels, [level.id]: { ...best, attempts: (prev?.attempts ?? 0) + 1 } };
  const next = { ...progress, levels };
  if (!next.completedAt && courseStats(levels).complete) next.completedAt = today;
  return { progress: next, passed };
}
