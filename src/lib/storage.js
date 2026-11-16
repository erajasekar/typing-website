const KEY = 'turbotype:v1';

export const defaultProgress = () => ({
  settings: { racing: true, name: '' },
  levels: {}, // levelId -> { wpm, accuracy, attempts }
  games: {}, // gameId -> { bestScore, bestWpm }
  completedAt: null,
});

export function loadProgress() {
  const d = defaultProgress();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    return saved ? { ...d, ...saved, settings: { ...d.settings, ...saved.settings } } : d;
  } catch {
    return d;
  }
}

export function saveProgress(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable (e.g. private mode): progress just won't persist */
  }
}
