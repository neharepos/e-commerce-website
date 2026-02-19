"use client";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
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

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        category,
        description,
        image,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    if (!res.ok) {
      alert("Failed to add product");
      return;
    }

    setTitle("");
    setSlug("");
    setCategory("");
    setDescription("");
    setImage("");
    setPrice("");
    setStock("");

    fetchProducts();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin – Products</h1>

      <form onSubmit={addProduct} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
        <input placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)} />

        <input placeholder="Slug" value={slug}
          onChange={(e) => setSlug(e.target.value)} />

        <input placeholder="Category" value={category}
          onChange={(e) => setCategory(e.target.value)} />

        <textarea placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <input placeholder="Image URL (/images/kurti.jpg)" value={image}
          onChange={(e) => setImage(e.target.value)} />

        <input placeholder="Price" type="number" value={price}
          onChange={(e) => setPrice(e.target.value)} />

        <input placeholder="Stock" type="number" value={stock}
          onChange={(e) => setStock(e.target.value)} />

        <button type="submit">Add</button>
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
