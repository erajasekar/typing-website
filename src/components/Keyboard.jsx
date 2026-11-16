import { ROWS, ROW_OFFSETS, FINGER_OF, FINGER_LABEL, describeChar } from '../data/keyboard.js';

// Virtual keyboard. `next` is the character the learner must type; its key
// (plus Shift if needed) is highlighted. `wrong` flashes the key just mis-hit.
export default function Keyboard({ next, wrong }) {
  const target = next ? describeChar(next) : null;
  const wrongKey = wrong ? describeChar(wrong)?.key : null;

  return (
    <div className="keyboard" aria-hidden="true">
      {ROWS.map((row, r) => (
        <div className="kb-row" key={r} style={{ marginLeft: `calc(var(--kw) * ${ROW_OFFSETS[r]})` }}>
          {row.map((k) => (
            <span
              key={k}
              className={`key f-${FINGER_OF[k]} ${target?.key === k ? 'next' : ''} ${wrongKey === k ? 'wrong' : ''}`}
            >
              {k}
            </span>
          ))}
        </div>
      ))}
      <div className="kb-row">
        <span className={`key wide shift ${target?.shift === 'left' ? 'next' : ''}`}>shift</span>
        <span className={`key space f-thumb ${target?.key === ' ' ? 'next' : ''} ${wrongKey === ' ' ? 'wrong' : ''}`}>space</span>
        <span className={`key wide shift ${target?.shift === 'right' ? 'next' : ''}`}>shift</span>
      </div>
      <p className="finger-hint">
        {target ? `Use your ${FINGER_LABEL[target.finger]}${target.shift ? ` + ${target.shift} shift` : ''}` : ' '}
      </p>
    </div>
  );
}
