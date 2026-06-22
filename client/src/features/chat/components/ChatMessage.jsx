export function LoadingDots() {
  return (
    <div className="loading-dots">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  )
}

export default function ChatMessage({ msg }) {
  const isUser = msg.role === "user"
  return (
    <div className="msg-group">
      <div className={`msg-row ${isUser ? "user" : "assistant"}`}>
        <div className={`msg-avatar ${isUser ? "user" : "assistant"}`}>
          {isUser ? "U" : "Z"}
        </div>
        <div className="msg-content">
          <div className={`msg-bubble ${isUser ? "user" : "assistant"}`}>
            {msg.content}
          </div>
        </div>
      </div>
    </div>
  )
}