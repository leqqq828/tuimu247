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

  // Ảnh banner chuẩn từng Game
  const [categories] = useState<MysteryCategory[]>([
    { 
      id: 1, 
      name: "TÚI MÙ LIÊN QUÂN 149K", 
      price: 149000, 
      plays: "12,890", 
      views: "45,100", 
      game: "LIÊN QUÂN", 
      banner: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" // Ảnh chuẩn Liên Quân
    },
    { 
      id: 2, 
      name: "TÚI MÙ FREE FIRE 20K - AK RỒNG XANH", 
      price: 20000, 
      plays: "34,210", 
      views: "89,000", 
      game: "FREE FIRE", 
      banner: "https://i.ibb.co/Hqd44P9/free-fire.jpg" // Ảnh Free Fire
    },
    { 
      id: 3, 
      name: "TÚI MÙ ROBLOX BLOX FRUIT 30K", 
      price: 30000, 
      plays: "18,400", 
      views: "52,300", 
      game: "ROBLOX", 
      banner: "https://i.ibb.co/C0xT8Zg/roblox.jpg" 
    },
    { 
      id: 4, 
      name: "TÚI MÙ FC MOBILE 50K", 
      price: 50000, 
      plays: "8,900", 
      views: "21,000", 
      game: "FC MOBILE", 
      banner: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" 
    }
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

    const availableAccs = serverStock.filter(item => item.status === "AVAILABLE" && item.game === selectedBox.game);
    const fallbackAccs = serverStock.filter(item => item.status === "AVAILABLE");
    
    const targetPool = availableAccs.length > 0 ? availableAccs : fallbackAccs;

    if (targetPool.length === 0) {
      alert("Kho Nick game này hiện tại đang hết! Vui lòng báo Admin thêm acc.");
      return;
    }

    setBalance(prev => prev - selectedBox.price);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpening(false);
      
      const selectedAcc = targetPool[Math.floor(Math.random() * targetPool.length)];
      setServerStock(prev => prev.map(acc => acc.id === selectedAcc.id ? { ...acc, status: "SOLD" } : acc));

      const rewardText = "ACC TRÚNG: " + selectedAcc.accountInfo;
      setWonReward(rewardText);

      const newItem: InventoryItem = {
        id: selectedAcc.id,
        categoryName: selectedBox.name,
        rewardName: "Acc Game " + selectedBox.game,
        accountInfo: selectedAcc.accountInfo,
        date: new Date().toLocaleTimeString("vi-VN")
      };

      setInventory(prev => [newItem, ...prev]);
    }, 1200);
  };

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(topupAmount);
    if (!val || val < 10000) return;
    setBalance(prev => prev + val);
    alert("Đã cộng " + val.toLocaleString("vi-VN") + "đ vào tài khoản!");
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
    alert("Thêm Acc thành công! Kiểm tra ở Danh sách phía dưới.");
  };

  return (
    <div style={{ backgroundColor: "#0b0e14", color: "#fff", fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      {/* HEADER MENU BAN ĐẦU */}
      <header style={{ backgroundColor: "#151921", borderBottom: "1px solid #232a3b", padding: "12px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div onClick={() => setActiveTab("home")} style={{ fontSize: "22px", fontWeight: "bold", color: "#10b981", cursor: "pointer" }}>
            SHOPACC89.COM
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#ef4444" : "#1f2937", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Trang Chủ</button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: activeTab === "withdraw" ? "#ef4444" : "#1f2937", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Rút Vật Phẩm ({inventory.length})</button>
            <button onClick={() => setActiveTab("topup")} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Nạp Tiền</button>
            {role === "admin" && (
              <button onClick={() => setActiveTab("admin")} style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>[ADMIN PANEL]</button>
            )}
          </div>

          <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>User: <b>{username}</b> | Số dư: <b style={{ color: "#10b981" }}>{balance.toLocaleString("vi-VN")}đ</b></span>
            <button onClick={() => setRole(role === "user" ? "admin" : "user")} style={{ backgroundColor: "#374151", color: "#eab308", border: "1px solid #eab308", padding: "3px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>
              Chế độ: {role.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      {/* BODY CHÍNH */}
      <main style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 15px" }}>
        {/* 1. TRANG CHỦ HOÀN TOÀN GIỐNG BAN ĐẦU */}
        {activeTab === "home" && (
          <div>
            <h2 style={{ fontSize: "18px", color: "#fff", marginBottom: "16px", textTransform: "uppercase" }}>DANH MỤC TÚI MÙ GAME</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {categories.map((cat) => (
                <div key={cat.id} style={{ backgroundColor: "#151921", borderRadius: "12px", border: "1px solid #232a3b", overflow: "hidden", padding: "12px" }}>
                  <img src={cat.banner} alt={cat.name} onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"; }} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                  <h3 style={{ fontSize: "14px", color: "#fff", margin: "12px 0 6px 0", height: "38px", overflow: "hidden" }}>{cat.name}</h3>
                  <div style={{ color: "#10b981", fontWeight: "bold", marginBottom: "12px", fontSize: "14px" }}>Giá xé: {cat.price.toLocaleString("vi-VN")}đ / lượt</div>
                  
                  {/* Nút XEM TẤT CẢ đỏ chót chuẩn bản cũ */}
                  <button onClick={() => handleOpenDetail(cat)} style={{ width: "100%", backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "10px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
                    XEM TẤT CẢ ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. TRANG XE TÚI MÙ CHI TIẾT */}
        {activeTab === "detail" && selectedBox && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#374151", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "16px" }}>← Quay lại</button>
            
            <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "16px", border: "1px solid #232a3b", textAlign: "center" }}>
              <h2 style={{ color: "#eab308", margin: "0 0 20px 0" }}>{selectedBox.name}</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "12px", marginBottom: "24px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num} onClick={() => setSelectedBagIndex(num)} style={{ backgroundColor: selectedBagIndex === num ? "#312e81" : "#0f131c", border: selectedBagIndex === num ? "2px solid #eab308" : "1px solid #374151", borderRadius: "10px", padding: "16px 8px", cursor: "pointer" }}>
                    <div style={{ fontSize: "24px", color: "#eab308", fontWeight: "bold" }}>BOX</div>
                    <div style={{ fontSize: "11px", color: "#fff", marginTop: "6px" }}>TÚI SỐ {num}</div>
                  </div>
                ))}
              </div>

              {/* NÚT XÉ VẬT PHẨM BẢN CŨ */}
              <button onClick={handleRipOpen} disabled={isOpening} style={{ backgroundColor: "#f97316", color: "#fff", border: "none", padding: "14px 40px", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
                {isOpening ? "ĐANG XÉ TÚI MÙ..." : `XÉ TÚI MÙ SỐ ${selectedBagIndex} (${selectedBox.price.toLocaleString("vi-VN")}đ)`}
              </button>
            </div>
          </div>
        )}

        {/* 3. TRANG NẠP TIỀN */}
        {activeTab === "topup" && (
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", maxWidth: "480px", margin: "0 auto", border: "1px solid #232a3b" }}>
            <h2 style={{ color: "#10b981", textAlign: "center", marginTop: "0" }}>NẠP TIỀN TỰ ĐỘNG</h2>
            <div style={{ backgroundColor: "#0f131c", padding: "16px", borderRadius: "8px", margin: "16px 0", border: "1px solid #374151" }}>
              <p style={{ margin: "6px 0" }}><b>Ngân Hàng:</b> {bankInfo.bankName}</p>
              <p style={{ margin: "6px 0" }}><b>Số Tài Khoản:</b> <span style={{ color: "#eab308", fontSize: "18px", fontWeight: "bold" }}>{bankInfo.accountNumber}</span></p>
              <p style={{ margin: "6px 0" }}><b>Chủ Tài Khoản:</b> {bankInfo.accountHolder}</p>
              <p style={{ margin: "6px 0" }}><b>Cú pháp chuyển:</b> <span style={{ color: "#ef4444", fontWeight: "bold" }}>NAP {username}</span></p>
            </div>
            <form onSubmit={handleTopup}>
              <input type="number" placeholder="Nhập số tiền đã chuyển" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #374151", backgroundColor: "#0f131c", color: "#fff", marginBottom: "12px", boxSizing: "border-box" }} />
              <button type="submit" style={{ width: "100%", backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>XÁC NHẬN ĐÃ CHUYỂN TIỀN</button>
            </form>
          </div>
        )}

        {/* 4. TRANG RÚT VẬT PHẨM */}
        {activeTab === "withdraw" && (
          <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "12px" }}>
            <h2 style={{ marginTop: "0" }}>RÚT VẬT PHẨM ({inventory.length})</h2>
            {inventory.length === 0 ? <p style={{ color: "#9ca3af" }}>Bạn chưa có vật phẩm nào.</p> : inventory.map((item) => (
              <div key={item.id} style={{ backgroundColor: "#0f131c", padding: "12px", borderRadius: "8px", margin: "8px 0", border: "1px solid #374151" }}>
                <div><b>{item.categoryName}</b> - {item.rewardName}</div>
                <div style={{ color: "#eab308", marginTop: "4px", fontWeight: "bold" }}>{item.accountInfo}</div>
              </div>
            ))}
          </div>
        )}

        {/* 5. ADMIN PANEL RÕ RÀNG */}
        {activeTab === "admin" && role === "admin" && (
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", border: "1px solid #dc2626" }}>
            <h2 style={{ color: "#ef4444", borderBottom: "1px solid #374151", paddingBottom: "10px", marginTop: "0" }}>PANEL QUẢN TRỊ ADMIN</h2>
            
            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308", marginTop: "0" }}>1. Sửa Ngân Hàng Nạp Tiền</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <input type="text" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} style={{ padding: "8px", backgroundColor: "#151921", color: "#fff", border: "1px solid #374151" }} />
                <input type="text" value={bankInfo.accountNumber} onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })} style={{ padding: "8px", backgroundColor: "#151921", color: "#fff", border: "1px solid #374151" }} />
                <input type="text" value={bankInfo.accountHolder} onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })} style={{ padding: "8px", backgroundColor: "#151921", color: "#fff", border: "1px solid #374151" }} />
              </div>
            </div>

            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308", marginTop: "0" }}>2. Thêm Acc Vào Kho Server</h3>
              <form onSubmit={handleAddAccountToStock} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <select value={newAccGame} onChange={(e) => setNewAccGame(e.target.value)} style={{ padding: "8px", backgroundColor: "#151921", color: "#fff", border: "1px solid #374151" }}>
                  <option value="LIÊN QUÂN">LIÊN QUÂN</option>
                  <option value="FREE FIRE">FREE FIRE</option>
                  <option value="ROBLOX">ROBLOX</option>
                  <option value="FC MOBILE">FC MOBILE</option>
                </select>
                <input type="text" value={newAccInfo} onChange={(e) => setNewAccInfo(e.target.value)} placeholder="Nhập TK | MK | Note..." style={{ flex: 1, padding: "8px", backgroundColor: "#151921", color: "#fff", border: "1px solid #374151", minWidth: "200px" }} />
                <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>+ THÊM ACC</button>
              </form>
            </div>

            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308", marginTop: "0" }}>3. Danh Sách Acc Đang Có ({serverStock.length})</h3>
              {serverStock.map(acc => (
                <div key={acc.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #232a3b", padding: "8px 0", fontSize: "13px" }}>
                  <div><b style={{ color: "#2563eb" }}>[{acc.game}]</b> {acc.accountInfo}</div>
                  <div style={{ color: acc.status === "AVAILABLE" ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
                    {acc.status === "AVAILABLE" ? "CÒN HÀNG" : "ĐÃ BÁN"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* POPUP TRÚNG THƯỞNG */}
      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.😎", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", textAlign: "center", maxWidth: "400px", border: "1px solid #eab308" }}>
            <h2 style={{ color: "#eab308", marginTop: 0 }}>🎉 CHÚC MỪNG BẠN!</h2>
            <p style={{ color: "#10b981", fontWeight: "bold", wordBreak: "break-all" }}>{wonReward}</p>
            <button onClick={() => setWonReward(null)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
