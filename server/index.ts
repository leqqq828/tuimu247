import express from "express";

const app = express();
app.use(express.json());

// Mock data sản phẩm mẫu cho LQ Shop
const sampleProducts = [
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

// API lấy danh sách sản phẩm
app.get("/api/products", (_req, res) => {
  res.json(sampleProducts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server đang chạy tại port ${PORT});
});
