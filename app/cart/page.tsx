"use client";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
  (sum, item) => sum + Number(item.price) * item.quantity,
  0
);


  if (cart.length === 0) return <p>Cart is empty</p>;

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map(item => (
        <div key={item.id}>
          <p>{item.title} × {item.quantity}</p>
          <p>₹{Number(item.price) * item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
