// ...existing code...
import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

function Cart() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart, total, count } =
    useContext(CartContext);

  const prevItems = useRef([]);
  const toastTimer = useRef(null);
  const [toast, setToast] = useState({ visible: false, title: "", image: "" });

  useEffect(() => {
    setIsLoaded(true);
    prevItems.current = cartItems;
    return () => clearTimeout(toastTimer.current);
  }, []); // run once

  useEffect(() => {
    if (!isLoaded) {
      prevItems.current = cartItems;
      return;
    }

    const prev = prevItems.current || [];
    const added = [];

    cartItems.forEach((ci) => {
      const p = prev.find((pi) => pi.id === ci.id);
      if (!p) added.push({ ...ci, addedQty: ci.quantity });
      else if (ci.quantity > p.quantity) added.push({ ...ci, addedQty: ci.quantity - p.quantity });
    });

    if (added.length > 0) {
      const totalAdded = added.reduce((s, a) => s + (a.addedQty || 0), 0);
      const first = added[0];
      const title = totalAdded === 1 ? `${first.name} added to cart` : `${totalAdded} items added to cart`;

      setToast({ visible: true, title, image: first.image || "/images/placeholder.png" });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2800);
    }

    prevItems.current = cartItems;
  }, [cartItems, isLoaded]);

  const fmt = (v) => `₱${v.toLocaleString()}`;

  const styles = {
    container: { display: "flex", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "linear-gradient(135deg,#f7f7fb 0%,#fbeee6 50%,#f6d6c3 100%)", minHeight: "100vh" },
    sidebar: { width: 220, background: "rgba(255,255,255,0.9)", padding: 24, boxShadow: "4px 0 18px rgba(0,0,0,0.06)", borderTopRightRadius: 18, borderBottomRightRadius: 18 },
    main: { flex: 1, padding: 40, display: "flex", flexDirection: "column", gap: 20 },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    title: { fontSize: 26, fontWeight: 800 },
    list: { padding: 0, margin: 0, listStyle: "none", display: "grid", gap: 12 },
    itemRow: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 6px 22px rgba(16,24,40,0.06)" },
    itemInfo: { display: "flex", alignItems: "center", gap: 14, minWidth: 320 },
    productImageSmall: { width: 88, height: 88, objectFit: "cover", borderRadius: 10, flexShrink: 0 },
    qtyControls: { display: "flex", alignItems: "center", gap: 10, background: "#fafafa", padding: "6px 8px", borderRadius: 10, border: "1px solid #f3f4f6" },
    qtyBtn: { width: 30, height: 30, borderRadius: 8, border: "none", background: "#fff", cursor: "pointer", fontWeight: 800 },
    totalBlock: { marginTop: 8, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 18 },
    totalBox: { background: "#fff", padding: "16px 20px", borderRadius: 12, boxShadow: "0 8px 30px rgba(16,24,40,0.06)", fontWeight: 800, fontSize: 18 },
    empty: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: 36, background: "linear-gradient(180deg,#fff,#fbfbff)", borderRadius: 14, boxShadow: "0 10px 40px rgba(16,24,40,0.04)", textAlign: "center" },
    toastWrapper: { position: "fixed", top: 18, right: 18, zIndex: 9999, display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(17,24,39,0.96)", color: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.25)", minWidth: 220, transition: "all 260ms cubic-bezier(.2,.9,.2,1)" },
    toastImg: { width: 56, height: 56, objectFit: "cover", borderRadius: 8, background: "#fff" },
    linkBtn: { background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff", padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 },
  };

  const handleDecrease = (id, qty) => {
    if (qty - 1 <= 0) removeFromCart(id);
    else updateQuantity(id, qty - 1);
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src="/images/chan2.jpg" alt="logo" style={{ width: 72, height: 72, borderRadius: 18 }} />
          <div style={{ fontWeight: 900, fontSize: 20, marginTop: 8 }}>Serene Home</div>
          <div style={{ color: "#6b7280", fontSize: 13 }}>Cart</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#111" }}>🏠 Home</Link>
          <Link to="/product" style={{ textDecoration: "none", color: "#111" }}>🛍️ Product</Link>
          <Link to="/about" style={{ textDecoration: "none", color: "#111" }}>📖 About</Link>
        </nav>
        <div style={{ marginTop: 24 }}>
          <div style={{ color: "#6b7280", fontSize: 13 }}>Need help?</div>
          <button style={{ ...styles.linkBtn, marginTop: 10 }}>Customer Service</button>
        </div>
      </aside>

      <main style={styles.main}>
        {toast.visible && (
          <div style={{ ...styles.toastWrapper, opacity: toast.visible ? 1 : 0, transform: toast.visible ? "translateY(0)" : "translateY(-8px)" }}>
            <img src={toast.image} alt="product" style={styles.toastImg} onError={(e) => (e.currentTarget.src = "/images/placeholder.png")} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{toast.title}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Added to cart · View your cart to edit</div>
            </div>
          </div>
        )}

        <div style={styles.headerRow}>
          <div>
            <div style={styles.title}>🛒 Your Cart</div>
            <div style={{ color: "#6b7280", marginTop: 6 }}>{count} item{count !== 1 ? "s" : ""}</div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}
              onClick={() => { if (cartItems.length > 0 && window.confirm("Clear all items from cart?")) clearCart(); }}
            >
              Clear Cart
            </button>
            <Link to="/product"><button style={styles.linkBtn}>Continue Shopping</button></Link>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.empty}>
            <svg width="140" height="100" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="#c7c7d9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1.6" fill="#c7c7d9"/>
              <circle cx="18" cy="20" r="1.6" fill="#c7c7d9"/>
            </svg>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Your cart is empty</div>
            <div style={{ color: "#6b7280" }}>Browse products and add your favorites.</div>
            <Link to="/product"><button style={{ ...styles.linkBtn, marginTop: 8 }}>Shop Now</button></Link>
          </div>
        ) : (
          <>
            <ul style={styles.list}>
              {cartItems.map((item) => (
                <li key={item.id} style={styles.itemRow}>
                  <div style={styles.itemInfo}>
                    <img src={item.image} alt={item.name} style={styles.productImageSmall} onError={(e) => (e.currentTarget.src = "/images/placeholder.png")} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{item.name}</div>
                      <div style={{ color: "#6b7280", marginTop: 6 }}>{fmt(item.price)} each</div>
                      <div style={{ marginTop: 8, color: "#6b7280", fontSize: 13 }}>Subtotal: <strong>{fmt(item.price * item.quantity)}</strong></div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={styles.qtyControls}>
                      <button aria-label="decrease" style={styles.qtyBtn} onClick={() => handleDecrease(item.id, item.quantity)}>−</button>
                      <div style={{ minWidth: 26, textAlign: "center", fontWeight: 800 }}>{item.quantity}</div>
                      <button aria-label="increase" style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <div style={{ fontWeight: 900, minWidth: 100, textAlign: "right" }}>{fmt(item.price * item.quantity)}</div>

                    <button onClick={() => removeFromCart(item.id)} style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)", color: "#ef4444", padding: "8px 10px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div style={styles.totalBlock}>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#6b7280", fontWeight: 700 }}>Total</div>
                <div style={styles.totalBox}>{fmt(total)}</div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Cart;