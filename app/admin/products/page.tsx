"use client";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        category,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    setTitle("");
    setSlug("");
    setCategory("");
    setPrice("");
    setStock("");
    fetchProducts();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin – Products</h1>

      <form onSubmit={addProduct}>
        <input placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)} />

        <input placeholder="Slug" value={slug}
          onChange={(e) => setSlug(e.target.value)} />

        <input placeholder="Category" value={category}
          onChange={(e) => setCategory(e.target.value)} />

        <input placeholder="Price" value={price}
          onChange={(e) => setPrice(e.target.value)} />

        <input placeholder="Stock" value={stock}
          onChange={(e) => setStock(e.target.value)} />

        <button>Add</button>
      </form>

      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.title} — ₹{p.price} — {p.category} — stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
