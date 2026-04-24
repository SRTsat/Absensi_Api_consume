export default function AttendanceStatus({ attendance }) {
  if (!attendance) return null;

  const statusColor = {
    Plan: "#e0b44a",
    Present: "#4ade80",
    Absent: "#f87171",
  };

  const total = attendance.attendance_detail?.length || 0;
  const visited = attendance.attendance_detail?.filter((s) => s.visited === 1).length || 0;

  return (
    <div className="attendance-status-card">
      <div className="att-header">
        <div>
          <p className="att-date">{attendance.date}</p>
          <h3 className="att-title">Status Kehadiran</h3>
        </div>
        <span
          className="att-badge"
          style={{ background: statusColor[attendance.status] || "#888" }}
        >
          {attendance.status}
        </span>
      </div>
      <div className="att-stats">
        <div className="att-stat-item">
          <span className="stat-num">{total}</span>
          <span className="stat-label">Total Toko</span>
        </div>
        <div className="att-stat-divider" />
        <div className="att-stat-item">
          <span className="stat-num">{visited}</span>
          <span className="stat-label">Sudah Dikunjungi</span>
        </div>
        <div className="att-stat-divider" />
        <div className="att-stat-item">
          <span className="stat-num">{total - visited}</span>
          <span className="stat-label">Belum Dikunjungi</span>
        </div>
        <div className="att-stat-divider" />
        <div className="att-stat-item">
          <span className="stat-num">{attendance.working_hour_label || "-"}</span>
          <span className="stat-label">Jam Kerja</span>
        </div>
      </div>
    </div>
  );
}
