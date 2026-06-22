import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ChatSidebar from "../components/ChatSidebar"
import ChatMessage, { LoadingDots } from "../components/ChatMessage"
import ChatInput from "../components/ChatInput"
import { getMessages, sendMessage, createConversation } from "../chatApi"
import { removeToken, getUser, removeUser } from "../../auth/authService"

export default function ChatPage() {
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  const user = getUser()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleSelectConversation = async (id) => {
    setActiveId(id)
    setLoadingMessages(true)
    try {
      const msgs = await getMessages(id)
      setMessages(msgs)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingMessages(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setActiveId(null)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: text }])
    setLoading(true)

    let conversationId = activeId

    // if no active conversation, create one first
    if (!conversationId) {
      const convo = await createConversation(text.slice(0, 40)) // use start of message as title
      console.log("convo response:", convo)       // 👈 what does this print?
      conversationId = convo._id
      console.log("conversationId set to:", conversationId)  // 👈 is this null?
    }

    console.log("sending to conversationId:", conversationId)  // 👈 is this null here?
    
    try {
      // const res = await sendMessage(activeId, text)
      const res = await sendMessage(conversationId, text)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", content: res.response }])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    removeToken()
    removeUser()
    navigate("/login")
  }

  return (
    <div className="zeemo-root">
      <ChatSidebar
        activeId={activeId}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
        user={user}
      />
      <main className="main">
        <div className="topbar">
          <div className="topbar-title">
            {activeId ? "Contract Analysis" : "New Analysis"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => navigate("/analyze")}
              style={{
                padding: "6px 14px",
                background: "rgba(57,206,156,0.1)",
                border: "1px solid rgba(57,206,156,0.3)",
                borderRadius: "8px",
                color: "#39CE9C",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Analyze Contract
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 14px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                color: "#8A8A8A",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {loadingMessages ? (
          <div className="empty-state">
            <LoadingDots />
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-logo">Zeemo</div>
            <div className="empty-sub">
              Upload or paste your contract to get started. I'll identify risks and explain every clause.
            </div>
            <ChatInput input={input} setInput={setInput} onSend={handleSend} loading={loading} showChips />
          </div>
        ) : (
          <>
            <div className="chat-window">
              <div className="messages-inner">
                {messages.map(msg => <ChatMessage key={msg._id ?? msg.id} msg={msg} />)}
                {loading && (
                  <div className="msg-row assistant" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div className="msg-avatar assistant">Z</div>
                    <LoadingDots />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
            <ChatInput input={input} setInput={setInput} onSend={handleSend} loading={loading} />
          </>
        )}
      </main>
    </div>
  )
}