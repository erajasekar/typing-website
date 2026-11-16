// Keyboard layout, finger assignments and helpers for the on-screen keyboard.
export const ROWS = [
  '1234567890-'.split(''),
  'qwertyuiop'.split(''),
  "asdfghjkl;'".split(''),
  'zxcvbnm,./'.split(''),
];

// Horizontal stagger of each row, in key widths.
export const ROW_OFFSETS = [0, 0.5, 0.75, 1.25];

const FINGER_KEYS = {
  'l-pinky': '1qaz',
  'l-ring': '2wsx',
  'l-middle': '3edc',
  'l-index': '45rtfgvb',
  'r-index': '67yuhjnm',
  'r-middle': '8ik,',
  'r-ring': '9ol.',
  'r-pinky': "0-p;'/",
  thumb: ' ',
};

export const FINGER_OF = Object.fromEntries(
  Object.entries(FINGER_KEYS).flatMap(([finger, keys]) => keys.split('').map((k) => [k, finger])),
);

export const FINGER_LABEL = {
  'l-pinky': 'left pinky',
  'l-ring': 'left ring finger',
  'l-middle': 'left middle finger',
  'l-index': 'left index finger',
  'r-index': 'right index finger',
  'r-middle': 'right middle finger',
  'r-ring': 'right ring finger',
  'r-pinky': 'right pinky',
  thumb: 'thumb',
};

// Characters typed with Shift, mapped to the physical key they live on.
export const SHIFTED = { '!': '1', '?': '/', ':': ';', '"': "'" };

// Which physical key (and Shift, if any) types `ch`. null if unsupported.
export function describeChar(ch) {
  if (ch === ' ') return { key: ' ', shift: null, finger: 'thumb' };
  const base = SHIFTED[ch] ?? ch.toLowerCase();
  const finger = FINGER_OF[base];
  if (!finger) return null;
  const needsShift = ch !== ch.toLowerCase() || ch in SHIFTED;
  const hand = finger.startsWith('l-') ? 'left' : 'right';
  // Shift is pressed by the hand opposite the typing finger.
  return { key: base, shift: needsShift ? (hand === 'left' ? 'right' : 'left') : null, finger };
}
