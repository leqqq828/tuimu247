import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  plays: string;
  views: string;
  price: number;
  imageUrl: string;
  category: string;
  isHot?: boolean;
  isVip?: boolean;
  tag?: string;
}

interface User {
  username: string;
  balance: number;
  isAdmin: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "TÚI MÙ FREE FIRE - NỔ HŨ AK RỒNG XANH",
    plays: "18,402",
    views: "45,100",
    price: 20000,
    category: "Free Fire",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
    isHot: true,
    tag: "NỔ HŨ 99%"
  },
  {
    id: 2,
    name: "TÚI MÙ LIÊN QUÂN - SẢN NICK VIP FULL TƯỚNG",
    plays: "24,810",
    views: "61,200",
    price: 50000,
    category: "Liên Quân",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600",
    isVip: true,
    tag: "ACC THÔNG THÁI"
  },
  {
    id: 3,
    name: "TÚI MÙ ROBLOX - BLOX FRUIT LEOPARD/KITSUNE",
    plays: "31,050",
    views: "89,000",
    price: 30000,
    category: "Roblox",
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600",
    isHot: true,
    tag: "GIÁ SỐC"
  },
  {
    id: 4,
    name: "TÚI MÙ FC MOBILE - SỞ HỮU RONALDO / MESSI 100+",
    plays: "12,190",
    views: "28,400",
    price: 10000,
    category: "FC Mobile",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600",
    tag: "100% CÓ ACC"
  },
  {
    id: 5,
    name: "TÚI MÙ THIÊN VƯƠNG - ACC ALL GAME TỰ CHỌN",
    plays: "8,920",
    views: "19,500",
    price: 100000,
    category: "Liên Quân",
    imageUrl: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600",
    isVip: true,
    tag: "SIÊU PHẨM"
  },
  {
    id: 6,
    name: "TÚI MÙ TÂN THỦ FREE FIRE - TRÚNG 100%",
    plays: "45,210",
    views: "92,100",
    price: 0,
    category: "Free Fire",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600",
    tag: "MIỄN PHÍ"
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>("TẤT CẢ");
  const [currentUser, setCurrentUser] = useState<User | null>({
    username: "GamerPro89",
    balance: 150000,
    isAdmin: false
  });

  const filteredProducts = activeCategory === "TẤT CẢ" 
    ? products 
    : products.filter(p => p.category.toUpperCase() === activeCategory);

  return (
    <div style={{ backgroundColor: "#0b0e14", color: "#f3f4f6", fontFamily: "'Rajdhani', 'Segoe UI', sans-serif", minHeight: "100vh" }}>
      
      {/* GAMING TOP BAR */}
      <div style={{ backgroundColor: "#151921", borderBottom: "1px solid #232a3b", padding: "8px 24px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#10b981", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ backgroundColor: "#10b981", color: "#000", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "900" }}>LIVE</span>
          🔥 HỆ THỐNG MỞ TÚI MÙ GAME TỰ ĐỘNG - NẠP RÚT 1:1 KHÔNG CHIẾT KHẤU
        </div>
        <div style={{ display: "flex", gap: "16px", color: "#9ca3af" }}>
          <span style={{ cursor: "pointer" }}>📜 Lịch sử thử vận may</span>
          <span style={{ cursor: "pointer" }}>💬 CSKH Telegram / Zalo</span>
        </div>
      </div>

      {/* GAMING HEADER */}
      <header style={{ backgroundColor: "#0f131c", borderBottom: "2px solid #1e2638", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        
        {/* LOGO GAMING */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <div style={{ background: "linear-gradient(135deg, #ef4444, #8b5cf6)", width: "45px", height: "45px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)" }}>
            ⚡
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "1px", background: "linear-gradient(to right, #ef4444, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              SHOPACC89.COM
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "2px", textTransform: "uppercase" }}>Esports Mystery Box</div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav style={{ display: "flex", gap: "8px" }}>
          {["TRANG CHỦ", "TÚI MÙ GAME", "SHOP ACC VIP", "NẠP TIỀN", "RÚT QUÀ"].map((item, idx) => (
            <button key={item} style={{
              backgroundColor: idx === 0 ? "#ef4444" : "transparent",
              color: idx === 0 ? "#ffffff" : "#9ca3af",
              border: "1px solid " + (idx === 0 ? "#ef4444" : "#232a3b"),
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}>
              {item}
            </button>
          ))}
        </nav>

        {/* USER PROFILE & BALANCE */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#151921", padding: "6px 14px", borderRadius: "10px", border: "1px solid #232a3b" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Tài khoản: <b style={{ color: "#fff" }}>{currentUser.username}</b></div>
                <div style={{ fontSize: "13px", color: "#10b981", fontWeight: "bold" }}>
                  Số dư: {currentUser.balance.toLocaleString("vi-VN")}đ
                </div>
              </div>
              <button style={{ backgroundColor: "#10b981", border: "none", color: "#000", padding: "8px 12px", borderRadius: "6px", fontWeight: "900", cursor: "pointer", fontSize: "12px" }}>
                + NẠP
              </button>
            </div>
          ) : (
            <button style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
              ĐẮNG NHẬP
            </button>
          )}
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <div style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 16px" }}>
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          borderRadius: "16px",
          border: "1px solid #312e81",
          padding: "36px 32px",
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ maxWidth: "600px", zIndex: 2 }}>
            <span style={{ backgroundColor: "#ef4444", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px" }}>
              🔥 SỰ KIỆN NỔ HŨ TÚI MÙ
            </span>
            <h1 style={{ fontSize: "32px", fontWeight: "900", margin: "16px 0 12px 0", color: "#ffffff", textTransform: "uppercase", lineHeight: "1.2" }}>
              SĂN NICK GAME VIP CHỈ TỪ <span style={{ color: "#ef4444" }}>9K</span> - RÚT ACC TỰ ĐỘNG 3S
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
              Hệ thống mở túi mù minh bạch 100%. Tỉ lệ trúng Nick VIP, Trang phục Siêu cấp, Skin VIP cao nhất Việt Nam.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer", boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}>
                MỞ TÚI MÙ NGAY 🔥
              </button>
              <button style={{ backgroundColor: "#1e293b", color: "#fff", border: "1px solid #475569", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                VÒNG QUAY MAY MẮN 🎁
              </button>
            </div>
          </div>

          <div style={{ fontSize: "120px", opacity: 0.2, position: "absolute", right: "20px", bottom: "-20px", userSelect: "none" }}>
            🎮
          </div>
        </div>
      </div>

      {/* GAME CATEGORY FILTER BAR */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px 60px 16px" }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "900", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
            <span style={{ color: "#ef4444" }}>▌</span> DANH MỤC TÚI MÙ GAME
          </h2>

          <div style={{ display: "flex", gap: "8px", backgroundColor: "#151921", padding: "4px", borderRadius: "10px", border: "1px solid #232a3b" }}>
            {["TẤT CẢ", "FREE FIRE", "LIÊN QUÂN", "ROBLOX", "FC MOBILE"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: activeCategory === cat ? "#3b82f6" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#9ca3af",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GAMING CARDS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              style={{ 
                backgroundColor: "#151921", 
                borderRadius: "14px", 
                border: "1px solid #232a3b", 
                overflow: "hidden", 
                display: "flex", 
                flexDirection: "column",
                transition: "transform 0.2s, border-color 0.2s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }}
            >
              {/* CARD THUMBNAIL */}
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                
                {p.tag && (
                  <span style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "#ef4444", color: "#fff", fontSize: "10px", fontWeight: "900", padding: "3px 8px", borderRadius: "4px", boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>
                    {p.tag}
                  </span>
                )}

                <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", background: "linear-gradient(to top, #151921, transparent)", height: "50px" }} />
              </div>

              {/* CARD DETAILS */}
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#3b82f6", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }}>
                    {p.category}
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#fff", margin: "0 0 12px 0", lineHeight: "1.3" }}>
                    {p.name}
                  </h3>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", backgroundColor: "#0f131c", padding: "8px 12px", borderRadius: "6px", marginBottom: "16px" }}>
                    <span>Đã chơi: <b style={{ color: "#f3f4f6" }}>{p.plays}</b></span>
                    <span>Tỷ lệ: <b style={{ color: "#10b981" }}>99% Acc VIP</b></span>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>Giá mở:</span>
                    <span style={{ fontSize: "18px", fontWeight: "900", color: "#ef4444" }}>
                      {p.price === 0 ? "MIỄN PHÍ" : `${p.price.toLocaleString("vi-VN")}đ`}
                    </span>
                  </div>

                  <button style={{
                    width: "100%",
                    background: "linear-gradient(to right, #ef4444, #dc2626)",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "13px",
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                  }}>
                    MỞ TÚI MÙ NGAY 🎲
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* FOOTER GAMING */}
      <footer style={{ backgroundColor: "#0f131c", borderTop: "1px solid #1e2638", padding: "30px 24px", textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
        <div style={{ fontWeight: "bold", color: "#9ca3af", marginBottom: "8px" }}>SHOPACC89.COM - HỆ THỐNG SHOP ACC & TÚI MÙ GAME UY TÍN HÀNG ĐẦU VIỆT NAM</div>
        <div>Vận hành tự động 24/7. Bảo mật thông tin khách hàng 100%.</div>
      </footer>

    </div>
  );
}
