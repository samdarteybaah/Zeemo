import { useState } from "react"
import ContractResult from "../components/ContractResult"
import { analyzeContract } from "../contractApi"

export default function ContractPage() {
  const [contractText, setContractText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!contractText.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeContract(contractText)
      setResult(data)
    } catch (e) {
      setError("Analysis failed. Please try again.")
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setContractText("")
    setResult(null)
    setError(null)
  }

  return (
    <div className="contract-page">
      <div className="contract-inner">
        <div className="contract-heading">
          <h1>Contract Analysis</h1>
          <p>Paste your contract text below to get an AI-powered risk assessment.</p>
        </div>

        {!result ? (
          <>
            <textarea
              className="contract-textarea"
              placeholder="Paste your contract text here..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              rows={14}
            />

            {error && <div className="contract-error">{error}</div>}

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={!contractText.trim() || loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="dot"/><span className="dot"/><span className="dot"/>
                  Analyzing...
                </span>
              ) : "Analyze Contract"}
            </button>
          </>
        ) : (
          <>
            <ContractResult result={result} />
            <button className="analyze-btn outline" onClick={handleReset}>
              Analyze Another Contract
            </button>
          </>
        )}
      </div>
        {/* css */}
    <style>{`
        .contract-page {
            min-height: 100vh;
            background: #1F1F1F;
            display: flex;
            justify-content: center;
            padding: 48px 24px;
            font-family: 'DM Sans', sans-serif;
            color: #F0F0F0;
        }
        .contract-inner {
            width: 100%;
            max-width: 720px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .contract-heading h1 {
            font-family: 'Syne', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #39CE9C;
            margin-bottom: 6px;
        }
        .contract-heading p { font-size: 14px; color: #8A8A8A; line-height: 1.6; }
        .contract-textarea {
            width: 100%;
            background: #2C2C2C;
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 14px;
            padding: 16px;
            color: #F0F0F0;
            font-family: 'DM Sans', sans-serif;
            font-size: 13.5px;
            line-height: 1.7;
            resize: vertical;
            outline: none;
            transition: border-color 0.2s;
        }
        .contract-textarea:focus { border-color: rgba(57,206,156,0.4); }
        .contract-textarea::placeholder { color: #555; }
        .contract-error {
            padding: 12px 16px;
            background: rgba(224,82,82,0.1);
            border: 1px solid rgba(224,82,82,0.3);
            border-radius: 10px;
            color: #e05252;
            font-size: 13px;
        }
        .analyze-btn {
            padding: 14px;
            background: #39CE9C;
            border: none;
            border-radius: 12px;
            color: #0e1f18;
            font-family: 'DM Sans', sans-serif;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
        }
        .analyze-btn:hover:not(:disabled) {
            background: #45dba8;
            box-shadow: 0 0 20px rgba(57,206,156,0.3);
        }
        .analyze-btn:disabled { background: #2A2A2A; color: #555; cursor: not-allowed; }
        .analyze-btn.outline {
            background: transparent;
            border: 1px solid rgba(57,206,156,0.4);
            color: #39CE9C;
        }
        .analyze-btn.outline:hover { background: rgba(57,206,156,0.08); }
        .btn-loading { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-loading .dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: #0e1f18;
            animation: dotBounce 1.4s ease-in-out infinite;
        }
        .btn-loading .dot:nth-child(2) { animation-delay: 0.2s; }
        .btn-loading .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBounce {
            0%,80%,100% { opacity:0.3; transform:scale(0.8); }
            40% { opacity:1; transform:scale(1.1); }
        }
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
        .result-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; }
        .risk-badge { padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; }
        .risk-bar-track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
        .risk-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
        .result-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #555; font-weight: 500; }
        .result-summary { font-size: 14px; line-height: 1.8; color: #C0C0C0; }
        .result-meta { font-size: 11px; color: #555; }
    `}</style>
      
    </div>
  )
}