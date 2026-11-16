// Standard typing metrics: one "word" is 5 characters.
export const calcAccuracy = (correct, total) => (total === 0 ? 100 : Math.round((correct / total) * 100));

export function calcWpm(correctChars, ms) {
  if (correctChars <= 0) return 0;
  const minutes = Math.max(ms, 1000) / 60000; // floor at 1s so the first keystrokes don't spike
  return Math.round(correctChars / 5 / minutes);
}

export const formatTime = (ms) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
