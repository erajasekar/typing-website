import { courseStats } from '../lib/course.js';
import { LEVELS } from '../data/levels.js';
import { certificateSvg, svgDataUrl } from '../lib/certificate.js';

export default function Certificate({ progress, onName, onBack }) {
  const stats = courseStats(progress.levels);
  const name = progress.settings.name.trim();
  const date = progress.completedAt ?? new Date().toISOString().slice(0, 10);
  const svg = certificateSvg({ name, date, avgWpm: stats.avgWpm, avgAccuracy: stats.avgAccuracy, levels: LEVELS.length });
  const url = svgDataUrl(svg);

  if (!stats.complete) {
    return (
      <section className="card">
        <h2>Certificate locked</h2>
        <p>Pass all {stats.total} levels to unlock your certificate. You've finished {stats.completed} so far.</p>
        <button onClick={onBack}>Back to course</button>
      </section>
    );
  }

  return (
    <section>
      <div className="no-print">
        <h2 className="page-title">Your Certificate</h2>
        <label className="field">
          Name on certificate
          <input value={progress.settings.name} maxLength={40} placeholder="Type your name" onChange={(e) => onName(e.target.value)} />
        </label>
        <div className="actions">
          <button className="primary" onClick={() => window.print()}>🖨️ Print / save as PDF</button>
          <a className="btn" href={url} download="turbotype-certificate.svg">⬇️ Download image</a>
          <button className="ghost" onClick={onBack}>← Course</button>
        </div>
      </div>
      <img className="certificate" src={url} alt={`Certificate of completion for ${name || 'Champion Typist'}`} />
    </section>
  );
}
