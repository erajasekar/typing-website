export default function Settings({ settings, onChange, onReset }) {
  return (
    <section>
      <h2 className="page-title">Settings</h2>
      <div className="card settings">
        <label className="switch">
          <input type="checkbox" checked={settings.racing} onChange={(e) => onChange({ racing: e.target.checked })} />
          <span>
            <strong>Racing theme</strong>
            <small>Red racing stripes and checkered-flag details. Turn off for a plain white and blue look.</small>
          </span>
        </label>
        <label className="field">
          Your name (for your certificate)
          <input value={settings.name} maxLength={40} placeholder="Type your name" onChange={(e) => onChange({ name: e.target.value })} />
        </label>
        <button className="danger" onClick={() => { if (window.confirm('Erase all course progress and game scores on this device?')) onReset(); }}>
          Reset all progress
        </button>
      </div>
    </section>
  );
}
