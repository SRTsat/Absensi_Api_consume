import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("sadata_token") || null);

  const handleLogin = (t) => {
    localStorage.setItem("sadata_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("sadata_token");
    setToken(null);
  };

  return token ? (
    <Dashboard token={token} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
