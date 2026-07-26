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

export default function App() {
  const [balance, setBalance] = useState<number>(500000);
  const [username] = useState<string>("Gamer_Pro89");
  const [activeTab, setActiveTab] = useState<"home" | "detail" | "withdraw" | "topup">("home");
  const [selectedBox, setSelectedBox] = useState<MysteryCategory | null>(null);
  const [selectedBagIndex, setSelectedBagIndex] = useState<number>(1);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState<string>("");

  const MYSTERY_CATEGORIES: MysteryCategory[] = [
    {
      id: 1,
      name: "TÚI MÙ LIÊN QUÂN 149K",
      price: 149000,
      plays: "12,890",
      views: "45,100",
      game: "LIÊN QUÂN",
      banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600"
    },
    {
      id: 2,
      name: "TÚI MÙ FREE FIRE 20K - AK RỒNG XANH",
      price: 20000,
      plays: "34,210",
      views: "89,000",
      game: "FREE FIRE",
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"
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

  const handleOpenDetail = (category: MysteryCategory) => {
    setSelectedBox(category);
    setSelectedBagIndex(1);
    setActiveTab("detail");
  };

  const handleRipOpen = () => {
    if (!selectedBox) return;

    if (balance < selectedBox.price) {
      alert("⚠️ Số dư không đủ! Vui lòng Nạp Tiền.");
      setActiveTab("topup");
      return;
    }

    setBalance(prev => prev - selectedBox.price);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpening(false);
      const rewards = [
        "ACC VIP: Full Tướng + Skin SSS Siêu Cấp",
        "ACC NGẪU NHIÊN: Có 50 Tướng + 20K Quân Huy",
        "ACC TÂN THỦ: Đã nâng cấp max VIP"
      ];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setWonReward(randomReward);

      const newItem: InventoryItem = {
        id: "ACC-" + Math.floor(100000 + Math.random() * 900000),
        categoryName: selectedBox.name,
        rewardName: randomReward,
        accountInfo: "TK: shopacc" + Math.floor(Math.random() * 8900) + " | MK: Pass89@" + Math.floor(Math.random() * 99),
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
    alert(✅ Đã nạp ${val.toLocaleString("vi-VN")}đ!);
    setTopupAmount("");
    setActiveTab("home");
  };

  return (
    <div style={{ backgroundColor: "#0b0e14", color: "#f3f4f6", fontFamily: "sans-serif", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#151921", borderBottom: "1px solid #232a3b", padding: "12px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => setActiveTab("home")} style={{ fontSize: "20px", fontWeight: "bold", color: "#10b981", cursor: "pointer" }}>
            🎁 SHOPACC89.COM
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#ef4444" : "#1f2937", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Trang Chủ</button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: activeTab === "withdraw" ? "#ef4444" : "#1f2937", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Rút Vật Phẩm ({inventory.length})</button>
            <button onClick={() => setActiveTab("topup")} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Nạp Tiền</button>
          </div>
          <div style={{ fontSize: "13px" }}>👤 {username} | 💰 <b style={{ color: "#10b981" }}>{balance.toLocaleString("vi-VN")}đ</b></div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 16px" }}>
        {activeTab === "home" && (
          <div>
            <h2 style={{ fontSize: "18px", color: "#fff", marginBottom: "16px" }}>DANH MỤC TÚI MÙ GAME</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {MYSTERY_CATEGORIES.map((cat) => (
                <div key={cat.id} style={{ backgroundColor: "#151921", borderRadius: "12px", border: "1px solid #232a3b", overflow: "hidden", padding: "16px" }}>
                  <img src={cat.banner} alt={cat.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
                  <h3 style={{ fontSize: "15px", color: "#fff", margin: "12px 0 8px 0" }}>{cat.name}</h3>
                  <div style={{ color: "#10b981", fontWeight: "bold", marginBottom: "12px" }}>Giá: {cat.price.toLocaleString("vi-VN")}đ / lượt</div>
                  <button onClick={() => handleOpenDetail(cat)} style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "10px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>XEM TẤT CẢ ➔</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "detail" && selectedBox && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#374151", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "16px" }}>← Quay lại</button>
            <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "16px", border: "1px solid #232a3b", textAlign: "center" }}>
              <h2 style={{ color: "#eab308", margin: "0 0 20px 0" }}>{selectedBox.name}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num} onClick={() => setSelectedBagIndex(num)} style={{ backgroundColor: selectedBagIndex === num ? "#312e81" : "#0f131c", border: selectedBagIndex === num ? "2px solid #eab308" : "1px solid #374151", borderRadius: "12px", padding: "20px", cursor: "pointer" }}>
                    <div style={{ fontSize: "32px" }}>🎁</div>
                    <div style={{ fontSize: "12px", color: "#fff", marginTop: "8px" }}>TÚI MÙ SỐ {num}</div>
                  </div>
                ))}
              </div>
              <button onClick={handleRipOpen} disabled={isOpening} style={{ backgroundColor: "#f97316", color: "#fff", border: "none", padding: "14px 40px", borderRadius: "12px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
                {isOpening ? "ĐANG XÉ..." : `🎁 XÉ NGAY (${selectedBox.price.toLocaleString("vi-VN")}đ)`}
              </button>
            </div>
          </div>
        )}

        {activeTab === "withdraw" && (
          <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "12px" }}>
            <h2>🎒 KHO RÚT VẬT PHẨM ({inventory.length})</h2>
            {inventory.map((item) => (
              <div key={item.id} style={{ backgroundColor: "#0f131c", padding: "12px", borderRadius: "8px", margin: "8px 0" }}>
                <div><b>{item.categoryName}</b> - {item.rewardName}</div>
                <div style={{ color: "#eab308", marginTop: "4px" }}>{item.accountInfo}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "topup" && (
          <form onSubmit={handleTopup} style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "12px", maxWidth: "400px", margin: "0 auto" }}>
            <h2>💳 NẠP TIỀN</h2>
            <input type="number" placeholder="Nhập số tiền" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} style={{ width: "100%", padding: "10px", margin: "12px 0", boxSizing: "border-box" }} />
            <button type="submit" style={{ width: "100%", backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px" }}>XÁC NHẬN NẠP</button>
          </form>
        )}
      </main>

      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.😎", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", textAlign: "center" }}>
            <h2 style={{ color: "#eab308" }}>🎉 CHÚC MỪNG!</h2>
            <p style={{ color: "#10b981", fontWeight: "bold" }}>{wonReward}</p>
            <button onClick={() => setWonReward(null)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginTop: "12px" }}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
