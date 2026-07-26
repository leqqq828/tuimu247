import React, { useState } from "react";

interface MysteryCategory {
  id: number;
  name: string;
  price: number;
  plays: string;
  views: string;
  game: string;
  banner: string;
}

interface InventoryItem {
  id: string;
  categoryName: string;
  rewardName: string;
  accountInfo: string;
  date: string;
}

interface ServerAccount {
  id: string;
  game: string;
  accountInfo: string;
  status: "AVAILABLE" | "SOLD";
}

export default function App() {
  const [balance, setBalance] = useState<number>(500000);
  const [username] = useState<string>("Gamer_Pro89");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [activeTab, setActiveTab] = useState<"home" | "detail" | "withdraw" | "topup" | "admin">("home");
  
  const [selectedBox, setSelectedBox] = useState<MysteryCategory | null>(null);
  const [selectedBagIndex, setSelectedBagIndex] = useState<number>(1);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState<string>("");

  const [bankInfo, setBankInfo] = useState({
    bankName: "MB BANK",
    accountNumber: "0987654321",
    accountHolder: "NGUYEN VAN A"
  });

  const [categories] = useState<MysteryCategory[]>([
    { id: 1, name: "TÚI MÙ LIÊN QUÂN VIP 149K", price: 149000, plays: "12,890", views: "45,100", game: "LIÊN QUÂN", banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600" },
    { id: 2, name: "TÚI MÙ FREE FIRE - AK RỒNG XANH", price: 20000, plays: "34,210", views: "89,000", game: "FREE FIRE", banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" },
    { id: 3, name: "TÚI MÙ ROBLOX BLOX FRUIT 30K", price: 30000, plays: "18,400", views: "52,300", game: "ROBLOX", banner: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600" },
    { id: 4, name: "TÚI MÙ FC MOBILE SUPER STAR", price: 50000, plays: "8,900", views: "21,000", game: "FC MOBILE", banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600" }
  ]);

  const [serverStock, setServerStock] = useState<ServerAccount[]>([
    { id: "ACC-001", game: "LIÊN QUÂN", accountInfo: "TK: lq_vip1 | MK: pass123 | Note: Full Tuong", status: "AVAILABLE" },
    { id: "ACC-002", game: "FREE FIRE", accountInfo: "TK: ff_ak47 | MK: pass456 | Note: AK Rong Xanh LV7", status: "AVAILABLE" },
    { id: "ACC-003", game: "ROBLOX", accountInfo: "TK: roblox_kitsune | MK: pass789 | Note: Trai Kitsune", status: "AVAILABLE" }
  ]);

  const [newAccGame, setNewAccGame] = useState("LIÊN QUÂN");
  const [newAccInfo, setNewAccInfo] = useState("");

  const handleOpenDetail = (category: MysteryCategory) => {
    setSelectedBox(category);
    setSelectedBagIndex(1);
    setActiveTab("detail");
  };

  const handleRipOpen = () => {
    if (!selectedBox) return;

    if (balance < selectedBox.price) {
      alert("Số dư không đủ! Vui lòng Nạp Tiền.");
      setActiveTab("topup");
      return;
    }

    const availableAccs = serverStock.filter(item => item.status === "AVAILABLE");
    if (availableAccs.length === 0) {
      alert("Kho Nick hiện tại đang hết! Vui lòng báo Admin thêm acc.");
      return;
    }

    setBalance(prev => prev - selectedBox.price);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpening(false);
      
      const selectedAcc = availableAccs[Math.floor(Math.random() * availableAccs.length)];
      setServerStock(prev => prev.map(acc => acc.id === selectedAcc.id ? { ...acc, status: "SOLD" } : acc));

      const rewardText = "ACC CHUẨN: " + selectedAcc.accountInfo;
      setWonReward(rewardText);

      const newItem: InventoryItem = {
        id: selectedAcc.id,
        categoryName: selectedBox.name,
        rewardName: "Acc Game " + selectedBox.game,
        accountInfo: selectedAcc.accountInfo,
        date: new Date().toLocaleTimeString("vi-VN")
      };

      setInventory(prev => [newItem, ...prev]);
    }, 1500);
  };

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(topupAmount);
    if (!val || val < 10000) return;
    setBalance(prev => prev + val);
    alert("Đã nhận lệnh nạp " + val.toLocaleString("vi-VN") + "đ thành công!");
    setTopupAmount("");
    setActiveTab("home");
  };

  const handleAddAccountToStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccInfo) return;
    const newAcc: ServerAccount = {
      id: "ACC-" + Math.floor(1000 + Math.random() * 9000),
      game: newAccGame,
      accountInfo: newAccInfo,
      status: "AVAILABLE"
    };
    setServerStock(prev => [newAcc, ...prev]);
    setNewAccInfo("");
    alert("Đã thêm Tài Khoản mới vào Kho Server!");
  };

  return (
    <div style={{ backgroundColor: "#090d16", color: "#f3f4f6", fontFamily: "'Segoe UI', Roboto, sans-serif", minHeight: "100vh" }}>
      {/* HEADER GAMING */}
      <header style={{ backgroundColor: "#111827", borderBottom: "1px solid #1f293d", padding: "14px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => setActiveTab("home")} style={{ fontSize: "22px", fontWeight: "900", background: "linear-gradient(45deg, #10b981, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer", letterSpacing: "1px" }}>
            SHOPACC89.COM
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#dc2626" : "#1f2937", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" }}>Trang Chủ</button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: activeTab === "withdraw" ? "#dc2626" : "#1f2937", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" }}>Túi Đồ ({inventory.length})</button>
            <button onClick={() => setActiveTab("topup")} style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 0 10px rgba(37,99,235,0.4)" }}>Nạp Tiền</button>
            {role === "admin" && (
              <button onClick={() => setActiveTab("admin")} style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 0 10px rgba(220,38,38,0.5)" }}>[ADMIN PANEL]</button>
            )}
          </div>
          <div style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "12px", background: "#1f293d", padding: "6px 14px", borderRadius: "20px", border: "1px solid #374151" }}>
            <span>👤 <b>{username}</b> | 💰 <b style={{ color: "#10b981" }}>{balance.toLocaleString("vi-VN")}đ</b></span>
            <button onClick={() => setRole(role === "user" ? "admin" : "user")} style={{ backgroundColor: "transparent", color: "#eab308", border: "1px solid #eab308", padding: "2px 8px", borderRadius: "10px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
              Quyền: {role.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 16px" }}>
        {/* TRANG CHỦ */}
        {activeTab === "home" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>TÚI MÙ VẬT PHẨM GAME</h1>
              <p style={{ color: "#9ca3af", fontSize: "14px" }}>Thử vận may - Xé túi trúng ACC VIP ngay lập tức!</p>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "24px" }}>
              {categories.map((cat) => (
                <div key={cat.id} style={{ backgroundColor: "#111827", borderRadius: "16px", border: "1px solid #1f293d", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", transition: "transform 0.2s" }}>
                  <img src={cat.banner} alt={cat.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                  <div style={{ padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#fff", margin: "0 0 10px 0", height: "42px", overflow: "hidden" }}>{cat.name}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <span style={{ fontSize: "13px", color: "#9ca3af" }}>Giá lượt:</span>
                      <span style={{ color: "#10b981", fontWeight: "800", fontSize: "18px" }}>{cat.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <button onClick={() => handleOpenDetail(cat)} style={{ width: "100%", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "14px", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}>XÉ TÚI NGAY ➔</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHI TIẾT TÚI MÙ */}
        {activeTab === "detail" && selectedBox && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#374151", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", marginBottom: "20px", fontWeight: "bold" }}>← Quay lại danh mục</button>
            <div style={{ backgroundColor: "#111827", padding: "30px", borderRadius: "20px", border: "1px solid #1f293d", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <h2 style={{ color: "#f59e0b", fontSize: "24px", margin: "0 0 24px 0", textTransform: "uppercase" }}>{selectedBox.name}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "16px", marginBottom: "30px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num} onClick={() => setSelectedBagIndex(num)} style={{ backgroundColor: selectedBagIndex === num ? "#1e1b4b" : "#1f293d", border: selectedBagIndex === num ? "2px solid #f59e0b" : "1px solid #374151", borderRadius: "14px", padding: "20px 10px", cursor: "pointer", transition: "0.2s" }}>
                    <div style={{ fontSize: "36px" }}>🎁</div>
                    <div style={{ fontSize: "12px", color: "#d1d5db", marginTop: "8px", fontWeight: "bold" }}>TÚI SỐ {num}</div>
                  </div>
                ))}
              </div>
              <button onClick={handleRipOpen} disabled={isOpening} style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "#fff", border: "none", padding: "16px 50px", borderRadius: "12px", fontWeight: "bold", fontSize: "18px", cursor: "pointer", boxShadow: "0 0 20px rgba(249,115,22,0.4)" }}>
                {isOpening ? "ĐANG XÉ TÚI MÙ..." : `XÉ TÚI MÙ SỐ ${selectedBagIndex} (${selectedBox.price.toLocaleString("vi-VN")}đ)`}
              </button>
            </div>
          </div>
        )}

        {/* NẠP TIỀN */}
        {activeTab === "topup" && (
          <div style={{ backgroundColor: "#111827", padding: "30px", borderRadius: "20px", maxWidth: "480px", margin: "0 auto", border: "1px solid #1f293d", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h2 style={{ color: "#10b981", textAlign: "center", margin: "0 0 20px 0" }}>💳 CỔNG NẠP TIỀN AUTO</h2>
            <div style={{ backgroundColor: "#1f293d", padding: "20px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #374151" }}>
              <div style={{ marginBottom: "10px" }}><b>Ngân Hàng:</b> <span style={{ color: "#60a5fa" }}>{bankInfo.bankName}</span></div>
              <div style={{ marginBottom: "10px" }}><b>Số Tài Khoản:</b> <span style={{ color: "#f59e0b", fontSize: "20px", fontWeight: "bold" }}>{bankInfo.accountNumber}</span></div>
              <div style={{ marginBottom: "10px" }}><b>Chủ Tài Khoản:</b> {bankInfo.accountHolder}</div>
              <div><b>Nội dung chuyển:</b> <span style={{ color: "#ef4444", fontWeight: "bold", background: "#111827", padding: "2px 8px", borderRadius: "4px" }}>NAP {username}</span></div>
            </div>
            <form onSubmit={handleTopup}>
              <input type="number" placeholder="Nhập số tiền đã chuyển" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "#1f293d", color: "#fff", marginBottom: "16px", boxSizing: "border-box" }} />
              <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>XÁC NHẬN ĐÃ CHUYỂN TIÊN</button>
            </form>
          </div>
        )}

        {/* TÚI ĐỒ */}
        {activeTab === "withdraw" && (
          <div style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid #1f293d" }}>
            <h2 style={{ margin: "0 0 20px 0" }}>🎒 RÚT VẬT PHẨM DÃ XÉ ({inventory.length})</h2>
            {inventory.length === 0 ? <p style={{ color: "#9ca3af" }}>Bạn chưa xé túi mù nào.</p> : inventory.map((item) => (
              <div key={item.id} style={{ backgroundColor: "#1f293d", padding: "16px", borderRadius: "10px", margin: "10px 0", border: "1px solid #374151" }}>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>{item.categoryName}</div>
                <div style={{ color: "#f59e0b", marginTop: "6px", fontFamily: "monospace" }}>{item.accountInfo}</div>
              </div>
            ))}
          </div>
        )}

        {/* ADMIN PANEL */}
        {activeTab === "admin" && role === "admin" && (
          <div style={{ backgroundColor: "#111827", padding: "30px", borderRadius: "20px", border: "1px solid #dc2626", boxShadow: "0 0 20px rgba(220,38,38,0.2)" }}>
            <h2 style={{ color: "#ef4444", borderBottom: "1px solid #374151", paddingBottom: "12px", marginTop: "0" }}>⚙️ PANEL QUẢN TRỊ ADMIN SERVER</h2>
            
            <div style={{ margin: "20px 0", padding: "20px", backgroundColor: "#1f293d", borderRadius: "12px" }}>
              <h3 style={{ color: "#f59e0b", marginTop: "0" }}>1. Cài Đặt Ngân Hàng (Trang Nạp)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <input type="text" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} placeholder="Tên Ngân Hàng" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#111827", color: "#fff" }} />
                <input type="text" value={bankInfo.accountNumber} onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })} placeholder="Số Tài Khoản" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#111827", color: "#fff" }} />
                <input type="text" value={bankInfo.accountHolder} onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })} placeholder="Chủ Tài Khoản" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#111827", color: "#fff" }} />
              </div>
            </div>

            <div style={{ margin: "20px 0", padding: "20px", backgroundColor: "#1f293d", borderRadius: "12px" }}>
              <h3 style={{ color: "#f59e0b", marginTop: "0" }}>2. Cộng Số Dư User Test</h3>
              <button onClick={() => setBalance(prev => prev + 100000)} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", marginRight: "10px", cursor: "pointer", fontWeight: "bold" }}>+ 100.000đ</button>
              <button onClick={() => setBalance(prev => prev + 500000)} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", marginRight: "10px", cursor: "pointer", fontWeight: "bold" }}>+ 500.000đ</button>
              <button onClick={() => setBalance(0)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Reset Số Dư = 0đ</button>
            </div>

            <div style={{ margin: "20px 0", padding: "20px", backgroundColor: "#1f293d", borderRadius: "12px" }}>
              <h3 style={{ color: "#f59e0b", marginTop: "0" }}>3. Thêm Acc Mới Vào Kho Server</h3>
              <form onSubmit={handleAddAccountToStock} style={{ display: "flex", gap: "10px" }}>
                <select value={newAccGame} onChange={(e) => setNewAccGame(e.target.value)} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "#111827", color: "#fff", border: "1px solid #374151" }}>
                  <option value="LIÊN QUÂN">LIÊN QUÂN</option>
                  <option value="FREE FIRE">FREE FIRE</option>
                  <option value="ROBLOX">ROBLOX</option>
                  <option value="FC MOBILE">FC MOBILE</option>
                </select>
                <input type="text" value={newAccInfo} onChange={(e) => setNewAccInfo(e.target.value)} placeholder="TK: abc | MK: 123 | Chi tiết..." style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#111827", color: "#fff" }} />
                <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>THÊM ACC</button>
              </form>
            </div>

            <div style={{ margin: "20px 0", padding: "20px", backgroundColor: "#1f293d", borderRadius: "12px" }}>
              <h3 style={{ color: "#f59e0b", marginTop: "0" }}>4. Kho Acc Server Hóa Đơn ({serverStock.length})</h3>
              {serverStock.map(acc => (
                <div key={acc.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #374151", padding: "10px 0" }}>
                  <div><b>[{acc.game}]</b> {acc.accountInfo}</div>
                  <div style={{ color: acc.status === "AVAILABLE" ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
                    {acc.status === "AVAILABLE" ? "CÒN HÀNG" : "ĐÃ BÁN"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* POPUP TRÚNG VẬT PHẨM */}
      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ backgroundColor: "#111827", padding: "30px", borderRadius: "20px", textAlign: "center", maxWidth: "420px", border: "2px solid #f59e0b", boxShadow: "0 0 40px rgba(245,158,11,0.4)" }}>
            <h2 style={{ color: "#f59e0b", fontSize: "24px", margin: "0 0 16px 0" }}>🎉 CHÚC MỪNG TRÚNG ACC!</h2>
            <p style={{ color: "#10b981", fontWeight: "bold", background: "#1f293d", padding: "12px", borderRadius: "8px", wordBreak: "break-all" }}>{wonReward}</p>
            <button onClick={() => setWonReward(null)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "16px" }}>Đóng / Xem Túi Đồ</button>
          </div>
        </div>
      )}
    </div>
  );
}
