import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi kết nối API:", err));
  }, []);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", sticky: "top" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#ec4899", margin: 0 }}>LQ Shop - Túi Mù 247</h1>
        <div style={{ position: "relative" }}>
          <button style={{ backgroundColor: "#ec4899", color: "white", padding: "8px 16px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "bold" }}>
            🛒 Giỏ hàng ({cartCount})
          </button>
        </div>
      </header>

      {/* Banner */}
      <section style={{ backgroundColor: "#fbcfe8", padding: "32px 24px", textAlign: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "28px", color: "#831843", margin: "0 0 8px 0" }}>LQ Shop - Chuyên Túi Mù & Blind Box Chính Hãng</h2>
        <p style={{ color: "#9d174d", margin: 0 }}>Săn deal hấp dẫn, khám phá niềm vui mở túi mù mỗi ngày!</p>
      </section>

      {/* Product List */}
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
    </div>
  );
}
