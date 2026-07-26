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
  isFree?: boolean;
}

interface User {
  username: string;
  fullname?: string;
  email?: string;
  phone?: string;
  isAdmin: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "TÚI MÙ FREE FIRE MIỄN PHÍ",
    plays: "8.101",
    views: "17.303",
    price: 0,
    category: "Free Fire",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
    isFree: true
  },
  {
    id: 2,
    name: "TÚI MÙ FC MIỄN PHÍ",
    plays: "10.835",
    views: "12.232",
    price: 0,
    category: "FC Mobile",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500",
    isFree: true
  },
  {
    id: 3,
    name: "TÚI MÙ LIÊN QUÂN MIỄN PHÍ",
    plays: "4.101",
    views: "10.182",
    price: 0,
    category: "Liên Quân",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500",
    isFree: true
  },
  {
    id: 4,
    name: "TÚI MÙ ROBLOX MIỄN PHÍ",
    plays: "3.325",
    views: "5.736",
    price: 0,
    category: "Roblox",
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500",
    isFree: true
  },
  {
    id: 5,
    name: "TÚI MÙ LIÊN QUÂN 1K",
    plays: "5.870",
    views: "3.303",
    price: 1000,
    category: "Liên Quân",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500",
    isHot: true
  },
  {
    id: 6,
    name: "TÚI MÙ LIÊN QUÂN 5K",
    plays: "2.344",
    views: "2.528",
    price: 5000,
    category: "Liên Quân",
    imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500",
    isHot: true
  },
  {
    id: 7,
    name: "TÚI MÙ LIÊN QUÂN 149K",
    plays: "0",
    views: "614",
    price: 149000,
    category: "Liên Quân",
    imageUrl: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=500",
    isHot: true
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<"home" | "login" | "register">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Form States - Auth
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regFullname, setRegFullname] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Form States - Admin Add Product
  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pCategory, setPCategory] = useState("Liên Quân");
  const [pImageUrl, setPImageUrl] = useState("");

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === "admin" && loginPassword === "123") {
      const adminUser: User = { username: "admin", isAdmin: true };
      setCurrentUser(adminUser);
      setActiveTab("home");
      alert("Đăng nhập thành công với quyền Quản Trị Viên (Admin)!");
    } else if (loginUsername && loginPassword) {
      const normalUser: User = { username: loginUsername, isAdmin: false };
      setCurrentUser(normalUser);
      setActiveTab("home");
      alert(Xin chào ${loginUsername}, đăng nhập thành công!);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regPassword) return alert("Vui lòng điền các thông tin bắt buộc!");
    if (regPassword !== regConfirmPassword) return alert("Mật khẩu nhập lại không khớp!");

    const newUser: User = {
      username: regUsername,
      fullname: regFullname,
      email: regEmail,
      phone: regPhone,
      isAdmin: false
    };

    setCurrentUser(newUser);
    setActiveTab("home");
    alert("Tạo tài khoản thành công!");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminView(false);
    alert("Đã đăng xuất tài khoản!");
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pPrice) return alert("Vui lòng nhập tên và giá sản phẩm!");

    const newProd: Product = {
      id: Date.now(),
      name: pName.toUpperCase(),
      plays: "0",
      views: "1",
      price: Number(pPrice),
      category: pCategory,
      imageUrl: pImageUrl || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
      isHot: true
    };

    setProducts([newProd, ...products]);
    setPName("");
    setPPrice("");
    setPImageUrl("");
    alert("Thêm sản phẩm thành công!");
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Xóa túi mù này khỏi shop?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = selectedCategory === "Tất cả" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: "#f3f4f6", minHeight: "100vh", color: "#1f2937" }}>
      
      {/* 🟢 TOP HEADER BAR */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", fontSize: "13px", padding: "6px 24px", display: "flex", justifyContent: "space-between", color: "#6b7280" }}>
        <div>🔥 ShopAcc89.com - Hệ thống túi mù game tự động 24/7</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <span>Chính Sách ▾</span>
          <span>Hỗ Trợ Khách Hàng ▾</span>
        </div>
      </div>

      {/* 🟢 MAIN HEADER */}
      <header style={{ backgroundColor: "#ffffff", padding: "12px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* LOGO */}
          <div 
            onClick={() => { setActiveTab("home"); setIsAdminView(false); }}
            style={{ fontSize: "22px", fontWeight: "900", color: "#16a34a", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span style={{ backgroundColor: "#16a34a", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "18px" }}>🎁</span>
            SHOPACC89
          </div>

          {/* SEARCH BAR & BUTTONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={{ backgroundColor: "#e5e7eb", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
              ☰ Danh mục
            </button>
            <button style={{ backgroundColor: "#e5e7eb", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
              👁️ Đã xem
            </button>
            
            <div style={{ display: "flex", alignItems: "center" }}>
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                style={{ border: "1px solid #d1d5db", borderRight: "none", padding: "8px 12px", borderRadius: "6px 0 0 6px", outline: "none", width: "160px", fontSize: "13px" }}
              />
              <button style={{ backgroundColor: "#2563eb", border: "none", color: "#fff", padding: "8px 12px", borderRadius: "0 6px 6px 0", cursor: "pointer" }}>
                🔍
              </button>
            </div>

            <button style={{ backgroundColor: "#1d4ed8", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>
              Nạp tiền
            </button>
          </div>
        </div>

        {/* RIGHT CONTROL PANEL */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ cursor: "pointer", fontSize: "18px" }}>🌐</span>
          <span style={{ cursor: "pointer", fontSize: "18px" }}>🔔</span>
          <span style={{ cursor: "pointer", fontSize: "18px", position: "relative" }}>
            🛒 <span style={{ position: "absolute", top: "-5px", right: "-8px", backgroundColor: "#ef4444", color: "#fff", fontSize: "10px", padding: "2px 5px", borderRadius: "10px" }}>0</span>
          </span>

          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1f2937" }}>
                👤 {currentUser.username} {currentUser.isAdmin && "(Admin)"}
              </span>
              
              {currentUser.isAdmin && (
                <button 
                  onClick={() => setIsAdminView(!isAdminView)}
                  style={{ backgroundColor: isAdminView ? "#111827" : "#16a34a", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
                >
                  {isAdminView ? "🏠 Xem Shop" : "⚙️ Quản lý Shop"}
                </button>
              )}

              <button 
                onClick={handleLogout}
                style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "6px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
              >
                Thoát
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "6px" }}>
              <button 
                onClick={() => setActiveTab("login")}
                style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
              >
                Đăng nhập
              </button>
              <button 
                onClick={() => setActiveTab("register")}
                style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "8px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 🟢 NAVIGATION MENU BAR */}
      <nav style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", overflowX: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "24px", padding: "12px 0", fontSize: "14px", fontWeight: "600", color: "#374151" }}>
          <span onClick={() => { setActiveTab("home"); setIsAdminView(false); }} style={{ cursor: "pointer", color: activeTab === "home" ? "#16a34a" : "inherit" }}>🏠 Trang chủ</span>
          <span style={{ cursor: "pointer" }}>💳 Nạp thẻ</span>
          <span style={{ cursor: "pointer" }}>💰 Nạp tiền</span>
          <span style={{ cursor: "pointer" }}>🧰 Dịch vụ</span>
          <span style={{ cursor: "pointer" }}>⚙️ Hệ thống</span>
          <span style={{ cursor: "pointer" }}>🛒 Mua Acc</span>
          <span style={{ cursor: "pointer" }}>🤝 Tuyển CTV</span>
          <span style={{ cursor: "pointer" }}>🏆 Cấp bậc</span>
        </div>
      </nav>

      {/* 🟢 ADMIN MANAGEMENT VIEW */}
      {isAdminView && currentUser?.isAdmin ? (
        <div style={{ maxWidth: "800px", margin: "24px auto", padding: "0 16px" }}>
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
            <h2 style={{ marginTop: 0, fontSize: "18px", color: "#111827" }}>➕ Thêm Túi Mù Mới Vào Shop</h2>
            <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" placeholder="Tên túi mù (VD: TÚI MÙ FREE FIRE 20K)" value={pName} onChange={(e) => setPName(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }} required />
              <div style={{ display: "flex", gap: "12px" }}>
                <input type="number" placeholder="Giá bán (VNĐ) - Nhập 0 nếu Miễn phí" value={pPrice} onChange={(e) => setPPrice(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }} required />
                <select value={pCategory} onChange={(e) => setPCategory(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }}>
                  <option value="Free Fire">Free Fire</option>
                  <option value="Liên Quân">Liên Quân</option>
                  <option value="FC Mobile">FC Mobile</option>
                  <option value="Roblox">Roblox</option>
                </select>
              </div>
              <input type="text" placeholder="URL hình ảnh Banner" value={pImageUrl} onChange={(e) => setPImageUrl(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }} />
              <button type="submit" style={{ backgroundColor: "#16a34a", color: "white", padding: "10px", borderRadius: "6px", border: "none", fontWeight: "bold", cursor: "pointer" }}>Tạo sản phẩm ngay</button>
            </form>
          </div>

          <h3>Danh sách các Túi Mù ({products.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {products.map((p) => (
              <div key={p.id} style={{ backgroundColor: "#fff", padding: "12px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{p.name}</strong> - <span style={{ color: "#16a34a", fontWeight: "bold" }}>{p.price === 0 ? "Miễn phí" : `${p.price.toLocaleString("vi-VN")}đ`}</span>
                </div>
                <button onClick={() => handleDeleteProduct(p.id)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}>Xóa</button>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === "login" ? (
        
        /* 🟢 LOGIN PAGE */
        <div style={{ maxWidth: "450px", margin: "40px auto", padding: "0 16px" }}>
          <div style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎁</div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: "0 0 6px 0" }}>Chào mừng trở lại</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", marginTop: 0 }}>Đăng nhập để truy cập tài khoản và hệ thống.</p>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left", marginTop: "20px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>Địa chỉ email / tài khoản</label>
                <input 
                  type="text" 
                  placeholder="Email hoặc tên đăng nhập" 
                  value={loginUsername} 
                  onChange={(e) => setLoginUsername(e.target.value)} 
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>Mật khẩu</label>
                <input 
                  type="password" 
                  placeholder="Nhập mật khẩu" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                  required 
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                <label><input type="checkbox" /> Ghi nhớ tôi</label>
                <span style={{ color: "#dc2626", cursor: "pointer", fontWeight: "600" }}>Quên mật khẩu?</span>
              </div>

              <button type="submit" style={{ backgroundColor: "#dc2626", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                Đăng nhập
              </button>
            </form>

            <p style={{ fontSize: "13px", marginTop: "20px" }}>
              Chưa có tài khoản? <span style={{ color: "#dc2626", fontWeight: "bold", cursor: "pointer" }} onClick={() => setActiveTab("register")}>Đăng ký tại đây</span>
            </p>

            <button onClick={() => setActiveTab("home")} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "13px", cursor: "pointer", marginTop: "10px" }}>
              ← Quay lại trang chủ
            </button>
          </div>
        </div>

      ) : activeTab === "register" ? (

        /* 🟢 REGISTER PAGE */
        <div style={{ maxWidth: "480px", margin: "40px auto", padding: "0 16px" }}>
          <div style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginTop: 0, textAlign: "center" }}>Tạo tài khoản để truy cập quản trị hệ thống.</p>

            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Họ và tên</label>
                <input type="text" placeholder="Ví dụ: Nguyễn Minh Anh" value={regFullname} onChange={(e) => setRegFullname(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Số điện thoại (không bắt buộc)</label>
                <input type="text" placeholder="0912 345 678" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Địa chỉ email</label>
                <input type="email" placeholder="email@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Tên đăng nhập *</label>
                <input type="text" placeholder="Tạo tên đăng nhập" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }} required />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Mật khẩu *</label>
                <input type="password" placeholder="Tối thiểu 6 ký tự" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }} required />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "bold", display: "block", marginBottom: "4px" }}>Nhập lại mật khẩu *</label>
                <input type="password" placeholder="Nhập lại mật khẩu" value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", boxSizing: "border-box" }} required />
              </div>

              <div style={{ fontSize: "12px", color: "#4b5563" }}>
                <label><input type="checkbox" required /> Tôi đồng ý với <b>Chính sách và Điều khoản dịch vụ</b></label>
              </div>

              <button type="submit" style={{ backgroundColor: "#dc2626", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "15px", marginTop: "8px" }}>
                Đăng ký
              </button>
            </form>

            <p style={{ fontSize: "13px", textAlign: "center", marginTop: "16px" }}>
              Đã có tài khoản? <span style={{ color: "#dc2626", fontWeight: "bold", cursor: "pointer" }} onClick={() => setActiveTab("login")}>Đăng nhập tại đây</span>
            </p>
          </div>
        </div>

      ) : (

        /* 🟢 HOME PAGE VIEW */
        <main style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 16px" }}>
          
          {/* BANNER STATS BOX */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px 24px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: "32px" }}>
            <span style={{ backgroundColor: "#f3f4f6", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", color: "#374151" }}>Túi mù tự động 24/7</span>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", margin: "12px 0 8px 0" }}>Túi mù game đang mở tại Shopacc89.com</h1>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 24px 0" }}>
              Danh sách túi mù Free Fire, FC Mobile, Roblox và nhiều game khác, có giá bán rõ ràng, lượt chơi và trang chi tiết để kiểm tra trước khi mở.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "800px", margin: "0 auto 24px auto" }}>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>26</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Túi mù</div>
              </div>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>4</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Miễn phí</div>
              </div>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>53.449</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Lượt chơi</div>
              </div>
            </div>

            {/* CATEGORY FILTER BUTTONS */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
              {["Tất cả", "Free Fire", "Liên Quân", "FC Mobile", "Roblox"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    backgroundColor: selectedCategory === cat ? "#111827" : "#e5e7eb",
                    color: selectedCategory === cat ? "#ffffff" : "#374151",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  {cat === "Tất cả" ? "Tất cả túi mù" : `Túi mù ${cat}`}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION TITLE */}
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px", textTransform: "uppercase" }}>
            NHẬN ACC GAME MIỄN PHÍ & TÚI MÙ NỔI BẬT
          </h2>

          {/* PRODUCT GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {filteredProducts.map((p) => (
              <div key={p.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
                
                {/* BADGE */}
                {p.isHot && <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#f97316", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "2px 8px", borderRadius: "4px" }}>HOT</span>}
                {p.isFree && <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#16a34a", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "2px 8px", borderRadius: "4px" }}>MIỄN PHÍ 100%</span>}

                <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />

                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: "800", margin: "0 0 10px 0", color: "#111827" }}>{p.name}</h3>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Đã chơi {p.plays} lượt</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Lượt Xem: {p.views}</div>
                    
                    {/* RATING STARS */}
                    <div style={{ color: "#eab308", fontSize: "12px", marginBottom: "12px" }}>
                      ★★★★★ <span style={{ color: "#374151", fontWeight: "bold" }}>5</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#111827", marginBottom: "12px" }}>
                      Giá: {p.price === 0 ? "0đ" : `${p.price.toLocaleString("vi-VN")}đ`}
                    </div>

                    <button style={{ width: "100%", backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "10px", borderRadius: "20px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                      <span>XEM TẤT CẢ</span> ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* FOOTER */}
      <footer style={{ marginTop: "60px", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", padding: "24px", textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
        © 2026 ShopAcc89. All rights reserved.
      </footer>
    </div>
  );
}
