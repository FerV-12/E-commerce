
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

function Product() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToCart, count } = useContext(CartContext);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // products now include short description + recommendation
  const products = [
    {
      id: 1,
      name: "Aesthetic Vase",
      price: 499,
      image: "/images/vase.jpg",
      category: "Decor",
      desc: "Hand-glazed ceramic vase with a matte finish — perfect for single-stem florals.",
      recommend:
        "Place on console table or bookshelf. Pair with dried pampas grass for a warm, natural touch.",
    },
    {
      id: 2,
      name: "Minimalist Lamp",
      price: 899,
      image: "/images/lamp.jpg",
      category: "Lighting",
      desc: "Slim desk/table lamp with soft warm LED — dimmable and energy efficient.",
      recommend:
        "Use on bedside table or reading nook to create layered ambient lighting.",
    },
    {
      id: 3,
      name: "Wooden Shelf",
      price: 1299,
      image: "/images/table.jfif",
      category: "Furniture",
      desc: "Floating oak shelf — sturdy and minimalist for modern interiors.",
      recommend:
        "Install above sofa or entryway and style with plants, books and framed photos.",
    },
    {
      id: 4,
      name: "Ceramic Mug Set",
      price: 299,
      image: "/images/mug.webp",
      category: "Kitchen",
      desc: "Set of 4 artisan mugs with comfortable handles and chip-resistant glaze.",
      recommend:
        "Display on open shelving or keep in a dedicated mug rail for cozy kitchen vibes.",
    },
    {
      id: 5,
      name: "Wall Clock",
      price: 399,
      image: "/images/clock.webp",
      category: "Decor",
      desc: "Silent sweep wall clock with minimalist face — no ticking.",
      recommend:
        "Center above a sideboard or kitchen wall for functional decor that anchors the room.",
    },
    {
      id: 6,
      name: "Throw Pillow",
      price: 199,
      image: "/images/pillow.webp",
      category: "Textiles",
      desc: "Soft textured throw pillow with removable cover for easy washing.",
      recommend:
        "Mix with contrasting colors and textures on sofa to add depth and comfort.",
    },
    {
      id: 7,
      name: "Table Runner",
      price: 349,
      image: "/images/table.webp",
      category: "Textiles",
      desc: "Linen-blend table runner with subtle weave pattern.",
      recommend:
        "Use as focal piece for dining table; layer with simple centerpiece for elegance.",
    },
    {
      id: 8,
      name: "Indoor Plant",
      price: 599,
      image: "/images/plant.webp",
      category: "Greenery",
      desc: "Low-maintenance potted indoor plant that thrives in indirect light.",
      recommend:
        "Place in corner or shelf to introduce life and soften harsh lines of furniture.",
    },
    {
      id: 9,
      name: "Scented Candle",
      price: 249,
      image: "/images/candle.webp",
      category: "Aromas",
      desc: "Soy wax candle with long burn time and a subtle vanilla-cedar scent.",
      recommend:
        "Light during evenings to create a relaxing atmosphere; place on tray with matches.",
    },
  ];

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  // modal state for details
  const [modalProduct, setModalProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalProduct(null);
    };
    if (modalProduct) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalProduct]);

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesQuery = query.trim() === "" || p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const styles = {
    container: {
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #fbeee6 0%, #f6d6c3 100%)",
      minHeight: "100vh",
      overflow: "hidden",
    },
    sidebar: {
      width: "220px",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(10px)",
      padding: "24px",
      boxShadow: "4px 0 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderTopRightRadius: "18px",
      borderBottomRightRadius: "18px",
      transform: isLoaded ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.8s ease",
    },
    main: { flex: 1, padding: "48px" },
    controls: { display: "flex", gap: 12, alignItems: "center", marginTop: 8, marginBottom: 18, flexWrap: "wrap" },
    categories: { display: "flex", gap: 8, flexWrap: "wrap" },
    catBtn: (active) => ({
      padding: "8px 12px",
      borderRadius: 12,
      border: active ? "none" : "1px solid rgba(0,0,0,0.06)",
      background: active ? "linear-gradient(90deg,#6366f1,#8b5cf6)" : "#fff",
      color: active ? "#fff" : "#111",
      cursor: "pointer",
      fontWeight: 700,
      boxShadow: active ? "0 8px 20px rgba(99,102,241,0.12)" : "0 2px 6px rgba(0,0,0,0.03)",
    }),
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "32px",
      marginTop: "12px",
    },
    productCard: {
      background: "#fff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      textAlign: "center",
      height: "320px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 180ms ease, box-shadow 180ms ease",
    },
    productImage: { width: "100%", height: "160px", objectFit: "cover", borderRadius: "12px", marginBottom: "12px" },
    addBtn: { background: "#6366f1", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },

    // modal styles
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.46)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 20,
    },
    modalCard: {
      width: "100%",
      maxWidth: 720,
      background: "#fff",
      borderRadius: 12,
      padding: 20,
      boxShadow: "0 20px 60px rgba(2,6,23,0.2)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      alignItems: "start",
    },
    modalImg: { width: "100%", height: 280, objectFit: "cover", borderRadius: 8 },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    closeBtn: { background: "transparent", border: "none", fontSize: 20, cursor: "pointer" },
    modalFooter: { gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: 8 },
    detailText: { color: "#374151", lineHeight: 1.5 },
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <img src="/images/chan2.jpg" alt="Logo" style={{ width: 80, height: 80, borderRadius: 40, objectFit: "cover", marginBottom: 12 }} />
            <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(135deg,#667eea,#764ba2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Serene Home</div>
            <p style={{ fontSize: 14, color: "#6366f1" }}>Where modern meets premium ✨</p>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: 8 }}><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>🏠 Home</Link></li>
            <li style={{ marginBottom: 8 }}><Link to="/product" style={{ textDecoration: "none", color: "inherit" }}>🛍️ Product</Link></li>
            <li style={{ marginBottom: 8 }}><Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>🛒 Cart</Link> {count > 0 && <span style={{ marginLeft: 8, background: "#dc2626", color: "#fff", padding: "4px 8px", borderRadius: 12, fontWeight: 700 }}>{count}</span>}</li>
          </ul>
        </div>

        <div style={{ marginTop: "auto" }}>
          <div style={{ marginBottom: 8, color: "#6b7280" }}>Need Help?</div>
          <button style={{ background: "#6366f1", color: "#fff", padding: "10px 16px", borderRadius: 8, border: "none", cursor: "pointer" }}>Customer Service</button>
        </div>
      </aside>

      <main style={styles.main}>
        <h1>🛍️ Product Page</h1>
        <p>Welcome — filter by category or search to find items.</p>

        <div style={styles.controls}>
          <div style={styles.categories}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={styles.catBtn(activeCategory === cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <input aria-label="search" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e6e6e6", minWidth: 180 }} />
            <button onClick={() => { setQuery(""); setActiveCategory("All"); }} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e6e6e6", background: "#fff", cursor: "pointer" }}>Reset</button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: 24, textAlign: "center", background: "#fff", borderRadius: 12 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>No products found</div>
            <div style={{ color: "#6b7280" }}>Try another category or search term.</div>
          </div>
        ) : (
          <div style={styles.productGrid}>
            {filtered.map((product) => (
              <div key={product.id} style={styles.productCard} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                <img src={product.image} alt={product.name} style={styles.productImage} onError={(e) => (e.currentTarget.src = "/images/placeholder.png")} />
                <div>
                  <h3 style={{ margin: 6 }}>{product.name}</h3>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>{product.category} · <strong>₱{product.price}</strong></div>
                </div>

                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
                  <button onClick={() => handleAddToCart(product)} style={styles.addBtn}>Add to Cart</button>
                  <button onClick={() => setModalProduct(product)} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #e6e6e6", background: "#fff", cursor: "pointer" }}>Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalProduct && (
        <div
          style={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalProduct(null);
          }}
        >
          <div role="dialog" aria-modal="true" aria-label={`${modalProduct.name} details`} style={styles.modalCard}>
            <div>
              <img src={modalProduct.image} alt={modalProduct.name} style={styles.modalImg} onError={(e) => (e.currentTarget.src = "/images/placeholder.png")} />
            </div>

            <div>
              <div style={styles.modalHeader}>
                <div>
                  <h2 style={{ margin: 0 }}>{modalProduct.name}</h2>
                  <div style={{ color: "#6b7280", marginTop: 6 }}>₱{modalProduct.price} · {modalProduct.category}</div>
                </div>
                <button aria-label="Close details" onClick={() => setModalProduct(null)} style={styles.closeBtn}>✕</button>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Short description</div>
                <p style={styles.detailText}>{modalProduct.desc}</p>

                <div style={{ fontWeight: 700, marginTop: 12, marginBottom: 6 }}>How to use / Recommendation</div>
                <p style={styles.detailText}>{modalProduct.recommend}</p>
              </div>

              <div style={styles.modalFooter}>
                <button onClick={() => { handleAddToCart(modalProduct); setModalProduct(null); }} style={{ background: "#10b981", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 }}>Add to Cart</button>
                <button onClick={() => setModalProduct(null)} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #e6e6e6", background: "#fff", cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;

