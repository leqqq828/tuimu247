import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

// Dữ liệu sản phẩm mẫu có sẵn
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Blindbox Túi Mù Linh Vật May Mắn",
    description: "Bộ sưu tập túi mù mô hình linh vật dễ thương, hàng chính hãng.",
    price: "89000",
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500",
    category: "Blindbox",
    inStock: true
  },
  {
    id: 2,
    name: "Móc Khóa Blind Box Búp Bê Bông",
    description: "Móc khóa túi mù hot trend treo balo, túi xách.",
    price: "120000",
    imageUrl: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=500",
    category: "Phụ kiện",
    inStock: true
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Form state cho Admin
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Blindbox");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const addToCart = () => setCartCount((prev) => prev + 1);

  // Thêm sản phẩm mới (Admin)
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("Vui lòng nhập tên và giá sản phẩm!");

    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      category,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500",
      description: description || "Sản phẩm túi mù chất lượng cao.",
      inStock: true
    };

    setProducts([newProduct, ...products]);
    setName("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    alert("Thêm sản phẩm thành công!");
  };

  // Xóa sản phẩm (Admin)
  const handleDeleteProduct = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#ec4899", margin: 0 }}>LQ Shop - Túi Mù 247</h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Nút chuyển chế độ Admin */}
          <button 
            onClick={() => setIsAdmin(!isAdmin)} 
            style={{ backgroundColor: isAdmin ? "#111827" : "#f3f4f6", color: isAdmin ? "#fff" : "#374151", padding: "8px 16px", borderRadius: "20px", border: "1px solid #d1d5db", cursor: "pointer", fontWeight: "600" }}
          >
            {isAdmin ? "⚙️ Thoát Admin" : "⚙️ Trang Admin"}
          </button>
          
          {!isAdmin && (
            <button style={{ backgroundColor: "#ec4899", color: "white", padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
              🛒 Giỏ hàng ({cartCount})
            </button>
          )}
        </div>
      </header>

      {/* Trang ADMIN Quản lý */}
      {isAdmin ? (
        <main style={{ maxWidth: "800px", margin: "24px auto", padding: "0 16px" }}>
          <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "32px" }}>
            <h2 style={{ marginTop: 0, color: "#111827", fontSize: "20px" }}>➕ Thêm sản phẩm túi mù mới</h2>
            <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" placeholder="Tên sản phẩm (VD: Túi Mù Labubu)" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }} required />
              <div style={{ display: "flex", gap: "12px" }}>
                <input type="number" placeholder="Giá tiền (VNĐ)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }}>
                  <option value="Blindbox">Blindbox</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                  <option value="Móc khóa">Móc khóa</option>
                </select>
              </div>
              <input type="text" placeholder="Link ảnh (URL hình ảnh)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db" }} />
              <textarea placeholder="Mô tả ngắn..." value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", height: "80px" }} />
              <button type="submit" style={{ backgroundColor: "#10b981", color: "white", padding: "12px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold" }}>Lưu sản phẩm</button>
            </form>
          </div>

          <h3 style={{ color: "#374151" }}>Danh sách sản phẩm hiện có ({products.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {products.map((p) => (
              <div key={p.id} style={{ backgroundColor: "#fff", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                  <div>
                    <strong style={{ display: "block" }}>{p.name}</strong>
                    <span style={{ color: "#ec4899", fontSize: "14px", fontWeight: "bold" }}>{Number(p.price).toLocaleString("vi-VN")} đ</span>
                  </div>
                </div>
                <button onClick={() => handleDeleteProduct(p.id)} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}>Xóa</button>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* Trang KHÁCH HÀNG Xem & Mua */
        <>
          <section style={{ backgroundColor: "#fbcfe8", padding: "32px 24px", textAlign: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "28px", color: "#831843", margin: "0 0 8px 0" }}>LQ Shop - Chuyên Túi Mù & Blind Box Chính Hãng</h2>
            <p style={{ color: "#9d174d", margin: 0 }}>Săn deal hấp dẫn, khám phá niềm vui mở túi mù mỗi ngày!</p>
          </section>

          <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#374151" }}>Sản phẩm nổi bật</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
              {products.map((product) => (
                <div key={product.id} style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "16px" }}>
                    <span style={{ fontSize: "12px", backgroundColor: "#f3e8ff", color: "#6b21a8", padding: "2px 8px", borderRadius: "12px", fontWeight: "600" }}>
                      {product.category}
                    </span>
                    <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: "8px 0", color: "#111827" }}>{product.name}</h4>
                    <p style={{ fontSize: "13px", color: "#6b7280", height: "36px", overflow: "hidden", margin: "0 0 12px 0" }}>{product.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ec4899" }}>
                        {Number(product.price).toLocaleString("vi-VN")} đ
                      </span>
                      <button onClick={addToCart} style={{ backgroundColor: "#ec4899", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                        + Thêm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
