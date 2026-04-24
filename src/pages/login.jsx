import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin }) {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(nik, password);
      if (data.status && data.token) {
        onLogin(data.token);
      } else {
        setError("NIK atau password salah.");
      }
    } catch {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">Absensi</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field-group">
            <label>NIK</label>
            <input
              type="text"
              placeholder="Masukkan NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Memuat..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
