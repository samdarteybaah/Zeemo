import { useRef } from "react"

const CHIPS = ["Analyze a contract", "Identify risk clauses", "Explain legal terms", "Check NDA clauses"]

export default function ChatInput({ input, setInput, onSend, loading, showChips = false }) {
  const textareaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleInput = (e) => {
    setInput(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px"
  }

  return (
    <div className="input-wrapper">
      {showChips && (
        <div className="empty-chips" style={{ maxWidth: 720, margin: "0 auto 12px" }}>
          {CHIPS.map(chip => (
            <div key={chip} className="chip" onClick={() => setInput(chip)}>{chip}</div>
          ))}
        </div>
      )}
      <div className="input-bar">
        <textarea
          ref={textareaRef}
          className="input-textarea"
          placeholder="Ask about a clause, paste contract text..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="send-btn"
          onClick={onSend}
          disabled={!input.trim() || loading}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div className="input-hint">Press Enter to send · Shift+Enter for new line</div>
    </div>
  )
}