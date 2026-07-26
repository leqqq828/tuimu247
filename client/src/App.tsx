import React, { useState } from "react";

// --- INTERFACES ---
interface MysteryCategory {
  id: number;
  name: string;
  price: number;
  plays: string;
  views: string;
  game: string;
  banner: string;
  isHot?: boolean;
}

interface InventoryItem {
  id: string;
  categoryName: string;
  rewardName: string;
  accountInfo: string;
  date: string;
}

export default function App() {
  // --- STATES ---
  const [balance, setBalance] = useState<number>(500000); // Số dư mẫu 500k
  const [username, setUsername] = useState<string>("Gamer_Pro89");
  const [activeTab, setActiveTab] = useState<"home" | "detail" | "withdraw" | "topup" | "history">("home");
  
  const [selectedBox, setSelectedBox] = useState<MysteryCategory | null>(null);
  const [selectedBagIndex, setSelectedBagIndex] = useState<number | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  
  // Modals
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState<string>("");

  // --- MỤC TÚI MÙ BÊN NGOÀI TRANG CHỦ ---
  const MYSTERY_CATEGORIES: MysteryCategory[] = [
    {
      id: 1,
      name: "TÚI MÙ LIÊN QUÂN 149K",
      price: 149000,
      plays: "12,890",
      views: "45,100",
      game: "LIÊN QUÂN",
      banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600",
      isHot: true
    },
    {
      id: 2,
      name: "TÚI MÙ FREE FIRE 20K - AK RỒNG XANH",
      price: 20000,
      plays: "34,210",
      views: "89,000",
      game: "FREE FIRE",
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
      isHot: true
    },
    {
      id: 3,
      name: "TÚI MÙ ROBLOX BLOX FRUIT 30K",
      price: 30000,
      plays: "18,400",
      views: "52,300",
      game: "ROBLOX",
      banner: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600"
    },
    {
      id: 4,
      name: "TÚI MÙ FC MOBILE 50K",
      price: 50000,
      plays: "8,900",
      views: "21,000",
      game: "FC MOBILE",
      banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600"
    }
  ];

  // --- XỬ LÝ SỰ KIỆN ---
  const handleOpenDetail = (category: MysteryCategory) => {
    setSelectedBox(category);
    setSelectedBagIndex(1); // Mặc định chọn túi số 1
    setActiveTab("detail");
  };

  const handleRipOpen = () => {
    if (!selectedBox) return;

    if (balance < selectedBox.price) {
      alert("⚠️ Số dư không đủ! Vui lòng Nạp Tiền để tiếp tục xé túi mù.");
      setActiveTab("topup");
      return;
    }

    // Trừ tiền
    setBalance(prev => prev - selectedBox.price);
    setIsOpening(true);

    // Giả lập mở quà sau 2 giây
    setTimeout(() => {
      setIsOpening(false);
      
      const rewards = [
        "ACC VIP: Full Tướng + Skin SSS Siêu Cấp",
        "ACC NGẪU NHIÊN: Có 50 Tướng + 20K Quân Huy",
        "ACC TÂN THỦ: Đã nâng cấp max VIP",
        "THẺ QUÀ TẶNG: Đổi 100.000đ vào tài khoản"
      ];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setWonReward(randomReward);

      // Thêm vào kho vật phẩm
      const newItem: InventoryItem = {
        id: "ACC-" + Math.floor(100000 + Math.random() * 900000),
        categoryName: selectedBox.name,
        rewardName: randomReward,
        accountInfo: "TK: shopacc" + Math.floor(Math.random() * 8900) + " | MK: Pass89@" + Math.floor(Math.random() * 99),
        date: new Date().toLocaleTimeString("vi-VN") + " - " + new Date().toLocaleDateString("vi-VN")
      };

      setInventory(prev => [newItem, ...prev]);
    }, 2000);
  };

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(topupAmount);
    if (!val || val < 10000) {
      alert("Vui lòng nhập số tiền từ 10.000đ trở lên!");
      return;
    }
    setBalance(prev => prev + val);
    alert(✅ Nạp thành công ${val.toLocaleString("vi-VN")}đ vào tài khoản!);
    setTopupAmount("");
    setActiveTab("home");
  };

  return (
    <div style={{ backgroundColor: "#0b0e14", color: "#f3f4f6", fontFamily: "'Segoe UI', Roboto, sans-serif", minHeight: "100vh" }}>
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header style={{ backgroundColor: "#151921", borderBottom: "1px solid #232a3b", padding: "12px 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          
          {/* LOGO */}
          <div onClick={() => setActiveTab("home")} style={{ fontSize: "22px", fontWeight: "900", color: "#10b981", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ backgroundColor: "#10b981", color: "#000", padding: "2px 8px", borderRadius: "6px" }}>🎁</span>
            SHOPACC89.COM
          </div>

          {/* MENU CHÍNH */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#ef4444" : "transparent", color: "#fff", border: "1px solid #374151", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>
              ☰ Trang Chủ
            </button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: activeTab === "withdraw" ? "#ef4444" : "transparent", color: "#fff", border: "1px solid #374151", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>
              🎒 Rút Vật Phẩm ({inventory.length})
            </button>
            <button onClick={() => setActiveTab("topup")} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>
              💳 Nạp Tiền
            </button>
          </div>

          {/* USER INFO */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#0f131c", padding: "6px 14px", borderRadius: "8px", border: "1px solid #232a3b" }}>
            <span style={{ fontSize: "13px" }}>👤 <b>{username}</b></span>
            <span style={{ color: "#10b981", fontWeight: "bold", fontSize: "13px" }}>| 💰 {balance.toLocaleString("vi-VN")}đ</span>
          </div>

        </div>
      </header>

      {/* 2. MAIN CONTENT CONTAINERS */}
      <main style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 16px" }}>
        
        {/* ================= TRANG CHỦ: DANH SÁCH MỤC TÚI MÙ ================= */}
        {activeTab === "home" && (
          <div>
            <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", border: "1px solid #232a3b", marginBottom: "24px", textAlign: "center" }}>
              <h1 style={{ color: "#ef4444", fontSize: "26px", fontWeight: "900", margin: "0 0 8px 0" }}>
                🔥 HỆ THỐNG TÚI MÙ TỰ ĐỘNG - XÉ LÀ TRÚNG ACC VIP
              </h1>
              <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>
                Chọn danh mục Túi mù bên dưới -> Bấm Xem Tất Cả -> Chọn số thứ tự túi mù để XÉ NGAY!
              </p>
            </div>

            <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#fff", marginBottom: "16px", textTransform: "uppercase" }}>
              Danh Mục Túi Mù Game
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px" }}>
              {MYSTERY_CATEGORIES.map((cat) => (
                <div key={cat.id} style={{ backgroundColor: "#151921", borderRadius: "12px", border: "1px solid #232a3b", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <img src={cat.banner} alt={cat.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  
                  <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#fff", margin: "0 0 8px 0" }}>{cat.name}</h3>
                      <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Đã chơi: {cat.plays} lượt</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>Lượt xem: {cat.views}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "bold", color: "#10b981", marginBottom: "12px" }}>
                        Giá xé: {cat.price.toLocaleString("vi-VN")}đ / lượt
                      </div>

                      {/* NÚT XEM TẤT CẢ DEEP LINK VÀO TRANG CHI TIẾT */}
                      <button 
                        onClick={() => handleOpenDetail(cat)}
                        style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "10px", borderRadius: "20px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}
                      >
                        XEM TẤT CẢ ➔
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TRANG CHI TIẾT: XÉ TÚI MÙ (ĐÚNG NHƯ ẢNH MẪU) ================= */}
        {activeTab === "detail" && selectedBox && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#374151", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "16px", fontWeight: "bold" }}>
              ← Quay lại danh mục
            </button>

            {/* DANH SÁCH 8 TÚI MÙ ĐỂ CHỌN */}
            <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "16px", border: "1px solid #232a3b", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#eab308", margin: "0 0 16px 0", textAlign: "center" }}>
                {selectedBox.name}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div 
                    key={num}
                    onClick={() => setSelectedBagIndex(num)}
                    style={{
                      backgroundColor: selectedBagIndex === num ? "#312e81" : "#0f131c",
                      border: selectedBagIndex === num ? "3px solid #eab308" : "1px solid #374151",
                      borderRadius: "12px",
                      padding: "12px",
                      textAlign: "center",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.2s"
                    }}
                  >
                    <span style={{ position: "absolute", top: "8px", left: "8px", backgroundColor: "#eab308", color: "#000", fontWeight: "900", fontSize: "11px", padding: "2px 6px", borderRadius: "4px" }}>
                      {num}
                    </span>
                    <div style={{ fontSize: "40px", margin: "10px 0" }}>🎁</div>
                    <div style={{ fontSize: "12px", fontWeight: "bold", color: "#fff" }}>TÚI MÙ SỐ {num}</div>
                  </div>
                ))}
              </div>

              {/* NÚT XÉ NGAY & LỊCH SỬ */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "24px" }}>
                <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: "#374151", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  📜 Lịch sử
                </button>

                <button 
                  onClick={handleRipOpen}
                  disabled={isOpening}
                  style={{
                    background: "linear-gradient(to right, #f97316, #dc2626)",
                    color: "#fff",
                    border: "none",
                    padding: "14px 40px",
                    borderRadius: "12px",
                    fontWeight: "900",
                    fontSize: "18px",
                    cursor: isOpening ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)"
                  }}
                >
                  {isOpening ? "⌛ ĐANG XÉ TÚI MÙ..." : `🎁 XÉ NGAY (${selectedBox.price.toLocaleString("vi-VN")}đ/lượt)`}
                </button>
              </div>
            </div>

            {/* QUY ĐỊNH & PHẦN THƯỞNG BÊN DƯỚI */}
            <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "12px", border: "1px solid #232a3b" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#fff", marginTop: 0 }}>Quy định & Phần thưởng</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px", color: "#9ca3af" }}>
                <div>💰 Giá lượt xé: <b style={{ color: "#fff" }}>{selectedBox.price.toLocaleString("vi-VN")}đ / 1 lượt</b></div>
                <div>📁 Danh mục: <b style={{ color: "#fff" }}>{selectedBox.game}</b></div>
                <div>🎲 Mỗi lần xé: <b style={{ color: "#fff" }}>Tối đa 1 lượt</b></div>
                <div>📅 Giới hạn ngày: <b style={{ color: "#fff" }}>Không giới hạn</b></div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TRANG RÚT VẬT PHẨM (KHO LƯU ACC ĐÃ XÉ TRÚNG) ================= */}
        {activeTab === "withdraw" && (
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "16px", border: "1px solid #232a3b" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#fff", marginTop: 0, borderBottom: "1px solid #232a3b", paddingBottom: "12px" }}>
              🎒 KHO VẬT PHẨM & TÀI KHOẢN ĐÃ XÉ TRÚNG ({inventory.length})
            </h2>

            {inventory.length === 0 ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px 0" }}>
                Bạn chưa xé túi mù nào. Hãy ra Trang chủ bấm "XÉ NGAY" để thử vận may!
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                {inventory.map((item) => (
                  <div key={item.id} style={{ backgroundColor: "#0f131c", padding: "16px", borderRadius: "8px", border: "1px solid #374151", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "#10b981", fontWeight: "bold" }}>{item.categoryName} - [{item.date}]</div>
                      <div style={{ fontSize: "15px", fontWeight: "bold", color: "#fff", margin: "4px 0" }}>{item.rewardName}</div>
                      <div style={{ fontSize: "13px", color: "#eab308", backgroundColor: "#1f2937", padding: "4px 8px", borderRadius: "4px", display: "inline-block" }}>
                        🔑 Thông tin Nick: {item.accountInfo}
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(✅ Đã sao chép tài khoản:\n${item.accountInfo})}
                      style={{ backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      LẤY THÔNG TIN ACC
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TRANG NẠP TIỀN ================= */}
        {activeTab === "topup" && (
          <div style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "#151921", padding: "24px", borderRadius: "16px", border: "1px solid #232a3b" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#fff", marginTop: 0, textAlign: "center" }}>
              💳 NẠP TIỀN VÀO TÀI KHOẢN
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", marginBottom: "20px" }}>
              Hệ thống nạp tự động 1:1 không chiết khấu.
            </p>

            <form onSubmit={handleTopup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>Nhập số tiền muốn nạp (VNĐ)</label>
                <input 
                  type="number" 
                  placeholder="Ví dụ: 100000" 
                  value={topupAmount} 
                  onChange={(e) => setTopupAmount(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "#0f131c", color: "#fff", boxSizing: "border-box" }}
                  required
                />
              </div>

              <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>
                XÁC NHẬN NẠP TIỀN
              </button>
            </form>
          </div>
        )}

      </main>

      {/* MODAL KẾT QUẢ KHI XÉ THÀNH CÔNG */}
      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#151921", padding: "32px", borderRadius: "20px", border: "2px solid #eab308", textAlign: "center", maxWidth: "400px", width: "90%" }}>
            <div style={{ fontSize: "60px", marginBottom: "12px" }}>🎉</div>
            <h2 style={{ color: "#eab308", margin: "0 0 8px 0" }}>XÉ TÚI MÙ THÀNH CÔNG!</h2>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>Chúc mừng bạn đã trúng:</p>
            
            <div style={{ backgroundColor: "#0f131c", padding: "16px", borderRadius: "10px", color: "#10b981", fontWeight: "bold", fontSize: "16px", margin: "16px 0", border: "1px solid #10b981" }}>
              {wonReward}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setWonReward(null)} style={{ flex: 1, backgroundColor: "#374151", color: "#fff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                Xé Tiếp
              </button>
              <button onClick={() => { setWonReward(null); setActiveTab("withdraw"); }} style={{ flex: 1, backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                Rút Vật Phẩm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0f131c", borderTop: "1px solid #1e2638", padding: "20px", textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "40px" }}>
        © 2026 SHOPACC89.COM - Hệ thống túi mù game uy tín tự động 24/7.
      </footer>

    </div>
  );
