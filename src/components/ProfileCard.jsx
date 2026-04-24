export default function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <div className="profile-card">
      <div className="profile-avatar-wrap">
        <img
          src={user.profile_photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&background=1a1a2e&color=e0b44a&size=128"}
          alt={user.name}
          className="profile-avatar"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a1a2e&color=e0b44a&size=128`;
          }}
        />
        <span className="profile-badge">{user.gender === "male" ? "♂" : "♀"}</span>
      </div>
      <div className="profile-info">
        <h2 className="profile-name">{user.name}</h2>
        <span className="profile-nik">NIK: {user.nik}</span>
        <div className="profile-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Email</span>
            <span className="meta-value">{user.email}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Telepon</span>
            <span className="meta-value">{user.phone}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Pendidikan</span>
            <span className="meta-value">{user.education}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Bank</span>
            <span className="meta-value">{user.bank_name} — {user.bank_account_number}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Atasan</span>
            <span className="meta-value">{user.leader_name}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Bergabung</span>
            <span className="meta-value">{user.effective_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
