import { useState } from "react"
import { login } from "../authApi"
import { setToken, setUser } from "../authService"
import { useNavigate, Link } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await login({ email, password })
      setToken(data.access_token)
      setUser({"name":data.name, "email":data.email, })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>Zeemo</div>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1F1F1F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#2A2A2A",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    padding: "40px 36px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "28px",
    fontWeight: "700",
    color: "#39CE9C",
    letterSpacing: "-0.5px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#8A8A8A",
    textAlign: "center",
    margin: 0,
  },
  error: {
    padding: "12px 16px",
    background: "rgba(224,82,82,0.1)",
    border: "1px solid rgba(224,82,82,0.3)",
    borderRadius: "10px",
    color: "#e05252",
    fontSize: "13px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#8A8A8A",
    letterSpacing: "0.3px",
  },
  input: {
    background: "#1F1F1F",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#F0F0F0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  btn: {
    padding: "13px",
    background: "#39CE9C",
    border: "none",
    borderRadius: "12px",
    color: "#0e1f18",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    transition: "all 0.2s ease",
  },
  footer: {
    fontSize: "13px",
    color: "#8A8A8A",
    textAlign: "center",
    margin: 0,
  },
  link: {
    color: "#39CE9C",
    textDecoration: "none",
    fontWeight: "500",
  },
}