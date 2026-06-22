import { useEffect, useState } from "react"
import { getConversations } from "../chatApi"

export default function ChatSidebar({ activeId, onSelect, onNewChat, user }) {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getConversations()
      .then(setConversations)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-dot" />
          Zeemo
        </div>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        New analysis
      </button>

      <div className="sidebar-section-label">Recent</div>

      <div className="conversation-list">
        {loading && (
          <div style={{ padding: "12px 18px", color: "var(--text-muted)", fontSize: 13 }}>
            Loading...
          </div>
        )}
        {!loading && conversations.length === 0 && (
          <div style={{ padding: "12px 18px", color: "var(--text-muted)", fontSize: 13 }}>
            No conversations yet
          </div>
        )}
        {conversations.map(conv => (
          <div
            key={conv._id}
            className={`conv-item ${conv._id === activeId ? "active" : ""}`}
            onClick={() => onSelect(conv._id)}
          >
            <div className="conv-icon">📄</div>
            <div className="conv-meta">
              <div className="conv-title">{conv.title}</div>
              <div className="conv-date">
                {new Date(conv.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="user-avatar">{user?.name?.[0] ?? "U"}</div>
          <div className="user-name">{user?.name ?? "User"}</div>
        </div>
      </div>
    </aside>
  )
}