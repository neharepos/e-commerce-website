"use client";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import { ProductsData } from "../data/products/page";


type OrderItem = {
  id: number;
  title: string;
  price: number;
  img: string;
  quantity: number;
};


export default function OrderPage() {

  const { cart, clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from");   
  const productId = searchParams.get("id"); 

  const [itemsToOrder, setItemsToOrder] = useState<OrderItem[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // let itemsToOrder: OrderItem[] = [];

useEffect(() => {
    async function loadOrderItems() {
      const res = await fetch("/api/products");
      const dbProducts: any[] = await res.json();

      if (from === "product" && productId) {
        const product = dbProducts.find((p) => p.id.toString() === productId);
        if (product) {
          setItemsToOrder([{
            id: product.id,
            title: product.title,
            price: Number(product.price),
            img: product.image, // Use 'image' field from DB
            quantity: 1,
          }]);
        }
      } else if (from === "cart") {
        const cartItems = cart.map((item) => {
          const product = dbProducts.find((p) => p.id === item.id);
          if (!product) return null;
          return {
            id: product.id,
            title: product.title,
            price: Number(product.price),
            img: product.image,
            quantity: item.quantity,
          };
        }).filter(Boolean) as OrderItem[];
        setItemsToOrder(cartItems);
      }
    }
    loadOrderItems();
  }, [from, productId, cart]);


  const total = itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!name || !address || !phone || !email) {
      alert("Please fill all details");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email, address, phone,
          totalAmount: total,
          cartItems: itemsToOrder.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      if (res.ok) {
        const result = await res.json();
        alert(`Order Placed! ID: ${result.orderId}`);
        clearCart();
        router.push("/");
      }
    } catch (err) {
      alert("Checkout failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (itemsToOrder.length === 0) return <p className="pt-24 text-center text-white bg-black min-h-screen">Loading order details...</p>;  

  return (
    <div className="pt-12 max-w-7xl mx-auto p-12">
      <h1 className="text-2xl font-semibold mb-6 font-serif">
        Place the Order
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side */}
        <div className="order-2 md:order-1 border border-gray-600 p-6 rounded-lg space-y-3">
          <h2 className="text-lg font-semibold font-sans">Customer Details</h2>
          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          

          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* <button
            onClick={PlaceOrder}
            className="bg-black border font-mono border-gray-600 text-white p-2 mt-3 rounded"
          >
            Place Order
          </button> */}

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className={`bg-orange-400 border font-mono border-gray-600 text-black font-bold p-2 mt-3 rounded w-full transition-all ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-500"
            }`}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* right side / */}

        <div className="order-1 md:order-2 border border-gray-600 rounded-lg space-y-4 p-4">
          <h2 className="text-2xl font-semibold font-sans">
            Here are your Orders
          </h2>

          {itemsToOrder.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border-b border-gray-700 pb-3"
            >
              {/* <img src={item.img?.src || "/placeholder.png"} alt={item.title} className="w-20 h-20 object cover rounded" /> */}

              <img
                src={item.img || "/placeholder.png"}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-mono">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ₹{Number(item.price) * item.quantity}
              </p>
            </div>
          ))}

          <div className="text-right font-bold text-lg">Total: ₹{total}</div>
        </div>
      </div>
    </div>
  )};
  
