import { useEffect, useState } from "react";
import { getUser, getAttendance } from "../services/api";
import ProfileCard from "../components/ProfileCard";
import AttendanceStatus from "../components/AttendanceStatus";
import StoreList from "../components/StoreList";

export default function Dashboard({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userData, attData] = await Promise.all([
          getUser(token),
          getAttendance(token),
        ]);
        setUser(userData.user);
        setAttendance(attData.attendance);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">SADATA</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="nav-icon">⊞</span> Overview
          </button>
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="nav-icon">◉</span> Profil
          </button>
          <button
            className={`nav-item ${activeTab === "stores" ? "active" : ""}`}
            onClick={() => setActiveTab("stores")}
          >
            <span className="nav-icon">◫</span> Kunjungan
          </button>
        </nav>
        <button className="btn-logout" onClick={onLogout}>
          ⏻ Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="topbar">
          <div>
            <h1 className="page-title">
              {activeTab === "overview" && "Dashboard"}
              {activeTab === "profile" && "Profil Karyawan"}
              {activeTab === "stores" && "Rencana Kunjungan"}
            </h1>
            <p className="page-sub">
              {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="topbar-user">
            <img
              src={user?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=1a1a2e&color=e0b44a`}
              alt=""
              className="topbar-avatar"
              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=U&background=1a1a2e&color=e0b44a`; }}
            />
            <span className="topbar-name">{user?.name}</span>
          </div>
        </div>

        <div className="content-area">
          {activeTab === "overview" && (
            <div className="overview-layout">
              <AttendanceStatus attendance={attendance} />
              <ProfileCard user={user} />
              <StoreList stores={attendance?.attendance_detail} />
            </div>
          )}
          {activeTab === "profile" && <ProfileCard user={user} />}
          {activeTab === "stores" && (
            <>
              <AttendanceStatus attendance={attendance} />
              <StoreList stores={attendance?.attendance_detail} />
            </>
          )}a
        </div>
      </main>
    </div>
  );
}
