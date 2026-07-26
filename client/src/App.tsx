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

// Cấu trúc dữ liệu Tài Khoản trong Server
interface ServerAccount {
  id: string;
  game: string;
  accountInfo: string; // TK | MK | Thông tin chi tiết
  status: "AVAILABLE" | "SOLD"; // Còn hàng hay Đã bán
}

export default function App() {
  const [balance, setBalance] = useState<number>(500000);
  const [username] = useState<string>("Gamer_Pro89");
  const [role, setRole] = useState<"user" | "admin">("user"); // Quyền hiện tại
  const [activeTab, setActiveTab] = useState<"home" | "detail" | "withdraw" | "topup" | "admin">("home");
  
  const [selectedBox, setSelectedBox] = useState<MysteryCategory | null>(null);
  const [selectedBagIndex, setSelectedBagIndex] = useState<number>(1);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState<string>("");

  // --- DỮ LIỆU CÓ THỂ CHỈNH SỬA BỞI ADMIN ---
  const [bankInfo, setBankInfo] = useState({
    bankName: "MB BANK",
    accountNumber: "0987654321",
    accountHolder: "NGUYEN VAN A",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DemoQR"
  });

  const [categories, setCategories] = useState<MysteryCategory[]>([
    { id: 1, name: "TUI MU LIEN QUAN 149K", price: 149000, plays: "12,890", views: "45,100", game: "LIEN QUAN", banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600" },
    { id: 2, name: "TUI MU FREE FIRE 20K - AK RONG XANH", price: 20000, plays: "34,210", views: "89,000", game: "FREE FIRE", banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" },
    { id: 3, name: "TUI MU ROBLOX BLOX FRUIT 30K", price: 30000, plays: "18,400", views: "52,300", game: "ROBLOX", banner: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600" },
    { id: 4, name: "TUI MU FC MOBILE 50K", price: 50000, plays: "8,900", views: "21,000", game: "FC MOBILE", banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600" }
  ]);

  const [serverStock, setServerStock] = useState<ServerAccount[]>([
    { id: "ACC-001", game: "LIEN QUAN", accountInfo: "TK: lq_vip1 | MK: pass123 | Note: Full Tuong", status: "AVAILABLE" },
    { id: "ACC-002", game: "FREE FIRE", accountInfo: "TK: ff_ak47 | MK: pass456 | Note: AK Rong Xanh LV7", status: "AVAILABLE" },
    { id: "ACC-003", game: "ROBLOX", accountInfo: "TK: roblox_kitsune | MK: pass789 | Note: Trai Kitsune", status: "AVAILABLE" }
  ]);

  // Form thêm Acc mới của Admin
  const [newAccGame, setNewAccGame] = useState("LIEN QUAN");
  const [newAccInfo, setNewAccInfo] = useState("");

  const handleOpenDetail = (category: MysteryCategory) => {
    setSelectedBox(category);
    setSelectedBagIndex(1);
    setActiveTab("detail");
  };

  const handleRipOpen = () => {
    if (!selectedBox) return;

    if (balance < selectedBox.price) {
      alert("So du khong du! Vui long Nap Tien.");
      setActiveTab("topup");
      return;
    }

    // Tìm acc trong kho còn trống
    const availableAccs = serverStock.filter(item => item.status === "AVAILABLE");
    if (availableAccs.length === 0) {
      alert("Kho Nick hien tai dang het! Vui long lien he Admin nap thêm.");
      return;
    }

    setBalance(prev => prev - selectedBox.price);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpening(false);
      
      // Lấy ngẫu nhiên 1 acc trong kho và chuyển thành Đã bán
      const selectedAcc = availableAccs[Math.floor(Math.random() * availableAccs.length)];
      
      setServerStock(prev => prev.map(acc => acc.id === selectedAcc.id ? { ...acc, status: "SOLD" } : acc));

      const rewardText = ACC CHUAN: ${selectedAcc.accountInfo};
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
    alert("Da nhat lenh nap " + val.toLocaleString("vi-VN") + " VND thanh cong!");
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
    alert("Da them Tai Khoan moi vao Kho Server!");
  };

  return (
    <div style={{ backgroundColor: "#0b0e14", color: "#f3f4f6", fontFamily: "sans-serif", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#151921", borderBottom: "1px solid #232a3b", padding: "12px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => setActiveTab("home")} style={{ fontSize: "20px", fontWeight: "bold", color: "#10b981", cursor: "pointer" }}>
            SHOPACC89.COM
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#ef4444" : "#1f2937", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Trang Chu</button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: activeTab === "withdraw" ? "#ef4444" : "#1f2937", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Rut Vat Pham ({inventory.length})</button>
            <button onClick={() => setActiveTab("topup")} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Nap Tien</button>
            {role === "admin" && (
              <button onClick={() => setActiveTab("admin")} style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>[ADMIN PANEL]</button>
            )}
          </div>
          <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>User: <b>{username}</b> | So du: <b style={{ color: "#10b981" }}>{balance.toLocaleString("vi-VN")}d</b></span>
            <button onClick={() => setRole(role === "user" ? "admin" : "user")} style={{ backgroundColor: "#374151", color: "#eab308", border: "1px solid #eab308", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>
              Doi Quyen: {role.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 16px" }}>
        {activeTab === "home" && (
          <div>
            <h2 style={{ fontSize: "18px", color: "#fff", marginBottom: "16px" }}>DANH MUC TUI MU GAME</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {categories.map((cat) => (
                <div key={cat.id} style={{ backgroundColor: "#151921", borderRadius: "12px", border: "1px solid #232a3b", overflow: "hidden", padding: "16px" }}>
                  <img src={cat.banner} alt={cat.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
                  <h3 style={{ fontSize: "15px", color: "#fff", margin: "12px 0 8px 0" }}>{cat.name}</h3>
                  <div style={{ color: "#10b981", fontWeight: "bold", marginBottom: "12px" }}>Gia xe: {cat.price.toLocaleString("vi-VN")}d / luot</div>
                  <button onClick={() => handleOpenDetail(cat)} style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "10px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>XEM TAT CA &#10140;</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "detail" && selectedBox && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#374151", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "16px" }}>&#8592; Quay lai</button>
            <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "16px", border: "1px solid #232a3b", textAlign: "center" }}>
              <h2 style={{ color: "#eab308", margin: "0 0 20px 0" }}>{selectedBox.name}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num} onClick={() => setSelectedBagIndex(num)} style={{ backgroundColor: selectedBagIndex === num ? "#312e81" : "#0f131c", border: selectedBagIndex === num ? "2px solid #eab308" : "1px solid #374151", borderRadius: "12px", padding: "20px", cursor: "pointer" }}>
                    <div style={{ fontSize: "28px", color: "#eab308", fontWeight: "bold" }}>BOX</div>
                    <div style={{ fontSize: "12px", color: "#fff", marginTop: "8px" }}>TUI MU SO {num}</div>
                  </div>
                ))}
              </div>
              <button onClick={handleRipOpen} disabled={isOpening} style={{ backgroundColor: "#f97316", color: "#fff", border: "none", padding: "14px 40px", borderRadius: "12px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
                {isOpening ? "DANG XE TUI..." : `XE NGAY (${selectedBox.price.toLocaleString("vi-VN")}d)`}
              </button>
            </div>
          </div>
        )}

        {activeTab === "topup" && (
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ color: "#10b981", textAlign: "center" }}>THONG TIN NAP TIEN AUTO</h2>
            <div style={{ backgroundColor: "#0f131c", padding: "16px", borderRadius: "8px", margin: "16px 0", border: "1px solid #374151" }}>
              <p><b>Ngan Hang:</b> {bankInfo.bankName}</p>
              <p><b>So Tai Khoan:</b> <span style={{ color: "#eab308", fontSize: "18px", fontWeight: "bold" }}>{bankInfo.accountNumber}</span></p>
              <p><b>Chu Tai Khoan:</b> {bankInfo.accountHolder}</p>
              <p><b>Noi dung chuyen khoan:</b> <span style={{ color: "#ef4444", fontWeight: "bold" }}>NAP {username}</span></p>
            </div>
            <form onSubmit={handleTopup}>
              <input type="number" placeholder="Nhap so tien da chuyen" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "12px", boxSizing: "border-box" }} />
              <button type="submit" style={{ width: "100%", backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold" }}>XAC NHAN DA CHUYEN TIEN</button>
            </form>
          </div>
        )}

        {activeTab === "withdraw" && (
          <div style={{ backgroundColor: "#151921", padding: "20px", borderRadius: "12px" }}>
            <h2>KHO RUT VAT PHAM ({inventory.length})</h2>
            {inventory.map((item) => (
              <div key={item.id} style={{ backgroundColor: "#0f131c", padding: "12px", borderRadius: "8px", margin: "8px 0", border: "1px solid #374151" }}>
                <div><b>{item.categoryName}</b> - {item.rewardName}</div>
                <div style={{ color: "#eab308", marginTop: "4px" }}>{item.accountInfo}</div>
              </div>
            ))}
          </div>
        )}

        {/* --- DÀNH RIÊNG CHO ADMIN --- */}
        {activeTab === "admin" && role === "admin" && (
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px" }}>
            <h2 style={{ color: "#ef4444", borderBottom: "1px solid #374151", paddingBottom: "10px" }}>PANEL QUAN TRI ADMIN SERVER</h2>
            
            {/* 1. CHỈNH SỬA NGÂN HÀNG */}
            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308" }}>1. Cài Đặt Ngân Hàng (Trang Nạp)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <input type="text" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} placeholder="Ten Ngan Hang" style={{ padding: "8px" }} />
                <input type="text" value={bankInfo.accountNumber} onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })} placeholder="So Tai Khoan" style={{ padding: "8px" }} />
                <input type="text" value={bankInfo.accountHolder} onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })} placeholder="Chu Tai Khoan" style={{ padding: "8px" }} />
              </div>
            </div>

            {/* 2. CHỈNH SỬA SỐ DƯ USER */}
            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308" }}>2. Cong / Tru So Du User Hiện Tại</h3>
              <button onClick={() => setBalance(prev => prev + 100000)} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", marginRight: "10px", cursor: "pointer" }}>+ 100.000d</button>
              <button onClick={() => setBalance(prev => prev + 500000)} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", marginRight: "10px", cursor: "pointer" }}>+ 500.000d</button>
              <button onClick={() => setBalance(0)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>Reset So Du ve 0d</button>
            </div>

            {/* 3. THÊM TÀI KHOẢN VÀO KHO SERVER */}
            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308" }}>3. Them Acc Mới Vào Kho Server</h3>
              <form onSubmit={handleAddAccountToStock} style={{ display: "flex", gap: "10px" }}>
                <select value={newAccGame} onChange={(e) => setNewAccGame(e.target.value)} style={{ padding: "8px" }}>
                  <option value="LIEN QUAN">LIEN QUAN</option>
                  <option value="FREE FIRE">FREE FIRE</option>
                  <option value="ROBLOX">ROBLOX</option>
                  <option value="FC MOBILE">FC MOBILE</option>
                </select>
                <input type="text" value={newAccInfo} onChange={(e) => setNewAccInfo(e.target.value)} placeholder="TK: abc | MK: 123 | Chi tiet..." style={{ flex: 1, padding: "8px" }} />
                <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", fontWeight: "bold" }}>THEM ACC</button>
              </form>
            </div>

            {/* KHO ACC HIỆN TẠI TRONG SERVER */}
            <div style={{ margin: "20px 0", padding: "16px", backgroundColor: "#0f131c", borderRadius: "8px" }}>
              <h3 style={{ color: "#eab308" }}>4. Danh Sach Acc Trong Server ({serverStock.length})</h3>
              {serverStock.map(acc => (
                <div key={acc.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #232a3b", padding: "8px 0" }}>
                  <div><b>[{acc.game}]</b> {acc.accountInfo}</div>
                  <div style={{ color: acc.status === "AVAILABLE" ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
                    {acc.status === "AVAILABLE" ? "CON HANG" : "DA BAN"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.😎", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#151921", padding: "24px", borderRadius: "12px", textAlign: "center", maxWidth: "400px" }}>
            <h2 style={{ color: "#eab308" }}>CHUC MUNG BAN DA XE TRUNG!</h2>
            <p style={{ color: "#10b981", fontWeight: "bold", wordBreak: "break-all" }}>{wonReward}</p>
            <button onClick={() => setWonReward(null)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginTop: "12px" }}>Dong</button>
          </div>
        </div>
      )}
    </div>
  );
