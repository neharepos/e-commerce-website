"use client";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", imageFile);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(`Failed to add product: ${errorData.error}`);
      return;
    }

      

    setTitle("");
    setSlug("");
    setCategory("");
    setDescription("");
    setImageFile(null);
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

        <label>Product Image:</label>
        {/* <input type="Image URL (/images/kurti.jpg)" value={image}
          onChange={(e) => setImage(e.target.value)} /> */}

          <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
          required 
        />

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
