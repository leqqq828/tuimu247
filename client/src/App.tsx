import React, { useState } from "react";

// --- KAI KHÁI BÁO TYPE & PERMISSIONS ---
type AdminRole = "SUPER_ADMIN" | "CONTENT_ADMIN" | "SUPPORT_ADMIN" | "FINANCE_ADMIN";

interface Product {
  id: number;
  name: string;
  price: number;
  plays: number;
  views: number;
  rating: number;
  category: string;
  image: string;
}

interface InventoryItem {
  id: string;
  productName: string;
  accountInfo: string;
  time: string;
}

interface StockAccount {
  id: string;
  game: string;
  accountInfo: string;
  status: "AVAILABLE" | "SOLD";
}

export default function App() {
  // State Tài khoản & Điều hướng
  const [balance, setBalance] = useState<number>(490000);
  const [username] = useState<string>("Gamer_Pro");
  const [activeTab, setActiveTab] = useState<
    "home" | "detail" | "withdraw" | "topup" | "card_recharge" | "service" | "system" | "buy_acc" | "ctv" | "ranks" | "guide" | "history_viewed" | "admin"
  >("home");

  // State Phân quyền Admin
  const [adminRole, setAdminRole] = useState<AdminRole>("SUPER_ADMIN");

  // State Tìm kiếm & Danh mục
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBagIndex, setSelectedBagIndex] = useState<number>(1);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [wonReward, setWonReward] = useState<string | null>(null);

  // State Kho Acc Admin & Đồ đã xé
  const [stock, setStock] = useState<StockAccount[]>([
    { id: "ACC1", game: "TÚI MÙ LIÊN QUÂN", accountInfo: "TK: lienquan_vip1 | MK: pass123 | Note: Skin SS", status: "AVAILABLE" },
    { id: "ACC2", game: "TÚI MÙ FC MOBILE", accountInfo: "TK: fcmobile_99 | MK: pass456 | Note: OVR 130+", status: "AVAILABLE" }
  ]);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "ACC0", productName: "TÚI MÙ LIÊN QUÂN 149K", accountInfo: "TK: shop89_demo | MK: 888888", time: "10:15" }
  ]);

  // State Form Thêm Acc
  const [newAccCategory, setNewAccCategory] = useState("TÚI MÙ LIÊN QUÂN");
  const [newAccInfo, setNewAccInfo] = useState("");

  // Data Sản Phẩm
  const [lienQuanProducts] = useState<Product[]>([
    { id: 1, name: "TÚI MÙ LIÊN QUÂN 1K", price: 1000, plays: 5870, views: 3306, rating: 5, category: "TÚI MÙ LIÊN QUÂN", image: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" },
    { id: 2, name: "TÚI MÙ LIÊN QUÂN 5K", price: 5000, plays: 2344, views: 2530, rating: 5, category: "TÚI MÙ LIÊN QUÂN", image: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" },
    { id: 3, name: "TÚI MÙ LIÊN QUÂN 149K", price: 149000, plays: 120, views: 615, rating: 5, category: "TÚI MÙ LIÊN QUÂN", image: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" },
  ]);

  const [fcMobileProducts] = useState<Product[]>([
    { id: 4, name: "TÚI MÙ FCMB 5K", price: 5000, plays: 3644, views: 1748, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
    { id: 5, name: "TÚI MÙ FCMB 10K", price: 10000, plays: 3863, views: 1677, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
    { id: 6, name: "TÚI MÙ FCMB 15K", price: 15000, plays: 1881, views: 1248, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
  ]);

  // Xử lý nút bấm chung
  const handleOpenDetail = (prod: Product) => {
    setSelectedProduct(prod);
    setSelectedBagIndex(1);
    setActiveTab("detail");
  };

  const handleRipOpen = () => {
    if (!selectedProduct) return;

    if (balance < selectedProduct.price) {
      alert("Số dư không đủ! Vui lòng nạp thêm tiền.");
      setActiveTab("topup");
      return;
    }

    const availableAccs = stock.filter(item => item.status === "AVAILABLE" && item.game === selectedProduct.category);
    const pool = availableAccs.length > 0 ? availableAccs : stock.filter(item => item.status === "AVAILABLE");

    if (pool.length === 0) {
      alert("Hệ thống tạm thời hết nick túi mù này! Admin sẽ bổ sung sớm.");
      return;
    }

    setBalance(prev => prev - selectedProduct.price);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpening(false);
      const selectedAcc = pool[Math.floor(Math.random() * pool.length)];

      setStock(prev => prev.map(a => a.id === selectedAcc.id ? { ...a, status: "SOLD" } : a));
      setWonReward(selectedAcc.accountInfo);

      setInventory(prev => [
        {
          id: selectedAcc.id,
          productName: selectedProduct.name,
          accountInfo: selectedAcc.accountInfo,
          time: new Date().toLocaleTimeString("vi-VN")
        },
        ...prev
      ]);
    }, 1000);
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccInfo.trim()) return;

    const newItem: StockAccount = {
      id: "ACC-" + Math.floor(1000 + Math.random() * 9000),
      game: newAccCategory,
      accountInfo: newAccInfo,
      status: "AVAILABLE"
    };

    setStock(prev => [newItem, ...prev]);
    setNewAccInfo("");
    alert("Thêm Acc thành công!");
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", color: "#333", fontFamily: "Helvetica, Arial, sans-serif", minHeight: "100vh" }}>
      
      {/* 1. HEADER TOP CHUẨN KÈM TẤT CẢ NÚT BẤM */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", padding: "8px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          
          {/* Logo, Danh mục, Đã xem & Ô Tìm kiếm */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "300px" }}>
            <div onClick={() => setActiveTab("home")} style={{ fontWeight: "bold", fontSize: "22px", color: "#2563eb", cursor: "pointer" }}>
              SHOPACC89.COM
            </div>
            
            <button onClick={() => alert("Chức năng Danh Mục đang cập nhật!")} style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
              ☰ Danh mục
            </button>

            <button onClick={() => setActiveTab("history_viewed")} style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
              👁 Đã xem
            </button>

            <div style={{ display: "flex", alignItems: "center", flex: 0.6 }}>
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "6px 12px", border: "1px solid #d1d5db", borderRadius: "6px 0 0 6px", outline: "none", fontSize: "13px" }} 
              />
              <button onClick={() => alert(Đang tìm kiếm sản phẩm: ${searchQuery})} style={{ backgroundColor: "#1d4ed8", color: "#fff", border: "none", padding: "6px 15px", borderRadius: "0 6px 6px 0", cursor: "pointer" }}>🔍</button>
            </div>
          </div>

          {/* User & Các Nút Điều Hướng Phải */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
            <button onClick={() => setActiveTab("topup")} style={{ backgroundColor: "#1e40af", color: "#fff", border: "none", padding: "6px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              Nạp tiền
            </button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              🛒 Túi đồ ({inventory.length})
            </button>
            <button onClick={() => setActiveTab("admin")} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              ⚙ Admin
            </button>
            <div>
              <b>{username}</b> | <span style={{ color: "#16a34a", fontWeight: "bold" }}>{balance.toLocaleString()}đ</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. THANH MENU ĐIỀU HƯỚNG SỐ 2 (TẤT CẢ NÚT BẤM ĐÃ KÍCH HOẠT) */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", padding: "10px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "18px", fontSize: "14px", fontWeight: "bold", color: "#4b5563", flexWrap: "wrap" }}>
          <span onClick={() => setActiveTab("home")} style={{ color: activeTab === "home" ? "#2563eb" : "inherit", cursor: "pointer" }}>Trang chủ</span>
          <span onClick={() => setActiveTab("card_recharge")} style={{ color: activeTab === "card_recharge" ? "#2563eb" : "inherit", cursor: "pointer" }}>💳 Nạp thẻ</span>
          <span onClick={() => setActiveTab("topup")} style={{ color: activeTab === "topup" ? "#2563eb" : "inherit", cursor: "pointer" }}>🏦 Nạp tiền</span>
          <span onClick={() => setActiveTab("service")} style={{ color: activeTab === "service" ? "#2563eb" : "inherit", cursor: "pointer" }}>🧰 Dịch vụ</span>
          <span onClick={() => setActiveTab("system")} style={{ color: activeTab === "system" ? "#2563eb" : "inherit", cursor: "pointer" }}>⚙ Hệ thống</span>
          <span onClick={() => setActiveTab("buy_acc")} style={{ color: activeTab === "buy_acc" ? "#2563eb" : "inherit", cursor: "pointer" }}>🛒 Mua Acc</span>
          <span onClick={() => setActiveTab("ctv")} style={{ color: activeTab === "ctv" ? "#2563eb" : "inherit", cursor: "pointer" }}>👥 Tuyển CTV</span>
          <span onClick={() => setActiveTab("ranks")} style={{ color: activeTab === "ranks" ? "#2563eb" : "inherit", cursor: "pointer" }}>🏆 Cấp bậc</span>
          <span onClick={() => setActiveTab("guide")} style={{ color: activeTab === "guide" ? "#2563eb" : "inherit", cursor: "pointer" }}>📖 Hướng dẫn</span>
        </div>
      </div>

      {/* 3. NỘI DUNG TƯƠNG ỨNG MỖI NÚT MENU */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 15px" }}>

        {/* --- TAB TRANG CHỦ --- */}
        {activeTab === "home" && (
          <div>
            {/* Banner Top & Top Nạp */}
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px", marginBottom: "25px" }}>
              <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", borderBottom: "2px solid #2563eb", paddingBottom: "8px", marginBottom: "15px" }}>
                  <span style={{ backgroundColor: "#2563eb", color: "#fff", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>TOP NẠP THÁNG 7</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                  <div>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#fca5a5", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>D</div>
                    <div style={{ fontSize: "11px", marginTop: "4px" }}>TOP 2</div>
                    <div style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>430.000đ</div>
                  </div>
                  <div>
                    <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#fde047", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px" }}>T</div>
                    <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "4px", color: "#d97706" }}>TOP 1</div>
                    <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: "bold" }}>478.000đ</div>
                  </div>
                  <div>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#bfdbfe", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>B</div>
                    <div style={{ fontSize: "11px", marginTop: "4px" }}>TOP 3</div>
                    <div style={{ fontSize: "11px", color: "#ef4444", fontWeight: "bold" }}>300.000đ</div>
                  </div>
                </div>
                
                {/* NÚT NẠP TIỀN NGAY HOẠT ĐỘNG */}
                <button onClick={() => setActiveTab("topup")} style={{ width: "100%", backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px", borderRadius: "6px", fontWeight: "bold", marginTop: "15px", cursor: "pointer" }}>
                  Nạp tiền ngay
                </button>
              </div>

              {/* Banner Quảng Cáo */}
              <div style={{ backgroundColor: "#0f172a", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", textAlign: "center" }}>
                <h1 style={{ color: "#38bdf8", fontSize: "32px", margin: "0 0 10px 0" }}>SHOPACC89.COM</h1>
                <p style={{ fontSize: "18px", margin: "0 0 15px 0" }}>SHOP ACC GAME GIÁ RẺ - UY TÍN - TỰ ĐỘNG 24/7</p>
                {/* NÚT MUA NGAY HOẠT ĐỘNG */}
                <button onClick={() => handleOpenDetail(lienQuanProducts[0])} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 30px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>
                  MUA NGAY
                </button>
              </div>
            </div>

            {/* DANH MỤC TÚI MÙ LIÊN QUÂN */}
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 15px 0", color: "#1e293b" }}>TÚI MÙ LIÊN QUÂN</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                {lienQuanProducts.map((p) => (
                  <div key={p.id} style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "12px" }}>
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
                    <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "10px 0 4px 0" }}>{p.name}</h3>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Đã chơi {p.plays.toLocaleString()} lượt</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Lượt Xem: {p.views.toLocaleString()}</div>
                    <div style={{ color: "#eab308", fontSize: "12px", margin: "2px 0" }}>⭐⭐⭐⭐⭐ 5</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", margin: "6px 0 12px 0" }}>Giá: {p.price.toLocaleString()}đ</div>
                    
                    <button onClick={() => handleOpenDetail(p)} style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "8px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
                      XEM TẤT CẢ
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DANH MỤC TÚI MÙ FC MOBILE */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 15px 0", color: "#1e293b" }}>TÚI MÙ FC MOBILE</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
                {fcMobileProducts.map((p) => (
                  <div key={p.id} style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "12px" }}>
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
                    <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "10px 0 4px 0" }}>{p.name}</h3>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Đã chơi {p.plays.toLocaleString()} lượt</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Lượt Xem: {p.views.toLocaleString()}</div>
                    <div style={{ color: "#eab308", fontSize: "12px", margin: "2px 0" }}>⭐⭐⭐⭐⭐ 5</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", margin: "6px 0 12px 0" }}>Giá: {p.price.toLocaleString()}đ</div>
                    
                    <button onClick={() => handleOpenDetail(p)} style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "8px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
                      XEM TẤT CẢ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CHI TIẾT MỞ TÚI MÙ --- */}
        {activeTab === "detail" && selectedProduct && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#64748b", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "15px", fontWeight: "bold" }}>
              ← Quay lại trang chủ
            </button>

            <div style={{ backgroundColor: "#1e1e24", padding: "20px", borderRadius: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num} onClick={() => setSelectedBagIndex(num)} style={{ backgroundColor: "#2b2b36", border: selectedBagIndex === num ? "2px solid #eab308" : "1px solid #3f3f4e", borderRadius: "10px", padding: "12px", textAlign: "center", cursor: "pointer", position: "relative" }}>
                    <span style={{ position: "absolute", top: "8px", left: "10px", backgroundColor: "#eab308", color: "#000", fontWeight: "bold", borderRadius: "50%", width: "22px", height: "22px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {num}
                    </span>
                    <img src={selectedProduct.image} alt="Túi Mù" style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", margin: "10px 0" }} />
                    <div style={{ color: "#fff", fontWeight: "bold", fontSize: "13px" }}>{selectedProduct.name}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: "#334155", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  📜 Lịch sử xé túi
                </button>
                <button onClick={handleRipOpen} disabled={isOpening} style={{ backgroundColor: "#f59e0b", color: "#000", border: "none", padding: "12px 40px", borderRadius: "8px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", minWidth: "280px" }}>
                  {isOpening ? "ĐANG XÉ TÚI..." : `🎁 XÉ NGAY (${selectedProduct.price.toLocaleString()}đ/lượt)`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- NẠP THẺ CÀO (MENU 2) --- */}
        {activeTab === "card_recharge" && (
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", maxWidth: "500px", margin: "0 auto", border: "1px solid #e2e8f0" }}>
            <h2 style={{ color: "#2563eb", marginTop: 0 }}>💳 NẠP THẺ CÀO TỰ ĐỘNG</h2>
            <select style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
              <option>Chọn loại thẻ (Viettel, Vinaphone, Mobifone)</option>
            </select>
            <input type="text" placeholder="Mã thẻ..." style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
            <input type="text" placeholder="Số Series..." style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
            <button onClick={() => alert("Đã gửi thẻ cào lên hệ thống xử lý!")} style={{ width: "100%", backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>XÁC NHẬN NẠP THẺ</button>
          </div>
        )}

        {/* --- NẠP TIỀN BANK (MENU 2) --- */}
        {activeTab === "topup" && (
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", maxWidth: "500px", margin: "0 auto", border: "1px solid #e2e8f0" }}>
            <h2 style={{ color: "#2563eb", textAlign: "center", marginTop: 0 }}>NẠP TIỀN NGÂN HÀNG TỰ ĐỘNG</h2>
            <div style={{ backgroundColor: "#f1f5f9", padding: "15px", borderRadius: "8px", margin: "15px 0", fontSize: "14px" }}>
              <p style={{ margin: "4px 0" }}>Ngân hàng: <b>MB BANK</b></p>
              <p style={{ margin: "4px 0" }}>Số tài khoản: <b style={{ color: "#2563eb", fontSize: "16px" }}>0865523664</b></p>
              <p style={{ margin: "4px 0" }}>Chủ tài khoản: <b>SHOPACC89</b></p>
              <p style={{ margin: "4px 0" }}>Cú pháp: <b style={{ color: "#ef4444" }}>NAP {username}</b></p>
            </div>
            <button onClick={() => { setBalance(prev => prev + 100000); alert("Đã cộng 100.000đ Demo!"); }} style={{ width: "100%", backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              + NẠP THỬ 100.000đ DEMO
            </button>
          </div>
        )}

        {/* --- DỊCH VỤ / MUA ACC / CẤP BẬC / HƯỚNG DẪN / CTV --- */}
        {["service", "system", "buy_acc", "ctv", "ranks", "guide", "history_viewed"].includes(activeTab) && (
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <h2 style={{ color: "#2563eb" }}>MỤC: {activeTab.toUpperCase()}</h2>
            <p style={{ color: "#64748b" }}>Chức năng giao diện đã kích hoạt hoàn toàn mượt mà.</p>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Về Trang Chủ</button>
          </div>
        )}

        {/* --- TÚI ĐỒ VẬT PHẨM --- */}
        {activeTab === "withdraw" && (
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ marginTop: 0 }}>🎒 TÚI ĐỒ VẬT PHẨM ĐÃ MỞ ({inventory.length})</h2>
            {inventory.length === 0 ? <p style={{ color: "#64748b" }}>Bạn chưa xé túi mù nào.</p> : inventory.map((item) => (
              <div key={item.id} style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "10px" }}>
                <div style={{ fontWeight: "bold", color: "#2563eb" }}>{item.productName} - <span style={{ fontSize: "12px", color: "#64748b" }}>{item.time}</span></div>
                <div style={{ color: "#ef4444", fontWeight: "bold", marginTop: "6px", fontFamily: "monospace", fontSize: "15px" }}>{item.accountInfo}</div>
              </div>
            ))}
          </div>
        )}

        {/* --- 4. HỆ THỐNG QUẢN TRỊ ADMIN PHÂN QUYỀN CHUYÊN NGHIỆP --- */}
        {activeTab === "admin" && (
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "2px solid #10b981" }}>
            
            {/* THANH CHUYỂN ĐỔI ROLE ĐỂ TEST THỬ QUYỀN */}
            <div style={{ backgroundColor: "#f0fdf4", padding: "12px", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
              <div style={{ fontWeight: "bold", color: "#047857" }}>🛡 HỆ THỐNG PHÂN QUYỀN ADMIN:</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setAdminRole("SUPER_ADMIN")} style={{ backgroundColor: adminRole === "SUPER_ADMIN" ? "#10b981" : "#e2e8f0", color: adminRole === "SUPER_ADMIN" ? "#fff" : "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>1. Super Admin</button>
                <button onClick={() => setAdminRole("CONTENT_ADMIN")} style={{ backgroundColor: adminRole === "CONTENT_ADMIN" ? "#10b981" : "#e2e8f0", color: adminRole === "CONTENT_ADMIN" ? "#fff" : "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>2. Nhân viên Kho</button>
                <button onClick={() => setAdminRole("SUPPORT_ADMIN")} style={{ backgroundColor: adminRole === "SUPPORT_ADMIN" ? "#10b981" : "#e2e8f0", color: adminRole === "SUPPORT_ADMIN" ? "#fff" : "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>3. CSKH & Đơn hàng</button>
                <button onClick={() => setAdminRole("FINANCE_ADMIN")} style={{ backgroundColor: adminRole === "FINANCE_ADMIN" ? "#10b981" : "#e2e8f0", color: adminRole === "FINANCE_ADMIN" ? "#fff" : "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>4. Kế toán & Nạp tiền</button>
              </div>
            </div>

            {/* NHÓM A: KHO ACC (Super Admin + Content Admin) */}
            {["SUPER_ADMIN", "CONTENT_ADMIN"].includes(adminRole) && (
              <div style={{ backgroundColor: "#fafafa", padding: "15px", borderRadius: "8px", border: "1px solid #e5e7eb", marginBottom: "20px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#2563eb", fontSize: "16px" }}>📦 QUẢN LÝ KHO ACC & DANH MỤC</h3>
                
                <form onSubmit={handleAddAccount} style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                  <select value={newAccCategory} onChange={(e) => setNewAccCategory(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}>
                    <option value="TÚI MÙ LIÊN QUÂN">TÚI MÙ LIÊN QUÂN</option>
                    <option value="TÚI MÙ FC MOBILE">TÚI MÙ FC MOBILE</option>
                  </select>
                  <input type="text" value={newAccInfo} onChange={(e) => setNewAccInfo(e.target.value)} placeholder="TK | MK | Ghi chú..." style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "200px" }} />
                  <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>+ Thêm Acc Vào Kho</button>
                </form>

                <div>
                  <b>Kho Acc hiện tại ({stock.length}):</b>
                  {stock.map(acc => (
                    <div key={acc.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e5e7eb", fontSize: "13px" }}>
                      <div><b>[{acc.game}]</b> - {acc.accountInfo}</div>
                      <div style={{ fontWeight: "bold", color: acc.status === "AVAILABLE" ? "#16a34a" : "#ef4444" }}>{acc.status === "AVAILABLE" ? "CÒN HÀNG" : "ĐÃ BÁN"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NHÓM B: CSKH & ĐƠN HÀNG (Super Admin + Support Admin) */}
            {["SUPER_ADMIN", "SUPPORT_ADMIN"].includes(adminRole) && (
              <div style={{ backgroundColor: "#fafafa", padding: "15px", borderRadius: "8px", border: "1px solid #e5e7eb", marginBottom: "20px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#ef4444", fontSize: "16px" }}>💬 QUẢN LÝ ĐƠN HÀNG & CSKH KHIẾU NẠI</h3>
                <p style={{ fontSize: "13px", color: "#64748b" }}>Xem đơn hàng đã giao cho khách, xử lý đổi nick lỗi hoặc hoàn tiền.</p>
                <button onClick={() => alert("Đã xử lý hoàn tiền đơn lỗi!")} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
                  🔄 Hoàn tiền cho khách (Refund)
                </button>
              </div>
            )}

            {/* NHÓM C: TÀI CHÍNH & NẠP TIỀN (Super Admin + Finance Admin) */}
            {["SUPER_ADMIN", "FINANCE_ADMIN"].includes(adminRole) && (
              <div style={{ backgroundColor: "#fafafa", padding: "15px", borderRadius: "8px", border: "1px solid #e5e7eb", marginBottom: "20px" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#16a34a", fontSize: "16px" }}>💰 TÀI CHÍNH, DUYỆT NẠP & DÒNG TIỀN</h3>
                <p style={{ fontSize: "13px", color: "#64748b" }}>Thống kê doanh thu, lịch sử cộng/trừ tiền và duyệt nạp tiền tay.</p>
                <button onClick={() => { setBalance(prev => prev + 50000); alert("Đã cộng 50.000đ tay vào ví thành viên!"); }} style={{ backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
                  💵 Cộng tiền thủ công (+50K)
                </button>
              </div>
            )}

            {/* NHÓM D: CẤU HÌNH HỆ THỐNG & USER (Chỉ Super Admin) */}
            {adminRole === "SUPER_ADMIN" && (
              <div style={{ backgroundColor: "#fef2f2", padding: "15px", borderRadius: "8px", border: "1px solid #fca5a5" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#991b1b", fontSize: "16px" }}>👑 CHỈ DÀNH CHO SUPER ADMIN (OWNER)</h3>
                <p style={{ fontSize: "13px", color: "#7f1d1d" }}>Quyền hạn cao nhất: Ban/Unban tài khoản, Đổi cấu hình Logo/Banner shop, Xem Audit Log thao tác nhân viên.</p>
              </div>
            )}

          </div>
        )}

      </div>

      {/* POPUP HIỂN THỊ KHI XÉ TRÚNG ACC */}
      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", textAlign: "center", maxWidth: "400px" }}>
            <h2 style={{ color: "#16a34a", margin: "0 0 10px 0" }}>🎉 MỞ TÚI MÙ THÀNH CÔNG!</h2>
            <p style={{ fontSize: "14px", color: "#475569" }}>Thông tin tài khoản nhận được:</p>
            <div style={{ backgroundColor: "#fef2f2", padding: "10px", borderRadius: "6px", color: "#dc2626", fontWeight: "bold", margin: "10px 0", wordBreak: "break-all" }}>
              {wonReward}
            </div>
            <button onClick={() => setWonReward(null)} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 25px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Đóng</button>
          </div>
        </div>
      )}

    </div>
  );
}
