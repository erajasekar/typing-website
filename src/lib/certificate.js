const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Builds a self-contained SVG certificate (used for on-screen display,
// printing and download). User text is escaped; shown via <img>, so no scripts run.
export function certificateSvg({ name, date, avgWpm, avgAccuracy, levels }) {
  const shown = name || 'Champion Typist';
  const nameSize = Math.round(Math.min(68, 640 / (shown.length * 0.6))); // shrink long names to fit between the stripes
  const stat = (x, label, value) => `
    <g transform="translate(${x} 490)">
      <rect width="230" height="130" rx="6" fill="#fff" stroke="#111" stroke-width="3"/>
      <rect width="8" height="130" fill="#e10600"/>
      <text x="122" y="62" text-anchor="middle" font-size="52" font-weight="900" font-style="italic" fill="#111">${esc(value)}</text>
      <text x="122" y="100" text-anchor="middle" font-size="18" letter-spacing="3" fill="#555">${esc(label)}</text>
    </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 780" font-family="Arial, Helvetica, sans-serif">
  <defs>
    <pattern id="chk" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#fff"/><rect width="20" height="20" fill="#111"/><rect x="20" y="20" width="20" height="20" fill="#111"/>
    </pattern>
  </defs>
  <rect width="1100" height="780" fill="#fff"/>
  <rect y="0" width="1100" height="40" fill="url(#chk)"/>
  <rect y="740" width="1100" height="40" fill="url(#chk)"/>
  <polygon points="0,40 120,40 40,740 0,740" fill="#e10600"/>
  <polygon points="150,40 185,40 105,740 70,740" fill="#e10600"/>
  <polygon points="1100,40 980,40 1060,740 1100,740" fill="#e10600"/>
  <polygon points="950,40 915,40 995,740 1030,740" fill="#e10600"/>
  <text x="550" y="130" text-anchor="middle" font-size="22" letter-spacing="8" fill="#e10600" font-weight="700">TURBOTYPE TYPING ACADEMY</text>
  <text x="550" y="205" text-anchor="middle" font-size="52" font-weight="900" font-style="italic" fill="#111">CERTIFICATE OF COMPLETION</text>
  <text x="550" y="270" text-anchor="middle" font-size="22" fill="#555">This certifies that</text>
  <text x="550" y="350" text-anchor="middle" font-size="${nameSize}" font-weight="900" font-style="italic" fill="#e10600">${esc(shown)}</text>
  <line x1="260" y1="372" x2="840" y2="372" stroke="#111" stroke-width="3"/>
  <text x="550" y="420" text-anchor="middle" font-size="22" fill="#555">completed all ${esc(levels)} levels of the TurboType course on ${esc(formatDate(date))}</text>
  ${stat(175, 'AVG WPM', avgWpm)}${stat(435, 'AVG ACCURACY', `${avgAccuracy}%`)}${stat(695, 'LEVELS', `${levels}/${levels}`)}
</svg>`;
}

export const svgDataUrl = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
