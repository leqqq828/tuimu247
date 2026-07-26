import React, { useState } from "react";

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
  const [balance, setBalance] = useState<number>(500000);
  const [username] = useState<string>("Gamer_Pro");
  const [activeTab, setActiveTab] = useState<"home" | "detail" | "withdraw" | "topup" | "admin">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBagIndex, setSelectedBagIndex] = useState<number>(1);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [wonReward, setWonReward] = useState<string | null>(null);
  
  // Quản lý kho Acc của Admin
  const [stock, setStock] = useState<StockAccount[]>([
    { id: "ACC1", game: "TÚI MÙ LIÊN QUÂN", accountInfo: "TK: lienquan_vip1 | MK: pass123 | Note: Skin SS", status: "AVAILABLE" },
    { id: "ACC2", game: "TÚI MÙ FC MOBILE", accountInfo: "TK: fcmobile_99 | MK: pass456 | Note: OVR 130+", status: "AVAILABLE" }
  ]);

  // Vật phẩm đã xé
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Form Thêm Acc
  const [newAccCategory, setNewAccCategory] = useState("TÚI MÙ LIÊN QUÂN");
  const [newAccInfo, setNewAccInfo] = useState("");

  // Danh sách sản phẩm hiển thị chuẩn theo ảnh
  const [lienQuanProducts] = useState<Product[]>([
    { id: 1, name: "TÚI MÙ LIÊN QUÂN 1K", price: 1000, plays: 5870, views: 3306, rating: 5, category: "TÚI MÙ LIÊN QUÂN", image: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" },
    { id: 2, name: "TÚI MÙ LIÊN QUÂN 5K", price: 5000, plays: 2344, views: 2530, rating: 5, category: "TÚI MÙ LIÊN QUÂN", image: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" },
    { id: 3, name: "TÚI MÙ LIÊN QUÂN 149K", price: 149000, plays: 120, views: 615, rating: 5, category: "TÚI MÙ LIÊN QUÂN", image: "https://i.ibb.co/3Wq8pM4/lien-quan.jpg" },
  ]);

  const [fcMobileProducts] = useState<Product[]>([
    { id: 4, name: "TÚI MÙ FCMB 5K", price: 5000, plays: 3644, views: 1748, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
    { id: 5, name: "TÚI MÙ FCMB 10K", price: 10000, plays: 3863, views: 1677, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
    { id: 6, name: "TÚI MÙ FCMB 15K", price: 15000, plays: 1881, views: 1248, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
    { id: 7, name: "RANDOM FC MOBILE 49K", price: 49000, plays: 531, views: 755, rating: 5, category: "TÚI MÙ FC MOBILE", image: "https://i.ibb.co/Z8P23Q0/fc-mobile.jpg" },
  ]);

  // Xử lý mở chi tiết
  const handleOpenDetail = (prod: Product) => {
    setSelectedProduct(prod);
    setSelectedBagIndex(1);
    setActiveTab("detail");
  };

  // Xử lý Xé Túi Mù
  const handleRipOpen = () => {
    if (!selectedProduct) return;

    if (balance < selectedProduct.price) {
      alert("Số dư không đủ! Vui lòng nạp thêm tiền.");
      setActiveTab("topup");
      return;
    }

    const availableAccs = stock.filter(item => item.status === "AVAILABLE" && item.game === selectedProduct.category);
    const fallbackAccs = stock.filter(item => item.status === "AVAILABLE");
    const pool = availableAccs.length > 0 ? availableAccs : fallbackAccs;

    if (pool.length === 0) {
      alert("Hệ thống tạm thời hết nick túi mù này, vui lòng quay lại sau hoặc báo Admin!");
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
    }, 1200);
  };

  // Thêm Acc vào kho (Admin)
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
    alert("Thêm Acc thành công! Đã cập nhật vào danh sách bên dưới.");
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", color: "#333", fontFamily: "Helvetica, Arial, sans-serif", minHeight: "100vh" }}>
      
      {/* 1. HEADER TOP CHUẨN UI ẢNH 1 */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", padding: "8px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Logo & Search Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
            <div onClick={() => setActiveTab("home")} style={{ fontWeight: "bold", fontSize: "22px", color: "#2563eb", cursor: "pointer" }}>
              SHOPACC89.COM
            </div>
            
            <button style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
              ☰ Danh mục
            </button>
            <button style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
              👁 Đã xem
            </button>

            <div style={{ display: "flex", alignItems: "center", flex: 0.6 }}>
              <input type="text" placeholder="Tìm kiếm..." style={{ width: "100%", padding: "6px 12px", border: "1px solid #d1d5db", borderRadius: "6px 0 0 6px", outline: "none", fontSize: "13px" }} />
              <button style={{ backgroundColor: "#1d4ed8", color: "#fff", border: "none", padding: "6px 15px", borderRadius: "0 6px 6px 0", cursor: "pointer" }}>🔍</button>
            </div>
          </div>

          {/* User & Actions Top */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
            <button onClick={() => setActiveTab("topup")} style={{ backgroundColor: "#1e40af", color: "#fff", border: "none", padding: "6px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              Nạp tiền
            </button>
            <button onClick={() => setActiveTab("withdraw")} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              🛒 Túi đồ ({inventory.length})
            </button>
            <button onClick={() => setActiveTab("admin")} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              ⚙ Admin
            </button>
            <div>
              <b>{username}</b> | <span style={{ color: "#16a34a", fontWeight: "bold" }}>{balance.toLocaleString()}đ</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. THANH MENU ĐIỀU HƯỚNG CHUẨN ĐẸP ẢNH 1 */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", padding: "10px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "20px", fontSize: "14px", fontWeight: "bold", color: "#4b5563" }}>
          <span onClick={() => setActiveTab("home")} style={{ color: activeTab === "home" ? "#2563eb" : "inherit", cursor: "pointer" }}>Trang chủ</span>
          <span style={{ cursor: "pointer" }}>💳 Nạp thẻ</span>
          <span onClick={() => setActiveTab("topup")} style={{ cursor: "pointer" }}>🏦 Nạp tiền</span>
          <span style={{ cursor: "pointer" }}>🧰 Dịch vụ</span>
          <span style={{ cursor: "pointer" }}>⚙ Hệ thống</span>
          <span style={{ cursor: "pointer" }}>🛒 Mua Acc</span>
          <span style={{ cursor: "pointer" }}>👥 Tuyển CTV</span>
          <span style={{ cursor: "pointer" }}>🏆 Cấp bậc</span>
          <span style={{ cursor: "pointer" }}>📖 Hướng dẫn</span>
        </div>
      </div>

      {/* BODY NỘI DUNG CHÍNH */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 15px" }}>

        {/* --- TRANG CHỦ (ẢNH 1 & ẢNH 2) --- */}
        {activeTab === "home" && (
          <div>
            {/* Banner Top & Top Nạp */}
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px", marginBottom: "25px" }}>
              {/* Khung Top Đại Gia */}
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
                <button onClick={() => setActiveTab("topup")} style={{ width: "100%", backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px", borderRadius: "6px", fontWeight: "bold", marginTop: "15px", cursor: "pointer" }}>
                  Nạp tiền ngay
                </button>
              </div>

              {/* Banner Quảng Cáo ShopAcc89 */}
              <div style={{ backgroundColor: "#0f172a", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", textAlign: "center" }}>
                <h1 style={{ color: "#38bdf8", fontSize: "32px", margin: "0 0 10px 0" }}>SHOPACC89.COM</h1>
                <p style={{ fontSize: "18px", margin: "0 0 15px 0" }}>SHOP ACC GAME GIÁ RẺ - UY TÍN - TỰ ĐỘNG 24/7</p>
                <button style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 30px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>MUA NGAY</button>
              </div>
            </div>

            {/* DANH MỤC 1: TÚI MÙ LIÊN QUÂN (ẢNH 2) */}
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 15px 0", color: "#1e293b" }}>TÚI MÙ LIÊN QUÂN</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                {lienQuanProducts.map((p) => (
                  <div key={p.id} style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
                    <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "10px 0 4px 0" }}>{p.name}</h3>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Đã chơi {p.plays.toLocaleString()} lượt</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Lượt Xem: {p.views.toLocaleString()}</div>
                    <div style={{ color: "#eab308", fontSize: "12px", margin: "2px 0" }}>⭐⭐⭐⭐⭐ 5</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b", margin: "6px 0 12px 0" }}>Giá: {p.price.toLocaleString()}đ</div>
                    
                    {/* NÚT XEM TẤT CẢ CHUẨN ẢNH 2 */}
                    <button onClick={() => handleOpenDetail(p)} style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "8px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
                      XEM TẤT CẢ
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DANH MỤC 2: TÚI MÙ FC MOBILE (ẢNH 2) */}
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 15px 0", color: "#1e293b" }}>TÚI MÙ FC MOBILE</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
                {fcMobileProducts.map((p) => (
                  <div key={p.id} style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
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

        {/* --- TRANG CHI TIẾT MỞ TÚI MÙ (ẢNH 3 CHUẨN 100%) --- */}
        {activeTab === "detail" && selectedProduct && (
          <div>
            <button onClick={() => setActiveTab("home")} style={{ backgroundColor: "#64748b", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "15px", fontWeight: "bold" }}>
              ← Quay lại trang chủ
            </button>

            {/* Khung Túi Mù nền tối chuẩn Ảnh 3 */}
            <div style={{ backgroundColor: "#1e1e24", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
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

              {/* Thanh Nút XÉ NGAY màu Cam/Vàng chuẩn ảnh 3 */}
              <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                <button style={{ backgroundColor: "#334155", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  📜 Lịch sử
                </button>
                <button onClick={handleRipOpen} disabled={isOpening} style={{ backgroundColor: "#f59e0b", color: "#000", border: "none", padding: "12px 40px", borderRadius: "8px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", minWidth: "280px" }}>
                  {isOpening ? "ĐANG XÉ TÚI..." : `🎁 XÉ NGAY (${selectedProduct.price.toLocaleString()}đ/lượt)`}
                </button>
              </div>
            </div>

            {/* Quy định & Phần thưởng */}
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", marginTop: "20px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>📋 Quy định & Phần thưởng</h3>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#475569" }}>• Giá lượt xé: <b>{selectedProduct.price.toLocaleString()}đ / 1 lượt</b></p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#475569" }}>• Danh mục: <b>{selectedProduct.category}</b></p>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#ef4444", fontWeight: "bold" }}>• Lưu ý: Khách hàng vui lòng quay Video từ lúc xé túi đến lúc đăng nhập tài khoản thành công để được hỗ trợ bảo hành.</p>
            </div>
          </div>
        )}

        {/* --- TRANG VẬT PHẨM ĐÃ XÉ --- */}
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

        {/* --- TRANG NẠP TIỀN --- */}
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

        {/* --- TRANG ADMIN PANEL TÍCH HỢP QUẢN LÝ KHO ACC --- */}
        {activeTab === "admin" && (
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "2px solid #10b981" }}>
            <h2 style={{ color: "#10b981", marginTop: 0 }}>⚙ QUẢN LÝ KHO ACC SHOP (ADMIN)</h2>

            {/* Form Thêm Acc */}
            <div style={{ backgroundColor: "#f0fdf4", padding: "15px", borderRadius: "8px", border: "1px solid #bbf7d0", marginBottom: "20px" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "15px" }}>+ Thêm Acc Vào Kho Túi Mù</h3>
              <form onSubmit={handleAddAccount} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <select value={newAccCategory} onChange={(e) => setNewAccCategory(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}>
                  <option value="TÚI MÙ LIÊN QUÂN">TÚI MÙ LIÊN QUÂN</option>
                  <option value="TÚI MÙ FC MOBILE">TÚI MÙ FC MOBILE</option>
                </select>
                <input type="text" value={newAccInfo} onChange={(e) => setNewAccInfo(e.target.value)} placeholder="Nhập TK | MK | Ghi chú..." style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "220px" }} />
                <button type="submit" style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>THÊM VÀO KHO</button>
              </form>
            </div>

            {/* Danh sách Acc Hiện Có trong Kho */}
            <div>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "15px" }}>Danh Sách Acc Hiện Tại ({stock.length})</h3>
              {stock.map(acc => (
                <div key={acc.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e2e8f0", fontSize: "13px" }}>
                  <div><b>[{acc.game}]</b> - {acc.accountInfo}</div>
                  <div style={{ fontWeight: "bold", color: acc.status === "AVAILABLE" ? "#16a34a" : "#ef4444" }}>
                    {acc.status === "AVAILABLE" ? "CÒN HÀNG" : "ĐÃ BÁN"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* POPUP TRÚNG ACC KHI XÉ TÚI */}
      {wonReward && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", textAlign: "center", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <h2 style={{ color: "#16a34a", margin: "0 0 10px 0" }}>🎉 CHÚC MỪNG BẠN!</h2>
            <p style={{ fontSize: "14px", color: "#475569" }}>Bạn đã mở thành công túi mù:</p>
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
