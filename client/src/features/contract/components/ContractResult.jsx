import { useState } from "react"

function CollapsibleSection({ title, icon, count, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="section">
      <button className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <span className="section-icon">{icon}</span>
          <span className="section-title">{title}</span>
          {count !== undefined && <span className="section-count">{count}</span>}
        </div>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <div className="section-body">{children}</div>}
    </div>
  )
}

export default function ContractResult({ result }) {
  const riskColor =
    result.risk_score <= 3 ? "#39CE9C"
    : result.risk_score <= 6 ? "#f5a623"
    : "#e05252"

  const riskLabel =
    result.risk_score <= 3 ? "Low Risk"
    : result.risk_score <= 6 ? "Medium Risk"
    : "High Risk"

  const risks = result.risks || []
  const obligations = result.obligations || []
  const negotiation_suggestions = result.negotiation_suggestions || []
  const ambiguity_flags = result.ambiguity_flags || []

  return (
    <div className="result-card">
      {/* Risk Score Header */}
      <div className="result-header">
        <div className="result-title">Analysis Complete</div>
        <div className="risk-badge" style={{
          background: `${riskColor}20`,
          border: `1px solid ${riskColor}50`,
          color: riskColor
        }}>
          {riskLabel} — {result.risk_score}/10
        </div>
      </div>

      <div className="risk-bar-track">
        <div className="risk-bar-fill" style={{ width: `${result.risk_score * 10}%`, background: riskColor }} />
      </div>

      {/* Summary */}
      <div className="summary-box">
        <div className="result-section-label">Summary</div>
        <div className="result-summary">{result.summary}</div>
      </div>

      {/* Risks */}
      <CollapsibleSection title="Identified Risks" icon="⚠️" count={risks.length} defaultOpen={true}>
        {risks.length === 0 ? (
          <div className="empty-section">No risks identified</div>
        ) : (
          <div className="item-list">
            {risks.map((risk, i) => (
              <div key={i} className="item-row risk-item">
                <div className="item-dot" style={{ background: "#e05252" }} />
                <div className="item-text">{typeof risk === "string" ? risk : risk.description ?? JSON.stringify(risk)}</div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Obligations */}
      <CollapsibleSection title="Obligations Summary" icon="📋" count={obligations.length}>
        {obligations.length === 0 ? (
          <div className="empty-section">No obligations found</div>
        ) : (
          <div className="item-list">
            {obligations.map((item, i) => (
              <div key={i} className="item-row">
                <div className="item-dot" style={{ background: "#39CE9C" }} />
                <div className="item-text">{typeof item === "string" ? item : item.description ?? JSON.stringify(item)}</div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Negotiation Suggestions */}
      <CollapsibleSection title="Negotiation Suggestions" icon="💡" count={negotiation_suggestions.length}>
        {negotiation_suggestions.length === 0 ? (
          <div className="empty-section">No suggestions available</div>
        ) : (
          <div className="item-list">
            {negotiation_suggestions.map((item, i) => (
              <div key={i} className="item-row">
                <div className="item-dot" style={{ background: "#f5a623" }} />
                <div className="item-text">{typeof item === "string" ? item : item.description ?? JSON.stringify(item)}</div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      {/* Ambiguity Flags */}
      <CollapsibleSection title="Ambiguity Flags" icon="🚩" count={ambiguity_flags.length}>
        {ambiguity_flags.length === 0 ? (
          <div className="empty-section">No ambiguities detected</div>
        ) : (
          <div className="item-list">
            {ambiguity_flags.map((item, i) => (
              <div key={i} className="item-row">
                <div className="item-dot" style={{ background: "#a78bfa" }} />
                <div className="item-text">{typeof item === "string" ? item : item.description ?? JSON.stringify(item)}</div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>

      <div className="result-meta">Contract ID: {result.contract_id}</div>

      <style>{`
        .result-card {
          background: #2A2A2A;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .result-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
        .result-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; color: #F0F0F0; }
        .risk-badge { padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; }
        .risk-bar-track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
        .risk-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
        .summary-box { display: flex; flex-direction: column; gap: 6px; }
        .result-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #555; font-weight: 500; }
        .result-summary { font-size: 14px; line-height: 1.8; color: #C0C0C0; }
        .result-meta { font-size: 11px; color: #555; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.06); }

        .section {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .section-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          background: rgba(255,255,255,0.02);
          border: none;
          cursor: pointer;
          color: #F0F0F0;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s ease;
        }
        .section-header:hover { background: rgba(255,255,255,0.05); }
        .section-header-left { display: flex; align-items: center; gap: 10px; }
        .section-icon { font-size: 15px; }
        .section-title { font-size: 14px; font-weight: 500; }
        .section-count {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          background: rgba(255,255,255,0.07);
          color: #8A8A8A;
          font-weight: 500;
        }
        .section-body { padding: 4px 16px 14px; }

        .item-list { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
        .item-row { display: flex; align-items: flex-start; gap: 10px; }
        .item-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
        .item-text { font-size: 13.5px; color: #C0C0C0; line-height: 1.7; }
        .empty-section { font-size: 13px; color: #555; padding: 10px 0 4px; }
      `}</style>
    </div>
  )
}