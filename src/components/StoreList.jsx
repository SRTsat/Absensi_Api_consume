import { useState } from "react";

export default function StoreList({ stores }) {
  const [search, setSearch] = useState("");

  if (!stores || stores.length === 0) return null;

  const filtered = stores.filter(
    (s) =>
      s.name1.toLowerCase().includes(search.toLowerCase()) ||
      s.store_code.toLowerCase().includes(search.toLowerCase()) ||
      s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="store-list-section">
      <div className="store-list-header">
        <h3 className="store-list-title">Daftar Kunjungan Toko</h3>
        <input
          className="store-search"
          type="text"
          placeholder="Cari toko, kode, area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="store-grid">
        {filtered.map((store) => (
          <div key={store.id} className={`store-card ${store.visited ? "visited" : ""}`}>
            <div className="store-card-top">
              <div className="store-img-wrap">
                {store.photo_url ? (
                  <img src={store.photo_url} alt={store.name1} className="store-img" onError={(e) => { e.target.style.display = "none"; }} />
                ) : (
                  <div className="store-img-placeholder">🏪</div>
                )}
              </div>
              <span className={`store-visit-badge ${store.visited ? "done" : "pending"}`}>
                {store.visited ? "✓ Visited" : "Pending"}
              </span>
            </div>

            <div className="store-card-body">
              <p className="store-code">{store.store_code}</p>
              <h4 className="store-name">{store.name1}</h4>
              <p className="store-area">📍 {store.area} · {store.timezone}</p>
              <p className="store-channel">{store.channel_name} — {store.account_name}</p>

              {store.address && (
                <p className="store-address">{store.address}</p>
              )}

              <div className="store-checkin-row">
                <div className="checkin-item">
                  <span className="checkin-label">Check In</span>
                  <span className="checkin-value">{store.check_in}</span>
                </div>
                <div className="checkin-item">
                  <span className="checkin-label">Check Out</span>
                  <span className="checkin-value">{store.check_out}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="store-empty">Tidak ada toko yang cocok dengan pencarian.</p>
      )}
    </div>
  );
}
