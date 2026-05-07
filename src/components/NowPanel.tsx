import React from "react";
import { NowData } from "../types/Now";

interface NowPanelProps {
  data: NowData | null;
}

const NowPanel: React.FC<NowPanelProps> = ({ data }) => {
  if (!data) {
    return (
      <aside className="now-panel" aria-label="Now">
        <div className="now-panel-header">
          <span className="now-status">
            <span className="now-status-dot" aria-hidden="true" />
            <span className="now-status-label">Currently</span>
          </span>
        </div>
        <p className="now-empty-state">Now panel content will appear here soon.</p>
      </aside>
    );
  }

  const statusLabel = data.status?.trim() || "Currently";

  return (
    <aside className="now-panel" aria-label="Now">
      <div className="now-panel-header">
        <span className="now-status">
          <span className="now-status-dot" aria-hidden="true" />
          <span className="now-status-label">{statusLabel}</span>
        </span>
        {data.updated && (
          <span className="now-updated">Updated {data.updated}</span>
        )}
      </div>

      {data.headline && <h2 className="now-headline">{data.headline}</h2>}

      {data.items && data.items.length > 0 && (
        <ul className="now-list">
          {data.items.map((item, index) => (
            <li key={index} className="now-list-item">
              {item.label && <span className="now-item-label">{item.label}</span>}
              <span className="now-item-text">{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      {data.footer && <p className="now-footer">{data.footer}</p>}
    </aside>
  );
};

export default NowPanel;
