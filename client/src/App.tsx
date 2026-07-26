import React, { useState } from "react";

export default function App() {
  const [balance, setBalance] = useState<number>(500000);
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div style={{ backgroundColor: "#0b0e14", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #333", paddingBottom: "10px" }}>
        <h2>SHOPACC89.COM</h2>
        <div>So du: {balance.toLocaleString()} VND</div>
      </header>

      <main style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button onClick={() => setActiveTab("home")} style={{ padding: "8px 16px" }}>Trang Chu</button>
          <button onClick={() => setActiveTab("admin")} style={{ padding: "8px 16px", backgroundColor: "red", color: "white" }}>ADMIN PANEL</button>
        </div>

        {activeTab === "home" && (
          <div>
            <h3>DANH MUC TUI MU</h3>
            <p>He thong hoat dong binh thuong!</p>
          </div>
        )}

        {activeTab === "admin" && (
          <div>
            <h3>QUAN TRI ADMIN</h3>
            <p>Cai dat STK va Quan ly kho acc server.</p>
          </div>
        )}
      </main>
    </div>
  );
}
